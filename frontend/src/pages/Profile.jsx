import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Pencil,
  MapPin,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Settings,
  User,
  Lock,
  Bell,
  Eye,
  Shield,
  Fingerprint,
  Download,
  Trash2,
  ChevronRight,
  Award,
  TrendingUp,
  Send,
  HelpCircle,
  LogOut,
  Activity,
  FileText,
  Smartphone,
  Laptop,
  Check,
  X,
  Plus
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Simple custom CountUp component to avoid external dependency issues
const CountUp = ({ end, duration = 1200 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count}</span>;
};

export default function Profile() {
  // States
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('personal-info'); // settings tabs: personal-info, change-password, security-logins
  const [showAllNotifications, setShowAllNotifications] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Aarav Sharma",
    email: "aarav.sharma@civicpulse.gov.in",
    mobile: "+91 98765 43210",
    dob: "1994-08-15",
    gender: "Male",
    address: "402, Block C, Sector 62",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201301"
  });

  const [tempPersonalInfo, setTempPersonalInfo] = useState({ ...personalInfo });

  const handleSavePersonalInfo = () => {
    setPersonalInfo({ ...tempPersonalInfo });
    setIsEditingPersonal(false);
  };

  const handleCancelPersonalInfo = () => {
    setTempPersonalInfo({ ...personalInfo });
    setIsEditingPersonal(false);
  };

  // Static Mock Data for Recharts
  const monthlyData = [
    { month: 'Jan', submitted: 4, resolved: 3 },
    { month: 'Feb', submitted: 6, resolved: 5 },
    { month: 'Mar', submitted: 8, resolved: 6 },
    { month: 'Apr', submitted: 10, resolved: 8 },
    { month: 'May', submitted: 15, resolved: 12 },
    { month: 'Jun', submitted: 12, resolved: 11 },
    { month: 'Jul', submitted: 18, resolved: 14 }
  ];

  const categoryData = [
    { name: 'Roads & Potholes', count: 18, fill: '#3B82F6' },
    { name: 'Garbage Disposal', count: 15, fill: '#8B5CF6' },
    { name: 'Water & Sewage', count: 14, fill: '#10B981' },
    { name: 'Street Lights', count: 12, fill: '#F59E0B' },
    { name: 'Noise & Pests', count: 9, fill: '#06B6D4' }
  ];

  const statusData = [
    { name: 'Resolved', value: 14, color: '#10B981' },
    { name: 'In Progress', value: 6, color: '#3B82F6' },
    { name: 'Submitted', value: 8, color: '#0F766E' },
    { name: 'Rejected', value: 2, color: '#EF4444' }
  ];

  // Colors for Recharts Pie
  const COLORS = ['#10B981', '#3B82F6', '#0F766E', '#EF4444'];

  const reportsList = [
    {
      id: "C-9082",
      title: "Broken Main Pipeline Leakage",
      date: "24 July 2026",
      category: "Water & Sewage",
      location: "Sec-62 Outer Ring Rd",
      status: "In Progress",
      image: "https://images.unsplash.com/photo-1542060748-10c28b629f6f?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "C-8973",
      title: "Open Pothole Hazard near Crossing",
      date: "18 July 2026",
      category: "Roads & Potholes",
      location: "Near Metro Gate 2",
      status: "Resolved",
      image: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "C-8812",
      title: "Garbage Pile Overflowing Public Bin",
      date: "10 July 2026",
      category: "Garbage Disposal",
      location: "Market Square Area",
      status: "Resolved",
      image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "C-8756",
      title: "Flickering Street lights - Block D",
      date: "04 July 2026",
      category: "Street Lights",
      location: "Greenwood Society St",
      status: "Rejected",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=150&q=80"
    }
  ];

  const timelineStages = [
    { stage: "Submitted", status: "completed", date: "July 24, 09:12 AM" },
    { stage: "AI Classification", status: "completed", date: "July 24, 09:15 AM" },
    { stage: "Dept Assigned", status: "completed", date: "July 24, 11:30 AM" },
    { stage: "Verification", status: "completed", date: "July 25, 10:00 AM" },
    { stage: "Work Started", status: "active", date: "July 26, 08:30 AM" },
    { stage: "Resolved", status: "pending", date: "--" },
    { stage: "Feedback", status: "pending", date: "--" }
  ];

  const achievements = [
    { name: "Active Citizen", desc: "Submit 20+ valid reports", progress: 90, unlocked: false, icon: "🔥" },
    { name: "Verified Reporter", desc: "Successfully verify account ID", progress: 100, unlocked: true, icon: "🛡️" },
    { name: "Smart Citizen", desc: "5 resolved AI-categorized complaints", progress: 100, unlocked: true, icon: "💡" },
    { name: "Community Helper", desc: "Upvote 10 helpful nearby reports", progress: 60, unlocked: false, icon: "🤝" },
    { name: "First Alert", desc: "Submit your very first complaint", progress: 100, unlocked: true, icon: "🚀" },
    { name: "Eco Guardian", desc: "Resolve 5 waste issues in the city", progress: 80, unlocked: false, icon: "🍃" }
  ];

  const notifications = [
    { id: 1, type: "update", text: "Report #C-9082 status updated to 'In Progress'", time: "2 hrs ago", unread: true },
    { id: 2, type: "ai", text: "AI verified and categorized your new report on Road Damage", time: "5 hrs ago", unread: true },
    { id: 3, type: "dept", text: "Water & Sewage Department responded to your inquiry", time: "1 day ago", unread: false },
    { id: 4, type: "profile", text: "Your Profile Verification badge has been unlocked!", time: "3 days ago", unread: false }
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 font-sans selection:bg-teal-500/20 selection:text-teal-900 pb-20">
      
      {/* Title Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 pt-10 pb-6 md:px-8"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">Profile</h1>
        <p className="mt-2 text-slate-500 text-lg">Manage your account configurations, stats, and active civic issues.</p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
        
        {/* Large Profile Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-8 flex flex-col md:flex-row justify-between items-stretch gap-8 relative overflow-hidden"
        >
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-teal-50/40 via-emerald-50/10 to-transparent -mr-20 -mt-20 rounded-full blur-3xl pointer-events-none" />

          {/* Left Side: Avatar & Main Info */}
          <div className="flex-1 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
            {/* Animated Floating Avatar Container */}
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative w-28 h-28 rounded-full border-4 border-teal-500/10 shadow-lg shadow-teal-500/5 bg-slate-100 flex items-center justify-center overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80" 
                alt="Aarav Sharma" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* User Details */}
            <div className="text-center sm:text-left space-y-3 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">{personalInfo.fullName}</h2>
                <div className="flex items-center gap-1.5 self-center sm:self-auto bg-teal-50 text-teal-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-teal-100 shadow-sm">
                  <ShieldCheck size={14} className="text-teal-600" />
                  Verified Citizen
                </div>
              </div>
              <p className="text-slate-500 text-sm flex items-center justify-center sm:justify-start gap-2">
                <Mail size={16} className="text-slate-400" /> {personalInfo.email}
              </p>
              <p className="text-slate-500 text-sm flex items-center justify-center sm:justify-start gap-2">
                <Phone size={16} className="text-slate-400" /> {personalInfo.mobile}
              </p>
              <p className="text-slate-500 text-sm flex items-center justify-center sm:justify-start gap-2">
                <MapPin size={16} className="text-slate-400" /> {personalInfo.city}, {personalInfo.state}
              </p>

              <button 
                onClick={() => {
                  setActiveTab('personal-info');
                  const section = document.getElementById('config-section');
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                  setIsEditingPersonal(true);
                }}
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold bg-teal-750 hover:bg-teal-800 text-white px-4 py-2 rounded-xl transition-all shadow-sm shadow-teal-700/10 hover:shadow-md hover:translate-y-[-1px]"
              >
                <Pencil size={15} />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-slate-200" />

          {/* Right Side: Metadata list */}
          <div className="md:w-72 flex flex-col justify-center space-y-4 text-sm relative z-10">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-400 font-medium">Citizen ID</span>
              <span className="font-mono text-slate-700 font-semibold">#IN-CIVIC-8902</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-400 font-medium">Member Since</span>
              <span className="text-slate-700 font-medium flex items-center gap-2">
                <Calendar size={14} className="text-slate-400" /> August 2024
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-400 font-medium">Last Login</span>
              <span className="text-slate-700 font-medium">Today, 10:42 AM</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-400 font-medium">Platform Trust Score</span>
              <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">98 / 100</span>
            </div>
          </div>
        </motion.div>

        {/* Statistic Cards Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {/* Card 1: Submitted */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 border border-teal-100">
              <FileText size={22} />
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-800">
                <CountUp end={30} />
              </div>
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">Submitted</div>
            </div>
          </motion.div>

          {/* Card 2: In Progress */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
              <Clock size={22} />
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-800">
                <CountUp end={6} />
              </div>
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">In Progress</div>
            </div>
          </motion.div>

          {/* Card 3: Resolved */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-800">
                <CountUp end={22} />
              </div>
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">Resolved</div>
            </div>
          </motion.div>

          {/* Card 4: Rejected */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500 border border-red-100">
              <XCircle size={22} />
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-800">
                <CountUp end={2} />
              </div>
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">Rejected</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Two Column Layout (Recent Reports & Settings) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Recent Reports */}
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Recent Reports</h3>
                <p className="text-slate-400 text-xs mt-0.5">Overview of complaints submitted by you.</p>
              </div>
              <button className="text-teal-700 hover:text-teal-800 font-semibold text-sm flex items-center gap-1 transition-colors">
                View All <ChevronRight size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {reportsList.map((report) => (
                <div 
                  key={report.id}
                  className="flex gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200/80 hover:bg-slate-50/50 transition-all group"
                >
                  <img 
                    src={report.image} 
                    alt={report.title} 
                    className="w-16 h-16 rounded-lg object-cover bg-slate-100 border border-slate-100 group-hover:scale-[1.02] transition-transform" 
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-semibold text-slate-800 group-hover:text-teal-900 transition-colors text-sm line-clamp-1">{report.title}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-sm shrink-0 ${
                        report.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        report.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        'bg-red-50 text-red-600 border-red-100'
                      }`}>{report.status}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                      <span className="font-mono text-slate-600 font-medium">{report.id}</span>
                      <span>•</span>
                      <span>{report.date}</span>
                      <span>•</span>
                      <span className="text-slate-500 font-medium">{report.category}</span>
                    </div>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin size={12} /> {report.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Account Settings Options */}
          <motion.div 
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-800">Account Settings</h3>
              <p className="text-slate-400 text-xs mt-0.5">Quick links to view and manage settings.</p>
            </div>

            <div className="mt-6 space-y-2">
              {[
                { label: "Personal Information", desc: "Edit account info & details", icon: <User size={18} />, tab: 'personal-info' },
                { label: "Change Password", desc: "Update your login credentials", icon: <Lock size={18} />, tab: 'change-password' },
                { label: "Notification Preferences", desc: "Configure updates alerts", icon: <Bell size={18} />, tab: 'notifications' },
                { label: "Security Logins", desc: "Manage sessions & active devices", icon: <Shield size={18} />, tab: 'security-logins' },
                { label: "Two-Factor Auth (2FA)", desc: "Configure double layer safety", icon: <Fingerprint size={18} />, tab: '2fa' },
                { label: "Download Profile Data", desc: "Get JSON export copy", icon: <Download size={18} />, tab: 'download' },
                { label: "Delete Account", desc: "Permanently close membership", icon: <Trash2 size={18} />, danger: true, tab: 'delete' }
              ].map((item, idx) => (
                <button 
                  key={idx}
                  onClick={() => {
                    if (item.tab === 'personal-info' || item.tab === 'change-password' || item.tab === 'security-logins') {
                      setActiveTab(item.tab);
                      const element = document.getElementById('config-section');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-50 hover:border-slate-100 hover:bg-slate-50/60 transition-all text-left group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                      item.danger ? 'bg-red-50 text-red-500 border border-red-100' :
                      'bg-slate-50 text-slate-500 border border-slate-100 group-hover:bg-teal-50 group-hover:text-teal-700 group-hover:border-teal-100'
                    }`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className={`font-semibold text-sm ${item.danger ? 'text-red-600' : 'text-slate-700'}`}>{item.label}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                  <ChevronRight size={16} className={`text-slate-300 transition-transform ${item.danger ? 'group-hover:text-red-500' : 'group-hover:text-teal-700'} group-hover:translate-x-1`} />
                </button>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Expandable Form Configuration Section */}
        <motion.div 
          id="config-section"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6"
        >
          {/* Header Controls / Tabs */}
          <div className="flex border-b border-slate-100 pb-4 mb-6 overflow-x-auto gap-4">
            <button 
              onClick={() => setActiveTab('personal-info')}
              className={`pb-2 px-1 text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'personal-info' ? 'border-teal-700 text-teal-800' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Personal Information
            </button>
            <button 
              onClick={() => setActiveTab('change-password')}
              className={`pb-2 px-1 text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'change-password' ? 'border-teal-700 text-teal-800' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Change Password
            </button>
            <button 
              onClick={() => setActiveTab('security-logins')}
              className={`pb-2 px-1 text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'security-logins' ? 'border-teal-700 text-teal-800' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Security Settings & Logins
            </button>
          </div>

          {/* Tab content renderer */}
          <AnimatePresence mode="wait">
            {activeTab === 'personal-info' && (
              <motion.div 
                key="personal-info-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-bold text-slate-800">Edit Personal Details</h4>
                    <p className="text-slate-400 text-xs mt-0.5">Keep your details updated for official communication.</p>
                  </div>
                  {!isEditingPersonal && (
                    <button 
                      onClick={() => setIsEditingPersonal(true)}
                      className="text-teal-700 hover:text-teal-800 text-sm font-semibold border border-teal-100 hover:bg-teal-50 px-4 py-2 rounded-xl transition-all"
                    >
                      Edit Fields
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      value={tempPersonalInfo.fullName}
                      disabled={!isEditingPersonal}
                      onChange={(e) => setTempPersonalInfo({ ...tempPersonalInfo, fullName: e.target.value })}
                      className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-600 text-slate-700 font-medium disabled:opacity-75 disabled:bg-slate-100/50 transition-all"
                    />
                  </div>
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      value={tempPersonalInfo.email}
                      disabled={!isEditingPersonal}
                      onChange={(e) => setTempPersonalInfo({ ...tempPersonalInfo, email: e.target.value })}
                      className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-600 text-slate-700 font-medium disabled:opacity-75 disabled:bg-slate-100/50 transition-all"
                    />
                  </div>
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mobile Number</label>
                    <input 
                      type="text" 
                      value={tempPersonalInfo.mobile}
                      disabled={!isEditingPersonal}
                      onChange={(e) => setTempPersonalInfo({ ...tempPersonalInfo, mobile: e.target.value })}
                      className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-600 text-slate-700 font-medium disabled:opacity-75 disabled:bg-slate-100/50 transition-all"
                    />
                  </div>
                  {/* Date of Birth */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date of Birth</label>
                    <input 
                      type="date" 
                      value={tempPersonalInfo.dob}
                      disabled={!isEditingPersonal}
                      onChange={(e) => setTempPersonalInfo({ ...tempPersonalInfo, dob: e.target.value })}
                      className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-600 text-slate-700 font-medium disabled:opacity-75 disabled:bg-slate-100/50 transition-all"
                    />
                  </div>
                  {/* Gender */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gender</label>
                    <select 
                      value={tempPersonalInfo.gender}
                      disabled={!isEditingPersonal}
                      onChange={(e) => setTempPersonalInfo({ ...tempPersonalInfo, gender: e.target.value })}
                      className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-600 text-slate-700 font-medium disabled:opacity-75 disabled:bg-slate-100/50 transition-all"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {/* City */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">City</label>
                    <input 
                      type="text" 
                      value={tempPersonalInfo.city}
                      disabled={!isEditingPersonal}
                      onChange={(e) => setTempPersonalInfo({ ...tempPersonalInfo, city: e.target.value })}
                      className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-600 text-slate-700 font-medium disabled:opacity-75 disabled:bg-slate-100/50 transition-all"
                    />
                  </div>
                  {/* Address */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Address Line</label>
                    <input 
                      type="text" 
                      value={tempPersonalInfo.address}
                      disabled={!isEditingPersonal}
                      onChange={(e) => setTempPersonalInfo({ ...tempPersonalInfo, address: e.target.value })}
                      className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-600 text-slate-700 font-medium disabled:opacity-75 disabled:bg-slate-100/50 transition-all"
                    />
                  </div>
                  {/* State */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">State</label>
                    <input 
                      type="text" 
                      value={tempPersonalInfo.state}
                      disabled={!isEditingPersonal}
                      onChange={(e) => setTempPersonalInfo({ ...tempPersonalInfo, state: e.target.value })}
                      className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-600 text-slate-700 font-medium disabled:opacity-75 disabled:bg-slate-100/50 transition-all"
                    />
                  </div>
                  {/* Pincode */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pincode</label>
                    <input 
                      type="text" 
                      value={tempPersonalInfo.pincode}
                      disabled={!isEditingPersonal}
                      onChange={(e) => setTempPersonalInfo({ ...tempPersonalInfo, pincode: e.target.value })}
                      className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-600 text-slate-700 font-medium disabled:opacity-75 disabled:bg-slate-100/50 transition-all"
                    />
                  </div>
                </div>

                {isEditingPersonal && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end gap-3 pt-4 border-t border-slate-100"
                  >
                    <button 
                      onClick={handleCancelPersonalInfo}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-semibold transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSavePersonalInfo}
                      className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold transition-all shadow-sm"
                    >
                      Save Changes
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'change-password' && (
              <motion.div 
                key="change-password-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 max-w-md"
              >
                <div>
                  <h4 className="text-lg font-bold text-slate-800">Change Account Password</h4>
                  <p className="text-slate-400 text-xs mt-0.5">Please ensure it is unique, strong, and at least 8 characters.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Old Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-600 text-slate-700 font-medium transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">New Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-600 text-slate-700 font-medium transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Confirm New Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-600 text-slate-700 font-medium transition-all"
                    />
                  </div>
                </div>

                <button 
                  className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold transition-all shadow-sm"
                >
                  Update Password
                </button>
              </motion.div>
            )}

            {activeTab === 'security-logins' && (
              <motion.div 
                key="security-logins-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="text-lg font-bold text-slate-800">Security Credentials & Active Logins</h4>
                  <p className="text-slate-400 text-xs mt-0.5">Review active session endpoints and toggle Two-Factor validation.</p>
                </div>

                {/* 2FA Toggle */}
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/40 flex justify-between items-center max-w-xl">
                  <div className="flex gap-3">
                    <Fingerprint className="text-teal-700 mt-1" size={24} />
                    <div>
                      <h5 className="font-semibold text-slate-800 text-sm">Two-Factor Authentication (2FA)</h5>
                      <p className="text-slate-400 text-xs mt-0.5">Use an authenticator application code to authorize logins.</p>
                    </div>
                  </div>
                  {/* Custom Toggle Switch */}
                  <button 
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 outline-none flex items-center ${
                      twoFactorEnabled ? 'bg-teal-700' : 'bg-slate-300'
                    }`}
                  >
                    <motion.div 
                      layout 
                      className="bg-white w-4 h-4 rounded-full shadow-md"
                      animate={{ x: twoFactorEnabled ? 24 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>

                {/* Active Devices Log */}
                <div className="space-y-3">
                  <h5 className="font-semibold text-slate-700 text-sm">Active Sessions</h5>
                  <div className="space-y-2.5 max-w-xl">
                    <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50/50 transition-all">
                      <div className="flex items-center gap-3">
                        <Laptop className="text-slate-400" size={18} />
                        <div>
                          <div className="text-slate-700 font-semibold text-xs">Chrome (Windows 11) — Current Device</div>
                          <div className="text-slate-400 text-[10px]">IP: 103.88.22.98 • Last Active: Just Now</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full">Current</span>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50/50 transition-all">
                      <div className="flex items-center gap-3">
                        <Smartphone className="text-slate-400" size={18} />
                        <div>
                          <div className="text-slate-700 font-semibold text-xs">iOS Safari (iPhone 14)</div>
                          <div className="text-slate-400 text-[10px]">IP: 27.57.199.12 • Last Active: 4 hours ago</div>
                        </div>
                      </div>
                      <button className="text-[10px] font-bold text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 px-2 py-1 rounded-lg transition-all">Revoke</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Timeline Stage and Progress Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6"
        >
          <div>
            <h3 className="text-xl font-bold text-slate-800">Complaint Lifecycle Activity</h3>
            <p className="text-slate-400 text-xs mt-0.5">Tracking flow timeline of recent complaint #C-9082 (Main Pipeline Leakage).</p>
          </div>

          <div className="mt-8 overflow-x-auto pb-4">
            <div className="min-w-[850px] relative flex justify-between">
              
              {/* Timeline Connector Line */}
              <div className="absolute top-[23px] left-[5%] right-[5%] h-1 bg-slate-100 z-0" />
              
              {/* Connector Progress Filled */}
              <div className="absolute top-[23px] left-[5%] w-[66%] h-1 bg-teal-600 z-0" />

              {timelineStages.map((stage, idx) => (
                <div key={idx} className="flex flex-col items-center w-28 text-center relative z-10">
                  
                  {/* Indicator Dot */}
                  <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-xs shadow-sm transition-all duration-300 ${
                    stage.status === 'completed' 
                      ? 'bg-teal-700 border-teal-100 text-white' 
                      : stage.status === 'active'
                      ? 'bg-teal-50 border-teal-700 text-teal-700 animate-pulse'
                      : 'bg-white border-slate-100 text-slate-300'
                  }`}>
                    {stage.status === 'completed' ? (
                      <Check size={16} />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>

                  <div className="mt-3 font-semibold text-slate-800 text-xs tracking-tight">{stage.stage}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-medium">{stage.date}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Citizen Achievements Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-800">Citizen Achievements</h3>
              <p className="text-slate-400 text-xs mt-0.5">Collect community helper badges by actively improving Noida city.</p>
            </div>
            <div className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
              3 of 6 Unlocked
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((badge, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl border flex gap-4 items-center transition-all ${
                  badge.unlocked 
                    ? 'bg-white border-slate-200/80 shadow-sm' 
                    : 'bg-slate-50/50 border-slate-100 opacity-80'
                }`}
              >
                {/* Badge Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm border ${
                  badge.unlocked ? 'bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-100/60' : 'bg-slate-100 border-slate-100'
                }`}>
                  {badge.icon}
                </div>

                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-slate-800 text-sm">{badge.name}</h5>
                    {badge.unlocked ? (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Unlocked</span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-400">Locked</span>
                    )}
                  </div>
                  <p className="text-slate-400 text-xs leading-normal">{badge.desc}</p>
                  
                  {/* Progress Indicator */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] text-slate-400 font-semibold uppercase">
                      <span>Progress</span>
                      <span>{badge.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${badge.progress}%` }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className={`h-full rounded-full ${badge.unlocked ? 'bg-gradient-to-r from-teal-600 to-emerald-500' : 'bg-slate-300'}`} 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Analytics Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Charts Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-800">Analytics Dashboard</h3>
              <p className="text-slate-400 text-xs mt-0.5">Review complaint volumes, categorizations, and monthly resolution trends.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Monthly Submissions Chart */}
              <div className="space-y-3 p-4 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center">
                  <h5 className="font-bold text-slate-700 text-xs">Monthly Submission Trends</h5>
                  <TrendingUp size={16} className="text-teal-700" />
                </div>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorSubmit" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0F766E" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#0F766E" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
                      <Area type="monotone" dataKey="submitted" stroke="#0F766E" strokeWidth={2} fillOpacity={1} fill="url(#colorSubmit)" name="Submitted" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Distribution Bar Chart */}
              <div className="space-y-3 p-4 rounded-xl border border-slate-100">
                <h5 className="font-bold text-slate-700 text-xs">Submissions by Category</h5>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 5, left: 15, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                      <XAxis type="number" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="name" tick={{ fill: '#475569', fontSize: 9 }} width={90} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '11px' }} />
                      <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={14}>
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Status Distribution Pie Chart */}
              <div className="space-y-3 p-4 rounded-xl border border-slate-100">
                <h5 className="font-bold text-slate-700 text-xs font-semibold">Complaint Status Distribution</h5>
                <div className="h-48 w-full flex items-center justify-between">
                  <div className="w-[55%] h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={38}
                          outerRadius={55}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', fontSize: '11px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-[45%] text-[10px] space-y-2.5">
                    {statusData.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="text-slate-500 font-semibold truncate">{item.name}</span>
                        <span className="text-slate-800 font-bold ml-auto">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Speed to Resolution Line Chart */}
              <div className="space-y-3 p-4 rounded-xl border border-slate-100">
                <h5 className="font-bold text-slate-700 text-xs font-semibold">Resolution Lead-Time Trend (Days)</h5>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { week: 'Wk 1', days: 7.2 },
                      { week: 'Wk 2', days: 5.4 },
                      { week: 'Wk 3', days: 4.8 },
                      { week: 'Wk 4', days: 3.5 },
                      { week: 'Wk 5', days: 2.8 }
                    ]} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="week" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', fontSize: '11px' }} />
                      <Line type="monotone" dataKey="days" stroke="#10B981" strokeWidth={3} dot={{ stroke: '#10B981', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} name="Avg Resolution Days" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Recent Notifications Panel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Alert Center</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Real-time alerts, department updates & AI validations.</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-teal-700 animate-ping shrink-0" />
              </div>

              <div className="space-y-3.5">
                {notifications.slice(0, showAllNotifications ? undefined : 3).map((notif) => (
                  <div 
                    key={notif.id}
                    className={`p-3.5 rounded-xl border text-xs leading-relaxed transition-all relative ${
                      notif.unread 
                        ? 'bg-slate-50 border-slate-200 text-slate-800 font-semibold' 
                        : 'bg-white border-slate-100 text-slate-500'
                    }`}
                  >
                    {notif.unread && (
                      <span className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-teal-700" />
                    )}
                    <p className="pr-3">{notif.text}</p>
                    <div className="text-[10px] text-slate-400 mt-2 font-medium">{notif.time}</div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setShowAllNotifications(!showAllNotifications)}
              className="w-full py-2.5 text-center text-teal-850 font-bold hover:bg-slate-50 border border-slate-100 hover:border-slate-200 rounded-xl transition-all text-xs text-teal-700"
            >
              {showAllNotifications ? "Show Less" : "View All Notifications"}
            </button>
          </motion.div>

        </div>

        {/* Support and Help Section */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          {/* Right Bottom Corner Accent */}
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-700 shrink-0 border border-teal-100 shadow-sm">
              <HelpCircle size={22} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-base">Support & Help Desk</h4>
              <p className="text-slate-400 text-xs mt-0.5">Need help submitting a complaint or changing configuration? We are here 24/7.</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 w-full md:w-auto relative z-10">
            <button className="flex-1 sm:flex-initial text-slate-650 hover:text-slate-800 hover:bg-slate-50 border border-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all">
              Help Center
            </button>
            <button className="flex-1 sm:flex-initial text-slate-650 hover:text-slate-800 hover:bg-slate-50 border border-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all">
              Contact Support
            </button>
            <button className="flex-1 sm:flex-initial bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm shadow-teal-700/10">
              Raise New Complaint
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
