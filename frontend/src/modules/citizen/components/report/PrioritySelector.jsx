import React from 'react';
import { CheckCircle } from 'lucide-react';
import ValidationMessage from './ValidationMessage';

const PrioritySelector = ({ formData, setFormData, error }) => {
  const priorities = [
    { value: 'Low', desc: 'Not causing immediate harm, non-urgent', time: 'Resolution est: 7-14 days' },
    { value: 'Medium', desc: 'Needs attention soon, moderate impact', time: 'Resolution est: 3-7 days' },
    { value: 'High', desc: 'Dangerous or blocking traffic, urgent', time: 'Resolution est: 24-48 hours' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Step 3: Priority Level</h2>
      
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-4">How urgent is this issue? <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {priorities.map(p => (
            <div 
              key={p.value}
              className={`border-2 rounded-xl p-5 cursor-pointer transition-all shadow-sm ${
                formData.priority === p.value 
                  ? 'border-[#005EA5] bg-blue-50 ring-2 ring-[#005EA5] ring-opacity-50' 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setFormData({...formData, priority: p.value})}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-extrabold text-lg ${formData.priority === p.value ? 'text-[#005EA5]' : 'text-gray-900'}`}>
                  {p.value}
                </span>
                {formData.priority === p.value && <CheckCircle size={22} className="text-[#005EA5]" />}
              </div>
              <p className="text-sm text-gray-600 font-medium leading-snug mb-3 min-h-[40px]">{p.desc}</p>
              <div className="pt-3 border-t border-gray-200/50 text-xs font-bold text-gray-500 tracking-wide uppercase">
                {p.time}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2">
          <ValidationMessage message={error} />
        </div>
      </div>
    </div>
  );
};

export default PrioritySelector;
