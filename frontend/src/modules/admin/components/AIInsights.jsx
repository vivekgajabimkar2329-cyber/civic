import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, AlertCircle, Target, GitMerge, UserCheck, TrendingUp, Lightbulb } from 'lucide-react';

const insights = [
  { id: 'AI-1', type: 'classification', title: 'Complaint Classification', complaint: 'C-1251', detail: 'Critical Water Supply Emergency', confidence: 96, icon: Target, color: '#3b82f6', bg: '#eff6ff', recommendation: 'Assign to Water Supply emergency team' },
  { id: 'AI-2', type: 'priority', title: 'Priority Prediction', complaint: 'C-1250', detail: 'High Priority - School Zone Hazard', confidence: 92, icon: AlertCircle, color: '#f59e0b', bg: '#fffbeb', recommendation: 'Escalate for rapid response' },
  { id: 'AI-3', type: 'duplicate', title: 'Duplicate Detection', complaint: 'C-1248', detail: 'Duplicate of C-1239 (Street Light)', confidence: 89, icon: GitMerge, color: '#8b5cf6', bg: '#f5f3ff', recommendation: 'Merge with existing complaint' },
  { id: 'AI-4', type: 'officer', title: 'Officer Recommendation', complaint: 'C-1251', detail: 'Susan Hall - 97% resolution rate', confidence: 94, icon: UserCheck, color: '#10b981', bg: '#ecfdf5', recommendation: 'Auto-assign to Susan Hall' },
  { id: 'AI-5', type: 'trend', title: 'Trend Analysis', complaint: 'Sector 12', detail: '40% increase in complaints this month', confidence: 95, icon: TrendingUp, color: '#ef4444', bg: '#fef2f2', recommendation: 'Add 2 more field officers' },
  { id: 'AI-6', type: 'insight', title: 'Smart Suggestion', complaint: 'System', detail: 'Optimize officer routing by zones', confidence: 88, icon: Lightbulb, color: '#0ea5e9', bg: '#f0f9ff', recommendation: 'Review zone assignments' },
];

const AIInsights = () => {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-civic-600">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-base font-bold text-text-primary">AI Insights</h3>
        </div>
        <span className="text-[10px] font-medium text-text-secondary bg-gray-100 px-2 py-1 rounded-full">6 suggestions</span>
      </div>

      <div className="space-y-2">
        {insights.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ x: 4 }}
              className="group flex items-start gap-3 p-3 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-card hover:border-gray-200 transition-all duration-200 cursor-pointer"
            >
              <div className={`p-2 rounded-lg ${insight.bg} flex-shrink-0`}>
                <Icon size={16} style={{ color: insight.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-text-primary">{insight.title}</h4>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {insight.confidence}%
                  </span>
                </div>
                <p className="text-[11px] text-text-secondary mt-0.5">{insight.detail}</p>
                <p className="text-[10px] text-civic-600 font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  → {insight.recommendation}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <button className="w-full py-2 text-xs font-medium text-civic-600 hover:text-civic-700 bg-civic-50 hover:bg-civic-100 rounded-xl transition-colors">
        View All AI Suggestions →
      </button>
    </div>
  );
};

export default AIInsights;

