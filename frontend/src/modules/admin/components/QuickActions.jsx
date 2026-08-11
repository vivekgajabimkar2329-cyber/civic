import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, FileText, Download, BarChart3, CheckCircle, AlertTriangle, Eye, Plus, MessageSquare, Users, FileSpreadsheet, Settings } from 'lucide-react';

const actions = [
  { name: 'Assign Officer', icon: UserPlus, color: '#3b82f6', bg: '#eff6ff' },
  { name: 'Generate Report', icon: FileText, color: '#0f766e', bg: '#f0fdfa' },
  { name: 'Export Data', icon: Download, color: '#8b5cf6', bg: '#f5f3ff' },
  { name: 'View Analytics', icon: BarChart3, color: '#f59e0b', bg: '#fffbeb' },
  { name: 'Approve Complaint', icon: CheckCircle, color: '#10b981', bg: '#ecfdf5' },
  { name: 'Escalate', icon: AlertTriangle, color: '#ef4444', bg: '#fef2f2' },
  { name: 'Add Complaint', icon: Plus, color: '#0ea5e9', bg: '#f0f9ff' },
  { name: 'Send Message', icon: MessageSquare, color: '#6366f1', bg: '#eef2ff' },
];

const QuickActions = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-civic-50">
          <Settings className="w-4 h-4 text-civic-600" />
        </div>
        <h3 className="text-base font-bold text-text-primary">Quick Actions</h3>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-card hover:border-gray-200 transition-all duration-200"
            >
              <div className={`p-2 rounded-lg`} style={{ backgroundColor: action.bg }}>
                <Icon size={16} style={{ color: action.color }} />
              </div>
              <span className="text-[9px] font-medium text-text-secondary text-center leading-tight">{action.name}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;

