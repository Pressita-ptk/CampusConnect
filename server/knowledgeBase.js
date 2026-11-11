/**
 * CAMPUS CONNECT - Comprehensive Knowledge Base
 * Authoritative Presidency University Student Handbook 2025-26 & Academic Calendar 2026-27
 * Presidency University, Bengaluru | School of Computer Science & Engineering
 */

const KNOWLEDGE_BASE = {
  academics: {
    id: 'academics',
    title: 'Academics',
    description: 'Faculty advisory, course guidance, curriculum, 66+ labs, and international partnerships.',
    icon: 'GraduationCap',
    image: '/images/cat-academics.jpg',
    color: 'from-blue-500 to-indigo-600',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    officialStatement: 'Students may contact their faculty advisor for academic-related assistance.',
    suggestedQuestions: [
      'Whom should I contact for academic problems?',
      'What academic facilities and computing laboratories are available?',
      'What international exchange programs does Presidency University offer?'
    ],
    keywords: ['academic', 'advisor', 'faculty', 'professor', 'course', 'study', 'curriculum', 'grade', 'syllabus', 'subject', 'lecture', 'teaching', 'mentor', 'cgpa', 'credit']
  },

  attendance: {
    id: 'attendance',
    title: 'Attendance',
    description: 'Attendance rules, 75% minimum requirement for placements, exams and hostel.',
    icon: 'UserCheck',
    image: '/images/cat-attendance.jpg',
    color: 'from-emerald-500 to-teal-600',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    officialStatement: 'Students must maintain a minimum attendance of 75% or above across all registered courses prescribed by university regulations.',
    suggestedQuestions: [
      'What is the minimum attendance requirement?',
      'What happens if my attendance falls below 75%?',
      'Is 75% attendance mandatory for placements and hostel?'
    ],
    keywords: ['attendance', 'present', 'absent', 'percentage', 'minimum attendance', '75%', '75 percent', 'shortage', 'leave', 'condonation', 'bunk']
  },

  examinations: {
    id: 'examinations',
    title: 'Examinations',
    description: 'Exam schedules, Mid-Term (Oct 5-9, 2026), End-Term (Dec 7-30, 2026), and Grievance Cell.',
    icon: 'FileText',
    image: '/images/cat-examinations.jpg',
    color: 'from-violet-500 to-purple-600',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    officialStatement: 'Examination timetables and notifications are published through official university channels. Odd semester Mid-Terms are scheduled from 5th to 9th October 2026, and End-Terms from 7th to 30th December 2026.',
    suggestedQuestions: [
      'When are the Mid-Term examinations for 2026-27?',
      'What are the dates for End-Term and Make-Up examinations?',
      'How can I submit an examination grievance?'
    ],
    keywords: ['exam', 'examination', 'timetable', 'schedule', 'date sheet', 'notifications', 'hall ticket', 'test', 'midterm', 'mid-term', 'endsem', 'end-term', 'makeup', 'make-up', 'results', 'revaluation', 'examredressal']
  },

  placements: {
    id: 'placements',
    title: 'Placements',
    description: 'Training and Placement Department, 15.5 LPA top packages, campus recruitment and internships.',
    icon: 'Briefcase',
    image: '/images/cat-placements.jpg',
    color: 'from-amber-500 to-orange-600',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    officialStatement: 'Students may contact the Placement Department for training and placement-related information. Eligibility requires 75% or above attendance in all courses and a clean disciplinary record.',
    suggestedQuestions: [
      'Whom should I contact for placement training?',
      'What are the eligibility criteria for campus placement drives?',
      'What packages and recruitment support are offered?'
    ],
    keywords: ['placement', 'job', 'training', 'internship', 'interview', 'career', 'recruitment', 'package', 'company', 'campus drive', 'resume', '15.5 lpa']
  },

  library: {
    id: 'library',
    title: 'Library',
    description: '60,700+ books, 15 databases, 15-day borrowing, KOHA LMS, Web OPAC, and Knimbus.',
    icon: 'BookOpen',
    image: '/images/cat-library.jpg',
    color: 'from-cyan-500 to-blue-600',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    officialStatement: "Students may access library resources according to the library's timings and regulations. Books are issued for 15 days, with overdue charges of Rs. 5/day for first 10 days and Rs. 10/day thereafter.",
    suggestedQuestions: [
      'How can I access library resources and what are the library timings?',
      'How many days can I borrow books and what are the overdue late fees?',
      'What electronic databases and remote access are available?'
    ],
    keywords: ['library', 'book', 'borrow', 'journal', 'reading room', 'reference', 'resource', 'timing', 'digital library', 'fine', 'return', 'overdue', 'opac', 'knimbus', 'dspace']
  },

  hostel: {
    id: 'hostel',
    title: 'Hostel & Housing',
    description: 'Boys & girls accommodation, mess, affordable fee, 75% attendance rule, and warden contacts.',
    icon: 'Home',
    image: '/images/cat-hostel.jpg',
    color: 'from-rose-500 to-pink-600',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    officialStatement: 'Hostel facilities are allotted on a first-come-first-serve basis with separate blocks for boys and girls. Hostellers must maintain 75% attendance to retain accommodation for subsequent semesters.',
    suggestedQuestions: [
      'How can I apply for hostel accommodation and mess facilities?',
      'What is the attendance rule for hostel residents?',
      'Whom should I contact for hostel complaints and warden assistance?'
    ],
    keywords: ['hostel', 'room', 'warden', 'complaint', 'maintenance', 'mess', 'food', 'dormitory', 'stay', 'accommodation', 'curfew', 'housing', 'shoukath', 'zareena']
  },

  administration: {
    id: 'Administration & Fees',
    title: 'Administration & Fees',
    description: 'Fee payment policy (2 instalments), refund policy, bonafide (1 day), transcripts, and SGRC.',
    icon: 'Building2',
    image: '/images/cat-administration.jpg',
    color: 'from-slate-600 to-zinc-800',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
    officialStatement: 'The University fee is charged on an annual basis in two instalments (June & November). Bonafide certificates are issued in 1 day and transcripts in 2 weeks.',
    suggestedQuestions: [
      'What is the university fee payment policy and installment schedule?',
      'What is the fee refund policy if a student withdraws admission?',
      'How do I get my bonafide certificate or academic transcripts?'
    ],
    keywords: ['fee', 'fees', 'tuition', 'instalment', 'installment', 'payment', 'refund', 'withdrawal', 'cash', 'demand draft', 'net banking', 'cheque', 'check', 'administration', 'certificate', 'records', 'transcript', 'bonafide', 'documents', 'marksheet', 'office', 'admin', 'registrar', 'sgrc', 'studentgrievance']
  },

  events: {
    id: 'events',
    title: 'Events & Fests',
    description: 'Cultural Carnival (Kal-Utsav), AARAMBH Freshers, PPL Sports, UDAAN, and Euphoria.',
    icon: 'Calendar',
    image: '/images/cat-events.jpg',
    color: 'from-fuchsia-500 to-pink-600',
    badgeColor: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
    officialStatement: 'University event announcements are shared through official communication channels. Key 2026-27 events include AARAMBH (Aug 29), Kal-Utsav (Sept 26), PPL (Oct-Nov), and Euphoria (April 24).',
    suggestedQuestions: [
      'When is the cultural fest (Kal-Utsav / Euphoria)?',
      'What sports events and leagues (PPL, UDAAN) take place on campus?',
      'When is Freshers Day (AARAMBH) organized?'
    ],
    keywords: ['event', 'announcement', 'fest', 'cultural', 'competition', 'hackathon', 'workshop', 'seminar', 'sports', 'ppl', 'udaan', 'kal-utsav', 'aarambh', 'freshers', 'euphoria', 'carnival']
  }
};

