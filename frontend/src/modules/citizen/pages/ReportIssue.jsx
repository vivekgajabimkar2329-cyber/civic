import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FileText,
  MapPin,
  CheckCircle,
  ArrowRight,
  Save,
  RotateCcw,
  X,
  Upload,
  Brain,
  Clock,
  Sparkles,
  Search,
  Check,
  Lock,
  Eye,
  Plus,
  Compass,
  Lightbulb,
  Download,
  Info
} from 'lucide-react';

const DEFAULT_FORM_DATA = {
  category: 'Roads & Potholes',
  title: 'Large pothole causing traffic and vehicle damage on main road',
  description: 'There is a huge pothole on the main road near my area which is causing traffic jams and vehicle damage. This issue has been there for more than 2 weeks and needs immediate attention.',
  severity: 'Critical',
  visibility: 'Public',
  tags: ['Pothole', 'Road Damage', 'Traffic', 'Urgent'],
  address: 'Tank Bund Road, Hyderabad, Telangana 500063, India',
  latitude: '17.421999',
  longitude: '78.485761',
  images: [
    'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1595278069441-2f29f8038d8d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1621293954908-907141467fc7?auto=format&fit=crop&w=400&q=80'
  ]
};

const ReportIssue = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const savedDraft = localStorage.getItem('civicAiReportDraft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        return parsed.data || parsed;
      } catch (e) {
        console.error('Failed to parse draft', e);
      }
    }
    return DEFAULT_FORM_DATA;
  });

  const [activeStep, setActiveStep] = useState(1);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [newTagInput, setNewTagInput] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [complaintId, setComplaintId] = useState('');
  const [toast, setToast] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  useEffect(() => {
    const capturedImage = localStorage.getItem('captured_complaint_image');
    if (capturedImage) {
      setFormData(prev => ({
        ...prev,
        images: [capturedImage, ...prev.images]
      }));
      localStorage.removeItem('captured_complaint_image');
    }
  }, []);

  // Refs for scroll-to functionality
  const detailsRef = useRef(null);
  const locationRef = useRef(null);
  const mediaRef = useRef(null);

  useEffect(() => {
    // Detect active section on scroll
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      if (detailsRef.current && locationRef.current && mediaRef.current) {
        if (scrollPos >= mediaRef.current.offsetTop) {
          setActiveStep(3);
        } else if (scrollPos >= locationRef.current.offsetTop) {
          setActiveStep(2);
        } else {
          setActiveStep(1);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleScrollToSection = (stepNum, ref) => {
    setActiveStep(stepNum);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAddTag = () => {
    if (newTagInput.trim() && !formData.tags.includes(newTagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTagInput.trim()]
      });
      setNewTagInput('');
      setShowTagInput(false);
      showToast('Tag added successfully');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
    showToast('Tag removed');
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, idx) => idx !== indexToRemove)
    });
    showToast('Image removed');
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData({
        ...formData,
        images: [...formData.images, ...newImages]
      });
      showToast(`Added ${files.length} image(s)`);
    }
  };

  const triggerLocationFetch = () => {
    showToast('Fetching your location...', 'info');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6),
            address: 'Secunderabad Club Road, Secunderabad, Telangana 500003, India'
          });
          showToast('Location fetched successfully!');
        },
        (error) => {
          console.error(error);
          showToast('Could not fetch location. Using Secunderabad preset.', 'warning');
          setFormData({
            ...formData,
            latitude: '17.4483',
            longitude: '78.4983',
            address: 'Secunderabad Club Road, Secunderabad, Telangana 500003, India'
          });
        }
      );
    } else {
      showToast('Geolocation is not supported by your browser', 'error');
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
    showToast('Draft saved successfully at ' + timestamp);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the form?')) {
      setFormData(DEFAULT_FORM_DATA);
      localStorage.removeItem('civicAiReportDraft');
      setLastSaved(null);
      showToast('Form reset to default values', 'info');
    }
  };

  const handleSubmit = () => {
    if (!agreedToTerms) {
      showToast('You must agree to the Terms and Conditions', 'error');
      return;
    }
    if (!formData.title.trim()) {
      showToast('Please enter an issue title', 'error');
      return;
    }
    if (!formData.description.trim() || formData.description.length < 20) {
      showToast('Please enter a detailed description (min 20 characters)', 'error');
      return;
    }
    if (!formData.address.trim()) {
      showToast('Please enter an address', 'error');
      return;
    }

    // Submit Simulation
    const newId = `CIV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setComplaintId(newId);
    setIsSuccess(true);
    localStorage.removeItem('civicAiReportDraft');
    showToast('Report submitted successfully!');
  };

  return (
    <div className="mx-auto max-w-7xl pb-12 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg ${
          toast.type === 'error' ? 'bg-rose-600' : toast.type === 'warning' ? 'bg-amber-500' : toast.type === 'info' ? 'bg-blue-600' : 'bg-emerald-600'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Hero section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Report a Civic Issue</h1>
          <p className="text-slate-500 mt-2 text-base max-w-xl">
            Help us make your city better by reporting issues around you. Our AI-powered system ensures rapid routing.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-teal-50/50 border border-teal-100/80 rounded-xl px-4 py-3">
            <div className="p-1.5 bg-teal-100/50 rounded-lg text-teal-750">
              <Brain size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-teal-800">AI Powered</p>
              <p className="text-[10px] text-teal-600">Smart Classification</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50/50 border border-emerald-100/80 rounded-xl px-4 py-3">
            <div className="p-1.5 bg-emerald-100/50 rounded-lg text-emerald-700">
              <CheckCircle size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-800">Verified</p>
              <p className="text-[10px] text-emerald-600">Human + AI Check</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-blue-50/50 border border-blue-100/80 rounded-xl px-4 py-3">
            <div className="p-1.5 bg-blue-100/50 rounded-lg text-blue-700">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-800">Fast Response</p>
              <p className="text-[10px] text-blue-600">Issues acted on faster</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stepper Widget */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm mb-6">
        <div className="flex justify-between items-center relative max-w-3xl mx-auto px-4">
          <div className="absolute top-4 left-10 right-10 h-[2px] bg-slate-100 z-0"></div>
          {[
            { num: 1, label: 'Issue Details', ref: detailsRef },
            { num: 2, label: 'Location', ref: locationRef },
            { num: 3, label: 'Media Upload', ref: mediaRef },
            { num: 4, label: 'Review & Submit', ref: null }
          ].map((step) => (
            <button
              key={step.num}
              onClick={() => step.ref ? handleScrollToSection(step.num, step.ref) : setShowPreviewModal(true)}
              className="relative z-10 flex flex-col items-center gap-2 focus:outline-none group"
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-200 ${
                activeStep === step.num
                  ? 'bg-teal-800 border-teal-800 text-white shadow-md shadow-teal-800/10'
                  : activeStep > step.num
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'bg-white border-slate-200 text-slate-400 group-hover:border-slate-300'
              }`}>
                {activeStep > step.num ? <Check size={18} /> : step.num}
              </div>
              <span className={`text-xs font-bold transition-colors ${activeStep === step.num ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`}>
                {step.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1: Issue Details */}
          <div ref={detailsRef} id="issue-details" className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6 transition-all">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-full bg-teal-800 text-white font-bold flex items-center justify-center text-sm">1</div>
              <h2 className="text-xl font-bold text-slate-800">1. Issue Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Category <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-50/50 border border-slate-200/80 text-sm py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-teal-800/20 focus:border-teal-800 transition-all appearance-none font-medium text-slate-800"
                  >
                    <option value="Roads & Potholes">Roads & Potholes</option>
                    <option value="Water Supply & Leaks">Water Supply & Leaks</option>
                    <option value="Street Lights">Street Lights</option>
                    <option value="Sanitation & Garbage">Sanitation & Garbage</option>
                    <option value="Drainage & Sewage">Drainage & Sewage</option>
                    <option value="Traffic & Parking">Traffic & Parking</option>
                    <option value="Others">Others</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                    <Compass size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Issue Title <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={100}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Provide a short summary of the issue"
                    className="w-full bg-slate-50/50 border border-slate-200/80 text-sm py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-teal-800/20 focus:border-teal-800 transition-all font-medium text-slate-800"
                  />
                  <span className="absolute right-3 bottom-3 text-[10px] text-slate-400 font-semibold bg-white px-1.5 py-0.5 rounded-md border border-slate-100 shadow-sm">
                    {formData.title.length}/100
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex justify-between">
                <span>Detailed Description <span className="text-rose-500">*</span></span>
              </label>
              <div className="relative">
                <textarea
                  rows={5}
                  maxLength={1000}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide a clear and detailed description of the issue"
                  className="w-full bg-slate-50/50 border border-slate-200/80 text-sm py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-teal-800/20 focus:border-teal-800 transition-all font-medium text-slate-800 resize-none"
                />
                <span className="absolute right-3 bottom-3 text-[10px] text-slate-400 font-semibold bg-white px-1.5 py-0.5 rounded-md border border-slate-100 shadow-sm">
                  {formData.description.length}/1000
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Severity Level <span className="text-rose-500">*</span></label>
                <div className="grid grid-cols-4 gap-2">
                  {['Low', 'Medium', 'High', 'Critical'].map((level) => {
                    const isSelected = formData.severity === level;
                    let styleClasses = 'border-slate-200 text-slate-600 hover:bg-slate-50';
                    if (isSelected) {
                      if (level === 'Low') styleClasses = 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold';
                      else if (level === 'Medium') styleClasses = 'border-amber-500 bg-amber-50 text-amber-700 font-bold';
                      else if (level === 'High') styleClasses = 'border-orange-500 bg-orange-50 text-orange-700 font-bold';
                      else if (level === 'Critical') styleClasses = 'border-rose-500 bg-rose-50 text-rose-700 font-bold';
                    }
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setFormData({ ...formData, severity: level })}
                        className={`py-2 px-1 text-xs border rounded-xl transition-all text-center focus:outline-none ${styleClasses}`}
                      >
                        {level}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Visibility <span className="text-rose-500">*</span></label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: 'Public', icon: Eye, color: 'border-emerald-500 bg-emerald-50/50 text-emerald-700' },
                    { val: 'Anonymous', icon: Lock, color: 'border-slate-300 bg-slate-50 text-slate-500' }
                  ].map((option) => {
                    const isSelected = formData.visibility === option.val;
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.val}
                        type="button"
                        onClick={() => setFormData({ ...formData, visibility: option.val })}
                        className={`flex items-center justify-center gap-2 py-2 px-3 border rounded-xl transition-all font-bold text-xs focus:outline-none ${
                          isSelected ? option.color : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <Icon size={14} />
                        {option.val}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 p-3 bg-slate-50/40 border border-slate-200/80 rounded-xl min-h-[50px] items-center">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-700 shadow-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}

                {showTagInput ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                      placeholder="Tag..."
                      className="px-2 py-1 text-xs border rounded-lg outline-none focus:border-teal-800 w-24 bg-white"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="p-1 bg-teal-850 text-white rounded-lg hover:bg-teal-900"
                    >
                      <Check size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowTagInput(false); setNewTagInput(''); }}
                      className="p-1 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowTagInput(true)}
                    className="inline-flex items-center justify-center p-1.5 rounded-lg border border-dashed border-slate-300 hover:border-slate-400 text-slate-500 hover:text-slate-800 transition-colors bg-white shadow-sm"
                  >
                    <Plus size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Location */}
          <div ref={locationRef} id="location" className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-full bg-teal-800 text-white font-bold flex items-center justify-center text-sm">2</div>
              <h2 className="text-xl font-bold text-slate-800">2. Location</h2>
            </div>

            <div>
              <p className="text-xs text-slate-500 font-semibold mb-3">Where is the issue located?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={triggerLocationFetch}
                  className="flex items-center gap-3 p-4 border border-teal-800/10 bg-teal-50/20 hover:bg-teal-50/40 rounded-2xl text-left focus:outline-none transition-all"
                >
                  <div className="p-2.5 bg-white border border-teal-100 rounded-xl text-teal-850 shadow-sm">
                    <Compass size={20} />
                  </div>
                  <div>
                    <span className="block font-bold text-sm text-slate-800">Use Current Location</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">Detect my current location</span>
                  </div>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-3 p-4 border border-slate-200 bg-slate-50/30 hover:bg-slate-50 rounded-2xl text-left focus:outline-none transition-all"
                >
                  <div className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 shadow-sm">
                    <Search size={20} />
                  </div>
                  <div>
                    <span className="block font-bold text-sm text-slate-800">Search Address</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">Search for an address</span>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Address <span className="text-rose-500">*</span></label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street name, area details"
                  className="w-full bg-slate-50/50 border border-slate-200/80 text-sm py-3 px-4 pr-12 rounded-xl outline-none focus:ring-2 focus:ring-teal-800/20 focus:border-teal-800 transition-all font-medium text-slate-800"
                />
                <button
                  type="button"
                  onClick={triggerLocationFetch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-700 hover:text-teal-900 p-1.5 hover:bg-teal-50 rounded-lg"
                  title="Detect Location"
                >
                  <Compass size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Latitude</label>
                <input
                  type="text"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                  className="w-full bg-slate-100 border border-slate-200/80 text-sm py-2 px-3 rounded-xl outline-none font-mono text-slate-600 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Longitude</label>
                <input
                  type="text"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                  className="w-full bg-slate-100 border border-slate-200/80 text-sm py-2 px-3 rounded-xl outline-none font-mono text-slate-600 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Media Upload */}
          <div ref={mediaRef} id="media-upload" className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-full bg-teal-800 text-white font-bold flex items-center justify-center text-sm">3</div>
              <h2 className="text-xl font-bold text-slate-800">3. Media Upload <span className="text-xs text-slate-400 font-normal ml-1">(Optional)</span></h2>
            </div>

            <div>
              <p className="text-xs text-slate-500 font-semibold mb-2">Add photos or videos to help us better understand the issue</p>
              <div className="border-2 border-dashed border-teal-200 hover:border-teal-400 bg-teal-50/10 hover:bg-teal-50/30 rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 relative group">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <Upload className="w-10 h-10 text-teal-700/60 group-hover:text-teal-800 mx-auto mb-2 transition-transform group-hover:-translate-y-0.5 duration-200" />
                <p className="text-sm font-bold text-slate-700">Drag & drop files here</p>
                <p className="text-xs text-slate-500 mt-1">or <span className="text-teal-800 font-bold underline">click to browse</span></p>
                <p className="text-[10px] text-slate-400 mt-2">Supports: JPG, PNG, MP4 (Max 20MB each)</p>
              </div>
            </div>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square bg-slate-100 rounded-xl overflow-hidden border border-slate-200/80 group shadow-sm">
                    <img src={img} alt="Uploaded evidence" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 bg-slate-900/60 hover:bg-rose-600 text-white rounded-full p-1 shadow transition-colors focus:outline-none"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
                
                <label className="relative aspect-square border border-dashed border-slate-350 hover:border-slate-400 rounded-xl flex flex-col items-center justify-center cursor-pointer text-slate-500 hover:text-slate-700 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Plus size={20} className="mb-0.5 text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-500">Add More</span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Previews & Info Cards */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card 1: Location Preview */}
          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50 border-b border-slate-200/60 flex items-center gap-2">
              <MapPin size={18} className="text-teal-800" />
              <h3 className="font-bold text-sm text-slate-800">Location Preview</h3>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Styled Mock Map Widget */}
              <div className="w-full h-48 bg-emerald-50 rounded-xl relative overflow-hidden border border-slate-200 shadow-inner flex items-center justify-center">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* River block */}
                <div className="absolute left-1/3 top-0 bottom-0 w-16 bg-blue-200/80 border-l border-r border-blue-300/40 transform -rotate-12 flex items-center justify-center">
                  <span className="text-[8px] font-extrabold text-blue-600/60 tracking-[0.2em] select-none transform rotate-90">HUSAIN SAGAR LAKE</span>
                </div>
                
                {/* Noorlaa Road */}
                <div className="absolute left-4 top-1/3 right-4 h-6 bg-slate-200 border-t border-b border-slate-300/30 transform rotate-12 flex items-center px-4">
                  <span className="text-[7px] font-bold text-slate-500/85">Noorlaa Road</span>
                </div>

                {/* Tank Bund Road */}
                <div className="absolute left-8 top-1/2 right-0 h-8 bg-slate-200 border-t border-b border-slate-300/50 flex items-center px-4">
                  <span className="text-[7px] font-bold text-slate-600">Tank Bund Road</span>
                </div>

                {/* Park */}
                <div className="absolute right-4 top-4 w-16 h-12 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <span className="text-[7px] font-extrabold text-emerald-700">Sanjeevaiah Park</span>
                </div>

                {/* Red Pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <MapPin className="w-8 h-8 text-rose-650 drop-shadow-md animate-bounce" />
                  <div className="bg-slate-900 text-white text-[8px] font-bold py-0.5 px-1.5 rounded shadow-md mt-1 border border-slate-800 whitespace-nowrap">
                    Active Marker
                  </div>
                </div>

                {/* Controls Overlay */}
                <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                  <button type="button" className="w-6 h-6 rounded bg-white shadow border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center">+</button>
                  <button type="button" className="w-6 h-6 rounded bg-white shadow border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center">-</button>
                  <button type="button" onClick={triggerLocationFetch} className="w-6 h-6 rounded bg-white shadow border border-slate-200 text-xs font-bold text-teal-850 hover:bg-slate-50 flex items-center justify-center">
                    <Compass size={12} />
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs font-extrabold text-slate-800">{formData.address}</p>
                <button
                  type="button"
                  onClick={triggerLocationFetch}
                  className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 hover:text-teal-900 mt-2 hover:underline focus:outline-none"
                >
                  <Compass size={12} />
                  Use Current Location
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Latitude</p>
                  <p className="text-xs font-bold font-mono text-slate-705 mt-0.5">{formData.latitude || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Longitude</p>
                  <p className="text-xs font-bold font-mono text-slate-705 mt-0.5">{formData.longitude || 'Not set'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: CivicAI Assistant (Beta) */}
          <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-emerald-800" />
                <h3 className="font-extrabold text-sm text-slate-800">CivicAI Assistant</h3>
              </div>
              <span className="text-[9px] font-bold text-emerald-800 bg-emerald-105 px-2 py-0.5 rounded-full uppercase tracking-wider">Beta</span>
            </div>

            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">AI Suggestions</p>
              <p className="text-xs text-slate-550 font-bold leading-relaxed">Based on similar issues in this area</p>
            </div>

            <ul className="space-y-3">
              {[
                'This issue has been reported 23 times in the last 30 days',
                'Average resolution time: 2-4 days',
                'Similar issues are usually fixed within 3-5 working days'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3: After You Submit */}
          <div className="bg-blue-50/30 border border-blue-100 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-blue-700" />
              <h3 className="font-extrabold text-sm text-slate-800">After You Submit</h3>
            </div>

            <ul className="space-y-3">
              {[
                { label: 'We will review your issue', icon: Search },
                { label: 'AI will classify and route it', icon: CheckCircle },
                { label: 'Concerned department will be notified', icon: FileText },
                { label: 'You will get updates on resolution', icon: Compass }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <li key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-750">
                    <div className="p-1 bg-white rounded-lg border border-blue-100 text-blue-600 shrink-0">
                      <Icon size={14} />
                    </div>
                    <span>{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Form Actions Footer Bar */}
      <div className="mt-8 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-4 h-4 rounded text-teal-800 focus:ring-teal-800 focus:ring-offset-0 border-slate-350"
          />
          <span className="text-xs font-semibold text-slate-600">
            I agree to the <Link to="/help" className="text-teal-800 font-bold hover:underline">Terms & Conditions</Link> and <Link to="/help" className="text-teal-800 font-bold hover:underline">Privacy Policy</Link>
          </span>
        </label>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="flex-1 md:flex-none py-2.5 px-5 text-xs font-bold border border-slate-200 text-slate-755 bg-white hover:bg-slate-50 rounded-xl shadow-sm transition-all focus:outline-none"
          >
            Save as Draft
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            className="p-2.5 text-slate-400 hover:text-slate-600 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all focus:outline-none"
            title="Reset Form"
          >
            <RotateCcw size={16} />
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 py-2.5 px-6 text-xs font-bold text-white bg-teal-850 hover:bg-teal-900 rounded-xl shadow transition-all focus:outline-none"
          >
            Review & Submit
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Submit Success Dialog */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-105 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm border border-emerald-200">
              <CheckCircle className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-extrabold text-2xl text-slate-900">Complaint Registered!</h3>
              <p className="text-sm text-slate-500">
                Your report has been successfully received and automatically routed.
              </p>
            </div>

            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4">
              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Complaint ID</p>
              <p className="text-xl font-black text-emerald-800 font-mono mt-1 tracking-widest">{complaintId}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  showToast('Downloading receipt...');
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold shadow-sm transition-all focus:outline-none"
              >
                <Download size={14} />
                Download Receipt
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/my-complaints')}
                className="flex-1 inline-flex items-center justify-center py-3 px-4 bg-slate-800 hover:bg-slate-950 text-white rounded-xl text-xs font-bold shadow transition-all focus:outline-none"
              >
                Track Complaint
              </button>
            </div>

            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="w-full py-3 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold shadow transition-all focus:outline-none"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
                <FileText size={18} className="text-teal-850" />
                Review Your Complaint
              </h3>
              <button onClick={() => setShowPreviewModal(false)} className="text-slate-400 hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Category</span>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{formData.category}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Severity</span>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{formData.severity}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Visibility</span>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{formData.visibility}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Files Uploaded</span>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{formData.images.length} Image(s)</p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Title</span>
                <p className="text-xs font-bold text-slate-800 mt-1">{formData.title}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Detailed Description</span>
                <p className="text-xs font-medium text-slate-700 leading-relaxed mt-1">{formData.description}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Address</span>
                <p className="text-xs font-bold text-slate-800 mt-1">{formData.address}</p>
                <div className="flex gap-4 mt-2 text-[10px] text-slate-405 font-mono">
                  <span>Lat: {formData.latitude}</span>
                  <span>Lng: {formData.longitude}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="py-2 px-4 border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold shadow-sm transition-all focus:outline-none"
              >
                Back to Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPreviewModal(false);
                  handleSubmit();
                }}
                className="py-2 px-5 bg-teal-850 hover:bg-teal-900 text-white rounded-xl text-xs font-bold shadow transition-all focus:outline-none"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportIssue;
