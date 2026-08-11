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

const metricSeries = [24, 32, 28, 42, 38, 54, 48];

const kpis = [
  { label: 'Total Complaints', value: '3,452', change: '+12.5%', icon: FileText, color: '#0878eb' },
  { label: 'Resolved', value: '2,458', change: '+15.3%', icon: CheckCircle2, color: '#0faf68' },
  { label: 'Pending', value: '994', change: '-3.2%', icon: Clock3, color: '#e8a000', negative: true },
  { label: 'In Progress', value: '312', change: '+5.8%', icon: Gauge, color: '#7c4df2' },
  { label: 'Departments', value: '24', change: '+2 active', icon: Building2, color: '#0c7c8f' },
  { label: 'Users', value: '12,689', change: '+8.4%', icon: UsersRound, color: '#16a6bd' },
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
  { name: 'Road & Footpath', value: 1245, percent: 36, color: '#0878eb' },
  { name: 'Garbage & Waste', value: 876, percent: 25, color: '#1fc98c' },
  { name: 'Water Supply', value: 567, percent: 16, color: '#ff9416' },
  { name: 'Drainage', value: 432, percent: 12, color: '#8957f6' },
  { name: 'Street Light', value: 332, percent: 9, color: '#ff5266' },
  { name: 'Others', value: 72, percent: 2, color: '#6c7890' },
];

