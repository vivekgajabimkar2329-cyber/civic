import React from 'react';
import { AlertCircle } from 'lucide-react';

const ValidationMessage = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="flex items-center gap-1.5 mt-1 text-red-600 text-xs font-medium animate-in fade-in slide-in-from-top-1 duration-200">
      <AlertCircle size={14} />
      <span>{message}</span>
    </div>
  );
};

export default ValidationMessage;
