import React from 'react';
import ValidationMessage from './ValidationMessage';
import ValidationBadge from './ValidationBadge';
import CharacterCounter from './CharacterCounter';
import AIAssistant from './AIAssistant';
import LocationPicker from './LocationPicker';

const IssueForm = ({ formData, setFormData, errors, addToast }) => {

  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toTimeString().split(' ')[0].substring(0,5);

  const handleAIApply = (suggestion) => {
    setFormData({
      ...formData,
      title: suggestion.title,
      department: suggestion.department,
      category: suggestion.category,
      priority: suggestion.priority
    });
    addToast('AI suggestions applied successfully!', 'success');
  };

  const handleTitleChange = (e) => {
    // Auto-capitalize first letter
    let val = e.target.value;
    if (val.length === 1) val = val.toUpperCase();
    setFormData({...formData, title: val});
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      
      <AIAssistant 
        description={formData.description}
        onApply={handleAIApply}
        onDismiss={() => {}}
      />

      <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Basic Details</h3>
        
        <div className="relative">
          <label className="block text-sm font-bold text-gray-700 mb-2">Detailed Description <span className="text-red-500">*</span></label>
          <textarea 
            rows="5" 
            maxLength={1000}
            className={`w-full px-4 py-3 pr-10 border ${errors.description ? 'border-red-500 focus:ring-red-500 bg-red-50' : formData.description.length >= 20 ? 'border-green-300 bg-green-50/30' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-lg focus:ring-2 outline-none resize-none transition-all duration-300`}
            placeholder="Please describe the issue in detail..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          ></textarea>
          <ValidationBadge show={formData.description.length > 0} isValid={formData.description.length >= 20} />
          
          <CharacterCounter current={formData.description.length} min={20} max={1000} />
          <ValidationMessage message={errors.description} />
        </div>

        <div className="relative">
          <label className="block text-sm font-bold text-gray-700 mb-2">Issue Title <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            maxLength={100}
            className={`w-full px-4 py-3 pr-10 border ${errors.title ? 'border-red-500 focus:ring-red-500 bg-red-50' : formData.title ? 'border-green-300 bg-green-50/30' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-lg focus:ring-2 outline-none transition-all duration-300`}
            placeholder="e.g. Large pothole on Main St."
            value={formData.title}
            onChange={handleTitleChange}
          />
          <ValidationBadge show={formData.title.length > 0} isValid={formData.title.trim().length > 0} />
          
          <CharacterCounter current={formData.title.length} min={1} max={100} />
          <ValidationMessage message={errors.title} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-2">Department <span className="text-red-500">*</span></label>
            <select 
              className={`w-full px-4 py-3 pr-10 border ${errors.department ? 'border-red-500 focus:ring-red-500 bg-red-50' : formData.department ? 'border-green-300 bg-green-50/30' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-lg focus:ring-2 outline-none transition-all duration-300`}
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
            >
              <option value="">Select Department</option>
              <option value="Roads & Infrastructure">Roads & Infrastructure</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Drainage">Drainage</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Street Lights">Street Lights</option>
              <option value="Electricity">Electricity</option>
              <option value="Traffic">Traffic</option>
              <option value="Public Parks">Public Parks</option>
              <option value="Garbage Collection">Garbage Collection</option>
              <option value="Others">Others</option>
            </select>
            <ValidationBadge show={true} isValid={!!formData.department} />
            <ValidationMessage message={errors.department} />
          </div>

          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-2">Category <span className="text-red-500">*</span></label>
            <select 
              className={`w-full px-4 py-3 pr-10 border ${errors.category ? 'border-red-500 focus:ring-red-500 bg-red-50' : formData.category ? 'border-green-300 bg-green-50/30' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-lg focus:ring-2 outline-none transition-all duration-300`}
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="">Select Category</option>
              <option value="Broken Road">Broken Road</option>
              <option value="Potholes">Potholes</option>
              <option value="Garbage">Garbage</option>
              <option value="Street Light">Street Light</option>
              <option value="Water Leakage">Water Leakage</option>
              <option value="Sewage">Sewage</option>
              <option value="Illegal Parking">Illegal Parking</option>
              <option value="Others">Others</option>
            </select>
            <ValidationBadge show={true} isValid={!!formData.category} />
            <ValidationMessage message={errors.category} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-2">Date <span className="text-red-500">*</span></label>
            <input 
              type="date"
              max={today}
              className={`w-full px-4 py-3 pr-10 border ${errors.date ? 'border-red-500 focus:ring-red-500 bg-red-50' : formData.date ? 'border-green-300 bg-green-50/30' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-lg focus:ring-2 outline-none transition-all duration-300`}
              value={formData.date || today}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
            <ValidationBadge show={true} isValid={!!formData.date} />
            <ValidationMessage message={errors.date} />
          </div>
          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-2">Time <span className="text-red-500">*</span></label>
            <input 
              type="time"
              className={`w-full px-4 py-3 pr-10 border ${errors.time ? 'border-red-500 focus:ring-red-500 bg-red-50' : formData.time ? 'border-green-300 bg-green-50/30' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-lg focus:ring-2 outline-none transition-all duration-300`}
              value={formData.time || now}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
            />
            <ValidationBadge show={true} isValid={!!formData.time} />
            <ValidationMessage message={errors.time} />
          </div>
        </div>
      </div>

      <LocationPicker formData={formData} setFormData={setFormData} errors={errors} addToast={addToast} />

    </div>
  );
};

export default IssueForm;
