import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import {
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  Timer,
  Smile,
  TrendingUp,
} from 'lucide-react';

const iconMap = {
  FileText, CheckCircle, Clock, AlertTriangle, Users, Timer, Smile, TrendingUp,
};

const kpiData = [
  { id: 1, title: 'Total Complaints', value: '12,450', change: '+12.5%', isUp: true, icon: 'FileText', color: '#3b82f6', bg: '#eff6ff', chartData: [20, 35, 28, 45, 38, 52, 45] },
  { id: 2, title: 'Resolved Today', value: '84', change: '+7.3%', isUp: true, icon: 'CheckCircle', color: '#10b981', bg: '#ecfdf5', chartData: [10, 15, 12, 20, 18, 22, 25] },
  { id: 3, title: 'Pending Complaints', value: '3,120', change: '-8.2%', isUp: false, icon: 'Clock', color: '#f59e0b', bg: '#fffbeb', chartData: [40, 35, 38, 30, 32, 28, 25] },
  { id: 4, title: 'High Priority', value: '486', change: '+3.1%', isUp: true, icon: 'AlertTriangle', color: '#ef4444', bg: '#fef2f2', chartData: [8, 12, 10, 15, 13, 11, 14] },
  { id: 5, title: 'Field Officers', value: '156', change: '+5.2%', isUp: true, icon: 'Users', color: '#8b5cf6', bg: '#f5f3ff', chartData: [120, 125, 130, 140, 145, 150, 156] },
  { id: 6, title: 'Avg Resolution Time', value: '2.4 days', change: '-12.5%', isUp: true, icon: 'Timer', color: '#0ea5e9', bg: '#f0f9ff', chartData: [4.5, 4.2, 3.8, 3.5, 3.2, 2.8, 2.4] },
  { id: 7, title: 'Citizen Satisfaction', value: '94.2%', change: '+2.1%', isUp: true, icon: 'Smile', color: '#10b981', bg: '#ecfdf5', chartData: [85, 87, 88, 90, 91, 92, 94.2] },
  { id: 8, title: 'Monthly Performance', value: '87.6%', change: '+4.3%', isUp: true, icon: 'TrendingUp', color: '#2563eb', bg: '#eff6ff', chartData: [72, 75, 78, 82, 84, 86, 87.6] },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const KPICards = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {kpiData.map((kpi) => {
        const Icon = iconMap[kpi.icon];
        const chartDataPoints = kpi.chartData.map((val, i) => ({ v: val }));

        return (
          <motion.div
            key={kpi.id}
            variants={item}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group relative bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden"
          >
            {/* Gradient Border Top */}
            <div className="absolute top-0 left-4 right-4 h-0.5 bg-gradient-to-r from-civic-600 to-secondary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${kpi.bg} transition-transform duration-200 group-hover:scale-110`}>
                  <Icon size={20} style={{ color: kpi.color }} />
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                  kpi.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                }`}>
                  <svg className={`w-3 h-3 ${kpi.isUp ? '' : 'rotate-180'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                  {kpi.change}
                </span>
              </div>

              {/* Value */}
              <h3 className="text-2xl font-bold text-text-primary mb-1">{kpi.value}</h3>
              <p className="text-xs font-medium text-text-secondary">{kpi.title}</p>

              {/* Mini Chart */}
              <div className="mt-3 h-10 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartDataPoints}>
                    <defs>
                      <linearGradient id={`grad-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={kpi.color} stopOpacity={0.2} />
                        <stop offset="100%" stopColor={kpi.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={kpi.color}
                      strokeWidth={2}
                      fill={`url(#grad-${kpi.id})`}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default KPICards;

