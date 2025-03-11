// src/components/appointments/DentistColumn.tsx
"use client";

import { useRouter } from "next/navigation";
import { format, isSameDay } from "date-fns";
import { Dentist, Appointment } from "@/types/appointment";
import AppointmentCard from "./AppointmentCard";

interface DentistColumnProps {
  dentist: Dentist;
  appointments: Appointment[];
  date: Date;
}

export default function DentistColumn({
  dentist,
  appointments,
  date,
}: DentistColumnProps) {
  const router = useRouter();

  // Filter appointments for the current date
  const todayAppointments = appointments.filter((apt) =>
    isSameDay(apt.startTime, date)
  );

  const handleAppointmentClick = (appointmentId: string) => {
    router.push(`/appointments/${appointmentId}`);
  };

  // Function to determine position and height based on time
  const getAppointmentStyle = (start: Date, end: Date) => {
    const dayStart = 8; // 8am
    const hourHeight = 100; // height for 1 hour in pixels

    const startHour = start.getHours() + start.getMinutes() / 60;
    const endHour = end.getHours() + end.getMinutes() / 60;

    const top = (startHour - dayStart) * hourHeight;
    const height = (endHour - startHour) * hourHeight;

    return {
      top: `${top}px`,
      height: `${height}px`,
    };
  };

  // Show unavailable block if no appointments
  const hasAppointments = todayAppointments.length > 0;

  // Hours in the day for the schedule
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8am to 7pm

  return (
    <div className="flex-1 min-w-[300px] relative">
      {/* Background grid lines for hours */}
      {hours.map((hour) => (
        <div
          key={hour}
          className="absolute border-b border-gray-100 w-full"
          style={{ top: `${(hour - 8) * 100}px`, height: "1px" }}
        ></div>
      ))}

      {/* Lunch/Break time indicator */}
      <div
        className="absolute w-full bg-gray-50 z-0 flex items-center justify-center text-xs text-gray-500"
        style={{ top: "500px", height: "50px" }}
      >
        <span>BREAK TIME</span>
      </div>

      {/* Appointments */}
      {hasAppointments ? (
        todayAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="absolute w-full px-2"
            style={getAppointmentStyle(
              appointment.startTime,
              appointment.endTime
            )}
            onClick={() => handleAppointmentClick(appointment.id)}
          >
            <AppointmentCard appointment={appointment} />
          </div>
        ))
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 text-gray-500 text-sm">
          NOT AVAILABLE
        </div>
      )}
    </div>
  );
}
