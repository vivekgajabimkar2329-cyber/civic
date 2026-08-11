import React, { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  Settings,
  MessageSquare,
  Check,
  Trash2,
  CheckSquare,
  Clock,
  Building
} from 'lucide-react';

const INITIAL_NOTIFICATIONS = [
  { id: 1, title: 'Escalation Alert: Complaint SLA Exceeded', desc: 'Complaint #CIV-2026-8809 (Water leak, Karwar) has exceeded its 48-hour resolution SLA without assignment.', date: '10 mins ago', type: 'escalation', read: false },
  { id: 2, title: 'System Notification: Database Backup Completed', desc: 'Automated database cluster backup has completed successfully. Size: 1.8 GB.', date: '1 hour ago', type: 'system', read: true },
  { id: 3, title: 'Feedback Alert: High Citizen Rating', desc: 'Citizen Ramesh Kumar rated resolving complaint #CIV-2026-8274 as 5/5 stars with positive notes.', date: '2 hours ago', type: 'feedback', read: false },
  { id: 4, title: 'New Department Added', desc: 'Department Admin added a new municipality department: Waste Management Division in Belagavi.', date: 'Yesterday', type: 'system', read: true },
  { id: 5, title: 'SLA Escalation Imminent', desc: 'Complaint #CIV-2026-8105 (Broken street light, Bengaluru) is within 2 hours of SLA deadline.', date: 'Yesterday', type: 'escalation', read: true },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState('All');

  const filteredNotifications = notifications.filter(item => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Escalations') return item.type === 'escalation';
    if (activeTab === 'System') return item.type === 'system';
    if (activeTab === 'Feedback') return item.type === 'feedback';
    return true;
  });

  const markAllAsRead = () => {
    setNotifications(notifications.map(item => ({ ...item, read: true })));
  };

  const toggleRead = (id) => {
    setNotifications(notifications.map(item => item.id === id ? { ...item, read: !item.read } : item));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(item => item.id !== id));
  };

  return (
    <div className="py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span>Home</span>
            <span>&gt;</span>
            <span className="text-slate-600">Notifications</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5">Notifications</h1>
          <p className="text-slate-500 text-sm mt-1">Manage system alerts, escalations, and administrative notifications.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={markAllAsRead}
            className="inline-flex items-center gap-1.5 border border-slate-200 bg-white text-xs font-bold py-2.5 px-4 rounded-xl text-slate-650 hover:bg-slate-50 transition-colors shadow-sm focus:outline-none"
          >
            <CheckSquare size={14} />
            Mark All Read
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 bg-slate-50/50 p-4 flex flex-wrap gap-2">
          {['All', 'Escalations', 'System', 'Feedback'].map((tab) => {
            const isSelected = activeTab === tab;
            const count = tab === 'All' ? notifications.length : notifications.filter(n => {
              if (tab === 'Escalations') return n.type === 'escalation';
              if (tab === 'System') return n.type === 'system';
              if (tab === 'Feedback') return n.type === 'feedback';
              return false;
            }).length;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold py-2 px-4 rounded-xl transition-all ${
                  isSelected 
                    ? 'bg-[#0b83ff] text-white shadow-md shadow-blue-500/10' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                {tab} ({count})
              </button>
            );
          })}
        </div>

        {/* Notifications Feed List */}
        <div className="divide-y divide-slate-150">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => {
              let iconStyle = 'bg-slate-100 text-slate-600';
              let Icon = Bell;
              if (notif.type === 'escalation') {
                iconStyle = 'bg-rose-50 text-rose-600';
                Icon = AlertTriangle;
              } else if (notif.type === 'feedback') {
                iconStyle = 'bg-purple-50 text-purple-650';
                Icon = MessageSquare;
              } else if (notif.type === 'system') {
                iconStyle = 'bg-blue-50 text-blue-600';
                Icon = Settings;
              }

              return (
                <div key={notif.id} className={`p-5 flex items-start justify-between gap-6 hover:bg-slate-50/30 transition-colors ${
                  !notif.read ? 'bg-blue-50/10' : ''
                }`}>
                  <div className="flex gap-4 items-start">
                    <div className={`p-2.5 rounded-xl shrink-0 ${iconStyle}`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className={`text-xs font-bold ${notif.read ? 'text-slate-650' : 'text-slate-900'}`}>{notif.title}</h4>
                        {!notif.read && <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>}
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{notif.desc}</p>
                      <span className="text-[10px] text-slate-400 font-semibold mt-1.5 block">{notif.date}</span>
                    </div>
                  </div>

                  {/* Notification Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleRead(notif.id)}
                      className="p-2 border border-slate-200 text-slate-400 hover:text-teal-800 hover:bg-slate-50 rounded-xl transition-colors focus:outline-none"
                      title={notif.read ? 'Mark Unread' : 'Mark Read'}
                    >
                      <Check size={14} className={notif.read ? 'text-slate-300' : 'text-teal-600'} />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteNotification(notif.id)}
                      className="p-2 border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-slate-50 rounded-xl transition-colors focus:outline-none"
                      title="Delete Alert"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-400 font-bold">
              No notifications found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
