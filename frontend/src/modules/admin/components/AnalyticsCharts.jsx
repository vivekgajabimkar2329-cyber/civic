import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import { Maximize2, Download } from 'lucide-react';

const complaintsOverTime = [
  { month: 'Jan', complaints: 850, resolved: 720 },
  { month: 'Feb', complaints: 920, resolved: 780 },
  { month: 'Mar', complaints: 1080, resolved: 910 },
  { month: 'Apr', complaints: 960, resolved: 850 },
  { month: 'May', complaints: 1120, resolved: 950 },
];

const complaintsByCategory = [
  { name: 'Roads', value: 35, color: '#3b82f6' },
  { name: 'Water', value: 25, color: '#0f766e' },
  { name: 'Sanitation', value: 20, color: '#10b981' },
  { name: 'Electricity', value: 10, color: '#f59e0b' },
  { name: 'Traffic', value: 7, color: '#8b5cf6' },
  { name: 'Others', value: 3, color: '#ef4444' },
];

const statusDistribution = [
  { name: 'Resolved', value: 60, color: '#10b981' },
  { name: 'In Progress', value: 15, color: '#3b82f6' },
  { name: 'Pending', value: 25, color: '#f59e0b' },
];

const weeklyPerformance = [
  { day: 'Mon', resolved: 45, received: 52 },
  { day: 'Tue', resolved: 52, received: 48 },
  { day: 'Wed', resolved: 38, received: 40 },
  { day: 'Thu', resolved: 65, received: 72 },
  { day: 'Fri', resolved: 58, received: 60 },
  { day: 'Sat', resolved: 35, received: 38 },
  { day: 'Sun', resolved: 28, received: 55 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-elevated px-4 py-3">
        <p className="text-sm font-semibold text-text-primary mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-sm" style={{ color: p.color }}>
            {p.name}: <span className="font-bold">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ChartCard = ({ title, children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white rounded-2xl border border-gray-100 shadow-card p-5 ${className}`}
  >
    <div className="flex items-center justify-between mb-5">
      <h3 className="text-base font-bold text-text-primary">{title}</h3>
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded-lg text-text-secondary hover:bg-gray-100 transition-colors" title="Download">
          <Download size={14} />
        </button>
        <button className="p-1.5 rounded-lg text-text-secondary hover:bg-gray-100 transition-colors" title="Expand">
          <Maximize2 size={14} />
        </button>
      </div>
    </div>
    {children}
  </motion.div>
);

const AnalyticsCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Line Chart - Complaints Over Time */}
      <ChartCard title="Complaints Over Time" className="xl:col-span-2">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={complaintsOverTime} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                height={36}
                formatter={(value) => <span className="text-sm text-text-secondary">{value}</span>}
              />
              <Line type="monotone" dataKey="complaints" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Pie Chart - Status Distribution */}
      <ChartCard title="Status Distribution">
        <div className="h-64 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusDistribution}
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute flex flex-col items-center">
            <span className="text-xl font-bold text-text-primary">12K</span>
            <span className="text-[10px] text-text-secondary">Total</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-2 justify-center">
          {statusDistribution.map((s, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-text-secondary">{s.name}</span>
              <span className="font-semibold text-text-primary">{s.value}%</span>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Bar Chart - Category Distribution */}
      <ChartCard title="Category Distribution">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={complaintsByCategory} layout="vertical" margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} width={70} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={12}>
                {complaintsByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Area Chart - Weekly Performance */}
      <ChartCard title="Weekly Performance" className="xl:col-span-2">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyPerformance} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <defs>
                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                height={36}
                formatter={(value) => <span className="text-sm text-text-secondary">{value}</span>}
              />
              <Area type="monotone" dataKey="received" stroke="#3b82f6" strokeWidth={2} fill="url(#colorReceived)" dot={{ r: 3 }} activeDot={{ r: 5 }} />
              <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} fill="url(#colorResolved)" dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default AnalyticsCharts;

