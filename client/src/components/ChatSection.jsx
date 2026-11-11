import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Trash2, 
  Bot, 
  User, 
  Sparkles, 
  Copy, 
  Check, 
  ThumbsUp, 
  ThumbsDown, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowRight, 
  RefreshCw,
  CornerDownLeft,
  ExternalLink,
  Volume2,
  VolumeX,
  Download
} from 'lucide-react';

export default function ChatSection({ 
  messages = [], 
  isLoading = false, 
  onSendMessage, 
  onClearChat,
  onSelectSuggestedQuery 
}) {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [feedbackState, setFeedbackState] = useState({});
  const [speakingId, setSpeakingId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (id, type) => {
    setFeedbackState(prev => ({
      ...prev,
      [id]: type
    }));
  };

  const handleSpeak = (id, text) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleExportChat = () => {
    if (messages.length === 0) return;
    const header = `PRESIDENCY UNIVERSITY - CAMPUS CONNECT AI CHAT TRANSCRIPT\nDate: ${new Date().toLocaleString()}\n------------------------------------------------------------\n\n`;
    const body = messages.map(m => {
      const role = m.sender === 'user' ? 'STUDENT' : `CAMPUS BUDDY AI [${m.category || 'General'}]`;
      const content = m.sender === 'user' ? m.text : m.response;
      return `[${m.time}] ${role}:\n${content}\n`;
    }).join('\n');

    const fullText = header + body;
    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `campus-connect-chat-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="ai-chat-section" className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-12">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border-b border-blue-900/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Bot className="w-6 h-6" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold font-heading">
                Campus Buddy AI Assistant
              </h2>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Live & Grounded
              </span>
            </div>
            <p className="text-xs text-blue-200">
              Strictly verified against Presidency University Knowledge Base
            </p>
          </div>
        </div>

        {/* Chat Actions */}
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <>
              <button
                onClick={handleExportChat}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-200 hover:text-white bg-blue-900/60 hover:bg-blue-800/80 border border-blue-700/60 rounded-xl transition-all shadow-sm"
                title="Download chat transcript"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={onClearChat}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/60 rounded-xl transition-all"
                title="Clear entire conversation"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Chat</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="h-[480px] overflow-y-auto p-4 sm:p-6 bg-slate-50/50 space-y-5">
        {/* Empty State */}
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto py-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 shadow-sm">
              <Bot className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 font-heading mb-2">
              How can I assist you today?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
              Ask any university question regarding Academics, Examinations, Placements, Attendance, Hostel, Library, Administration, or Events.
            </p>

            <div className="w-full space-y-2 text-left">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center mb-3">
                Quick starter questions:
              </p>
              <button
                onClick={() => onSelectSuggestedQuery('Whom should I contact for academic problems?')}
                className="w-full text-xs sm:text-sm bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 p-3 rounded-xl border border-slate-200 hover:border-blue-300 shadow-sm transition-all flex items-center justify-between group"
              >
                <span>Whom should I contact for academic problems?</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </button>
              <button
                onClick={() => onSelectSuggestedQuery('Where can I find the examination timetable?')}
                className="w-full text-xs sm:text-sm bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 p-3 rounded-xl border border-slate-200 hover:border-blue-300 shadow-sm transition-all flex items-center justify-between group"
              >
                <span>Where can I find the examination timetable?</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </button>
              <button
                onClick={() => onSelectSuggestedQuery('What is the exact date of my next examination?')}
                className="w-full text-xs sm:text-sm bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 p-3 rounded-xl border border-slate-200 hover:border-blue-300 shadow-sm transition-all flex items-center justify-between group"
              >
                <span>What is the exact date of my next examination? (Test Unknowns)</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        )}

        {/* Message Thread */}
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-3 sm:gap-4 animate-fade-in ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {/* AI Avatar */}
            {msg.sender === 'bot' && (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Bot className="w-5 h-5" />
              </div>
            )}

            {/* Bubble Content */}
            <div className={`max-w-[85%] sm:max-w-[75%] ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}>
              {/* User Bubble */}
              {msg.sender === 'user' ? (
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl rounded-tr-none px-4 py-3 shadow-md shadow-blue-500/10">
                  <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </p>
                  <p className="text-[10px] text-blue-200 text-right mt-1">
                    {msg.time}
                  </p>
                </div>
              ) : (
                /* Bot Response Card */
                <div className="bg-white rounded-2xl rounded-tl-none border border-slate-200 shadow-md p-4 sm:p-5">
                  {/* Category & Grounding Status Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                        {msg.category || 'General'}
                      </span>
                      {msg.isAvailableInKB === false ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                          <ShieldAlert className="w-3 h-3 text-amber-600" />
                          Detail Not in KB
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          Authoritative
                        </span>
                      )}
                    </div>

                    <span className="text-[10px] text-slate-400 font-mono">
                      {msg.provider === 'gemini-api' ? 'Gemini 1.5 Flash' : 'Grounded Engine'} • {msg.time}
                    </span>
                  </div>

                  {/* Message Text */}
                  <div className="text-sm sm:text-base text-slate-800 leading-relaxed mb-4">
                    {msg.response}
                  </div>

                  {/* Follow-up suggestions if available */}
                  {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="mb-3 pt-3 border-t border-slate-100">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-blue-500" />
                        Relevant Follow-ups:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedFollowUps.map((fu, idx) => (
                          <button
                            key={idx}
                            onClick={() => onSelectSuggestedQuery(fu)}
                            className="text-xs bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 px-2.5 py-1 rounded-lg border border-slate-200 hover:border-blue-300 transition-all text-left"
                          >
                            {fu}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions & Feedback Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    {/* Feedback Buttons */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400">Helpful?</span>
                      <button
                        onClick={() => handleFeedback(msg.id, 'yes')}
                        className={`p-1 rounded hover:bg-slate-100 transition-colors ${
                          feedbackState[msg.id] === 'yes' ? 'text-emerald-600 font-bold' : 'text-slate-400'
                        }`}
                        title="Yes, this was helpful"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleFeedback(msg.id, 'no')}
                        className={`p-1 rounded hover:bg-slate-100 transition-colors ${
                          feedbackState[msg.id] === 'no' ? 'text-rose-600 font-bold' : 'text-slate-400'
                        }`}
                        title="No, needs improvement"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                      {feedbackState[msg.id] && (
                        <span className="text-[10px] text-emerald-600 ml-1">
                          Thanks for feedback!
                        </span>
                      )}
                    </div>

                    {/* Actions Right Side: Listen & Copy */}
                    <div className="flex items-center gap-1.5">
                      {/* Read Aloud Button */}
                      <button
                        onClick={() => handleSpeak(msg.id, msg.response)}
                        className={`flex items-center gap-1 p-1.5 rounded-lg hover:bg-slate-100 transition-colors ${
                          speakingId === msg.id ? 'text-blue-600 font-semibold bg-blue-50' : 'text-slate-400 hover:text-slate-700'
                        }`}
                        title={speakingId === msg.id ? "Stop reading" : "Listen to response"}
                      >
                        {speakingId === msg.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                            <span className="text-[11px] text-blue-600">Stop</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span className="text-[11px]">Listen</span>
                          </>
                        )}
                      </button>

                      {/* Copy Button */}
                      <button
                        onClick={() => handleCopy(msg.id, msg.response)}
                        className="flex items-center gap-1 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                        title="Copy response to clipboard"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-[11px] text-emerald-600 font-medium">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[11px]">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar */}
            {msg.sender === 'user' && (
              <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <User className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 sm:gap-4 animate-fade-in">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-none border border-slate-200 shadow-md p-4 sm:p-5 max-w-[70%]">
              <div className="flex items-center gap-3">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce"></div>
                </div>
                <span className="text-xs font-medium text-slate-500">
                  Campus Buddy AI is verifying university guidelines...
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-4 sm:p-5 bg-white border-t border-slate-200">
        <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Type your question here... (Press Enter to send)"
            className="w-full text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-blue-600 rounded-2xl px-4 py-3.5 pr-28 outline-none transition-all focus:ring-4 focus:ring-blue-100 disabled:opacity-50"
          />

          <div className="absolute right-2 flex items-center gap-1.5">
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-600/20 transition-all"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span>Try: Academics, Examinations, Placements, Hostel, Library, Attendance, Events</span>
          <span className="hidden sm:inline">Press <kbd className="font-mono bg-slate-100 px-1 py-0.5 rounded border border-slate-200">Enter</kbd> to submit</span>
        </div>
      </div>
    </div>
  );
}

