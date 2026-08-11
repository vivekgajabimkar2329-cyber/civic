import React, { useState } from 'react';
import {
  Building2,
  Users,
  CheckCircle2,
  Clock,
  Coins,
  Plus,
  X,
  Edit2,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const INITIAL_DEPARTMENTS = [
  { id: 1, name: 'Public Works', head: 'Dr. Sunita Sharma', officers: 14, open: 342, resolved: 1284, sla: 92, budget: '₹18.4 Cr', status: 'Operational' },
  { id: 2, name: 'Water Supply', head: 'Priya Sharma', officers: 9, open: 216, resolved: 943, sla: 88, budget: '₹11.2 Cr', status: 'SLA Warning' },
  { id: 3, name: 'Waste Management', head: 'Suresh Patil', officers: 18, open: 184, resolved: 1102, sla: 95, budget: '₹9.7 Cr', status: 'Operational' },
  { id: 4, name: 'Traffic Control', head: 'Rajesh Kumar', officers: 11, open: 139, resolved: 761, sla: 91, budget: '₹14.1 Cr', status: 'Operational' },
  { id: 5, name: 'Electricity', head: 'Vikram Singh', officers: 8, open: 98, resolved: 610, sla: 90, budget: '₹8.5 Cr', status: 'Operational' },
  { id: 6, name: 'Road Maintenance', head: 'Anita Desai', officers: 12, open: 231, resolved: 812, sla: 85, budget: '₹12.0 Cr', status: 'SLA Warning' },
];

const SuperAdminDepartments = () => {
  const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDept, setEditingDept] = useState(null);

  // Form states
  const [deptName, setDeptName] = useState('');
  const [deptHead, setDeptHead] = useState('');
  const [deptBudget, setDeptBudget] = useState('₹5.0 Cr');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!deptName.trim() || !deptHead.trim()) return;

    if (editingDept) {
      // Update
      setDepartments(departments.map(d => d.id === editingDept.id ? {
        ...d,
        name: deptName,
        head: deptHead,
        budget: deptBudget
      } : d));
      setEditingDept(null);
    } else {
      // Create new
      const newDept = {
        id: Date.now(),
        name: deptName,
        head: deptHead,
        officers: 5,
        open: 0,
        resolved: 0,
        sla: 100,
        budget: deptBudget,
        status: 'Operational'
      };
      setDepartments([...departments, newDept]);
    }

    setDeptName('');
    setDeptHead('');
    setDeptBudget('₹5.0 Cr');
    setShowAddModal(false);
  };

  const handleEdit = (dept) => {
    setEditingDept(dept);
    setDeptName(dept.name);
    setDeptHead(dept.head);
    setDeptBudget(dept.budget);
    setShowAddModal(true);
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
            <span className="text-slate-600">Departments</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5 flex items-center gap-2">
            <Building2 className="text-emerald-700" />
            Departments
          </h1>
          <p className="text-slate-500 text-sm mt-1">Supervise municipal divisions, allocate operating budgets, and review SLA resolution scores.</p>
        </div>

        <button
          onClick={() => { setEditingDept(null); setShowAddModal(true); }}
          className="inline-flex items-center gap-2 bg-[#0b83ff] hover:bg-[#0070e0] text-white py-2.5 px-5 rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 transition-all focus:outline-none"
        >
          <Plus size={16} />
          Add Department
        </button>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div key={dept.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4 hover:shadow-md transition">
            
            {/* Header info */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">{dept.name}</h3>
                <p className="text-[10px] text-slate-400 font-bold mt-0.5">Head: {dept.head}</p>
              </div>

              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black border ${
                dept.status === 'Operational' 
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                  : 'bg-rose-50 border-rose-100 text-rose-700'
              }`}>
                {dept.status}
              </span>
            </div>

            {/* Metrics grids */}
            <div className="grid grid-cols-3 gap-2 text-center border-y border-slate-50 py-3 text-[10px] font-bold text-slate-500">
              <div className="border-r border-slate-100">
                <span className="block text-slate-400 uppercase tracking-wider text-[8px]">Officers</span>
                <span className="block text-slate-900 text-sm font-black mt-0.5">{dept.officers}</span>
              </div>
              <div className="border-r border-slate-100">
                <span className="block text-slate-450 uppercase tracking-wider text-[8px]">Open</span>
                <span className="block text-rose-600 text-sm font-black mt-0.5">{dept.open}</span>
              </div>
              <div>
                <span className="block text-slate-450 uppercase tracking-wider text-[8px]">Resolved</span>
                <span className="block text-emerald-600 text-sm font-black mt-0.5">{dept.resolved}</span>
              </div>
            </div>

            {/* SLA slider */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-450">
                <span>SLA Resolution Rate</span>
                <span className="text-slate-800">{dept.sla}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${dept.sla}%` }}></div>
              </div>
            </div>

            {/* Budget & Actions footer */}
            <div className="flex items-center justify-between border-t border-slate-50 pt-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                <Coins size={14} className="text-teal-700" />
                <span>Budget: {dept.budget}</span>
              </div>

              <button
                onClick={() => handleEdit(dept)}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-blue-600 hover:bg-slate-50 transition"
              >
                <Edit2 size={12} />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-slate-105">
              <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
                <Building2 size={18} className="text-emerald-700" />
                {editingDept ? 'Edit Department details' : 'Add New Department'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Department Name</label>
                <input
                  type="text"
                  required
                  value={deptName}
                  onChange={(e) => setDeptName(e.target.value)}
                  placeholder="e.g. Electricity Board"
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-emerald-700 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-705 uppercase mb-1.5">Department Head Name</label>
                <input
                  type="text"
                  required
                  value={deptHead}
                  onChange={(e) => setDeptHead(e.target.value)}
                  placeholder="e.g. Dr. Sunita Sharma"
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-emerald-700 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-705 uppercase mb-1.5">Allocated Budget (₹)</label>
                <input
                  type="text"
                  required
                  value={deptBudget}
                  onChange={(e) => setDeptBudget(e.target.value)}
                  placeholder="e.g. ₹12.5 Cr"
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-emerald-700 font-semibold"
                />
              </div>

              <div className="flex gap-3 pt-4 justify-end border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-2.5 px-4 border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow"
                >
                  {editingDept ? 'Update Department' : 'Create Department'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default SuperAdminDepartments;
