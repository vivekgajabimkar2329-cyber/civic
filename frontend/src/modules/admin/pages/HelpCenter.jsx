import React, { useState } from 'react';
import {
  CircleHelp,
  BookOpen,
  Mail,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Send,
  Check
} from 'lucide-react';

const FAQS = [
  {
    question: 'How do I reassign an escalated complaint to another department?',
    answer: 'Navigate to the Complaints page, select the specific complaint, click the "Reassign" button in the actions menu, choose the new target department, and click save. The AI router will automatically learn from this action.'
  },
  {
    question: 'Where can I configure SLA response threshold limits?',
    answer: 'Navigate to the Settings tab in the sidebar. Under the "AI Routing & Escalations" card, you can adjust the SLA limit hours. All new complaints will inherit this updated SLA timer threshold.'
  },
  {
    question: 'How are the auto-routing confidence matches computed?',
    answer: 'The system uses natural language processing (NLP) to scan complaint descriptions against historic resolved logs and municipality keyword frequencies, assigning routing percentages automatically.'
  },
  {
    question: 'How can I export regional analytical charts to Excel or PDF?',
    answer: 'Go to the Reports page, choose the report scope type (e.g. Summary, SLA Performance), select the department filter, set the timeframe parameters, choose CSV or PDF format, and click "Generate Report".'
  }
];

const HelpCenter = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = (idx) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubject('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
          <span>Home</span>
          <span>&gt;</span>
          <span className="text-slate-600">Help Center</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1.5 flex items-center gap-2">
          <CircleHelp className="text-teal-850" />
          Help Center & Documentation
        </h1>
        <p className="text-slate-500 text-sm mt-1">Access administrator user guides, FAQs, and submit system support requests.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: FAQs */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-teal-800" />
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-xs text-slate-800 hover:bg-slate-50/50 transition-colors focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp size={16} className="text-slate-400 shrink-0" /> : <ChevronDown size={16} className="text-slate-400 shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-500 leading-relaxed border-t border-slate-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Ticket Form */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Mail className="w-5 h-5 text-teal-800" />
            Contact System Support
          </h3>

          {submitted ? (
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-800 font-bold flex gap-2 items-center animate-in zoom-in-95 duration-200">
              <Check size={16} />
              <span>Grievance ticket created successfully! We will contact you soon.</span>
            </div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Ticket Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Map Widget Coordinates offset"
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-teal-800 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-705 uppercase mb-1.5">Explain Issue Details</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide logs or description details..."
                  className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-3 rounded-xl outline-none focus:border-teal-800 font-semibold leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0b83ff] hover:bg-[#0070e0] text-white py-3 rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 transition-all focus:outline-none flex items-center justify-center gap-2"
              >
                <Send size={14} />
                Send Support Ticket
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