const complaints = [
  { id: '#CIV202506001', title: 'Large pothole on Main Street', citizen: 'Asha Rao', dept: 'Road & Footpath', officer: 'R. Khan', priority: 'High', status: 'New', location: 'Kukatpally', sla: '4h left', time: 'Today, 10:30 AM', img: 'https://images.unsplash.com/photo-1530976610311-a041b082b1bc?auto=format&fit=crop&w=160&q=80' },
  { id: '#CIV202506002', title: 'Garbage not collected', citizen: 'Vikram Sen', dept: 'Garbage & Waste', officer: 'S. Mehta', priority: 'Medium', status: 'In Progress', location: 'Ameerpet', sla: '8h left', time: 'Today, 09:15 AM', img: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=160&q=80' },
  { id: '#CIV202506003', title: 'Water leakage in pipeline', citizen: 'N. Fatima', dept: 'Water Supply', officer: 'K. Das', priority: 'High', status: 'Pending', location: 'Banjara Hills', sla: '2h left', time: 'Yesterday, 06:45 PM', img: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&w=160&q=80' },
  { id: '#CIV202506004', title: 'Street light not working', citizen: 'Arjun Reddy', dept: 'Street Light', officer: 'P. Iyer', priority: 'Low', status: 'Resolved', location: 'LB Nagar', sla: 'Met', time: 'Yesterday, 04:20 PM', img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=160&q=80' },
  { id: '#CIV202506005', title: 'Drainage overflow near school', citizen: 'Meena Nair', dept: 'Drainage', officer: 'T. Singh', priority: 'Critical', status: 'In Progress', location: 'Secunderabad', sla: '1h left', time: 'Yesterday, 02:05 PM', img: 'https://images.unsplash.com/photo-1544099858-75feeb57f01b?auto=format&fit=crop&w=160&q=80' },
];

const departments = [
  { name: 'Engineering', icon: Wrench, color: 'text-[#0878eb]', total: '1,245', resolved: '876', pending: '210', progress: '159', sla: '92%' },
  { name: 'Sanitation', icon: Building2, color: 'text-[#12b978]', total: '987', resolved: '679', pending: '199', progress: '109', sla: '86%' },
  { name: 'Water Works', icon: Droplets, color: 'text-[#1689ff]', total: '567', resolved: '423', pending: '78', progress: '66', sla: '89%' },
  { name: 'Electricity', icon: Zap, color: 'text-[#f4ad00]', total: '332', resolved: '243', pending: '56', progress: '33', sla: '94%' },
  { name: 'Parks & Garden', icon: Building2, color: 'text-[#12b978]', total: '321', resolved: '237', pending: '61', progress: '23', sla: '81%' },
];

const insights = [
  { icon: TrendingUp, tone: 'bg-blue-600', title: 'Prediction', desc: 'Road complaints may rise 18% next week due to forecast rainfall.' },
  { icon: ShieldCheck, tone: 'bg-emerald-600', title: 'Resolution Recommendation', desc: 'Move two officers from Parks to Sanitation for the next 48 hours.' },
  { icon: AlertTriangle, tone: 'bg-amber-500', title: 'Risk Score', desc: 'Drainage backlog has a 74% escalation risk in LB Nagar.' },
  { icon: Timer, tone: 'bg-violet-600', title: 'Peak Hours', desc: 'Most reports arrive between 10 AM and 2 PM on weekdays.' },
];

const analytics = [
  { title: 'Complaint Trends', value: '+18.4%', icon: TrendingUp, color: '#0878eb', data: [42, 50, 44, 63, 58, 72] },
  { title: 'Monthly Analytics', value: '14.8k', icon: BarChart3, color: '#0faf68', data: [30, 45, 42, 52, 66, 74] },
  { title: 'Officer Performance', value: '91%', icon: UserPlus, color: '#7c4df2', data: [50, 52, 58, 64, 70, 76] },
  { title: 'Resolution Time', value: '3.8h', icon: Timer, color: '#f28c00', data: [78, 72, 66, 58, 49, 42] },
  { title: 'Citizen Satisfaction', value: '4.7/5', icon: Star, color: '#e2a000', data: [55, 58, 62, 68, 72, 79] },
  { title: 'SLA Compliance', value: '94%', icon: ShieldCheck, color: '#0c7c8f', data: [82, 86, 84, 89, 91, 94] },
  { title: 'Complaint Sources', value: '68% app', icon: ClipboardList, color: '#16a6bd', data: [26, 32, 38, 48, 56, 68] },
  { title: 'Priority Distribution', value: '12 critical', icon: AlertTriangle, color: '#e5484d', data: [12, 18, 15, 22, 19, 24] },
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

const Card = ({ title, action, children, className = '', bodyClassName = '' }) => (
  <section className={`rounded-[20px] border border-[#e2e8f0] bg-white p-6 shadow-[0_8px_24px_rgba(9,39,82,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(9,39,82,0.09)] ${className}`}>
    {(title || action) && (
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-[18px] font-bold tracking-tight text-[#071832]">{title}</h2>
        {action}
      </div>
    )}
    <div className={bodyClassName}>{children}</div>
  </section>
);

const Pill = ({ children, tone = 'slate' }) => {
  const tones = {
    slate: 'bg-slate-100 text-slate-700',
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    red: 'bg-red-50 text-red-700',
    violet: 'bg-violet-50 text-violet-700',
  };
  return <span className={`rounded-full px-2.5 py-1 text-[12px] font-bold ${tones[tone]}`}>{children}</span>;
};

const Dashboard = () => {
  const navigate = useNavigate();

return (
    <div className="mx-auto max-w-[1280px] py-8 px-2 sm:px-3 space-y-7">
      <section className="rounded-[20px] border border-[#e2e8f0] bg-white p-6 shadow-[0_8px_24px_rgba(9,39,82,0.05)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#0878eb]">Live civic operations</p>
            <h2 className="mt-2 text-[28px] font-extrabold tracking-tight text-[#061936]">City complaint command center</h2>
            <p className="mt-2 max-w-3xl text-[15px] leading-7 text-[#526586]">
              Monitor incoming complaints, department load, SLA risk, officer assignments, and AI recommendations from one operational dashboard.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              ['Open', '1,306'],
              ['Critical', '42'],
              ['SLA Risk', '18'],
            ].map(([label, value]) => (
              <div key={label} className="h-20 min-w-[104px] rounded-2xl bg-[#f8fbff] border border-[#e2e8f0] px-4 py-3">
                <p className="text-xs font-bold text-[#526586]">{label}</p>
                <p className="mt-1 text-2xl font-extrabold text-[#061936]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="h-[150px] rounded-[20px] border border-[#e2e8f0] bg-white p-5 shadow-[0_8px_24px_rgba(9,39,82,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(9,39,82,0.09)]">
              <div className="flex items-start justify-between gap-3">
                <div className="h-11 w-11 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: kpi.color }}>
                  <Icon className="h-5 w-5" />
                </div>
                <ResponsiveContainer width={64} height={30}>
                  <AreaChart data={metricSeries.map((v, i) => ({ i, v }))}>
                    <Area type="monotone" dataKey="v" stroke={kpi.color} fill={kpi.color} fillOpacity={0.12} strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-4 text-[13px] font-semibold text-[#526586]">{kpi.label}</p>
              <div className="mt-1 flex items-end justify-between gap-2">
                <p className="text-[26px] leading-none font-extrabold text-[#061936]">{kpi.value}</p>
                <p className={`text-xs font-bold ${kpi.negative ? 'text-red-600' : 'text-emerald-600'}`}>{kpi.change}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <Card title="Complaints Overview" action={<Pill tone="blue">Last 7 Days</Pill>} className="xl:col-span-7 2xl:col-span-5 h-[430px]">
          <div className="h-[330px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={overviewData} margin={{ top: 10, right: 16, left: -16, bottom: 0 }}>
                <CartesianGrid stroke="#edf2f8" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#526586', fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#526586', fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#0878eb" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="resolved" stroke="#1fc98c" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="pending" stroke="#ff9416" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Complaint Categories" action={<button className="text-sm font-bold text-[#0878eb]">View All</button>} className="xl:col-span-5 2xl:col-span-3 h-[430px]">
          <div className="relative h-[210px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categories} dataKey="percent" innerRadius={62} outerRadius={94} startAngle={90} endAngle={-270}>
                  {categories.map((item) => <Cell key={item.name} fill={item.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-[28px] font-extrabold text-[#061936]">3,452</p>
              <p className="text-sm font-bold text-[#526586]">Total</p>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            {categories.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="flex-1 font-semibold text-[#31425f]">{item.name}</span>
                <span className="font-bold text-[#061936]">{item.percent}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent Complaints" action={<button onClick={() => navigate('/admin/complaints')} className="text-sm font-bold text-[#0878eb]">View All</button>} className="xl:col-span-12 2xl:col-span-4 h-[430px]" bodyClassName="h-[338px] overflow-y-auto pr-2 scrollbar-thin space-y-4">
          {complaints.map((item) => (
            <div key={item.id} className="rounded-2xl border border-[#edf2f8] p-3 flex gap-3 hover:bg-slate-50 transition">
              <img src={item.img} alt="" className="h-20 w-24 rounded-xl object-cover bg-slate-100 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold text-[#061936] truncate">{item.title}</p>
                  <Pill tone={item.priority === 'Critical' || item.priority === 'High' ? 'red' : item.priority === 'Medium' ? 'amber' : 'green'}>{item.priority}</Pill>
                </div>
                <p className="mt-1 text-xs font-semibold text-[#526586]">{item.id} | {item.citizen}</p>
                <p className="mt-1 text-xs text-[#526586]">{item.dept} | Officer: {item.officer}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Pill tone={item.status === 'Resolved' ? 'green' : item.status === 'Pending' ? 'amber' : item.status === 'New' ? 'blue' : 'violet'}>{item.status}</Pill>
                  <span className="text-xs font-semibold text-[#526586]">{item.location}</span>
                  <span className="text-xs font-semibold text-[#526586]">SLA: {item.sla}</span>
                  <span className="text-xs text-[#7b8da9]">{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <Card title="Department Performance" className="xl:col-span-6 2xl:col-span-5 h-[390px]" bodyClassName="h-[300px] overflow-auto scrollbar-thin">
          <table className="w-full min-w-[620px] text-sm">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="text-left text-[13px] font-bold text-[#526586]">
                <th className="pb-3">Department</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Resolved</th>
                <th className="pb-3">Pending</th>
                <th className="pb-3">In Progress</th>
                <th className="pb-3">SLA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf2f8]">
              {departments.map((dept) => {
                const Icon = dept.icon;
                return (
                  <tr key={dept.name} className="hover:bg-slate-50">
                    <td className="py-4">
                      <div className="flex items-center gap-3 font-bold text-[#061936]">
                        <Icon className={`h-5 w-5 ${dept.color}`} />
                        {dept.name}
                      </div>
                    </td>
                    <td className="py-4 font-semibold">{dept.total}</td>
                    <td className="py-4 font-semibold">{dept.resolved}</td>
                    <td className="py-4 font-semibold">{dept.pending}</td>
                    <td className="py-4 font-semibold">{dept.progress}</td>
                    <td className="py-4"><Pill tone="green">{dept.sla}</Pill></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        <Card title="AI Insights" action={<Pill tone="green">Live</Pill>} className="xl:col-span-6 2xl:col-span-3 h-[390px]" bodyClassName="h-[300px] overflow-y-auto pr-2 scrollbar-thin space-y-3">
          {insights.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-[#edf2f8] p-4 flex gap-3">
                <div className={`h-11 w-11 rounded-xl ${item.tone} text-white flex items-center justify-center shrink-0`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-[#061936]">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#526586]">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </Card>

        <Card title="Complaint Heat Map" action={<button className="text-sm font-bold text-[#0878eb]">Filters</button>} className="xl:col-span-12 2xl:col-span-4 h-[390px]">
          <div className="relative h-[298px] overflow-hidden rounded-2xl border border-[#d8e4f2] bg-[#eaf1ed]">
            <div className="absolute inset-0 opacity-70" style={{ backgroundImage: 'linear-gradient(32deg, transparent 0 42%, #ccd8dc 43% 44%, transparent 45% 100%), linear-gradient(118deg, transparent 0 38%, #cbd6db 39% 40%, transparent 41% 100%), linear-gradient(#dbe4e9 1px, transparent 1px), linear-gradient(90deg, #dbe4e9 1px, transparent 1px)', backgroundSize: '190px 120px, 220px 140px, 46px 46px, 46px 46px' }} />
            <div className="absolute left-[22%] top-[16%] h-24 w-24 rounded-full bg-red-500/70 blur-xl" />
            <div className="absolute right-[26%] top-[18%] h-24 w-24 rounded-full bg-red-500/70 blur-xl" />
            <div className="absolute left-[53%] bottom-[14%] h-28 w-28 rounded-full bg-red-500/75 blur-xl" />
            <div className="absolute right-[12%] bottom-[22%] h-20 w-20 rounded-full bg-emerald-400/70 blur-lg" />
            <MapPin className="absolute left-[28%] top-[42%] h-7 w-7 text-[#1689ff] fill-[#1689ff]" />
            <MapPin className="absolute left-[51%] bottom-[15%] h-7 w-7 text-[#1689ff] fill-[#1689ff]" />
            <MapPin className="absolute right-[13%] top-[38%] h-7 w-7 text-[#86b93b] fill-[#86b93b]" />
            <p className="absolute left-1/2 top-[58%] -translate-x-1/2 text-[24px] font-extrabold text-[#26344f]">Hyderabad</p>
          </div>
        </Card>
      </section>

<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {analytics.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="h-[190px]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[13px] font-bold text-[#526586]">{item.title}</p>
                  <p className="mt-2 text-[26px] font-extrabold text-[#061936]">{item.value}</p>
                </div>
                <div className="h-11 w-11 rounded-xl text-white flex items-center justify-center" style={{ backgroundColor: item.color }}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-5 h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={item.data.map((v, i) => ({ i, v }))}>
                    <Bar dataKey="v" fill={item.color} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          );
        })}
      </section>

<Card title="Quick Actions">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button key={action.label} className="h-[96px] rounded-2xl border border-[#e2e8f0] bg-[#f8fbff] p-4 flex flex-col items-center justify-center gap-3 text-center font-bold text-[#061936] hover:bg-white hover:-translate-y-1 hover:shadow-lg transition">
                <Icon className="h-6 w-6 text-[#0878eb]" />
                <span className="text-sm leading-tight">{action.label}</span>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
