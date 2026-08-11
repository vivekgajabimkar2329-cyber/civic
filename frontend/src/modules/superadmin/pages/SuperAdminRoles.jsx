import React, { useState } from 'react';
import {
  Shield,
  Plus,
  Trash2,
  Copy,
  Save,
  CheckSquare,
  Square,
  Lock,
  Bot
} from 'lucide-react';

const INITIAL_ROLES = [
  { id: 1, name: 'Super Admin', desc: 'Full access to all platform resources and controls', usersCount: 2 },
  { id: 2, name: 'Department Head', desc: 'Supervise specific municipal departments and assign field staff', usersCount: 8 },
  { id: 3, name: 'Field Officer', desc: 'Investigate and update resolution status on assigned tasks', usersCount: 34 },
  { id: 4, name: 'Citizen', desc: 'Submit complaints, track status, and rate completed resolutions', usersCount: 45000 },
];

const INITIAL_PERMISSIONS = {
  'Super Admin': {
    users: { read: true, write: true, delete: true, export: true },
    departments: { read: true, write: true, delete: true, export: true },
    complaints: { read: true, write: true, delete: true, export: true },
    security: { read: true, write: true, delete: true, export: true },
    reports: { read: true, write: true, delete: true, export: true }
  },
  'Department Head': {
    users: { read: true, write: false, delete: false, export: true },
    departments: { read: true, write: false, delete: false, export: true },
    complaints: { read: true, write: true, delete: false, export: true },
    security: { read: false, write: false, delete: false, export: false },
    reports: { read: true, write: true, delete: false, export: true }
  },
  'Field Officer': {
    users: { read: false, write: false, delete: false, export: false },
    departments: { read: true, write: false, delete: false, export: false },
    complaints: { read: true, write: true, delete: false, export: false },
    security: { read: false, write: false, delete: false, export: false },
    reports: { read: false, write: false, delete: false, export: false }
  },
  'Citizen': {
    users: { read: false, write: false, delete: false, export: false },
    departments: { read: true, write: false, delete: false, export: false },
    complaints: { read: true, write: true, delete: false, export: false },
    security: { read: false, write: false, delete: false, export: false },
    reports: { read: false, write: false, delete: false, export: false }
  }
};

const MODULES = [
  { key: 'users', label: 'Users & Admins' },
  { key: 'departments', label: 'Departments Management' },
  { key: 'complaints', label: 'Complaints Ledger' },
  { key: 'security', label: 'Security Firewall' },
  { key: 'reports', label: 'Export Reports' }
];

