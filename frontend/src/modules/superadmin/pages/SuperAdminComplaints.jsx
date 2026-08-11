import React, { useState, useMemo } from 'react';
import {
  FileText,
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertTriangle,
  User,
  MapPin,
  Sparkles,
  ArrowRight,
  TrendingUp,
  X
} from 'lucide-react';

const INITIAL_COMPLAINTS = [
  { id: 'CIV-2026-98124', citizen: 'Ramesh Kumar', category: 'Water Leakage', location: 'Station Road', municipality: 'Karwar', priority: 'High', aiSeverity: 'Critical', status: 'Pending', officer: 'Priya Sharma', date: '2 hrs ago' },
  { id: 'CIV-2026-98012', citizen: 'Suresh Patil', category: 'Road Potholes', location: 'Nehru Circle', municipality: 'Dharwad', priority: 'Medium', aiSeverity: 'High', status: 'In Progress', officer: 'Anita Desai', date: '4 hrs ago' },
  { id: 'CIV-2026-97992', citizen: 'Kavya Hegde', category: 'Garbage Dump', location: 'MG Road Area', municipality: 'Hubballi', priority: 'Low', aiSeverity: 'Medium', status: 'Resolved', officer: 'Suresh Patil', date: '1 day ago' },
  { id: 'CIV-2026-97810', citizen: 'Anil Shetty', category: 'Street Lights', location: 'Marina Road', municipality: 'Mangaluru', priority: 'Medium', aiSeverity: 'Low', status: 'Pending', officer: 'Unassigned', date: '2 days ago' },
  { id: 'CIV-2026-97745', citizen: 'Pooja Bhat', category: 'Traffic Jam', location: 'Town Hall Cross', municipality: 'Bengaluru', priority: 'High', aiSeverity: 'High', status: 'In Progress', officer: 'Rajesh Kumar', date: '2 days ago' },
];

