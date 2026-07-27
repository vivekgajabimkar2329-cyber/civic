import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, Globe, ChevronDown, CheckCircle2, AlertTriangle, Building, Zap, MapPin, 
  Search, Crosshair, Map, Mic, Camera, FileText, Upload, X, Play, Square, Pause, 
  Info, ArrowRight, Save, RotateCcw, Eye, ShieldCheck, HeartPulse, User, HelpCircle, FileDigit, Plus, Brain, Clock, ChevronRight
} from 'lucide-react';

export const ReportIssue = () => {
  // Navigation State
  const [activeStep, setActiveStep] = useState(1);
  
  // Modals State
  const [activeModal, setActiveModal] = useState(null);

  // Form Data (simplified for UI demonstration)
  const [issueCategory, setIssueCategory] = useState('Roads');
  const [department, setDepartment] = useState('Municipal Corporation');
  const [severity, setSeverity] = useState('High');
  const [anonymous, setAnonymous] = useState(false);
  const [emergency, setEmergency] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  // Close Modal Helper
  const closeModal = () => setActiveModal(null);

  // Reusable Modal Wrapper
  const Modal = ({ id, title, children, width = 'max-w-md' }) => {
    if (activeModal !== id) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <div className={`bg-white rounded-xl shadow-2xl w-full ${width} flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200`}>
          <div className="flex justify-between items-center p-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">{title}</h3>
            <button onClick={closeModal} className="text-slate-400 hover:bg-slate-100 p-1 rounded-md transition-colors"><X className="w-5 h-5"/></button>
          </div>
          <div className="p-0">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800">
      
      {/* 1. Authenticated Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#115e59] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
               <span className="font-bold text-lg text-slate-900 leading-none block tracking-tight">Civic AI</span>
               <span className="text-[9px] text-slate-500 font-medium">Smart Cities, Stronger Communities</span>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/dashboard/user" className="text-sm font-semibold text-slate-600 hover:text-[#115e59]">Dashboard</Link>
            <Link to="/report" className="text-sm font-semibold text-[#115e59] border-b-2 border-[#115e59] pb-5 pt-5">Report Issue</Link>
            <Link to="#" className="text-sm font-semibold text-slate-600 hover:text-[#115e59]">My Complaints</Link>
            <Link to="/track" className="text-sm font-semibold text-slate-600 hover:text-[#115e59]">Track Complaint</Link>
            <button onClick={() => setActiveModal('notifications')} className="text-sm font-semibold text-slate-600 flex items-center gap-1 hover:text-[#115e59]">
               Notifications <span className="w-4 h-4 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center">3</span>
            </button>
            <button onClick={() => setActiveModal('helpCenter')} className="text-sm font-semibold text-slate-600 hover:text-[#115e59]">Help Center</button>
          </nav>
          
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveModal('language')} className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded-md">
              <Globe className="w-4 h-4" /> English <ChevronDown className="w-3 h-3" />
            </button>
            <button onClick={() => setActiveModal('profile')} className="flex items-center gap-2 border-l border-slate-200 pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900 leading-tight">Ramesh Kumar</p>
                <p className="text-[10px] text-slate-500">Hyderabad</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-200 bg-[url('https://i.pravatar.cc/150?img=11')] bg-cover"></div>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1600px] mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT SIDEBAR: AI Classification & Dept Selection */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
               <h3 className="font-bold text-sm text-slate-900">AI Classification</h3>
               <button className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4"/></button>
            </div>
            
            <div className="flex justify-center mb-6 relative pt-4">
               {/* Circle Chart Mockup */}
               <div className="w-24 h-24 rounded-full border-[6px] border-slate-100 flex flex-col items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border-[6px] border-[#115e59]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 92%, 0 100%)' }}></div>
                  <span className="text-2xl font-bold text-[#115e59]">92%</span>
                  <span className="text-[8px] text-slate-500 font-semibold uppercase">Confidence Score</span>
               </div>
            </div>

            <div className="space-y-4">
               <div>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase mb-1">Detected Category</p>
                  <p className="font-bold text-slate-900 text-sm">Roads</p>
               </div>
               <div>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase mb-1">Suggested Department</p>
                  <p className="font-bold text-[#115e59] text-sm">Municipal Corporation</p>
               </div>
               <div>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase mb-2">Key Indicators Found</p>
                  <ul className="space-y-2">
                     <li className="flex items-start gap-2 text-xs text-slate-600"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1 shrink-0"></div> Pothole detected</li>
                     <li className="flex items-start gap-2 text-xs text-slate-600"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1 shrink-0"></div> Road damage mentioned</li>
                     <li className="flex items-start gap-2 text-xs text-slate-600"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1 shrink-0"></div> Traffic impact reported</li>
                  </ul>
               </div>
               <button className="w-full bg-[#115e59] text-white py-2.5 rounded-lg text-xs font-bold hover:bg-[#0f4d48] transition-colors mt-2">
                  Apply Classification
               </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
               <h3 className="font-bold text-sm text-slate-900">Department Selection</h3>
               <button className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4"/></button>
            </div>
            
            <div className="space-y-4">
               <div>
                  <label className="text-[10px] font-bold text-slate-700 uppercase mb-1.5 block">Select Appropriate Department</label>
                  <select className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2 px-3 rounded-lg outline-none focus:ring-1 focus:ring-[#115e59]">
                     <option>Municipal Corporation</option>
                     <option>Water Works</option>
                  </select>
               </div>
               
               <div>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase mb-0.5">Email</p>
                  <p className="text-xs font-medium text-slate-800 break-all">mc.hyderabad@gov.in</p>
               </div>
               <div>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase mb-0.5">Phone</p>
                  <p className="text-xs font-medium text-slate-800">040 12345678</p>
               </div>
               <div>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase mb-0.5">Address</p>
                  <p className="text-xs font-medium text-slate-600 leading-relaxed">Greater Hyderabad Municipal Corporation<br/>Tank Bund Road, Hyderabad, Telangana</p>
               </div>
               
               <button className="w-full bg-[#115e59] text-white py-2.5 rounded-lg text-xs font-bold hover:bg-[#0f4d48] transition-colors mt-2">
                  Confirm Selection
               </button>
            </div>
          </div>
        </div>

        {/* CENTER MAIN CONTENT: The Form */}
        <div className="col-span-1 lg:col-span-6 flex flex-col gap-6">
           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6">
                 <div className="flex items-center gap-2 mb-1 text-[11px] text-slate-500 font-medium">
                    <Link to="/" className="hover:text-blue-600">Home</Link>
                    <span>/</span>
                    <span className="text-slate-800">Report Issue</span>
                 </div>
                 <h1 className="text-2xl font-bold text-slate-900 mb-1">Report a Civic Issue</h1>
                 <p className="text-sm text-slate-500 mb-8">Help improve your community by reporting civic issues with AI-assisted classification.</p>
                 
                 {/* Steps Indicator */}
                 <div className="flex items-center justify-between relative mb-10 px-2">
                    <div className="absolute top-3.5 left-4 right-4 h-[2px] bg-slate-200 z-0"></div>
                    
                    {[
                       { num: 1, label: 'Issue Details' },
                       { num: 2, label: 'Location' },
                       { num: 3, label: 'Media Upload' },
                       { num: 4, label: 'Review & Submit' }
                    ].map((step, idx) => (
                       <div key={idx} className="relative z-10 flex flex-col items-center gap-2" onClick={() => setActiveStep(step.num)}>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer transition-colors border-2
                             ${activeStep >= step.num ? 'bg-[#115e59] border-[#115e59] text-white' : 'bg-white border-slate-300 text-slate-400'}`}>
                             {activeStep > step.num ? <CheckCircle2 className="w-4 h-4"/> : step.num}
                          </div>
                          <span className={`text-[10px] font-bold ${activeStep >= step.num ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</span>
                       </div>
                    ))}
                 </div>

                 {/* Step 1: Issue Details Form Area */}
                 <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       <div>
                          <label className="text-[11px] font-bold text-slate-700 uppercase mb-2 block">Issue Category <span className="text-red-500">*</span></label>
                          <select className="w-full bg-white border border-slate-300 text-slate-800 text-sm py-2 px-3 rounded-lg outline-none focus:border-[#115e59]">
                             <option>Roads</option>
                             <option>Water Supply</option>
                          </select>
                       </div>
                       <div>
                          <label className="text-[11px] font-bold text-slate-700 uppercase mb-2 block">Department <span className="text-red-500">*</span></label>
                          <select className="w-full bg-white border border-slate-300 text-slate-800 text-sm py-2 px-3 rounded-lg outline-none focus:border-[#115e59]">
                             <option>Municipal Corporation</option>
                          </select>
                       </div>
                       <div>
                          <label className="text-[11px] font-bold text-slate-700 uppercase mb-2 block">Severity <span className="text-red-500">*</span></label>
                          <select className="w-full bg-white border border-slate-300 text-slate-800 text-sm py-2 px-3 rounded-lg outline-none focus:border-[#115e59]">
                             <option>High</option>
                             <option>Medium</option>
                          </select>
                       </div>
                    </div>

                    {/* Auto Detected Banner */}
                    <div className="bg-[#f0fdfa] border border-[#ccfbf1] rounded-lg p-4 flex flex-col md:flex-row items-center justify-between">
                       <div>
                          <div className="flex items-center gap-2 mb-1">
                             <h4 className="font-bold text-sm text-[#0f766e]">AI Issue Classification</h4>
                             <span className="text-[9px] bg-white border border-[#99f6e4] text-[#0f766e] px-1.5 py-0.5 rounded uppercase font-bold">Powered by Civic AI</span>
                          </div>
                          <p className="text-xs text-[#0f766e]">Auto Detected Category: <strong className="text-lg">Roads</strong></p>
                       </div>
                       <div className="text-right mt-2 md:mt-0">
                          <p className="text-[10px] text-[#0f766e] font-bold uppercase mb-1">Confidence Score</p>
                          <p className="text-xl font-black text-[#0f766e]">92%</p>
                       </div>
                    </div>

                    <div>
                       <label className="text-[11px] font-bold text-slate-700 uppercase mb-2 block">Issue Title <span className="text-red-500">*</span></label>
                       <input type="text" placeholder="e.g. Large pothole causing traffic..." className="w-full bg-white border border-slate-300 text-slate-800 text-sm py-2.5 px-3 rounded-lg outline-none focus:border-[#115e59] focus:ring-1 focus:ring-[#115e59]" value="Large pothole causing traffic and vehicle damage on main road" onChange={() => {}}/>
                    </div>
                    
                    <div>
                       <label className="text-[11px] font-bold text-slate-700 uppercase mb-2 block flex justify-between">
                          <span>Detailed Description <span className="text-red-500">*</span></span>
                          <span className="text-slate-400 font-normal">156 / 1000</span>
                       </label>
                       <textarea rows={4} className="w-full bg-white border border-slate-300 text-slate-800 text-sm py-2.5 px-3 rounded-lg outline-none focus:border-[#115e59] focus:ring-1 focus:ring-[#115e59] resize-none" defaultValue="There is a huge pothole on the main road near my area which is causing traffic jams and vehicle damage. This issue has been there for more than 2 weeks and needs immediate attention."></textarea>
                       <div className="flex justify-end mt-1">
                          <button onClick={() => setActiveModal('voice')} className="text-xs text-blue-600 flex items-center gap-1 font-semibold hover:underline">
                             <Mic className="w-3.5 h-3.5"/> Dictate with Voice
                          </button>
                       </div>
                    </div>

                    <div>
                       <label className="text-[11px] font-bold text-slate-700 uppercase mb-2 block">Tags</label>
                       <div className="flex flex-wrap items-center gap-2 p-2 bg-white border border-slate-300 rounded-lg min-h-[46px]">
                          <span className="bg-blue-50 text-blue-600 text-[11px] font-bold px-2 py-1 rounded flex items-center gap-1">Pothole <X className="w-3 h-3 cursor-pointer"/></span>
                          <span className="bg-blue-50 text-blue-600 text-[11px] font-bold px-2 py-1 rounded flex items-center gap-1">Traffic <X className="w-3 h-3 cursor-pointer"/></span>
                          <span className="bg-red-50 text-red-600 text-[11px] font-bold px-2 py-1 rounded flex items-center gap-1">Urgent <X className="w-3 h-3 cursor-pointer"/></span>
                          <input type="text" placeholder="Add tags and press enter" className="flex-1 text-sm outline-none bg-transparent min-w-[120px]" />
                       </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 pt-2">
                       <div className="flex items-center justify-between flex-1 border border-slate-200 p-3 rounded-lg">
                          <div>
                             <p className="text-xs font-bold text-slate-900">Anonymous Reporting</p>
                             <p className="text-[10px] text-slate-500">Your identity will be kept confidential</p>
                          </div>
                          <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                             <div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                          </div>
                       </div>
                       <div className="flex items-center justify-between flex-1 border border-red-100 bg-red-50 p-3 rounded-lg">
                          <div>
                             <p className="text-xs font-bold text-red-900">Emergency Issue</p>
                             <p className="text-[10px] text-red-700">This requires immediate attention</p>
                          </div>
                          <div className="w-10 h-5 bg-red-500 rounded-full relative cursor-pointer">
                             <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                          </div>
                       </div>
                    </div>

                    {/* Media Upload Inline Box */}
                    <div className="pt-4">
                       <label className="text-[11px] font-bold text-slate-700 uppercase mb-2 block">Media Upload</label>
                       <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setActiveModal('mediaManager')}>
                          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-sm font-bold text-slate-700">Drag & Drop files here</p>
                          <p className="text-xs text-slate-500">or click to browse</p>
                          <p className="text-[10px] text-slate-400 mt-2">Supports: JPG, PNG, MP4, PDF (Max 20MB each)</p>
                       </div>
                       
                       <div className="flex items-center justify-center gap-4 mt-4">
                          <button onClick={() => setActiveModal('mediaManager')} className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded flex items-center gap-1 hover:bg-slate-200"><FileText className="w-3.5 h-3.5"/> Upload Images</button>
                          <button onClick={() => setActiveModal('camera')} className="text-xs font-bold text-[#115e59] bg-[#ccfbf1] px-3 py-1.5 rounded flex items-center gap-1 hover:bg-[#99f6e4]"><Camera className="w-3.5 h-3.5"/> Capture Photo</button>
                       </div>

                       <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
                          <div className="w-16 h-16 rounded bg-slate-200 bg-[url('https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=200')] bg-cover relative border border-slate-300">
                             <button className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"><X className="w-3 h-3"/></button>
                          </div>
                          <div className="w-16 h-16 rounded bg-slate-200 bg-[url('https://images.unsplash.com/photo-1595278069441-2f29f8038d8d?w=200')] bg-cover relative border border-slate-300">
                             <button className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"><X className="w-3 h-3"/></button>
                          </div>
                          <div className="w-16 h-16 rounded bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold border border-slate-300">
                             +5
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-2 mt-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span className="text-xs font-bold text-slate-700">All media verified</span>
                          <span className="text-xs font-bold text-emerald-600 ml-auto">100%</span>
                       </div>
                    </div>

                 </div>

              </div>
              
              {/* Form Bottom Action Bar */}
              <div className="bg-slate-50 p-4 px-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                 <label className="flex items-center gap-2 text-xs text-slate-600 font-medium cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#115e59]" />
                    <span>I agree to the <button onClick={() => setActiveModal('terms')} className="text-blue-600 hover:underline">Terms & Conditions</button> and <button onClick={() => setActiveModal('privacy')} className="text-blue-600 hover:underline">Privacy Policy</button></span>
                 </label>
                 
                 <div className="flex items-center gap-3 w-full md:w-auto">
                    <button onClick={() => setActiveModal('saveDraft')} className="flex-1 md:flex-none text-xs font-bold text-slate-700 bg-white border border-slate-300 px-4 py-2.5 rounded-lg shadow-sm hover:bg-slate-50">Save Draft</button>
                    <button onClick={() => setActiveModal('reset')} className="flex-1 md:flex-none text-xs font-bold text-slate-700 bg-white border border-slate-300 px-4 py-2.5 rounded-lg shadow-sm hover:bg-slate-50">Reset</button>
                    <button onClick={() => setActiveModal('preview')} className="flex-1 md:flex-none text-xs font-bold text-white bg-slate-800 px-4 py-2.5 rounded-lg shadow-sm hover:bg-slate-900">Preview</button>
                    <button onClick={() => setActiveModal('success')} className="flex-1 md:flex-none text-xs font-bold text-white bg-[#115e59] px-6 py-2.5 rounded-lg shadow-sm shadow-[#115e59]/20 flex items-center justify-center gap-2 hover:bg-[#0f4d48]">
                       <ArrowRight className="w-4 h-4"/> Submit Complaint
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* RIGHT SIDEBAR: Helpers & Map Panel */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-6">
           
           {/* Location Details panel (usually in Step 2, but visible in mockup) */}
           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="font-bold text-sm text-slate-900">Location Details</h3>
                 <button onClick={() => setActiveModal('mapFullscreen')} className="text-[10px] text-blue-600 font-bold hover:underline flex items-center gap-1">Use Current Location</button>
              </div>
              <div className="p-4 bg-slate-50">
                 <div className="relative mb-3">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="Search address" className="w-full bg-white border border-slate-200 text-xs py-2 pl-8 pr-3 rounded-lg outline-none focus:border-[#115e59]" />
                 </div>
                 
                 <div className="w-full h-40 bg-slate-200 rounded-lg relative overflow-hidden mb-4 border border-slate-300 cursor-pointer" onClick={() => setActiveModal('mapFullscreen')}>
                    <div className="absolute inset-0 bg-[#e5e7eb] opacity-70 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                       <MapPin className="w-8 h-8 text-red-500 drop-shadow-md" />
                       <div className="bg-white px-2 py-1 rounded shadow-md mt-1 border border-slate-100">
                          <p className="text-[9px] font-bold text-slate-800 text-center leading-tight">Tank Bund Road, Hyderabad,<br/>Telangana, India</p>
                       </div>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                       <p className="text-[10px] font-semibold text-slate-500 uppercase mb-1">Latitude</p>
                       <input type="text" value="17.421999" readOnly className="w-full bg-slate-100 border border-slate-200 text-xs py-1.5 px-2 rounded text-slate-700" />
                    </div>
                    <div>
                       <p className="text-[10px] font-semibold text-slate-500 uppercase mb-1">Longitude</p>
                       <input type="text" value="78.485761" readOnly className="w-full bg-slate-100 border border-slate-200 text-xs py-1.5 px-2 rounded text-slate-700" />
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                       <p className="text-[10px] font-semibold text-slate-500 uppercase mb-1">Pincode</p>
                       <input type="text" value="500063" readOnly className="w-full bg-slate-100 border border-slate-200 text-xs py-1.5 px-2 rounded text-slate-700" />
                    </div>
                    <div>
                       <p className="text-[10px] font-semibold text-slate-500 uppercase mb-1">Ward</p>
                       <input type="text" value="Ward 125" readOnly className="w-full bg-slate-100 border border-slate-200 text-xs py-1.5 px-2 rounded text-slate-700" />
                    </div>
                 </div>
                 
                 <div>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase mb-1">Landmark</p>
                    <input type="text" value="Near Necklace Road, Opp. Lumbini Park" readOnly className="w-full bg-slate-100 border border-slate-200 text-xs py-1.5 px-2 rounded text-slate-700" />
                 </div>
              </div>
           </div>

           {/* Civic AI Assistant Card */}
           <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#ccfbf1] rounded-bl-full -z-10 opacity-50"></div>
              
              <div className="flex items-center gap-2 mb-4">
                 <div className="p-1.5 bg-[#ccfbf1] rounded-md"><Brain className="w-4 h-4 text-[#0f766e]"/></div>
                 <h3 className="font-bold text-sm text-slate-900">Civic AI Assistant</h3>
                 <span className="text-[9px] bg-[#dcfce7] text-[#166534] px-1.5 py-0.5 rounded font-bold ml-auto">Beta</span>
              </div>
              
              <div className="space-y-4">
                 <div>
                    <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1 mb-1"><Zap className="w-3 h-3 text-amber-500"/> Suggestions</p>
                    <p className="text-xs text-slate-700">This seems like a Road Issue. Similar issues in your area resolved in 3-5 days.</p>
                 </div>
                 <div>
                    <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1 mb-1"><CheckCircle2 className="w-3 h-3 text-emerald-500"/> Duplicate Check</p>
                    <p className="text-xs text-slate-700">No similar complaints found in this location.</p>
                 </div>
                 <div>
                    <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1 mb-1"><Clock className="w-3 h-3 text-blue-500"/> Est. Resolution Time</p>
                    <p className="text-xs font-bold text-[#115e59]">3 - 5 Working Days</p>
                 </div>
                 
                 <button onClick={() => setActiveModal('guidelines')} className="w-full mt-2 text-xs font-bold text-[#115e59] border border-[#115e59] py-2 rounded-lg hover:bg-[#f0fdfa] transition-colors">
                    View All Insights <ArrowRight className="w-3 h-3 inline ml-1"/>
                 </button>
              </div>
           </div>
           
           <button onClick={() => setActiveModal('emergency')} className="bg-red-50 border border-red-100 text-red-700 rounded-xl p-4 flex items-center justify-between hover:bg-red-100 transition-colors shadow-sm">
              <div className="flex items-center gap-2">
                 <AlertTriangle className="w-5 h-5" />
                 <span className="font-bold text-sm">Emergency Contacts</span>
              </div>
              <ChevronRight className="w-4 h-4" />
           </button>
           
           {/* API Status Mockup Button */}
           <button onClick={() => setActiveModal('api')} className="bg-slate-800 text-white rounded-xl p-3 text-center text-xs font-bold hover:bg-slate-900 transition-colors shadow-sm">
              Show API Integration States
           </button>
           
        </div>
      </main>


      {/* --- MODALS SECTION --- */}
      
      {/* 1. Emergency Contacts Modal */}
      <Modal id="emergency" title="Emergency Contacts">
         <div className="p-4 space-y-3">
            {[
               { name: 'Police', icon: ShieldCheck, num: '100' },
               { name: 'Ambulance', icon: HeartPulse, num: '108' },
               { name: 'Fire Services', icon: AlertTriangle, num: '101' },
               { name: 'Disaster Management', icon: Building, num: '1070' },
               { name: 'Women Helpline', icon: User, num: '1091' }
            ].map((contact, i) => (
               <div key={i} className="flex items-center justify-between p-3 border border-red-100 rounded-lg bg-red-50/30">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-red-100 text-red-600 rounded-lg"><contact.icon className="w-4 h-4"/></div>
                     <span className="text-sm font-bold text-slate-800">{contact.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="text-sm font-black text-red-600">{contact.num}</span>
                     <button className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold rounded-md transition-colors">Call</button>
                  </div>
               </div>
            ))}
         </div>
      </Modal>

      {/* 2. Language Selection Modal */}
      <Modal id="language" title="Language Selection">
         <div className="p-4 space-y-2">
            <p className="text-xs text-slate-500 font-semibold mb-2">Select Your Language</p>
            {[
               { code: 'en', name: 'English', sub: 'English' },
               { code: 'hi', name: 'Hindi', sub: 'हिन्दी' },
               { code: 'te', name: 'Telugu', sub: 'తెలుగు' },
               { code: 'ur', name: 'Urdu', sub: 'اردو' },
            ].map((lang) => (
               <label key={lang.code} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <div className="flex flex-col">
                     <span className="text-sm font-bold text-slate-800">{lang.name}</span>
                     <span className="text-[10px] text-slate-500">{lang.sub}</span>
                  </div>
                  <input type="radio" name="lang" defaultChecked={lang.code === 'en'} className="w-4 h-4 accent-[#115e59]" />
               </label>
            ))}
            <button onClick={closeModal} className="w-full mt-4 bg-[#115e59] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#0f4d48] transition-colors">
               Save
            </button>
         </div>
      </Modal>

      {/* 3. Save Draft & Reset Confirmation Modals */}
      <Modal id="saveDraft" title="Save Draft Confirmation">
         <div className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
               <Save className="w-8 h-8"/>
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Your complaint will be saved as draft.</h3>
            <p className="text-sm text-slate-500 mb-6">You can continue later from your Dashboard.</p>
            <div className="flex gap-3">
               <button onClick={closeModal} className="flex-1 bg-white border border-slate-300 text-slate-700 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">Cancel</button>
               <button onClick={closeModal} className="flex-1 bg-[#115e59] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#0f4d48] transition-colors">Save Draft</button>
            </div>
         </div>
      </Modal>

      <Modal id="reset" title="Reset Confirmation">
         <div className="p-6 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
               <AlertTriangle className="w-8 h-8"/>
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Are you sure you want to reset?</h3>
            <p className="text-sm text-slate-500 mb-6">All entered data will be lost and cannot be recovered.</p>
            <div className="flex gap-3">
               <button onClick={closeModal} className="flex-1 bg-white border border-slate-300 text-slate-700 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">Cancel</button>
               <button onClick={closeModal} className="flex-1 bg-red-600 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-red-700 transition-colors">Reset</button>
            </div>
         </div>
      </Modal>

      {/* 4. Google Maps Fullscreen Modal */}
      <Modal id="mapFullscreen" title="Google Maps - Fullscreen" width="max-w-3xl">
         <div className="p-4 bg-slate-100">
            <div className="bg-white p-2 rounded-lg shadow-sm mb-4 flex items-center gap-2 border border-slate-200">
               <Search className="w-4 h-4 text-slate-400" />
               <input type="text" defaultValue="Tank Bund Road, Hyderabad" className="flex-1 text-sm outline-none" />
               <button className="text-xs font-bold text-white bg-blue-600 px-3 py-1.5 rounded">Search</button>
            </div>
            <div className="w-full h-80 bg-slate-300 rounded-xl relative overflow-hidden border border-slate-300 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <MapPin className="w-12 h-12 text-red-500 drop-shadow-lg" />
               </div>
            </div>
            <div className="flex justify-end mt-4">
               <button onClick={closeModal} className="bg-[#115e59] text-white px-6 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-[#0f4d48]">Confirm Location</button>
            </div>
         </div>
      </Modal>

      {/* 5. Voice Recording Modal */}
      <Modal id="voice" title="Voice Recording">
         <div className="p-6 text-center">
            <div className="flex items-center justify-center gap-6 mb-6">
               <p className="text-2xl font-mono font-bold text-slate-700 tracking-wider">00:01 / 02:00</p>
            </div>
            
            {/* Visualizer Mockup */}
            <div className="flex items-center justify-center gap-1 h-12 mb-8 px-8">
               {[...Array(30)].map((_, i) => (
                  <div key={i} className="w-1.5 bg-[#115e59] rounded-full" style={{ height: `${Math.random() * 100}%`, opacity: Math.random() > 0.5 ? 1 : 0.3 }}></div>
               ))}
            </div>

            <div className="flex items-center justify-center gap-6 mb-8">
               <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"><Square className="w-4 h-4 text-slate-600 fill-current"/></button>
               <button className="w-16 h-16 rounded-full bg-red-50 border-4 border-red-100 flex items-center justify-center hover:bg-red-100 transition-colors shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-red-500"></div>
               </button>
               <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"><Play className="w-4 h-4 text-slate-600 fill-current"/></button>
            </div>
            
            <div className="text-left bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
               <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Transcription (AI Generated)</p>
               <p className="text-xs text-slate-700 italic">"There is a big pothole on the main road near my area which is causing traffic jams and vehicle damage. It needs immediate repair."</p>
            </div>

            <div className="flex gap-3">
               <button onClick={closeModal} className="flex-1 bg-white border border-slate-300 text-slate-700 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">Cancel</button>
               <button onClick={closeModal} className="flex-1 bg-[#115e59] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#0f4d48] transition-colors">Save Recording</button>
            </div>
         </div>
      </Modal>

      {/* 6. Complaint Preview Modal */}
      <Modal id="preview" title="Complaint Preview" width="max-w-2xl">
         <div className="p-6 bg-slate-50 h-96 overflow-y-auto">
            <h3 className="font-bold text-lg text-slate-900 mb-4">Review Your Complaint</h3>
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <div><span className="text-xs text-slate-500 block">Category</span><strong className="text-sm">Roads</strong></div>
                  <div><span className="text-xs text-slate-500 block">Department</span><strong className="text-sm">Municipal Corporation</strong></div>
                  <div><span className="text-xs text-slate-500 block">Severity</span><strong className="text-sm text-red-600">High</strong></div>
                  <div><span className="text-xs text-slate-500 block">Location</span><strong className="text-sm">Tank Bund Road, Hyderabad</strong></div>
               </div>
               <div className="border-t border-slate-100 pt-4">
                  <span className="text-xs text-slate-500 block mb-1">Description</span>
                  <p className="text-sm text-slate-800">There is a huge pothole on the main road near my area which is causing traffic jams and vehicle damage. This issue has been there for more than 2 weeks and needs immediate attention.</p>
               </div>
               <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                  <div><span className="text-xs text-slate-500 block">Media Uploaded</span><strong className="text-sm">5 Files (3 Images, 2 Videos)</strong></div>
                  <div><span className="text-xs text-slate-500 block">Voice Recording</span><strong className="text-sm">Yes (0:45s)</strong></div>
               </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
               <button onClick={closeModal} className="bg-white border border-slate-300 text-slate-700 px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">Edit</button>
               <button onClick={() => setActiveModal('success')} className="bg-[#115e59] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#0f4d48] transition-colors">Confirm & Submit</button>
            </div>
         </div>
      </Modal>

      {/* 7. Submit Success Modal */}
      <Modal id="success" title="Submit Success">
         <div className="p-8 text-center bg-emerald-50">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-200">
               <CheckCircle2 className="w-10 h-10"/>
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-2">Complaint Submitted Successfully!</h3>
            <p className="text-sm text-slate-600 mb-6">Your complaint has been registered and routed to the Municipal Corporation.</p>
            
            <div className="bg-white border border-emerald-100 rounded-xl p-4 mb-6 shadow-sm">
               <p className="text-xs text-slate-500 uppercase font-bold mb-1">Complaint ID</p>
               <p className="text-lg font-black text-emerald-800 font-mono tracking-wider">CIVIC/2026/05/20/12345</p>
            </div>

            <div className="flex flex-col gap-3">
               <div className="flex gap-3">
                  <button onClick={closeModal} className="flex-1 bg-white border border-slate-300 text-slate-700 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors flex justify-center items-center gap-2"><FileDigit className="w-4 h-4"/> Download Receipt</button>
                  <button onClick={() => setActiveModal('tracking')} className="flex-1 bg-slate-800 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-slate-900 transition-colors">Track Complaint</button>
               </div>
               <Link to="/dashboard/user" className="w-full bg-[#115e59] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#0f4d48] transition-colors text-center shadow-md">
                  Go to Dashboard
               </Link>
            </div>
         </div>
      </Modal>

      {/* Misc placeholder modals to prove they all work based on screenshot */}
      <Modal id="api" title="API Integration States">
         <div className="p-6 grid grid-cols-2 gap-4 text-center">
            <div className="p-4 border border-slate-200 rounded-lg">
               <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-2"></div>
               <p className="text-xs font-bold">Loading State</p>
            </div>
            <div className="p-4 border border-emerald-200 bg-emerald-50 rounded-lg text-emerald-600">
               <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
               <p className="text-xs font-bold">Success State</p>
            </div>
            <div className="p-4 border border-red-200 bg-red-50 rounded-lg text-red-600">
               <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
               <p className="text-xs font-bold">Error State</p>
               <button className="mt-2 text-[10px] bg-red-600 text-white px-2 py-1 rounded">Retry</button>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg text-slate-400">
               <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
               <p className="text-xs font-bold">Empty State</p>
            </div>
         </div>
      </Modal>
      
      <Modal id="mediaManager" title="Upload Media Manager" width="max-w-2xl">
         <div className="p-4">
            <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-2">
               <div className="flex gap-4">
                  <span className="text-sm font-bold text-[#115e59] border-b-2 border-[#115e59] pb-2">All Media Files</span>
                  <span className="text-sm font-bold text-slate-400">Images (3)</span>
                  <span className="text-sm font-bold text-slate-400">Videos (2)</span>
                  <span className="text-sm font-bold text-slate-400">Docs (1)</span>
               </div>
               <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1"><Plus className="w-3 h-3"/> Add More Files</button>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
               {[1,2,3,4,5].map(i => (
                  <div key={i} className="aspect-square bg-slate-200 rounded-lg border border-slate-300 relative overflow-hidden group">
                     <img src={`https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=200&q=80`} alt="pothole" className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button className="p-1.5 bg-white text-slate-800 rounded hover:bg-slate-100"><Eye className="w-4 h-4"/></button>
                        <button className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"><X className="w-4 h-4"/></button>
                     </div>
                  </div>
               ))}
            </div>
            <div className="flex justify-between items-center border-t border-slate-100 pt-4">
               <span className="text-xs font-bold text-slate-500">Total 10 Files (120 MB)</span>
               <button onClick={closeModal} className="bg-[#115e59] text-white px-8 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-[#0f4d48]">Done</button>
            </div>
         </div>
      </Modal>

      <Modal id="camera" title="Camera Capture">
         <div className="p-4 bg-black">
            <div className="w-full aspect-[4/3] bg-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center">
               <img src="https://images.unsplash.com/photo-1595278069441-2f29f8038d8d?w=800&q=80" alt="camera feed mockup" className="w-full h-full object-cover opacity-80" />
               <div className="absolute inset-0 border-[4px] border-white/20 m-4 rounded-lg pointer-events-none"></div>
               {/* Focus box */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-yellow-400">
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-yellow-400"></div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-yellow-400"></div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-yellow-400"></div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-yellow-400"></div>
               </div>
            </div>
            <div className="flex justify-between items-center mt-6 px-4">
               <button onClick={closeModal} className="text-white text-xs font-bold">Retake</button>
               <button className="w-16 h-16 rounded-full border-4 border-white/50 bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white"></div>
               </button>
               <button onClick={closeModal} className="bg-[#115e59] text-white px-4 py-2 rounded-lg text-xs font-bold">Use Photo</button>
            </div>
         </div>
      </Modal>

    </div>
  );
};