const SuperAdminRoles = () => {
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [selectedRole, setSelectedRole] = useState('Department Head');
  const [permissions, setPermissions] = useState(INITIAL_PERMISSIONS);
  const [toastMessage, setToastMessage] = useState(null);

  // New role form states
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const [showAddRole, setShowAddRole] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTogglePermission = (moduleKey, action) => {
    if (selectedRole === 'Super Admin') {
      triggerToast('Super Admin permissions cannot be modified.');
      return;
    }

    setPermissions({
      ...permissions,
      [selectedRole]: {
        ...permissions[selectedRole],
        [moduleKey]: {
          ...permissions[selectedRole][moduleKey],
          [action]: !permissions[selectedRole][moduleKey][action]
        }
      }
    });
  };

  const handleCreateRole = (e) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;

    const newRole = {
      id: Date.now(),
      name: newRoleName,
      desc: newRoleDesc,
      usersCount: 0
    };

    setRoles([...roles, newRole]);
    setPermissions({
      ...permissions,
      [newRoleName]: {
        users: { read: false, write: false, delete: false, export: false },
        departments: { read: false, write: false, delete: false, export: false },
        complaints: { read: false, write: false, delete: false, export: false },
        security: { read: false, write: false, delete: false, export: false },
        reports: { read: false, write: false, delete: false, export: false }
      }
    });

    setNewRoleName('');
    setNewRoleDesc('');
    setShowAddRole(false);
    setSelectedRole(newRoleName);
    triggerToast(`Role "${newRoleName}" created successfully!`);
  };

  const handleDeleteRole = (roleName) => {
    if (roleName === 'Super Admin' || roleName === 'Citizen') {
      triggerToast('Core roles cannot be deleted.');
      return;
    }

    if (window.confirm(`Are you sure you want to delete the role: ${roleName}?`)) {
      setRoles(roles.filter(r => r.name !== roleName));
      setSelectedRole('Citizen');
      triggerToast(`Role "${roleName}" has been deleted.`);
    }
  };

  return (
    <div className="py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white font-bold px-4 py-3 rounded-xl shadow-xl text-xs">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span>Home</span>
            <span>&gt;</span>
            <span>Super Admin</span>
            <span>&gt;</span>
            <span className="text-slate-655">Roles</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5 flex items-center gap-2">
            <Shield className="text-purple-650" />
            Roles & RBAC
          </h1>
          <p className="text-slate-500 text-sm mt-1">Configure role-based access control permission matrices dynamically.</p>
        </div>

        <button
          onClick={() => setShowAddRole(true)}
          className="inline-flex items-center gap-2 bg-[#0b83ff] hover:bg-[#0070e0] text-white py-2.5 px-5 rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 transition-all focus:outline-none"
        >
          <Plus size={16} />
          Create Role
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Roles list */}
        <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-800 border-b border-slate-50 pb-3">System Roles</h3>
          
          <div className="space-y-2">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.name)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  selectedRole === role.name 
                    ? 'bg-[#0b83ff]/5 border-[#0b83ff] text-blue-900 shadow-sm' 
                    : 'bg-white border-slate-200/60 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs">{role.name}</span>
                  <span className="text-[9px] text-slate-400 font-bold bg-slate-50 border border-slate-100 rounded px-1.5 py-0.5">{role.usersCount} users</span>
                </div>
                <p className="text-[10px] text-slate-450 font-semibold mt-1.5 leading-snug">{role.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Permission Matrix */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden space-y-2">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-sm text-slate-800">Permission Matrix - {selectedRole}</h3>
              <p className="text-[10px] text-slate-400 mt-0.5 font-bold">Manage module capabilities for this role rank</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleDeleteRole(selectedRole)}
                className="inline-flex items-center gap-1.5 border border-rose-200 bg-rose-50/50 text-[10px] font-bold py-2 px-3.5 rounded-xl text-rose-700 hover:bg-rose-50"
              >
                <Trash2 size={12} />
                Delete Role
              </button>

              <button
                onClick={() => triggerToast('Permissions updated successfully!')}
                className="inline-flex items-center gap-1.5 bg-[#0b83ff] hover:bg-[#0070e0] text-[10px] font-bold py-2 px-3.5 rounded-xl text-white shadow shadow-blue-500/10"
              >
                <Save size={12} />
                Save Changes
              </button>
            </div>
          </div>

          {/* Matrix table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider bg-slate-50/10">
                  <th className="py-4 px-6">System Module</th>
                  <th className="py-4 px-4 text-center">Read</th>
                  <th className="py-4 px-4 text-center">Write</th>
                  <th className="py-4 px-4 text-center">Delete</th>
                  <th className="py-4 px-4 text-center">Export</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                {permissions[selectedRole] && MODULES.map((mod) => {
                  const mPerm = permissions[selectedRole][mod.key] || { read: false, write: false, delete: false, export: false };
                  return (
                    <tr key={mod.key} className="hover:bg-slate-50/20">
                      <td className="py-4 px-6 font-bold text-slate-800">{mod.label}</td>
                      
                      {/* Read */}
                      <td className="py-4 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleTogglePermission(mod.key, 'read')}
                          className="focus:outline-none"
                        >
                          {mPerm.read ? <CheckSquare size={16} className="text-blue-600 mx-auto" /> : <Square size={16} className="text-slate-300 mx-auto" />}
                        </button>
                      </td>

                      {/* Write */}
                      <td className="py-4 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleTogglePermission(mod.key, 'write')}
                          className="focus:outline-none"
                        >
                          {mPerm.write ? <CheckSquare size={16} className="text-blue-600 mx-auto" /> : <Square size={16} className="text-slate-300 mx-auto" />}
                        </button>
                      </td>

                      {/* Delete */}
                      <td className="py-4 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleTogglePermission(mod.key, 'delete')}
                          className="focus:outline-none"
                        >
                          {mPerm.delete ? <CheckSquare size={16} className="text-blue-600 mx-auto" /> : <Square size={16} className="text-slate-300 mx-auto" />}
                        </button>
                      </td>

                      {/* Export */}
                      <td className="py-4 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleTogglePermission(mod.key, 'export')}
                          className="focus:outline-none"
                        >
                          {mPerm.export ? <CheckSquare size={16} className="text-blue-600 mx-auto" /> : <Square size={16} className="text-slate-300 mx-auto" />}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Role Modal */}
      {showAddRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-slate-105">
              <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
                <Shield size={18} className="text-purple-650" />
                Create Custom RBAC Role
              </h3>
              <button onClick={() => setShowAddRole(false)} className="text-slate-400 hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateRole} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Role Name</label>
                <input
                  type="text"
                  required
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="e.g. Auditor"
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-purple-600 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-705 uppercase mb-1.5">Description details</label>
                <textarea
                  rows={3}
                  value={newRoleDesc}
                  onChange={(e) => setNewRoleDesc(e.target.value)}
                  placeholder="Summarize access details..."
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-purple-600 font-semibold leading-relaxed"
                />
              </div>

              <div className="flex gap-3 pt-4 justify-end border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddRole(false)}
                  className="py-2.5 px-4 border border-slate-200 text-slate-650 bg-white hover:bg-slate-50 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow"
                >
                  Create & Matrix
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default SuperAdminRoles;
