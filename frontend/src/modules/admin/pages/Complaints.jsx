import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Plus, ArrowUpRight, RefreshCcw, Search } from 'lucide-react';
import ComplaintTable from '../components/ComplaintTable';

const summaryCards = [
  { label: 'Total Complaints', value: '12,842', detail: 'All time', color: 'from-sky-50 to-sky-100', icon: ArrowUpRight },
  { label: 'Resolved', value: '8,642', detail: '72% resolved', color: 'from-emerald-50 to-emerald-100', icon: ArrowUpRight },
  { label: 'Pending', value: '3,256', detail: '24% pending', color: 'from-amber-50 to-amber-100', icon: ArrowUpRight },
  { label: 'In Progress', value: '944', detail: '7% in progress', color: 'from-violet-50 to-violet-100', icon: ArrowUpRight },
  { label: 'Overdue', value: '184', detail: '1.4% overdue', color: 'from-red-50 to-red-100', icon: ArrowUpRight },
];

const Complaints = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-[1280px] py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">Admin Dashboard</span>
            <span className="text-xs uppercase tracking-[0.24em] text-slate-400">Complaints Console</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">All Complaints</h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              Monitor complaints across departments with live status, priority, officer assignments, SLA tracking, and export-ready reporting.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/complaints')}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <RefreshCcw size={16} /> Refresh
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Plus size={16} /> New Complaint
          </button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-5">
        {summaryCards.map((card) => (
          <div key={card.label} className={`rounded-[20px] border border-slate-200 bg-gradient-to-br ${card.color} p-5 shadow-sm`}> 
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-600">{card.label}</p>
                <p className="mt-3 text-3xl font-bold text-slate-950">{card.value}</p>
              </div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 text-slate-900 shadow-sm">
                <card.icon size={20} />
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">{card.detail}</p>
          </div>
        ))}
      </div>

      <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Live Complaint Feed</p>
            <h2 className="text-2xl font-bold text-slate-950">View, filter, and act on complaints instantly</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full max-w-[280px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by complaint ID, officer, or location"
                className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Download size={16} /> Export report
            </button>
          </div>
        </div>

        <div className="mt-8">
          <ComplaintTable onComplaintClick={(complaint) => console.log('View complaint', complaint.id)} />
        </div>
      </section>
    </div>
  );
};

export default Complaints;
