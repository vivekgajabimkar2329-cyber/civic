import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, MapPin, Home, Plus } from 'lucide-react';

const SuccessDialog = ({ complaintId }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-[#005EA5] p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg text-[#005EA5]">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Report Submitted!</h2>
            <p className="text-blue-100 font-medium mt-2">Thank you for helping improve our community.</p>
          </div>
        </div>
        
        <div className="p-8">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8 text-center shadow-inner">
            <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Complaint ID</span>
            <span className="block text-2xl font-mono font-bold text-gray-900 tracking-wider bg-white py-2 border border-gray-200 rounded shadow-sm">{complaintId}</span>
            <span className="block text-sm text-green-700 font-bold mt-3">Expected Response: 24 - 48 Hours</span>
          </div>
          
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/citizen/track-complaint')}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#005EA5] hover:bg-[#004A85] text-white font-bold rounded-lg transition-colors shadow-sm"
            >
              <MapPin size={18} /> Track Complaint Status
            </button>
            <button 
              onClick={() => navigate('/citizen/dashboard')}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 font-bold rounded-lg transition-colors shadow-sm"
            >
              <Home size={18} /> Back to Dashboard
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-transparent hover:bg-gray-50 text-gray-600 font-bold rounded-lg transition-colors"
            >
              <Plus size={18} /> Report Another Issue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessDialog;
