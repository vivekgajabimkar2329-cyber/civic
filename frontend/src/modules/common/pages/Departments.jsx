import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bell,
  Bolt,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Droplets,
  Flame,
  Grid3X3,
  Headphones,
  HeartPulse,
  Leaf,
  List,
  Search,
  ShieldCheck,
  Star,
  Trash2,
  UsersRound,
  Wrench,
  GraduationCap,
  Bus,
} from 'lucide-react';

const departments = [
  {
    name: 'Health Department',
    description: 'Healthcare, sanitation, public hospitals and disease control services.',
    complaints: 320,
    resolved: 288,
    rating: 4.6,
    icon: HeartPulse,
    color: 'green',
    accent: 'bg-green-100 text-green-700',
    button: 'bg-green-50 text-green-700 hover:bg-green-100',
  },
  {
    name: 'Water Supply',
    description: 'Water supply, distribution, maintenance and water quality management.',
    complaints: 210,
    resolved: 185,
    rating: 4.5,
    icon: Droplets,
    color: 'blue',
    accent: 'bg-blue-100 text-blue-700',
    button: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
  },
  {
    name: 'Solid Waste Management',
    description: 'Garbage collection, waste processing, recycling and clean city initiatives.',
    complaints: 278,
    resolved: 245,
    rating: 4.4,
    icon: Trash2,
    color: 'orange',
    accent: 'bg-orange-100 text-orange-700',
    button: 'bg-orange-50 text-orange-700 hover:bg-orange-100',
  },
  {
    name: 'Public Works Department',
    description: 'Roads, bridges, footpaths, street lights and infrastructure maintenance.',
    complaints: 186,
    resolved: 162,
    rating: 4.3,
    icon: Wrench,
    color: 'violet',
    accent: 'bg-violet-100 text-violet-700',
    button: 'bg-violet-50 text-violet-700 hover:bg-violet-100',
  },
  {
    name: 'Municipal Administration',
    description: 'General administration, building permissions and municipal records.',
    complaints: 154,
    resolved: 132,
    rating: 4.2,
    icon: Building2,
    color: 'sky',
    accent: 'bg-sky-100 text-sky-700',
    button: 'bg-sky-50 text-sky-700 hover:bg-sky-100',
  },
  {
    name: 'Environment Department',
    description: 'Pollution control, tree plantation, climate action and environmental preservation.',
    complaints: 128,
    resolved: 110,
    rating: 4.6,
    icon: Leaf,
    color: 'emerald',
    accent: 'bg-emerald-100 text-emerald-700',
    button: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
  },
  {
    name: 'Fire & Emergency Services',
    description: 'Fire safety, emergency response, disaster management and rescue operations.',
    complaints: 112,
    resolved: 96,
    rating: 4.7,
    icon: Flame,
    color: 'red',
    accent: 'bg-red-100 text-red-700',
    button: 'bg-red-50 text-red-700 hover:bg-red-100',
  },
  {
    name: 'Police Department',
    description: 'Law enforcement, safety, security, traffic management and public assistance.',
    complaints: 265,
    resolved: 230,
    rating: 4.4,
    icon: ShieldCheck,
    color: 'blue',
    accent: 'bg-blue-100 text-blue-700',
    button: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
  },
  {
    name: 'Education Department',
    description: 'Schools, education programs, scholarships and academic initiatives.',
    complaints: 98,
    resolved: 86,
    rating: 4.3,
    icon: GraduationCap,
    color: 'purple',
    accent: 'bg-purple-100 text-purple-700',
    button: 'bg-purple-50 text-purple-700 hover:bg-purple-100',
  },
  {
    name: 'Transport Department',
    description: 'Public transport, bus services, vehicle permits and traffic management.',
    complaints: 134,
    resolved: 118,
    rating: 4.2,
    icon: Bus,
    color: 'cyan',
    accent: 'bg-cyan-100 text-cyan-700',
    button: 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100',
  },
  {
    name: 'Finance Department',
    description: 'Tax collection, payments, civic accounts, grants and budget services.',
    complaints: 92,
    resolved: 81,
    rating: 4.4,
    icon: Building2,
    color: 'teal',
    accent: 'bg-teal-100 text-teal-700',
    button: 'bg-teal-50 text-teal-700 hover:bg-teal-100',
  },
  {
    name: 'Social Welfare Department',
    description: 'Citizen welfare schemes, benefits, support programs and community assistance.',
    complaints: 121,
    resolved: 104,
    rating: 4.5,
    icon: UsersRound,
    color: 'pink',
    accent: 'bg-pink-100 text-pink-700',
    button: 'bg-pink-50 text-pink-700 hover:bg-pink-100',
  },
  {
    name: 'Town Planning',
    description: 'Urban planning, zoning, layouts, land use and city development approvals.',
    complaints: 89,
    resolved: 72,
    rating: 4.1,
    icon: Building2,
    color: 'indigo',
    accent: 'bg-indigo-100 text-indigo-700',
    button: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
  },
  {
    name: 'Electricity Services',
    description: 'Street lighting, civic power assets, outage reports and electrical safety.',
    complaints: 155,
    resolved: 139,
    rating: 4.3,
    icon: Bolt,
    color: 'yellow',
    accent: 'bg-yellow-100 text-yellow-700',
    button: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100',
  },
];

