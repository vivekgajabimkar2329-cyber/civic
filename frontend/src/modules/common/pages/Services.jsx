import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bell,
  Building2,
  Bus,
  CheckCircle2,
  CircleDollarSign,
  Droplets,
  GraduationCap,
  Headphones,
  HeartPulse,
  Leaf,
  MessageCircle,
  Search,
  Shield,
  ShieldCheck,
  Siren,
  Sprout,
  Trash2,
  UserRoundCheck,
  Wrench,
} from 'lucide-react';

const services = [
  {
    title: 'Birth & Death Certificate',
    description: 'Apply, track and download birth and death certificates with guided document checks.',
    icon: UserRoundCheck,
    tint: 'from-emerald-100 to-lime-50',
    iconStyle: 'bg-emerald-100 text-emerald-700',
  },
  {
    title: 'Property Tax Services',
    description: 'View dues, pay securely, download receipts and manage property tax records online.',
    icon: CircleDollarSign,
    tint: 'from-sky-100 to-blue-50',
    iconStyle: 'bg-sky-100 text-sky-700',
  },
  {
    title: 'Building Permits',
    description: 'Submit permit requests, upload drawings and follow approval status in real time.',
    icon: Building2,
    tint: 'from-violet-100 to-indigo-50',
    iconStyle: 'bg-violet-100 text-violet-700',
  },
  {
    title: 'Solid Waste Management',
    description: 'Request pickup, report missed collection and monitor sanitation service updates.',
    icon: Trash2,
    tint: 'from-amber-100 to-yellow-50',
    iconStyle: 'bg-amber-100 text-amber-700',
  },
  {
    title: 'Water & Sanitation',
    description: 'Report leaks, manage water connection requests and raise sanitation complaints.',
    icon: Droplets,
    tint: 'from-cyan-100 to-teal-50',
    iconStyle: 'bg-cyan-100 text-cyan-700',
  },
  {
    title: 'Traffic & Transport',
    description: 'Report road safety concerns, damaged signals, congestion and public transport issues.',
    icon: Bus,
    tint: 'from-rose-100 to-orange-50',
    iconStyle: 'bg-rose-100 text-rose-700',
  },
  {
    title: 'Public Safety',
    description: 'Send incident reports, emergency alerts and safety requests to the right team.',
    icon: Shield,
    tint: 'from-blue-100 to-sky-50',
    iconStyle: 'bg-blue-100 text-blue-700',
  },
  {
    title: 'Environment Services',
    description: 'Report pollution, tree plantation needs, park issues and environmental initiatives.',
    icon: Leaf,
    tint: 'from-green-100 to-emerald-50',
    iconStyle: 'bg-green-100 text-green-700',
  },
];

const departments = [
  { name: 'Health Department', icon: HeartPulse, style: 'bg-green-100 text-green-700' },
  { name: 'Education Department', icon: GraduationCap, style: 'bg-fuchsia-100 text-fuchsia-700' },
  { name: 'Municipal Corporation', icon: Building2, style: 'bg-sky-100 text-sky-700' },
  { name: 'Finance Department', icon: CircleDollarSign, style: 'bg-emerald-100 text-emerald-700' },
  { name: 'Planning & Development', icon: Building2, style: 'bg-indigo-100 text-indigo-700' },
  { name: 'Public Works Department', icon: Wrench, style: 'bg-cyan-100 text-cyan-700' },
  { name: 'Social Welfare Department', icon: UserRoundCheck, style: 'bg-pink-100 text-pink-700' },
  { name: 'Transport Department', icon: Bus, style: 'bg-blue-100 text-blue-700' },
  { name: 'Environment Department', icon: Leaf, style: 'bg-green-100 text-green-700' },
  { name: 'Fire & Emergency Services', icon: Siren, style: 'bg-orange-100 text-orange-700' },
];

const quickActions = [
  { label: 'Track Request', icon: CheckCircle2, to: '/track' },
  { label: 'Notifications', icon: Bell, to: '/citizen/notifications' },
  { label: 'Live Chat', icon: Headphones, to: 'mailto:support@civicai.gov.in?subject=Civic%20AI%20Service%20Support' },
];

