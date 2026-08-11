import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  MoreVertical,
  Plus,
  X,
  Check,
  Trash2,
  Lock,
  Unlock,
  ShieldAlert
} from 'lucide-react';

const INITIAL_USERS = [
  { id: 1, name: 'Rohit Sharma', email: 'rohit.sharma@civicai.gov.in', phone: '+91 98765 43210', role: 'Super Admin', department: 'Administration', municipality: 'State-wide', status: 'Active', lastLogin: 'Today, 10:30 AM', createdDate: '15 Jan 2024', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 2, name: 'Priya Desai', email: 'priya.desai@civicai.gov.in', phone: '+91 98765 43211', role: 'Department Head', department: 'Public Works', municipality: 'Hubballi', status: 'Active', lastLogin: 'Today, 09:15 AM', createdDate: '12 Jan 2024', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 3, name: 'Arjun Patel', email: 'arjun.patel@civicai.gov.in', phone: '+91 98765 43212', role: 'Department User', department: 'Health', municipality: 'Dharwad', status: 'Active', lastLogin: 'Yesterday, 06:45 PM', createdDate: '10 Jan 2024', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 4, name: 'Sneha Iyer', email: 'sneha.iyer@civicai.gov.in', phone: '+91 98765 43213', role: 'Department User', department: 'Water Supply', municipality: 'Belagavi', status: 'Active', lastLogin: 'Yesterday, 04:20 PM', createdDate: '08 Jan 2024', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 5, name: 'Imran Khan', email: 'imran.khan@civicai.gov.in', phone: '+91 98765 43214', role: 'Field Officer', department: 'Sanitation', municipality: 'Karwar', status: 'Active', lastLogin: 'Yesterday, 02:10 PM', createdDate: '06 Jan 2024', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 6, name: 'Neha Verma', email: 'neha.verma@civicai.gov.in', phone: '+91 98765 43215', role: 'Support Executive', department: 'Citizen Support', municipality: 'Bengaluru', status: 'Active', lastLogin: 'Today, 08:00 AM', createdDate: '03 Jan 2024', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 7, name: 'Vikram Singh', email: 'vikram.singh@civicai.gov.in', phone: '+91 98765 43216', role: 'Department Head', department: 'Traffic', municipality: 'Mangaluru', status: 'Suspended', lastLogin: '3 days ago', createdDate: '01 Jan 2024', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 8, name: 'Kavya Nair', email: 'kavya.nair@civicai.gov.in', phone: '+91 98765 43217', role: 'Citizen', department: 'None', municipality: 'Mysuru', status: 'Active', lastLogin: '2 days ago', createdDate: '28 Dec 2023', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100&q=80' },
];

const SuperAdminUsers = () => {
  const [usersList, setUsersList] = useState(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeActionsId, setActiveActionsId] = useState(null);

  // Form states for creating a new user
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('Citizen');
  const [newDept, setNewDept] = useState('None');
  const [newMunicipality, setNewMunicipality] = useState('Bengaluru');

  const filteredUsers = useMemo(() => {
    return usersList.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRole = roleFilter === 'All' || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [usersList, searchQuery, roleFilter]);

  const handleSelectUser = (id) => {
    setSelectedUsers(prev => 
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id));
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newUser = {
      id: Date.now(),
      name: newName,
      email: newEmail,
      phone: '+91 98765 00000',
      role: newRole,
      department: newDept,
      municipality: newMunicipality,
      status: 'Active',
      lastLogin: 'Never',
      createdDate: 'Today',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80'
    };

    setUsersList([newUser, ...usersList]);
    setNewName('');
    setNewEmail('');
    setShowAddModal(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setUsersList(usersList.map(u => u.id === id ? { ...u, status: newStatus } : u));
    setActiveActionsId(null);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsersList(usersList.filter(u => u.id !== id));
    }
    setActiveActionsId(null);
  };

  const handleBulkSuspend = () => {
    if (selectedUsers.length === 0) return;
    setUsersList(usersList.map(u => selectedUsers.includes(u.id) ? { ...u, status: 'Suspended' } : u));
    setSelectedUsers([]);
  };

  const handleBulkActivate = () => {
    if (selectedUsers.length === 0) return;
    setUsersList(usersList.map(u => selectedUsers.includes(u.id) ? { ...u, status: 'Active' } : u));
    setSelectedUsers([]);
  };

  return (
    <div className="py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span>Home</span>
            <span>&gt;</span>
            <span>Super Admin</span>
            <span>&gt;</span>
            <span className="text-slate-600">Users</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5 flex items-center gap-2">
            <Users className="text-blue-600" />
            Users Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage global system user accounts, configure department and municipal officers.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 bg-[#0b83ff] hover:bg-[#0070e0] text-white py-2.5 px-5 rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 transition-all focus:outline-none"
        >
          <Plus size={16} />
          Create User
        </button>
      </div>

      {/* Bulk actions panel */}
      {selectedUsers.length > 0 && (
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-center justify-between text-xs animate-in slide-in-from-top duration-250">
          <span className="font-bold text-blue-800">{selectedUsers.length} users selected for bulk action</span>
          <div className="flex items-center gap-2">
            <button onClick={handleBulkActivate} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded-lg">Bulk Activate</button>
            <button onClick={handleBulkSuspend} className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-1.5 px-3 rounded-lg">Bulk Suspend</button>
          </div>
        </div>
      )}

      {/* Filter and controls bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search user name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 text-xs py-2.5 pl-10 pr-4 rounded-xl outline-none focus:border-blue-600 transition-all font-medium"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-white border border-slate-200 text-xs py-2.5 px-4 rounded-xl outline-none focus:border-blue-600 font-bold text-slate-650 cursor-pointer"
            >
              <option value="All">All Roles</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Department Head">Department Head</option>
              <option value="Department User">Department User</option>
              <option value="Field Officer">Field Officer</option>
              <option value="Citizen">Citizen</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider bg-slate-50/20">
                <th className="py-4 px-6 text-center w-12">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="py-4 px-4">User</th>
                <th className="py-4 px-4">Email</th>
                <th className="py-4 px-4">Phone</th>
                <th className="py-4 px-4">Role</th>
                <th className="py-4 px-4">Department</th>
                <th className="py-4 px-4">Municipality</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Created Date</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 text-center">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-4 px-4 flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-slate-150" />
                      <span className="font-extrabold text-slate-905">{user.name}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-500 font-bold">{user.email}</td>
                    <td className="py-4 px-4 text-slate-450 font-mono">{user.phone}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-black border ${
                        user.role === 'Super Admin' 
                          ? 'bg-purple-50 border-purple-100 text-purple-700' 
                          : user.role === 'Department Head' 
                          ? 'bg-blue-50 border-blue-100 text-blue-700' 
                          : 'bg-slate-105 border-slate-200 text-slate-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-800 font-bold">{user.department}</td>
                    <td className="py-4 px-4 text-slate-650 font-bold">{user.municipality}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-black border ${
                        user.status === 'Active' 
                          ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                          : 'bg-rose-50 border-rose-100 text-rose-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-400 font-bold">{user.createdDate}</td>
                    <td className="py-4 px-6 text-center relative">
                      <button
                        onClick={() => setActiveActionsId(activeActionsId === user.id ? null : user.id)}
                        className="text-slate-400 hover:text-slate-600 p-1 rounded-lg focus:outline-none"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {activeActionsId === user.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActiveActionsId(null)} />
                          <div className="absolute right-6 top-10 w-36 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-20 text-left">
                            <button
                              type="button"
                              onClick={() => handleStatusChange(user.id, user.status === 'Active' ? 'Suspended' : 'Active')}
                              className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                            >
                              {user.status === 'Active' ? 'Suspend User' : 'Activate User'}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(user.id)}
                              className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 border-t border-slate-100 mt-1"
                            >
                              Delete Account
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400 font-bold">
                    No users found matching query filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-slate-105">
              <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
                <Users size={18} className="text-blue-650" />
                Add New User Account
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">User Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Suresh Gowda"
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-blue-600 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-705 uppercase mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="suresh.gowda@civicai.gov.in"
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-blue-600 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-705 uppercase mb-1.5">System Role</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-blue-600 font-bold"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Department Head">Department Head</option>
                    <option value="Department User">Department User</option>
                    <option value="Field Officer">Field Officer</option>
                    <option value="Citizen">Citizen</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-705 uppercase mb-1.5">Department</label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-blue-600 font-bold"
                  >
                    <option value="None">None (Citizen)</option>
                    <option value="Administration">Administration</option>
                    <option value="Public Works">Public Works</option>
                    <option value="Health">Health</option>
                    <option value="Water Supply">Water Supply</option>
                    <option value="Sanitation">Sanitation</option>
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
                  className="py-2.5 px-5 bg-blue-600 hover:bg-[#0070e0] text-white rounded-xl text-xs font-bold shadow"
                >
                  Confirm & Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default SuperAdminUsers;
