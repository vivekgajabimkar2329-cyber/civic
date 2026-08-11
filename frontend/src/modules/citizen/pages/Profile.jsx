import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, FileText, CheckCircle, Clock, Calendar } from 'lucide-react';
import { citizenProfile, initialComplaints } from '../../common/data/mockData';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: citizenProfile.name,
    email: citizenProfile.email,
    phone: citizenProfile.phone,
    address: citizenProfile.address,
  });

  const myComplaints = initialComplaints.filter(c => c.citizen === citizenProfile.name);

  const handleSave = () => {
    // In a real app, send updated profile to backend
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Citizen Profile</h1>
        <p className="text-gray-600 mt-2">Manage your personal information and view your activity summary.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Card */}
        <div className="bg-white rounded-xl border shadow-sm p-6" style={{ borderColor: 'var(--color-gov-border)' }}>
          <div className="flex flex-col items-center text-center pb-6 border-b border-gray-200">
            <div className="relative mb-4">
              <img 
                src={citizenProfile.avatar} 
                alt={profileData.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#005EA5] text-white rounded-full flex items-center justify-center border-2 border-white hover:bg-[#003078] transition-colors">
                <Edit2 size={14} />
              </button>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{profileData.name}</h2>
            <p className="text-sm font-medium text-gray-500 mt-1 flex items-center gap-1 justify-center">
              <CheckCircle size={14} className="text-green-500" /> Verified Citizen
            </p>
            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1 justify-center">
              <Calendar size={12} /> Member since {citizenProfile.joined}
            </p>
          </div>

          <div className="pt-6 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-900 uppercase text-xs tracking-wider">Contact Info</h3>
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-xs font-bold text-[#005EA5] hover:underline"
                >
                  Edit Details
                </button>
              ) : (
                <button 
                  onClick={handleSave}
                  className="text-xs font-bold bg-[#005EA5] text-white px-3 py-1 rounded hover:bg-[#003078]"
                >
                  Save Changes
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <Mail size={18} className="text-gray-400 shrink-0 mt-0.5" />
                {isEditing ? (
                  <input 
                    type="email" 
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full border border-gray-300 rounded px-2 py-1 outline-none focus:border-[#005EA5]"
                  />
                ) : (
                  <span className="font-medium text-gray-700">{profileData.email}</span>
                )}
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Phone size={18} className="text-gray-400 shrink-0 mt-0.5" />
                {isEditing ? (
                  <input 
                    type="text" 
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded px-2 py-1 outline-none focus:border-[#005EA5]"
                  />
                ) : (
                  <span className="font-medium text-gray-700">{profileData.phone}</span>
                )}
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="text-gray-400 shrink-0 mt-0.5" />
                {isEditing ? (
                  <textarea 
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    className="w-full border border-gray-300 rounded px-2 py-1 outline-none focus:border-[#005EA5] resize-none"
                    rows="2"
                  />
                ) : (
                  <span className="font-medium text-gray-700">{profileData.address}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats & Activity */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border shadow-sm text-center" style={{ borderColor: 'var(--color-gov-border)' }}>
              <div className="w-10 h-10 mx-auto bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-2">
                <FileText size={20} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">{citizenProfile.stats.totalReported}</h4>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Total Reported</p>
            </div>
            <div className="bg-white p-4 rounded-xl border shadow-sm text-center" style={{ borderColor: 'var(--color-gov-border)' }}>
              <div className="w-10 h-10 mx-auto bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-2">
                <CheckCircle size={20} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">{citizenProfile.stats.resolved}</h4>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Resolved</p>
            </div>
            <div className="bg-white p-4 rounded-xl border shadow-sm text-center" style={{ borderColor: 'var(--color-gov-border)' }}>
              <div className="w-10 h-10 mx-auto bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-2">
                <Clock size={20} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">{citizenProfile.stats.inProgress}</h4>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">In Progress</p>
            </div>
            <div className="bg-white p-4 rounded-xl border shadow-sm text-center" style={{ borderColor: 'var(--color-gov-border)' }}>
              <div className="w-10 h-10 mx-auto bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-2">
                <Clock size={20} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">{citizenProfile.stats.pending}</h4>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Pending</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--color-gov-border)' }}>
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              {myComplaints.length > 0 ? (
                <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
                  {myComplaints.slice(0, 4).map((complaint, index) => (
                    <div key={complaint.id} className="relative pl-6">
                      <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full ring-4 ring-white ${
                        complaint.status === 'Resolved' ? 'bg-green-500' :
                        complaint.status === 'In Progress' ? 'bg-blue-500' :
                        'bg-orange-500'
                      }`}></div>
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-1">
                        <p className="font-bold text-gray-900">Reported: {complaint.title}</p>
                        <span className="text-xs text-gray-400 font-medium">{complaint.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">Currently <span className="font-semibold text-gray-700">{complaint.status}</span> with the {complaint.department} department.</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No recent activity found.</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;
