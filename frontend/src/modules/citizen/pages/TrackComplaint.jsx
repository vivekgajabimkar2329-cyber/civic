import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Bell,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  Filter,
  Globe,
  Headphones,
  Heart,
  Home,
  ListChecks,
  MapPin,
  Menu,
  Search,
  Send,
  ShieldCheck,
  Star,
  Timer,
  User,
  XCircle,
} from 'lucide-react';

const complaints = [
  {
    id: 'CIVICAI20240516001',
    title: 'Pothole on Main Road',
    location: 'MG Road, Nampally, Hyderabad',
    date: 'May 16, 2024',
    time: '10:30 AM',
    status: 'In Progress',
    statusStyle: 'bg-amber-100 text-amber-700',
    dueLabel: 'Expected Resolution',
    due: 'May 22, 2024',
    category: 'Roads & Infrastructure',
    department: 'Municipal Corporation',
    description: 'There is a deep pothole on the main road causing traffic issues and vehicle damage.',
    image: 'https://images.unsplash.com/photo-1611255642766-4ad417dcd697?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 'CIVICAI20240514008',
    title: 'Street Light Not Working',
    location: 'Park Lane, Banjara Hills, Hyderabad',
    date: 'May 14, 2024',
    time: '08:15 PM',
    status: 'Resolved',
    statusStyle: 'bg-emerald-100 text-emerald-700',
    dueLabel: 'Resolved On',
    due: 'May 18, 2024',
    category: 'Street Lighting',
    department: 'Public Works Department',
    description: 'Street lights are not working on a busy lane near the park entrance.',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 'CIVICAI20240512022',
    title: 'Garbage Overflowing',
    location: 'Road No. 12, Jubilee Hills, Hyderabad',
    date: 'May 12, 2024',
    time: '09:45 AM',
    status: 'In Progress',
    statusStyle: 'bg-amber-100 text-amber-700',
    dueLabel: 'Expected Resolution',
    due: 'May 21, 2024',
    category: 'Solid Waste',
    department: 'Solid Waste Management',
    description: 'Garbage bins are overflowing and creating bad smell around the residential area.',
    image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 'CIVICAI20240510015',
    title: 'Water Leakage from Pipe',
    location: 'Sai Nagar, Kapra, Hyderabad',
    date: 'May 10, 2024',
    time: '11:20 AM',
    status: 'Under Review',
    statusStyle: 'bg-blue-100 text-blue-700',
    dueLabel: 'Under Review By',
    due: 'Water Department',
    category: 'Water Supply',
    department: 'Water Supply',
    description: 'A roadside pipe is leaking continuously and water is flowing into the street.',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 'CIVICAI20240508011',
    title: 'Broken Footpath',
    location: 'Ameerpet, Hyderabad',
    date: 'May 08, 2024',
    time: '04:30 PM',
    status: 'Rejected',
    statusStyle: 'bg-red-100 text-red-700',
    dueLabel: 'Rejected On',
    due: 'May 10, 2024',
    category: 'Pedestrian Safety',
    department: 'Public Works Department',
    description: 'Footpath tiles are broken and unsafe for pedestrians near the market area.',
    image: 'https://images.unsplash.com/photo-1604503362008-5cd1eabbef10?q=80&w=500&auto=format&fit=crop',
  },
];

const stats = [
  { label: 'Total Complaints', value: '24', detail: 'All Time', icon: FileText, style: 'from-blue-50 to-sky-50 text-blue-700' },
  { label: 'In Progress', value: '8', detail: 'In Progress', icon: Timer, style: 'from-orange-50 to-amber-50 text-orange-700' },
  { label: 'Resolved', value: '14', detail: 'Completed', icon: CheckCircle2, style: 'from-emerald-50 to-green-50 text-emerald-700' },
  { label: 'Avg. Resolution Time', value: '5.2 Days', detail: 'This Month', icon: Clock3, style: 'from-violet-50 to-indigo-50 text-violet-700' },
  { label: 'Satisfaction Rate', value: '92%', detail: 'This Month', icon: Star, style: 'from-cyan-50 to-teal-50 text-teal-700' },
];

const commitments = [
  { title: 'Transparent Process', text: 'Track every step of your complaint', icon: Building2 },
  { title: 'Timely Updates', text: 'Get real-time updates on your complaint', icon: Timer },
  { title: 'Quick Resolution', text: 'We work to resolve issues as quickly as possible', icon: ListChecks },
  { title: 'Better Community', text: 'Together, we build a better and smarter city', icon: Heart },
];

