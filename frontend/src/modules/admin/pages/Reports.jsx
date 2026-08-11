import React, { useState } from 'react';
import {
  FileText,
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
  { id: 'REP-085', name: 'Monthly Civic Issue Summary - May 2025', date: '28 May 2025', size: '2.4 MB', type: 'PDF', status: 'Ready', downloads: 12 },
  { id: 'REP-084', name: 'Dharwad Road Pothole SLA Performance', date: '24 May 2025', size: '840 KB', type: 'CSV', status: 'Ready', downloads: 3 },
  { id: 'REP-083', name: 'Belagavi Garbage Clearance Timeline Audit', date: '20 May 2025', size: '1.2 MB', type: 'PDF', status: 'Ready', downloads: 8 },
  { id: 'REP-082', name: 'Water Scarcity Regional Analysis Q1', date: '15 May 2025', size: '4.8 MB', type: 'PDF', status: 'Expired', downloads: 15 },
  { id: 'REP-081', name: 'City-wide Department Resolution Timelines', date: '10 May 2025', size: '3.1 MB', type: 'PDF', status: 'Ready', downloads: 20 },
];

const Reports = () => {
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);

  // Form states
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [reportType, setReportType] = useState('Summary Report');
  const [exportFormat, setExportFormat] = useState('PDF');
  const [selectedDept, setSelectedDept] = useState('All Departments');

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
              id: `REP-0${86 + Math.floor(Math.random() * 10)}`,
              name: `${selectedDept} ${reportType} (${dateRange})`,
              date: 'Today',
              size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
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
      
      {/* Title block */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
          <span>Home</span>
          <span>&gt;</span>
          <span className="text-slate-600">Reports</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5">Reports & Exports</h1>
        <p className="text-slate-500 text-sm mt-1">Generate comprehensive system performance summaries and analytical report exports.</p>
      </div>

      {/* Main Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Form: Create a Report */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-5 lg:col-span-1">
          <h3 className="font-extrabold text-sm text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#0b83ff]" />
            Generate New Report
          </h3>

          <form onSubmit={triggerReportGeneration} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-705 uppercase mb-1.5">Report Scope</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-[#0b83ff] font-semibold text-slate-700 cursor-pointer"
              >
                <option value="Summary Report">Summary Report</option>
                <option value="SLA Performance Review">SLA Performance Review</option>
                <option value="Citizen Feedback Analysis">Citizen Feedback Analysis</option>
                <option value="Resource Allocation Audit">Resource Allocation Audit</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-755 uppercase mb-1.5">Department Filter</label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-[#0b83ff] font-semibold text-slate-700 cursor-pointer"
              >
                <option value="All Departments">All Departments</option>
                <option value="Public Works">Public Works</option>
                <option value="Health Department">Health Department</option>
                <option value="Water Supply">Water Supply</option>
                <option value="Sanitation">Sanitation</option>
                <option value="Traffic Department">Traffic Department</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-755 uppercase mb-1.5">Time Frame</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-[#0b83ff] font-semibold text-slate-700 cursor-pointer"
                >
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="Last 30 Days">Last 30 Days</option>
                  <option value="Last 90 Days">Last 90 Days</option>
                  <option value="Custom Range">Custom Range</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-755 uppercase mb-1.5">Format Type</label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-[#0b83ff] font-semibold text-slate-700 cursor-pointer"
                >
                  <option value="PDF">PDF Document</option>
                  <option value="CSV">Excel CSV</option>
                  <option value="JSON">JSON Data</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              {isGenerating ? (
                <div className="space-y-2">
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0b83ff] rounded-full transition-all duration-150" style={{ width: `${genProgress}%` }}></div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold text-center">Generating report ({genProgress}%)</p>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-[#0b83ff] hover:bg-[#0070e0] text-white py-3 rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 transition-all focus:outline-none flex items-center justify-center gap-2"
                >
                  Generate Report
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </form>

          {/* SLA automated report note */}
          <div className="bg-blue-50/40 border border-blue-100 p-4 rounded-xl flex items-start gap-2 text-xs text-slate-600">
            <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <p><strong>Scheduled Reports:</strong> Weekly automated SLA reports are scheduled to trigger every Monday at 08:00 AM.</p>
          </div>
        </div>

        {/* Right List: History */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden lg:col-span-2 space-y-1">
          <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-800">Generated Reports History</h3>
            <span className="text-[10px] text-slate-400 font-bold">Showing {reports.length} entries</span>
          </div>

          <div className="divide-y divide-slate-150">
            {reports.map((report) => (
              <div key={report.id} className="p-5 flex items-center justify-between hover:bg-slate-50/30 transition-colors">
                <div className="flex gap-4 items-start">
                  <div className={`p-3 rounded-xl shrink-0 ${
                    report.type === 'PDF' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    <FileText size={18} />
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
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black border ${
                    report.status === 'Ready' 
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                      : 'bg-slate-50 border-slate-100 text-slate-400'
                  }`}>
                    {report.status}
                  </span>

                  {report.status === 'Ready' ? (
                    <button
                      type="button"
                      onClick={() => {
                        setReports(reports.map(r => r.id === report.id ? { ...r, downloads: r.downloads + 1 } : r));
                      }}
                      className="p-2 border border-slate-200 text-slate-600 hover:text-teal-800 rounded-xl hover:bg-slate-50 transition-colors shadow-sm focus:outline-none"
                      title="Download Report"
                    >
                      <Download size={14} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="p-2 border border-slate-100 text-slate-300 rounded-xl cursor-not-allowed"
                    >
                      <Download size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
