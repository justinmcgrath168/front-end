// lib/appointment-mock-data.ts
import {
  addDays,
  addMinutes,
  subDays,
  format,
  startOfDay,
  startOfWeek,
  setHours,
  setMinutes,
} from "date-fns";

// Types
export interface Patient {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  phone: string;
  dob: string;
  lastVisit: string;
  totalVisits: number;
}

export interface Dentist {
  id: string;
  name: string;
  avatar?: string;
  specialty: string;
}

export interface Appointment {
  id: string;
  patient: Patient;
  dentist: Dentist;
  type: string;
  status:
    | "Scheduled"
    | "Confirmed"
    | "In Progress"
    | "Completed"
    | "Canceled"
    | "No-Show";
  startTime: Date;
  endTime: Date;
  duration: number;
  reason?: string;
  notes?: string[];
  room?: string;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}

// Mock patients
const mockPatients: Patient[] = [
  {
    id: "pat-001",
    name: "Sarah Johnson",
    avatar: "",
    email: "sarah.j@example.com",
    phone: "(555) 123-4567",
    dob: "March 15, 1985",
    lastVisit: "February 10, 2025",
    totalVisits: 8,
  },
  {
    id: "pat-002",
    name: "Michael Chen",
    avatar: "",
    email: "michael.c@example.com",
    phone: "(555) 987-6543",
    dob: "July 22, 1978",
    lastVisit: "January 5, 2025",
    totalVisits: 3,
  },
  {
    id: "pat-003",
    name: "Emma Rodriguez",
    avatar: "",
    email: "emma.r@example.com",
    phone: "(555) 456-7890",
    dob: "September 3, 1992",
    lastVisit: "February 28, 2025",
    totalVisits: 5,
  },
  {
    id: "pat-004",
    name: "David Kim",
    avatar: "",
    email: "david.k@example.com",
    phone: "(555) 234-5678",
    dob: "November 12, 1980",
    lastVisit: "December 15, 2024",
    totalVisits: 12,
  },
  {
    id: "pat-005",
    name: "Lisa Patel",
    avatar: "",
    email: "lisa.p@example.com",
    phone: "(555) 876-5432",
    dob: "May 7, 1995",
    lastVisit: "February 20, 2025",
    totalVisits: 2,
  },
];

// Mock dentists
const mockDentists: Dentist[] = [
  {
    id: "den-001",
    name: "Dr. Robert Smith",
    avatar: "",
    specialty: "General Dentistry",
  },
  {
    id: "den-002",
    name: "Dr. Jennifer Lee",
    avatar: "",
    specialty: "Orthodontics",
  },
  {
    id: "den-003",
    name: "Dr. James Wilson",
    avatar: "",
    specialty: "Periodontics",
  },
  {
    id: "den-004",
    name: "Dr. Maria Garcia",
    avatar: "",
    specialty: "Endodontics",
  },
];

// Appointment types
const appointmentTypes = [
  "Regular Checkup",
  "Teeth Cleaning",
  "Dental Filling",
  "Root Canal",
  "Tooth Extraction",
  "Crown Fitting",
  "Consultation",
  "Orthodontic Adjustment",
  "Emergency",
  "Follow-up",
];

// Random appointment durations (in minutes)
const appointmentDurations = [15, 30, 45, 60, 90];

// Random appointment statuses
const appointmentStatuses: Appointment["status"][] = [
  "Scheduled",
  "Confirmed",
  "In Progress",
  "Completed",
  "Canceled",
  "No-Show",
];

// Helper function to get a random item from an array
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Helper function to generate a random ID
const generateRandomId = (prefix: string = "appt"): string => {
  return `${prefix}-${Math.floor(10000 + Math.random() * 90000)}`;
};

// Generate a single mock appointment
export const generateMockAppointment = (id?: string): Appointment => {
  const patient = getRandomItem(mockPatients);
  const dentist = getRandomItem(mockDentists);
  const type = getRandomItem(appointmentTypes);
  const duration = getRandomItem(appointmentDurations);
  const status = getRandomItem(appointmentStatuses);

  // Random date within +/- 30 days from today
  const daysOffset = Math.floor(Math.random() * 60) - 30;
  const startTime = addDays(new Date(), daysOffset);

  // Set to business hours (9 AM - 5 PM)
  const hour = 9 + Math.floor(Math.random() * 8);
  const minute = Math.floor(Math.random() * 4) * 15;

  // Set the hour and minute
  const adjustedStartTime = setHours(setMinutes(startTime, minute), hour);
  const endTime = addMinutes(adjustedStartTime, duration);

  const createdAt = subDays(
    adjustedStartTime,
    Math.floor(Math.random() * 14) + 1
  );

  // Maybe add notes
  const hasNotes = Math.random() > 0.5;
  const notes = hasNotes
    ? [
        `Patient arrived ${Math.random() > 0.5 ? "on time" : "late"}.`,
        `Treatment completed successfully.`,
        `Follow-up recommended in ${Math.floor(Math.random() * 6) + 1} months.`,
      ]
    : [];

  // Generate random reason
  const reasons = [
    "Regular checkup and cleaning",
    "Tooth pain in lower right molar",
    "Follow-up after procedure",
    "Sensitivity to hot and cold",
    "Broken filling",
    "Consultation for cosmetic procedure",
    "Difficulty chewing",
    "Bleeding gums",
    "Jaw pain",
    "New patient examination",
  ];

  return {
    id: id || generateRandomId(),
    patient,
    dentist,
    type,
    status,
    startTime: adjustedStartTime,
    endTime,
    duration,
    reason: Math.random() > 0.3 ? getRandomItem(reasons) : undefined,
    notes: notes,
    room: `Room ${Math.floor(Math.random() * 10) + 1}`,
    createdAt,
    createdBy: "Jane Doe (Receptionist)",
    updatedAt: Math.random() > 0.7 ? new Date() : undefined,
    updatedBy: Math.random() > 0.7 ? "John Smith (Office Manager)" : undefined,
  };
};

