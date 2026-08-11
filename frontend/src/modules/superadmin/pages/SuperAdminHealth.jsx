import React, { useState } from 'react';
import {
  HeartPulse,
  Server,
  Database,
  Cpu,
  RefreshCw,
  Play,
  Settings,
  CheckCircle,
  AlertTriangle,
  Clock,
  HardDrive
} from 'lucide-react';

const INITIAL_SERVICES = [
  { name: 'API Gateway Router', type: 'Gateway', status: 'Healthy', latency: '4ms', uptime: '99.99%' },
  { name: 'Database Cluster (PostgreSQL)', type: 'Database', status: 'Healthy', latency: '41ms', uptime: '99.98%' },
  { name: 'Redis Cache & Queue', type: 'Cache', status: 'Healthy', latency: '1.2ms', uptime: '100%' },
  { name: 'Civic AI Routing Engine', type: 'AI Server', status: 'Healthy', latency: '124ms', uptime: '99.5%' },
  { name: 'AWS S3 Asset Storage', type: 'Storage', status: 'Healthy', latency: '8ms', uptime: '100%' },
  { name: 'Twilio SMS Gateway', type: 'Notifications', status: 'Healthy', latency: '150ms', uptime: '99.9%' },
];

const SuperAdminHealth = () => {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [isChecking, setIsChecking] = useState(false);
  const [cpuUsage, setCpuUsage] = useState(24);
  const [ramUsage, setRamUsage] = useState(48);
  const [storageUsage, setStorageUsage] = useState(56);
  const [toastMsg, setToastMsg] = useState(null);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleRunDiagnostics = () => {
    setIsChecking(true);
    triggerToast('Initiating full system diagnostic check...');

    setTimeout(() => {
      // Simulate slight variance in load metrics
      setCpuUsage(Math.floor(Math.random() * 20) + 15);
      setRamUsage(Math.floor(Math.random() * 15) + 40);
      setStorageUsage(56);
      setIsChecking(false);
      triggerToast('All system diagnostic checks passed successfully!');
    }, 1500);
  };

  const handleRestartService = (index) => {
    triggerToast(`Restarting service: ${services[index].name}...`);
    setServices(services.map((s, idx) => idx === index ? { ...s, status: 'Restarting' } : s));

    setTimeout(() => {
      setServices(services.map((s, idx) => idx === index ? { ...s, status: 'Healthy' } : s));
      triggerToast(`Service ${services[index].name} is fully operational.`);
    }, 2000);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span>Home</span>
            <span>&gt;</span>
            <span>Super Admin</span>
            <span>&gt;</span>
            <span className="text-slate-655">Health</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5 flex items-center gap-2">
            <HeartPulse className="text-rose-600" />
            Infrastructure Health
          </h1>
          <p className="text-slate-500 text-sm mt-1">Real-time status diagnostics for the platform and core microservices.</p>
        </div>

        <button
          onClick={handleRunDiagnostics}
          disabled={isChecking}
          className="inline-flex items-center gap-2 bg-[#0b83ff] hover:bg-[#0070e0] text-white py-2.5 px-5 rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 transition disabled:opacity-50"
        >
          <RefreshCw size={14} className={isChecking ? 'animate-spin' : ''} />
          Run System Diagnostics
        </button>
      </div>

      {/* Resource meters Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CPU */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-450 uppercase flex items-center gap-1.5">
              <Cpu size={14} className="text-blue-600" />
              CPU Load
            </span>
            <span className="text-xs font-bold text-slate-800">{cpuUsage}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${cpuUsage}%` }}></div>
          </div>
          <p className="text-[10px] text-slate-400 font-semibold">Load average across 8 virtual cores: stable</p>
        </div>

        {/* RAM */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-455 uppercase flex items-center gap-1.5">
              <Server size={14} className="text-purple-600" />
              Memory Allocation
            </span>
            <span className="text-xs font-bold text-slate-800">{ramUsage}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-purple-650 rounded-full transition-all duration-300" style={{ width: `${ramUsage}%` }}></div>
          </div>
          <p className="text-[10px] text-slate-400 font-semibold">Allocated RAM: {(16 * (ramUsage/100)).toFixed(1)} GB of 16.0 GB</p>
        </div>

        {/* Disk */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-455 uppercase flex items-center gap-1.5">
              <HardDrive size={14} className="text-teal-700" />
              Disk Capacity
            </span>
            <span className="text-xs font-bold text-slate-800">{storageUsage}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-teal-650 rounded-full transition-all duration-300" style={{ width: `${storageUsage}%` }}></div>
          </div>
          <p className="text-[10px] text-slate-400 font-semibold">Storage utilized: 280 GB of 500 GB AWS SSD</p>
        </div>
      </div>

      {/* Services Table list */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-extrabold text-sm text-slate-800">Core System Services Uptime</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider bg-slate-50/20">
                <th className="py-4 px-6">Service</th>
                <th className="py-4 px-4">Type</th>
                <th className="py-4 px-4">Latency</th>
                <th className="py-4 px-4">Uptime (30d)</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-6 text-center">Diagnostics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
              {services.map((service, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  {/* Name */}
                  <td className="py-4 px-6 font-bold text-slate-900">{service.name}</td>

                  {/* Type */}
                  <td className="py-4 px-4 text-slate-500 font-bold">{service.type}</td>

                  {/* Latency */}
                  <td className="py-4 px-4 text-slate-800 font-mono font-bold">{service.latency}</td>

                  {/* Uptime */}
                  <td className="py-4 px-4 text-slate-650">{service.uptime}</td>

                  {/* Status */}
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                      service.status === 'Healthy' 
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                        : service.status === 'Restarting'
                        ? 'bg-blue-50 border-blue-100 text-blue-700 animate-pulse'
                        : 'bg-rose-50 border-rose-100 text-rose-700'
                    }`}>
                      {service.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleRestartService(index)}
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0b83ff] hover:underline"
                    >
                      Restart Service
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default SuperAdminHealth;
