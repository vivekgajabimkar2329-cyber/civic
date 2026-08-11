import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Clock3,
  Database,
  Download,
  FileText,
  HeartPulse,
  LockKeyhole,
  Plus,
  RefreshCw,
  Server,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCog,
  Users
} from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '45,284', change: '+12.4%', route: '/super-admin/users', icon: Users, tone: 'blue' },
  { label: 'Admin Accounts', value: '126', change: '+8 this month', route: '/super-admin/admins', icon: UserCog, tone: 'teal' },
  { label: 'Departments', value: '32', change: '98% coverage', route: '/super-admin/departments', icon: Building2, tone: 'emerald' },
  { label: 'Open Complaints', value: '1,284', change: '-6.2% today', route: '/super-admin/complaints', icon: FileText, tone: 'amber' },
];

const quickActions = [
  { label: 'Add Admin', route: '/super-admin/admins', icon: Plus },
  { label: 'Manage Roles', route: '/super-admin/roles', icon: ShieldCheck },
  { label: 'Security Center', route: '/super-admin/security', icon: LockKeyhole },
  { label: 'Export Report', route: '/super-admin/reports', icon: Download },
];

const departments = [
  { name: 'Roads & Infrastructure', open: 342, resolved: 1284, sla: 92, budget: '₹18.4Cr', status: 'Operational' },
  { name: 'Water Supply', open: 216, resolved: 943, sla: 88, budget: '₹11.2Cr', status: 'Review Needed' },
  { name: 'Sanitation', open: 184, resolved: 1102, sla: 95, budget: '₹9.7Cr', status: 'Operational' },
  { name: 'Electricity', open: 139, resolved: 761, sla: 91, budget: '₹14.1Cr', status: 'Operational' },
];

const auditLogs = [
  { action: 'Role policy updated', actor: 'Super Administrator', time: '5 min ago', type: 'Security' },
  { action: 'New department admin invited', actor: 'Dr. Sunita Sharma', time: '18 min ago', type: 'User' },
  { action: 'AI priority model threshold changed', actor: 'System Control', time: '42 min ago', type: 'AI' },
  { action: 'Water Supply SLA warning generated', actor: 'Monitoring Service', time: '1 hr ago', type: 'Alert' },
];

const systemHealth = [
  { label: 'API Gateway', value: '99.99%', icon: Server, state: 'Healthy', route: '/super-admin/system-health' },
  { label: 'Database Cluster', value: '41 ms', icon: Database, state: 'Healthy', route: '/super-admin/system-health' },
  { label: 'AI Routing Engine', value: '97.8%', icon: Sparkles, state: 'Healthy', route: '/super-admin/system-health' },
  { label: 'Auth Service', value: '100%', icon: LockKeyhole, state: 'Healthy', route: '/super-admin/security' },
];

const chartBars = [48, 62, 56, 74, 68, 86, 79, 92, 84, 97, 89, 94];

const toneClasses = {
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  teal: 'bg-teal-50 text-teal-700 border-teal-100',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  amber: 'bg-amber-50 text-amber-700 border-amber-100',
};

