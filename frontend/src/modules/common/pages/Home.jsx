import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, Activity, Brain, Clock, Search, FileText, 
  ChevronDown, Smartphone, Star, Map, Users, Heart, Camera, Mic, 
  Globe, Zap, AlertTriangle, Building, Truck, Briefcase, Plus, Minus,
  Phone, Mail, MessageSquare, BookOpen, CheckCircle2, ChevronRight, MapPin, Bell,
  ClipboardCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import charminarImg from '../../../assets/charminar.png';
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Data for Analytics Dashboard preview
const trendData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 550 },
  { name: 'Apr', value: 450 },
  { name: 'May', value: 700 },
  { name: 'Jun', value: 650 },
  { name: 'Jul', value: 800 },
];
const pieData = [
  { name: 'Resolved', value: 65 },
  { name: 'In Progress', value: 25 },
  { name: 'Pending', value: 10 },
];
const COLORS = ['#3b82f6', '#f59e0b', '#ef4444'];

export const Home = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="w-full bg-white font-sans text-slate-800">
      
      {/* 1. Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-24 pb-12 bg-white">
        <div 
          className="relative max-w-[1400px] mx-auto rounded-[32px] overflow-hidden bg-cover bg-center min-h-[480px] lg:min-h-[520px] flex items-center p-6 sm:p-10 lg:p-16 text-white shadow-2xl border border-slate-100"
          style={{ backgroundImage: `url(${charminarImg})` }}
        >
          {/* Responsive Background Overlays for a premium dark-ambient look that highlights sunset colors */}
          <div className="absolute inset-0 bg-black/50 lg:hidden" />
          <div 
            className="hidden lg:block absolute inset-0" 
            style={{
              background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0) 100%)'
            }}
          />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center w-full">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Together for a <br />
                Better <span className="text-[#00ff87] drop-shadow-sm">Hyderabad</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-200 max-w-md leading-relaxed font-medium">
                Report issues, track progress, and contribute to cleaner, safer, and smarter communities.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link 
                  to="/report" 
                  className="px-6 py-3.5 bg-[#007a3e] hover:bg-[#006030] text-white rounded-xl font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2 shadow-[#007a3e]/20"
                >
                  <FileText className="w-5 h-5" />
                  Report an Issue
                </Link>
                <Link 
                  to="/track" 
                  className="px-6 py-3.5 bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-xl font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md flex items-center gap-2 backdrop-blur-sm"
                >
                  <Search className="w-5 h-5 text-white/80" />
                  Track an Issue
                </Link>
              </div>
            </div>

            {/* Right Card (Hyderabad at a Glance) */}
            <div className="w-full flex justify-center lg:justify-end">
              <div className="bg-white/10 backdrop-blur-lg rounded-[28px] p-6 shadow-2xl border border-white/20 w-full max-w-md transition-all duration-300 hover:bg-white/15 hover:border-white/30">
                <div className="mb-6">
                  <h3 className="text-base sm:text-lg font-bold text-white">Hyderabad at a Glance</h3>
                  <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Real-time Overview</p>
                </div>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
                  {/* 1. Issues Reported */}
                  <div className="flex flex-col items-center text-center group cursor-pointer">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-350 flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/5 group-hover:scale-110 transition-transform duration-300 border border-emerald-500/30">
                      <ClipboardCheck className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-extrabold text-white">2,568</span>
                    <span className="text-[10px] text-white/70 font-bold leading-tight mt-0.5">Issues Reported</span>
                    <span className="text-[9px] text-emerald-400 font-extrabold mt-1 flex items-center gap-0.5">
                      ↑ 15% <span className="text-white/40 font-medium font-sans">this week</span>
                    </span>
                  </div>

                  {/* 2. Resolved Issues */}
                  <div className="flex flex-col items-center text-center group cursor-pointer">
                    <div className="w-11 h-11 rounded-2xl bg-blue-500/20 text-blue-355 flex items-center justify-center mb-3 shadow-lg shadow-blue-500/5 group-hover:scale-110 transition-transform duration-300 border border-blue-500/30">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-extrabold text-white">1,782</span>
                    <span className="text-[10px] text-white/70 font-bold leading-tight mt-0.5">Resolved Issues</span>
                    <span className="text-[9px] text-emerald-400 font-extrabold mt-1 flex items-center gap-0.5">
                      ↑ 18% <span className="text-white/40 font-medium font-sans">this week</span>
                    </span>
                  </div>

                  {/* 3. In Progress */}
                  <div className="flex flex-col items-center text-center group cursor-pointer">
                    <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-350 flex items-center justify-center mb-3 shadow-lg shadow-amber-500/5 group-hover:scale-110 transition-transform duration-300 border border-amber-500/30">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-extrabold text-white">486</span>
                    <span className="text-[10px] text-white/70 font-bold leading-tight mt-0.5">In Progress</span>
                    <span className="text-[9px] text-emerald-400 font-extrabold mt-1 flex items-center gap-0.5">
                      ↑ 6% <span className="text-white/40 font-medium font-sans">this week</span>
                    </span>
                  </div>

                  {/* 4. Active Citizens */}
                  <div className="flex flex-col items-center text-center group cursor-pointer">
                    <div className="w-11 h-11 rounded-2xl bg-purple-500/20 text-purple-350 flex items-center justify-center mb-3 shadow-lg shadow-purple-500/5 group-hover:scale-110 transition-transform duration-300 border border-purple-500/30">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-extrabold text-white">4,328</span>
                    <span className="text-[10px] text-white/70 font-bold leading-tight mt-0.5">Active Citizens</span>
                    <span className="text-[9px] text-emerald-400 font-extrabold mt-1 flex items-center gap-0.5">
                      ↑ 21% <span className="text-white/40 font-medium font-sans">this week</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trusted By */}
      <section className="py-10 border-b border-slate-200">
         <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-center text-lg font-bold text-slate-800 mb-8">Trusted by Government & Public Sector Organisations</h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Placeholders for exact logos */}
               <div className="text-center"><div className="w-12 h-12 bg-slate-300 mx-auto rounded-full mb-2"></div><span className="text-[10px] font-bold">Smart City</span></div>
               <div className="text-center"><div className="w-12 h-12 bg-slate-300 mx-auto rounded-full mb-2"></div><span className="text-[10px] font-bold">Ministry of Housing</span></div>
               <div className="text-center"><div className="w-12 h-12 bg-slate-300 mx-auto rounded-full mb-2"></div><span className="text-[10px] font-bold">Digital India</span></div>
               <div className="text-center"><div className="w-12 h-12 bg-slate-300 mx-auto rounded-full mb-2"></div><span className="text-[10px] font-bold">MyGov</span></div>
               <div className="text-center"><div className="w-12 h-12 bg-slate-300 mx-auto rounded-full mb-2"></div><span className="text-[10px] font-bold">Swachh Bharat</span></div>
               <div className="text-center"><div className="w-12 h-12 bg-slate-300 mx-auto rounded-full mb-2"></div><span className="text-[10px] font-bold">NITI Aayog</span></div>
            </div>
         </div>
      </section>

      {/* 3. Stats Row */}
      <section className="py-12 bg-white">
         <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center divide-x divide-slate-100">
               {[
                  { value: '250,000+', label: 'Total Complaints', icon: <FileText className="w-5 h-5"/> },
                  { value: '200,000+', label: 'Issues Resolved', icon: <CheckCircle2 className="w-5 h-5"/> },
                  { value: '650+', label: 'Active Departments', icon: <Building className="w-5 h-5"/> },
                  { value: '2.4 Days', label: 'Avg. Resolution Time', icon: <Clock className="w-5 h-5"/> },
                  { value: '1.2M+', label: 'Citizens Registered', icon: <Users className="w-5 h-5"/> },
                  { value: '98.7%', label: 'AI Accuracy Rate', icon: <Brain className="w-5 h-5"/> }
               ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center pl-6 first:pl-0 border-l-0">
                     <div className="text-blue-500 mb-2">{stat.icon}</div>
                     <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                     <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. Smart Features */}
      <section className="py-16 bg-slate-50">
         <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">AI-Powered Smart Features</h2>
            <p className="text-sm text-slate-500 mb-12">Experience the next generation of civic issue management with intelligent automation.</p>
            
            <div className="flex flex-wrap justify-center gap-10">
               {[
                  { name: 'AI Complaint\nClassification', icon: <Brain className="w-6 h-6"/> },
                  { name: 'Smart\nRouting', icon: <ArrowRight className="w-6 h-6"/> },
                  { name: 'Image & Video\nAnalysis', icon: <Camera className="w-6 h-6"/> },
                  { name: 'Voice Complaint\nSubmission', icon: <Mic className="w-6 h-6"/> },
                  { name: 'Multi-Language\nSupport', icon: <Globe className="w-6 h-6"/> },
                  { name: 'AI Priority\nDetection', icon: <AlertTriangle className="w-6 h-6"/> },
                  { name: 'Real-time\nTracking', icon: <MapPin className="w-6 h-6"/> },
                  { name: 'Predictive\nAnalytics', icon: <Activity className="w-6 h-6"/> },
                  { name: 'Smart\nNotifications', icon: <Bell className="w-6 h-6"/> },
                  { name: 'Fraud\nDetection', icon: <ShieldCheck className="w-6 h-6"/> },
               ].map((feature, i) => (
                  <div key={i} className="flex flex-col items-center w-24">
                     <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-500 mb-3 border border-slate-100">
                        {feature.icon}
                     </div>
                     <p className="text-[11px] font-semibold text-slate-700 whitespace-pre-line leading-tight">{feature.name}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. What issues can you report? */}
      <section className="py-16 bg-white border-y border-slate-100">
         <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-10">What issues can you report?</h2>
            <div className="flex flex-wrap justify-center gap-6">
               {[
                  { name: 'Roads', icon: <Map className="w-6 h-6"/> },
                  { name: 'Water Supply', icon: <Zap className="w-6 h-6 text-blue-500"/> },
                  { name: 'Electricity', icon: <Zap className="w-6 h-6 text-yellow-500"/> },
                  { name: 'Garbage Collection', icon: <Building className="w-6 h-6 text-green-500"/> },
                  { name: 'Street Lights', icon: <Zap className="w-6 h-6 text-slate-800"/> },
                  { name: 'Public Toilets', icon: <Building className="w-6 h-6 text-amber-500"/> },
                  { name: 'Education', icon: <BookOpen className="w-6 h-6 text-indigo-500"/> },
                  { name: 'Environment', icon: <Globe className="w-6 h-6 text-emerald-500"/> },
                  { name: 'Public Transport', icon: <Truck className="w-6 h-6 text-red-500"/> },
               ].map((issue, i) => (
                  <div key={i} className="flex flex-col items-center w-32 px-4 py-6 border border-slate-200 rounded-2xl hover:shadow-md transition-shadow cursor-pointer bg-white">
                     <div className="mb-4">{issue.icon}</div>
                     <p className="text-[11px] font-bold text-slate-800">{issue.name}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. How Civic AI Works */}
      <section className="py-16 bg-slate-50">
         <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">How Civic AI Works</h2>
            <p className="text-sm text-slate-500 mb-16">Simple steps to a better tomorrow.</p>
            
            <div className="flex flex-col md:flex-row justify-between items-start relative px-10">
               {/* Connecting Line */}
               <div className="hidden md:block absolute top-10 left-16 right-16 h-0.5 bg-blue-100 z-0"></div>
               
               {[
                  { title: 'Register / Login', desc: 'Create your account\nin few seconds', icon: <Users className="w-5 h-5"/> },
                  { title: 'Submit Complaint', desc: 'Provide details with\nphoto or video', icon: <FileText className="w-5 h-5"/> },
                  { title: 'AI Categorises', desc: 'Our AI identifies the\nissue instantly', icon: <Brain className="w-5 h-5"/> },
                  { title: 'Department Assigned', desc: 'Automatically routed to\nthe right department', icon: <Building className="w-5 h-5"/> },
                  { title: 'Live Tracking', desc: 'Track status in real-time\nfrom your dashboard', icon: <MapPin className="w-5 h-5"/> },
                  { title: 'Resolution', desc: 'Department resolves\nthe issue', icon: <CheckCircle2 className="w-5 h-5"/> },
                  { title: 'Feedback', desc: 'Rate your experience\nand help us improve', icon: <MessageSquare className="w-5 h-5"/> },
               ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center relative z-10 w-32 mb-8 md:mb-0">
                     <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center text-blue-500 mb-4 border border-blue-50">
                        {step.icon}
                     </div>
                     <h4 className="text-xs font-bold text-slate-900 mb-1">{step.title}</h4>
                     <p className="text-[10px] text-slate-500 whitespace-pre-line leading-relaxed">{step.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 7. Split Section: Map & Analytics */}
      <section className="py-16 bg-white">
         <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Live Issue Map */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden relative min-h-[400px]">
               {/* Map Background Placeholder */}
               <div className="absolute inset-0 bg-[#e5e7eb] opacity-50 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
               
               <div className="relative z-10 p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Live Issue Map</h3>
                  <p className="text-sm text-slate-600 mb-6 max-w-xs">Explore real-time issues and department activity in your area.</p>
                  
                  <ul className="space-y-3 mb-8">
                     <li className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Live Issue Locations
                     </li>
                     <li className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Department Coverage
                     </li>
                     <li className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Heatmap Analytics
                     </li>
                     <li className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Area Insights
                     </li>
                  </ul>
                  
                  <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-xs font-bold shadow-sm flex items-center gap-2 hover:bg-slate-50">
                     Explore Map <Map className="w-4 h-4" />
                  </button>
               </div>
               
               {/* Map Pins */}
               <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
               <div className="absolute top-1/4 right-1/3 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
               <div className="absolute bottom-1/3 right-1/5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-lg"></div>
               
               {/* Map Popup Card */}
               <div className="absolute top-1/2 right-1/4 translate-x-4 translate-y-4 bg-white p-3 rounded-lg shadow-xl border border-slate-100 w-48">
                  <h4 className="text-xs font-bold mb-1">Water Leakage</h4>
                  <p className="text-[10px] text-slate-500 mb-2">Secunderabad, TS<br/>Reported 15 min ago</p>
                  <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-bold rounded">In Progress</span>
               </div>
            </div>

            {/* AI Analytics Dashboard */}
            <div className="bg-[#0a192f] rounded-2xl border border-slate-800 p-8 text-white flex flex-col">
               <h3 className="text-xl font-bold mb-2">AI Analytics Dashboard</h3>
               <p className="text-sm text-slate-400 mb-8 max-w-sm">Insights that drive better decisions and faster actions.</p>
               
               <div className="grid grid-cols-2 gap-4 mb-8 flex-1">
                  <div className="bg-[#112240] p-4 rounded-xl border border-slate-700/50">
                     <p className="text-[10px] text-slate-400 mb-1">Total Complaints</p>
                     <p className="text-xl font-bold text-blue-400">25,600</p>
                  </div>
                  <div className="bg-[#112240] p-4 rounded-xl border border-slate-700/50">
                     <p className="text-[10px] text-slate-400 mb-1">Resolved</p>
                     <p className="text-xl font-bold text-emerald-400">20,130</p>
                  </div>
                  <div className="bg-[#112240] p-4 rounded-xl border border-slate-700/50">
                     <p className="text-[10px] text-slate-400 mb-1">In Progress</p>
                     <p className="text-xl font-bold text-amber-400">4,320</p>
                  </div>
                  <div className="bg-[#112240] p-4 rounded-xl border border-slate-700/50 flex flex-col items-center justify-center">
                     <div className="w-16 h-16 relative">
                        <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                             <Pie data={pieData} cx="50%" cy="50%" innerRadius={20} outerRadius={30} fill="#8884d8" paddingAngle={5} dataKey="value">
                               {pieData.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                               ))}
                             </Pie>
                           </PieChart>
                        </ResponsiveContainer>
                     </div>
                     <p className="text-[9px] text-slate-400 mt-2 text-center">Performance</p>
                  </div>
               </div>
               
               <button className="bg-white text-slate-900 px-4 py-2 rounded-lg text-xs font-bold w-32 hover:bg-slate-100 transition-colors">
                  View Analytics
               </button>
            </div>
            
         </div>
      </section>

      {/* 8. Our Departments */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
         <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-10">Our Departments</h2>
            <div className="flex flex-wrap justify-center gap-8">
               {[
                  { name: 'Municipal\nCorporation', icon: <Building className="w-6 h-6"/> },
                  { name: 'Water\nDepartment', icon: <Zap className="w-6 h-6 text-blue-500"/> },
                  { name: 'Electricity\nBoard', icon: <Zap className="w-6 h-6 text-yellow-500"/> },
                  { name: 'Police\nDepartment', icon: <ShieldCheck className="w-6 h-6 text-slate-800"/> },
                  { name: 'Transport\nDepartment', icon: <Truck className="w-6 h-6 text-indigo-500"/> },
                  { name: 'Health\nDepartment', icon: <Heart className="w-6 h-6 text-red-500"/> },
                  { name: 'Sanitation\nDepartment', icon: <Building className="w-6 h-6 text-emerald-500"/> },
                  { name: 'Education\nDepartment', icon: <BookOpen className="w-6 h-6 text-blue-400"/> },
                  { name: 'Environment\nDepartment', icon: <Globe className="w-6 h-6 text-green-600"/> },
               ].map((dept, i) => (
                  <div key={i} className="flex flex-col items-center w-28">
                     <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-500 mb-3 border border-slate-200">
                        {dept.icon}
                     </div>
                     <p className="text-[10px] font-bold text-slate-700 whitespace-pre-line leading-tight">{dept.name}</p>
                  </div>
               ))}
            </div>
            <div className="mt-8 flex justify-end">
               <button className="text-xs font-bold text-blue-600 border border-blue-200 bg-white px-4 py-2 rounded-md hover:bg-blue-50">
                 Read More Updates
               </button>
            </div>
         </div>
      </section>

      {/* 9. Success Stories & Citizens Say */}
      <section className="py-16 bg-white">
         <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Success Stories */}
            <div>
               <h2 className="text-2xl font-bold text-slate-900 mb-1">Success Stories</h2>
               <p className="text-sm text-slate-500 mb-8">Real impact, real change.</p>
               
               <h3 className="text-lg font-bold text-slate-900 mb-2">Hyderabad, Telangana</h3>
               <p className="text-sm text-slate-600 mb-6 max-w-md">
                  AI-powered waste management system helped resolve 10,000+ garbage complaints in just 30 days.
               </p>
               
               <div className="flex gap-8 mb-6">
                  <div>
                     <p className="text-xl font-bold text-emerald-600">10,000+</p>
                     <p className="text-xs text-slate-500">Issues Resolved</p>
                  </div>
                  <div>
                     <p className="text-xl font-bold text-emerald-600">40%</p>
                     <p className="text-xs text-slate-500">Faster Resolution</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-1/2 h-32 bg-slate-200 rounded-xl relative overflow-hidden flex items-end p-2 bg-[url('https://images.unsplash.com/photo-1595278069441-2f29f8038d8d?q=80&w=2070')] bg-cover bg-center">
                     <span className="bg-black/50 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">Before</span>
                  </div>
                  <div className="w-1/2 h-32 bg-emerald-100 rounded-xl relative overflow-hidden flex items-end p-2 bg-[url('https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2065')] bg-cover bg-center">
                     <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded">After</span>
                  </div>
               </div>
               
               <button className="mt-6 text-xs font-bold text-blue-600 border border-blue-200 bg-white px-4 py-2 rounded-md hover:bg-blue-50">
                 Read More Stories
               </button>
            </div>

            {/* What Citizens Say */}
            <div className="bg-slate-50 p-10 rounded-2xl border border-slate-200 relative">
               <h2 className="text-2xl font-bold text-slate-900 mb-1">What Citizens Say</h2>
               <p className="text-sm text-slate-500 mb-10">Trusted by thousands of citizens.</p>
               
               <div className="relative z-10">
                  <p className="text-lg text-slate-700 italic mb-8 max-w-md">
                     "Civic AI made it so easy to report an issue and track it. My complaint was resolved in just 2 days!"
                  </p>
                  
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-slate-300 rounded-full bg-[url('https://i.pravatar.cc/150?img=47')] bg-cover"></div>
                        <div>
                           <p className="font-bold text-slate-900 text-sm">Priya Sharma</p>
                           <p className="text-xs text-slate-500">Hyderabad, Telangana</p>
                        </div>
                     </div>
                     <div className="flex text-amber-400 gap-1">
                        <Star className="w-4 h-4 fill-current"/>
                        <Star className="w-4 h-4 fill-current"/>
                        <Star className="w-4 h-4 fill-current"/>
                        <Star className="w-4 h-4 fill-current"/>
                        <Star className="w-4 h-4 fill-current"/>
                     </div>
                  </div>
               </div>
               
               <div className="absolute top-20 right-10 text-[100px] text-slate-200 opacity-50 font-serif leading-none">"</div>
               
               <div className="absolute bottom-10 right-10 flex gap-2">
                  <button className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-white transition-colors"><ChevronRight className="w-4 h-4 rotate-180"/></button>
                  <button className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-white transition-colors"><ChevronRight className="w-4 h-4"/></button>
               </div>
            </div>
            
         </div>
      </section>

      {/* 10. Mobile App & FAQ Area */}
      <section className="py-16 bg-white border-t border-slate-200">
         <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Mobile App Box */}
            <div className="bg-[#0a192f] rounded-[2rem] overflow-hidden flex flex-col md:flex-row relative items-center p-8 md:p-12 h-auto md:h-[400px]">
               {/* Left side Phone mockups */}
               <div className="relative w-full md:w-1/2 h-[300px] md:h-full flex justify-center md:justify-start">
                  <div className="w-40 h-[320px] bg-white rounded-3xl absolute bottom-0 left-0 md:left-4 translate-y-12 shadow-2xl border-4 border-slate-800"></div>
                  <div className="w-44 h-[350px] bg-white rounded-3xl absolute bottom-0 left-20 md:left-24 translate-y-4 shadow-2xl border-4 border-slate-800 z-10 flex flex-col">
                     <div className="h-10 bg-blue-600 w-full rounded-t-2xl"></div>
                     <div className="flex-1 bg-slate-50 p-2 space-y-2">
                        <div className="w-full h-16 bg-white rounded-lg shadow-sm"></div>
                        <div className="w-full h-10 bg-white rounded-lg shadow-sm"></div>
                     </div>
                  </div>
               </div>
               
               {/* Right side content */}
               <div className="w-full md:w-1/2 z-20 text-white mt-12 md:mt-0 pl-0 md:pl-8">
                  <h2 className="text-2xl font-bold mb-1">Civic AI Mobile App</h2>
                  <p className="text-lg font-bold text-blue-400 mb-4">Your Smart Civic Companion</p>
                  <p className="text-sm text-slate-300 mb-8 max-w-sm">
                     Report issues, track status, get notifications and stay updated - all from your mobile.
                  </p>
                  <div className="flex flex-wrap gap-4">
                     <button className="bg-black border border-slate-700 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-slate-900 transition-colors">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                        <div className="text-left">
                           <p className="text-[9px] uppercase">Get it on</p>
                           <p className="text-xs font-bold leading-none">Google Play</p>
                        </div>
                     </button>
                     <button className="bg-black border border-slate-700 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-slate-900 transition-colors">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91 1.65.17 2.78.82 3.63 1.94-1.63 1.05-2.02 3.01-1.04 4.54.91 1.44 2.5 2.05 2.5 2.05-.18 1.45-.98 2.96-2.3 4.13zM12.92 5.25c.78-.97 1.3-2.31 1.15-3.64-1.12.05-2.52.76-3.32 1.73-.71.86-1.33 2.24-1.16 3.54 1.26.1 2.54-.66 3.33-1.63z"/></svg>
                        <div className="text-left">
                           <p className="text-[9px] uppercase">Download on the</p>
                           <p className="text-xs font-bold leading-none">App Store</p>
                        </div>
                     </button>
                  </div>
               </div>
            </div>

            {/* FAQ & Help Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* FAQs */}
               <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-3">
                     {[
                        'How do I report an issue?',
                        'How can I track my complaint?',
                        'Is Civic AI available in my language?',
                        'How long does it take to resolve an issue?'
                     ].map((q, i) => (
                        <div key={i} className="border border-slate-200 rounded-lg p-3 flex justify-between items-center cursor-pointer hover:bg-slate-50">
                           <span className="text-xs font-semibold text-slate-800">{q}</span>
                           <Plus className="w-4 h-4 text-slate-400" />
                        </div>
                     ))}
                  </div>
                  <div className="mt-4 text-center">
                     <button className="text-xs font-bold text-blue-600 hover:underline">View All FAQs</button>
                  </div>
               </div>

               {/* Need Help */}
               <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Need Help?</h3>
                  <p className="text-xs text-slate-500 mb-6">We're here to assist you.</p>
                  
                  <div className="space-y-4">
                     <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                           <Phone className="w-4 h-4"/>
                        </div>
                        <div>
                           <p className="text-[10px] text-slate-500 uppercase">Call Us</p>
                           <p className="text-xs font-bold text-slate-900">1800 123 4567</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                           <Mail className="w-4 h-4"/>
                        </div>
                        <div>
                           <p className="text-[10px] text-slate-500 uppercase">Email Us</p>
                           <p className="text-xs font-bold text-slate-900">support@civicai.gov.in</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                           <MessageSquare className="w-4 h-4"/>
                        </div>
                        <div>
                           <p className="text-[10px] text-slate-500 uppercase">Live Chat</p>
                           <p className="text-xs font-bold text-slate-900">Chat with our support team</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                           <BookOpen className="w-4 h-4"/>
                        </div>
                        <div>
                           <p className="text-[10px] text-slate-500 uppercase">Visit Help Center</p>
                           <p className="text-xs font-bold text-slate-900">Get detailed guides & support</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </section>

    </div>
  );
};