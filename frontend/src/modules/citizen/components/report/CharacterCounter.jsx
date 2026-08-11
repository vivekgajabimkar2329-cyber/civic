import React from 'react';

const CharacterCounter = ({ current, min, max }) => {
  const percentage = Math.min((current / max) * 100, 100);
  const isValid = current >= min && current <= max;
  
  let colorClass = 'bg-gray-300';
  if (current > 0) {
    colorClass = isValid ? 'bg-green-500' : 'bg-red-500';
  }

  return (
    <div className="w-full mt-2">
      <div className="flex justify-between items-center mb-1 text-xs font-medium">
        <span className={isValid ? 'text-green-600' : current > 0 ? 'text-red-500' : 'text-gray-500'}>
          {current} / {max} chars
        </span>
        {min > 0 && current < min && (
          <span className="text-red-500">Min {min} chars required</span>
        )}
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClass} transition-all duration-300 ease-out`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default CharacterCounter;
