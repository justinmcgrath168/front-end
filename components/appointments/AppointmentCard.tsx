// src/components/appointments/AppointmentCard.tsx
"use client";

import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Appointment } from "@/types/appointment";

interface AppointmentCardProps {
  appointment: Appointment;
}

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  // Determine card styling based on appointment status
  const getCardStyles = () => {
    switch (appointment.status) {
      case "finished":
        return "border-l-4 border-l-green-500 bg-green-50";
      case "in-progress":
        return "border-l-4 border-l-yellow-500 bg-yellow-50";
      case "registered":
        return "border-l-4 border-l-blue-500 bg-blue-50";
      case "cancelled":
        return "border-l-4 border-l-red-500 bg-red-50";
      default:
        return "border-l-4 border-l-gray-500 bg-gray-50";
    }
  };

  // Determine status badge styling and label
  const getStatusBadge = () => {
    switch (appointment.status) {
      case "finished":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-200"
          >
            Finished
          </Badge>
        );
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-200"
          >
            Doing Treatment
          </Badge>
        );
      case "registered":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-200"
          >
            Registered
          </Badge>
        );
      case "waitlist":
        return (
          <Badge
            variant="outline"
            className="bg-orange-100 text-orange-800 border-orange-200"
          >
            Waiting Payment
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`rounded-md border shadow-sm p-2 cursor-pointer transition-all hover:shadow-md ${getCardStyles()}`}
    >
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-medium text-sm">{appointment.patientName}</h4>
        {getStatusBadge()}
      </div>

      <div className="text-xs text-muted-foreground mb-1">
        {format(appointment.startTime, "hh:mm a")} -{" "}
        {format(appointment.endTime, "hh:mm a")}
      </div>

      <div className="text-xs rounded bg-gray-100 p-1 inline-block">
        {appointment.type}
      </div>
    </div>
  );
}
