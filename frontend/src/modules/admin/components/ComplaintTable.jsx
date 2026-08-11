import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, ArrowUpDown, Download, ChevronLeft, ChevronRight,
  Eye, CheckCircle, XCircle, UserCheck, MoreHorizontal,
} from 'lucide-react';

const initialComplaints = [
  { id: 'C-1245', citizen: 'Rahul Sharma', category: 'Roads & Infrastructure', priority: 'High', status: 'Pending', officer: 'Mark Davis', date: 'May 20, 2025', due: 'May 27, 2025' },
  { id: 'C-1246', citizen: 'Priya Patel', category: 'Water Supply', priority: 'Medium', status: 'In Progress', officer: 'Emily Clark', date: 'May 19, 2025', due: 'May 25, 2025' },
  { id: 'C-1247', citizen: 'Amit Singh', category: 'Sanitation', priority: 'Low', status: 'Resolved', officer: 'David Lee', date: 'May 18, 2025', due: 'May 22, 2025' },
  { id: 'C-1248', citizen: 'Sneha Reddy', category: 'Electricity', priority: 'Medium', status: 'Pending', officer: 'Susan Hall', date: 'May 20, 2025', due: 'May 26, 2025' },
  { id: 'C-1249', citizen: 'Vikram Joshi', category: 'Traffic', priority: 'Low', status: 'Resolved', officer: 'Robert Chen', date: 'May 15, 2025', due: 'May 19, 2025' },
  { id: 'C-1250', citizen: 'Ananya Gupta', category: 'Roads & Infrastructure', priority: 'High', status: 'In Progress', officer: 'Mark Davis', date: 'May 21, 2025', due: 'May 28, 2025' },
  { id: 'C-1251', citizen: 'Arjun Nair', category: 'Water Supply', priority: 'Critical', status: 'Pending', officer: 'Unassigned', date: 'May 22, 2025', due: 'May 24, 2025' },
  { id: 'C-1252', citizen: 'Divya Kaur', category: 'Sanitation', priority: 'Medium', status: 'Pending', officer: 'Unassigned', date: 'May 21, 2025', due: 'May 26, 2025' },
];

const priorityColors = {
  Critical: 'bg-red-50 text-red-600 border-red-200',
  High: 'bg-orange-50 text-orange-600 border-orange-200',
  Medium: 'bg-blue-50 text-blue-600 border-blue-200',
  Low: 'bg-gray-50 text-gray-600 border-gray-200',
};

const statusColors = {
  Pending: 'bg-amber-50 text-amber-600 border-amber-200',
  'In Progress': 'bg-blue-50 text-blue-600 border-blue-200',
  Resolved: 'bg-emerald-50 text-emerald-600 border-emerald-200',
};

