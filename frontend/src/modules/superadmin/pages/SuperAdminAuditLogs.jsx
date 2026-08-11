import React, { useState, useMemo } from 'react';
import {
  ClipboardList,
  Search,
  Download,
  Terminal,
  Activity,
  Globe,
  Filter
} from 'lucide-react';

const INITIAL_LOGS = [
  { id: 1001, action: 'Role Policy Updated', user: 'super@civic.gov', role: 'Super Admin', ip: '10.0.4.15', os: 'macOS Sonoma', browser: 'Safari 17', oldVal: 'Matrix v3.1', newVal: 'Matrix v3.2', status: 'Success', date: '5 mins ago' },
  { id: 1002, action: 'New Department Admin Invited', user: 'super@civic.gov', role: 'Super Admin', ip: '10.0.4.15', os: 'macOS Sonoma', browser: 'Safari 17', oldVal: 'None', newVal: 'Dr. Sunita Sharma', status: 'Success', date: '18 mins ago' },
  { id: 1003, action: 'AI Threshold Changed', user: 'SYSTEM / CORE', role: 'System', ip: 'localhost', os: 'Ubuntu Server', browser: 'Node runtime', oldVal: '0.82', newVal: '0.85', status: 'Success', date: '42 mins ago' },
  { id: 1004, action: 'SLA Escalation Triggered', user: 'SYSTEM / SLA SERVICE', role: 'System', ip: 'localhost', os: 'Ubuntu Server', browser: 'Node runtime', oldVal: 'Open', newVal: 'Escalated', status: 'Success', date: '1 hr ago' },
  { id: 1005, action: 'Failed Login Blocked', user: 'unknown@civic.gov', role: 'Guest', ip: '185.220.101.4', os: 'Linux x86', browser: 'Firefox 120', oldVal: 'Login attempt', newVal: 'IP Blocked', status: 'Failed', date: '2 hrs ago' },
];

const SuperAdminAuditLogs = () => {
  const [logs] = useState(INITIAL_LOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = 
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.user.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = 
        activeTab === 'All' || 
        (activeTab === 'Escalations/System' && (log.role === 'System' || log.status === 'Failed')) ||
        (activeTab === 'Security' && (log.action.includes('Role') || log.status === 'Failed'));

      return matchesSearch && matchesStatus;
    });
  }, [logs, searchQuery, activeTab]);

  return (
    <div className="py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span>Home</span>
            <span>&gt;</span>
            <span>Super Admin</span>
            <span>&gt;</span>
            <span className="text-slate-655">Audit Logs</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5 flex items-center gap-2">
            <ClipboardList className="text-slate-700" />
            Audit Ledger
          </h1>
          <p className="text-slate-500 text-sm mt-1">Global audit logs tracking administrator mutations, security policy toggles, and system alerts.</p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 border border-slate-200 bg-white text-xs font-bold py-2.5 px-4 rounded-xl text-slate-600 hover:bg-slate-50 transition shadow-sm focus:outline-none"
        >
          <Download size={14} />
          Export Audit Trail
        </button>
      </div>

      {/* Main Grid */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Controls */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search action, user email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 text-xs py-2.5 pl-10 pr-4 rounded-xl outline-none focus:border-slate-800 font-medium"
            />
          </div>

          <div className="flex items-center gap-2">
            {['All', 'Security', 'Escalations/System'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold py-2 px-3 rounded-lg transition ${
                  activeTab === tab ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Logs Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider bg-slate-50/20">
                <th className="py-4 px-6">Action Event</th>
                <th className="py-4 px-4">Operator</th>
                <th className="py-4 px-4 font-mono">IP Address</th>
                <th className="py-4 px-4">Browser/OS Info</th>
                <th className="py-4 px-4">Old Value</th>
                <th className="py-4 px-4">New Value</th>
                <th className="py-4 px-4">Timestamp</th>
                <th className="py-4 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Action */}
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${
                        log.status === 'Failed' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {log.status === 'Failed' ? <Terminal size={14} /> : <Activity size={14} />}
                      </div>
                      <span className="font-extrabold text-slate-900">{log.action}</span>
                    </td>

                    {/* Operator */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-800 block">{log.user}</span>
                      <span className="text-[9px] text-slate-400 font-bold block mt-0.5">{log.role}</span>
                    </td>

                    {/* IP */}
                    <td className="py-4 px-4 text-slate-500 font-mono font-bold">{log.ip}</td>

                    {/* Browser/OS */}
                    <td className="py-4 px-4 text-slate-400 font-medium whitespace-nowrap">
                      <span className="inline-flex items-center gap-1">
                        <Globe size={11} />
                        {log.browser} / {log.os}
                      </span>
                    </td>

                    {/* Old Value */}
                    <td className="py-4 px-4 text-slate-400 font-mono">{log.oldVal}</td>

                    {/* New Value */}
                    <td className="py-4 px-4 text-emerald-700 font-mono font-bold">{log.newVal}</td>

                    {/* Date */}
                    <td className="py-4 px-4 text-slate-450 font-bold whitespace-nowrap">{log.date}</td>

                    {/* Status */}
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black border ${
                        log.status === 'Success' 
                          ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                          : 'bg-rose-50 border-rose-100 text-rose-700'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 font-bold">
                    No matching audit logs found.
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

export default SuperAdminAuditLogs;
