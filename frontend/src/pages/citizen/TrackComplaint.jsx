import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, Clock, CheckCircle, AlertTriangle, User, FileText, ArrowRight } from 'lucide-react';
import { initialComplaints } from '../../data/mockData';

const TrackComplaint = () => {
  const [searchParams] = useSearchParams();
  const newSubmission = searchParams.get('new');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);
    
    // Simple dummy search logic
    if (searchQuery.trim() === '') {
      setResult(null);
      return;
    }

    const found = initialComplaints.find(c => 
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setResult(found || null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {newSubmission && (
        <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-start gap-4 mb-8">
          <CheckCircle className="text-green-600 shrink-0 mt-0.5" size={24} />
          <div>
            <h3 className="font-bold text-green-900 text-lg">Report Submitted Successfully!</h3>
            <p className="text-green-800 mt-1">
              Your issue has been logged. You can track its progress below. Your reference ID is <strong>#C-1250</strong>.
            </p>
          </div>
        </div>
      )}

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Track Your Complaint</h1>
        <p className="text-gray-600 text-lg">Enter your Complaint ID (e.g. C-1245) to view its current status, assigned officer, and recent updates.</p>
        
        <form onSubmit={handleSearch} className="mt-8 flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-0 focus:border-[#005EA5] outline-none text-lg transition-colors shadow-sm"
              placeholder="Enter Complaint ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="px-8 py-4 rounded-lg font-bold text-white transition-opacity hover:opacity-90 shadow-sm"
            style={{ backgroundColor: 'var(--color-gov-secondary)' }}
          >
            Track
          </button>
        </form>
      </div>

      {hasSearched && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {result ? (
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--color-gov-border)' }}>
              
              <div className="border-b border-gray-200 bg-gray-50/50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{result.title}</h2>
                  <p className="text-gray-500 font-medium mt-1 text-sm">Complaint ID: {result.id}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${
                  result.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                  result.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {result.status}
                </span>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Details Column */}
                <div className="md:col-span-2 space-y-8">
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-1"><FileText size={14}/> Department</h4>
                      <p className="font-bold text-gray-900">{result.department}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-1"><User size={14}/> Assigned Officer</h4>
                      <p className="font-bold text-gray-900">Mark Davis</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-1"><AlertTriangle size={14}/> Priority</h4>
                      <p className="font-bold text-gray-900">{result.priority}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-1"><Clock size={14}/> Expected Resolution</h4>
                      <p className="font-bold text-gray-900">May 25, 2025</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Timeline & Updates</h3>
                    
                    <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
                      
                      {result.status === 'Resolved' && (
                        <div className="relative pl-6">
                          <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-green-500 ring-4 ring-white"></div>
                          <p className="font-bold text-gray-900">Issue Resolved</p>
                          <p className="text-sm text-gray-600 mt-1">The department has confirmed the issue is fixed.</p>
                          <p className="text-xs text-gray-400 mt-1">May 23, 2025 - 2:00 PM</p>
                        </div>
                      )}

                      {(result.status === 'In Progress' || result.status === 'Resolved') && (
                        <div className="relative pl-6">
                          <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full ${result.status === 'Resolved' ? 'bg-gray-300' : 'bg-blue-500'} ring-4 ring-white`}></div>
                          <p className="font-bold text-gray-900">Work in Progress</p>
                          <p className="text-sm text-gray-600 mt-1">Officer Mark Davis is currently at the location addressing the issue.</p>
                          <p className="text-xs text-gray-400 mt-1">May 21, 2025 - 10:30 AM</p>
                        </div>
                      )}

                      <div className="relative pl-6">
                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-300 ring-4 ring-white"></div>
                        <p className="font-bold text-gray-900">Complaint Assigned</p>
                        <p className="text-sm text-gray-600 mt-1">Assigned to the {result.department} department.</p>
                        <p className="text-xs text-gray-400 mt-1">May 20, 2025 - 09:15 AM</p>
                      </div>

                      <div className="relative pl-6">
                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-300 ring-4 ring-white"></div>
                        <p className="font-bold text-gray-900">Complaint Submitted</p>
                        <p className="text-sm text-gray-600 mt-1">Complaint received by the system.</p>
                        <p className="text-xs text-gray-400 mt-1">{result.date} - 09:00 AM</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Link 
                      to={`/citizen/complaint/${result.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-200 font-bold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      View Full Details Page <ArrowRight size={18} />
                    </Link>
                  </div>

                </div>

                {/* Sidebar Column */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Location</h3>
                  <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden border border-gray-300">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                    <div className="z-10 flex flex-col items-center text-[#D4351C]">
                      <MapPin size={32} className="drop-shadow-md" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3 flex items-start gap-2 font-medium">
                    <MapPin size={16} className="shrink-0 mt-0.5 text-gray-400" />
                    Approx. location based on report data
                  </p>
                </div>

              </div>

            </div>
          ) : (
            <div className="bg-white border rounded-xl p-12 text-center shadow-sm" style={{ borderColor: 'var(--color-gov-border)' }}>
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">No results found</h2>
              <p className="text-gray-500 mt-2">We couldn't find a complaint matching that ID. Please check the ID and try again.</p>
              <div className="mt-6 flex justify-center gap-2 text-sm text-gray-500">
                <p>Try searching for: <button onClick={() => setSearchQuery('C-1245')} className="font-bold text-[#005EA5] hover:underline">C-1245</button></p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackComplaint;
