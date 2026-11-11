/**
 * CAMPUS CONNECT - AI Service
 * Powered by Google Gemini API & Authoritative Presidency University Student Handbook 2025-26 + Academic Calendar 2026-27
 * Presidency University, Bengaluru | School of Computer Science & Engineering
 */

const { KNOWLEDGE_BASE, HANDBOOK_DETAILS, SYSTEM_PROMPT } = require('./knowledgeBase');

// Default model to use
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

/**
 * High-Precision Grounded Semantic Engine
 * Sourced directly from official Presidency University Student Handbook & Academic Calendar
 */
function processWithGroundedEngine(query, history = []) {
  const normalized = query.toLowerCase().trim().replace(/[?!.,;]+$/, '');

  // 1. Detect Greetings (Hi, Hello, Hey, Good morning, etc.)
  const isGreeting = /^(hi|hello|hey|hey\s+there|good\s*(morning|afternoon|evening|day)|greetings|hola|namaste)$/i.test(normalized) ||
                     /^(hi|hello|hey)\s+(campus\s+connect|bot|assistant|buddy)/i.test(normalized);

  if (isGreeting) {
    return {
      response: "Hello! 👋 Welcome to Campus Connect. I'm your Presidency University AI assistant. I can help you with fee payment, hostel rules, exam dates, library policies, attendance requirements, and more. What would you like to know?",
      category: 'conversational',
      confidence: 'high',
      isAvailableInKB: true,
      provider: 'grounded-engine',
      suggestedFollowUps: [
        'What is the university fee payment and installment policy?',
        'What are the hostel rules and attendance requirements?',
        'When are the Mid-Term and End-Term examinations?'
      ],
      timestamp: new Date().toISOString()
    };
  }

  // 2. Identity & Capabilities
  const isIdentity = /^(who\s+are\s+you|what\s+is\s+your\s+name|what\s+are\s+you|tell\s+me\s+about\s+yourself|who\s+made\s+you)/i.test(normalized);
  if (isIdentity) {
    return {
      response: "I'm Campus Connect, the AI-powered student helpdesk assistant for Presidency University, Bengaluru. I am trained on the official Student Handbook (2025-26) and Academic Calendar (2026-27) to answer questions about fees, hostel accommodations, exams, attendance, placements, library, administration, and campus life.",
      category: 'conversational',
      confidence: 'high',
      isAvailableInKB: true,
      provider: 'grounded-engine',
      suggestedFollowUps: [
        'How are university fees paid?',
        'How can I raise a hostel complaint?',
        'When do Odd Semester examinations take place?'
      ],
      timestamp: new Date().toISOString()
    };
  }

  const isCapability = /^(what\s+can\s+you\s+do|how\s+can\s+you\s+help|what\s+do\s+you\s+do|can\s+you\s+help\s+me|help\s+me)$/i.test(normalized);
  if (isCapability) {
    return {
      response: "I can guide you through every aspect of student life at Presidency University! You can ask me about:\n• University Fee Policy, instalment schedules, and UGC refund rules\n• Hostel room allotment, mess rules, and warden contacts\n• Academic Calendar 2026-27 examination schedules\n• Minimum 75% attendance requirements\n• Library borrowing, overdue fees, and Knimbus remote access\n• Bonafide certificates, transcripts, and student grievance redressal.",
      category: 'conversational',
      confidence: 'high',
      isAvailableInKB: true,
      provider: 'grounded-engine',
      suggestedFollowUps: [
        'What is the refund policy on admission withdrawal?',
        'What are the hostel warden contact numbers?',
        'When is the cultural fest (Kal-Utsav)?'
      ],
      timestamp: new Date().toISOString()
    };
  }

  // 3. Courtesies
  const isThanks = /^(thanks|thank\s+you|thankyou|thx|appreciate\s+it|thank\s+you\s+so\s+much)/i.test(normalized);
  if (isThanks) {
    return {
      response: "You're very welcome! 😊 Feel free to ask anytime if you need more details about fees, hostel, academics, or campus events. Have a great day at Presidency University!",
      category: 'conversational',
      confidence: 'high',
      isAvailableInKB: true,
      provider: 'grounded-engine',
      suggestedFollowUps: ['When are the Mid-Term examinations?', 'How do I get a bonafide certificate?'],
      timestamp: new Date().toISOString()
    };
  }

  // 4. Detailed FEE Questions
  const isFeeQuery = /\b(fee|fees|tuition|installment|instalment|refund|withdrawal|payment mode|security deposit|caution deposit)\b/i.test(normalized);
  if (isFeeQuery) {
    if (/\b(refund|cancellation|withdrawal|money back)\b/i.test(normalized)) {
      return {
        response: `According to Section 17.1 of the Presidency University Student Handbook, fee refund on withdrawal follows UGC Guidelines:\n• 100% refund: 15 days or more before the formally notified last date of admission.\n• 90% refund: Less than 15 days before the last date.\n• 80% refund: 15 days or less after the last date.\n• 50% refund: 30 days or less (but >15 days) after the last date.\n• 0% refund (only caution/security deposit refunded): More than 30 days after program commencement.\nNote: A processing fee of up to 5% (max Rs. 5,000) is deducted. Refunds are processed via NEFT to the parent's bank account within 30 calendar days.`,
        category: 'administration',
        confidence: 'high',
        isAvailableInKB: true,
        provider: 'grounded-engine',
        suggestedFollowUps: [
          'What payment modes are accepted for university fees?',
          'How many installments can I pay fees in?'
        ],
        timestamp: new Date().toISOString()
      };
    }

    if (/\b(how|mode|method|pay|cash|cheque|check|card|dd|demand draft|net banking)\b/i.test(normalized)) {
      return {
        response: `As per Section 17.1 of the Student Handbook, the University fee is charged annually in advance, facilitated in TWO instalments (first in June, second in November).\nAccepted payment modes:\n1. Cash\n2. Bank Demand Draft\n3. Net Banking or Credit/Debit Card\n⚠️ IMPORTANT: Cheques are NOT accepted by the University. Failure to pay on or before the due date results in ineligibility to register for the term.`,
        category: 'administration',
        confidence: 'high',
        isAvailableInKB: true,
        provider: 'grounded-engine',
        suggestedFollowUps: [
          'What is the refund policy on admission withdrawal?',
          'When is the second installment due?'
        ],
        timestamp: new Date().toISOString()
      };
    }

    // General Fee Response
    return {
      response: `Presidency University fee is charged on an annual basis in advance (not semester-based). For student convenience, payment is facilitated in two instalments: the first in June and the second in November. Fees can be paid via Cash, Demand Draft, or Net Banking/Cards (Cheques are not accepted). Security deposits are refunded upon graduation or formal withdrawal after adjusting dues.`,
      category: 'administration',
      confidence: 'high',
      isAvailableInKB: true,
      provider: 'grounded-engine',
      suggestedFollowUps: [
        'What is the fee refund policy?',
        'How do I submit fee dues or receipt for certificates?'
      ],
      timestamp: new Date().toISOString()
    };
  }

  // 5. Detailed HOSTEL Questions
  const isHostelQuery = /\b(hostel|hostels|hosteller|room|mess|warden|shoukath|zareena|dormitory|dorm|accommodation|curfew)\b/i.test(normalized);
  if (isHostelQuery) {
    if (/\b(attendance|rule|75%|eligibility|keep|renew)\b/i.test(normalized)) {
      return {
        response: `As per Section 17.9 of the Student Handbook: In case a student (hosteller) fails to maintain a minimum 75% attendance in all registered courses at the end of the semester, the hostel facility will be withdrawn for the student. The student will NOT be provided hostel accommodation for the next semester.`,
        category: 'hostel',
        confidence: 'high',
        isAvailableInKB: true,
        provider: 'grounded-engine',
        suggestedFollowUps: [
          'Whom should I contact for hostel complaints and warden queries?',
          'How is hostel accommodation allotted?'
        ],
        timestamp: new Date().toISOString()
      };
    }

    if (/\b(contact|warden|in charge|director|phone|number|email|call|complaint)\b/i.test(normalized)) {
      return {
        response: `Hostel-related complaints should be submitted to the Hostel Administration. Key contacts:\n• Director, Student Housing: Dr. Syed Shoukath Ali (Phone: 8050643902, Email: shoukathali@presidencyuniversity.in)\n• Girls Hostel Residence Officer: Ms. Zareena Ali (Phone: 9148572609, Email: zareena.ali@presidencyuniversity.in)\nLocal guardian nomination is mandatory for all hostel admissions.`,
        category: 'hostel',
        confidence: 'high',
        isAvailableInKB: true,
        provider: 'grounded-engine',
        suggestedFollowUps: [
          'What is the attendance requirement for hostel students?',
          'How does the hostel mess facility work?'
        ],
        timestamp: new Date().toISOString()
      };
    }

    // General hostel info
    return {
      response: `Presidency University provides separate, secure hostels for boys and girls with an in-house hostel mess at an affordable fee. Allotment is on a first-come-first-serve basis at admission for odd and even semesters. Hostellers must maintain at least 75% attendance in all courses to retain their room for the next semester. Banned substances (tobacco, alcohol, drugs) are strictly prohibited and result in immediate expulsion.`,
      category: 'hostel',
      confidence: 'high',
      isAvailableInKB: true,
      provider: 'grounded-engine',
      suggestedFollowUps: [
        'Whom should I contact for hostel complaints?',
        'What happens if my attendance is below 75% in hostel?'
      ],
      timestamp: new Date().toISOString()
    };
  }

  // 6. Detailed EXAMINATIONS & ACADEMIC CALENDAR Questions
  const isExamQuery = /\b(exam|examination|midterm|mid-term|endterm|end-term|makeup|make-up|timetable|date|calendar|results|revaluation|examredressal)\b/i.test(normalized);
  if (isExamQuery) {
    if (/\b(end\s*term|final\s*exam|endsem)\b/i.test(normalized)) {
      return {
        response: `As per the Academic Calendar 2026-27:\n• Odd Semester End-Term Examinations (including labs): 7th December 2026 (Monday) to 30th December 2026 (Wednesday).\n• Results Declaration: 25th January 2027 (Monday).\n• Even Semester End-Term Examinations: 24th May 2027 (Monday) to 12th June 2027 (Saturday).`,
        category: 'examinations',
        confidence: 'high',
        isAvailableInKB: true,
        provider: 'grounded-engine',
        suggestedFollowUps: [
          'When are Make-Up examinations scheduled?',
          'How do I file an exam grievance?'
        ],
        timestamp: new Date().toISOString()
      };
    }

    if (/\b(mid\s*term|midterm)\b/i.test(normalized)) {
      return {
        response: `According to the official Presidency University Academic Calendar 2026-27:\n• Odd Semester Mid-Term Examinations: 5th October 2026 (Monday) to 9th October 2026 (Friday) for all senior UG/PG and B.Tech batches.\n• Even Semester Mid-Term Examinations: 15th March 2027 (Monday) to 19th March 2027 (Friday).`,
        category: 'examinations',
        confidence: 'high',
        isAvailableInKB: true,
        provider: 'grounded-engine',
        suggestedFollowUps: [
          'When are the End-Term examinations scheduled?',
          'When are the Make-Up examinations held?'
        ],
        timestamp: new Date().toISOString()
      };
    }

    if (/\b(grievance|revaluation|issue|problem|complaint|redressal)\b/i.test(normalized)) {
      return {
        response: `The Examination Grievance Redressal Cell resolves grievances related to examinations and continuous assessments. Students may submit grievances by filling the form with the coordinator or by emailing: examredressal@presidencyuniversity.in.`,
        category: 'examinations',
        confidence: 'high',
        isAvailableInKB: true,
        provider: 'grounded-engine',
        suggestedFollowUps: [
          'Where can I find the examination timetable?',
          'When are results announced?'
        ],
        timestamp: new Date().toISOString()
      };
    }

    return {
      response: `Examination timetables and notifications are published through official university channels. For 2026-27, Odd Semester Mid-Terms run from 5th to 9th October 2026, and End-Terms from 7th to 30th December 2026. Make-Up exams are held from 8th to 19th February 2027. Grievances can be emailed to examredressal@presidencyuniversity.in.`,
      category: 'examinations',
      confidence: 'high',
      isAvailableInKB: true,
      provider: 'grounded-engine',
      suggestedFollowUps: [
        'When are the Mid-Term examinations for 2026-27?',
        'When are End-Term exam results declared?'
      ],
      timestamp: new Date().toISOString()
    };
  }

  // 7. Detailed LIBRARY Questions
  const isLibraryQuery = /\b(library|book|books|borrow|renew|overdue|late fee|fine|knimbus|opac|timing|hours)\b/i.test(normalized);
  if (isLibraryQuery) {
    return {
      response: `As per Section 17.4 of the Student Handbook:\n• Lending Period: Books are issued for 15 days against your University ID card.\n• Overdue Charges: Rs. 5 per book/day for the first 10 days; Rs. 10 per book/day from the 11th day onward.\n• Renewals: Can be renewed twice for 15 days each if not in demand or reserved.\n• Lost Books: 3x current price (before due date); 3x price + overdue fine (after due date); 5x cost for rare books.\n• Working Hours: Mon-Sat 8:30 AM to 6:30 PM (extended to 8:00 PM during End-Term exams).\n• Remote Access: Knimbus platform and Web OPAC accessible online. Email: library.services@presidencyUniversity.in.`,
      category: 'library',
      confidence: 'high',
      isAvailableInKB: true,
      provider: 'grounded-engine',
      suggestedFollowUps: [
        'How many days can I borrow books from the library?',
        'What are the overdue fines for late book return?'
      ],
      timestamp: new Date().toISOString()
    };
  }

  // 8. Detailed ADMINISTRATION & CERTIFICATES Questions
  const isAdminQuery = /\b(certificate|bonafide|transcript|transcripts|marksheet|migration|tc|duplicate|id card|dress code|sgrc)\b/i.test(normalized);
  if (isAdminQuery) {
    if (/\b(bonafide)\b/i.test(normalized)) {
      return {
        response: `According to Section 18.7 of the Student Handbook, students requiring a Bonafide Certificate (for bank loan, passport, scholarship, or visa) must apply to the Registrar's Office. The bonafide certificate is issued within ONE (1) working day from the date of application receipt.`,
        category: 'administration',
        confidence: 'high',
        isAvailableInKB: true,
        provider: 'grounded-engine',
        suggestedFollowUps: [
          'How long do academic transcripts take to be issued?',
          'What is the procedure for duplicate certificate?'
        ],
        timestamp: new Date().toISOString()
      };
    }

    if (/\b(transcript|transcripts)\b/i.test(normalized)) {
      return {
        response: `As per Section 18.8 of the Student Handbook, transcripts are issued by the Examination Department for higher education or competitive exams. Students must submit a written request along with fee payment receipt. Transcripts are processed and issued within two (02) weeks (2 weeks) from the date of application.`,
        category: 'administration',
        confidence: 'high',
        isAvailableInKB: true,
        provider: 'grounded-engine',
        suggestedFollowUps: [
          'How long does a bonafide certificate take?',
          'Whom do I contact for administrative records?'
        ],
        timestamp: new Date().toISOString()
      };
    }

    return {
      response: `Students may contact the respective administrative office for certificates and student records. Bonafide certificates are issued in 1 day from the Registrar's Office, and academic transcripts are issued in 2 weeks by the Examination Department. For general non-academic grievances, email studentgrievance@presidencyuniversity.in.`,
      category: 'administration',
      confidence: 'high',
      isAvailableInKB: true,
      provider: 'grounded-engine',
      suggestedFollowUps: [
        'How long does a bonafide certificate take?',
        'How can I get my official academic transcripts?'
      ],
      timestamp: new Date().toISOString()
    };
  }

  // 9. Standard category keyword scoring
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

  if (matchedCategory) {
    const catData = KNOWLEDGE_BASE[matchedCategory];
    return {
      response: catData.officialStatement,
      category: matchedCategory,
      confidence: 'high',
      isAvailableInKB: true,
      provider: 'grounded-engine',
      suggestedFollowUps: catData.suggestedQuestions.slice(0, 2),
      timestamp: new Date().toISOString()
    };
  }

  // Fallback for completely unknown/out of scope
  return {
    response: "The requested information is not available in the Presidency University Student Handbook or Academic Calendar. Campus Connect provides authoritative guidance on Academics, Attendance, Fees & Payment, Examinations, Placements, Library, Hostel, Administration, and Campus Events.",
    category: 'unknown',
    confidence: 'low',
    isAvailableInKB: false,
    provider: 'grounded-engine',
    suggestedFollowUps: [
      'What is the university fee payment and installment policy?',
      'What are the hostel rules and attendance requirements?',
      'When are Mid-Term examinations scheduled?'
    ],
    timestamp: new Date().toISOString()
  };
}

/**
 * Call Gemini API via REST with rich System Prompt containing Handbook & Calendar
 */
async function callGeminiApi(apiKey, query, history = []) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const contents = [];
  const formattedSystemPrompt = `${SYSTEM_PROMPT}\n\nIMPORTANT: Format your response as a valid JSON object only with keys: "response" (string), "category" (string), "confidence" ("high"|"medium"|"low"), "isAvailableInKB" (boolean), "suggestedFollowUps" (array of 2 strings). Do not wrap in markdown quotes if possible, or use standard json formatting.`;

  if (Array.isArray(history) && history.length > 0) {
    const recentHistory = history.slice(-6);
    for (const msg of recentHistory) {
      contents.push({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text || msg.response || '' }]
      });
    }
  }

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
      temperature: 0.3,
      topP: 0.85,
      maxOutputTokens: 800,
      responseMimeType: 'application/json'
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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

  console.log('[AI Service] Processing query with Trained Grounded Engine (Handbook & Calendar).');
  return processWithGroundedEngine(query, history);
}

module.exports = {
  answerStudentQuery,
  processWithGroundedEngine,
  KNOWLEDGE_BASE,
  HANDBOOK_DETAILS
};