export const Services = () => {
  const [query, setQuery] = useState('');

  const filteredServices = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return services;
    return services.filter((service) =>
      `${service.title} ${service.description}`.toLowerCase().includes(normalized)
    );
  }, [query]);

  return (
    <div className="bg-[#f5faff] text-slate-900">
      <section className="relative overflow-hidden rounded-b-[28px] bg-[#020b1a] text-white">
        <div className="absolute inset-0 opacity-80">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_38%,rgba(14,165,233,0.34),transparent_28%),linear-gradient(120deg,#020817_0%,#041327_48%,#001329_100%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-[linear-gradient(to_top,rgba(8,47,73,0.84),transparent)]" />
          <div className="absolute bottom-0 left-[8%] h-32 w-10 bg-cyan-500/15 shadow-[80px_-24px_0_rgba(14,165,233,0.12),160px_12px_0_rgba(14,165,233,0.18),260px_-42px_0_rgba(14,165,233,0.12),370px_2px_0_rgba(14,165,233,0.16),500px_-28px_0_rgba(14,165,233,0.13),650px_18px_0_rgba(14,165,233,0.16),820px_-18px_0_rgba(14,165,233,0.12)]" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-4 pb-20 pt-12 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
                <span className="block bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Civic AI Services</span>
                <span className="mt-3 block text-3xl text-white sm:text-4xl">Empowering Citizens. Building a Smarter Tomorrow.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-100">
                Civic AI brings government services closer to you through intelligent technology, digital access and real-time solutions for a better, more connected city.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                {[
                  ['Smarter Services', ShieldCheck],
                  ['Stronger Communities', UserRoundCheck],
                  ['Sustainable Future', Sprout],
                ].map(([label, Icon]) => (
                  <div key={label} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/8 px-4 py-3 text-xs font-semibold backdrop-blur">
                    <Icon className="h-5 w-5 text-emerald-300" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[320px] rounded-[28px] border border-cyan-300/30 bg-cyan-300/10 p-6 shadow-2xl shadow-cyan-950/50 backdrop-blur">
              <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_78%_20%,rgba(34,211,238,0.4),transparent_12%),radial-gradient(circle_at_18%_34%,rgba(59,130,246,0.32),transparent_14%)]" />
              <div className="relative flex h-full min-h-[270px] items-end justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#03162f]">
                <div className="absolute bottom-0 h-32 w-full bg-[linear-gradient(90deg,rgba(14,165,233,0.15)_0_10%,transparent_10%_16%,rgba(6,182,212,0.18)_16%_27%,transparent_27%_35%,rgba(59,130,246,0.18)_35%_47%,transparent_47%_55%,rgba(34,211,238,0.16)_55%_68%,transparent_68%_75%,rgba(14,165,233,0.18)_75%_88%,transparent_88%)]" />
                <div className="relative mb-20 rounded-2xl border border-cyan-300/70 bg-slate-950/55 px-12 py-8 text-center shadow-[0_0_32px_rgba(34,211,238,0.38)]">
                  <p className="text-2xl font-bold">Civic AI</p>
                  <p className="mt-4 text-lg text-cyan-100">For a Better<br />Tomorrow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-8 max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xl shadow-blue-950/10 md:grid-cols-[1fr_auto]">
          <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3">
            <Search className="h-5 w-5 text-slate-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search services..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </label>
          <div className="grid grid-cols-1 divide-y divide-slate-100 text-sm font-semibold text-slate-700 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {quickActions.map((action) => {
              const content = (
                <>
                  <action.icon className="h-5 w-5 text-blue-700" />
                  {action.label}
                </>
              );
              return action.to.startsWith('mailto:') ? (
                <a key={action.label} href={action.to} className="flex items-center justify-center gap-2 px-5 py-3 hover:text-blue-700">
                  {content}
                </a>
              ) : (
                <Link key={action.label} to={action.to} className="flex items-center justify-center gap-2 px-5 py-3 hover:text-blue-700">
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Our Services</h2>
          <p className="mt-2 text-sm text-slate-600">Everything you need. All in one place.</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className={`rounded-xl border border-white bg-gradient-to-br ${service.tint} p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}>
                <div className="flex items-start gap-4">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${service.iconStyle}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold leading-snug">{service.title}</h3>
                    <p className="mt-3 min-h-[64px] text-xs leading-5 text-slate-700">{service.description}</p>
                    <Link to={`/report?service=${encodeURIComponent(service.title)}`} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-slate-800 hover:text-blue-700">
                      <ArrowRight className="h-4 w-4" />
                      Explore
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600">
            No matching services found. Try searching for tax, water, permit or safety.
          </div>
        )}
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-10 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Departments</h2>
          <p className="mt-2 text-sm text-slate-600">Dedicated teams for a better city</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {departments.map((department) => {
            const Icon = department.icon;
            return (
              <Link key={department.name} to="/departments" className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md">
                <span className={`flex h-14 w-14 items-center justify-center rounded-full ${department.style}`}>
                  <Icon className="h-7 w-7" />
                </span>
                <span className="text-sm font-bold leading-snug">{department.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-[#020b1a] p-6 text-white shadow-lg md:p-8">
          <h2 className="text-center text-lg font-bold">How It Works</h2>
          <div className="mt-7 grid gap-6 md:grid-cols-4">
            {[
              ['1', 'Choose Service', 'Select the service you need'],
              ['2', 'Fill Details', 'Provide required information'],
              ['3', 'Track & Update', 'Track your request in real time'],
              ['4', 'Get Results', 'Receive updates and complete service'],
            ].map(([number, title, text]) => (
              <div key={number} className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-cyan-400/50 bg-cyan-400/10 text-2xl font-bold text-lime-300">
                  {number}
                </div>
                <div>
                  <h3 className="text-sm font-bold">{title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-300">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-4">
          {[
            ['Fast & Convenient', 'Save time with digital services', CheckCircle2, 'bg-blue-100 text-blue-700'],
            ['Transparent & Reliable', 'Real-time tracking and updates', ShieldCheck, 'bg-cyan-100 text-cyan-700'],
            ['Secure & Private', 'Your data is safe with advanced security', Shield, 'bg-indigo-100 text-indigo-700'],
            ['For a Better Tomorrow', 'Building smarter cities together', Leaf, 'bg-green-100 text-green-700'],
          ].map(([title, text, Icon, style]) => (
            <div key={title} className="flex items-center gap-4">
              <span className={`flex h-14 w-14 items-center justify-center rounded-xl ${style}`}>
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

      <Link
        to="/report"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-700/30 transition hover:bg-blue-700"
      >
        <MessageCircle className="h-5 w-5" />
        Report Issue
      </Link>
    </div>
  );
};
