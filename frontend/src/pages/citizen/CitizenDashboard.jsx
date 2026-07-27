import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  MapPin, 
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Search,
  Map
} from 'lucide-react';
import { citizenProfile, initialComplaints } from '../../data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const CitizenDashboard = () => {
  // Use mock data
  const myComplaints = initialComplaints.filter(c => c.citizen === 'John Doe');
  
  const communityData = [
    { name: 'Jan', issues: 120 },
    { name: 'Feb', issues: 98 },
    { name: 'Mar', issues: 140 },
    { name: 'Apr', issues: 110 },
    { name: 'May', issues: 155 },
    { name: 'Jun', issues: 85 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-sm border p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6" style={{ borderColor: 'var(--color-gov-border)' }}>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Welcome, {citizenProfile.name}
          </h1>
          <p className="text-gray-600 max-w-2xl text-lg">
            Your centralized portal for interacting with city services. Report issues, track progress, and stay informed about your community.
          </p>
        </div>
        <Link 
          to="/citizen/report-issue"
          className="whitespace-nowrap flex items-center gap-2 text-white px-6 py-3 rounded-md font-bold text-lg hover:opacity-90 transition-opacity shadow-sm"
          style={{ backgroundColor: 'var(--color-gov-accent)' }}
        >
          <FileText size={20} />
          Report a New Issue
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Reported', value: citizenProfile.stats.totalReported, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Resolved', value: citizenProfile.stats.resolved, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'In Progress', value: citizenProfile.stats.inProgress, icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Pending', value: citizenProfile.stats.pending, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4" style={{ borderColor: 'var(--color-gov-border)' }}>
            <div className={`p-4 rounded-lg ${stat.bg}`}>
              <stat.icon size={28} className={stat.color} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - My Complaints */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--color-gov-border)' }}>
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900">My Recent Complaints</h2>
              <Link to="/citizen/track-complaint" className="text-sm font-semibold hover:underline" style={{ color: 'var(--color-gov-secondary)' }}>
                View All History
              </Link>
            </div>
            
            <div className="divide-y divide-gray-100">
              {myComplaints.length > 0 ? (
                myComplaints.map(complaint => (
                  <div key={complaint.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                      <h3 className="font-bold text-lg text-gray-900">{complaint.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                        complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {complaint.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1 font-medium"><MapPin size={16} className="text-gray-400" /> {complaint.department}</span>
                      <span className="flex items-center gap-1 font-medium"><Clock size={16} className="text-gray-400" /> Submitted on {complaint.date}</span>
                    </div>
                    
                    {/* Progress Bar (Visual indicator) */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
                      <div className={`h-2 rounded-full ${
                        complaint.status === 'Resolved' ? 'bg-green-600 w-full' :
                        complaint.status === 'In Progress' ? 'bg-blue-600 w-2/3' :
                        'bg-orange-500 w-1/3'
                      }`} />
                    </div>
                    
                    <Link 
                      to={`/citizen/complaint/${complaint.id}`}
                      className="inline-flex items-center gap-2 text-sm font-bold mt-2 hover:underline"
                      style={{ color: 'var(--color-gov-secondary)' }}
                    >
                      View full details <ArrowRight size={16} />
                    </Link>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-gray-500">
                  <CheckCircle size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-lg font-medium">You have no active complaints.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Community Chart */}
          <div className="bg-white rounded-xl border shadow-sm p-6" style={{ borderColor: 'var(--color-gov-border)' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Community Issue Resolution</h2>
                <p className="text-sm text-gray-500 mt-1">Issues resolved in your district over the last 6 months.</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={communityData}>
                  <defs>
                    <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-gov-secondary)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--color-gov-secondary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <RechartsTooltip />
                  <Area type="monotone" dataKey="issues" stroke="var(--color-gov-secondary)" strokeWidth={3} fillOpacity={1} fill="url(#colorIssues)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions & Notifications */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border shadow-sm p-6" style={{ borderColor: 'var(--color-gov-border)' }}>
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/citizen/nearby" className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                <div className="p-2 bg-gray-100 rounded-md group-hover:bg-blue-100 group-hover:text-blue-700 mr-3">
                  <Map size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">View Nearby Issues</h4>
                  <p className="text-xs text-gray-500">See what's happening around you</p>
                </div>
              </Link>
              <Link to="/citizen/track-complaint" className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                <div className="p-2 bg-gray-100 rounded-md group-hover:bg-blue-100 group-hover:text-blue-700 mr-3">
                  <Search size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Track by ID</h4>
                  <p className="text-xs text-gray-500">Check status using receipt number</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--color-gov-border)' }}>
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Announcements</h2>
              <AlertCircle size={18} className="text-gray-400" />
            </div>
            <div className="divide-y divide-gray-100">
              <div className="p-5 hover:bg-gray-50">
                <span className="text-[10px] font-bold uppercase text-red-600 bg-red-50 px-2 py-1 rounded">Urgent</span>
                <h4 className="font-bold text-sm text-gray-900 mt-2">Water Main Maintenance</h4>
                <p className="text-sm text-gray-600 mt-1">Scheduled outage in District 4 from 10 PM to 2 AM tonight.</p>
                <p className="text-xs text-gray-400 mt-2 font-medium">Posted 2 hrs ago</p>
              </div>
              <div className="p-5 hover:bg-gray-50">
                <span className="text-[10px] font-bold uppercase text-blue-600 bg-blue-50 px-2 py-1 rounded">Update</span>
                <h4 className="font-bold text-sm text-gray-900 mt-2">New Waste Collection Schedule</h4>
                <p className="text-sm text-gray-600 mt-1">Starting next week, organic waste will be collected on Tuesdays.</p>
                <p className="text-xs text-gray-400 mt-2 font-medium">Posted yesterday</p>
              </div>
            </div>
            <div className="border-t p-3 text-center">
              <Link to="/citizen/notifications" className="text-sm font-semibold hover:underline" style={{ color: 'var(--color-gov-secondary)' }}>
                View all notifications
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CitizenDashboard;