const ComplaintTable = ({ onComplaintClick, onAssignOfficer }) => {
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const perPage = 5;

  const filtered = useMemo(() => {
    let data = [...initialComplaints];

    if (search) {
      const q = search.toLowerCase();
      data = data.filter(c =>
        c.id.toLowerCase().includes(q) ||
        c.citizen.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.officer.toLowerCase().includes(q)
      );
    }
    if (filterPriority !== 'all') data = data.filter(c => c.priority === filterPriority);
    if (filterStatus !== 'all') data = data.filter(c => c.status === filterStatus);

    data.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'date') cmp = new Date(a.date) - new Date(b.date);
      else if (sortField === 'priority') {
        const order = { Critical: 0, High: 1, Medium: 2, Low: 3 };
        cmp = order[a.priority] - order[b.priority];
      } else cmp = a[sortField]?.localeCompare(b[sortField]);
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return data;
  }, [search, filterPriority, filterStatus, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleSort = (field) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginated.length) setSelectedIds([]);
    else setSelectedIds(paginated.map(c => c.id));
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const exportCSV = () => {
    const headers = ['ID,Citizen,Category,Priority,Status,Officer,Date,Due'];
    const rows = filtered.map(c => `${c.id},"${c.citizen}","${c.category}",${c.priority},${c.status},"${c.officer}",${c.date},${c.due}`);
    const csv = [...headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'complaints.csv';
    a.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden"
    >
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-text-primary">Complaints Overview</h3>
            <p className="text-xs text-text-secondary mt-0.5">{filtered.length} complaints found</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-text-secondary bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
              <Download size={14} /> Export CSV
            </button>
            {selectedIds.length > 0 && (
              <button onClick={() => onAssignOfficer?.(selectedIds)} className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-civic-600 rounded-lg hover:bg-civic-700 transition-colors">
                <UserCheck size={14} /> Assign ({selectedIds.length})
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search complaints..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-civic-500/20 focus:border-civic-500"
            />
          </div>
          <select
            value={filterPriority}
            onChange={(e) => { setFilterPriority(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs text-text-secondary focus:outline-none focus:ring-2 focus:ring-civic-500/20"
          >
            <option value="all">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs text-text-secondary focus:outline-none focus:ring-2 focus:ring-civic-500/20"
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedIds.length === paginated.length && paginated.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-civic-600 focus:ring-civic-500"
                />
              </th>
              <th className="p-4 text-left font-medium text-text-secondary text-xs cursor-pointer" onClick={() => toggleSort('id')}>
                <div className="flex items-center gap-1">ID <ArrowUpDown size={12} /></div>
              </th>
              <th className="p-4 text-left font-medium text-text-secondary text-xs cursor-pointer" onClick={() => toggleSort('citizen')}>
                <div className="flex items-center gap-1">Citizen <ArrowUpDown size={12} /></div>
              </th>
              <th className="p-4 text-left font-medium text-text-secondary text-xs">Category</th>
              <th className="p-4 text-left font-medium text-text-secondary text-xs cursor-pointer" onClick={() => toggleSort('priority')}>
                <div className="flex items-center gap-1">Priority <ArrowUpDown size={12} /></div>
              </th>
              <th className="p-4 text-left font-medium text-text-secondary text-xs">Status</th>
              <th className="p-4 text-left font-medium text-text-secondary text-xs">Officer</th>
              <th className="p-4 text-left font-medium text-text-secondary text-xs cursor-pointer" onClick={() => toggleSort('date')}>
                <div className="flex items-center gap-1">Date <ArrowUpDown size={12} /></div>
              </th>
              <th className="p-4 text-left font-medium text-text-secondary text-xs">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <AnimatePresence>
              {paginated.map((c, i) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                  onClick={() => onComplaintClick?.(c)}
                >
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(c.id)}
                      onChange={() => toggleSelect(c.id)}
                      className="w-4 h-4 rounded border-gray-300 text-civic-600 focus:ring-civic-500"
                    />
                  </td>
                  <td className="p-4 font-semibold text-text-primary text-xs">{c.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <img src={`https://ui-avatars.com/api/?name=${c.citizen.replace(' ', '+')}&background=2563eb&color=fff&size=24`} alt="" className="w-6 h-6 rounded-full" />
                      <span className="text-text-primary font-medium text-xs">{c.citizen}</span>
                    </div>
                  </td>
                  <td className="p-4 text-text-secondary text-xs">{c.category}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-md border ${priorityColors[c.priority] || priorityColors.Low}`}>
                      {c.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-md border ${statusColors[c.status] || statusColors.Pending}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-text-secondary text-xs">{c.officer}</td>
                  <td className="p-4 text-text-secondary text-xs">{c.date}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => onComplaintClick?.(c)} className="p-1.5 rounded-lg hover:bg-gray-100 text-text-secondary transition-colors" title="View">
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-text-secondary transition-colors" title="More">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-xs text-text-secondary">
          Showing {(page - 1) * perPage + 1}-{Math.min(page * perPage, filtered.length)} of {filtered.length}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-text-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                page === i + 1 ? 'bg-civic-600 text-white' : 'text-text-secondary hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-text-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ComplaintTable;

