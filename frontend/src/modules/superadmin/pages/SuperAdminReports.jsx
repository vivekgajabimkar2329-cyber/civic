import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  Filter,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Brain,
  X,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';

const INITIAL_REPORTS = [
  { id: 'REP-701', name: 'State-wide Civic Issues Audit - Q1 2025', date: '28 May 2025', size: '4.8 MB', type: 'PDF', status: 'Ready', downloads: 24 },
  { id: 'REP-702', name: 'Regional SLA Breach Analytics', date: '25 May 2025', size: '1.2 MB', type: 'CSV', status: 'Ready', downloads: 8 },
  { id: 'REP-703', name: 'AI Smart Routing Accuracy Benchmark', date: '22 May 2025', size: '940 KB', type: 'PDF', status: 'Ready', downloads: 15 },
  { id: 'REP-704', name: 'Municipality Budget Allocation Audit', date: '18 May 2025', size: '3.6 MB', type: 'Excel', status: 'Ready', downloads: 11 },
];

const SuperAdminReports = () => {
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);

  // Form states
  const [reportType, setReportType] = useState('AI Analytics Report');
  const [exportFormat, setExportFormat] = useState('PDF');
  const [dateRange, setDateRange] = useState('Last 30 Days');

  const triggerReportGeneration = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setGenProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setGenProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newReport = {
              id: `REP-${705 + Math.floor(Math.random() * 20)}`,
              name: `System ${reportType} (${dateRange})`,
              date: 'Today',
              size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
              type: exportFormat,
              status: 'Ready',
              downloads: 0
            };
            setReports([newReport, ...reports]);
            setIsGenerating(false);
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Title */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
          <span>Home</span>
          <span>&gt;</span>
          <span>Super Admin</span>
          <span>&gt;</span>
          <span className="text-slate-655">Reports</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5 flex items-center gap-2">
          <BarChart3 className="text-blue-650" />
          Analytics Reports
        </h1>
        <p className="text-slate-500 text-sm mt-1">Compile analytical audit files, AI response timelines, and export Excel datasets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Form: Create */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-5 lg:col-span-1">
          <h3 className="font-extrabold text-sm text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-650" />
            AI Analytical Exports
          </h3>

          <form onSubmit={triggerReportGeneration} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-705 uppercase mb-1.5">Report Scope</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-blue-600 font-bold cursor-pointer"
              >
                <option value="AI Analytics Report">AI Analytics Report</option>
                <option value="Performance Report">Performance Report</option>
                <option value="Municipality Report">Municipality Report</option>
                <option value="Department Report">Department Report</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-705 uppercase mb-1.5">Time Frame</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-blue-600 font-bold cursor-pointer"
                >
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="Last 30 Days">Last 30 Days</option>
                  <option value="Last 90 Days">Last 90 Days</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-705 uppercase mb-1.5">Format</label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-blue-600 font-bold cursor-pointer"
                >
                  <option value="PDF">PDF</option>
                  <option value="CSV">Excel CSV</option>
                  <option value="Excel">XLSX Spread</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              {isGenerating ? (
                <div className="space-y-2">
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full transition-all duration-150" style={{ width: `${genProgress}%` }}></div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold text-center">Exporting data ({genProgress}%)</p>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-[#0b83ff] hover:bg-[#0070e0] text-white py-3 rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 transition-all flex items-center justify-center gap-2"
                >
                  Compile & Export
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right List: History */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden lg:col-span-2 space-y-1">
          <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-800">Generated Reports Queue</h3>
            <span className="text-[10px] text-slate-400 font-bold">Showing {reports.length} files</span>
          </div>

          <div className="divide-y divide-slate-150">
            {reports.map((report) => (
              <div key={report.id} className="p-5 flex items-center justify-between hover:bg-slate-50/30 transition-colors">
                <div className="flex gap-4 items-start">
                  <div className={`p-3 rounded-xl shrink-0 ${
                    report.type === 'PDF' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    <FileSpreadsheet size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{report.name}</h4>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[10px] text-slate-400 font-semibold">
                      <span>ID: {report.id}</span>
                      <span>•</span>
                      <span>Created: {report.date}</span>
                      <span>•</span>
                      <span>Size: {report.size}</span>
                      <span>•</span>
                      <span>Downloads: {report.downloads}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setReports(reports.map(r => r.id === report.id ? { ...r, downloads: r.downloads + 1 } : r));
                    }}
                    className="p-2 border border-slate-200 text-slate-600 hover:text-blue-600 rounded-xl hover:bg-slate-50 transition shadow-sm"
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminReports;
