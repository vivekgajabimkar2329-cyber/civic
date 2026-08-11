import React, { useState } from 'react';
import { Map, Search, Filter, MapPin, AlertTriangle, ArrowRight } from 'lucide-react';
import { nearbyComplaintsData, categoryData } from '../../common/data/mockData';
import { Link } from 'react-router-dom';

const NearbyComplaints = () => {
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterDistance, setFilterDistance] = useState('1 mile');

  // Filter logic (mock)
  const filteredData = nearbyComplaintsData.filter(item => {
    if (filterCategory !== 'All' && item.category !== filterCategory) return false;
    return true;
  });

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6 -m-2">
      
      {/* Sidebar - List & Filters */}
      <div className="w-full lg:w-96 flex flex-col h-full bg-white border-r" style={{ borderColor: 'var(--color-gov-border)' }}>
        
        {/* Filters Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Nearby Issues</h2>
          
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input 
                type="text" 
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[#005EA5] outline-none"
                placeholder="Search issues..."
              />
            </div>
            
            <div className="flex gap-2">
              <select 
                className="flex-1 text-sm border border-gray-300 rounded-md px-2 py-2 outline-none focus:border-[#005EA5]"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categoryData.map(c => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
              
              <select 
                className="w-28 text-sm border border-gray-300 rounded-md px-2 py-2 outline-none focus:border-[#005EA5]"
                value={filterDistance}
                onChange={(e) => setFilterDistance(e.target.value)}
              >
                <option value="0.5 miles">0.5 mi</option>
                <option value="1 mile">1 mi</option>
                <option value="5 miles">5 mi</option>
              </select>
            </div>
          </div>
        </div>

        {/* List of Complaints */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
            Showing {filteredData.length} issues
          </p>
          
          {filteredData.length > 0 ? (
            filteredData.map(complaint => (
              <div key={complaint.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:border-blue-300 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 group-hover:text-[#005EA5] transition-colors">{complaint.title}</h3>
                  <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${
                    complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                    complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {complaint.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-3">
                  <span className="flex items-center gap-1"><MapPin size={14} className="text-gray-400" /> {complaint.distance}</span>
                  <span className="flex items-center gap-1"><AlertTriangle size={14} className="text-gray-400" /> {complaint.category}</span>
                </div>
                <Link to={`/citizen/complaint/${complaint.id}`} className="text-xs font-bold text-[#005EA5] hover:underline flex items-center gap-1">
                  View Details <ArrowRight size={12} />
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              <Map size={32} className="mx-auto mb-2 opacity-50" />
              <p>No issues found matching your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Large Interactive Map Placeholder */}
      <div className="flex-1 bg-gray-200 relative overflow-hidden hidden lg:flex rounded-l-xl shadow-inner border-l border-gray-300">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none"></div>
        
        {/* Mock Pins */}
        {filteredData.map((complaint, i) => {
          // Dummy positioning just for the visual placeholder
          const top = 30 + (i * 20) + '%';
          const left = 40 + (i * 15 > 40 ? -20 : i * 15) + '%';
          
          return (
            <div 
              key={complaint.id} 
              className="absolute group"
              style={{ top, left }}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer transition-transform group-hover:scale-110 ${
                complaint.status === 'Resolved' ? 'bg-green-600' :
                complaint.status === 'In Progress' ? 'bg-blue-600' :
                'bg-orange-500'
              }`}>
                <MapPin size={18} />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white p-2 rounded shadow-xl border border-gray-200 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                <p className="font-bold text-sm text-gray-900 truncate">{complaint.title}</p>
                <p className="text-xs text-gray-500">{complaint.status}</p>
              </div>
            </div>
          )
        })}

        {/* Map Center User Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-[0_0_0_4px_rgba(37,99,235,0.2)]"></div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap bg-gray-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            Your Location
          </div>
        </div>

        {/* Map Overlay Controls */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
          <button className="w-10 h-10 bg-white rounded shadow border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 font-bold text-lg">+</button>
          <button className="w-10 h-10 bg-white rounded shadow border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 font-bold text-lg">-</button>
        </div>
        
        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-3 rounded shadow border border-gray-200">
          <h4 className="text-xs font-bold text-gray-700 uppercase mb-2">Map Legend</h4>
          <div className="space-y-1 text-xs font-medium text-gray-600">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500 inline-block"></span> Pending</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span> In Progress</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-600 inline-block"></span> Resolved</div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default NearbyComplaints;
