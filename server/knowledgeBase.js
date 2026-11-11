/**
 * CAMPUS CONNECT - Knowledge Base
 * Authoritative University Information as per TECHNOPIA 2.0 Competition Specifications
 * Presidency University, Bengaluru | School of Computer Science & Engineering
 */

const KNOWLEDGE_BASE = {
  academics: {
    id: 'academics',
    title: 'Academics',
    description: 'Faculty advisory, course guidance, and curriculum support.',
    icon: 'GraduationCap',
    image: '/images/cat-academics.jpg',
    color: 'from-blue-500 to-indigo-600',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    officialStatement: 'Students may contact their faculty advisor for academic-related assistance.',
    suggestedQuestions: [
      'Whom should I contact for academic problems?',
      'How can I get guidance for my courses and studies?',
      'Who is my point of contact for academic support?'
    ],
    keywords: ['academic', 'advisor', 'faculty', 'professor', 'course', 'study', 'curriculum', 'grade', 'syllabus', 'subject', 'lecture', 'teaching']
  },

  attendance: {
    id: 'attendance',
    title: 'Attendance',
    description: 'Attendance rules, minimum percentage, and institutional norms.',
    icon: 'UserCheck',
    image: '/images/cat-attendance.jpg',
    color: 'from-emerald-500 to-teal-600',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    officialStatement: 'Students should follow the minimum attendance requirement prescribed by university regulations.',
    suggestedQuestions: [
      'What are the attendance requirements?',
      'How much minimum attendance do I need to maintain?',
      'What happens if my attendance is low?'
    ],
    keywords: ['attendance', 'present', 'absent', 'percentage', 'minimum attendance', 'shortage', 'leave', 'condonation']
  },

  examinations: {
    id: 'examinations',
    title: 'Examinations',
    description: 'Exam schedules, timetable releases, and exam circulars.',
    icon: 'FileText',
    image: '/images/cat-examinations.jpg',
    color: 'from-violet-500 to-purple-600',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    officialStatement: 'Examination timetables and notifications are published through official university channels.',
    suggestedQuestions: [
      'Where can I find the examination timetable?',
      'How will I be notified about upcoming exams?',
      'When are semester exam circulars released?'
    ],
    keywords: ['exam', 'examination', 'timetable', 'schedule', 'date sheet', 'notifications', 'hall ticket', 'test', 'midterm', 'endsem', 'results', 'revaluation']
  },

  placements: {
    id: 'placements',
    title: 'Placements',
    description: 'Campus placement drives, interview preparation, and internships.',
    icon: 'Briefcase',
    image: '/images/cat-placements.jpg',
    color: 'from-amber-500 to-orange-600',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    officialStatement: 'Students may contact the Placement Department for training and placement-related information.',
    suggestedQuestions: [
      'Whom should I contact for placement training?',
      'Where can I get information regarding campus drives and interviews?',
      'How can I connect with the placement cell?'
    ],
    keywords: ['placement', 'job', 'training', 'internship', 'interview', 'career', 'recruitment', 'package', 'company', 'campus drive', 'resume']
  },

  library: {
    id: 'library',
    title: 'Library',
    description: 'Book borrowing, digital resources, study rooms, and access hours.',
    icon: 'BookOpen',
    image: '/images/cat-library.jpg',
    color: 'from-cyan-500 to-blue-600',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    officialStatement: "Students may access library resources according to the library's timings and regulations.",
    suggestedQuestions: [
      'How can I access library resources?',
      'What rules apply to using the university library?',
      'Where can I read books and access digital journals?'
    ],
    keywords: ['library', 'book', 'borrow', 'journal', 'reading room', 'reference', 'resource', 'timing', 'digital library', 'fine', 'return']
  },

  hostel: {
    id: 'hostel',
    title: 'Hostel',
    description: 'Accommodation grievances, maintenance, warden and room facilities.',
    icon: 'Home',
    image: '/images/cat-hostel.jpg',
    color: 'from-rose-500 to-pink-600',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    officialStatement: 'Hostel-related complaints should be submitted to the Hostel Administration.',
    suggestedQuestions: [
      'How can I raise a hostel complaint?',
      'Whom do I contact for room maintenance or warden queries?',
      'Where should hostel grievances be submitted?'
    ],
    keywords: ['hostel', 'room', 'warden', 'complaint', 'maintenance', 'mess', 'food', 'dormitory', 'stay', 'accommodation', 'curfew']
  },

  administration: {
    id: 'administration',
    title: 'Administration',
    description: 'Bonafide certificates, transcripts, ID cards, and official records.',
    icon: 'Building2',
    image: '/images/cat-administration.jpg',
    color: 'from-slate-600 to-zinc-800',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
    officialStatement: 'Students may contact the respective administrative office for certificates and student records.',
    suggestedQuestions: [
      'How do I get my bonafide certificate or student records?',
      'Whom should I contact for official university documents?',
      'Where can I collect my marksheets or ID card?'
    ],
    keywords: ['administration', 'certificate', 'records', 'transcript', 'bonafide', 'documents', 'marksheet', 'office', 'admin', 'registrar', 'fee receipt']
  },

  events: {
    id: 'events',
    title: 'Events',
    description: 'Fests, technical symposiums, workshops, and campus activities.',
    icon: 'Calendar',
    image: '/images/cat-events.jpg',
    color: 'from-fuchsia-500 to-pink-600',
    badgeColor: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
    officialStatement: 'University event announcements are shared through official communication channels.',
    suggestedQuestions: [
      'Where are university event announcements posted?',
      'How do I find out about upcoming fests and competitions?',
      'Where can I check the campus event schedule?'
    ],
    keywords: ['event', 'announcement', 'fest', 'cultural', 'competition', 'hackathon', 'workshop', 'seminar', 'conference', 'sports', 'technopia']
  }
};

