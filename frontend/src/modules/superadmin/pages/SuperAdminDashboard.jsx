import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Building2,
  FileText,
  AlertTriangle,
  TrendingUp,
  Brain,
  ThumbsUp,
  MapPin,
  Clock,
  Zap,
  Shield,
  Activity,
  Compass,
  ArrowRight,
  Sparkles,
  BarChart3,
  ShieldCheck
} from 'lucide-react';
import {
  AreaChart,
  Area,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie
} from 'recharts';
import { Card, StatCard, HeroSection, Button } from '../../../components/ui/DashboardUI';

const STATS_CARDS = [
  { label: 'Total Users', value: '45,284', change: '+12.4%', positive: true, icon: Users, iconBg: 'bg-blue-50 text-blue-600' },
  { label: 'Total Departments', value: '12', change: '98% uptime', positive: true, icon: Building2, iconBg: 'bg-emerald-50 text-emerald-600' },
  { label: 'Municipalities', value: '18', change: 'All active', positive: true, icon: Compass, iconBg: 'bg-indigo-50 text-indigo-650' },
  { label: 'Open Complaints', value: '1,286', change: '-6.2% today', positive: true, icon: FileText, iconBg: 'bg-amber-50 text-amber-600' },
];

const ISSUE_PIE_DATA = [
  { name: 'Road Potholes', value: 530, color: '#2563EB' },
  { name: 'Garbage Issues', value: 387, color: '#10B981' },
  { name: 'Water Scarcity', value: 312, color: '#F59E0B' },
  { name: 'Traffic Jam', value: 272, color: '#EF4444' },
];

const COMPLAINT_TRENDS = [
  { month: 'Jan', received: 420, resolved: 380 },
  { month: 'Feb', received: 580, resolved: 520 },
  { month: 'Mar', received: 790, resolved: 710 },
  { month: 'Apr', received: 1100, resolved: 980 },
  { month: 'May', received: 1286, resolved: 1188 },
];

const DEPT_PERFORMANCE = [
  { name: 'Public Works', active: 342, resolved: 1284, sla: 92 },
  { name: 'Water Supply', active: 216, resolved: 943, sla: 88 },
  { name: 'Waste Management', active: 184, resolved: 1102, sla: 95 },
  { name: 'Traffic', active: 139, resolved: 761, sla: 91 },
];

