import React, { useState, useMemo, useEffect } from 'react';
import {
  Building2,
  Users,
  FileText,
  AlertTriangle,
  Brain,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Calendar,
  Clock,
  ChevronDown,
  Compass,
  Download,
  TrendingUp,
  TrendingDown,
  Settings,
  Bot,
  MapPin,
  X
} from 'lucide-react';

// Mock Initial Departments Data
const INITIAL_DEPARTMENTS = [
  {
    id: 1,
    name: 'Traffic Department',
    municipality: 'Hubballi',
    headOfficer: 'Rajesh Kumar',
    trafficIssues: 148,
    roadPotholes: 12,
    garbageIssues: 3,
    waterScarcity: 1,
    openComplaints: 164,
    status: 'Active',
    lastUpdated: '5 mins ago'
  },
  {
    id: 2,
    name: 'Road Maintenance',
    municipality: 'Dharwad',
    headOfficer: 'Anita Desai',
    trafficIssues: 6,
    roadPotholes: 231,
    garbageIssues: 4,
    waterScarcity: 2,
    openComplaints: 243,
    status: 'Active',
    lastUpdated: '2 mins ago'
  },
  {
    id: 3,
    name: 'Waste Management',
    municipality: 'Belagavi',
    headOfficer: 'Suresh Patil',
    trafficIssues: 3,
    roadPotholes: 5,
    garbageIssues: 387,
    waterScarcity: 6,
    openComplaints: 401,
    status: 'Active',
    lastUpdated: 'Just now'
  },
  {
    id: 4,
    name: 'Water Supply',
    municipality: 'Karwar',
    headOfficer: 'Priya Sharma',
    trafficIssues: 2,
    roadPotholes: 8,
    garbageIssues: 4,
    waterScarcity: 298,
    openComplaints: 312,
    status: 'Critical',
    lastUpdated: '1 min ago'
  },
  {
    id: 5,
    name: 'Municipal Corporation',
    municipality: 'Mangaluru',
    headOfficer: 'Vikram Shetty',
    trafficIssues: 17,
    roadPotholes: 45,
    garbageIssues: 92,
    waterScarcity: 31,
    openComplaints: 185,
    status: 'Active',
    lastUpdated: '3 mins ago'
  },
  {
    id: 6,
    name: 'Smart City Cell',
    municipality: 'Bengaluru',
    headOfficer: 'Arjun Rao',
    trafficIssues: 68,
    roadPotholes: 52,
    garbageIssues: 40,
    waterScarcity: 18,
    openComplaints: 178,
    status: 'Active',
    lastUpdated: 'Live'
  },
  {
    id: 7,
    name: 'Public Works Department',
    municipality: 'Mysuru',
    headOfficer: 'Kavya Nair',
    trafficIssues: 24,
    roadPotholes: 171,
    garbageIssues: 12,
    waterScarcity: 9,
    openComplaints: 216,
    status: 'Active',
    lastUpdated: 'Live'
  },
  {
    id: 8,
    name: 'Sanitation Department',
    municipality: 'Shivamogga',
    headOfficer: 'Meera Joshi',
    trafficIssues: 4,
    roadPotholes: 6,
    garbageIssues: 248,
    waterScarcity: 3,
    openComplaints: 261,
    status: 'Active',
    lastUpdated: 'Live'
  }
];

// Mock Map Coordinates for Karnataka municipalities
const MAP_MUNICIPALITIES = [
  { name: 'Karwar', type: 'Water Scarcity', severity: 'High', x: '10%', y: '40%' },
  { name: 'Hubballi', type: 'Traffic Issues', severity: 'Medium', x: '25%', y: '15%' },
  { name: 'Dharwad', type: 'Potholes Reported', severity: 'High', x: '35%', y: '25%' },
  { name: 'Shivamogga', type: 'Garbage Issues', severity: 'Medium', x: '32%', y: '60%' },
  { name: 'Bengaluru', type: 'Moderate', severity: 'Low', x: '60%', y: '70%' },
  { name: 'Mangaluru', type: 'Moderate', severity: 'Low', x: '15%', y: '85%' },
  { name: 'Mysuru', type: 'Potholes Reported', severity: 'Medium', x: '45%', y: '80%' }
];

