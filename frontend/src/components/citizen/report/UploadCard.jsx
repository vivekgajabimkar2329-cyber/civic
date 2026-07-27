import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import ValidationMessage from './ValidationMessage';

const UploadCard = ({ images, onChange, error }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const newImages = Array.from(files).filter(file => file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024).map(file => URL.createObjectURL(file));
    if (newImages.length > 0) {
      onChange([...images, ...newImages]);
    }
  };

  const removeImage = (indexToRemove) => {
    onChange(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <div 
        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center text-center transition-colors cursor-pointer ${
          isDragging ? 'border-[#005EA5] bg-blue-50' : error ? 'border-red-300 bg-red-50 hover:bg-red-100' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/jpeg,image/png" 
          multiple 
          onChange={handleFileSelect}
        />
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm ${error ? 'bg-red-100 text-red-600' : 'bg-white text-gray-600'}`}>
          <Upload size={28} />
        </div>
        <h3 className="font-bold text-gray-900">Upload Photos</h3>
        <p className="text-sm text-gray-500 mt-1">Drag and drop or click to browse</p>
        <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</p>
      </div>
      <ValidationMessage message={error} />
      
      {images.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          {images.map((imgUrl, index) => (
            <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 shadow-sm group">
              <img src={imgUrl} alt={`Preview ${index}`} className="w-full h-full object-cover" />
              <button 
                type="button"
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => { e.stopPropagation(); removeImage(index); }}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadCard;
