import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Briefcase, CheckCircle, Clock, UserPlus } from 'lucide-react';

const officers = [
  { id: 'O-101', name: 'Mark Davis', dept: 'Roads', status: 'Online', role: 'Senior Inspector', rating: 4.8, assigned: 12, completed: 45, performance: 94, avgTime: '1.8d', avatar: 'https://ui-avatars.com/api/?name=Mark+Davis&background=2563eb&color=fff&bold=true' },
  { id: 'O-102', name: 'Emily Clark', dept: 'Water Supply', status: 'Offline', role: 'Field Officer', rating: 4.5, assigned: 8, completed: 32, performance: 88, avgTime: '2.2d', avatar: 'https://ui-avatars.com/api/?name=Emily+Clark&background=0f766e&color=fff&bold=true' },
  { id: 'O-103', name: 'David Lee', dept: 'Sanitation', status: 'Online', role: 'Supervisor', rating: 4.9, assigned: 15, completed: 58, performance: 97, avgTime: '1.5d', avatar: 'https://ui-avatars.com/api/?name=David+Lee&background=10b981&color=fff&bold=true' },
  { id: 'O-104', name: 'Susan Hall', dept: 'Electricity', status: 'Online', role: 'Sr. Technician', rating: 4.6, assigned: 10, completed: 38, performance: 91, avgTime: '2.0d', avatar: 'https://ui-avatars.com/api/?name=Susan+Hall&background=f59e0b&color=fff&bold=true' },
  { id: 'O-105', name: 'Robert Chen', dept: 'Traffic', status: 'Away', role: 'Traffic Inspector', rating: 4.7, assigned: 6, completed: 28, performance: 93, avgTime: '1.6d', avatar: 'https://ui-avatars.com/api/?name=Robert+Chen&background=8b5cf6&color=fff&bold=true' },
];

const OfficerCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {officers.map((o, i) => (
        <motion.div
          key={o.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ y: -3 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-card p-4 hover:shadow-elevated transition-all duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="relative">
              <img src={o.avatar} alt={o.name} className="w-11 h-11 rounded-xl" />
              <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                o.status === 'Online' ? 'bg-emerald-500' : o.status === 'Away' ? 'bg-amber-500' : 'bg-gray-400'
              }`} />
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={12} fill="currentColor" />
              <span className="text-xs font-bold text-text-primary">{o.rating}</span>
            </div>
          </div>

          {/* Info */}
          <h4 className="text-sm font-bold text-text-primary">{o.name}</h4>
          <p className="text-[11px] text-text-secondary flex items-center gap-1 mt-0.5">
            <Briefcase size={11} />
            {o.role}
          </p>
          <p className="text-[11px] text-text-secondary flex items-center gap-1 mt-0.5">
            <MapPin size={11} />
            {o.dept}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100">
            <div className="text-center">
              <p className="text-xs font-bold text-text-primary">{o.assigned}</p>
              <p className="text-[9px] text-text-secondary">Active</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-text-primary">{o.completed}</p>
              <p className="text-[9px] text-text-secondary">Done</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-text-primary">{o.performance}%</p>
              <p className="text-[9px] text-text-secondary">Perf.</p>
            </div>
          </div>

          {/* Performance Bar */}
          <div className="mt-3">
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${o.performance}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="h-full rounded-full bg-gradient-to-r from-civic-600 to-secondary-600"
              />
            </div>
          </div>

          {/* Quick Assign */}
          <button className="w-full mt-3 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-civic-600 bg-civic-50 hover:bg-civic-100 rounded-xl transition-colors">
            <UserPlus size={14} />
            Quick Assign
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default OfficerCards;