const overview = [
  { label: 'Total Departments', value: '14', detail: 'All City Departments', icon: Building2, box: 'from-green-50 to-emerald-50', iconStyle: 'bg-green-100 text-green-700' },
  { label: 'Total Complaints', value: '1,248', detail: 'Filed This Month', icon: Bell, box: 'from-blue-50 to-sky-50', iconStyle: 'bg-blue-100 text-blue-700' },
  { label: 'In Progress', value: '896', detail: 'Under Review', icon: CalendarDays, box: 'from-orange-50 to-amber-50', iconStyle: 'bg-orange-100 text-orange-700' },
  { label: 'Resolved', value: '2,543', detail: 'This Month', icon: CheckCircle2, box: 'from-purple-50 to-indigo-50', iconStyle: 'bg-purple-100 text-purple-700' },
  { label: 'Avg. Satisfaction', value: '92%', detail: 'Citizen Feedback', icon: Star, box: 'from-cyan-50 to-teal-50', iconStyle: 'bg-cyan-100 text-cyan-700' },
];

const heroBadges = [
  { label: 'Responsive Departments', icon: UsersRound, style: 'text-green-700' },
  { label: 'Faster Resolution', icon: Bolt, style: 'text-blue-700' },
  { label: 'Transparent Communication', icon: ShieldCheck, style: 'text-violet-700' },
];

