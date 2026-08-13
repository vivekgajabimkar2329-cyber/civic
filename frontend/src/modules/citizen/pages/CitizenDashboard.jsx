import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  CheckCircle,
  Clock,
  MapPin,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Map,
  ShieldCheck,
  Sparkles,
  BellRing,
  CircleDashed,
  Camera,
  X
} from 'lucide-react';
import { citizenProfile, initialComplaints } from '../../common/data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Card, StatCard, HeroSection, Button } from '../../../components/ui/DashboardUI';

const CitizenDashboard = () => {
  const navigate = useNavigate();
  const [isCameraOpen, setIsCameraOpen] = React.useState(false);
  const [cameraStream, setCameraStream] = React.useState(null);
  const [cameraError, setCameraError] = React.useState(null);
  const videoRef = React.useRef(null);
  const fileInputRef = React.useRef(null);

  const startCamera = async () => {
    setCameraError(null);
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access failed: ", err);
      setCameraError("Camera access denied or unavailable. Redirecting to file uploader fallback...");
      setTimeout(() => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
        setIsCameraOpen(false);
      }, 2000);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      
      localStorage.setItem('captured_complaint_image', dataUrl);
      stopCamera();
      navigate('/report-issue');
    }
  };

  const handleFileFallback = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem('captured_complaint_image', reader.result);
        navigate('/report-issue');
      };
      reader.readAsDataURL(file);
    }
  };

  const myComplaints = initialComplaints.filter((complaint) => complaint.citizen === 'John Doe').slice(0, 3);

  const communityData = [
    { name: 'Jan', issues: 120 },
    { name: 'Feb', issues: 98 },
    { name: 'Mar', issues: 140 },
    { name: 'Apr', issues: 110 },
    { name: 'May', issues: 155 },
    { name: 'Jun', issues: 85 },
  ];

  // Map theme colors for stats
  const statCardsMeta = [
    { label: 'Total Reported', value: citizenProfile.stats.totalReported, icon: FileText, iconBg: 'bg-blue-50 text-blue-600' },
    { label: 'Resolved', value: citizenProfile.stats.resolved, icon: CheckCircle, iconBg: 'bg-emerald-50 text-emerald-600' },
    { label: 'In Progress', value: citizenProfile.stats.inProgress, icon: TrendingUp, iconBg: 'bg-indigo-50 text-indigo-600' },
    { label: 'Pending', value: citizenProfile.stats.pending, icon: Clock, iconBg: 'bg-orange-50 text-orange-600' },
  ];

  // Right hand widget in Welcome banner
  const serviceHealthWidget = (
    <div className="w-full rounded-2xl border border-white/10 bg-white/10 p-4.5 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-blue-150">Service Health</p>
          <p className="text-2xl font-black text-white">98.4%</p>
        </div>
        <div className="rounded-xl bg-emerald-500/20 p-2.5 text-emerald-300">
          <Sparkles size={20} />
        </div>
      </div>
      <div className="mt-3.5 h-1.5 rounded-full bg-white/20">
        <div className="h-1.5 w-[84%] rounded-full bg-emerald-400" />
      </div>
      <p className="mt-2.5 text-[11px] text-blue-100/80">Average response time is under 24 hours.</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <HeroSection
        badgeText="Civic service dashboard"
        badgeIcon={ShieldCheck}
        title={`Welcome back, ${citizenProfile.name}`}
        description="Report service issues, view live updates, and stay connected with your city through one secure dashboard."
        actions={
          <Button
            onClick={() => navigate('/report-issue')}
            variant="outline"
            icon={FileText}
            className="border-white/20 bg-white text-[#0F172A] hover:bg-slate-50"
          >
            Report a new issue
          </Button>
        }
        rightWidget={serviceHealthWidget}
      />

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCardsMeta.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            iconBg={stat.iconBg}
          />
        ))}
      </div>

      {/* Main Grid content */}
      <div className="grid gap-6 lg:grid-cols-[1.45fr_0.8fr]">
        <div className="space-y-6">
          {/* Complaints Table/List */}
          <Card
            title="My Recent Complaints"
            subtitle="Your latest service requests and live status updates."
            action={
              <Link to="/my-complaints" className="text-xs font-bold text-[#2563EB] hover:underline">
                View all history
              </Link>
            }
            bodyClassName="divide-y divide-slate-100"
          >
            {myComplaints.length > 0 ? (
              myComplaints.map((complaint) => (
                <div key={complaint.id} className="py-4.5 first:pt-0 last:pb-0 transition hover:bg-slate-50/50 px-2 rounded-lg">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">{complaint.title}</h3>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <MapPin size={13} className="text-slate-400" /> {complaint.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={13} className="text-slate-400" /> Submitted on {complaint.date}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide border ${
                        complaint.status === 'Resolved'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                          : complaint.status === 'In Progress'
                          ? 'bg-blue-50 text-blue-705 border-blue-100'
                          : 'bg-orange-50 text-orange-700 border-orange-100'
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </div>

                  <div className="mt-3.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-1.5 rounded-full ${
                        complaint.status === 'Resolved'
                          ? 'w-full bg-emerald-500'
                          : complaint.status === 'In Progress'
                          ? 'w-2/3 bg-[#2563EB]'
                          : 'w-1/3 bg-orange-400'
                      }`}
                    />
                  </div>

                  <Link
                    to={`/citizen/complaint/${complaint.id}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline"
                  >
                    View full details <ArrowRight size={14} />
                  </Link>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-slate-400">
                <CheckCircle size={40} className="mx-auto mb-3 text-slate-200" />
                <p className="text-sm font-semibold">You have no active complaints.</p>
              </div>
            )}
          </Card>

          {/* Resolutions Trend Chart */}
          <Card
            title="Community Resolution Trend"
            subtitle="Improved service delivery in your district over the last six months."
            action={
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-100">
                +18% uplift
              </span>
            }
          >
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={communityData}>
                  <defs>
                    <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 550 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 550 }} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <RechartsTooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                  <Area type="monotone" dataKey="issues" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#colorIssues)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Quick Actions */}
          <Card
            title="Quick Actions"
            action={<CircleDashed size={16} className="text-[#2563EB]" />}
          >
            <div className="space-y-2 mt-2">
              <Link
                to="/citizen/nearby"
                className="flex items-center rounded-xl border border-slate-200/80 p-3 transition duration-200 hover:border-blue-200 hover:bg-slate-50/50"
              >
                <div className="mr-3 rounded-lg bg-blue-50 p-2 text-[#2563EB] shrink-0">
                  <Map size={18} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-800">View Nearby Issues</h4>
                  <p className="text-[10px] text-slate-450 font-medium truncate mt-0.5">Review local service concerns in real time.</p>
                </div>
              </Link>
            </div>
          </Card>

          {/* Priority Updates / Alerts */}
          <Card
            title="Priority Updates"
            action={<BellRing size={16} className="text-[#2563EB]" />}
            bodyClassName="divide-y divide-slate-100"
          >
            <div className="py-3 first:pt-0">
              <span className="rounded bg-red-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-650 border border-red-100">
                Urgent
              </span>
              <h4 className="mt-2 text-xs font-bold text-slate-800">Water main maintenance</h4>
              <p className="mt-1 text-xs text-slate-500 font-medium leading-relaxed">
                Scheduled outage in District 4 from 10 PM to 2 AM tonight.
              </p>
              <p className="mt-2 text-[10px] font-bold text-slate-400">Posted 2 hours ago</p>
            </div>
            <div className="py-3 last:pb-0">
              <span className="rounded bg-blue-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#2563EB] border border-blue-100">
                Update
              </span>
              <h4 className="mt-2 text-xs font-bold text-slate-800">New waste collection schedule</h4>
              <p className="mt-1 text-xs text-slate-500 font-medium leading-relaxed">
                Starting next week, organic waste will be collected on Tuesdays.
              </p>
              <p className="mt-2 text-[10px] font-bold text-slate-400">Posted yesterday</p>
            </div>
            <div className="pt-3 border-t border-slate-150 text-center last:pb-0">
              <Link to="/citizen/notifications" className="text-xs font-bold text-[#2563EB] hover:underline">
                View all notifications
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Fallbacks & Camera controls */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileFallback}
      />

      {/* Quick Camera FAB */}
      <button
        onClick={startCamera}
        className="fixed bottom-6 right-6 z-45 flex h-14 w-14 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-lg shadow-blue-600/30 transition hover:scale-105 hover:bg-blue-700 active:scale-95 md:bottom-8 md:right-8"
        aria-label="Open camera to report issue"
        title="Quick Camera Report"
      >
        <Camera size={22} />
      </button>

      {/* WebRTC Video Feeds Modal */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col gap-4 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold flex items-center gap-2">
                <Camera className="text-blue-400" />
                Quick Issue Capture
              </h3>
              <button 
                onClick={stopCamera} 
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black border border-slate-800 flex items-center justify-center">
              {cameraError ? (
                <div className="p-6 text-center space-y-2">
                  <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
                  <p className="text-xs font-semibold text-slate-300">{cameraError}</p>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="h-full w-full object-cover rounded-2xl"
                />
              )}
            </div>

            {!cameraError && (
              <div className="flex justify-center pt-2">
                <button
                  onClick={capturePhoto}
                  className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-[#2563EB] text-white shadow-lg hover:scale-105 active:scale-95 transition"
                  title="Capture Photo"
                >
                  <div className="h-10 w-10 rounded-full bg-white transition hover:bg-slate-100" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CitizenDashboard;
