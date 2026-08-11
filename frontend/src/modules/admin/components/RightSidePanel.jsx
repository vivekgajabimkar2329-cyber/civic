import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, AlertTriangle, Clock, CheckCircle, Shield, ArrowUpRight, Users, Activity } from 'lucide-react';

const deadlines = [
  { id: 'C-1251', title: 'Water pipe burst', due: 'May 24, 2025', daysLeft: 2, priority: 'Critical' },
  { id: 'C-1246', title: 'Water leakage Block A', due: 'May 25, 2025', daysLeft: 3, priority: 'Medium' },
  { id: 'C-1248', title: 'Street light not working', due: 'May 26, 2025', daysLeft: 4, priority: 'Medium' },
  { id: 'C-1245', title: 'Road damage MG Road', due: 'May 27, 2025', daysLeft: 5, priority: 'High' },
];

const RightSidePanel = () => {
  return (
    <div className="space-y-5">
      {/* Upcoming Deadlines */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-orange-50">
            <Calendar className="w-4 h-4 text-orange-500" />
          </div>
          <h3 className="text-sm font-bold text-text-primary">Upcoming Deadlines</h3>
        </div>
        <div className="space-y-1.5">
          {deadlines.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-card transition-all cursor-pointer"
            >
              <div className={`w-1.5 h-8 rounded-full ${
                d.daysLeft <= 2 ? 'bg-red-500' : d.daysLeft <= 3 ? 'bg-amber-500' : 'bg-blue-500'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-text-primary">{d.title}</p>
                <p className="text-[10px] text-text-secondary">{d.due}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                d.daysLeft <= 2 ? 'bg-red-50 text-red-600' : d.daysLeft <= 3 ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
              }`}>
                {d.daysLeft}d left
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-50">
            <Activity className="w-4 h-4 text-emerald-500" />
          </div>
          <h3 className="text-sm font-bold text-text-primary">System Status</h3>
        </div>
        <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
          <div className="space-y-3">
            {[
              { label: 'API Server', status: 'Operational', color: '#10b981' },
              { label: 'Database', status: 'Healthy', color: '#10b981' },
              { label: 'AI Engine', status: 'Operational', color: '#10b981' },
              { label: 'Notification Service', status: 'Degraded', color: '#f59e0b' },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">{s.label}</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-[10px] font-medium" style={{ color: s.color }}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-civic-50">
            <Users className="w-4 h-4 text-civic-600" />
          </div>
          <h3 className="text-sm font-bold text-text-primary">Today's Summary</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'New', value: '18', color: '#3b82f6' },
            { label: 'Resolved', value: '24', color: '#10b981' },
            { label: 'Pending', value: '42', color: '#f59e0b' },
            { label: 'Escalated', value: '3', color: '#ef4444' },
          ].map((stat, i) => (
            <div key={i} className="p-3 rounded-xl bg-white border border-gray-100 text-center">
              <p className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-[10px] text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Meetings */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-50">
            <Clock className="w-4 h-4 text-purple-500" />
          </div>
          <h3 className="text-sm font-bold text-text-primary">Today's Schedule</h3>
        </div>
        <div className="p-3 rounded-xl bg-white border border-gray-100 shadow-sm">
          <div className="space-y-2.5">
            {[
              { time: '10:00 AM', title: 'Dept. Standup', color: '#3b82f6' },
              { time: '02:00 PM', title: 'Officer Review', color: '#10b981' },
              { time: '04:30 PM', title: 'Weekly Report', color: '#8b5cf6' },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
                <span className="text-[10px] font-medium text-text-secondary w-16">{m.time}</span>
                <span className="text-[11px] font-medium text-text-primary">{m.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidePanel;

