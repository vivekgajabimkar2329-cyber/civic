import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

const ValidationBadge = ({ isValid, show = false }) => {
  if (!show) return null;

  return (
    <div className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ${isValid ? 'text-green-500' : 'text-red-500'}`}>
      {isValid ? <Check size={18} /> : <AlertCircle size={18} />}
    </div>
  );
};

export default ValidationBadge;
