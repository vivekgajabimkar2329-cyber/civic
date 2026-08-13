import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Download,
  Droplets,
  FileText,
  Gauge,
  MapPin,
  Megaphone,
  Send,
  ShieldCheck,
  Star,
  Timer,
  TrendingUp,
  UsersRound,
  UserPlus,
  Wrench,
  Zap,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, StatCard, HeroSection, Button, Table } from '../../../components/ui/DashboardUI';

const metricSeries = [24, 32, 28, 42, 38, 54, 48];

const kpis = [
  { label: 'Total Complaints', value: '3,452', change: '+12.5%', icon: FileText, color: '#2563EB', iconBg: 'bg-blue-50 text-[#2563EB]' },
  { label: 'Resolved', value: '2,458', change: '+15.3%', icon: CheckCircle2, color: '#10B981', iconBg: 'bg-emerald-50 text-emerald-600' },
  { label: 'Pending', value: '994', change: '-3.2%', icon: Clock3, color: '#F59E0B', negative: true, iconBg: 'bg-amber-50 text-amber-600' },
  { label: 'In Progress', value: '312', change: '+5.8%', icon: Gauge, color: '#8B5CF6', iconBg: 'bg-purple-50 text-purple-650' },
  { label: 'Departments', value: '24', change: '+2 active', icon: Building2, color: '#0D9488', iconBg: 'bg-teal-50 text-teal-600' },
  { label: 'Users', value: '12,689', change: '+8.4%', icon: UsersRound, color: '#06B6D4', iconBg: 'bg-cyan-50 text-cyan-600' },
];

const overviewData = [
  { day: '31 May', total: 540, resolved: 340, pending: 150 },
  { day: '01 Jun', total: 710, resolved: 460, pending: 190 },
  { day: '02 Jun', total: 590, resolved: 350, pending: 150 },
  { day: '03 Jun', total: 640, resolved: 410, pending: 145 },
  { day: '04 Jun', total: 835, resolved: 535, pending: 250 },
  { day: '05 Jun', total: 730, resolved: 505, pending: 245 },
  { day: '06 Jun', total: 910, resolved: 665, pending: 330 },
];

const categories = [
  { name: 'Road & Footpath', value: 1245, percent: 36, color: '#2563EB' },
  { name: 'Garbage & Waste', value: 876, percent: 25, color: '#10B981' },
  { name: 'Water Supply', value: 567, percent: 16, color: '#F59E0B' },
  { name: 'Drainage', value: 432, percent: 12, color: '#8B5CF6' },
  { name: 'Street Light', value: 332, percent: 9, color: '#EF4444' },
  { name: 'Others', value: 72, percent: 2, color: '#64748B' },
];

