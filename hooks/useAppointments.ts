// src/hooks/useAppointments.ts
"use client";

import { useState, useEffect } from "react";
import { format, isSameDay } from "date-fns";
import { Appointment, Dentist, AppointmentStatus } from "@/types/appointment";

// Mock data for demonstration purposes
// In a real application, this would be fetched from an API
const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientId: "p1",
    patientName: "Rifli Jahudin",
    dentistId: "1",
    startTime: new Date("2022-05-16T09:00:00"),
    endTime: new Date("2022-05-16T10:00:00"),
    status: "finished",
    type: "General Checkup",
  },
  {
    id: "2",
    patientId: "p2",
    patientName: "Sekar Nandita",
    dentistId: "1",
    startTime: new Date("2022-05-16T10:00:00"),
    endTime: new Date("2022-05-16T11:00:00"),
    status: "finished",
    type: "Scaling",
  },
  {
    id: "3",
    patientId: "p3",
    patientName: "Angkasa Pura",
    dentistId: "2",
    startTime: new Date("2022-05-16T11:00:00"),
    endTime: new Date("2022-05-16T12:00:00"),
    status: "finished",
    type: "Bleaching",
  },
  // Add more mock appointments as needed
];

const mockDentists: Dentist[] = [
  {
    id: "1",
    name: "Dr. Soap Mactavish",
    specialty: "General Dentistry",
    avatar: "/avatars/dentist1.png",
  },
  {
    id: "2",
    name: "Dr. Cipeng",
    specialty: "Orthodontics",
    avatar: "/avatars/dentist2.png",
  },
  {
    id: "3",
    name: "Dr. Putri Larasati",
    specialty: "Pedodontics",
    avatar: "/avatars/dentist3.png",
  },
];

interface UseAppointmentsProps {
  date?: Date;
  dentistId?: string;
  status?: AppointmentStatus;
  patientId?: string;
}

export function useAppointments({
  date,
  dentistId,
  status,
  patientId,
}: UseAppointmentsProps = {}) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/appointments?date=${date}...');
        // const data = await response.json();

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Filter appointments based on provided filters
        let filteredAppointments = [...mockAppointments];

        if (date) {
          filteredAppointments = filteredAppointments.filter((apt) =>
            isSameDay(apt.startTime, date)
          );
        }

        if (dentistId) {
          filteredAppointments = filteredAppointments.filter(
            (apt) => apt.dentistId === dentistId
          );
        }

        if (status) {
          filteredAppointments = filteredAppointments.filter(
            (apt) => apt.status === status
          );
        }

        if (patientId) {
          filteredAppointments = filteredAppointments.filter(
            (apt) => apt.patientId === patientId
          );
        }

        setAppointments(filteredAppointments);
        setDentists(mockDentists);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [date, dentistId, status, patientId]);

  // Function to create a new appointment
  const createAppointment = async (
    appointmentData: Omit<Appointment, "id">
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/appointments', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(appointmentData),
      // });
      // const data = await response.json();

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newAppointment: Appointment = {
        id: `new-${Date.now()}`,
        ...appointmentData,
      };

      setAppointments((prev) => [...prev, newAppointment]);
      return newAppointment;
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to create appointment")
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update an existing appointment
  const updateAppointment = async (
    id: string,
    appointmentData: Partial<Appointment>
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/appointments/${id}`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(appointmentData),
      // });
      // const data = await response.json();

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === id ? { ...apt, ...appointmentData } : apt
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to update appointment")
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to delete an appointment
  const deleteAppointment = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      // await fetch(`/api/appointments/${id}`, {
      //   method: 'DELETE',
      // });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setAppointments((prev) => prev.filter((apt) => apt.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to delete appointment")
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    appointments,
    dentists,
    isLoading,
    error,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  };
}
