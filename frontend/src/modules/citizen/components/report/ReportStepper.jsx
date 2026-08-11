import React from 'react';
import { CheckCircle } from 'lucide-react';

const ReportStepper = ({ steps, currentStep }) => {
  const percentage = Math.round(((currentStep - 1) / (steps.length - 1)) * 100);

  return (
    <div className="mb-10 relative">
      <div className="flex justify-between items-end mb-4">
        <div>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Step {currentStep} of {steps.length}</span>
          <h2 className="text-xl font-extrabold text-gray-900 mt-1">{steps[currentStep - 1].name}</h2>
        </div>
        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{percentage}% Completed</span>
      </div>

      <div className="relative mt-6">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1.5 bg-gray-200 rounded-full z-0 overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-700 ease-in-out" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        
        <div className="relative z-10 flex justify-between">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            let colorClasses = 'bg-gray-100 border-gray-200 text-gray-400'; // Upcoming
            if (isCompleted) {
              colorClasses = 'bg-green-500 border-green-500 text-white shadow-md'; // Completed
            } else if (isActive) {
              colorClasses = 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 scale-110'; // Current
            }
            
            return (
              <div key={step.id} className="flex flex-col items-center group">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 ease-in-out ${colorClasses}`}
                >
                  {isCompleted ? <CheckCircle size={20} className="animate-in zoom-in duration-300" /> : <Icon size={isActive ? 22 : 20} />}
                </div>
                <span className={`mt-3 text-xs sm:text-sm font-bold absolute -bottom-8 whitespace-nowrap transition-all duration-300 ${
                  isActive ? 'text-blue-700' : isCompleted ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-8"></div> {/* Spacer for absolute text */}
    </div>
  );
};

export default ReportStepper;