const SectionHeader = ({ title, subtitle, action, onAction }) => (
  <div className="p-5 border-b border-slate-200 flex items-center justify-between gap-4">
    <div>
      <h3 className="font-bold text-slate-950">{title}</h3>
      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
    {action && (
      <button
        onClick={onAction}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
      >
        {action}
        <ArrowRight className="w-4 h-4" />
      </button>
    )}
  </div>
);

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-teal-900 text-white shadow-xl shadow-blue-950/10">
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-blue-100 mb-5">
                <ShieldCheck className="w-4 h-4" />
                Enterprise RBAC Active
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Civic AI System Command Center</h2>
              <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed">
                Manage departments, administrators, citizens, complaints, security policies, AI automation, and platform reliability from one government-grade operations console.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {quickActions.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() => navigate(item.route)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-slate-950 text-sm font-bold hover:bg-blue-50 transition shadow-sm"
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full xl:w-[420px]">
              {[
                ['Resolution Rate', '87.6%', '↑ 4.1%'],
                ['Critical Alerts', '4', '2 high priority'],
                ['Avg Response', '3.8 hrs', '↓ 18 min'],
                ['Uptime', '99.99%', 'All regions'],
              ].map(([label, value, meta]) => (
                <div key={label} className="rounded-xl bg-white/10 border border-white/15 p-4 backdrop-blur">
                  <p className="text-xs text-slate-300">{label}</p>
                  <p className="text-2xl font-bold mt-1">{value}</p>
                  <p className="text-xs text-emerald-200 mt-2">{meta}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.route)}
              className="text-left bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{item.label}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-950">{item.value}</p>
                </div>
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${toneClasses[item.tone]}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {item.change}
                </p>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            </button>
          );
        })}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm">
          <SectionHeader
            title="Complaint Resolution Trend"
            subtitle="Monthly closure rate and workload movement"
            action="Open Reports"
            onAction={() => navigate('/super-admin/reports')}
          />
          <div className="p-5">
            <div className="h-56 flex items-end gap-3 border-b border-slate-200 pb-4">
              {chartBars.map((height, index) => (
                <button
                  key={index}
                  onClick={() => navigate('/super-admin/reports')}
                  className="flex-1 rounded-t-lg bg-gradient-to-t from-blue-600 to-teal-400 hover:from-blue-700 hover:to-teal-500 transition"
                  style={{ height: `${height}%` }}
                  aria-label={`Open report for month ${index + 1}`}
                />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                ['Resolved Today', '418'],
                ['Escalated', '36'],
                ['AI Routed', '91%'],
                ['Citizen Satisfaction', '4.7/5'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="text-lg font-bold text-slate-950">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
          <SectionHeader
            title="Security & Access"
            subtitle="RBAC and authentication overview"
            action="Review"
            onAction={() => navigate('/super-admin/security')}
          />
          <div className="p-5 space-y-4">
            {[
              ['MFA Enforcement', 'Enabled for all admins', CheckCircle2, 'text-emerald-600'],
              ['Failed Login Attempts', '23 blocked today', AlertTriangle, 'text-amber-600'],
              ['Active Sessions', '214 live sessions', Activity, 'text-blue-600'],
              ['Policy Version', 'RBAC v3.2 applied', ShieldCheck, 'text-teal-600'],
            ].map(([title, desc, Icon, color]) => (
              <button
                key={title}
                onClick={() => navigate('/super-admin/security')}
                className="w-full flex items-center justify-between gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition text-left"
              >
                <span className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <span>
                    <span className="block text-sm font-semibold text-slate-900">{title}</span>
                    <span className="block text-xs text-slate-500">{desc}</span>
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm">
          <SectionHeader
            title="Department Performance"
            subtitle="Live SLA, workload, budget, and operating status"
            action="Manage"
            onAction={() => navigate('/super-admin/departments')}
          />
          <div className="divide-y divide-slate-100">
            {departments.map((dept) => (
              <button
                key={dept.name}
                onClick={() => navigate('/super-admin/departments')}
                className="w-full p-5 text-left hover:bg-slate-50 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{dept.name}</p>
                    <p className="text-xs text-slate-500">{dept.open} open complaints | {dept.resolved} resolved | {dept.budget} allocated</p>
                  </div>
                  <span className={`self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold ${
                    dept.status === 'Operational' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {dept.status}
                  </span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                    <span>SLA Compliance</span>
                    <span>{dept.sla}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-blue-600" style={{ width: `${dept.sla}%` }} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
          <SectionHeader
            title="System Health"
            subtitle="Infrastructure and core service metrics"
            action="Details"
            onAction={() => navigate('/super-admin/system-health')}
          />
          <div className="p-5 space-y-3">
            {systemHealth.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.route)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition"
                >
                  <span className="flex items-center gap-3 text-left">
                    <span className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-slate-600" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-slate-900">{item.label}</span>
                      <span className="block text-xs text-emerald-600">{item.state}</span>
                    </span>
                  </span>
                  <span className="text-sm font-bold text-slate-950">{item.value}</span>
                </button>
              );
            })}
            <button
              onClick={() => navigate('/super-admin/system-health')}
              className="mt-2 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-950 text-white text-sm font-bold hover:bg-slate-800 transition"
            >
              <RefreshCw className="w-4 h-4" />
              Run Health Check
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-xl shadow-sm">
        <SectionHeader
          title="Recent Audit Activity"
          subtitle="Security-relevant changes and platform events"
          action="View Logs"
          onAction={() => navigate('/super-admin/audit-logs')}
        />
        <div className="divide-y divide-slate-100">
          {auditLogs.map((log) => (
            <button
              key={`${log.action}-${log.time}`}
              onClick={() => navigate('/super-admin/audit-logs')}
              className="w-full p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-left hover:bg-slate-50 transition"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">{log.action}</p>
                <p className="text-xs text-slate-500">By {log.actor}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">{log.type}</span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock3 className="w-3.5 h-3.5" />
                  {log.time}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SuperAdminDashboard;
