import React from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertTriangle, Info, MessageSquare, CheckCircle, Shield, AlertCircle } from 'lucide-react';

const notifications = [
  { id: 'N-1', title: 'New Complaint Filed', message: 'Critical water pipe burst reported in downtown area', time: '2 hours ago', read: false, type: 'alert', icon: AlertCircle, color: '#ef4444' },
  { id: 'N-2', title: 'Complaint Escalated', message: 'C-1245 escalated to high priority status', time: '3 hours ago', read: false, type: 'warning', icon: AlertTriangle, color: '#f59e0b' },
  { id: 'N-3', title: 'Deadline Approaching', message: 'Complaint C-1246 due for completion in 3 days', time: '5 hours ago', read: false, type: 'info', icon: Info, color: '#3b82f6' },
  { id: 'N-4', title: 'Citizen Reply', message: 'Priya Patel replied to C-1246 with additional photos', time: '6 hours ago', read: false, type: 'message', icon: MessageSquare, color: '#10b981' },
  { id: 'N-5', title: 'System Maintenance', message: 'Scheduled maintenance Saturday 2-4 AM', time: '1 day ago', read: true, type: 'system', icon: Shield, color: '#0ea5e9' },
];

const NotificationsWidget = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-50">
            <Bell className="w-4 h-4 text-red-500" />
          </div>
          <h3 className="text-base font-bold text-text-primary">Notifications</h3>
          <span className="w-5 h-5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            4
          </span>
        </div>
        <span className="text-[10px] font-medium text-civic-600 cursor-pointer hover:underline">Mark all read</span>
      </div>

      <div className="space-y-1">
        {notifications.map((n, i) => {
          const Icon = n.icon;
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className={`flex items-start gap-2.5 p-2.5 rounded-xl transition-colors cursor-pointer ${
                !n.read ? 'bg-civic-50/50 hover:bg-civic-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className={`p-1.5 rounded-lg flex-shrink-0 ${!n.read ? 'bg-white shadow-sm' : ''}`}>
                <Icon size={14} style={{ color: n.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className={`text-xs ${!n.read ? 'font-bold text-text-primary' : 'font-medium text-text-secondary'}`}>
                    {n.title}
                  </p>
                  {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-civic-600 flex-shrink-0" />}
                </div>
                <p className="text-[10px] text-text-secondary/70 mt-0.5">{n.message}</p>
                <p className="text-[9px] text-text-secondary/50 mt-0.5">{n.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <button className="w-full py-2 text-xs font-medium text-civic-600 hover:text-civic-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
        View All Notifications
      </button>
    </div>
  );
};

export default NotificationsWidget;