/**
 * DETAILED STUDENT HANDBOOK & CALENDAR EXTRACTS
 * Sourced directly from Presidency University Student Handbook 2025-26 & Academic Calendar 2026-27
 */
const HANDBOOK_DETAILS = {
  feePolicy: {
    structure: "Annual basis (charged annually in advance for the concerned academic year, not semester-based).",
    instalments: "Facilitated in TWO instalments for student convenience: 1st instalment in June, 2nd instalment in November of every academic year.",
    paymentModes: "Cash, Bank Demand Draft, Net Banking, Credit/Debit card. Note: CHECKS ARE NOT ACCEPTED.",
    lateFeeWarning: "Failure to pay on or before prescribed dates disqualifies registration for the academic term, resulting in loss of the academic term/year.",
    refundPolicy: [
      { timeline: "15 days or more before formally notified last date of admission", refund: "100%" },
      { timeline: "Less than 15 days before formally notified last date of admission", refund: "90%" },
      { timeline: "15 days or less after formally notified last date of admission", refund: "80%" },
      { timeline: "30 days or less but not more than 15 days after formally notified last date of admission", refund: "50%" },
      { timeline: "More than 30 calendar days after commencement of program", refund: "No refund of tuition fee (only caution/security deposit refunded)" }
    ],
    processingFee: "Up to 5% of refunded value subject to maximum Rs. 5,000 (caution/security deposit refunded in full).",
    refundMode: "Through NEFT only to parent's bank account within a minimum of 30 calendar days from withdrawal completion.",
    subsequentWithdrawal: "If submitted by 15th July, advance fee refunded minus Rs. 5,000 processing fee. If after 15th July, no refund of advance fee.",
    securityDeposit: "Refunded after adjusting dues only when student completes program or formally withdraws."
  },

  hostelPolicy: {
    facilities: "Separate hostels for boys and girls with safe, convenient living facilities and an in-house hostel mess at an affordable fee.",
    allotment: "First-come-first-serve basis at the time of admission for odd and even semesters.",
    summerTerm: "Students requiring hostel in summer term must apply separately and pay the prescribed summer term hostel fee.",
    localGuardian: "Nomination of a local guardian is mandatory and must be accessible in emergencies.",
    attendanceRequirement: "Hostellers must maintain a MINIMUM 75% ATTENDANCE in all registered courses. Failing this at the end of the semester results in immediate withdrawal of the hostel facility for the next semester.",
    codeOfConduct: "Strict discipline enforced. Banned substances (alcohol, tobacco, narcotics, weapons) strictly prohibited; violation leads to immediate suspension and expulsion.",
    keyContacts: {
      directorStudentHousing: "Dr. Syed Shoukath Ali (Ph: 8050643902, Email: shoukathali@presidencyuniversity.in)",
      girlsHostelResidenceOfficer: "Ms. Zareena Ali (Ph: 9148572609, Email: zareena.ali@presidencyuniversity.in)"
    }
  },

  academicCalendar2026_27: {
    oddSemesterCommencement: "5th August 2026 (Wednesday) for senior batches and 1st year B.Tech programs.",
    midTermOddSemester: "5th October 2026 (Monday) to 9th October 2026 (Friday) for UG/PG, B.Tech, SoIS, SoC, SoD, SoL, SoLAS, SoMS.",
    endTermOddSemester: "7th December 2026 (Monday) to 30th December 2026 (Wednesday).",
    resultsOddSemester: "25th January 2027 (Monday) for senior batches and B.Tech.",
    evenSemesterCommencement: "18th January 2027 (Monday) for all UG and PG programs.",
    midTermEvenSemester: "15th March 2027 (Monday) to 19th March 2027 (Friday).",
    endTermEvenSemester: "24th May 2027 (Monday) to 12th June 2027 (Saturday).",
    makeUpExamsOddSemester: "8th February 2027 (Monday) to 19th February 2027 (Friday); results declared 1st March 2027.",
    keyFests: [
      { name: "Fresher's Day (AARAMBH)", date: "29th August 2026" },
      { name: "Cultural Carnival (Kal-Utsav)", date: "26th September 2026" },
      { name: "Presidency Premier League (PPL)", date: "21st October to 25th November 2026" },
      { name: "9th Innovative Project Expo", date: "2nd - 3rd December 2026" },
      { name: "UDAAN Inter-College Sports Fest", date: "16th - 19th February 2027" },
      { name: "Ethnic Day", date: "27th February 2027" },
      { name: "Euphoria Cultural Fest", date: "24th April 2027" },
      { name: "10th Innovative Project Expo", date: "12th - 13th May 2027" }
    ]
  },

  libraryRules: {
    collection: "Over 60,700 books, 155 national/international journals, 38 magazines, 15 online databases.",
    lendingPeriod: "15 days for all students against University ID card.",
    overdueCharges: "Rs. 5 per book/day for the first 10 days; Rs. 10 per book/day from the 11th day onward.",
    renewals: "Can be renewed twice for 15 days if not in demand or reserved.",
    lostBookPenalty: "3x the current price if reported before due date; 3x price + overdue charges if reported after due date; 5x cost if rare/out of print.",
    workingHours: "Monday to Saturday: 8:30 AM to 6:30 PM (extended to 8:00 PM during End-Term exams). Closed on Sundays and holidays.",
    eResources: "Knimbus Remote Access, IEEE, Science Direct, JSTOR, ProQuest, EBSCO, Turnitin, Drillbit.",
    contact: "library.services@presidencyUniversity.in"
  },

  certificatesAndAdmin: {
    bonafideCertificate: "Issued within 1 working day from receipt of application at the Registrar's Office.",
    transcripts: "Issued within 2 weeks by the Examination Department upon application and fee payment receipt.",
    provisionalDegree: "Issued upon completing degree requirements through the Controller of Examinations.",
    degreeBeforeConvocation: "Minimum 2 calendar months upon approval from Vice Chancellor and Chancellor.",
    duplicateCertificates: "Issued in 2 weeks (requires police FIR, non-traceable certificate, notarized affidavit, and fee receipt).",
    studentGrievanceRedressal: "Email: studentgrievance@presidencyuniversity.in (resolved within 1 week; can appeal to Ombudsperson within 15 days).",
    examGrievanceRedressal: "Email: examredressal@presidencyuniversity.in."
  },

  transportAndCampus: {
    transport: "Dedicated university fleet across Bengaluru. Annual fee, non-refundable. Transport ID card mandatory. Must arrive 5 mins before departure.",
    healthCentre: "In-house infirmary open 7 days a week, qualified doctors, trained nurses, satellite sick bays, ambulance on campus, tie-ups with top hospitals.",
    counselling: "Student counselling unit (namratha.j@presidencyUniversity.in, shivani.mukund@presidencyUniversity.in) + free 24/7 YourDOST access with 1000+ experts.",
    antiRagging: "Strict Zero Tolerance. Punishment includes police FIR, fine up to Rs. 2,50,000, rigorous imprisonment up to 3 years, and immediate expulsion."
  }
};