const progressSteps = [
  { title: 'Complaint Registered', date: 'May 16, 2024 - 10:30 AM', text: 'Your complaint has been registered successfully.', state: 'done' },
  { title: 'Under Review', date: 'May 17, 2024 - 09:15 AM', text: 'Your complaint is under review by the concerned department.', state: 'active' },
  { title: 'In Progress', date: 'Pending', text: 'Department team will begin field work shortly.', state: 'pending' },
  { title: 'Resolved', date: 'Pending', text: 'Final closure update will appear here.', state: 'pending' },
];

const statusTabs = ['All', 'In Progress', 'Resolved', 'Rejected'];

const TrackComplaint = () => {
  const location = useLocation();
  const isCitizenPortal = location.pathname.startsWith('/citizen') || location.pathname === '/my-complaints';
  const pageHeading = isCitizenPortal ? 'My Complaints' : 'Track Your Complaint';
  const pageDescription = isCitizenPortal
    ? 'View and manage all your submitted complaints in one secure place.'
    : 'Enter your complaint ID to get real-time updates and track its progress.';

  const [query, setQuery] = useState('');
  const [activeStatus, setActiveStatus] = useState('All');
  const [selectedId, setSelectedId] = useState(complaints[0].id);
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');

  const filteredComplaints = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return complaints.filter((complaint) => {
      const matchesStatus = activeStatus === 'All' || complaint.status === activeStatus;
      const matchesDepartment = departmentFilter === 'All Departments' || complaint.department === departmentFilter;
      const matchesQuery =
        !normalized ||
        complaint.id.toLowerCase().includes(normalized) ||
        complaint.title.toLowerCase().includes(normalized) ||
        complaint.location.toLowerCase().includes(normalized);
      return matchesStatus && matchesDepartment && matchesQuery;
    });
  }, [activeStatus, departmentFilter, query]);

  const selectedComplaint = complaints.find((complaint) => complaint.id === selectedId) || filteredComplaints[0] || complaints[0];

  const handleTrack = (event) => {
    event.preventDefault();
    const found = complaints.find((complaint) => complaint.id.toLowerCase().includes(query.trim().toLowerCase()));
    if (found) setSelectedId(found.id);
  };

  return (
    <div className="min-h-screen bg-[#f7fbff] text-slate-950">


      <section className="relative overflow-hidden bg-gradient-to-r from-blue-50 via-white to-sky-50">
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-cyan-100/60 to-transparent" />
        <div className="absolute bottom-0 right-[2%] hidden h-64 w-[590px] opacity-80 lg:block">
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-[linear-gradient(90deg,rgba(96,165,250,0.18)_0_10%,transparent_10%_16%,rgba(59,130,246,0.18)_16%_28%,transparent_28%_34%,rgba(14,165,233,0.16)_34%_48%,transparent_48%_56%,rgba(96,165,250,0.2)_56%_72%,transparent_72%_78%,rgba(14,165,233,0.18)_78%_100%)]" />
          <div className="absolute bottom-0 left-[42%] h-64 w-44 rounded-t-[2rem] border-[10px] border-slate-900 bg-white shadow-2xl">
            <div className="mx-auto mt-2 h-3 w-16 rounded-full bg-slate-800" />
            <div className="relative m-4 h-48 overflow-hidden rounded-xl bg-slate-100">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(rgba(148,163,184,0.18)_1px,transparent_1px)] bg-[size:28px_28px]" />
              <MapPin className="absolute left-7 top-9 h-9 w-9 fill-emerald-500 text-emerald-600" />
              <svg className="absolute left-12 top-20 h-20 w-24" viewBox="0 0 120 90" fill="none">
                <path d="M4 20H36V58H72V35H114" stroke="#2f80ed" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="4" cy="20" r="4" fill="#2f80ed" />
                <circle cx="36" cy="58" r="4" fill="#2f80ed" />
                <circle cx="72" cy="35" r="4" fill="#2f80ed" />
                <circle cx="114" cy="35" r="4" fill="#2f80ed" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-12 left-[36%] rounded-xl bg-white p-4 shadow-xl">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-7 w-7 text-emerald-600" />
              <p className="text-sm font-bold leading-tight">Complaint Tracked<br />Successfully!</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto grid max-w-[1280px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Link to="/" className="hover:text-blue-700">Home</Link>
              <span>/</span>
              <Link to="/dashboard" className="hover:text-blue-700">Citizen Portal</Link>
              <span>/</span>
              <span>{pageHeading}</span>
            </div>
            <h1 className="mt-9 text-4xl font-extrabold tracking-normal sm:text-5xl">
              {pageHeading}
            </h1>
            <p className="mt-5 max-w-lg text-xl leading-8 text-slate-700">
              {pageDescription}
            </p>

            <form onSubmit={handleTrack} className="mt-8 max-w-xl rounded-xl border border-slate-200 bg-white p-5 shadow-xl shadow-blue-950/8">
              <label className="text-sm font-bold text-slate-900">Enter Complaint ID</label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="e.g. CIVICAI20240516001"
                  className="min-h-12 flex-1 rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-blue-500"
                />
                <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20 hover:bg-blue-700">
                  <Search className="h-4 w-4" />
                  Track Complaint
                </button>
              </div>
              <p className="mt-3 text-xs text-slate-500">You can find your complaint ID in the confirmation message or email.</p>
            </form>
          </div>

          <div className="hidden items-end justify-end lg:flex">
            <div className="mb-5 mr-3 w-64 rounded-xl border border-slate-200 bg-white/95 p-5 shadow-xl">
              <h2 className="font-bold">Need Help?</h2>
              <p className="mt-2 text-sm text-slate-600">Can’t find your complaint?</p>
              <a href="mailto:support@civicai.gov.in?subject=Complaint%20Tracking%20Support" className="mt-4 inline-flex items-center gap-2 rounded-lg border border-blue-200 px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50">
                <Headphones className="h-4 w-4" />
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className={`rounded-xl border border-slate-200 bg-gradient-to-br ${stat.style} p-5 shadow-sm`}>
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/70">
                    <Icon className="h-7 w-7" />
                  </span>
                  <span>
                    <span className="text-xs font-bold text-slate-800">{stat.label}</span>
                    <b className="mt-1 block text-2xl text-slate-950">{stat.value}</b>
                    <span className="text-xs text-slate-600">{stat.detail}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Your Complaints</h2>
                <p className="mt-1 text-sm text-slate-600">Track all your submitted complaints and their status</p>
              </div>
              <select
                value={departmentFilter}
                onChange={(event) => setDepartmentFilter(event.target.value)}
                className="w-fit rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm outline-none"
              >
                <option>All Departments</option>
                <option>Municipal Corporation</option>
                <option>Public Works Department</option>
                <option>Solid Waste Management</option>
                <option>Water Supply</option>
              </select>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {statusTabs.map((tab) => {
                const count = tab === 'All' ? 24 : tab === 'In Progress' ? 8 : tab === 'Resolved' ? 14 : 2;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveStatus(tab)}
                    className={`rounded-lg border px-5 py-3 text-sm font-semibold ${activeStatus === tab ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
                  >
                    {tab} ({count})
                  </button>
                );
              })}
              <button className="ml-auto hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 xl:flex">
                <Filter className="h-4 w-4" />
                All Departments
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 grid gap-3">
              {filteredComplaints.map((complaint) => (
                <button
                  key={complaint.id}
                  onClick={() => setSelectedId(complaint.id)}
                  className={`grid gap-4 rounded-xl border bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:grid-cols-[120px_1fr_auto] ${selectedComplaint.id === complaint.id ? 'border-blue-500 ring-1 ring-blue-200' : 'border-slate-200'}`}
                >
                  <img src={complaint.image} alt="" className="h-24 w-full rounded-lg object-cover sm:w-[120px]" />
                  <div>
                    <span className="rounded-md bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">{complaint.id}</span>
                    <h3 className="mt-3 text-lg font-bold">{complaint.title}</h3>
                    <p className="mt-1 flex items-center gap-2 text-sm text-slate-600"><MapPin className="h-4 w-4" /> {complaint.location}</p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-slate-600"><CalendarDays className="h-4 w-4" /> {complaint.date} · {complaint.time}</p>
                  </div>
                  <div className="flex items-center justify-between gap-6 sm:min-w-[180px]">
                    <span>
                      <span className={`rounded-md px-3 py-1 text-xs font-bold ${complaint.statusStyle}`}>{complaint.status}</span>
                      <span className="mt-3 block text-xs text-slate-600">{complaint.dueLabel}</span>
                      <b className="mt-1 block text-sm text-blue-700">{complaint.due}</b>
                    </span>
                    <ChevronRight className="h-5 w-5 text-blue-700" />
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
              <p>Showing 1 to 5 of 24 complaints</p>
              <div className="flex items-center gap-2">
                <button className="rounded-md border border-slate-200 bg-white p-2"><ChevronLeft className="h-4 w-4" /></button>
                {[1, 2, 3].map((page) => (
                  <button key={page} className={`rounded-md border px-3 py-2 ${page === 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-white'}`}>{page}</button>
                ))}
                <span className="px-2">...</span>
                <button className="rounded-md border border-slate-200 bg-white px-3 py-2">5</button>
                <button className="rounded-md border border-slate-200 bg-white p-2"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          <aside className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Complaint Details</h2>
                <span className={`rounded-md px-3 py-1 text-xs font-bold ${selectedComplaint.statusStyle}`}>{selectedComplaint.status}</span>
              </div>
              <span className="mt-4 inline-block rounded-md bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">{selectedComplaint.id}</span>
              <h3 className="mt-3 text-xl font-bold">{selectedComplaint.title}</h3>
              <p className="mt-3 flex items-center gap-2 text-sm text-slate-600"><MapPin className="h-4 w-4" /> {selectedComplaint.location}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><CalendarDays className="h-4 w-4" /> {selectedComplaint.date} · {selectedComplaint.time}</p>
              <div className="mt-4 grid gap-3 text-sm">
                <div><b className="block text-xs text-slate-500">Category</b>{selectedComplaint.category}</div>
                <div><b className="block text-xs text-slate-500">Department</b>{selectedComplaint.department}</div>
                <div><b className="block text-xs text-slate-500">Description</b><span className="leading-6 text-slate-700">{selectedComplaint.description}</span></div>
              </div>
              <div className="mt-4">
                <b className="text-sm">Attachments</b>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {[0, 1].map((item) => <img key={item} src={selectedComplaint.image} alt="" className="h-14 rounded-md object-cover" />)}
                  <div className="flex h-14 items-center justify-center rounded-md bg-slate-200 text-sm font-bold text-slate-600">+1</div>
                </div>
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-bold">Complaint Progress</h3>
              <div className="mt-5 space-y-5">
                {progressSteps.map((step) => (
                  <div key={step.title} className="relative flex gap-4">
                    <div className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${step.state === 'done' ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : step.state === 'active' ? 'border-amber-500 bg-amber-50 text-amber-600' : 'border-slate-300 bg-white text-slate-300'}`}>
                      {step.state === 'pending' ? <span className="h-1.5 w-1.5 rounded-full bg-current" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">{step.title}</h4>
                      <p className="mt-1 text-xs text-slate-500">{step.date}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-7 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Our Commitment to You</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-4 md:divide-x md:divide-slate-200">
            {commitments.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-4 md:px-4 first:pl-0">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <Icon className="h-7 w-7" />
                  </span>
                  <span>
                    <b className="text-sm">{item.title}</b>
                    <span className="mt-1 block text-xs leading-5 text-slate-600">{item.text}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="bg-[#041a31] text-white">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-300/50 bg-emerald-400/10 text-emerald-300">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold leading-none">Civic AI</p>
                <p className="mt-1 text-xs text-slate-300">Smarter City, Better Tomorrow.</p>
              </div>
            </Link>
            <p className="mt-5 text-sm leading-7 text-slate-200">Civic AI is your platform to report issues, track complaints, and make our city better for everyone.</p>
          </div>
          <div>
            <h3 className="font-bold">Quick Links</h3>
            <div className="mt-4 grid gap-2 text-sm text-slate-300">
              <Link to="/">Home</Link>
              <Link to="/services">Services</Link>
              <Link to="/departments">Departments</Link>
              <Link to="/dashboard" className="text-cyan-300">Dashboard</Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold">Support</h3>
            <div className="mt-4 grid gap-2 text-sm text-slate-300">
              <Link to="/help">Help Center</Link>
              <Link to="/faq">FAQs</Link>
              <a href="mailto:support@civicai.gov.in">Contact Us</a>
              <Link to="/help">Grievance Redressal</Link>
              <Link to="/about">Privacy Policy</Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold">Stay Updated</h3>
            <p className="mt-4 text-sm leading-6 text-slate-300">Subscribe to get the latest updates and announcements.</p>
            <form className="mt-4 flex rounded-lg border border-white/10 bg-white/5 p-1" onSubmit={(event) => event.preventDefault()}>
              <input placeholder="Enter your email" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-slate-400" />
              <button className="rounded-md bg-blue-600 p-3 hover:bg-blue-500" aria-label="Subscribe">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
          <div>
            <h3 className="font-bold">Download App</h3>
            <p className="mt-4 text-sm leading-6 text-slate-300">Get the Civic AI app on your mobile device.</p>
            <div className="mt-4 grid gap-3">
              <a href="https://play.google.com/store" className="rounded-lg border border-white/30 bg-black px-4 py-2 text-sm font-bold hover:bg-slate-900">Get it on Google Play</a>
              <a href="https://www.apple.com/app-store/" className="rounded-lg border border-white/30 bg-black px-4 py-2 text-sm font-bold hover:bg-slate-900">Download on App Store</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-4 py-5 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p>© 2024 Civic AI. All rights reserved.</p>
            <p>Made with love for a better tomorrow.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TrackComplaint;
