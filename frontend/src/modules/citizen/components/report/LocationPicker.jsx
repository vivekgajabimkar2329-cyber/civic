import React, { useState } from 'react';
import { MapPin, Navigation, Map, Search } from 'lucide-react';
import ValidationMessage from './ValidationMessage';

const LocationPicker = ({ formData, setFormData, errors, addToast }) => {
  const [isLocating, setIsLocating] = useState(false);

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    
    if (!navigator.geolocation) {
      addToast('Geolocation is not supported by your browser', 'error');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Mock reverse geocoding success
        setTimeout(() => {
          setFormData({
            ...formData,
            address: '123 Smart City Blvd, Tech District',
            pincode: '400001',
            landmark: 'Near Central Park',
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          addToast('Location updated successfully', 'success');
          setIsLocating(false);
        }, 1000);
      },
      (error) => {
        let msg = 'Unable to retrieve location';
        if (error.code === 1) msg = 'Location access denied by user';
        addToast(msg, 'error');
        setIsLocating(false);
      }
    );
  };

  return (
    <div className="pt-2 border-t border-gray-100 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Location Details</h3>
        <button 
          type="button"
          onClick={handleUseCurrentLocation}
          disabled={isLocating}
          className="flex items-center gap-1.5 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
        >
          {isLocating ? <Navigation size={16} className="animate-pulse" /> : <Navigation size={16} />}
          {isLocating ? 'Locating...' : 'Use Current Location'}
        </button>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-bold text-gray-700 mb-2">Search Location on Map</label>
        <div className="relative flex group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input 
            type="text" 
            className="w-full pl-10 pr-24 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Search for an area or drag pin on map..."
          />
          <button 
            type="button" 
            className="absolute right-1 top-1 bottom-1 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-md transition-colors"
          >
            Find
          </button>
        </div>
        
        <div className="h-56 bg-gray-100 mt-3 rounded-xl flex items-center justify-center relative overflow-hidden border border-gray-300 shadow-inner cursor-pointer hover:bg-gray-50 transition-colors group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          {/* Mock Interactive Map Elements */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 z-20">
            <div className="w-8 h-8 bg-white rounded shadow flex items-center justify-center text-gray-600 font-bold hover:bg-gray-50">+</div>
            <div className="w-8 h-8 bg-white rounded shadow flex items-center justify-center text-gray-600 font-bold hover:bg-gray-50">-</div>
          </div>
          
          <div className="z-10 flex flex-col items-center text-gray-500 transform group-hover:scale-105 transition-transform duration-300">
            <div className="relative">
              <MapPin size={40} className="text-red-500 drop-shadow-md z-10 relative animate-bounce" style={{ animationDuration: '2s' }}/>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/20 rounded-full blur-[1px]"></div>
            </div>
            <span className="font-bold text-sm mt-2 text-gray-600 bg-white/80 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">Click map to adjust pin</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2 relative">
          <label className="block text-sm font-bold text-gray-700 mb-2">Full Address <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            className={`w-full px-4 py-3 border ${errors.address ? 'border-red-500 focus:ring-red-500 bg-red-50' : formData.address ? 'border-green-300 bg-green-50/30' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
            placeholder="House/Flat No., Building, Street"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          />
          <ValidationMessage message={errors.address} />
        </div>
        
        <div className="relative">
          <label className="block text-sm font-bold text-gray-700 mb-2">Landmark</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Near hospital, park, etc."
            value={formData.landmark}
            onChange={(e) => setFormData({...formData, landmark: e.target.value})}
          />
        </div>
        
        <div className="relative">
          <label className="block text-sm font-bold text-gray-700 mb-2">Pincode <span className="text-red-500">*</span></label>
          <input 
            type="text"
            maxLength={6}
            className={`w-full px-4 py-3 border ${errors.pincode ? 'border-red-500 focus:ring-red-500 bg-red-50' : formData.pincode && formData.pincode.length === 6 ? 'border-green-300 bg-green-50/30' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono`}
            placeholder="6-digit pincode"
            value={formData.pincode}
            onChange={(e) => setFormData({...formData, pincode: e.target.value.replace(/\D/g, '')})}
          />
          <ValidationMessage message={errors.pincode} />
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
