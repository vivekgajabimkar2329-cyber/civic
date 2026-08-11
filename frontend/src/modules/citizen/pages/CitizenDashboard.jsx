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
  Search,
  Map,
  ShieldCheck,
  Sparkles,
  BellRing,
  BadgeCheck,
  CircleDashed,
  Camera,
  X
} from 'lucide-react';
import { citizenProfile, initialComplaints } from '../../common/data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

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

  const statCards = [
    { label: 'Total Reported', value: citizenProfile.stats.totalReported, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', accent: 'from-blue-500/10 to-blue-600/5' },
    { label: 'Resolved', value: citizenProfile.stats.resolved, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', accent: 'from-green-500/10 to-green-600/5' },
    { label: 'In Progress', value: citizenProfile.stats.inProgress, icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50', accent: 'from-indigo-500/10 to-indigo-600/5' },
    { label: 'Pending', value: citizenProfile.stats.pending, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50', accent: 'from-orange-500/10 to-orange-600/5' },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="relative overflow-hidden rounded-[28px] border border-blue-100 bg-gradient-to-br from-[#003078] via-[#005EA5] to-[#1D70B8] p-6 text-white shadow-elevated sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.24),_transparent_42%)]" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur">
              <ShieldCheck size={16} />
              Civic service dashboard
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Welcome back, {citizenProfile.name}
            </h1>
            <p className="mt-3 text-base text-blue-50 sm:text-lg">
              Report service issues, view live updates, and stay connected with your city through one secure dashboard.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/report-issue"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#003078] transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <FileText size={18} />
                Report a new issue
              </Link>
              <Link
                to="/my-complaints"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <BadgeCheck size={18} />
                Track my requests
              </Link>
            </div>
          </div>

          <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-100">Service health</p>
                <p className="text-2xl font-bold">98.4%</p>
              </div>
              <div className="rounded-2xl bg-emerald-400/20 p-3 text-emerald-200">
                <Sparkles size={22} />
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/20">
              <div className="h-2 w-[84%] rounded-full bg-emerald-300" />
            </div>
            <p className="mt-3 text-sm text-blue-50">Average response time is under 24 hours for priority requests.</p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`rounded-2xl border border-slate-200 bg-gradient-to-br ${stat.accent} p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
                  <h3 className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</h3>
                </div>
                <div className={`rounded-2xl p-3 ${stat.bg}`}>
                  <Icon size={24} className={stat.color} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.45fr_0.8fr]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/70 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">My recent complaints</h2>
                <p className="text-sm text-slate-500">Your latest service requests and live status updates.</p>
              </div>
              <Link to="/my-complaints" className="text-sm font-semibold text-[#005EA5] hover:underline">
                View all history
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {myComplaints.length > 0 ? (
                myComplaints.map((complaint) => (
                  <div key={complaint.id} className="p-6 transition hover:bg-slate-50">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{complaint.title}</h3>
                        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
                          <span className="flex items-center gap-1"><MapPin size={15} className="text-slate-400" /> {complaint.department}</span>
                          <span className="flex items-center gap-1"><Clock size={15} className="text-slate-400" /> Submitted on {complaint.date}</span>
                        </div>
                      </div>
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                        complaint.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                        complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {complaint.status}
                      </span>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                      <div className={`h-2 rounded-full ${
                        complaint.status === 'Resolved' ? 'w-full bg-green-600' :
                        complaint.status === 'In Progress' ? 'w-2/3 bg-blue-600' :
                        'w-1/3 bg-orange-500'
                      }`} />
                    </div>

                    <Link
                      to={`/citizen/complaint/${complaint.id}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#005EA5] hover:underline"
                    >
                      View full details <ArrowRight size={16} />
                    </Link>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-slate-500">
                  <CheckCircle size={48} className="mx-auto mb-4 text-slate-300" />
                  <p className="text-lg font-medium">You have no active complaints.</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Community resolution trend</h2>
                <p className="mt-1 text-sm text-slate-500">Improved service delivery in your district over the last six months.</p>
              </div>
              <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">+18% uplift</div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={communityData}>
                  <defs>
                    <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#005EA5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#005EA5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <RechartsTooltip />
                  <Area type="monotone" dataKey="issues" stroke="#005EA5" strokeWidth={3} fillOpacity={1} fill="url(#colorIssues)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <CircleDashed size={18} className="text-[#005EA5]" />
              <h2 className="text-lg font-bold text-slate-900">Quick actions</h2>
            </div>
            <div className="space-y-3">
              <Link to="/citizen/nearby" className="flex items-center rounded-xl border border-slate-200 p-3 transition hover:border-blue-300 hover:bg-blue-50">
                <div className="mr-3 rounded-xl bg-slate-100 p-2 text-slate-700">
                  <Map size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">View nearby issues</h4>
                  <p className="text-xs text-slate-500">Review local service concerns in real time.</p>
                </div>
              </Link>
              <Link to="/my-complaints" className="flex items-center rounded-xl border border-slate-200 p-3 transition hover:border-blue-300 hover:bg-blue-50">
                <div className="mr-3 rounded-xl bg-slate-100 p-2 text-slate-700">
                  <Search size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Track by reference ID</h4>
                  <p className="text-xs text-slate-500">Check the status of a submitted request quickly.</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/70 px-6 py-4">
              <div className="flex items-center gap-2">
                <BellRing size={18} className="text-[#005EA5]" />
                <h2 className="text-lg font-bold text-slate-900">Priority updates</h2>
              </div>
              <AlertCircle size={18} className="text-slate-400" />
            </div>
            <div className="divide-y divide-slate-100">
              <div className="p-5">
                <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">Urgent</span>
                <h4 className="mt-2 text-sm font-semibold text-slate-900">Water main maintenance</h4>
                <p className="mt-1 text-sm text-slate-600">Scheduled outage in District 4 from 10 PM to 2 AM tonight.</p>
                <p className="mt-2 text-xs font-medium text-slate-400">Posted 2 hours ago</p>
              </div>
              <div className="p-5">
                <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">Update</span>
                <h4 className="mt-2 text-sm font-semibold text-slate-900">New waste collection schedule</h4>
                <p className="mt-1 text-sm text-slate-600">Starting next week, organic waste will be collected on Tuesdays.</p>
                <p className="mt-2 text-xs font-medium text-slate-400">Posted yesterday</p>
              </div>
            </div>
            <div className="border-t border-slate-200 p-3 text-center">
              <Link to="/citizen/notifications" className="text-sm font-semibold text-[#005EA5] hover:underline">
                View all notifications
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Hidden file input fallback */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileFallback}
      />

      {/* Floating Camera FAB Button */}
      <button
        onClick={startCamera}
        className="fixed bottom-6 right-6 z-45 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:scale-105 hover:bg-blue-700 active:scale-95 md:bottom-8 md:right-8"
        aria-label="Open camera to report issue"
        title="Quick Camera Report"
      >
        <Camera size={24} />
      </button>

      {/* WebRTC Camera Modal Overlay */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col gap-4 text-white">
            
            {/* Modal header */}
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold flex items-center gap-2">
                <Camera className="text-blue-500" />
                Quick Issue Capture
              </h3>
              <button 
                onClick={stopCamera} 
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Live video feed or error msg */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black border border-slate-800 flex items-center justify-center">
              {cameraError ? (
                <div className="p-6 text-center space-y-2">
                  <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
                  <p className="text-xs font-semibold text-slate-350">{cameraError}</p>
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

            {/* Action buttons */}
            {!cameraError && (
              <div className="flex justify-center pt-2">
                <button
                  onClick={capturePhoto}
                  className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-white shadow-lg hover:scale-105 active:scale-95 transition"
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
