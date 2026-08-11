import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const WelcomeBanner = ({ departmentName = 'Roads Department' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-civic-600 via-civic-700 to-secondary-700 p-6 lg:p-8"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-400 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="grid grid-cols-6 gap-4 opacity-5 rotate-12">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white rounded-full" />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              Welcome Back, {departmentName} Admin
            </h1>
            <motion.span
              animate={{ rotate: [0, 20, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
              className="text-2xl"
            >
              👋
            </motion.span>
          </div>
          <p className="text-civic-100 text-sm lg:text-base max-w-xl leading-relaxed">
            Monitor complaints, assign officers, track progress and improve service delivery across your department.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl border border-white/20 transition-all duration-200 text-sm font-medium shadow-lg"
          >
            <Sparkles size={16} />
            <span>AI Insights</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-white text-civic-700 px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-civic-900/20 hover:shadow-xl hover:shadow-civic-900/30 transition-all duration-200 text-sm"
          >
            <span>View Reports</span>
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="relative z-10 mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Active Complaints', value: '1,240', change: '+8%' },
          { label: 'Officers Online', value: '42', change: '+5' },
          { label: 'Resolved This Week', value: '186', change: '+12%' },
          { label: 'Avg Response Time', value: '1.8h', change: '-15%' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10"
          >
            <p className="text-civic-200 text-xs font-medium">{stat.label}</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-white font-bold text-lg">{stat.value}</span>
              <span className={`text-xs font-semibold ${stat.change.startsWith('+') ? 'text-emerald-300' : 'text-amber-300'}`}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WelcomeBanner;