const SuperAdminComplaints = () => {
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Re-assign officer state
  const [assignOfficerName, setAssignOfficerName] = useState('');

  const filteredComplaints = useMemo(() => {
    return complaints.filter(c => {
      const matchesSearch = 
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.citizen.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || c.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [complaints, searchQuery, statusFilter]);

  const handleReassign = (e) => {
    e.preventDefault();
    if (!assignOfficerName.trim() || !selectedComplaint) return;

    setComplaints(complaints.map(c => 
      c.id === selectedComplaint.id 
        ? { ...c, officer: assignOfficerName, status: c.status === 'Pending' ? 'In Progress' : c.status } 
        : c
    ));
    setSelectedComplaint(null);
    setAssignOfficerName('');
  };

  const handleResolve = (id) => {
    setComplaints(complaints.map(c => c.id === id ? { ...c, status: 'Resolved' } : c));
    setSelectedComplaint(null);
  };

  return (
    <div className="py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span>Home</span>
            <span>&gt;</span>
            <span>Super Admin</span>
            <span>&gt;</span>
            <span className="text-slate-650">Complaints</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5 flex items-center gap-2">
            <FileText className="text-amber-600" />
            Complaints Ledger
          </h1>
          <p className="text-slate-500 text-sm mt-1">Audit active civic grievances, re-assign task officers, and apply resolution states.</p>
        </div>
      </div>

      {/* Table block */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Controls */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Complaint ID, Citizen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 text-xs py-2.5 pl-10 pr-4 rounded-xl outline-none focus:border-amber-600 font-medium"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-slate-200 text-xs py-2.5 px-4 rounded-xl outline-none focus:border-amber-600 font-bold text-slate-650 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Complaints list */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider bg-slate-50/20">
                <th className="py-4 px-6">Complaint ID</th>
                <th className="py-4 px-4">Citizen</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Municipality</th>
                <th className="py-4 px-4">Assigned Officer</th>
                <th className="py-4 px-4 text-center">AI Severity</th>
                <th className="py-4 px-4 text-center">Priority</th>
                <th className="py-4 px-4">Submitted</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-6 text-center">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* ID */}
                    <td className="py-4 px-6 font-mono font-bold text-[#0b83ff]">{complaint.id}</td>

                    {/* Citizen */}
                    <td className="py-4 px-4 font-bold text-slate-800">{complaint.citizen}</td>

                    {/* Category */}
                    <td className="py-4 px-4 text-slate-600">{complaint.category}</td>

                    {/* Municipality */}
                    <td className="py-4 px-4 text-slate-650 font-bold">{complaint.municipality}</td>

                    {/* Officer */}
                    <td className="py-4 px-4 text-slate-800">
                      <span className="inline-flex items-center gap-1.5">
                        <User size={12} className="text-slate-400" />
                        {complaint.officer}
                      </span>
                    </td>

                    {/* AI Severity */}
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-black border ${
                        complaint.aiSeverity === 'Critical' 
                          ? 'bg-rose-50 border-rose-100 text-rose-700' 
                          : 'bg-orange-50 border-orange-100 text-orange-700'
                      }`}>
                        {complaint.aiSeverity}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-black ${
                        complaint.priority === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {complaint.priority}
                      </span>
                    </td>

                    {/* Submitted */}
                    <td className="py-4 px-4 text-slate-400 font-bold">{complaint.date}</td>

                    {/* Status */}
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                        complaint.status === 'Resolved' 
                          ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                          : complaint.status === 'In Progress' 
                          ? 'bg-blue-50 border-blue-100 text-blue-700' 
                          : 'bg-amber-50 border-amber-100 text-amber-700'
                      }`}>
                        {complaint.status}
                      </span>
                    </td>

                    {/* Inspect */}
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => setSelectedComplaint(complaint)}
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-650 hover:underline"
                      >
                        Details <ArrowRight size={10} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400 font-bold">
                    No complaints found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details / Reassign Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-slate-105">
              <h3 className="font-extrabold text-base text-slate-800">
                Grievance Audit - {selectedComplaint.id}
              </h3>
              <button onClick={() => setSelectedComplaint(null)} className="text-slate-400 hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-semibold text-slate-650">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Citizen Name</span>
                  <span className="block text-slate-900 font-extrabold mt-0.5">{selectedComplaint.citizen}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Category Type</span>
                  <span className="block text-slate-900 font-extrabold mt-0.5">{selectedComplaint.category}</span>
                </div>
              </div>

              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Address Location</span>
                <span className="block text-slate-800 mt-0.5 flex items-center gap-1">
                  <MapPin size={12} className="text-rose-600" />
                  {selectedComplaint.location}, {selectedComplaint.municipality}
                </span>
              </div>

              {/* AI Suggestion box */}
              <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl flex gap-2">
                <Sparkles className="w-5 h-5 text-purple-650 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-purple-800 text-xs">AI Routing Classifier</p>
                  <p className="text-[10px] text-purple-700 mt-1 leading-relaxed">
                    Severity level is matching {selectedComplaint.aiSeverity}. Suggested to allocate immediately to {selectedComplaint.municipality} Municipal Officer.
                  </p>
                </div>
              </div>

              {/* Action Form: Reassign */}
              <form onSubmit={handleReassign} className="border-t border-slate-100 pt-4 space-y-3">
                <p className="font-bold text-slate-800 uppercase text-[10px]">Reassign Support Officer</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={assignOfficerName}
                    onChange={(e) => setAssignOfficerName(e.target.value)}
                    placeholder="e.g. Officer Anita Desai"
                    className="flex-1 bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl outline-none focus:border-blue-600 font-semibold"
                  />
                  <button type="submit" className="bg-[#0b83ff] hover:bg-[#0070e0] text-white font-bold px-4 py-2 rounded-xl">Assign</button>
                </div>
              </form>

              {/* Quick Actions Footer */}
              <div className="flex gap-2 justify-end border-t border-slate-100 pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setSelectedComplaint(null)}
                  className="py-2.5 px-4 border border-slate-200 text-slate-650 bg-white hover:bg-slate-50 rounded-xl font-bold"
                >
                  Close
                </button>
                {selectedComplaint.status !== 'Resolved' && (
                  <button
                    type="button"
                    onClick={() => handleResolve(selectedComplaint.id)}
                    className="py-2.5 px-5 bg-emerald-650 hover:bg-emerald-700 text-white rounded-xl font-bold"
                  >
                    Mark Resolved
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SuperAdminComplaints;
