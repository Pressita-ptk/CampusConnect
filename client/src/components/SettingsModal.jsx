import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Key, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export default function SettingsModal({ 
  isOpen, 
  onClose, 
  systemStatus, 
  customApiKey, 
  onSaveCustomApiKey 
}) {
  if (!isOpen) return null;

  const [inputKey, setInputKey] = useState(customApiKey || '');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState(null);

  const handleSave = () => {
    onSaveCustomApiKey(inputKey.trim());
    onClose();
  };

  const handleTestKey = async () => {
    if (!inputKey.trim()) {
      setVerifyStatus({ success: false, message: 'Please enter a Gemini API key first.' });
      return;
    }

    setIsVerifying(true);
    setVerifyStatus(null);

    try {
      const res = await fetch('/api/verify-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: inputKey.trim() })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setVerifyStatus({ success: true, message: `Key verified! Connected to ${data.model || 'Gemini 1.5 Flash'}` });
        onSaveCustomApiKey(inputKey.trim());
      } else {
        setVerifyStatus({ success: false, message: data.message || 'Key verification failed.' });
      }
    } catch (err) {
      setVerifyStatus({ success: false, message: `Network error: ${err.message}` });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading">
                AI Engine & Key Settings
              </h3>
              <p className="text-xs text-blue-200">
                Configure Google Gemini API parameters
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Status Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Backend Env Key:</span>
              <span className={`font-semibold flex items-center gap-1 ${
                systemStatus?.hasApiKey ? 'text-emerald-600' : 'text-amber-600'
              }`}>
                {systemStatus?.hasApiKey ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" /> Detected in process.env
                  </>
                ) : (
                  'Not in .env (Using fallback grounded engine)'
                )}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Active AI Model:</span>
              <span className="font-mono text-slate-800 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
                {systemStatus?.activeModel || 'gemini-1.5-flash'}
              </span>
            </div>
          </div>

          {/* Custom Key Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Custom Gemini API Key (Optional)
            </label>
            <div className="relative">
              <input
                type="password"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-300 focus:border-blue-600 rounded-xl px-3.5 py-2.5 outline-none font-mono focus:ring-4 focus:ring-blue-100 transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
              <span>Keys are stored in your session memory and sent securely via backend API calls.</span>
            </p>
          </div>

          {/* Test Status feedback */}
          {verifyStatus && (
            <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              verifyStatus.success 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}>
              {verifyStatus.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              )}
              <span>{verifyStatus.message}</span>
            </div>
          )}

          {/* Verification & Save Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleTestKey}
              disabled={isVerifying || !inputKey.trim()}
              className="flex-1 py-2.5 px-4 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {isVerifying && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
              <span>{isVerifying ? 'Verifying...' : 'Test & Verify Key'}</span>
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/20 transition-all"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