const complaints = [
  { id: '#CIV202506001', title: 'Large pothole on Main Street', citizen: 'Asha Rao', dept: 'Road & Footpath', officer: 'R. Khan', priority: 'High', status: 'New', location: 'Kukatpally', sla: '4h left', time: 'Today, 10:30 AM', img: 'https://images.unsplash.com/photo-1530976610311-a041b082b1bc?auto=format&fit=crop&w=160&q=80' },
  { id: '#CIV202506002', title: 'Garbage not collected', citizen: 'Vikram Sen', dept: 'Garbage & Waste', officer: 'S. Mehta', priority: 'Medium', status: 'In Progress', location: 'Ameerpet', sla: '8h left', time: 'Today, 09:15 AM', img: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=160&q=80' },
  { id: '#CIV202506003', title: 'Water leakage in pipeline', citizen: 'N. Fatima', dept: 'Water Supply', officer: 'K. Das', priority: 'High', status: 'Pending', location: 'Banjara Hills', sla: '2h left', time: 'Yesterday, 06:45 PM', img: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&w=160&q=80' },
  { id: '#CIV202506004', title: 'Street light not working', citizen: 'Arjun Reddy', dept: 'Street Light', officer: 'P. Iyer', priority: 'Low', status: 'Resolved', location: 'LB Nagar', sla: 'Met', time: 'Yesterday, 04:20 PM', img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=160&q=80' },
  { id: '#CIV202506005', title: 'Drainage overflow near school', citizen: 'Meena Nair', dept: 'Drainage', officer: 'T. Singh', priority: 'Critical', status: 'In Progress', location: 'Secunderabad', sla: '1h left', time: 'Yesterday, 02:05 PM', img: 'https://images.unsplash.com/photo-1544099858-75feeb57f01b?auto=format&fit=crop&w=160&q=80' },
];

const departments = [
  { name: 'Engineering', icon: Wrench, color: 'text-[#2563EB]', total: '1,245', resolved: '876', pending: '210', progress: '159', sla: '92%' },
  { name: 'Sanitation', icon: Building2, color: 'text-[#10B981]', total: '987', resolved: '679', pending: '199', progress: '109', sla: '86%' },
  { name: 'Water Works', icon: Droplets, color: 'text-[#06B6D4]', total: '567', resolved: '423', pending: '78', progress: '66', sla: '89%' },
  { name: 'Electricity', icon: Zap, color: 'text-[#F59E0B]', total: '332', resolved: '243', pending: '56', progress: '33', sla: '94%' },
  { name: 'Parks & Garden', icon: Building2, color: 'text-emerald-600', total: '321', resolved: '237', pending: '61', progress: '23', sla: '81%' },
];

const insights = [
  { icon: TrendingUp, tone: 'bg-[#2563EB]', title: 'Prediction', desc: 'Road complaints may rise 18% next week due to forecast rainfall.' },
  { icon: ShieldCheck, tone: 'bg-emerald-600', title: 'Resolution Recommendation', desc: 'Move two officers from Parks to Sanitation for the next 48 hours.' },
  { icon: AlertTriangle, tone: 'bg-amber-500', title: 'Risk Score', desc: 'Drainage backlog has a 74% escalation risk in LB Nagar.' },
  { icon: Timer, tone: 'bg-violet-600', title: 'Peak Hours', desc: 'Most reports arrive between 10 AM and 2 PM on weekdays.' },
];

const analytics = [
  { title: 'Complaint Trends', value: '+18.4%', icon: TrendingUp, color: '#2563EB', data: [42, 50, 44, 63, 58, 72] },
  { title: 'Monthly Analytics', value: '14.8k', icon: BarChart3, color: '#10B981', data: [30, 45, 42, 52, 66, 74] },
  { title: 'Officer Performance', value: '91%', icon: UserPlus, color: '#8B5CF6', data: [50, 52, 58, 64, 70, 76] },
  { title: 'Resolution Time', value: '3.8h', icon: Timer, color: '#EF4444', data: [78, 72, 66, 58, 49, 42] },
  { title: 'Citizen Satisfaction', value: '4.7/5', icon: Star, color: '#F59E0B', data: [55, 58, 62, 68, 72, 79] },
  { title: 'SLA Compliance', value: '94%', icon: ShieldCheck, color: '#0D9488', data: [82, 86, 84, 89, 91, 94] },
  { title: 'Complaint Sources', value: '68% app', icon: ClipboardList, color: '#06B6D4', data: [26, 32, 38, 48, 56, 68] },
  { title: 'Priority Distribution', value: '12 critical', icon: AlertTriangle, color: '#DC2626', data: [12, 18, 15, 22, 19, 24] },
];

const quickActions = [
  { label: 'Assign Complaint', icon: UsersRound },
  { label: 'Generate Report', icon: FileText },
  { label: 'Export Excel', icon: Download },
  { label: 'Export PDF', icon: Download },
  { label: 'Send Notification', icon: Send },
  { label: 'Add Department', icon: Building2 },
  { label: 'Add Officer', icon: UserPlus },
  { label: 'Create Announcement', icon: Megaphone },
];

const Pill = ({ children, tone = 'slate' }) => {
  const tones = {
    slate: 'bg-slate-100 text-slate-700 border border-slate-200/60',
    blue: 'bg-blue-50 text-blue-700 border border-blue-100',
    green: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    amber: 'bg-amber-50 text-amber-700 border border-amber-100',
    red: 'bg-red-50 text-red-700 border border-red-100',
    violet: 'bg-violet-50 text-violet-700 border border-violet-100',
  };
  return <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${tones[tone]}`}>{children}</span>;
};

const Dashboard = () => {
  const navigate = useNavigate();

  // Welcome stats block inside Hero Banner
  const commandCenterWidget = (
    <div className="grid grid-cols-3 gap-2.5 border border-white/10 bg-white/10 p-3.5 rounded-2xl backdrop-blur-md">
      {[
        ['Open', '1,306'],
        ['Critical', '42'],
        ['SLA Risk', '18'],
      ].map(([label, value]) => (
        <div key={label} className="text-center px-2 py-2 bg-slate-950/20 rounded-xl border border-white/5">
          <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest leading-none">{label}</p>
          <p className="mt-1 text-base font-extrabold text-white leading-none">{value}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <HeroSection
        badgeText="Live civic operations"
        badgeIcon={ShieldCheck}
        title="City complaint command center"
        description="Monitor incoming complaints, department load, SLA risk, officer assignments, and AI recommendations from one operational dashboard."
        rightWidget={commandCenterWidget}
      />

      {/* KPIs Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi) => (
          <StatCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            change={kpi.change}
            negative={kpi.negative}
            icon={kpi.icon}
            iconBg={kpi.iconBg}
            chartData={metricSeries}
            chartColor={kpi.color}
          />
        ))}
      </section>

      {/* Middle row: charts and list */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Line Chart */}
        <Card
          title="Complaints Overview"
          action={<Pill tone="blue">Last 7 Days</Pill>}
          className="xl:col-span-7 2xl:col-span-5 h-[430px]"
        >
          <div className="h-[310px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={overviewData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 550 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 550 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Line type="monotone" name="Total Reports" dataKey="total" stroke="#2563EB" strokeWidth={2.5} dot={false} />
                <Line type="monotone" name="Resolved" dataKey="resolved" stroke="#10B981" strokeWidth={2.5} dot={false} />
                <Line type="monotone" name="Pending" dataKey="pending" stroke="#F59E0B" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pie Chart */}
        <Card
          title="Complaint Categories"
          action={<button className="text-xs font-bold text-[#2563EB] hover:underline">View All</button>}
          className="xl:col-span-5 2xl:col-span-3 h-[430px]"
        >
          <div className="relative h-[210px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categories} dataKey="percent" innerRadius={60} outerRadius={85} startAngle={90} endAngle={-270} paddingAngle={2}>
                  {categories.map((item) => <Cell key={item.name} fill={item.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-2xl font-black text-[#0F172A] leading-none">3,452</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Total</p>
            </div>
          </div>
          <div className="mt-3 space-y-1.5 h-[120px] overflow-y-auto scrollbar-thin">
            {categories.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="flex-1 truncate">{item.name}</span>
                <span className="font-bold text-[#0F172A]">{item.percent}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent complaints cards list */}
        <Card
          title="Recent Complaints"
          action={<button onClick={() => navigate('/admin/complaints')} className="text-xs font-bold text-[#2563EB] hover:underline">View All</button>}
          className="xl:col-span-12 2xl:col-span-4 h-[430px]"
          bodyClassName="h-[340px] overflow-y-auto pr-1.5 scrollbar-thin space-y-3"
        >
          {complaints.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-200/80 p-3 flex gap-3.5 hover:bg-slate-50/50 transition">
              <img src={item.img} alt="" className="h-20 w-24 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200/60" />
              <div className="min-w-0 flex-1 flex flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold text-slate-800 truncate text-xs">{item.title}</p>
                  <Pill tone={item.priority === 'Critical' || item.priority === 'High' ? 'red' : item.priority === 'Medium' ? 'amber' : 'green'}>{item.priority}</Pill>
                </div>
                <p className="text-[10px] font-semibold text-slate-450 uppercase tracking-wider mt-0.5">{item.id} • {item.citizen}</p>
                <p className="text-[10px] font-medium text-slate-500 truncate">{item.dept} • Officer: {item.officer}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <Pill tone={item.status === 'Resolved' ? 'green' : item.status === 'Pending' ? 'amber' : item.status === 'New' ? 'blue' : 'violet'}>{item.status}</Pill>
                  <span className="text-[10px] font-bold text-slate-400 truncate">{item.location}</span>
                  <span className="text-[10px] font-bold text-slate-400">• SLA: {item.sla}</span>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </section>

      {/* Row 3: Table, AI suggestions and Map */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Department performance Table */}
        <div className="xl:col-span-6 2xl:col-span-5 h-[390px] flex flex-col">
          <Card title="Department Performance" className="flex-1 flex flex-col h-full" bodyClassName="flex-1 overflow-y-auto scrollbar-thin pr-1 mt-1">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="border-b border-slate-150 text-[10px] font-bold text-slate-450 uppercase tracking-widest">
                  <th className="pb-3 font-bold">Department</th>
                  <th className="pb-3 font-bold">Total</th>
                  <th className="pb-3 font-bold">Resolved</th>
                  <th className="pb-3 font-bold">Pending</th>
                  <th className="pb-3 font-bold">Progress</th>
                  <th className="pb-3 font-bold">SLA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {departments.map((dept) => {
                  const Icon = dept.icon;
                  return (
                    <tr key={dept.name} className="hover:bg-slate-50/50 transition">
                      <td className="py-3">
                        <div className="flex items-center gap-2 font-bold text-slate-800">
                          <Icon className={`h-4.5 w-4.5 ${dept.color}`} />
                          {dept.name}
                        </div>
                      </td>
                      <td className="py-3 font-semibold text-slate-600">{dept.total}</td>
                      <td className="py-3 font-semibold text-slate-600">{dept.resolved}</td>
                      <td className="py-3 font-semibold text-slate-600">{dept.pending}</td>
                      <td className="py-3 font-semibold text-slate-600">{dept.progress}</td>
                      <td className="py-3"><Pill tone="green">{dept.sla}</Pill></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>

        {/* AI Insights panel */}
        <Card
          title="AI Insights"
          action={<Pill tone="green">Live AI</Pill>}
          className="xl:col-span-6 2xl:col-span-3 h-[390px]"
          bodyClassName="h-[300px] overflow-y-auto pr-1.5 scrollbar-thin space-y-3"
        >
          {insights.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-xl border border-slate-200/80 p-3.5 flex gap-3 hover:border-blue-200 transition">
                <div className={`h-9 w-9 rounded-lg ${item.tone} text-white flex items-center justify-center shrink-0`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-800 text-xs">{item.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-500 font-medium">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </Card>

        {/* Hyderabad heat map widget */}
        <Card
          title="Complaint Heat Map"
          action={<button className="text-xs font-bold text-[#2563EB] hover:underline">Filters</button>}
          className="xl:col-span-12 2xl:col-span-4 h-[390px]"
        >
          <div className="relative h-[290px] overflow-hidden rounded-xl border border-slate-200/80 bg-[#eaf1ed]">
            <div className="absolute inset-0 opacity-70" style={{ backgroundImage: 'linear-gradient(32deg, transparent 0 42%, #ccd8dc 43% 44%, transparent 45% 100%), linear-gradient(118deg, transparent 0 38%, #cbd6db 39% 40%, transparent 41% 100%), linear-gradient(#dbe4e9 1px, transparent 1px), linear-gradient(90deg, #dbe4e9 1px, transparent 1px)', backgroundSize: '190px 120px, 220px 140px, 46px 46px, 46px 46px' }} />
            <div className="absolute left-[22%] top-[16%] h-24 w-24 rounded-full bg-red-500/70 blur-xl" />
            <div className="absolute right-[26%] top-[18%] h-24 w-24 rounded-full bg-red-500/70 blur-xl" />
            <div className="absolute left-[53%] bottom-[14%] h-28 w-28 rounded-full bg-red-500/75 blur-xl" />
            <div className="absolute right-[12%] bottom-[22%] h-20 w-20 rounded-full bg-emerald-400/70 blur-lg" />
            <MapPin className="absolute left-[28%] top-[42%] h-6.5 w-6.5 text-[#2563EB] fill-[#2563EB]" />
            <MapPin className="absolute left-[51%] bottom-[15%] h-6.5 w-6.5 text-[#2563EB] fill-[#2563EB]" />
            <MapPin className="absolute right-[13%] top-[38%] h-6.5 w-6.5 text-emerald-600 fill-emerald-600" />
            <p className="absolute left-1/2 top-[58%] -translate-x-1/2 text-2xl font-black text-slate-800/90 tracking-tight">Hyderabad</p>
          </div>
        </Card>
      </section>

      {/* Row 4: bar chart widgets */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {analytics.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="h-[190px] flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{item.title}</p>
                  <p className="mt-1 text-2xl font-extrabold text-[#0F172A] tracking-tight">{item.value}</p>
                </div>
                <div className="h-9 w-9 rounded-lg text-white flex items-center justify-center shrink-0" style={{ backgroundColor: item.color }}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="h-16 mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={item.data.map((v, i) => ({ i, v }))}>
                    <Bar dataKey="v" fill={item.color} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          );
        })}
      </section>

      {/* Quick Actions grid panel */}
      <Card title="Quick Actions">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 mt-2">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                className="h-24 rounded-2xl border border-slate-200 bg-slate-50/50 p-4 flex flex-col items-center justify-center gap-2.5 text-center font-bold text-slate-800 hover:bg-white hover:-translate-y-1 hover:border-blue-200 hover:shadow-card transition duration-200"
              >
                <Icon className="h-5.5 w-5.5 text-[#2563EB]" />
                <span className="text-[11px] font-bold tracking-tight leading-tight">{action.label}</span>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
