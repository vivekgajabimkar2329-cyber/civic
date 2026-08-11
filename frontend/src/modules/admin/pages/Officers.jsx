import React, { useState, useMemo } from 'react';
import {
  Users,
  UserCheck,
  UserX,
  Shield,
  UserPlus,
  Search,
  Filter,
  Download,
  MoreVertical,
  ChevronDown,
  X,
  Check,
  Plus
} from 'lucide-react';

const INITIAL_USERS = [
  {
    id: 1,
    name: 'Rohit Sharma',
    username: '@rohit.sharma',
    email: 'rohit.sharma@civicai.gov',
    role: 'Super Admin',
    department: 'Administration',
    status: 'Active',
    lastLogin: 'Today, 10:30 AM',
    joinedOn: '15 Jan 2024',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 2,
    name: 'Priya Desai',
    username: '@priya.desai',
    email: 'priya.desai@civicai.gov',
    role: 'Department Admin',
    department: 'Public Works',
    status: 'Active',
    lastLogin: 'Today, 09:15 AM',
    joinedOn: '12 Jan 2024',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 3,
    name: 'Arjun Patel',
    username: '@arjun.patel',
    email: 'arjun.patel@civicai.gov',
    role: 'Department User',
    department: 'Health Department',
    status: 'Active',
    lastLogin: 'Yesterday, 06:45 PM',
    joinedOn: '10 Jan 2024',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 4,
    name: 'Sneha Iyer',
    username: '@sneha.iyer',
    email: 'sneha.iyer@civicai.gov',
    role: 'Department User',
    department: 'Water Supply',
    status: 'Active',
    lastLogin: 'Yesterday, 04:20 PM',
    joinedOn: '08 Jan 2024',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 5,
    name: 'Imran Khan',
    username: '@imran.khan',
    email: 'imran.khan@civicai.gov',
    role: 'Field Officer',
    department: 'Sanitation',
    status: 'Active',
    lastLogin: 'Yesterday, 02:10 PM',
    joinedOn: '06 Jan 2024',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 6,
    name: 'Neha Verma',
    username: '@neha.verma',
    email: 'neha.verma@civicai.gov',
    role: 'Citizen Support',
    department: 'Citizen Services',
    status: 'Active',
    lastLogin: 'Today, 08:00 AM',
    joinedOn: '03 Jan 2024',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 7,
    name: 'Vikram Singh',
    username: '@vikram.singh',
    email: 'vikram.singh@civicai.gov',
    role: 'Department Admin',
    department: 'Traffic Department',
    status: 'Inactive',
    lastLogin: '3 days ago',
    joinedOn: '01 Jan 2024',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 8,
    name: 'Kavya Nair',
    username: '@kavya.nair',
    email: 'kavya.nair@civicai.gov',
    role: 'Department User',
    department: 'Environment',
    status: 'Active',
    lastLogin: '2 days ago',
    joinedOn: '28 Dec 2023',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 9,
    name: 'Manoj Gupta',
    username: '@manoj.gupta',
    email: 'manoj.gupta@civicai.gov',
    role: 'Field Officer',
    department: 'Solid Waste Management',
    status: 'Inactive',
    lastLogin: '1 week ago',
    joinedOn: '25 Dec 2023',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 10,
    name: 'Pooja Mehta',
    username: '@pooja.mehta',
    email: 'pooja.mehta@civicai.gov',
    role: 'Citizen Support',
    department: 'Grievance Redressal',
    status: 'Active',
    lastLogin: 'Today, 07:30 AM',
    joinedOn: '20 Dec 2023',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80'
  }
];

