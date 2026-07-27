import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Mic, 
  MapPin, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Save,
  RotateCcw,
  X
} from 'lucide-react';

import ReportStepper from '../../components/citizen/report/ReportStepper';
import IssueForm from '../../components/citizen/report/IssueForm';
import VoiceRecorder from '../../components/citizen/report/VoiceRecorder';
import UploadImages from '../../components/citizen/report/UploadImages';
import PrioritySelector from '../../components/citizen/report/PrioritySelector';
import ReviewCard from '../../components/citizen/report/ReviewCard';
import SuccessDialog from '../../components/citizen/report/SuccessDialog';
import Toast from '../../components/citizen/report/Toast';
import DraftManager from '../../components/citizen/report/DraftManager';

const DEFAULT_FORM_DATA = {
  title: '',
  department: '',
  category: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
  time: new Date().toTimeString().split(' ')[0].substring(0,5),
  address: '',
  landmark: '',
  pincode: '',
  images: [],
  hasAudio: false,
  audioDuration: 0,
  priority: ''
};

const ReportIssue = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [complaintId, setComplaintId] = useState('');
  
  // Validation state
  const [errors, setErrors] = useState({});

  // Toast State
  const [toast, setToast] = useState(null);
  
  // Draft State
  const [lastSaved, setLastSaved] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const addToast = useCallback((message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
  }, []);

  // Initialize form data from draft or empty
  const [formData, setFormData] = useState(() => {
    const savedDraft = localStorage.getItem('civicAiReportDraft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        if (parsed.timestamp) {
          // It's a draft structure { data, timestamp }
          return parsed.data;
        }
        return parsed;
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
    return DEFAULT_FORM_DATA;
  });

  // Load last saved timestamp on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('civicAiReportDraft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        if (parsed.timestamp) {
          setLastSaved(parsed.timestamp);
        }
      } catch (e) {}
    }
  }, []);

  // Track unsaved changes
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [formData]);

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.description.trim() || formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.pincode.trim() || formData.pincode.length !== 6) {
      newErrors.pincode = "Valid 6-digit pincode is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.priority) newErrors.priority = "Please select a priority level";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) {
      addToast('Please complete all required fields correctly', 'error');
      return;
    }
    if (currentStep === 3 && !validateStep3()) {
      addToast('Please select a priority', 'error');
      return;
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveDraft = () => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const draftState = {
      data: formData,
      timestamp
    };
    localStorage.setItem('civicAiReportDraft', JSON.stringify(draftState));
    setLastSaved(timestamp);
    setHasUnsavedChanges(false);
    addToast('Draft saved successfully', 'success');
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the form? All unsaved data will be lost.")) {
      setFormData(DEFAULT_FORM_DATA);
      setCurrentStep(1);
      localStorage.removeItem('civicAiReportDraft');
      setLastSaved(null);
      setHasUnsavedChanges(false);
      setErrors({});
      addToast('Form has been reset', 'info');
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (window.confirm("You have unsaved changes. Are you sure you want to cancel?")) {
        navigate('/citizen/dashboard');
      }
    } else {
      navigate('/citizen/dashboard');
    }
  };

  const handleSubmit = () => {
    // Generate dummy complaint ID
    const newId = `CIV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setComplaintId(newId);
    setIsSuccess(true);
    // Clear draft
    localStorage.removeItem('civicAiReportDraft');
    setHasUnsavedChanges(false);
    addToast('Report submitted successfully!', 'success');
  };

  const steps = [
    { id: 1, name: 'Issue Details', icon: FileText },
    { id: 2, name: 'Evidence', icon: Mic },
    { id: 3, name: 'Priority Level', icon: MapPin },
    { id: 4, name: 'Review', icon: CheckCircle },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-10">
      
      {/* Toast Notification */}
      {toast && (
        <Toast 
          key={toast.id}
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Report a New Civic Issue</h1>
          <p className="text-gray-600 mt-2 text-lg leading-relaxed max-w-2xl">
            Help your local authorities resolve community issues quickly by submitting accurate information.
          </p>
        </div>
        <div className="flex flex-col items-end gap-3 shrink-0">
          <DraftManager lastSaved={lastSaved} hasUnsavedChanges={hasUnsavedChanges} />
          <div className="flex gap-2">
            <button 
              onClick={handleCancel}
              className="bg-white border border-gray-300 text-gray-700 font-bold px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2"
            >
              <X size={16} /> Cancel
            </button>
          </div>
        </div>
      </div>

      <ReportStepper steps={steps} currentStep={currentStep} />

      {/* Form Content */}
      <div className="bg-white rounded-2xl border shadow-sm p-6 sm:p-10 min-h-[400px]" style={{ borderColor: 'var(--color-gov-border)' }}>
        
        {currentStep === 1 && (
          <IssueForm 
            formData={formData} 
            setFormData={setFormData} 
            errors={errors} 
            addToast={addToast}
          />
        )}

        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Step 2: Add Voice or Photo Evidence</h2>
            <p className="text-gray-600">Adding a voice recording describing the problem or uploading photos helps our officers resolve the issue faster.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <VoiceRecorder formData={formData} setFormData={setFormData} />
              <UploadImages 
                images={formData.images} 
                onChange={(images) => setFormData({...formData, images})} 
                error={errors.images} 
                addToast={addToast}
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <PrioritySelector formData={formData} setFormData={setFormData} error={errors.priority} />
        )}

        {currentStep === 4 && (
          <ReviewCard formData={formData} setStep={setCurrentStep} />
        )}

      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between mt-8 gap-4">
        <div className="flex gap-4 w-full sm:w-auto">
          <button 
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-colors shadow-sm ${
              currentStep === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ArrowLeft size={18} /> Previous
          </button>
          
          <button 
            onClick={handleSaveDraft}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-colors bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 shadow-sm"
          >
            <Save size={18} /> Save Draft
          </button>
          
          <button 
            onClick={handleReset}
            className="hidden md:flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-colors text-gray-500 hover:text-red-600 hover:bg-red-50"
            title="Reset Form"
          >
            <RotateCcw size={18} />
          </button>
        </div>
        
        {currentStep < 4 ? (
          <button 
            onClick={handleNext}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-bold text-white transition-opacity hover:opacity-90 shadow-sm"
            style={{ backgroundColor: 'var(--color-gov-secondary)' }}
          >
            Next Step <ArrowRight size={18} />
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-3 rounded-lg font-bold text-white transition-all hover:opacity-90 shadow-md transform hover:scale-105 active:scale-95 duration-200"
            style={{ backgroundColor: 'var(--color-gov-success)' }}
          >
            Submit Report <CheckCircle size={18} />
          </button>
        )}
      </div>

      {isSuccess && <SuccessDialog complaintId={complaintId} />}
      
    </div>
  );
};

export default ReportIssue;
