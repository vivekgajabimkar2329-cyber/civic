import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Clock, FileText, User, AlertTriangle, 
  Paperclip, MessageSquare, Image as ImageIcon, Send 
} from 'lucide-react';
import { initialComplaints } from '../../data/mockData';

const ComplaintDetails = () => {
  const { id } = useParams();
  
  // Find complaint or use default if id doesn't exist
  const complaint = initialComplaints.find(c => c.id === id) || initialComplaints[0];

  return (
    <div className="max-w-5xl mx-auto">
      
      <div className="mb-6">
        <Link to="/citizen/track-complaint" className="inline-flex items-center gap-2 text-sm font-bold text-[#005EA5] hover:underline mb-4">
          <ArrowLeft size={16} /> Back to Tracking
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{complaint.title}</h1>
            <p className="text-gray-500 font-medium mt-1">Complaint Reference: {complaint.id} • Submitted {complaint.date}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider self-start md:self-auto ${
            complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
            complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
            'bg-orange-100 text-orange-800'
          }`}>
            Status: {complaint.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-xl border shadow-sm p-6 sm:p-8" style={{ borderColor: 'var(--color-gov-border)' }}>
            <h2 className="text-xl font-bold text-gray-900 border-b pb-4 mb-6">Issue Summary</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><FileText size={14}/> Dept</h4>
                <p className="font-bold text-gray-900">{complaint.department}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><AlertTriangle size={14}/> Priority</h4>
                <p className="font-bold text-gray-900">{complaint.priority}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><User size={14}/> Officer</h4>
                <p className="font-bold text-gray-900">Mark Davis</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Clock size={14}/> Est. Fix</h4>
                <p className="font-bold text-gray-900">May 25, 2025</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Detailed Description</h4>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
                {complaint.description} This has been causing issues for several days. Please look into this as soon as possible to avoid further problems.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Attachments Provided</h4>
              <div className="flex flex-wrap gap-4">
                <div className="border border-gray-200 rounded-lg p-3 flex items-center gap-3 w-48 bg-gray-50">
                  <div className="bg-blue-100 p-2 rounded">
                    <ImageIcon size={20} className="text-blue-600" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-gray-900 truncate">photo_1.jpg</p>
                    <p className="text-xs text-gray-500">2.4 MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--color-gov-border)' }}>
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <MessageSquare size={18} /> Public Comments & Officer Notes
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Officer Note */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <User size={20} className="text-blue-600" />
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-lg rounded-tl-none p-4 w-full">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-blue-900 text-sm">Mark Davis (Officer)</span>
                    <span className="text-xs text-blue-600">May 21, 2025 - 10:30 AM</span>
                  </div>
                  <p className="text-sm text-blue-800">I have visited the site and assessed the damage. We will need a specialized crew. I have scheduled them for Thursday.</p>
                </div>
              </div>

              {/* Citizen Note */}
              <div className="flex gap-4 flex-row-reverse">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                  <User size={20} className="text-gray-600" />
                </div>
                <div className="bg-gray-100 border border-gray-200 rounded-lg rounded-tr-none p-4 w-full text-right">
                  <div className="flex justify-between items-center mb-1 flex-row-reverse">
                    <span className="font-bold text-gray-900 text-sm">{complaint.citizen}</span>
                    <span className="text-xs text-gray-500">May 21, 2025 - 11:15 AM</span>
                  </div>
                  <p className="text-sm text-gray-700">Thank you for the update. Looking forward to it being fixed.</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-2">
              <input 
                type="text" 
                placeholder="Add a comment..." 
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-[#005EA5]"
              />
              <button className="bg-[#003078] text-white px-4 py-2 rounded-md hover:bg-[#002255] transition-colors flex items-center gap-2">
                <Send size={16} /> Send
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Timeline */}
          <div className="bg-white rounded-xl border shadow-sm p-6" style={{ borderColor: 'var(--color-gov-border)' }}>
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Resolution Timeline</h3>
            <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
              {complaint.status === 'Resolved' && (
                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-green-500 ring-4 ring-white"></div>
                  <p className="font-bold text-gray-900 text-sm">Resolved</p>
                  <p className="text-xs text-gray-400 mt-1">May 23, 2025</p>
                </div>
              )}
              {(complaint.status === 'In Progress' || complaint.status === 'Resolved') && (
                <div className="relative pl-6">
                  <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full ${complaint.status === 'Resolved' ? 'bg-gray-300' : 'bg-blue-500'} ring-4 ring-white`}></div>
                  <p className="font-bold text-gray-900 text-sm">In Progress</p>
                  <p className="text-xs text-gray-400 mt-1">May 21, 2025</p>
                </div>
              )}
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-300 ring-4 ring-white"></div>
                <p className="font-bold text-gray-900 text-sm">Assigned</p>
                <p className="text-xs text-gray-400 mt-1">May 20, 2025</p>
              </div>
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-300 ring-4 ring-white"></div>
                <p className="font-bold text-gray-900 text-sm">Submitted</p>
                <p className="text-xs text-gray-400 mt-1">{complaint.date}</p>
              </div>
            </div>
          </div>

          {/* Map Location */}
          <div className="bg-white rounded-xl border shadow-sm p-6" style={{ borderColor: 'var(--color-gov-border)' }}>
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Location</h3>
            <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden border border-gray-300">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
              <div className="z-10 flex flex-col items-center text-[#D4351C]">
                <MapPin size={32} className="drop-shadow-md" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3 flex items-start gap-2 font-medium">
              <MapPin size={16} className="shrink-0 mt-0.5 text-gray-400" />
              Approximate location based on submission data
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
