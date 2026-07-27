import React, { useState } from 'react';
import { Bell, CheckCircle, Info, AlertTriangle, Check, Filter } from 'lucide-react';
import { citizenNotifications } from '../../data/mockData';

const Notifications = () => {
  const [notifications, setNotifications] = useState(citizenNotifications);
  const [filter, setFilter] = useState('All'); // All, Unread, Read

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'Unread') return !n.read;
    if (filter === 'Read') return n.read;
    return true;
  });

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Notifications</h1>
          <p className="text-gray-600 mt-2">You have {unreadCount} unread messages.</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            className="border border-gray-300 rounded-md px-3 py-2 text-sm font-medium outline-none focus:border-[#005EA5]"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Messages</option>
            <option value="Unread">Unread Only</option>
            <option value="Read">Read Messages</option>
          </select>
          {unreadCount > 0 && (
            <button 
              onClick={markAllRead}
              className="text-sm font-bold text-[#005EA5] hover:underline whitespace-nowrap"
            >
              Mark all as read
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--color-gov-border)' }}>
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => {
              
              // Determine icon based on type
              let Icon = Bell;
              let iconBg = 'bg-gray-100 text-gray-600';
              if (notification.type === 'success') { Icon = CheckCircle; iconBg = 'bg-green-100 text-green-600'; }
              if (notification.type === 'info') { Icon = Info; iconBg = 'bg-blue-100 text-blue-600'; }
              if (notification.type === 'update') { Icon = AlertTriangle; iconBg = 'bg-orange-100 text-orange-600'; }

              return (
                <div 
                  key={notification.id} 
                  className={`p-6 flex gap-4 transition-colors ${!notification.read ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                      <h3 className={`text-base ${!notification.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs font-medium text-gray-500 whitespace-nowrap">{notification.date}</span>
                    </div>
                    <p className={`text-sm ${!notification.read ? 'text-gray-800' : 'text-gray-500'}`}>
                      {notification.message}
                    </p>
                    
                    {!notification.read && (
                      <div className="mt-3">
                        <button className="text-xs font-bold text-[#005EA5] flex items-center gap-1 hover:underline">
                          <Check size={14} /> Mark as read
                        </button>
                      </div>
                    )}
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-[#005EA5] shrink-0 mt-2"></div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <Bell size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-lg font-medium">No notifications found.</p>
            <p className="text-sm mt-1">You're all caught up!</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Notifications;
