import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  Search,
  Calendar,
  Clock,
  Filter,
  Download,
  Terminal,
  Activity,
  Globe
} from 'lucide-react';

const INITIAL_LOGS = [
  { id: 1, action: 'User Profile Updated', user: 'admin@civicai.gov.in', ip: '192.168.1.104', agent: 'Chrome 125 / Win 11', date: 'Today, 10:35 AM', severity: 'Low' },
  { id: 2, action: 'AI Routing Configured', user: 'admin@civicai.gov.in', ip: '192.168.1.104', agent: 'Chrome 125 / Win 11', date: 'Today, 09:20 AM', severity: 'Medium' },
  { id: 3, action: 'Department Officer Deleted', user: 'super@civicai.gov.in', ip: '10.0.4.15', agent: 'Safari 17 / macOS', date: 'Yesterday, 04:15 PM', severity: 'High' },
  { id: 4, action: 'SLA Escalation Triggered', user: 'SYSTEM / AI CLOUD', ip: 'localhost', agent: 'NodeJS runtime', date: 'Yesterday, 02:00 AM', severity: 'Medium' },
  { id: 5, action: 'Admin Portal Login Successful', user: 'admin@civicai.gov.in', ip: '192.168.1.104', agent: 'Chrome 125 / Win 11', date: '2 days ago', severity: 'Low' },
  { id: 6, action: 'Failed Login Attempt Alert', user: 'unknown@civic.gov', ip: '185.220.101.4', agent: 'Firefox 120 / Linux', date: '3 days ago', severity: 'High' },
];

const AuditLogs = () => {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = 
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.ip.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSeverity = severityFilter === 'All' || log.severity === severityFilter;

      return matchesSearch && matchesSeverity;
    });
  }, [logs, searchQuery, severityFilter]);

  return (
    <div className="py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span>Home</span>
            <span>&gt;</span>
            <span className="text-slate-600">Audit Logs</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5 flex items-center gap-2">
            <ShieldAlert className="text-rose-600" />
            System Audit Logs
          </h1>
          <p className="text-slate-500 text-sm mt-1">Review system automation events, profile configuration updates, and security logs.</p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 border border-slate-200 bg-white text-xs font-bold py-2.5 px-4 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors shadow-sm focus:outline-none"
        >
          <Download size={14} />
          Export Audit Logs
        </button>
      </div>

      {/* Control Filters */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search logs by action or user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 text-xs py-2.5 pl-10 pr-4 rounded-xl outline-none focus:border-teal-805 transition-all font-medium text-slate-700"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-white border border-slate-200 text-xs py-2.5 px-4 rounded-xl outline-none focus:border-teal-800 font-bold text-slate-600 cursor-pointer"
            >
              <option value="All">All Severities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* Audit Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider bg-slate-50/10">
                <th className="py-4 px-6">Event Action</th>
                <th className="py-4 px-4">User Account</th>
                <th className="py-4 px-4">IP Address</th>
                <th className="py-4 px-4">User Agent Details</th>
                <th className="py-4 px-4">Timestamp</th>
                <th className="py-4 px-6 text-center">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Event Action */}
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${
                        log.severity === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {log.severity === 'High' ? <Terminal size={14} /> : <Activity size={14} />}
                      </div>
                      <span className="font-bold text-slate-900">{log.action}</span>
                    </td>

                    {/* User */}
                    <td className="py-4 px-4 text-slate-600 font-bold">{log.user}</td>

                    {/* IP */}
                    <td className="py-4 px-4 text-slate-500 font-mono font-bold">{log.ip}</td>

                    {/* User Agent */}
                    <td className="py-4 px-4 text-slate-400 whitespace-nowrap flex items-center gap-1.5 mt-2.5">
                      <Globe size={12} />
                      {log.agent}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-slate-450 font-bold whitespace-nowrap">{log.date}</td>

                    {/* Severity */}
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black border ${
                        log.severity === 'High' 
                          ? 'bg-rose-50 border-rose-100 text-rose-700' 
                          : log.severity === 'Medium' 
                          ? 'bg-amber-50 border-amber-100 text-amber-700' 
                          : 'bg-emerald-50 border-emerald-100 text-emerald-700'
                      }`}>
                        {log.severity}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 font-bold">
                    No audit log records match the search parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AuditLogs;
