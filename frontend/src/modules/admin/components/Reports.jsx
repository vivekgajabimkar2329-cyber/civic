import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, FileSpreadsheet, Calendar, Clock, ChevronRight } from 'lucide-react';

const reports = [
  { id: 'R-1', title: 'Daily Complaint Report', type: 'Daily', date: 'May 22, 2025', status: 'Ready', format: 'PDF', icon: FileText, color: '#3b82f6', bg: '#eff6ff' },
  { id: 'R-2', title: 'Weekly Performance Report', type: 'Weekly', date: 'May 18-24, 2025', status: 'Generating', format: 'PDF', icon: FileText, color: '#0f766e', bg: '#f0fdfa' },
  { id: 'R-3', title: 'Monthly Analytics Summary', type: 'Monthly', date: 'April 2025', status: 'Ready', format: 'Excel', icon: FileSpreadsheet, color: '#10b981', bg: '#ecfdf5' },
  { id: 'R-4', title: 'Officer Performance Report', type: 'Monthly', date: 'April 2025', status: 'Ready', format: 'PDF', icon: FileText, color: '#8b5cf6', bg: '#f5f3ff' },
];

const Reports = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-secondary-50">
            <FileText className="w-4 h-4 text-secondary-600" />
          </div>
          <h3 className="text-base font-bold text-text-primary">Reports</h3>
        </div>
        <button className="text-xs font-medium text-civic-600 bg-civic-50 px-3 py-1.5 rounded-lg hover:bg-civic-100 transition-colors">
          + Generate
        </button>
      </div>

      <div className="space-y-2">
        {reports.map((report, i) => {
          const Icon = report.icon;
          return (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-card hover:border-gray-200 transition-all duration-200 cursor-pointer group"
            >
              <div className={`p-2 rounded-lg ${report.bg}`}>
                <Icon size={16} style={{ color: report.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-text-primary">{report.title}</h4>
                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                    report.status === 'Ready' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {report.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <Calendar size={10} className="text-text-secondary" />
                  <span className="text-[10px] text-text-secondary">{report.date}</span>
                  <span className="text-[10px] text-text-secondary">•</span>
                  <span className="text-[10px] text-text-secondary">{report.format}</span>
                </div>
              </div>
              {report.status === 'Ready' ? (
                <button className="p-1.5 rounded-lg text-text-secondary hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all">
                  <Download size={14} />
                </button>
              ) : (
                <div className="w-4 h-4 border-2 border-amber-300 border-t-amber-600 rounded-full animate-spin" />
              )}
            </motion.div>
          );
        })}
      </div>

      <button className="w-full py-2 text-xs font-medium text-civic-600 hover:text-civic-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
        View All Reports
      </button>
    </div>
  );
};

export default Reports;

