import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileText, AlertTriangle, CheckCircle, Clock, Search, ChevronDown, Plus, Eye } from 'lucide-react';
import { initialComplaints, weeklyChartData, categoryData } from '../../data/mockData';

const AdminDashboard = () => {
  const [complaints] = useState(initialComplaints.slice(0, 3)); // Just show recent 3 for dashboard

  // KPI Cards Data based on image
  const kpis = [
    { title: 'Total Complaints', value: '12,450', change: '+ 12.5%', isUp: true, icon: FileText, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { title: 'Pending Complaints', value: '3,120', change: '+ 8.2%', isUp: true, icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50' },
    { title: 'In Progress', value: '1,840', change: '+ 5.1%', isUp: true, icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Resolved', value: '7,490', change: '+ 15.3%', isUp: true, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
    { title: "Today's Reports", value: '84', change: '+ 7.3%', isUp: true, icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Welcome back, Admin! <span className="text-xl">👋</span>
          </h1>
          <p className="text-gray-500 mt-1">Here's what's happening in your system today.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50">
          <span className="text-sm text-gray-700">May 20, 2025</span>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${kpi.bg}`}>
                  <Icon size={20} className={kpi.color} />
                </div>
                <h3 className="text-sm font-medium text-gray-500">{kpi.title}</h3>
              </div>
              <div className="flex items-end justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{kpi.value}</h2>
                <div className={`flex items-center text-sm font-medium ${kpi.isUp ? 'text-green-500' : 'text-red-500'}`}>
                  <span>{kpi.change}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Analytics Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Weekly Complaint Analytics</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Complaint Category Distribution</h3>
          <div className="flex-1 flex flex-col xl:flex-row items-center justify-center gap-6">
            <div className="h-48 w-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-gray-900">12,450</span>
                <span className="text-xs text-gray-500">Total</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 w-full xl:w-auto">
              {categoryData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-600 truncate max-w-[120px]" title={item.name}>{item.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Complaints Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Recent Complaints</h3>
            <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors">
              View All
            </button>
          </div>
          <div className="overflow-x-auto flex-1 p-6 pt-0">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500 border-b border-gray-100">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">Department</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {complaints.map((item) => (
                  <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 text-gray-500">{item.id}</td>
                    <td className="py-4 font-medium text-gray-900">{item.title}</td>
                    <td className="py-4 text-gray-600">{item.department}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        item.status === 'Pending' ? 'bg-orange-50 text-orange-600' :
                        item.status === 'In Progress' ? 'bg-blue-50 text-blue-600' :
                        'bg-green-50 text-green-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-500">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="flex flex-col gap-3">
            <button className="w-full flex items-center gap-3 bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-xl transition-colors shadow-sm shadow-indigo-200">
              <Plus size={20} />
              <span className="font-medium">Add New Complaint</span>
            </button>
            <button className="w-full flex items-center gap-3 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 p-4 rounded-xl transition-colors">
              <Eye size={20} />
              <span className="font-medium">View All Complaints</span>
            </button>
            <button className="w-full flex items-center gap-3 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 p-4 rounded-xl transition-colors mt-auto">
              <FileText size={20} />
              <span className="font-medium">Generate Report</span>
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AdminDashboard;