const Departments = () => {
  const [departmentsList, setDepartmentsList] = useState(INITIAL_DEPARTMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [municipalityFilter, setMunicipalityFilter] = useState('All Municipalities');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentTime, setCurrentTime] = useState('10:30 AM');
  const [currentDate, setCurrentDate] = useState('29 May 2025');

  // Form states for adding department
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptMunicipality, setNewDeptMunicipality] = useState('Hubballi');
  const [newDeptHead, setNewDeptHead] = useState('');

  // Update clock dynamically
  useEffect(() => {
    const updateTime = () => {
      const dateObj = new Date();
      const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      const dateStr = dateObj.toLocaleDateString('en-GB', options);
      
      setCurrentTime(timeStr);
      setCurrentDate(dateStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Filtered departments data
  const filteredDepartments = useMemo(() => {
    return departmentsList.filter(dept => {
      const matchesSearch = 
        dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dept.municipality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dept.headOfficer.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesMunicipality = 
        municipalityFilter === 'All Municipalities' || 
        dept.municipality === municipalityFilter;
        
      const matchesStatus = 
        statusFilter === 'All Status' || 
        dept.status === statusFilter;

      return matchesSearch && matchesMunicipality && matchesStatus;
    });
  }, [departmentsList, searchQuery, municipalityFilter, statusFilter]);

  const handleAddDepartment = (e) => {
    e.preventDefault();
    if (!newDeptName.trim() || !newDeptHead.trim()) return;

    const newDept = {
      id: Date.now(),
      name: newDeptName,
      municipality: newDeptMunicipality,
      headOfficer: newDeptHead,
      trafficIssues: Math.floor(Math.random() * 50),
      roadPotholes: Math.floor(Math.random() * 100),
      garbageIssues: Math.floor(Math.random() * 120),
      waterScarcity: Math.floor(Math.random() * 40),
      openComplaints: Math.floor(Math.random() * 200) + 50,
      status: 'Active',
      lastUpdated: 'Just now'
    };

    setDepartmentsList([newDept, ...departmentsList]);
    setNewDeptName('');
    setNewDeptHead('');
    setShowAddModal(false);
  };

  return (
    <div className="py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Top Title & Quick Stats Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Departments Management</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage all municipal departments and monitor real-time civic issues.
          </p>
        </div>
        
        <div className="flex items-center flex-wrap gap-4">
          {/* Time & Date Display */}
          <div className="flex items-center gap-3 bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 shadow-sm text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3">
              <Calendar size={14} className="text-teal-800" />
              <span>{currentDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-teal-800" />
              <span>{currentTime}</span>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 bg-[#0b83ff] hover:bg-[#0070e0] text-white py-2.5 px-5 rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 transition-all focus:outline-none"
          >
            <Plus size={16} />
            Add Department
          </button>
        </div>
      </div>

      {/* Stats Dashboard Row (5 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Total Municipalities */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-start justify-between relative group hover:border-slate-350 transition-all duration-200">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Municipalities</span>
            <span className="text-3xl font-black text-slate-900 block leading-none">18</span>
            <span className="text-[10px] font-bold text-slate-400 block pt-1">Total Municipalities</span>
          </div>
          <div className="flex flex-col items-end justify-between h-full">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
              <Building2 size={20} />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center mt-4">
              <TrendingUp size={10} className="mr-0.5" /> 2 this month
            </span>
          </div>
        </div>

        {/* Active Departments */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-start justify-between relative group hover:border-slate-350 transition-all duration-200">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Departments</span>
            <span className="text-3xl font-black text-slate-900 block leading-none">42</span>
            <span className="text-[10px] font-bold text-slate-400 block pt-1">Across all municipalities</span>
          </div>
          <div className="flex flex-col items-end justify-between h-full">
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
              <Users size={20} />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center mt-4">
              <TrendingUp size={10} className="mr-0.5" /> 5 this month
            </span>
          </div>
        </div>

        {/* Open Complaints */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-start justify-between relative group hover:border-slate-350 transition-all duration-200">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Open Complaints</span>
            <span className="text-3xl font-black text-slate-900 block leading-none">1,286</span>
            <span className="text-[10px] font-bold text-slate-400 block pt-1">Across all departments</span>
          </div>
          <div className="flex flex-col items-end justify-between h-full">
            <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
              <FileText size={20} />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center mt-4">
              <TrendingUp size={10} className="mr-0.5" /> 12% from yesterday
            </span>
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-start justify-between relative group hover:border-slate-350 transition-all duration-200">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Critical Alerts</span>
            <span className="text-3xl font-black text-slate-900 block leading-none">37</span>
            <span className="text-[10px] font-bold text-slate-400 block pt-1">Require immediate action</span>
          </div>
          <div className="flex flex-col items-end justify-between h-full">
            <div className="p-2 bg-rose-50 rounded-xl text-rose-600">
              <AlertTriangle size={20} />
            </div>
            <span className="text-[10px] font-bold text-rose-600 flex items-center mt-4">
              <TrendingDown size={10} className="mr-0.5" /> 5 from yesterday
            </span>
          </div>
        </div>

        {/* AI Issue Detection */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-start justify-between relative group hover:border-slate-350 transition-all duration-200">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">AI Issue Detection</span>
            <span className="text-3xl font-black text-slate-900 block leading-none">96%</span>
            <span className="text-[10px] font-bold text-slate-400 block pt-1">Accuracy this month</span>
          </div>
          <div className="flex flex-col items-end justify-between h-full">
            <div className="p-2 bg-purple-50 rounded-xl text-purple-600">
              <Brain size={20} />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center mt-4">
              <TrendingUp size={10} className="mr-0.5" /> 8% from last month
            </span>
          </div>
        </div>
      </div>

      {/* Main Layout Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Area (Table + Map) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Table Container */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
            {/* Filter Bar */}
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
              <div className="relative flex-1 max-w-sm">
                <Search size={16} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search departments, municipalities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-xs py-2.5 pl-10 pr-4 rounded-xl outline-none focus:border-teal-800 transition-all font-medium text-slate-700"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Municipality Selector */}
                <select
                  value={municipalityFilter}
                  onChange={(e) => setMunicipalityFilter(e.target.value)}
                  className="bg-white border border-slate-200 text-xs py-2 px-3 rounded-xl outline-none focus:border-teal-800 font-bold text-slate-600 cursor-pointer appearance-none pr-8 relative"
                >
                  <option value="All Municipalities">All Municipalities</option>
                  <option value="Hubballi">Hubballi</option>
                  <option value="Dharwad">Dharwad</option>
                  <option value="Belagavi">Belagavi</option>
                  <option value="Karwar">Karwar</option>
                  <option value="Mangaluru">Mangaluru</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Mysuru">Mysuru</option>
                  <option value="Shivamogga">Shivamogga</option>
                </select>

                {/* Status Selector */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-white border border-slate-200 text-xs py-2 px-3 rounded-xl outline-none focus:border-teal-800 font-bold text-slate-600 cursor-pointer appearance-none pr-8"
                >
                  <option value="All Status">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Critical">Critical</option>
                </select>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 border border-slate-200 bg-white text-xs font-bold py-2.5 px-4 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors shadow-sm focus:outline-none"
                >
                  <Filter size={14} />
                  Filters
                </button>
              </div>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider bg-slate-50/20">
                    <th className="py-4 px-6">Department</th>
                    <th className="py-4 px-3">Municipality</th>
                    <th className="py-4 px-3">Head Officer</th>
                    <th className="py-4 px-3 text-center">Traffic Issues</th>
                    <th className="py-4 px-3 text-center">Road Potholes</th>
                    <th className="py-4 px-3 text-center">Garbage Issues</th>
                    <th className="py-4 px-3 text-center">Water Scarcity</th>
                    <th className="py-4 px-3 text-center">Open Complaints</th>
                    <th className="py-4 px-3 text-center">Status</th>
                    <th className="py-4 px-3">Last Updated</th>
                    <th className="py-4 px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {filteredDepartments.length > 0 ? (
                    filteredDepartments.map((dept) => (
                      <tr key={dept.id} className="hover:bg-slate-50/50 transition-colors">
                        {/* Department Name */}
                        <td className="py-4 px-6 flex items-center gap-3">
                          <div className={`p-1.5 rounded-lg ${
                            dept.status === 'Critical' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-600'
                          }`}>
                            <Building2 size={14} />
                          </div>
                          <span className="font-bold text-slate-900">{dept.name}</span>
                        </td>

                        {/* Municipality */}
                        <td className="py-4 px-3 text-slate-500 font-bold">{dept.municipality}</td>

                        {/* Head Officer */}
                        <td className="py-4 px-3 text-slate-800">{dept.headOfficer}</td>

                        {/* Traffic issues count */}
                        <td className="py-4 px-3 text-center">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                            dept.trafficIssues > 100 
                              ? 'bg-rose-50 text-rose-600' 
                              : dept.trafficIssues > 50 
                              ? 'bg-orange-50 text-orange-650' 
                              : 'bg-emerald-50 text-emerald-600'
                          }`}>
                            {dept.trafficIssues}
                          </span>
                        </td>

                        {/* Potholes count */}
                        <td className="py-4 px-3 text-center">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                            dept.roadPotholes > 200 
                              ? 'bg-rose-50 text-rose-600' 
                              : dept.roadPotholes > 100 
                              ? 'bg-orange-50 text-orange-650' 
                              : 'bg-emerald-50 text-emerald-600'
                          }`}>
                            {dept.roadPotholes}
                          </span>
                        </td>

                        {/* Garbage count */}
                        <td className="py-4 px-3 text-center">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                            dept.garbageIssues > 200 
                              ? 'bg-rose-50 text-rose-600' 
                              : dept.garbageIssues > 100 
                              ? 'bg-orange-50 text-orange-650' 
                              : 'bg-emerald-50 text-emerald-600'
                          }`}>
                            {dept.garbageIssues}
                          </span>
                        </td>

                        {/* Water count */}
                        <td className="py-4 px-3 text-center">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                            dept.waterScarcity > 200 
                              ? 'bg-rose-50 text-rose-600' 
                              : dept.waterScarcity > 100 
                              ? 'bg-orange-50 text-orange-650' 
                              : 'bg-emerald-50 text-emerald-600'
                          }`}>
                            {dept.waterScarcity}
                          </span>
                        </td>

                        {/* Total complaints */}
                        <td className="py-4 px-3 text-center font-black text-blue-600">{dept.openComplaints}</td>

                        {/* Status badge */}
                        <td className="py-4 px-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                            dept.status === 'Critical' 
                              ? 'bg-rose-50 border-rose-100 text-rose-700' 
                              : 'bg-emerald-50 border-emerald-100 text-emerald-700'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${dept.status === 'Critical' ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
                            {dept.status}
                          </span>
                        </td>

                        {/* Last Updated */}
                        <td className="py-4 px-3 text-slate-400 font-bold whitespace-nowrap">{dept.lastUpdated}</td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-center">
                          <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none">
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={11} className="py-8 text-center text-slate-400 font-bold">
                        No departments found matching the filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/20 text-slate-400 text-[10px] font-bold">
              Showing 1 to {filteredDepartments.length} of {filteredDepartments.length} departments
            </div>
          </div>

          {/* Map Overview Widget */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50/60 border-b border-slate-200/60 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800">Municipalities Overview</h3>
              <span className="text-[10px] text-teal-800 font-extrabold flex items-center gap-1"><Compass size={12}/> Live Status Monitoring</span>
            </div>

            <div className="p-4">
              {/* Karnataka Geography Grid Mock Map */}
              <div className="w-full h-80 bg-slate-100/50 rounded-xl border border-slate-200 relative overflow-hidden flex items-center justify-center">
                {/* stylized maps background details */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#003b78_1px,transparent_1px)] [background-size:20px_20px]"></div>
                
                {/* Coastal river block */}
                <div className="absolute top-0 bottom-0 left-0 w-24 bg-blue-150/40 border-r border-blue-200/35 transform -skew-x-12"></div>
                <div className="absolute left-6 top-1/2 text-[8px] font-black text-blue-500/50 select-none tracking-[0.2em] transform -rotate-90">ARABIAN SEA</div>
                
                {/* Map Pins loop */}
                {MAP_MUNICIPALITIES.map((pin) => (
                  <div
                    key={pin.name}
                    className="absolute group z-10"
                    style={{ left: pin.x, top: pin.y }}
                  >
                    <div className="relative flex flex-col items-center">
                      <MapPin className={`w-7 h-7 drop-shadow-md cursor-pointer transition-transform hover:scale-110 ${
                        pin.severity === 'High' 
                          ? 'text-rose-600' 
                          : pin.severity === 'Medium' 
                          ? 'text-orange-500' 
                          : 'text-emerald-500'
                      }`} />
                      
                      {/* Interactive Tooltip Card */}
                      <div className="absolute bottom-full mb-1 bg-slate-900 border border-slate-800 text-white rounded-lg p-2 shadow-xl hidden group-hover:block whitespace-nowrap z-20">
                        <p className="text-xs font-black">{pin.name}</p>
                        <p className="text-[9px] text-slate-300 font-semibold mt-0.5">{pin.type}</p>
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold mt-1 ${
                          pin.severity === 'High' ? 'bg-rose-500/20 text-rose-350' : pin.severity === 'Medium' ? 'bg-orange-500/20 text-orange-350' : 'bg-emerald-500/20 text-emerald-350'
                        }`}>
                          Severity: {pin.severity}
                        </span>
                      </div>
                      
                      {/* Name Label */}
                      <div className="bg-white border border-slate-200/60 shadow px-1.5 py-0.5 rounded-md text-[9px] font-bold text-slate-800 mt-1 whitespace-nowrap select-none">
                        {pin.name}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Map Controls */}
                <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 z-25">
                  <button type="button" className="w-7 h-7 rounded bg-white shadow-md border border-slate-200 text-xs font-bold text-slate-650 hover:bg-slate-50 flex items-center justify-center">+</button>
                  <button type="button" className="w-7 h-7 rounded bg-white shadow-md border border-slate-200 text-xs font-bold text-slate-650 hover:bg-slate-50 flex items-center justify-center">-</button>
                  <button type="button" className="w-7 h-7 rounded bg-white shadow-md border border-slate-200 text-xs font-bold text-slate-650 hover:bg-slate-50 flex items-center justify-center">
                    <Compass size={14} className="text-teal-800" />
                  </button>
                </div>

                {/* Map Legend */}
                <div className="absolute bottom-4 right-4 bg-white border border-slate-200 rounded-xl p-3 shadow-md z-25 min-w-[120px]">
                  <p className="text-[10px] font-black text-slate-800 uppercase tracking-wider mb-2">Issue Severity</p>
                  <ul className="space-y-1.5 text-[9px] font-bold text-slate-600">
                    <li className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                      <span>High</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                      <span>Medium</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>Low</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                      <span>No Issues</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Area (Sidebar Cards) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Card 1: Real-Time AI Insights */}
          <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-200/60 bg-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800">Real-Time AI Insights</h3>
              <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Live
              </span>
            </div>

            <div className="p-4 space-y-4">
              {[
                { text: 'Heavy traffic detected in Hubballi', time: '5 mins ago', bg: 'bg-rose-50 text-rose-650', icon: Clock },
                { text: 'Severe potholes reported in Dharwad', time: '8 mins ago', bg: 'bg-orange-50 text-orange-650', icon: AlertTriangle },
                { text: 'Garbage overflow in Belagavi', time: '10 mins ago', bg: 'bg-emerald-50 text-emerald-600', icon: Settings },
                { text: 'Water shortage alert in Karwar', time: '12 mins ago', bg: 'bg-blue-50 text-blue-650', icon: Compass },
                { text: 'Smart recommendations generated by Civic AI', time: '15 mins ago', bg: 'bg-purple-50 text-purple-650', icon: Brain }
              ].map((insight, idx) => {
                const Icon = insight.icon;
                return (
                  <div key={idx} className="flex gap-3 items-start border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                    <div className={`p-2 rounded-xl shrink-0 ${insight.bg}`}>
                      <Icon size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 leading-snug">{insight.text}</p>
                      <span className="text-[9px] text-slate-400 font-semibold mt-1 block">{insight.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 2: Issue Summary (Donut Chart) */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-800">Issue Summary (Today)</h3>
            
            {/* Donut Chart Graphics Representation using Pure CSS */}
            <div className="flex justify-center py-2">
              <div className="w-32 h-32 rounded-full border-[10px] border-emerald-500 relative flex items-center justify-center shadow">
                {/* Slice layers simulating donut graph segments */}
                <div className="absolute inset-[-10px] rounded-full border-[10px] border-rose-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 40%)' }}></div>
                <div className="absolute inset-[-10px] rounded-full border-[10px] border-orange-500" style={{ clipPath: 'polygon(50% 50%, 100% 40%, 100% 100%, 30% 100%)' }}></div>
                <div className="absolute inset-[-10px] rounded-full border-[10px] border-blue-500" style={{ clipPath: 'polygon(50% 50%, 30% 100%, 0% 100%, 0% 50%, 50% 0%)' }}></div>
                
                {/* Center text details */}
                <div className="bg-white w-24 h-24 rounded-full shadow flex flex-col items-center justify-center border border-slate-100">
                  <span className="text-lg font-black text-slate-800">1,956</span>
                  <span className="text-[8px] text-slate-450 font-bold uppercase tracking-wider">Total Issues</span>
                </div>
              </div>
            </div>

            {/* Chart Legends */}
            <ul className="space-y-2 text-[10px] font-bold text-slate-650">
              <li className="flex items-center justify-between border-b border-slate-50 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span>Traffic Issues</span>
                </div>
                <span className="text-slate-800">272 (21%)</span>
              </li>
              <li className="flex items-center justify-between border-b border-slate-50 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                  <span>Road Potholes</span>
                </div>
                <span className="text-slate-800">530 (41%)</span>
              </li>
              <li className="flex items-center justify-between border-b border-slate-50 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span>Garbage Issues</span>
                </div>
                <span className="text-slate-800">786 (30%)</span>
              </li>
              <li className="flex items-center justify-between pb-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span>Water Scarcity</span>
                </div>
                <span className="text-slate-800">368 (28%)</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Quick Actions */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-800">Quick Actions</h3>
            
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="w-full flex items-center gap-2.5 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200/60 p-3 rounded-xl hover:bg-slate-100/80 transition-colors select-none text-left focus:outline-none"
              >
                <Plus size={16} className="text-blue-600" />
                Add Department
              </button>

              <button
                type="button"
                className="w-full flex items-center gap-2.5 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200/60 p-3 rounded-xl hover:bg-slate-100/80 transition-colors select-none text-left focus:outline-none"
              >
                <FileText size={16} className="text-teal-700" />
                View All Complaints
              </button>

              <button
                type="button"
                className="w-full flex items-center gap-2.5 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200/60 p-3 rounded-xl hover:bg-slate-100/80 transition-colors select-none text-left focus:outline-none"
              >
                <Download size={16} className="text-emerald-700" />
                Generate Report
              </button>

              <button
                type="button"
                className="w-full flex items-center gap-2.5 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200/60 p-3 rounded-xl hover:bg-slate-100/80 transition-colors select-none text-left focus:outline-none"
              >
                <Bot size={16} className="text-purple-600" />
                AI Recommendations
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Department Form Modal Overlay */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
                <Building2 size={18} className="text-blue-650" />
                Add New Department
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-405 hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddDepartment} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-705 uppercase mb-1.5">Department Name</label>
                <input
                  type="text"
                  required
                  value={newDeptName}
                  onChange={(e) => setNewDeptName(e.target.value)}
                  placeholder="e.g. Health & Safety Division"
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-755 uppercase mb-1.5">Municipality</label>
                <select
                  value={newDeptMunicipality}
                  onChange={(e) => setNewDeptMunicipality(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-blue-600"
                >
                  <option value="Hubballi">Hubballi</option>
                  <option value="Dharwad">Dharwad</option>
                  <option value="Belagavi">Belagavi</option>
                  <option value="Karwar">Karwar</option>
                  <option value="Mangaluru">Mangaluru</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Mysuru">Mysuru</option>
                  <option value="Shivamogga">Shivamogga</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-755 uppercase mb-1.5">Head Officer</label>
                <input
                  type="text"
                  required
                  value={newDeptHead}
                  onChange={(e) => setNewDeptHead(e.target.value)}
                  placeholder="e.g. Ramesh Hegde"
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex gap-3 pt-4 justify-end border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-2.5 px-4 border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold shadow-sm"
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

export default Departments;
