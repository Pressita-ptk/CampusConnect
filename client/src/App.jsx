import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoryGrid from './components/CategoryGrid';
import ChatSection from './components/ChatSection';
import QuickTesterModal from './components/QuickTesterModal';
import KnowledgeBaseModal from './components/KnowledgeBaseModal';
import SettingsModal from './components/SettingsModal';
import Footer from './components/Footer';

export default function App() {
  const [categories, setCategories] = useState([]);
  const [systemStatus, setSystemStatus] = useState(null);
  const [customApiKey, setCustomApiKey] = useState(() => localStorage.getItem('campus_connect_gemini_key') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [errorToast, setErrorToast] = useState(null);

  // Modals state
  const [isTesterOpen, setIsTesterOpen] = useState(false);
  const [isKBOpen, setIsKBOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Chat messages
  const [messages, setMessages] = useState([
    {
      id: 'welcome-msg',
      sender: 'bot',
      response: 'Hello! I am your Presidency University Campus Buddy AI. I can assist you with questions regarding Academics, Attendance, Examinations, Placements, Library, Hostel, Administration, and Events. How may I help you today?',
      category: 'General',
      isAvailableInKB: true,
      provider: 'system',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedFollowUps: [
        'Whom should I contact for academic problems?',
        'Where can I find the examination timetable?',
        'Whom should I contact for placement training?'
      ]
    }
  ]);

  // Load initial health and categories from backend
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setSystemStatus(data))
      .catch(err => console.warn('Could not connect to backend health endpoint:', err));

    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.categories) {
          setCategories(data.categories);
        }
      })
      .catch(err => console.warn('Could not load categories:', err));
  }, []);

  const handleSaveCustomApiKey = (key) => {
    setCustomApiKey(key);
    if (key) {
      localStorage.setItem('campus_connect_gemini_key', key);
    } else {
      localStorage.removeItem('campus_connect_gemini_key');
    }
  };

  // Send message to AI
  const handleSendMessage = async (queryText) => {
    if (!queryText.trim()) return;

    const userMessageId = `user-${Date.now()}`;
    const userMessage = {
      id: userMessageId,
      sender: 'user',
      text: queryText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setErrorToast(null);

    // Scroll smoothly to chat section
    const chatElement = document.getElementById('ai-chat-section');
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    try {
      // Build conversation history for context
      const historyContext = messages.slice(-6).map(m => ({
        sender: m.sender,
        text: m.sender === 'user' ? m.text : m.response
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: queryText.trim(),
          history: historyContext,
          apiKey: customApiKey || undefined
        })
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to get AI response');
      }

      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        response: json.data.response,
        category: json.data.category,
        confidence: json.data.confidence,
        isAvailableInKB: json.data.isAvailableInKB,
        provider: json.data.provider,
        model: json.data.model,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: json.data.suggestedFollowUps
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      setErrorToast(err.message || 'An error occurred while connecting to the assistant.');
      
      // Fallback message to user
      const errorMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        response: 'I encountered an issue retrieving university information. Please ensure the backend server is running, or verify your query.',
        category: 'Error',
        isAvailableInKB: false,
        provider: 'fallback',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        onOpenKB={() => setIsKBOpen(true)}
        onOpenTester={() => setIsTesterOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        systemStatus={systemStatus}
      />

      {/* Error Toast Notification if any */}
      {errorToast && (
        <div className="bg-rose-500 text-white text-xs px-4 py-2 text-center font-medium shadow-md flex items-center justify-center gap-2">
          <span>⚠️ {errorToast}</span>
          <button 
            onClick={() => setErrorToast(null)}
            className="underline ml-2 text-rose-100 hover:text-white"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Welcome & Primary Search Bar */}
        <HeroSection
          onSubmitQuery={handleSendMessage}
          onSelectSuggestedQuery={handleSendMessage}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          {/* Service Categories Grid */}
          <CategoryGrid
            categories={categories}
            onSelectCategoryQuestion={handleSendMessage}
          />

          {/* Integrated AI Assistant Chat */}
          <div className="pt-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
                  Interactive AI Assistant
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Real-time conversational interface with memory and knowledge verification
                </p>
              </div>
            </div>

            <ChatSection
              messages={messages}
              isLoading={isLoading}
              onSendMessage={handleSendMessage}
              onClearChat={handleClearChat}
              onSelectSuggestedQuery={handleSendMessage}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenKB={() => setIsKBOpen(true)}
        onOpenTester={() => setIsTesterOpen(true)}
      />

      {/* Modals & Drawers */}
      <QuickTesterModal
        isOpen={isTesterOpen}
        onClose={() => setIsTesterOpen(false)}
        onRunTestQuery={handleSendMessage}
      />

      <KnowledgeBaseModal
        isOpen={isKBOpen}
        onClose={() => setIsKBOpen(false)}
        categories={categories}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        systemStatus={systemStatus}
        customApiKey={customApiKey}
        onSaveCustomApiKey={handleSaveCustomApiKey}
      />
    </div>
  );
}
