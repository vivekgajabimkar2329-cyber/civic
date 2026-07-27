import React from 'react';
import { AlertTriangle, Mic, Image as ImageIcon, MapPin, Edit3 } from 'lucide-react';

const ReviewCard = ({ formData, setStep }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-end border-b pb-4">
        <h2 className="text-xl font-bold text-gray-900">Step 4: Review & Submit</h2>
        <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Summary</span>
      </div>
      
      <div className="bg-white rounded-xl p-6 border shadow-sm space-y-6" style={{ borderColor: 'var(--color-gov-border)' }}>
        
        {/* Issue Details Section */}
        <div className="relative">
          <button onClick={() => setStep(1)} className="absolute right-0 top-0 text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors">
            <Edit3 size={18} />
          </button>
          <div className="pr-8">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Issue Details</h4>
            <p className="text-gray-900 font-extrabold text-xl mb-3">{formData.title}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wide">Department</span>
                <span className="font-medium text-gray-800">{formData.department}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wide">Category</span>
                <span className="font-medium text-gray-800">{formData.category}</span>
              </div>
            </div>
            
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Description</span>
              <p className="text-gray-700 bg-gray-50 p-4 border border-gray-100 rounded-lg text-sm leading-relaxed whitespace-pre-wrap">
                {formData.description}
              </p>
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Location Section */}
        <div className="relative">
          <button onClick={() => setStep(1)} className="absolute right-0 top-0 text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors">
            <Edit3 size={18} />
          </button>
          <div className="pr-8">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1">
              <MapPin size={14} /> Location
            </h4>
            <p className="font-medium text-gray-800">{formData.address}</p>
            <p className="text-sm text-gray-600 mt-1">
              {formData.landmark && <span className="mr-3">Landmark: {formData.landmark}</span>}
              <span>Pincode: {formData.pincode}</span>
            </p>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Priority & Evidence Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          <div className="relative pr-8">
            <button onClick={() => setStep(3)} className="absolute right-0 top-0 text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors">
              <Edit3 size={18} />
            </button>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Priority</h4>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${
              formData.priority === 'High' ? 'bg-red-100 text-red-700' :
              formData.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
              'bg-green-100 text-green-700'
            }`}>
              {formData.priority === 'High' && <AlertTriangle size={14} />}
              {formData.priority}
            </span>
          </div>

          <div className="relative pr-8 border-l border-gray-100 pl-6">
            <button onClick={() => setStep(2)} className="absolute right-0 top-0 text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors">
              <Edit3 size={18} />
            </button>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Evidence Attached</h4>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <ImageIcon size={16} className="text-gray-400" /> 
                {formData.images.length} {formData.images.length === 1 ? 'Photo' : 'Photos'}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Mic size={16} className={formData.hasAudio ? 'text-blue-500' : 'text-gray-400'} />
                {formData.hasAudio ? 'Voice Note Included' : 'No Voice Note'}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReviewCard;
