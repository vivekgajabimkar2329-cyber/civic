import React, { useState, useEffect } from "react";

export default function About() {
  const [darkMode, setDarkMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Citizen Advocate",
    message: "",
  });
  const [activeFaq, setActiveFaq] = useState({
    "faq-1": false,
    "faq-2": false,
    "faq-3": false,
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleFaq = (id) => {
    setActiveFaq((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your request has been successfully received. We will be in touch shortly.`);
    setModalOpen(false);
    setFormData({
      name: "",
      email: "",
      role: "Citizen Advocate",
      message: "",
    });
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 antialiased min-h-screen transition-colors duration-300">
      {/* Floating Theme Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-110 transition-all duration-200"
        title="Toggle Theme"
      >
        {darkMode ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      {/* Hero Section */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-600 pulse-dot" />
                Next-Gen Civic AI Operations Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Transforming Municipal Infrastructure through <span className="gradient-text">Civic AI</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                CivicPulse AI unifies computer vision, sensor telemetry, and predictive dispatching to solve critical municipal problems: from <strong>pothole detection and urban drainage flood control</strong> to <strong>smart waste management and public transit optimization</strong>.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="#working-platform"
                  className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all text-center"
                >
                  Explore Platform
                </a>
                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto px-7 py-3.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all text-center"
                >
                  How Civic AI Works
                </a>
              </div>
            </div>

            {/* Featured Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group">
                <img
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1000&q=80"
                  alt="Civic AI Urban Operations Center"
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md w-max mb-2">
                    Integrated Platform
                  </span>
                  <h3 className="text-xl font-bold">Smart City Control Hub</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Real-time sensor aggregation across roads, drainage, waste, and transit networks.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Metrics Row */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-5 rounded-2xl glass-card text-center border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">82%</div>
              <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
                Faster Pothole Repair
              </div>
            </div>
            <div className="p-5 rounded-2xl glass-card text-center border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">45 Min</div>
              <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
                Flood Warning Lead Time
              </div>
            </div>
            <div className="p-5 rounded-2xl glass-card text-center border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">35%</div>
              <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
                Waste Diversion Growth
              </div>
            </div>
            <div className="p-5 rounded-2xl glass-card text-center border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">100%</div>
              <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
                Algorithmic Equity
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission-vision" className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Our Mission & Vision
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Building technology that serves public interest, elevates city resilience, and ensures equitable allocation of civic infrastructure resources.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-2xl mb-6 shadow-md shadow-blue-500/30">
                  🎯
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Our Mission</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  To empower municipal governments and citizen groups with real-time AI computer vision and sensor telemetry. We bridge the gap between reporting and resolution—shifting city maintenance from reactive chaos to proactive, automated, and equitable infrastructure upkeep.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm text-slate-700 dark:text-slate-200">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold">✓</span> Eliminating urban maintenance backlogs
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold">✓</span> Ensuring fair service delivery across all zip codes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold">✓</span> Lowering operational costs through predictive maintenance
                  </li>
                </ul>
              </div>
            </div>

            {/* Vision Card */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-2xl mb-6 shadow-md shadow-teal-500/30">
                  👁️
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Our Vision</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  A world where cities adapt dynamically to human and environmental needs—preventing stormwater flooding before rainfalls start, fixing road degradation before accidents happen, and optimizing waste collection seamlessly.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm text-slate-700 dark:text-slate-200">
                  <li className="flex items-center gap-2">
                    <span className="text-teal-600 font-bold">✓</span> Fully transparent, algorithmically audited civic AI
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-teal-600 font-bold">✓</span> Zero urban flooding blackspots through smart drainage
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-teal-600 font-bold">✓</span> Empowered citizens collaborating directly with municipal teams
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Civic AI Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              System Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              How Civic AI Works
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              From raw sensor feeds on city streets to municipal crew dispatch and citizen verification—our closed-loop platform operates seamlessly.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 relative group hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 font-black flex items-center justify-center text-lg mb-4">
                01
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Remote Sensing</h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                Dashcams mounted on buses, IoT water depth sensors in drains, smart bin telemetry, and citizen mobile reports stream continuous environmental data.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 relative group hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/60 text-teal-600 dark:text-teal-400 font-black flex items-center justify-center text-lg mb-4">
                02
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">AI Severity Scoring</h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                Computer vision models classify asphalt pavement defects (PCI index), calculate drainage silt risks, and project flood water levels automatically.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 relative group hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-400 font-black flex items-center justify-center text-lg mb-4">
                03
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Smart Work-Orders</h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                Tickets are auto-routed to nearest municipal maintenance crews, compaction trucks, or desilting units based on priority and location.
              </p>
            </div>

            {/* Step 4 */}
            <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 relative group hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 font-black flex items-center justify-center text-lg mb-4">
                04
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Closed-Loop Verification</h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                After repairs, post-fix images are captured to update the public map, verify work quality, and train AI models continuously.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Civic Working Platform Section */}
      <section id="working-platform" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                Unified Operational Command
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 leading-tight">
                The Civic Working Platform Interface
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                The Civic Working Platform offers city officials and engineering teams a single control surface. It synthesizes complex GIS geospatial data, live stream video inference, and emergency response workflows into an intuitive dashboard.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Geospatial Infrastructure Heatmap</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Real-time overlay of pothole locations, drainage culverts, waste bins, and transit vehicles.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Automated Crew Dispatcher</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Generates optimized work routes for asphalt patching crews and storm drain desilting units.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Demographic Equity Compliance Monitor</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Tracks response times across all city districts to prevent resource allocation bias.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"
                alt="Civic AI Analytics Dashboard"
                className="w-full h-[450px] object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-6 flex flex-col justify-end text-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded border border-emerald-500/30">
                    Live Dispatching Platform
                  </span>
                  <span className="text-xs text-slate-400 font-mono">v4.2 Connected</span>
                </div>
                <h3 className="text-lg font-bold">Civic Operational Command Surface</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Simultaneous processing of 1,200+ telemetry points across municipal districts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Solutions Section */}
      <section id="comprehensive-solutions" className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Domain Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Comprehensive Municipal Solutions
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Discover how our AI models address specific civic challenges with real-world computer vision, sensor technology, and field dispatching.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Solution 1: Roads & Potholes */}
            <div className="glass-card rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col hover:-translate-y-1 transition-transform">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80"
                  alt="Road Infrastructure and Potholes"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  Roads & Asphalt
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Pothole Detection & Pavement Health</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Automated video cameras on city vehicles detect asphalt cracking, measure pothole depth, calculate Pavement Condition Index (PCI), and auto-generate maintenance work orders.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>82% Faster Repair</span>
                  <span>Stereo Vision CV</span>
                </div>
              </div>
            </div>

            {/* Solution 2: Drainage & Floods */}
            <div className="glass-card rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col hover:-translate-y-1 transition-transform">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80"
                  alt="Drainage and Flood Control"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  Drainage & Floods
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Stormwater & Flood Early Warning</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Ultrasonic water-level sensors in primary canals combined with weather forecasts predict street waterlogging 45 minutes ahead, dispatching desilting crews before storm events.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs font-semibold text-teal-600 dark:text-teal-400">
                  <span>45 Min Lead Time</span>
                  <span>IoT Canal Sensors</span>
                </div>
              </div>
            </div>

            {/* Solution 3: Smart Waste Management */}
            <div className="glass-card rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col hover:-translate-y-1 transition-transform">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80"
                  alt="Smart Waste Management"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  Garbage & Sanitation
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Smart Waste & Dynamic Truck Routing</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Optical sensors inside municipal bins transmit fill levels in real time. Dynamic routing guides collection trucks only to full bins, cutting carbon emissions by 28%.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>28% Fuel Saved</span>
                  <span>Smart Bin Telemetry</span>
                </div>
              </div>
            </div>

            {/* Solution 4: Water Supply & Leak Detection */}
            <div className="glass-card rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col hover:-translate-y-1 transition-transform">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                  alt="Water Distribution and Leak Detection"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  Water Networks
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Water Leak Pinpointing & Quality</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Acoustic pressure sensors detect micro-cracks in underground water mains, pinpointing leaks within 1.5 meters accuracy and preventing non-revenue water loss.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                  <span>±1.5m Precision</span>
                  <span>Acoustic Wave Sensors</span>
                </div>
              </div>
            </div>

            {/* Solution 5: Public Transit */}
            <div className="glass-card rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col hover:-translate-y-1 transition-transform">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
                  alt="Public Transit Priority"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  Public Transit
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Adaptive Signals & Bus Priority</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Adaptive signal timing gives priority to public buses at busy intersections during peak hours, reducing transit delays and improving schedule adherence.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs font-semibold text-purple-600 dark:text-purple-400">
                  <span>34% Reduced Delays</span>
                  <span>Adaptive Traffic Signals</span>
                </div>
              </div>
            </div>

            {/* Solution 6: Citizen Engagement */}
            <div className="glass-card rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col hover:-translate-y-1 transition-transform">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
                  alt="Citizen Mobile App Reporting"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  Citizen Portal
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Citizen Reporting & Verification</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Citizens easily upload photos of potholes, drainage clogs, or uncollected garbage. GPS geotagging combines with AI models to speed up repair dispatching.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>Geotagged Alerts</span>
                  <span>Transparent Updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ethical AI Framework Section */}
      <section id="ethical-ai" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              Responsibility & Governance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">Ethical Civic AI Framework</h2>
            <p className="mt-3 text-slate-400">
              Applying AI to public infrastructure requires unmatched standards of fairness, privacy, and community oversight.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/80 border border-slate-700 p-8 rounded-2xl hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xl mb-6">
                ⚖️
              </div>
              <h3 className="text-xl font-bold mb-3">Demographic Equity Audits</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Algorithms are audited monthly to ensure complaint resolution and repair budgets are distributed equally across all income levels and city zones.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-8 rounded-2xl hover:border-teal-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xl mb-6">
                🛡️
              </div>
              <h3 className="text-xl font-bold mb-3">Privacy & License Anonymization</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Camera sensors processing roads automatically blur license plates and faces on edge devices before video data ever reaches municipal servers.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-8 rounded-2xl hover:border-purple-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xl mb-6">
                👥
              </div>
              <h3 className="text-xl font-bold mb-3">Citizen Advisory Council</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Every AI model deployment must be reviewed and approved by an independent council of neighborhood leaders, urban planners, and privacy advocates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Questions & Transparency
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <button
                onClick={() => toggleFaq("faq-1")}
                className="w-full p-6 text-left font-bold text-slate-900 dark:text-white flex justify-between items-center"
              >
                <span>How does CivicPulse AI detect potholes and road damage?</span>
                <span className="text-xl font-mono">{activeFaq["faq-1"] ? "−" : "+"}</span>
              </button>
              {activeFaq["faq-1"] && (
                <div className="px-6 pb-6 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800/50 pt-4">
                  We mount low-power computer vision units on city fleet vehicles (like municipal buses and garbage trucks). As vehicles complete routine routes, cameras scan the asphalt surface, flag defects, and measure depth using stereo vision algorithms.
                </div>
              )}
            </div>

            <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <button
                onClick={() => toggleFaq("faq-2")}
                className="w-full p-6 text-left font-bold text-slate-900 dark:text-white flex justify-between items-center"
              >
                <span>Does Civic AI replace municipal maintenance workers?</span>
                <span className="text-xl font-mono">{activeFaq["faq-2"] ? "−" : "+"}</span>
              </button>
              {activeFaq["faq-2"] && (
                <div className="px-6 pb-6 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800/50 pt-4">
                  No. The system empowers human workers rather than replacing them. AI handles repetitive inspection tasks and prioritizes work dispatching, enabling city maintenance crews to focus on high-value repairs.
                </div>
              )}
            </div>

            <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <button
                onClick={() => toggleFaq("faq-3")}
                className="w-full p-6 text-left font-bold text-slate-900 dark:text-white flex justify-between items-center"
              >
                <span>How can citizens participate or submit reports directly?</span>
                <span className="text-xl font-mono">{activeFaq["faq-3"] ? "−" : "+"}</span>
              </button>
              {activeFaq["faq-3"] && (
                <div className="px-6 pb-6 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800/50 pt-4">
                  Citizens can use our web application or mobile portal to upload photos of potholes, drainage blockages, or uncollected garbage. Reports are geotagged automatically and combined with sensor data to accelerate dispatching.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              CP
            </div>
            <span className="text-white font-bold text-lg tracking-tight">CivicPulse AI Platform</span>
          </div>
          <p className="text-xs text-slate-500 text-center md:text-left">
            © 2026 CivicPulse AI Initiative. Empowering urban infrastructure through ethical AI.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#mission-vision" className="hover:text-white transition-colors">
              Mission
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#working-platform" className="hover:text-white transition-colors">
              Platform
            </a>
            <a href="#comprehensive-solutions" className="hover:text-white transition-colors">
              Solutions
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xl font-bold"
            >
              ✕
            </button>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Get Involved with CivicPulse AI
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              Join as a citizen tester, city engineer, or community representative.
            </p>

            <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="jane@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Your Role / Interest
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Citizen Advocate">Citizen Advocate</option>
                  <option value="Neighborhood Representative">Neighborhood Representative</option>
                  <option value="Municipal Employee">Municipal Employee</option>
                  <option value="Software Developer / Researcher">Software Developer / Researcher</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Message / Why you want to join
                </label>
                <textarea
                  name="message"
                  required
                  rows="3"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="I'd love to help trial sensors in my neighborhood..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all text-sm mt-2"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
