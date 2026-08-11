import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Clock, User, Tag, AlertCircle, FileText, MessageSquare, UserCheck, CheckCircle, XCircle } from 'lucide-react';

const ComplaintDetailsDrawer = ({ complaint, isOpen, onClose }) => {
  if (!complaint) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-text-primary">{complaint.id}</h2>
                <p className="text-xs text-text-secondary">{complaint.citizen}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 text-text-secondary transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-6">
              {/* Status & Priority */}
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-xs font-semibold rounded-md border ${
                  complaint.priority === 'Critical' ? 'bg-red-50 text-red-600 border-red-200' :
                  complaint.priority === 'High' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                  complaint.priority === 'Medium' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                  'bg-gray-50 text-gray-600 border-gray-200'
                }`}>
                  {complaint.priority}
                </span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-md border ${
                  complaint.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                  complaint.status === 'In Progress' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                  'bg-amber-50 text-amber-600 border-amber-200'
                }`}>
                  {complaint.status}
                </span>
              </div>

              {/* Citizen Info */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <h4 className="text-xs font-bold text-text-primary mb-3 flex items-center gap-2">
                  <User size={14} /> Citizen Information
                </h4>
                <div className="flex items-center gap-3">
                  <img src={`https://ui-avatars.com/api/?name=${complaint.citizen.replace(' ', '+')}&background=2563eb&color=fff&size=40`} alt="" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{complaint.citizen}</p>
                    <p className="text-xs text-text-secondary">contact@email.com</p>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-text-primary flex items-center gap-2">
                  <FileText size={14} /> Complaint Details
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Category', value: complaint.category, icon: Tag },
                    { label: 'Date Reported', value: complaint.date, icon: Calendar },
                    { label: 'Due Date', value: complaint.due, icon: Clock },
                    { label: 'Assigned To', value: complaint.officer, icon: UserCheck },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="p-3 rounded-lg bg-white border border-gray-100">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Icon size={12} className="text-text-secondary" />
                          <span className="text-[10px] text-text-secondary">{item.label}</span>
                        </div>
                        <p className="text-xs font-semibold text-text-primary">{item.value}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="p-3 rounded-lg bg-white border border-gray-100">
                  <p className="text-[10px] text-text-secondary mb-1">Description</p>
                  <p className="text-xs text-text-primary">Large pothole on MG Road causing traffic congestion and vehicle damage. Needs immediate repair to prevent accidents.</p>
                </div>
              </div>

              {/* AI Classification */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-civic-50 to-purple-50 border border-civic-100">
                <h4 className="text-xs font-bold text-text-primary flex items-center gap-2 mb-3">
                  <AlertCircle size={14} className="text-civic-600" /> AI Classification
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Category</span>
                    <span className="font-semibold text-text-primary">Infrastructure Hazard</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Urgency Score</span>
                    <span className="font-semibold text-red-600">92/100</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Confidence</span>
                    <span className="font-semibold text-emerald-600">96%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Recommended Officer</span>
                    <span className="font-semibold text-civic-600">Mark Davis</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-text-primary">Activity Timeline</h4>
                <div className="space-y-0">
                  {[
                    { action: 'Complaint Filed', by: 'Citizen Portal', time: 'May 20, 10:30 AM', icon: FileText },
                    { action: 'AI Classification Generated', by: 'AI System', time: 'May 20, 10:31 AM', icon: AlertCircle },
                    { action: 'Assigned to Mark Davis', by: 'System', time: 'May 20, 11:00 AM', icon: UserCheck },
                    { action: 'In Progress', by: 'Mark Davis', time: 'May 21, 09:15 AM', icon: Clock },
                    { action: 'Pending Review', by: 'Mark Davis', time: 'May 22, 02:30 PM', icon: CheckCircle },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 pb-3 relative">
                      <div className="relative z-10">
                        <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                          <item.icon size={12} className="text-text-secondary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-text-primary">{item.action}</p>
                        <p className="text-[10px] text-text-secondary">by {item.by} • {item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-100 flex gap-2">
              <button className="flex items-center gap-1.5 px-4 py-2.5 bg-civic-600 text-white text-xs font-semibold rounded-xl hover:bg-civic-700 transition-colors flex-1 justify-center">
                <UserCheck size={14} /> Assign Officer
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700 transition-colors flex-1 justify-center">
                <CheckCircle size={14} /> Resolve
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-100 text-text-secondary text-xs font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                <MessageSquare size={14} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ComplaintDetailsDrawer;

