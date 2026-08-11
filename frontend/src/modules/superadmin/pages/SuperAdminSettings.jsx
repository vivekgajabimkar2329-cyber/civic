import React, { useState } from 'react';
import {
  Settings,
  Building,
  Mail,
  Phone,
  Globe,
  Bell,
  Cpu,
  Save,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';

const SuperAdminSettings = () => {
  const [orgName, setOrgName] = useState('Municipal Administration, Karnataka');
  const [orgEmail, setOrgEmail] = useState('contact@municipal.kar.gov.in');
  const [orgPhone, setOrgPhone] = useState('+91 80 2220 0101');
  const [geminiKey, setGeminiKey] = useState('AIzaSyD_EXAMPLE_GEMINI_KEY');
  const [showKey, setShowKey] = useState(false);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [toastMsg, setToastMsg] = useState(null);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    triggerToast('Settings applied successfully system-wide!');
  };

  return (
    <div className="py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white font-bold px-4 py-3 rounded-xl shadow-xl text-xs">
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
          <span>Home</span>
          <span>&gt;</span>
          <span>Super Admin</span>
          <span>&gt;</span>
          <span className="text-slate-650">Settings</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5 flex items-center gap-2">
          <Settings className="text-slate-800" />
          System Settings
        </h1>
        <p className="text-slate-500 text-sm mt-1">Configure global application branding details, notification nodes, and cognitive AI keys.</p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left config forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Metadata */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-650" />
              Organization Profile
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Organization Title Name</label>
                <input
                  type="text"
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-blue-650 font-semibold text-slate-700"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Administration Work Email</label>
                  <input
                    type="email"
                    required
                    value={orgEmail}
                    onChange={(e) => setOrgEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-blue-650 font-semibold text-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-705 uppercase mb-1.5">Work Phone Number</label>
                  <input
                    type="text"
                    required
                    value={orgPhone}
                    onChange={(e) => setOrgPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-blue-650 font-semibold text-slate-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI Credentials integrations */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-650" />
              Cognitive Engine API Integration
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Gemini API Key Credential</label>
                <div className="relative">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 pl-3 pr-10 rounded-xl outline-none focus:border-purple-600 font-mono text-slate-750 font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-[9px] text-slate-400 font-semibold mt-1">This key is used for AI-based ticket prioritization and automated classifications.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right preferences side panel */}
        <div className="space-y-6 lg:col-span-1">
          {/* Notifications toggles */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-600" />
              Communication Nodes
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">Push Notifications</p>
                  <p className="text-[9px] text-slate-400">Trigger browser alerts to active dashboard admins.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPushNotif(!pushNotif)}
                  className={`w-10 h-6 rounded-full relative transition-colors focus:outline-none shrink-0 ${
                    pushNotif ? 'bg-emerald-600' : 'bg-slate-200'
                  }`}
                >
                  <span className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-all ${pushNotif ? 'right-1' : 'left-1'}`}></span>
                </button>
              </div>

              <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                <div>
                  <p className="text-xs font-bold text-slate-800">SMS / WhatsApp API alerts</p>
                  <p className="text-[9px] text-slate-400">Dispatch SMS routing alerts via Twilio integrations.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSmsNotif(!smsNotif)}
                  className={`w-10 h-6 rounded-full relative transition-colors focus:outline-none shrink-0 ${
                    smsNotif ? 'bg-emerald-600' : 'bg-slate-200'
                  }`}
                >
                  <span className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-all ${smsNotif ? 'right-1' : 'left-1'}`}></span>
                </button>
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
            <button
              type="submit"
              className="w-full bg-[#0b83ff] hover:bg-[#0070e0] text-white py-3 rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 transition flex items-center justify-center gap-2"
            >
              <Save size={14} />
              Save Configurations
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default SuperAdminSettings;
