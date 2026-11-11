/**
 * CAMPUS CONNECT - AI Service
 * Handles Google Gemini API integration with fallback grounded semantic processor.
 */

const { KNOWLEDGE_BASE, SYSTEM_PROMPT } = require('./knowledgeBase');

// Default model to use
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

/**
 * Intelligent Local Grounded Engine (Used as resilient fallback or offline engine)
 */
function processWithGroundedEngine(query, history = []) {
  const normalized = query.toLowerCase().trim();

  // 1. Detect if asking for specific unavailable details (dates, fees, names, numbers, percentages)
  const isAskingSpecificDate = /\b(exact date|when is the date|what date|which day|schedule date|next exam date)\b/i.test(normalized);
  const isAskingSpecificFee = /\b(fee|cost|how much money|charges|pricing|amount to pay)\b/i.test(normalized);
  const isAskingSpecificContact = /\b(phone number|mobile|email address|whatsapp|contact number|cell)\b/i.test(normalized);
  const isAskingSpecificPercentage = /\b(how much percentage|what percent|75%|80%|exact attendance percentage)\b/i.test(normalized);

  // 2. Intent matching across the 8 categories
  let matchedCategory = null;
  let highestScore = 0;

  for (const [catKey, data] of Object.entries(KNOWLEDGE_BASE)) {
    let score = 0;
    for (const keyword of data.keywords) {
      if (normalized.includes(keyword)) {
        score += keyword.length > 5 ? 2 : 1;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      matchedCategory = catKey;
    }
  }

  // 3. Response generation grounded strictly in the official KB
  let responseText = '';
  let isAvailableInKB = true;
  let category = matchedCategory || 'general';

  if (isAskingSpecificDate && matchedCategory === 'examinations') {
    isAvailableInKB = false;
    responseText = 'The exact examination date is not available in the supplied university information. Examination timetables and notifications are published through official university channels.';
  } else if (isAskingSpecificPercentage && matchedCategory === 'attendance') {
    isAvailableInKB = false;
    responseText = 'The specific percentage is not specified in the supplied university information. Students should follow the minimum attendance requirement prescribed by university regulations.';
  } else if (isAskingSpecificFee) {
    isAvailableInKB = false;
    responseText = 'Fee details are not available in the supplied university information. For fee-related queries and records, students may contact the respective administrative office.';
  } else if (isAskingSpecificContact && matchedCategory) {
    isAvailableInKB = false;
    const catData = KNOWLEDGE_BASE[matchedCategory];
    responseText = `Specific contact numbers or email addresses are not provided in the supplied university information. ${catData.officialStatement}`;
  } else if (matchedCategory) {
    // Standard grounded response for the category
    const catData = KNOWLEDGE_BASE[matchedCategory];
    switch (matchedCategory) {
      case 'academics':
        responseText = 'Students may contact their faculty advisor for academic-related assistance. Your faculty advisor can guide you regarding courses, curriculum, and academic progress.';
        break;
      case 'attendance':
        responseText = 'Students should follow the minimum attendance requirement prescribed by university regulations. Please ensure you attend all scheduled classes regularly.';
        break;
      case 'examinations':
        responseText = 'Examination timetables and notifications are published through official university channels. Please keep monitoring official announcements for updates.';
        break;
      case 'placements':
        responseText = 'Students may contact the Placement Department for training and placement-related information, including campus interview drives and preparatory sessions.';
        break;
      case 'library':
        responseText = "Students may access library resources according to the library's timings and regulations. Both physical and designated reference materials follow these guidelines.";
        break;
      case 'hostel':
        responseText = 'Hostel-related complaints should be submitted to the Hostel Administration. They oversee room allocations, maintenance, and student living facilities.';
        break;
      case 'administration':
        responseText = 'Students may contact the respective administrative office for certificates and student records, such as bonafide letters, transcripts, and official documentation.';
        break;
      case 'events':
        responseText = 'University event announcements are shared through official communication channels. Stay tuned to university portals for upcoming fests and competitions.';
        break;
      default:
        responseText = catData.officialStatement;
    }
  } else {
    // Unrecognized or out-of-scope query
    isAvailableInKB = false;
    category = 'unknown';
    responseText = 'The requested information is not available in the supplied university knowledge base. Campus Connect provides guidance on Academics, Attendance, Examinations, Placements, Library, Hostel, Administration, and Events.';
  }

  // Follow-up suggestions
  const suggestedFollowUps = matchedCategory && KNOWLEDGE_BASE[matchedCategory]
    ? KNOWLEDGE_BASE[matchedCategory].suggestedQuestions.slice(0, 2)
    : [
        'Whom should I contact for academic problems?',
        'Where can I find the examination timetable?',
        'How can I raise a hostel complaint?'
      ];

  return {
    response: responseText,
    category: category,
    confidence: matchedCategory ? 'high' : 'low',
    isAvailableInKB: isAvailableInKB,
    provider: 'grounded-engine',
    suggestedFollowUps: suggestedFollowUps,
    timestamp: new Date().toISOString()
  };
}

/**
 * Call Gemini API via REST
 */
async function callGeminiApi(apiKey, query, history = []) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  // Build conversation context
  const contents = [];

  // Add system instruction as first user/model context or system prompt
  const formattedSystemPrompt = `${SYSTEM_PROMPT}\n\nIMPORTANT: Format your response as a valid JSON object only with keys: "response" (string), "category" (string), "confidence" ("high"|"medium"|"low"), "isAvailableInKB" (boolean), "suggestedFollowUps" (array of 2 strings). Do not wrap in markdown quotes if possible, or use standard json formatting.`;

  // Include recent history (up to last 6 turns)
  if (Array.isArray(history) && history.length > 0) {
    const recentHistory = history.slice(-6);
    for (const msg of recentHistory) {
      contents.push({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text || msg.response || '' }]
      });
    }
  }

  // Add current query
  contents.push({
    role: 'user',
    parts: [{ text: query }]
  });

  const payload = {
    contents: contents,
    systemInstruction: {
      parts: [{ text: formattedSystemPrompt }]
    },
    generationConfig: {
      temperature: 0.2, // Low temperature for factual consistency
      topP: 0.8,
      maxOutputTokens: 500,
      responseMimeType: 'application/json'
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorData}`);
  }

  const result = await response.json();
  const candidate = result.candidates?.[0];
  const responseRawText = candidate?.content?.parts?.[0]?.text;

  if (!responseRawText) {
    throw new Error('Gemini API returned an empty response.');
  }

  // Clean JSON string if wrapped in markdown
  let cleaned = responseRawText.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();
  }

  const parsed = JSON.parse(cleaned);

  return {
    response: parsed.response,
    category: parsed.category || 'general',
    confidence: parsed.confidence || 'high',
    isAvailableInKB: parsed.isAvailableInKB !== undefined ? parsed.isAvailableInKB : true,
    provider: 'gemini-api',
    model: GEMINI_MODEL,
    suggestedFollowUps: parsed.suggestedFollowUps || [],
    timestamp: new Date().toISOString()
  };
}

/**
 * Main query handler: attempts Gemini API first, falls back gracefully to grounded engine
 */
async function answerStudentQuery(query, history = [], customApiKey = null) {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  if (apiKey && apiKey.trim().length > 10 && apiKey !== 'YOUR_GEMINI_API_KEY_HERE') {
    try {
      console.log(`[AI Service] Processing via Gemini API (${GEMINI_MODEL})...`);
      const aiResult = await callGeminiApi(apiKey, query, history);
      return aiResult;
    } catch (err) {
      console.warn(`[AI Service] Gemini API call failed (${err.message}). Falling back to local grounded engine.`);
      const fallbackResult = processWithGroundedEngine(query, history);
      fallbackResult.fallbackReason = err.message;
      return fallbackResult;
    }
  }

  console.log('[AI Service] No Gemini API Key configured. Using high-precision Grounded Engine.');
  return processWithGroundedEngine(query, history);
}

module.exports = {
  answerStudentQuery,
  processWithGroundedEngine,
  KNOWLEDGE_BASE
};
