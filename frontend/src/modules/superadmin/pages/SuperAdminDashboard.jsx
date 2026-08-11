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
  BarChart3
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
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

const STATS_CARDS = [
  { label: 'Total Users', value: '45,284', change: '+12.4%', positive: true, icon: Users, bg: 'bg-blue-50 text-blue-650' },
  { label: 'Total Departments', value: '12', change: '98% uptime', positive: true, icon: Building2, bg: 'bg-emerald-50 text-emerald-650' },
  { label: 'Municipalities', value: '18', change: 'All active', positive: true, icon: Compass, bg: 'bg-indigo-50 text-indigo-650' },
  { label: 'Open Complaints', value: '1,286', change: '-6.2% today', positive: true, icon: FileText, bg: 'bg-amber-50 text-amber-650' },
];

const ISSUE_PIE_DATA = [
  { name: 'Road Potholes', value: 530, color: '#3b82f6' },
  { name: 'Garbage Issues', value: 387, color: '#10b981' },
  { name: 'Water Scarcity', value: 312, color: '#f59e0b' },
  { name: 'Traffic Jam', value: 272, color: '#ef4444' },
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
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const dateObj = new Date();
      setCurrentTime(dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Top Welcome Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Command Center</h1>
          <p className="text-slate-500 text-sm mt-1">Cross-department operations, system health diagnostics, and security configurations.</p>
        </div>

        <div className="flex items-center gap-3 bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 shadow-sm text-xs font-bold text-slate-600">
          <div className="flex items-center gap-1.5 border-r pr-3 border-slate-200">
            <Clock size={14} className="text-blue-600" />
            <span>{currentTime}</span>
          </div>
          <span>{currentDate}</span>
        </div>
      </div>

      {/* Hero Welcome banner */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-black tracking-wider uppercase">
              <Shield size={12} className="text-emerald-400" />
              Enterprise RBAC Enabled
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Civic AI Management Console</h2>
            <p className="text-xs text-slate-350 leading-relaxed">
              Supervise all system administrators, department workflows, audit trails, threat levels, and predictive routing parameters.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            {[
              { label: 'Manage Roles', route: '/super-admin/roles', icon: Shield },
              { label: 'Security Firewall', route: '/super-admin/security', icon: Zap },
              { label: 'Health Status', route: '/super-admin/system-health', icon: Activity },
            ].map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  onClick={() => navigate(action.route)}
                  className="bg-white/10 hover:bg-white/15 text-white border border-white/10 px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2"
                >
                  <Icon size={14} />
                  {action.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS_CARDS.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-450 uppercase tracking-wider block">{card.label}</span>
                <span className="text-3xl font-black text-slate-900 block leading-none">{card.value}</span>
                <span className="text-[10px] text-emerald-600 font-bold block pt-1">{card.change}</span>
              </div>
              <div className={`p-2.5 rounded-xl ${card.bg}`}>
                <Icon size={20} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Map & Trend Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Map */}
        <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-50 pb-3">
            <div>
              <h3 className="font-extrabold text-sm text-slate-800">State Municipalities Overview</h3>
              <p className="text-[10px] text-slate-400 mt-0.5 font-bold">Real-time coordinates mapped status alert pins</p>
            </div>
            <span className="text-[9px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Live Grid Feed
            </span>
          </div>

          {/* Karnataka Map Widget Container */}
          <div className="w-full h-80 bg-slate-50 rounded-2xl border border-slate-150 relative overflow-hidden flex items-center justify-center">
            {/* Grid dot matrix grid style */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0b83ff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Coastal border block */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-blue-100/30 border-r border-blue-200/20 transform -skew-x-6"></div>
            <div className="absolute left-4 top-1/2 text-[8px] font-bold text-blue-450 tracking-[0.3em] transform -rotate-90 select-none">ARABIAN SEA</div>

            {/* Render Pins */}
            {MAP_PINS.map((pin, index) => (
              <div
                key={index}
                className="absolute group z-10"
                style={{ left: pin.x, top: pin.y }}
              >
                <div className="flex flex-col items-center relative">
                  <MapPin className={`w-6 h-6 drop-shadow-md cursor-pointer transition-transform hover:scale-110 ${
                    pin.severity === 'High' ? 'text-rose-600' : 'text-amber-500'
                  }`} />
                  
                  {/* Tooltip detail overlay popup */}
                  <div className="absolute bottom-full mb-1 bg-slate-900 border border-slate-850 text-white rounded-lg p-2 shadow-2xl hidden group-hover:block whitespace-nowrap z-20">
                    <p className="text-xs font-black">{pin.name}</p>
                    <p className="text-[9px] text-slate-355 mt-0.5">{pin.type}</p>
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold mt-1 ${
                      pin.severity === 'High' ? 'bg-rose-500/20 text-rose-355' : 'bg-amber-500/20 text-amber-355'
                    }`}>
                      Severity: {pin.severity}
                    </span>
                  </div>

                  <span className="bg-white px-1.5 py-0.5 rounded border border-slate-150 shadow-sm text-[8px] font-black text-slate-800 mt-1 select-none">
                    {pin.name}
                  </span>
                </div>
              </div>
            ))}

            {/* Mini Legend details */}
            <div className="absolute bottom-4 right-4 bg-white border border-slate-200 rounded-xl p-3 shadow-md min-w-[110px]">
              <p className="text-[9px] font-black text-slate-800 uppercase tracking-wider mb-2">Severity Rank</p>
              <ul className="space-y-1 text-[8px] font-bold text-slate-600">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
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
        </div>

        {/* Right Column: Issue Share pie */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
          <div>
            <h3 className="font-extrabold text-sm text-slate-800">Issue Category Share</h3>
            <p className="text-[10px] text-slate-400 mt-0.5 font-bold">Percentage distribution across active types</p>
          </div>

          <div className="w-full h-56 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ISSUE_PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {ISSUE_PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Legend iconType="circle" fontSize={11} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Quick stats bottom summary */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Critical SLA</span>
              <span className="text-base font-black text-rose-600 block mt-0.5">37 alerts</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">AI Classification</span>
              <span className="text-base font-black text-purple-600 block mt-0.5">97.8% Confidence</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance & Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Area Chart */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-50 pb-3">
            <h3 className="font-extrabold text-sm text-slate-800">Monthly Complaint Velocity</h3>
            <span className="text-[10px] text-slate-400 font-bold bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1">Last 5 Months</span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={COMPLAINT_TRENDS} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Area type="monotone" name="Submitted" dataKey="received" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRec)" />
                <Area type="monotone" name="Resolved" dataKey="resolved" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Active Departments list */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-50 pb-3">
            <div>
              <h3 className="font-extrabold text-sm text-slate-800">Department Status Watch</h3>
              <p className="text-[10px] text-slate-400 mt-0.5 font-bold">Workload distribution and SLA performance tracker</p>
            </div>
            <button onClick={() => navigate('/super-admin/departments')} className="text-[10px] text-blue-600 font-extrabold flex items-center gap-1">
              View All <ArrowRight size={12} />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {DEPT_PERFORMANCE.map((dept, index) => (
              <div key={index} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{dept.name}</h4>
                  <p className="text-[10px] text-slate-450 font-semibold mt-0.5">{dept.active} active | {dept.resolved} resolved</p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-extrabold text-slate-800 block">{dept.sla}% Compliance</span>
                  <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden inline-block">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${dept.sla}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
