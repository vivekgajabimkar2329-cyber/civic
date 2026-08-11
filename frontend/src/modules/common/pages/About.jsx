import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bell,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Cpu,
  Droplets,
  Eye,
  FileText,
  Globe2,
  Headphones,
  HeartHandshake,
  Home,
  Landmark,
  Leaf,
  Lock,
  Map,
  MapPin,
  PenLine,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react';

const features = [
  { title: 'Smart Reporting', icon: ClipboardCheck },
  { title: 'Real-time Tracking', icon: Bell },
  { title: 'AI-Powered Classification', icon: BrainCircuit },
  { title: 'Transparent & Accountable', icon: ShieldCheck },
];

const whyItems = [
  { title: 'AI-Powered Intelligence', text: 'Our AI engine automatically categorizes issues and routes them to the right department for faster action.', icon: Cpu, color: 'text-emerald-700 bg-emerald-50' },
  { title: 'Transparency & Accountability', text: 'Track the status of your complaint in real time with full transparency at every step.', icon: ShieldCheck, color: 'text-blue-700 bg-blue-50' },
  { title: 'Quick Resolution', text: 'Intelligent workflows ensure quick response and effective resolution of civic issues.', icon: Zap, color: 'text-violet-700 bg-violet-50' },
  { title: 'Citizen Empowerment', text: 'Every citizen can contribute to building a better and smarter community.', icon: Users, color: 'text-orange-700 bg-orange-50' },
  { title: 'Multilingual Support', text: 'Available in multiple languages to ensure inclusivity for all citizens.', icon: Globe2, color: 'text-teal-700 bg-teal-50' },
  { title: 'Secure & Reliable', text: 'Your data is safe with enterprise-grade security and privacy standards.', icon: Lock, color: 'text-green-700 bg-green-50' },
];

const numbers = [
  { value: '25K+', label: 'Issues Reported', text: 'By citizens across the city', icon: ClipboardCheck, color: 'text-emerald-700' },
  { value: '18K+', label: 'Issues Resolved', text: 'Resolved successfully by departments', icon: CheckCircle2, color: 'text-blue-700' },
  { value: '50+', label: 'Departments', text: 'Working together for better governance', icon: Users, color: 'text-purple-700' },
  { value: '100K+', label: 'Happy Citizens', text: 'Building a better tomorrow', icon: Sparkles, color: 'text-orange-600' },
];

const activeAcross = [
  { title: 'Hyderabad', text: 'Telangana', icon: Landmark },
  { title: 'Multiple', text: 'Zones', icon: Map },
  { title: '24/7', text: 'Support', icon: Headphones },
];

const steps = [
  { title: 'Report', text: 'Citizen reports an issue with images, location and details.', icon: PenLine },
  { title: 'AI Analysis', text: 'Our AI engine analyses and classifies the issue automatically.', icon: Cpu },
  { title: 'Assigned', text: 'Issue is assigned to the right department for action.', icon: Landmark },
  { title: 'Action Taken', text: 'Department takes action and updates progress.', icon: Bell },
  { title: 'Resolved', text: 'Citizen is notified and issue is resolved successfully.', icon: ClipboardCheck },
];

const techItems = [
  'AI & Machine Learning for smart classification',
  'Real-time data processing and analytics',
  'Secure cloud infrastructure',
  'GIS mapping and location intelligence',
  'Scalable and reliable architecture',
];

const values = [
  { title: 'Integrity', text: 'We operate with honesty and transparency.', icon: ShieldCheck, color: 'text-blue-700 bg-blue-50' },
  { title: 'Accountability', text: 'We take responsibility and deliver results.', icon: Users, color: 'text-orange-700 bg-orange-50' },
  { title: 'Innovation', text: 'We embrace technology to drive change.', icon: Sparkles, color: 'text-emerald-700 bg-emerald-50' },
  { title: 'Collaboration', text: 'We work together for a better city.', icon: HeartHandshake, color: 'text-violet-700 bg-violet-50' },
  { title: 'Inclusivity', text: 'We ensure every citizen has an equal voice.', icon: Globe2, color: 'text-cyan-700 bg-cyan-50' },
];

