import React, { useState } from 'react';
import { Bell, Lock, Eye, Globe, Moon, Shield, Save } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifs: true,
    smsNotifs: false,
    pushNotifs: true,
    publicProfile: false,
    darkMode: false,
    language: 'English',
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    // Save logic
    alert('Settings saved successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Account Settings</h1>
        <p className="text-gray-600 mt-2">Manage your preferences, security, and notifications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Settings Navigation (Mock) */}
        <div className="md:col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-[#005EA5] font-bold border border-blue-100">
            <Bell size={18} /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
            <Shield size={18} /> Privacy & Security
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
            <Globe size={18} /> Language
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
            <Moon size={18} /> Appearance
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
            <Lock size={18} /> Change Password
          </button>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Notification Preferences */}
          <div className="bg-white rounded-xl border shadow-sm p-6 sm:p-8" style={{ borderColor: 'var(--color-gov-border)' }}>
            <h2 className="text-xl font-bold text-gray-900 border-b pb-4 mb-6 flex items-center gap-2">
              <Bell size={20} className="text-[#005EA5]" /> Notification Preferences
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Receive updates about your complaints via email.</p>
                </div>
                <Toggle isOn={settings.emailNotifs} onToggle={() => handleToggle('emailNotifs')} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900">SMS Notifications</h4>
                  <p className="text-sm text-gray-500">Get text messages for urgent community alerts.</p>
                </div>
                <Toggle isOn={settings.smsNotifs} onToggle={() => handleToggle('smsNotifs')} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900">Push Notifications</h4>
                  <p className="text-sm text-gray-500">Receive browser notifications when logged in.</p>
                </div>
                <Toggle isOn={settings.pushNotifs} onToggle={() => handleToggle('pushNotifs')} />
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white rounded-xl border shadow-sm p-6 sm:p-8" style={{ borderColor: 'var(--color-gov-border)' }}>
            <h2 className="text-xl font-bold text-gray-900 border-b pb-4 mb-6 flex items-center gap-2">
              <Shield size={20} className="text-[#005EA5]" /> Privacy
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900">Make Profile Public</h4>
                  <p className="text-sm text-gray-500">Allow other citizens to see your name on community reports.</p>
                </div>
                <Toggle isOn={settings.publicProfile} onToggle={() => handleToggle('publicProfile')} />
              </div>
            </div>
          </div>

          {/* Language & Region */}
          <div className="bg-white rounded-xl border shadow-sm p-6 sm:p-8" style={{ borderColor: 'var(--color-gov-border)' }}>
            <h2 className="text-xl font-bold text-gray-900 border-b pb-4 mb-6 flex items-center gap-2">
              <Globe size={20} className="text-[#005EA5]" /> Language & Region
            </h2>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Display Language</label>
              <select 
                className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-[#005EA5]"
                value={settings.language}
                onChange={(e) => setSettings({...settings, language: e.target.value})}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>
          </div>

          {/* Security / Password */}
          <div className="bg-white rounded-xl border shadow-sm p-6 sm:p-8" style={{ borderColor: 'var(--color-gov-border)' }}>
            <h2 className="text-xl font-bold text-gray-900 border-b pb-4 mb-6 flex items-center gap-2">
              <Lock size={20} className="text-[#005EA5]" /> Change Password
            </h2>
            
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Current Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-[#005EA5]"
                  value={password.current}
                  onChange={(e) => setPassword({...password, current: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">New Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-[#005EA5]"
                  value={password.new}
                  onChange={(e) => setPassword({...password, new: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Confirm New Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-[#005EA5]"
                  value={password.confirm}
                  onChange={(e) => setPassword({...password, confirm: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end pt-4">
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-opacity hover:opacity-90 shadow-sm"
              style={{ backgroundColor: 'var(--color-gov-secondary)' }}
            >
              <Save size={18} /> Save Settings
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

// Reusable Toggle Component
const Toggle = ({ isOn, onToggle }) => (
  <button 
    onClick={onToggle}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#005EA5] focus:ring-offset-2 ${
      isOn ? 'bg-[#005EA5]' : 'bg-gray-200'
    }`}
  >
    <span 
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        isOn ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

export default Settings;