const SYSTEM_PROMPT = `
You are Campus Connect, the friendly, intelligent AI-Powered University Student Support Assistant for Presidency University, Bengaluru.
Your goal is to be a welcoming, knowledgeable, and empathetic assistant for students, supporting both conversational dialogue and strictly grounded university information inquiries.

CONVERSATIONAL & GREETING BEHAVIOR:
1. GREETINGS (Hi, Hello, Hey, Good morning, Good evening, etc.):
   - Greet the student warmly, introduce Campus Connect, and ask how you can help.
   - Example: "Hello! 👋 Welcome to Campus Connect. I'm your AI-powered university assistant. How can I help you today?"
   - Category: "conversational"
   - isAvailableInKB: true

2. IDENTITY & CAPABILITIES ("Who are you?", "What can you do?", "What is Campus Connect?", etc.):
   - Introduce yourself as Campus Connect, Presidency University's AI helpdesk assistant.
   - Mention that you guide students regarding: Academics, Attendance, Examinations, Placements, Library, Hostel, Administration, and Events.
   - Example: "I'm Campus Connect, your AI-powered university helpdesk assistant. I can help you find information about academics, attendance, examinations, placements, hostel facilities, library services, administration and university events."
   - Category: "conversational"
   - isAvailableInKB: true

3. POLITE COURTESIES ("Thank you", "Thanks", "Bye", "Goodbye", "Awesome"):
   - Respond cordially and offer ongoing help.
   - Category: "conversational"
   - isAvailableInKB: true

OFFICIAL UNIVERSITY KNOWLEDGE BASE:
1. Academics: Students may contact their faculty advisor for academic-related assistance.
2. Attendance: Students should follow the minimum attendance requirement prescribed by university regulations.
3. Examinations: Examination timetables and notifications are published through official university channels.
4. Placements: Students may contact the Placement Department for training and placement-related information.
5. Library: Students may access library resources according to the library's timings and regulations.
6. Hostel: Hostel-related complaints should be submitted to the Hostel Administration.
7. Administration: Students may contact the respective administrative office for certificates and student records.
8. Events: University event announcements are shared through official communication channels.

CRITICAL RULES:
1. When answering university questions, ONLY answer using the supplied university information above.
2. NEVER invent or hallucinate university policies, dates, phone numbers, email addresses, fee amounts, room numbers, or regulations that are not stated.
3. If a student asks for information not contained in the knowledge base:
   - For specific details regarding a covered topic (e.g., exact exam date, exact attendance %): Politely state that the specific detail is not available in the supplied university information and direct them to the appropriate official authority/channel.
   - For completely unrelated questions (e.g. "What is the capital of France?"): Politely explain that as the Presidency University Campus Helpdesk, you can only provide information regarding university services (Academics, Attendance, Examinations, Placements, Library, Hostel, Administration, Events).
4. Maintain a polite, encouraging, and student-friendly tone.
5. Provide concise, clear, and well-structured answers.
6. You will output a JSON object containing:
   - "response": The student-friendly textual response.
   - "category": The identified category id (e.g. "academics", "attendance", "examinations", "placements", "library", "hostel", "administration", "events", "conversational", or "unknown").
   - "confidence": "high", "medium", or "low".
   - "isAvailableInKB": true or false (false if the specific question details cannot be answered from the KB).
   - "suggestedFollowUps": Array of 2-3 short relevant follow-up questions.
`;

module.exports = {
  KNOWLEDGE_BASE,
  SYSTEM_PROMPT
};
