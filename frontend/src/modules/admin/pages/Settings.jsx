import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Brain,
  Shield,
  Save,
  Check
} from 'lucide-react';

const Settings = () => {
  const [profileName, setProfileName] = useState('Admin User');
  const [profileEmail, setProfileEmail] = useState('admin@civicai.gov.in');
  const [slaLimit, setSlaLimit] = useState(48);
  const [autoRouting, setAutoRouting] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    triggerToast('Settings saved successfully!');
  };

  return (
    <div className="py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white font-bold px-4 py-3 rounded-xl shadow-xl text-xs">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
          <span>Home</span>
          <span>&gt;</span>
          <span className="text-slate-600">Settings</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5 flex items-center gap-2">
          <SettingsIcon className="text-slate-700" />
          Settings
        </h1>
        <p className="text-slate-500 text-sm mt-1">Configure your profile settings and system automation parameters.</p>
      </div>

      <form onSubmit={handleSaveSettings} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Area: Form Panels */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Administrative Profile
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-blue-600 font-semibold text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-blue-600 font-semibold text-slate-700"
                />
              </div>
            </div>
          </div>

          {/* AI Auto-Routing Automation */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              AI Routing & Escalations
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                <div>
                  <p className="text-xs font-bold text-slate-800">Auto-Routing Classifier</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Route newly submitted complaints automatically based on text description analysis.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoRouting(!autoRouting)}
                  className={`w-10 h-6 rounded-full relative transition-colors focus:outline-none ${
                    autoRouting ? 'bg-purple-600' : 'bg-slate-200'
                  }`}
                >
                  <span className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-all ${autoRouting ? 'right-1' : 'left-1'}`}></span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">SLA Escalation Limit (Hours)</label>
                  <input
                    type="number"
                    value={slaLimit}
                    onChange={(e) => setSlaLimit(parseInt(e.target.value) || 24)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-purple-600 font-mono font-bold text-slate-750"
                  />
                </div>
                <div className="bg-purple-50/30 border border-purple-100/50 rounded-xl p-3.5 text-xs text-purple-850 flex gap-2">
                  <Brain className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>Civic AI will automatically flag and trigger alert notifications when issues exceed {slaLimit} hours without progress.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Area: Sidebar Preferences */}
        <div className="space-y-6 lg:col-span-1">
          {/* Notification Settings */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-600" />
              Preferences
            </h3>

            <div className="space-y-3">
              {[
                { label: 'SLA Escalation Alerts', desc: 'Email alerts on breached SLA limits', checked: emailAlerts, setChecked: setEmailAlerts },
                { label: 'System Backup Alerts', desc: 'Alert when backup processes complete', checked: true, setChecked: () => {} },
                { label: 'Citizen Rating Feedback', desc: 'Daily summary digests on citizen ratings', checked: false, setChecked: () => {} }
              ].map((pref, idx) => (
                <label key={idx} className="flex items-start gap-3 cursor-pointer select-none group border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                  <input
                    type="checkbox"
                    checked={pref.checked}
                    onChange={(e) => pref.setChecked(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 mt-0.5"
                  />
                  <div>
                    <span className="block text-xs font-bold text-slate-800">{pref.label}</span>
                    <span className="block text-[10px] text-slate-400 font-semibold mt-0.5">{pref.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Actions */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
            <button
              type="submit"
              className="w-full bg-[#0b83ff] hover:bg-[#0070e0] text-white py-3 rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 transition-all focus:outline-none flex items-center justify-center gap-2"
            >
              <Save size={14} />
              Save All Settings
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default Settings;
