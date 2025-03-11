// src/lib/types/appointment.ts

export type AppointmentStatus =
  | "registered" // Initial state when appointment is created
  | "confirmed" // Appointment has been confirmed
  | "checked-in" // Patient has arrived at the clinic
  | "in-progress" // Treatment is ongoing
  | "finished" // Treatment is completed
  | "cancelled" // Appointment was cancelled
  | "no-show" // Patient didn't show up
  | "waitlist"; // Patient is waiting for payment or other prerequisites

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  dentistId: string;
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
  type: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Dentist {
  id: string;
  name: string;
  specialty: string;
  avatar?: string;
  availability?: {
    dayOfWeek: number; // 0-6 where 0 is Sunday
    startTime: string; // HH:MM format
    endTime: string; // HH:MM format
  }[];
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  birthDate?: Date;
  address?: string;
  medicalHistory?: {
    allergies: string[];
    conditions: string[];
    medications: string[];
  };
}

export interface TreatmentType {
  id: string;
  name: string;
  duration: number; // in minutes
  price?: number;
  description?: string;
  category?: string;
}

export interface Schedule {
  id: string;
  dentistId: string;
  date: Date;
  isAvailable: boolean;
  slots?: {
    startTime: string;
    endTime: string;
    isBooked: boolean;
  }[];
}
