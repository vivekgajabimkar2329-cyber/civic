import React from 'react';
import {
  TrendingUp,
  Clock,
  ThumbsUp,
  FileText,
  Calendar,
  Download,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const METRICS_DATA = [
  { label: 'Resolution Rate', value: '92.4%', sub: '+2.1% from last month', icon: TrendingUp, positive: true, bg: 'bg-emerald-50 text-emerald-600' },
  { label: 'Avg. Resolution Time', value: '2.8 Days', sub: '-12 hrs from last month', icon: Clock, positive: true, bg: 'bg-blue-50 text-blue-600' },
  { label: 'Citizen Satisfaction', value: '4.6/5', sub: '+0.3% from last month', icon: ThumbsUp, positive: true, bg: 'bg-purple-50 text-purple-600' },
  { label: 'Total Complaints', value: '12,860', sub: '+12% from last month', icon: FileText, positive: false, bg: 'bg-rose-50 text-rose-600' },
];

const COMPLAINTS_TREND = [
  { month: 'Jan', received: 820, resolved: 780 },
  { month: 'Feb', received: 940, resolved: 890 },
  { month: 'Mar', received: 1120, resolved: 1040 },
  { month: 'Apr', received: 1400, resolved: 1310 },
  { month: 'May', received: 1286, resolved: 1188 },
  { month: 'Jun', received: 1550, resolved: 1420 },
];

const DEPT_PERFORMANCE = [
  { name: 'Roads', complaints: 530, resolved: 490 },
  { name: 'Sanitation', complaints: 387, resolved: 360 },
  { name: 'Water Supply', complaints: 312, resolved: 280 },
  { name: 'Traffic', complaints: 272, resolved: 250 },
  { name: 'Drainage', complaints: 185, resolved: 175 },
];

const Analytics = () => {
  return (
    <div className="py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span>Home</span>
            <span>&gt;</span>
            <span className="text-slate-600">Analytics</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5">System Analytics</h1>
          <p className="text-slate-500 text-sm mt-1">Monitor city-wide performance metrics and response efficiency.</p>
        </div>
        
        <button
          type="button"
          className="inline-flex items-center gap-2 border border-slate-200 bg-white text-xs font-bold py-2.5 px-4 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors shadow-sm focus:outline-none"
        >
          <Download size={14} />
          Export Analytics
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS_DATA.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-start justify-between">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-450 uppercase tracking-wider block">{metric.label}</span>
                <span className="text-3xl font-black text-slate-900 block leading-none">{metric.value}</span>
                <span className={`text-[10px] font-bold block pt-1 ${metric.positive ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {metric.positive ? '▲' : '▼'} {metric.sub}
                </span>
              </div>
              <div className={`p-2.5 rounded-xl ${metric.bg}`}>
                <Icon size={20} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Trend Area Chart */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-sm text-slate-800">Complaints Volume Trend</h3>
            <span className="text-[10px] text-slate-400 font-bold bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1">Last 6 Months</span>
          </div>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={COMPLAINTS_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} />
                <Legend iconType="circle" fontSize={12} wrapperStyle={{ paddingTop: '10px' }} />
                <Area type="monotone" name="Received" dataKey="received" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorReceived)" />
                <Area type="monotone" name="Resolved" dataKey="resolved" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorResolved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Bar Chart */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-sm text-slate-800">Department Performance Comparison</h3>
            <span className="text-[10px] text-slate-400 font-bold bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1">By Issues Volume</span>
          </div>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DEPT_PERFORMANCE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} />
                <Legend iconType="circle" fontSize={12} wrapperStyle={{ paddingTop: '10px' }} />
                <Bar name="Total Complaints" dataKey="complaints" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={32} />
                <Bar name="Resolved Complaints" dataKey="resolved" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SLA table performance block */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-extrabold text-sm text-slate-800">Critical Department SLA Watch</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider bg-slate-50/10">
                <th className="py-3 px-6">Department</th>
                <th className="py-3 px-4">Pending SLA Escalations</th>
                <th className="py-3 px-4">SLA Compliance Rate</th>
                <th className="py-3 px-4">Average Resolution Time</th>
                <th className="py-3 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
              {[
                { name: 'Water Supply Department', escalations: 12, compliance: '84.2%', speed: '3.6 days', tone: 'Critical' },
                { name: 'Roads & Infrastructure Division', escalations: 9, compliance: '89.6%', speed: '3.1 days', tone: 'At Risk' },
                { name: 'Solid Waste Management', escalations: 3, compliance: '94.8%', speed: '2.1 days', tone: 'Good' },
                { name: 'Traffic Management Bureau', escalations: 1, compliance: '97.2%', speed: '1.4 days', tone: 'Good' }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/55 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-slate-800">{row.name}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-700">{row.escalations}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-bold">{row.compliance}</td>
                  <td className="py-3.5 px-4 text-slate-500">{row.speed}</td>
                  <td className="py-3.5 px-6 text-center">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                      row.tone === 'Critical' 
                        ? 'bg-rose-50 border-rose-100 text-rose-700' 
                        : row.tone === 'At Risk' 
                        ? 'bg-amber-50 border-amber-100 text-amber-700' 
                        : 'bg-emerald-50 border-emerald-100 text-emerald-700'
                    }`}>
                      {row.tone}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