const MAP_PINS = [
  { name: 'Karwar', type: 'Water Leak', severity: 'High', x: '12%', y: '35%' },
  { name: 'Hubballi', type: 'Traffic Jam', severity: 'Medium', x: '26%', y: '18%' },
  { name: 'Dharwad', type: 'Road Pothole', severity: 'High', x: '32%', y: '24%' },
  { name: 'Bengaluru', type: 'Garbage Dump', severity: 'Medium', x: '62%', y: '72%' },
  { name: 'Mangaluru', type: 'Drainage Block', severity: 'High', x: '18%', y: '82%' },
];

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <HeroSection
        badgeText="Enterprise RBAC Enabled"
        badgeIcon={ShieldCheck}
        title="Civic AI Management Console"
        description="Supervise all system administrators, department workflows, audit trails, threat levels, and predictive routing parameters."
        actions={
          <div className="flex flex-wrap gap-2.5">
            {[
              { label: 'Manage Roles', route: '/super-admin/roles', icon: Shield },
              { label: 'Security Firewall', route: '/super-admin/security', icon: Zap },
              { label: 'Health Status', route: '/super-admin/system-health', icon: Activity },
            ].map((action, idx) => {
              const Icon = action.icon;
              return (
                <Button
                  key={idx}
                  onClick={() => navigate(action.route)}
                  variant="outline"
                  icon={Icon}
                  className="border-white/15 bg-white/10 text-white hover:bg-white/15"
                  size="sm"
                >
                  {action.label}
                </Button>
              );
            })}
          </div>
        }
      />

      {/* Stats row grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS_CARDS.map((card, idx) => (
          <StatCard
            key={idx}
            label={card.label}
            value={card.value}
            change={card.change}
            icon={card.icon}
            iconBg={card.iconBg}
          />
        ))}
      </div>

      {/* Map and Category share row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* State Map widget */}
        <Card
          title="State Municipalities Overview"
          subtitle="Real-time coordinates mapped status alert pins"
          action={
            <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-100 uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Live Grid Feed
            </span>
          }
          className="lg:col-span-7"
        >
          <div className="w-full h-80 bg-slate-50 rounded-xl border border-slate-200/80 mt-2 relative overflow-hidden flex items-center justify-center">
            {/* Grid dot matrix grid style */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Coastal border block */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-blue-100/30 border-r border-blue-200/20 transform -skew-x-6"></div>
            <div className="absolute left-4 top-1/2 text-[8px] font-bold text-slate-450 tracking-[0.3em] transform -rotate-90 select-none">ARABIAN SEA</div>

            {/* Render Pins */}
            {MAP_PINS.map((pin, index) => (
              <div
                key={index}
                className="absolute group z-10"
                style={{ left: pin.x, top: pin.y }}
              >
                <div className="flex flex-col items-center relative">
                  <MapPin className={`w-6 h-6 drop-shadow-md cursor-pointer transition-transform hover:scale-110 ${
                    pin.severity === 'High' ? 'text-red-500' : 'text-amber-500'
                  }`} />
                  
                  {/* Tooltip detail overlay popup */}
                  <div className="absolute bottom-full mb-1 bg-slate-900 border border-slate-800 text-white rounded-lg p-2 shadow-2xl hidden group-hover:block whitespace-nowrap z-25">
                    <p className="text-[10px] font-black">{pin.name}</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">{pin.type}</p>
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold mt-1 ${
                      pin.severity === 'High' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      Severity: {pin.severity}
                    </span>
                  </div>

                  <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-sm text-[8px] font-black text-slate-700 mt-1 select-none">
                    {pin.name}
                  </span>
                </div>
              </div>
            ))}

            {/* Mini Legend details */}
            <div className="absolute bottom-4 right-4 bg-white border border-slate-200/80 rounded-xl p-3 shadow-md min-w-[110px]">
              <p className="text-[9px] font-bold text-slate-800 uppercase tracking-wider mb-2">Severity Rank</p>
              <ul className="space-y-1 text-[8px] font-semibold text-slate-500">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  <span>High Emergency</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>Medium Warning</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Low Alert</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Issue category share */}
        <Card
          title="Issue Category Share"
          subtitle="Percentage distribution across active types"
          className="lg:col-span-5 flex flex-col justify-between"
        >
          <div className="w-full h-56 flex justify-center items-center mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ISSUE_PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={78}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {ISSUE_PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Legend iconType="circle" iconSize={8} fontSize={10} wrapperStyle={{ fontSize: 11, fontWeight: 550 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
              <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Critical SLA</span>
              <span className="text-sm font-black text-red-550 block mt-0.5">37 alerts</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
              <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">AI Classification</span>
              <span className="text-sm font-black text-purple-600 block mt-0.5">97.8% Confidence</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Row 3: Trend area chart & active list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Velocity Chart */}
        <Card
          title="Monthly Complaint Velocity"
          action={<span className="text-[10px] text-slate-500 font-bold bg-slate-50 border border-slate-200/80 rounded-lg px-2.5 py-1">Last 5 Months</span>}
        >
          <div className="w-full h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={COMPLAINT_TRENDS} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} tick={{ fontWeight: 550 }} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tick={{ fontWeight: 550 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Area type="monotone" name="Submitted" dataKey="received" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorRec)" />
                <Area type="monotone" name="Resolved" dataKey="resolved" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorRes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Department Tracker Watch list */}
        <Card
          title="Department Status Watch"
          subtitle="Workload distribution and SLA performance tracker"
          action={
            <button onClick={() => navigate('/super-admin/departments')} className="text-xs text-[#2563EB] font-bold flex items-center gap-1 hover:underline">
              View All <ArrowRight size={14} />
            </button>
          }
        >
          <div className="divide-y divide-slate-100 mt-2">
            {DEPT_PERFORMANCE.map((dept, index) => (
              <div key={index} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{dept.name}</h4>
                  <p className="text-[10px] text-slate-450 font-semibold mt-0.5">{dept.active} active | {dept.resolved} resolved</p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-800 block">{dept.sla}% Compliance</span>
                  <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden inline-block border border-slate-200/50">
                    <div className="h-full bg-[#2563EB] rounded-full" style={{ width: `${dept.sla}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
