import React from 'react';
import { Save, Clock } from 'lucide-react';

const DraftManager = ({ lastSaved, hasUnsavedChanges }) => {
  if (!lastSaved && !hasUnsavedChanges) return null;

  return (
    <div className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full">
      {hasUnsavedChanges ? (
        <>
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
          <span className="text-orange-700">Unsaved Changes</span>
        </>
      ) : (
        <>
          <Save size={12} className="text-green-600" />
          <span className="text-green-700">Draft Saved</span>
          {lastSaved && (
            <>
              <span className="text-gray-300">|</span>
              <Clock size={12} className="text-gray-500" />
              <span className="text-gray-500">{lastSaved}</span>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DraftManager;