const DepartmentCard = ({ department, view }) => {
  const Icon = department.icon;
  const link = `/report?department=${encodeURIComponent(department.name)}`;

  if (view === 'list') {
    return (
      <article className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:grid-cols-[auto_1fr_auto] md:items-center">
        <div className={`flex h-16 w-16 items-center justify-center rounded-full ${department.accent}`}>
          <Icon className="h-8 w-8" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-950">{department.name}</h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">{department.description}</p>
          <div className="mt-3 flex flex-wrap gap-5 text-xs text-slate-500">
            <span><b className="text-base text-slate-900">{department.complaints}</b> Complaints</span>
            <span><b className="text-base text-slate-900">{department.resolved}</b> Resolved</span>
            <span className="flex items-center gap-1"><b className="text-base text-slate-900">{department.rating}</b> <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" /> Rating</span>
          </div>
        </div>
        <Link to={link} className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold ${department.button}`}>
          View Details <ArrowRight className="h-4 w-4" />
        </Link>
      </article>
    );
  }

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${department.accent}`}>
        <Icon className="h-10 w-10" />
      </div>
      <h3 className="mt-4 text-base font-bold leading-snug text-slate-950">{department.name}</h3>
      <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-600">{department.description}</p>
      <div className="mt-5 grid grid-cols-3 divide-x divide-slate-200 text-left">
        <div>
          <p className="text-[11px] text-slate-500">Complaints</p>
          <p className="mt-1 text-xl font-semibold text-slate-950">{department.complaints}</p>
        </div>
        <div className="pl-3">
          <p className="text-[11px] text-slate-500">Resolved</p>
          <p className="mt-1 text-xl font-semibold text-slate-950">{department.resolved}</p>
        </div>
        <div className="pl-3">
          <p className="text-[11px] text-slate-500">Rating</p>
          <p className="mt-1 flex items-center justify-center gap-1 text-xl font-semibold text-slate-950">
            {department.rating}
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </p>
        </div>
      </div>
      <Link to={link} className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-semibold ${department.button}`}>
        View Details <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
};

export const Departments = () => {
  const [query, setQuery] = useState('');
  const [view, setView] = useState('grid');
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const list = normalized
      ? departments.filter((department) =>
          `${department.name} ${department.description}`.toLowerCase().includes(normalized)
        )
      : departments;
    return showAll ? list : list.slice(0, 10);
  }, [query, showAll]);

  const hasMore = !showAll && departments.length > 10 && query.trim() === '';

  return (
    <div className="bg-[#f7fbff] text-slate-950">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-teal-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(20,184,166,0.22),transparent_24%),radial-gradient(circle_at_8%_20%,rgba(59,130,246,0.12),transparent_22%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-cyan-100/60 to-transparent" />

        <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Link to="/" className="hover:text-teal-700">Home</Link>
              <span>/</span>
              <span>Departments</span>
            </div>
            <div className="mt-7 max-w-2xl">
              <h1 className="text-4xl font-extrabold tracking-normal sm:text-5xl">
                <span className="text-teal-800">Our</span> Departments
              </h1>
              <p className="mt-4 text-xl leading-8 text-slate-700">
                Working together for a cleaner, safer and smarter city.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              {heroBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div key={badge.label} className="flex min-w-[160px] items-center gap-3 rounded-lg border border-slate-200 bg-white/90 px-4 py-3 text-sm font-semibold shadow-md shadow-slate-200/70">
                    <Icon className={`h-7 w-7 ${badge.style}`} />
                    {badge.label}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative hidden min-h-[330px] lg:block">
            <div className="absolute bottom-0 right-0 h-[310px] w-[610px] overflow-hidden rounded-[30px] border border-white/70 bg-white shadow-2xl shadow-teal-900/12">
              <img
                src="https://commons.wikimedia.org/wiki/Special:FilePath/Charminar%2C%20Hyderabad%2C%20India.jpg?width=1100"
                alt="Charminar monument in Hyderabad"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/78 via-white/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/35 via-transparent to-white/10" />
            </div>

            <div className="absolute bottom-8 left-8 max-w-[270px] rounded-2xl border border-white/70 bg-white/90 p-5 shadow-xl backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">Hyderabad Civic Network</p>
              <h2 className="mt-2 text-2xl font-extrabold leading-tight text-slate-950">Departments connected around Charminar</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">Real city services, faster routing and transparent citizen support.</p>
            </div>

            <div className="absolute right-8 top-8 rounded-full border border-white/80 bg-white/90 px-4 py-2 text-sm font-bold text-teal-800 shadow-lg">
              14 Active Departments
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
        <section>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold">Departments Overview</h2>
              <p className="mt-1 text-sm text-slate-600">Real-time overview of all departments and their activities.</p>
            </div>
            <button className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
              <CalendarDays className="h-4 w-4" />
              This Month
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {overview.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className={`rounded-xl border border-slate-200 bg-gradient-to-br ${item.box} p-5 shadow-sm`}>
                  <div className="flex items-center gap-4">
                    <span className={`flex h-16 w-16 items-center justify-center rounded-full ${item.iconStyle}`}>
                      <Icon className="h-8 w-8" />
                    </span>
                    <span>
                      <b className="text-2xl">{item.value}</b>
                      <span className="mt-1 block text-sm font-bold">{item.label}</span>
                      <span className="mt-1 block text-xs text-slate-600">{item.detail}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-9">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-xl font-bold">All Departments</h2>
              <p className="mt-1 text-sm text-slate-600">Select a department to view details, services and raise complaints.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex min-w-[280px] items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <Search className="h-5 w-5 text-slate-500" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search departments..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setView('grid')}
                  className={`rounded-lg border px-3 py-3 ${view === 'grid' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600'}`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`rounded-lg border px-3 py-3 ${view === 'list' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600'}`}
                  aria-label="List view"
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className={view === 'grid' ? 'mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5' : 'mt-6 grid gap-4'}>
            {filtered.map((department) => (
              <DepartmentCard key={department.name} department={department} view={view} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600">
              No departments found. Try searching for health, water, transport or environment.
            </div>
          )}

          {hasMore && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-10 py-3 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-50"
              >
                Load More Departments
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          )}
        </section>

        <section className="mt-9 rounded-xl border border-slate-200 bg-gradient-to-r from-blue-50 to-white p-5 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:divide-x lg:divide-slate-200">
            <div>
              <h2 className="text-xl font-bold">Need Help?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Can't find the department you are looking for? Contact our support team.</p>
              <a href="mailto:support@civicai.gov.in?subject=Department%20Support" className="mt-4 inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700">
                <Headphones className="h-4 w-4" />
                Contact Support
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            {[
              ['24/7 Support', 'Our support team is always available to assist you.', Headphones, 'bg-blue-100 text-blue-700'],
              ['Quick Response', 'We ensure quick response and resolution.', Bolt, 'bg-blue-100 text-blue-700'],
              ['Transparent Process', 'Track and monitor your complaints in real-time.', ShieldCheck, 'bg-cyan-100 text-cyan-700'],
            ].map(([title, text, Icon, style]) => (
              <div key={title} className="flex items-center gap-4 lg:pl-8">
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${style}`}>
                  <Icon className="h-7 w-7" />
                </span>
                <span>
                  <b className="block text-sm">{title}</b>
                  <span className="mt-1 block text-xs leading-5 text-slate-600">{text}</span>
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

    </div>
  );
};

