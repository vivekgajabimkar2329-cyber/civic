import React, { useState } from 'react';
import { Star, MessageSquare, Send, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const ratings = [1, 2, 3, 4, 5];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!rating || comments.trim().length < 10) {
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <Link to="/dashboard" className="text-sm font-semibold text-[#005EA5] hover:underline">← Back to Dashboard</Link>
        <h1 className="mt-4 text-3xl font-extrabold text-slate-900">Feedback & Service Rating</h1>
        <p className="mt-2 text-base text-slate-600">Tell us how we can improve our civic services and your complaint experience.</p>
      </div>
      {submitted ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <ThumbsUp size={28} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Thank you for your feedback!</h2>
          <p className="mt-3 text-slate-600">Your response helps our team improve citizen services and response times.</p>
          <Link to="/dashboard" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#005EA5] px-6 py-3 text-sm font-semibold text-white hover:bg-[#003978] transition">
            <Send size={16} /> Return to Dashboard
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="space-y-6">
            <div className="rounded-3xl bg-slate-50 p-6">
              <h2 className="text-xl font-bold text-slate-900">Service rating</h2>
              <p className="mt-2 text-sm text-slate-500">Choose how satisfied you were with the resolution of your issue.</p>
              <div className="mt-6 flex items-center gap-3">
                {ratings.map((value) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() => setRating(value)}
                    className={`flex h-12 w-12 items-center justify-center rounded-full border text-sm font-bold transition ${rating === value ? 'border-[#005EA5] bg-[#005EA5] text-white shadow' : 'border-slate-300 bg-white text-slate-600 hover:border-blue-500'}`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-700">
                <Star className="h-4 w-4 text-amber-500" />
                {rating ? `You selected ${rating} out of 5 stars.` : 'Select a star rating to begin.'}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-slate-900">Quick suggestions</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-400"></span>
                    Use clear photos and exact locations when reporting issues.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-400"></span>
                    Keep your feedback concise and include how we can improve.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-400"></span>
                    Your feedback helps us prioritize fixes and enhance response times.
                  </li>
                </ul>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">Write your feedback</h3>
                <textarea
                  value={comments}
                  onChange={(event) => setComments(event.target.value)}
                  rows={8}
                  placeholder="Share what worked well or what we can improve..."
                  className="mt-4 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#005EA5] focus:ring-2 focus:ring-[#005EA5]/10"
                />
                <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                  <span>{comments.length}/500 characters</span>
                  <span className="font-semibold text-slate-700">Feedback helps us improve services.</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-sm font-semibold text-slate-700">Need help?</span>
                <p className="text-sm text-slate-500">Contact support if you want assistance with your complaint.</p>
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-[#005EA5] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#003978] disabled:cursor-not-allowed disabled:bg-slate-400"
                disabled={!rating || comments.trim().length < 10}
              >
                <Send size={16} /> Submit feedback
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Feedback;