// Generate multiple mock appointments
export const generateMockAppointments = (count: number = 20): Appointment[] => {
  return Array.from({ length: count }, (_, i) =>
    generateMockAppointment(`appt-${1000 + i}`)
  );
};

// Generate mock appointments for calendar view (current month)
export const generateCalendarAppointments = (): Appointment[] => {
  const today = new Date();
  // const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const appointments: Appointment[] = [];

  // Generate 1-3 appointments per day for the current month
  for (let day = 1; day <= endOfMonth.getDate(); day++) {
    const date = new Date(today.getFullYear(), today.getMonth(), day);
    const dayOfWeek = date.getDay();

    // Skip weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;

    // Random number of appointments for this day (1-3)
    const numAppointments = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < numAppointments; i++) {
      // Create appointment at different times of the day
      const hour = 9 + i * 3; // 9 AM, 12 PM, 3 PM
      const startTime = setHours(date, hour);

      const appointment = generateMockAppointment();
      appointment.startTime = startTime;
      appointment.endTime = addMinutes(startTime, appointment.duration);
      appointment.id = `appt-${format(date, "yyyyMMdd")}-${i}`;

      appointments.push(appointment);
    }
  }

  return appointments;
};

// Generate weekly schedule for a specific dentist
export const generateDentistSchedule = (
  dentistId: string,
  startDate?: Date
): Appointment[] => {
  const today = startDate || new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Week starts on Monday

  const appointments: Appointment[] = [];
  const dentist =
    mockDentists.find((d) => d.id === dentistId) || mockDentists[0];

  // Generate appointments for each day of the week (Monday to Friday)
  for (let day = 0; day < 5; day++) {
    const date = addDays(weekStart, day);

    // Random number of appointments for this day (3-6)
    const numAppointments = Math.floor(Math.random() * 4) + 3;

    // Start at 9 AM
    let currentTime = setHours(setMinutes(date, 0), 9);

    for (let i = 0; i < numAppointments; i++) {
      const duration = getRandomItem(appointmentDurations);
      const patient = getRandomItem(mockPatients);
      const type = getRandomItem(appointmentTypes);
      const status = getRandomItem(appointmentStatuses);

      // Maybe add a gap between appointments
      if (Math.random() > 0.7 && i > 0) {
        currentTime = addMinutes(currentTime, 15);
      }

      const startTime = currentTime;
      const endTime = addMinutes(startTime, duration);

      // Move to next appointment time
      currentTime = endTime;

      // Don't go past 5 PM
      if (getHours(currentTime) >= 17) break;

      const appointment: Appointment = {
        id: `appt-${dentistId}-${format(date, "yyyyMMdd")}-${i}`,
        patient,
        dentist,
        type,
        status,
        startTime,
        endTime,
        duration,
        room: `Room ${Math.floor(Math.random() * 5) + 1}`,
        createdAt: subDays(startTime, Math.floor(Math.random() * 14) + 1),
        createdBy: "Jane Doe (Receptionist)",
      };

      appointments.push(appointment);
    }
  }

  return appointments;
};

// Get appointments for a specific date
export const getAppointmentsForDate = (date: Date): Appointment[] => {
  const targetDate = startOfDay(date);

  // Generate 3-7 appointments for the day
  const numAppointments = Math.floor(Math.random() * 5) + 3;
  const appointments: Appointment[] = [];

  // Start at 9 AM
  let currentTime = setHours(setMinutes(targetDate, 0), 9);

  for (let i = 0; i < numAppointments; i++) {
    const duration = getRandomItem(appointmentDurations);
    const patient = getRandomItem(mockPatients);
    const dentist = getRandomItem(mockDentists);
    const type = getRandomItem(appointmentTypes);
    const status = getRandomItem(appointmentStatuses);

    // Maybe add a gap between appointments
    if (Math.random() > 0.7 && i > 0) {
      currentTime = addMinutes(currentTime, 15);
    }

    const startTime = currentTime;
    const endTime = addMinutes(startTime, duration);

    // Move to next appointment time
    currentTime = endTime;

    // Don't go past 5 PM
    if (getHours(currentTime) >= 17) break;

    const appointment: Appointment = {
      id: `appt-${format(date, "yyyyMMdd")}-${i}`,
      patient,
      dentist,
      type,
      status,
      startTime,
      endTime,
      duration,
      room: `Room ${Math.floor(Math.random() * 5) + 1}`,
      createdAt: subDays(startTime, Math.floor(Math.random() * 14) + 1),
      createdBy: "Jane Doe (Receptionist)",
    };

    appointments.push(appointment);
  }

  return appointments;
};

// Helper function to get hours as number
function getHours(date: Date): number {
  return date.getHours();
}