const Officers = () => {
  const [usersList, setUsersList] = useState(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeActionsUserId, setActiveActionsUserId] = useState(null);

  // Form states for adding user
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('Department User');
  const [newDept, setNewDept] = useState('Public Works');

  // Filtered users
  const filteredUsers = useMemo(() => {
    return usersList.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRole = 
        roleFilter === 'All Roles' || 
        user.role === roleFilter;

      const matchesDept = 
        deptFilter === 'All Departments' || 
        user.department === deptFilter;

      const matchesStatus = 
        statusFilter === 'All Status' || 
        user.status === statusFilter;

      return matchesSearch && matchesRole && matchesDept && matchesStatus;
    });
  }, [usersList, searchQuery, roleFilter, deptFilter, statusFilter]);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const usernameStr = `@${newName.toLowerCase().replace(/\s+/g, '.')}`;
    const newUser = {
      id: Date.now(),
      name: newName,
      username: usernameStr,
      email: newEmail.trim(),
      role: newRole,
      department: newDept,
      status: 'Active',
      lastLogin: 'Never',
      joinedOn: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80'
    };

    setUsersList([newUser, ...usersList]);
    setNewName('');
    setNewEmail('');
    setShowAddModal(false);
  };

  const handleStatusToggle = (userId) => {
    setUsersList(usersList.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === 'Active' ? 'Inactive' : 'Active'
        };
      }
      return user;
    }));
    setActiveActionsUserId(null);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsersList(usersList.filter(user => user.id !== userId));
    }
    setActiveActionsUserId(null);
  };

  return (
    <div className="py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Title & Navigation Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span>Home</span>
            <span>&gt;</span>
            <span className="text-slate-600">Users</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5">Users</h1>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 bg-[#0b83ff] hover:bg-[#0070e0] text-white py-2.5 px-5 rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 transition-all focus:outline-none"
        >
          <Plus size={16} />
          Add New User
        </button>
      </div>

      {/* Stats Cards Row (5 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Total Users */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-start justify-between hover:border-slate-350 transition-all duration-200">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Users</span>
            <span className="text-3xl font-black text-slate-900 block leading-none">256</span>
            <span className="text-[10px] font-bold text-slate-450 block pt-1">All registered users</span>
          </div>
          <div className="flex flex-col items-end justify-between h-full">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
              <Users size={18} />
            </div>
            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100/50 px-2 py-0.5 rounded-full mt-4 flex items-center">
              ▲ 12
            </span>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-start justify-between hover:border-slate-350 transition-all duration-200">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Users</span>
            <span className="text-3xl font-black text-slate-900 block leading-none">214</span>
            <span className="text-[10px] font-bold text-slate-455 block pt-1">Currently active</span>
          </div>
          <div className="flex flex-col items-end justify-between h-full">
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
              <UserCheck size={18} />
            </div>
            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100/50 px-2 py-0.5 rounded-full mt-4 flex items-center">
              ▲ 8
            </span>
          </div>
        </div>

        {/* Inactive Users */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-start justify-between hover:border-slate-350 transition-all duration-200">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Inactive Users</span>
            <span className="text-3xl font-black text-slate-900 block leading-none">32</span>
            <span className="text-[10px] font-bold text-slate-455 block pt-1">Temporarily inactive</span>
          </div>
          <div className="flex flex-col items-end justify-between h-full">
            <div className="p-2 bg-rose-50 rounded-xl text-rose-600">
              <UserX size={18} />
            </div>
            <span className="text-[9px] font-bold text-rose-700 bg-rose-50 border border-rose-100/50 px-2 py-0.5 rounded-full mt-4 flex items-center">
              ▼ 3
            </span>
          </div>
        </div>

        {/* Administrators */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-start justify-between hover:border-slate-350 transition-all duration-200">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Administrators</span>
            <span className="text-3xl font-black text-slate-900 block leading-none">18</span>
            <span className="text-[10px] font-bold text-slate-455 block pt-1">System administrators</span>
          </div>
          <div className="flex flex-col items-end justify-between h-full">
            <div className="p-2 bg-purple-50 rounded-xl text-purple-600">
              <Shield size={18} />
            </div>
            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100/50 px-2 py-0.5 rounded-full mt-4 flex items-center">
              ▲ 2
            </span>
          </div>
        </div>

        {/* New This Month */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-start justify-between hover:border-slate-350 transition-all duration-200">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">New This Month</span>
            <span className="text-3xl font-black text-slate-900 block leading-none">28</span>
            <span className="text-[10px] font-bold text-slate-455 block pt-1">New registered users</span>
          </div>
          <div className="flex flex-col items-end justify-between h-full">
            <div className="p-2 bg-sky-50 rounded-xl text-sky-600">
              <UserPlus size={18} />
            </div>
            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100/50 px-2 py-0.5 rounded-full mt-4 flex items-center">
              ▲ 7
            </span>
          </div>
        </div>
      </div>

      {/* Main Table Card Block */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        {/* Filters control bar */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 text-xs py-2.5 pl-10 pr-4 rounded-xl outline-none focus:border-teal-800 transition-all font-medium text-slate-700"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Roles Filter dropdown */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-white border border-slate-200 text-xs py-2 px-3 rounded-xl outline-none focus:border-teal-800 font-bold text-slate-650 cursor-pointer appearance-none pr-8 relative"
            >
              <option value="All Roles">All Roles</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Department Admin">Department Admin</option>
              <option value="Department User">Department User</option>
              <option value="Field Officer">Field Officer</option>
              <option value="Citizen Support">Citizen Support</option>
            </select>

            {/* Department Filter dropdown */}
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="bg-white border border-slate-200 text-xs py-2 px-3 rounded-xl outline-none focus:border-teal-800 font-bold text-slate-650 cursor-pointer appearance-none pr-8"
            >
              <option value="All Departments">All Departments</option>
              <option value="Administration">Administration</option>
              <option value="Public Works">Public Works</option>
              <option value="Health Department">Health Department</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Citizen Services">Citizen Services</option>
              <option value="Traffic Department">Traffic Department</option>
              <option value="Environment">Environment</option>
              <option value="Solid Waste Management">Solid Waste Management</option>
              <option value="Grievance Redressal">Grievance Redressal</option>
            </select>

            {/* Status Filter dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-slate-200 text-xs py-2 px-3 rounded-xl outline-none focus:border-teal-800 font-bold text-slate-650 cursor-pointer appearance-none pr-8"
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <button
              type="button"
              className="inline-flex items-center gap-2 border border-slate-200 bg-white text-xs font-bold py-2.5 px-4 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors shadow-sm focus:outline-none"
            >
              <Filter size={14} />
              Filters
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 border border-slate-200 bg-white text-xs font-bold py-2.5 px-4 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors shadow-sm focus:outline-none"
            >
              <Download size={14} />
              Export
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider bg-slate-50/20">
                <th className="py-4 px-6">User</th>
                <th className="py-4 px-4">Email</th>
                <th className="py-4 px-4">Role</th>
                <th className="py-4 px-4">Department</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Last Login</th>
                <th className="py-4 px-4">Joined On</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* User Profile Cell */}
                    <td className="py-4 px-6 flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-100 shadow-sm"
                      />
                      <div>
                        <p className="font-extrabold text-slate-900 leading-snug">{user.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-0.5">{user.username}</p>
                      </div>
                    </td>

                    {/* Email Cell */}
                    <td className="py-4 px-4 text-slate-500 font-bold whitespace-nowrap">{user.email}</td>

                    {/* Role Pill Cell */}
                    <td className="py-4 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                        user.role === 'Super Admin' 
                          ? 'bg-purple-50 border-purple-100 text-purple-700' 
                          : user.role === 'Department Admin' 
                          ? 'bg-blue-50 border-blue-100 text-blue-700' 
                          : user.role === 'Field Officer' 
                          ? 'bg-orange-50 border-orange-100 text-orange-700' 
                          : user.role === 'Citizen Support' 
                          ? 'bg-pink-50 border-pink-100 text-pink-700' 
                          : 'bg-emerald-50 border-emerald-100 text-emerald-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>

                    {/* Department Cell */}
                    <td className="py-4 px-4 text-slate-800 font-bold">{user.department}</td>

                    {/* Status Dot Flag */}
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

                    {/* Last Login Cell */}
                    <td className="py-4 px-4 text-slate-400 font-bold whitespace-nowrap">{user.lastLogin}</td>

                    {/* Joined On Date Cell */}
                    <td className="py-4 px-4 text-slate-500 font-bold whitespace-nowrap">{user.joinedOn}</td>

                    {/* Actions dropdown action button */}
                    <td className="py-4 px-6 text-center relative">
                      <button
                        onClick={() => setActiveActionsUserId(activeActionsUserId === user.id ? null : user.id)}
                        className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {/* Dropdown Options Popup */}
                      {activeActionsUserId === user.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActiveActionsUserId(null)} />
                          <div className="absolute right-6 top-10 w-36 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-20 animate-in fade-in duration-100 text-left">
                            <button
                              type="button"
                              onClick={() => handleStatusToggle(user.id)}
                              className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                            >
                              {user.status === 'Active' ? 'Deactivate User' : 'Activate User'}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(user.id)}
                              className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 border-t border-slate-100 mt-1"
                            >
                              Delete User
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 font-bold">
                    No users found matching the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar matching mockup styling */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/20 flex items-center justify-between">
          <span className="text-slate-400 text-[10px] font-bold">
            Showing 1 to {filteredUsers.length} of {usersList.length} users
          </span>

          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-400 text-xs font-black disabled:opacity-50" disabled>&lt;</button>
            <button className="w-8 h-8 rounded-lg bg-[#0b83ff] text-white flex items-center justify-center text-xs font-black shadow shadow-blue-500/10">1</button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 text-xs font-black">2</button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 text-xs font-black">3</button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-400 text-xs font-black">&gt;</button>
          </div>
        </div>
      </div>

      {/* Add User Modal Overlay Form */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
                <Users size={18} className="text-blue-600" />
                Add New User Account
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:bg-slate-55 p-1.5 rounded-lg transition-colors focus:outline-none">
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
                  placeholder="e.g. Ramesh Hegde"
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-705 uppercase mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="ramesh.hegde@civicai.gov"
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-705 uppercase mb-1.5">User Role</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-blue-600 cursor-pointer"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Department Admin">Department Admin</option>
                    <option value="Department User">Department User</option>
                    <option value="Field Officer">Field Officer</option>
                    <option value="Citizen Support">Citizen Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-705 uppercase mb-1.5">Department</label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-blue-600 cursor-pointer"
                  >
                    <option value="Administration">Administration</option>
                    <option value="Public Works">Public Works</option>
                    <option value="Health Department">Health Department</option>
                    <option value="Water Supply">Water Supply</option>
                    <option value="Sanitation">Sanitation</option>
                    <option value="Citizen Services">Citizen Services</option>
                    <option value="Traffic Department">Traffic Department</option>
                    <option value="Environment">Environment</option>
                    <option value="Solid Waste Management">Solid Waste Management</option>
                    <option value="Grievance Redressal">Grievance Redressal</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 justify-end border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-2.5 px-4 border border-slate-200 text-slate-600 bg-white hover:bg-slate-55 rounded-xl text-xs font-bold shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 bg-blue-600 hover:bg-[#0070e0] text-white rounded-xl text-xs font-bold shadow shadow-blue-500/10"
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

export default Officers;