const SYSTEM_PROMPT = `
You are Campus Connect, the authoritative AI-Powered University Student Support Portal for Presidency University, Bengaluru.
You have been trained on the official Presidency University Student Handbook 2025-26 and the Academic Calendar 2026-27.

CONVERSATIONAL GREETINGS & IDENTITY:
- Handle greetings (Hi, Hello, Hey, Good morning, etc.) warmly with a student-friendly tone.
- Answer identity ("Who are you?") introducing Campus Connect, the official Presidency University AI Helpdesk Assistant.
- Answer capabilities ("What can you do?") explaining your complete coverage of university academics, fees, hostel, exams, calendar, library, administration, and campus life.

AUTHORITATIVE UNIVERSITY KNOWLEDGE (Official Handbook & Academic Calendar):
1. UNIVERSITY FEE POLICY:
   - Annual fee charged in advance (not semester-based).
   - Payable in TWO instalments: 1st instalment in June, 2nd instalment in November.
   - Modes: Cash, Bank Demand Draft, Net Banking, Credit/Debit card. CHECKS ARE NOT ACCEPTED.
   - Late fee: Failure to pay on time results in disqualification from registering for the term and loss of academic term.
   - Refund Matrix (UGC Guidelines):
     * 100% refund: 15 days or more before formally notified last date of admission.
     * 90% refund: Less than 15 days before last date.
     * 80% refund: 15 days or less after last date.
     * 50% refund: 30 days or less but not more than 15 days after last date.
     * 0% refund (only caution deposit): More than 30 days after commencement.
     * Processing fee: Up to 5% of value, max Rs. 5,000. Refund paid via NEFT to parent's bank within 30 calendar days.
     * Subsequent years withdrawal: If submitted before 15th July, advance fee refunded minus Rs. 5,000. If after 15th July, no refund of advance fee.

2. HOSTEL & HOUSING:
   - Separate hostels for boys and girls, affordable mess, first-come-first-serve basis.
   - ATTENDANCE MANDATE: Hostellers must maintain a minimum 75% attendance in all courses. If attendance falls below 75%, hostel facility is withdrawn for the next semester.
   - Mandatory local guardian contact. Summer term hostel available upon application and summer hostel fee.
   - Contacts: Dr. Syed Shoukath Ali (Director Student Housing, 8050643902, shoukathali@presidencyuniversity.in), Ms. Zareena Ali (Girls Hostel Residence Officer, 9148572609, zareena.ali@presidencyuniversity.in).

3. EXAMINATIONS & ACADEMIC CALENDAR 2026-27:
   - Odd Semester Mid-Term Exams: 5th October 2026 (Monday) to 9th October 2026 (Friday).
   - Odd Semester End-Term Exams: 7th December 2026 (Monday) to 30th December 2026 (Wednesday).
   - Odd Semester Results: 25th January 2027 (Monday).
   - Odd Semester Make-Up Exams: 8th February 2027 to 19th February 2027 (Results on 1st March 2027).
   - Even Semester Classes Commence: 18th January 2027.
   - Even Semester Mid-Term Exams: 15th March 2027 to 19th March 2027.
   - Even Semester End-Term Exams: 24th May 2027 to 12th June 2027.
   - Exam Grievance: Submit form or email examredressal@presidencyuniversity.in.

4. ATTENDANCE NORMS:
   - Minimum 75% attendance in all registered courses is mandatory for exam eligibility, placement drive participation, and hostel accommodation retention.

5. PLACEMENTS:
   - Managed by the Placement Department. Minimum 75% attendance required. Record package: 15.5 LPA (Product Company, Batch 2023-27).

6. LIBRARY (LKRC):
   - Over 60,700 books, 15 databases, KOHA LMS, Web OPAC, Knimbus remote access.
   - Borrowing: 15 days per book.
   - Overdue charges: Rs. 5/book/day for first 10 days; Rs. 10/book/day from 11th day onward.
   - Lost book: 3x price (if before due date), 3x price + overdue (if after due date), 5x price if rare.
   - Working hours: Mon-Sat 8:30 AM to 6:30 PM (extended to 8:00 PM during End-Term exams).

7. ADMINISTRATION & CERTIFICATES:
   - Bonafide Certificate: Issued within 1 working day from the Registrar's Office.
   - Academic Transcripts: Issued within 2 weeks by the Examination Department.
   - Duplicate Certificates: Issued in 2 weeks (requires police FIR, non-traceable certificate, affidavit, and fee).
   - Student Grievances: Email studentgrievance@presidencyuniversity.in (resolved within 1 week, appeal to Ombudsperson within 15 days).

8. EVENTS & FESTS 2026-27:
   - Freshers Day (AARAMBH): 29th August 2026.
   - Cultural Carnival (Kal-Utsav): 26th September 2026.
   - Presidency Premier League (PPL Sports): 21st October to 25th November 2026.
   - UDAAN Sports Fest: 16th to 19th February 2027.
   - Ethnic Day: 27th February 2027.
   - Euphoria Cultural Fest: 24th April 2027.

9. CAMPUS FACILITIES & SAFETY:
   - Health Care Centre: In-house clinic open 7 days a week, ambulance on campus.
   - Transport: Annual fee, non-refundable, non-transferable bus pass.
   - Free Counselling: namratha.j@presidencyuniversity.in, shivani.mukund@presidencyuniversity.in, YourDOST partnership.
   - Anti-Ragging: Zero tolerance, FIR, fine up to Rs. 2,50,000, 3 years jail, immediate expulsion.

CRITICAL INSTRUCTIONS:
- Answer accurately and authoritatively using the official handbook and calendar facts above.
- Maintain a polite, supportive, and student-friendly tone.
- Output JSON format:
  {
    "response": "Detailed, friendly, grounded answer",
    "category": "academics|attendance|examinations|placements|library|hostel|administration|events|conversational|unknown",
    "confidence": "high"|"medium"|"low",
    "isAvailableInKB": true|false,
    "suggestedFollowUps": ["Question 1", "Question 2"]
  }
`;

module.exports = {
  KNOWLEDGE_BASE,
  HANDBOOK_DETAILS,
  SYSTEM_PROMPT
};
