import React, { useState } from 'react';
import { Bot, Sparkles, RefreshCw, X } from 'lucide-react';

const AIAssistant = ({ description, onApply, onDismiss }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestion, setSuggestion] = useState(null);

  const generateSuggestion = () => {
    if (!description || description.length < 20) return;
    
    setIsGenerating(true);
    
    // Simulate AI delay
    setTimeout(() => {
      setSuggestion({
        title: 'AI Suggested: ' + description.substring(0, 30) + '...',
        department: 'Roads & Infrastructure',
        category: 'Potholes',
        priority: 'Medium',
        confidence: 87
      });
      setIsGenerating(false);
    }, 1500);
  };

  const handleApply = () => {
    if (suggestion) {
      onApply(suggestion);
    }
  };

  if (!description || description.length < 20) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-4 transition-all">
        <div className="text-blue-600 mt-1"><Bot size={24} /></div>
        <div>
          <h4 className="font-bold text-blue-900">AI Assistant Available</h4>
          <p className="text-sm text-blue-800 mt-1">Describe the issue below, and I can automatically categorize it and suggest a title.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 shadow-sm transition-all relative overflow-hidden">
      <button onClick={onDismiss} className="absolute top-3 right-3 text-blue-400 hover:text-blue-600">
        <X size={16} />
      </button>
      
      <div className="flex gap-4">
        <div className={`text-blue-600 mt-1 ${isGenerating ? 'animate-pulse' : ''}`}>
          <Bot size={28} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-blue-900">AI Smart Suggestion</h4>
            {suggestion && <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Sparkles size={12}/> {suggestion.confidence}% Match</span>}
          </div>
          
          {!suggestion ? (
            <>
              <p className="text-sm text-blue-800 mb-3">I've analyzed your description. Ready to generate suggestions.</p>
              <button 
                onClick={generateSuggestion}
                disabled={isGenerating}
                className="flex items-center gap-2 text-sm font-bold bg-white text-blue-700 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors shadow-sm disabled:opacity-70"
              >
                {isGenerating ? <><RefreshCw size={16} className="animate-spin" /> Analyzing...</> : <><Sparkles size={16} /> Generate Suggestions</>}
              </button>
            </>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white/60 rounded-lg p-3 border border-blue-100 mb-3 text-sm grid grid-cols-2 gap-2">
                <div><span className="text-gray-500 font-medium text-xs uppercase block">Title</span><span className="font-bold text-gray-800">{suggestion.title}</span></div>
                <div><span className="text-gray-500 font-medium text-xs uppercase block">Dept</span><span className="font-bold text-gray-800">{suggestion.department}</span></div>
                <div><span className="text-gray-500 font-medium text-xs uppercase block">Category</span><span className="font-bold text-gray-800">{suggestion.category}</span></div>
                <div><span className="text-gray-500 font-medium text-xs uppercase block">Priority</span><span className="font-bold text-gray-800">{suggestion.priority}</span></div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleApply}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
                >
                  Apply All
                </button>
                <button 
                  onClick={generateSuggestion}
                  className="bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 text-sm font-bold px-3 py-2 rounded-lg transition-colors flex items-center gap-1"
                >
                  <RefreshCw size={14} /> Retry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