const departments = [
  { title: 'Municipal Corporation', icon: Building2, color: 'text-indigo-700 bg-indigo-50' },
  { title: 'Water Supply Board', icon: Droplets, color: 'text-sky-700 bg-sky-50' },
  { title: 'Sanitation Department', icon: ClipboardCheck, color: 'text-blue-700 bg-blue-50' },
  { title: 'Roads & Building Department', icon: Landmark, color: 'text-cyan-700 bg-cyan-50' },
  { title: 'Electrical Department', icon: Zap, color: 'text-violet-700 bg-violet-50' },
  { title: 'Parks & Horticulture Department', icon: Leaf, color: 'text-emerald-700 bg-emerald-50' },
];

const MiniCard = ({ icon: Icon, title, className = '' }) => (
  <div className={`rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-lg shadow-slate-200/70 ${className}`}>
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
        <Icon className="h-5 w-5" />
      </div>
      <p className="max-w-[150px] text-sm font-extrabold leading-snug text-slate-900">{title}</p>
    </div>
  </div>
);

export const About = () => {
  return (
    <div className="bg-white text-slate-950">
      <section className="bg-gradient-to-b from-sky-50/80 via-white to-white">
        <div className="mx-auto max-w-[1400px] px-4 pb-8 pt-8 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-2 text-sm font-semibold text-slate-600">
            <Link to="/home" className="hover:text-teal-700">Home</Link>
            <span>/</span>
            <span className="text-teal-800">About Us</span>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h1 className="text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
                About <span className="text-emerald-800">Civic AI</span>
              </h1>
              <p className="mt-5 text-2xl font-extrabold text-emerald-800">
                Empowering Citizens. Building Better Cities.
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                Civic AI is an intelligent civic engagement platform that leverages Artificial Intelligence
                to simplify the way citizens report issues, track complaints, and get things resolved.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
                {features.map(({ title, icon: Icon }) => (
                  <div key={title} className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="mt-3 text-xs font-extrabold leading-tight text-slate-900">{title}</p>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link to="/report" className="rounded-lg bg-emerald-800 px-7 py-3 text-sm font-extrabold text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-900">
                  Report an Issue
                </Link>
                <Link to="/services" className="rounded-lg border border-emerald-700 px-7 py-3 text-sm font-extrabold text-emerald-800 transition hover:bg-emerald-50">
                  Explore Services
                </Link>
              </div>
            </div>

            <div className="relative min-h-[430px] overflow-hidden rounded-[2rem] border border-emerald-100 bg-[radial-gradient(circle_at_50%_35%,#ffffff_0,#e8f7ff_42%,#f8fbff_72%)] shadow-2xl shadow-slate-200/70">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/62/Charminar%2C_Hyderabad%2C_India.jpg"
                alt="Charminar monument in Hyderabad, Telangana"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-900/20 to-white/10" />
              <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-2 shadow-md backdrop-blur">
                <p className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-800">Heritage of Hyderabad</p>
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/60 bg-white/80 p-4 shadow-lg backdrop-blur">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-emerald-700 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-white">Charminar</span>
                  <span className="text-sm font-semibold text-slate-700">Historic landmark • Hyderabad • Telangana</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-700">A proud symbol of the city reflected in our civic experience and public services.</p>
              </div>
              <MiniCard icon={BrainCircuit} title="AI Powered Issue Classification" className="absolute left-4 top-10 sm:left-12" />
              <MiniCard icon={ClipboardCheck} title="Smart Issue Reporting" className="absolute right-4 top-10 sm:right-8" />
              <MiniCard icon={Bell} title="Real-time Updates" className="absolute left-3 top-40 sm:left-6" />
              <MiniCard icon={MapPin} title="Track & Monitor Complaints" className="absolute right-3 top-44 sm:right-2" />
              <MiniCard icon={ShieldCheck} title="Transparency & Accountability" className="absolute bottom-24 right-4 sm:right-10" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-7 px-4 py-6 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-8 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-[140px_1fr]">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Target className="h-20 w-20" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-emerald-800">Our Mission</h2>
              <div className="mt-3 h-1 w-14 bg-emerald-700" />
              <p className="mt-6 text-lg leading-8 text-slate-800">
                To empower citizens by providing an easy, transparent, and intelligent platform for reporting
                civic issues and improving the quality of urban life through technology and accountability.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-[140px_1fr]">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              <Eye className="h-20 w-20" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-blue-800">Our Vision</h2>
              <div className="mt-3 h-1 w-14 bg-blue-700" />
              <p className="mt-6 text-lg leading-8 text-slate-800">
                To build smarter cities where every citizen has a voice, every issue is heard, and every
                problem is resolved for a cleaner, safer, and better tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-3 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-center text-2xl font-black">Why Civic AI?</h2>
          <div className="mx-auto mt-2 h-1 w-12 bg-emerald-700" />
          <div className="mt-8 grid gap-5 md:grid-cols-3 xl:grid-cols-6">
            {whyItems.map(({ title, text, icon: Icon, color }) => (
              <div key={title} className="border-slate-200 px-4 text-center xl:border-r xl:last:border-r-0">
                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${color}`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mt-5 text-sm font-black leading-tight">{title}</h3>
                <p className="mt-4 text-xs font-medium leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-6 px-4 py-4 sm:px-6 lg:grid-cols-[1.2fr_0.9fr] lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-center text-xl font-black">Civic AI in Numbers</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {numbers.map(({ value, label, text, icon: Icon, color }) => (
              <div key={label} className="border-slate-200 text-center lg:border-r lg:last:border-r-0">
                <Icon className={`mx-auto h-10 w-10 ${color}`} />
                <p className={`mt-3 text-3xl font-black ${color}`}>{value}</p>
                <h3 className="mt-1 text-sm font-black">{label}</h3>
                <p className="mx-auto mt-2 max-w-[150px] text-xs leading-5 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-center text-xl font-black">Active Across</h2>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {activeAcross.map(({ title, text, icon: Icon }) => (
              <div key={title} className="border-slate-200 text-center md:border-r md:last:border-r-0">
                <Icon className="mx-auto h-12 w-12 text-emerald-700" />
                <h3 className="mt-3 text-sm font-black">{title}</h3>
                <p className="text-sm font-semibold text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-black">How Civic AI Works?</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-5">
          {steps.map(({ title, text, icon: Icon }, index) => (
            <div key={title} className="relative text-center">
              {index < steps.length - 1 && <ArrowRight className="absolute right-[-22px] top-10 hidden h-7 w-7 text-slate-300 md:block" />}
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-emerald-700 bg-emerald-50 text-emerald-800">
                <Icon className="h-11 w-11" />
              </div>
              <h3 className="mt-4 text-base font-black">{index + 1}. {title}</h3>
              <p className="mx-auto mt-2 max-w-[190px] text-xs font-medium leading-5 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-7 px-4 py-5 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-black">Powered by Advanced Technology</h2>
          <div className="mt-6 grid gap-7 md:grid-cols-[1fr_220px]">
            <ul className="space-y-3">
              {techItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex min-h-48 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-50 to-white">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-[2rem] bg-gradient-to-br from-blue-600 to-emerald-600 text-4xl font-black text-white shadow-2xl shadow-blue-900/20">
                AI
                <div className="absolute -left-8 -top-5 h-12 w-12 rounded-xl bg-white shadow-lg" />
                <div className="absolute -bottom-6 -right-8 h-14 w-14 rounded-xl bg-white shadow-lg" />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-black">Our Core Values</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {values.map(({ title, text, icon: Icon, color }) => (
              <div key={title} className="flex items-start gap-4">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-black">{title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-7 px-4 py-5 sm:px-6 lg:grid-cols-[0.8fr_1.4fr] lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-black">Trusted by Citizens, Backed by Government</h2>
          <p className="mt-5 text-sm font-medium leading-7 text-slate-700">
            Civic AI is a collaborative initiative with Government departments to ensure a smarter
            and more accountable governance system.
          </p>
          <Landmark className="mt-8 h-20 w-20 text-slate-200" />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-black">Our Partner Departments</h2>
          <div className="mt-7 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {departments.map(({ title, icon: Icon, color }) => (
              <Link to="/departments" key={title} className="text-center">
                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${color}`}>
                  <Icon className="h-8 w-8" />
                </div>
                <p className="mt-3 text-xs font-black leading-tight text-slate-900">{title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-700 text-white shadow-xl shadow-emerald-900/15">
          <div className="grid items-center gap-6 px-7 py-8 md:grid-cols-[190px_1fr_auto]">
            <div className="hidden h-32 items-center justify-center rounded-2xl bg-white/10 md:flex">
              <MapPin className="h-20 w-20 text-emerald-100" />
            </div>
            <div>
              <h2 className="text-3xl font-black">Be a part of the change.</h2>
              <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-emerald-50">
                Report issues, track progress, and help us build a smarter, cleaner, and better city for everyone.
              </p>
            </div>
            <Link to="/report" className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-7 py-4 text-sm font-black text-slate-950 transition hover:bg-emerald-50">
              Report an Issue <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
