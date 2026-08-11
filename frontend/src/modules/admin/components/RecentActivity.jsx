import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, CheckCircle, XCircle, FilePlus, Brain, UserCheck, AlertTriangle, Shield, Clock, Activity } from 'lucide-react';

const activities = [
  { id: 'A-1', type: 'assigned', message: 'Complaint C-1246 assigned to Emily Clark', time: '2 min ago', icon: UserPlus, color: '#3b82f6' },
  { id: 'A-2', type: 'updated', message: 'Complaint C-1247 marked as Resolved', time: '15 min ago', icon: CheckCircle, color: '#10b981' },
  { id: 'A-3', type: 'closed', message: 'Complaint C-1249 closed successfully', time: '1 hour ago', icon: XCircle, color: '#6b7280' },
  { id: 'A-4', type: 'new', message: 'New complaint C-1251 - Critical water pipe burst', time: '2 hours ago', icon: FilePlus, color: '#ef4444' },
  { id: 'A-5', type: 'ai', message: 'AI identified duplicate complaints C-1248 & C-1239', time: '3 hours ago', icon: Brain, color: '#8b5cf6' },
  { id: 'A-6', type: 'officer', message: 'Mark Davis completed 2 complaints today', time: '4 hours ago', icon: UserCheck, color: '#10b981' },
  { id: 'A-7', type: 'alert', message: 'C-1245 deadline approaching - Due in 5 days', time: '5 hours ago', icon: AlertTriangle, color: '#f59e0b' },
  { id: 'A-8', type: 'system', message: 'Weekly backup completed successfully', time: '6 hours ago', icon: Shield, color: '#0ea5e9' },
];

const recent = activities.slice(0, 5);

const RecentActivity = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-civic-50">
            <Activity className="w-4 h-4 text-civic-600" />
          </div>
          <h3 className="text-base font-bold text-text-primary">Recent Activity</h3>
        </div>
        <span className="text-[10px] font-medium text-civic-600 cursor-pointer hover:underline">View all</span>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100" />

        <div className="space-y-0">
          {recent.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors relative"
              >
                <div className="relative z-10">
                  <div className="w-5 h-5 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: a.color }} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-text-primary">{a.message}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock size={10} className="text-text-secondary" />
                    <span className="text-[10px] text-text-secondary">{a.time}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;

