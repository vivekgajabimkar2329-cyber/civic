import React, { useState, useEffect } from 'react';
import { Mic, Square, Trash2, Play, Pause } from 'lucide-react';

const VoiceRecorder = ({ formData, setFormData }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 60) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
    setFormData({ ...formData, hasAudio: false });
    setRecordingTime(0);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setFormData({ ...formData, hasAudio: true, audioDuration: recordingTime });
  };

  const deleteRecording = () => {
    setFormData({ ...formData, hasAudio: false, audioDuration: 0 });
    setRecordingTime(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Real implementation would play audio here
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), recordingTime * 1000 || 2000);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `0${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center text-center bg-gray-50 hover:bg-gray-100 transition-colors">
      {!formData.hasAudio ? (
        <>
          <div 
            className={`w-20 h-20 rounded-full flex items-center justify-center cursor-pointer mb-4 shadow-sm transition-all duration-300 ${
              isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-white text-gray-600 hover:text-[#005EA5]'
            }`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? <Square size={28} className="fill-current" /> : <Mic size={32} />}
          </div>
          <h3 className="font-bold text-gray-900">{isRecording ? 'Recording...' : 'Record Voice Note'}</h3>
          <p className="text-sm text-gray-500 mt-2 font-mono">
            {isRecording ? `${formatTime(recordingTime)} / 01:00` : 'Click to start recording'}
          </p>
        </>
      ) : (
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4 shadow-sm mb-4">
            <button 
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200 transition-colors shrink-0"
            >
              {isPlaying ? <Pause size={18} className="fill-current" /> : <Play size={18} className="fill-current ml-1" />}
            </button>
            <div className="flex-1">
              <div className="h-6 w-full flex items-center gap-1 opacity-70">
                {/* Mock Waveform */}
                {[...Array(20)].map((_, i) => (
                  <div key={i} className={`w-1.5 bg-[#005EA5] rounded-full ${isPlaying ? 'animate-pulse' : ''}`} style={{ height: `${Math.max(20, Math.random() * 100)}%` }}></div>
                ))}
              </div>
            </div>
            <span className="text-xs font-mono text-gray-500 font-medium shrink-0">
              {formatTime(formData.audioDuration || 0)}
            </span>
          </div>
          <button 
            onClick={deleteRecording}
            className="text-red-600 text-sm font-bold flex items-center gap-2 hover:text-red-700 transition-colors"
          >
            <Trash2 size={16} /> Delete Recording
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
