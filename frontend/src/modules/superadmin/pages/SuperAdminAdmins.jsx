import React, { useState } from 'react';
import {
  ShieldAlert,
  UserCheck,
  Search,
  Filter,
  Check,
  X,
  Plus,
  Shield,
  Key,
  Trash2,
  Building
} from 'lucide-react';

const INITIAL_ADMINS = [
  { id: 101, name: 'Dr. Sunita Sharma', email: 'sunita.sharma@civic.gov.in', department: 'Public Works', municipality: 'Bengaluru', mfa: true, status: 'Active', loginHistory: 'Today, 08:30 AM' },
  { id: 102, name: 'Rajesh Kumar', email: 'rajesh.kumar@civic.gov.in', department: 'Traffic Control', municipality: 'Hubballi', mfa: true, status: 'Active', loginHistory: 'Today, 09:12 AM' },
  { id: 103, name: 'Anita Desai', email: 'anita.desai@civic.gov.in', department: 'Road Maintenance', municipality: 'Dharwad', mfa: false, status: 'Active', loginHistory: 'Yesterday, 11:20 AM' },
  { id: 104, name: 'Suresh Patil', email: 'suresh.patil@civic.gov.in', department: 'Waste Management', municipality: 'Belagavi', mfa: true, status: 'Active', loginHistory: 'Yesterday, 04:35 PM' },
  { id: 105, name: 'Priya Sharma', email: 'priya.sharma@civic.gov.in', department: 'Water Supply', municipality: 'Karwar', mfa: true, status: 'Deactivated', loginHistory: '3 days ago' },
];

const SuperAdminAdmins = () => {
  const [adminsList, setAdminsList] = useState(INITIAL_ADMINS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states for inviting a new administrator
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDept, setNewDept] = useState('Public Works');
  const [newMuni, setNewMuni] = useState('Bengaluru');

  const filteredAdmins = adminsList.filter(admin => 
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInviteAdmin = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newAdmin = {
      id: Date.now(),
      name: newName,
      email: newEmail,
      department: newDept,
      municipality: newMuni,
      mfa: false,
      status: 'Active',
      loginHistory: 'Never'
    };

    setAdminsList([...adminsList, newAdmin]);
    setNewName('');
    setNewEmail('');
    setShowAddModal(false);
  };

  const handleToggleMfa = (id) => {
    setAdminsList(adminsList.map(a => a.id === id ? { ...a, mfa: !a.mfa } : a));
  };

  const handleToggleStatus = (id) => {
    setAdminsList(adminsList.map(a => a.id === id ? { ...a, status: a.status === 'Active' ? 'Deactivated' : 'Active' } : a));
  };

  const handleDeleteAdmin = (id) => {
    if (window.confirm('Are you sure you want to remove this administrator account?')) {
      setAdminsList(adminsList.filter(a => a.id !== id));
    }
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
            <span className="text-slate-600">Admins</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5 flex items-center gap-2">
            <UserCheck className="text-teal-800" />
            Admins Control
          </h1>
          <p className="text-slate-500 text-sm mt-1">Configure administrator permissions, toggle MFA security features, and view active accounts.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 bg-[#0b83ff] hover:bg-[#0070e0] text-white py-2.5 px-5 rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 transition-all focus:outline-none"
        >
          <Plus size={16} />
          Invite Admin
        </button>
      </div>

      {/* Main Grid */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Search bar */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search administrator details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 text-xs py-2.5 pl-10 pr-4 rounded-xl outline-none focus:border-blue-650 transition-all font-medium text-slate-700"
            />
          </div>
        </div>

        {/* Admins Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider bg-slate-50/20">
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-4">Email</th>
                <th className="py-4 px-4">Primary Department</th>
                <th className="py-4 px-4">Municipality</th>
                <th className="py-4 px-4 text-center">MFA Active</th>
                <th className="py-4 px-4">Last Login</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
              {filteredAdmins.length > 0 ? (
                filteredAdmins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Name */}
                    <td className="py-4 px-6 font-extrabold text-slate-900">{admin.name}</td>

                    {/* Email */}
                    <td className="py-4 px-4 text-slate-500 font-bold">{admin.email}</td>

                    {/* Department */}
                    <td className="py-4 px-4 text-slate-800 font-bold flex items-center gap-1.5 mt-2.5">
                      <Building size={14} className="text-slate-400" />
                      {admin.department}
                    </td>

                    {/* Municipality */}
                    <td className="py-4 px-4 text-slate-650 font-bold">{admin.municipality}</td>

                    {/* MFA Toggle */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleMfa(admin.id)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black border transition ${
                          admin.mfa 
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                            : 'bg-rose-50 border-rose-100 text-rose-700'
                        }`}
                      >
                        <Key size={10} />
                        {admin.mfa ? 'MFA ON' : 'MFA OFF'}
                      </button>
                    </td>

                    {/* Last Login */}
                    <td className="py-4 px-4 text-slate-400 font-bold whitespace-nowrap">{admin.loginHistory}</td>

                    {/* Status */}
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                        admin.status === 'Active' 
                          ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                          : 'bg-slate-100 border-slate-200 text-slate-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${admin.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                        {admin.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-center flex items-center justify-center gap-2 mt-1">
                      <button
                        onClick={() => handleToggleStatus(admin.id)}
                        className={`p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition ${
                          admin.status === 'Active' ? 'text-slate-500 hover:text-rose-600' : 'text-slate-500 hover:text-emerald-600'
                        }`}
                        title={admin.status === 'Active' ? 'Deactivate Account' : 'Activate Account'}
                      >
                        {admin.status === 'Active' ? <X size={14} /> : <Check size={14} />}
                      </button>
                      <button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-slate-50 transition"
                        title="Remove Admin Account"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 font-bold">
                    No administrators found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-slate-105">
              <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
                <Shield size={18} className="text-teal-800" />
                Invite System Administrator
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleInviteAdmin} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Admin Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Ramesh Gowda"
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-teal-800 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-705 uppercase mb-1.5">Work Email</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="ramesh.gowda@civic.gov.in"
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-teal-800 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-705 uppercase mb-1.5">Department</label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-teal-800 font-bold"
                  >
                    <option value="Public Works">Public Works</option>
                    <option value="Water Supply">Water Supply</option>
                    <option value="Waste Management">Waste Management</option>
                    <option value="Traffic Control">Traffic Control</option>
                    <option value="Road Maintenance">Road Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-705 uppercase mb-1.5">Municipality</label>
                  <select
                    value={newMuni}
                    onChange={(e) => setNewMuni(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-teal-800 font-bold"
                  >
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Hubballi">Hubballi</option>
                    <option value="Dharwad">Dharwad</option>
                    <option value="Belagavi">Belagavi</option>
                    <option value="Karwar">Karwar</option>
                  </select>
                </div>
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
                  className="py-2.5 px-5 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold shadow"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default SuperAdminAdmins;
