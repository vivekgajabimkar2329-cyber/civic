import React, { useState } from 'react';
import {
  ShieldAlert,
  Lock,
  Eye,
  EyeOff,
  Terminal,
  Activity,
  Globe,
  Settings,
  X,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const INITIAL_SESSIONS = [
  { id: 1, user: 'admin@civic.gov', device: 'Chrome / Windows 11', location: 'Bengaluru, India', ip: '192.168.1.104', current: true },
  { id: 2, user: 'super@civic.gov', device: 'Safari / macOS Sonoma', location: 'Mysuru, India', ip: '10.0.4.15', current: false },
  { id: 3, user: 'admin@civic.gov', device: 'Firefox / Linux', location: 'Hubballi, India', ip: '172.16.82.9', current: false },
];

const SuperAdminSecurity = () => {
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [pwLength, setPwLength] = useState(8);
  const [mfaEnforced, setMfaEnforced] = useState(true);
  const [blockedIps, setBlockedIps] = useState(['185.220.101.4', '193.106.191.12']);
  const [newIp, setNewIp] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTerminateSession = (id) => {
    setSessions(sessions.filter(s => s.id !== id));
    triggerToast('Session terminated successfully.');
  };

  const handleBlockIp = (e) => {
    e.preventDefault();
    if (!newIp.trim()) return;
    setBlockedIps([...blockedIps, newIp.trim()]);
    setNewIp('');
    triggerToast('IP address added to firewall blacklist.');
  };

  const handleUnblockIp = (ip) => {
    setBlockedIps(blockedIps.filter(i => i !== ip));
    triggerToast('IP address unblocked successfully.');
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    triggerToast('Security configurations applied system-wide!');
  };

  return (
    <div className="py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-605 text-white font-bold px-4 py-3 rounded-xl shadow-xl text-xs">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
          <span>Home</span>
          <span>&gt;</span>
          <span>Super Admin</span>
          <span>&gt;</span>
          <span className="text-slate-650">Security</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5 flex items-center gap-2">
          <ShieldAlert className="text-rose-600" />
          Security Command Center
        </h1>
        <p className="text-slate-500 text-sm mt-1">Configure global authentication parameters, block malicious IP ranges, and manage user sessions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Columns: Configs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Policy Config */}
          <form onSubmit={handleSaveSecurity} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-5">
            <h3 className="font-extrabold text-sm text-slate-800 border-b border-slate-105 pb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-rose-600" />
              Global Authentication Policies
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Minimum Password Length</label>
                <input
                  type="number"
                  value={pwLength}
                  onChange={(e) => setPwLength(parseInt(e.target.value) || 8)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-rose-600 font-mono font-bold text-slate-750"
                />
              </div>

              <div className="flex items-center justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                <div>
                  <p className="text-xs font-bold text-slate-800">Enforce Multi-Factor Auth (MFA)</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Enforce mandatory authenticator code verification for all system admins.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMfaEnforced(!mfaEnforced)}
                  className={`w-10 h-6 rounded-full relative transition-colors focus:outline-none shrink-0 ${
                    mfaEnforced ? 'bg-rose-600' : 'bg-slate-200'
                  }`}
                >
                  <span className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-all ${mfaEnforced ? 'right-1' : 'left-1'}`}></span>
                </button>
              </div>
            </div>

            <button type="submit" className="bg-slate-905 hover:bg-slate-850 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 shadow">
              <Settings size={14} />
              Apply Policies
            </button>
          </form>

          {/* Active Sessions */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Active Administrator Sessions
            </h3>

            <div className="divide-y divide-slate-100">
              {sessions.map((session) => (
                <div key={session.id} className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">{session.user}</span>
                      {session.current && (
                        <span className="bg-blue-50 border border-blue-100 text-blue-700 text-[8px] font-black px-1.5 py-0.5 rounded">Current Session</span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-400 font-semibold mt-1">
                      <span>Device: {session.device}</span>
                      <span>•</span>
                      <span>IP: {session.ip}</span>
                      <span>•</span>
                      <span>Location: {session.location}</span>
                    </div>
                  </div>

                  {!session.current && (
                    <button
                      onClick={() => handleTerminateSession(session.id)}
                      className="text-xs font-bold text-rose-600 hover:underline focus:outline-none"
                    >
                      Terminate
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Firewall Block */}
        <div className="space-y-6 lg:col-span-1">
          {/* IP Blocking */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-800 border-b border-slate-105 pb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-rose-600" />
              Firewall Blacklist
            </h3>

            <form onSubmit={handleBlockIp} className="flex gap-2">
              <input
                type="text"
                required
                value={newIp}
                onChange={(e) => setNewIp(e.target.value)}
                placeholder="Block IP e.g. 192.0.2.1"
                className="flex-1 bg-slate-50 border border-slate-200 text-xs py-2 px-3 rounded-xl outline-none focus:border-rose-600 font-mono font-bold text-slate-700"
              />
              <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-2 rounded-xl text-xs">Block</button>
            </form>

            <div className="space-y-2 pt-1">
              {blockedIps.map((ip) => (
                <div key={ip} className="flex items-center justify-between bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-xs font-mono font-bold text-slate-700">
                  <span>{ip}</span>
                  <button onClick={() => handleUnblockIp(ip)} className="text-slate-400 hover:text-slate-600 focus:outline-none">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SuperAdminSecurity;
