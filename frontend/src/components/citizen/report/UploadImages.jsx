import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';
import ValidationMessage from './ValidationMessage';

const UploadImages = ({ images, onChange, error, addToast }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const MAX_IMAGES = 5;
  const MAX_SIZE_MB = 10;

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
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (files) => {
    const validFiles = [];
    const newImages = [...images];

    Array.from(files).forEach(file => {
      if (newImages.length + validFiles.length >= MAX_IMAGES) {
        addToast(`Maximum ${MAX_IMAGES} images allowed.`, 'error');
        return;
      }

      if (!file.type.match(/image\/(jpeg|jpg|png)/i)) {
        addToast(`Invalid format: ${file.name}. Only JPG/PNG allowed.`, 'error');
        return;
      }

      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        addToast(`File too large: ${file.name}. Max ${MAX_SIZE_MB}MB.`, 'error');
        return;
      }

      validFiles.push({
        url: URL.createObjectURL(file),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      });
    });

    if (validFiles.length > 0) {
      onChange([...images, ...validFiles]);
      addToast(`${validFiles.length} image(s) uploaded successfully.`, 'success');
    }
    
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (indexToRemove) => {
    onChange(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full">
      <div 
        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center text-center transition-all cursor-pointer ${
          isDragging 
            ? 'border-[#005EA5] bg-blue-50 scale-[1.01]' 
            : error 
              ? 'border-red-300 bg-red-50 hover:bg-red-100' 
              : images.length >= MAX_IMAGES
                ? 'border-gray-200 bg-gray-100 cursor-not-allowed'
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
        }`}
        onClick={() => images.length < MAX_IMAGES && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/jpeg,image/png,image/jpg" 
          multiple 
          onChange={handleFileSelect}
          disabled={images.length >= MAX_IMAGES}
        />
        
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm transition-transform ${isDragging ? 'scale-110' : ''} ${error ? 'bg-red-100 text-red-600' : 'bg-white text-gray-600'}`}>
          <Upload size={28} />
        </div>
        
        <h3 className="font-bold text-gray-900 text-lg">
          {images.length >= MAX_IMAGES ? 'Maximum Images Reached' : 'Upload Photos'}
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          {images.length >= MAX_IMAGES ? 'Please remove an image to upload a new one.' : 'Drag and drop or click to browse'}
        </p>
        <div className="flex items-center gap-4 mt-3 text-xs font-bold text-gray-400 uppercase tracking-wide">
          <span>JPG, PNG</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span>Max {MAX_SIZE_MB}MB</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span>Up to {MAX_IMAGES} files</span>
        </div>
      </div>
      
      <ValidationMessage message={error} />
      
      {images.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <ImageIcon size={16} /> Attached Photos
            </h4>
            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {images.length} / {MAX_IMAGES}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map((img, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm group hover:border-blue-300 transition-colors animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                  <img src={img.url} alt={`Upload ${index}`} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{img.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{img.size}</p>
                </div>
                <button 
                  type="button"
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors shrink-0"
                  onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                  title="Remove Image"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImages;
