// components/dashboard/appointments-calendar.tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar, Clock, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Define the appointment type
interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  time: string;
  duration: number; // in minutes
  type: "Checkup" | "Cleaning" | "Surgery" | "Consultation" | "Emergency";
  status: "Scheduled" | "Confirmed" | "InProgress" | "Completed" | "Canceled";
}

const getTodaysAppointments = (): Appointment[] => {
  // In a real app, this would be fetched from your API
  return [
    {
      id: "apt-001",
      patientName: "Sarah Johnson",
      patientId: "pat-123",
      time: "09:00 AM",
      duration: 30,
      type: "Checkup",
      status: "Confirmed",
    },
    {
      id: "apt-002",
      patientName: "Michael Chen",
      patientId: "pat-456",
      time: "10:15 AM",
      duration: 60,
      type: "Cleaning",
      status: "InProgress",
    },
    {
      id: "apt-003",
      patientName: "Emma Rodriguez",
      patientId: "pat-789",
      time: "11:30 AM",
      duration: 45,
      type: "Consultation",
      status: "Scheduled",
    },
    {
      id: "apt-004",
      patientName: "David Kim",
      patientId: "pat-101",
      time: "01:00 PM",
      duration: 90,
      type: "Surgery",
      status: "Scheduled",
    },
    {
      id: "apt-005",
      patientName: "Lisa Patel",
      patientId: "pat-112",
      time: "03:00 PM",
      duration: 30,
      type: "Checkup",
      status: "Scheduled",
    },
  ];
};

// Get appointment status badge color
const getStatusBadge = (status: Appointment["status"]) => {
  const statusStyles = {
    Scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    Confirmed:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    InProgress:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Completed: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    Canceled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  return statusStyles[status] || "";
};

// Get appointment type badge color
const getTypeBadge = (type: Appointment["type"]) => {
  const typeStyles = {
    Checkup:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    Cleaning:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Surgery: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    Consultation:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    Emergency:
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  };

  return typeStyles[type] || "";
};

export default function AppointmentsCalendar() {
  const [appointments] = useState<Appointment[]>(getTodaysAppointments());
  const today = new Date();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{format(today, "EEEE, MMMM d, yyyy")}</span>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/appointments">View All</Link>
        </Button>
      </div>

      <ScrollArea className="h-[300px]">
        <div className="space-y-2">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex flex-col space-y-2 p-3 rounded-md border hover:bg-muted/50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="font-medium">{appointment.time}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({appointment.duration} mins)
                  </span>
                </div>
                <Badge className={getStatusBadge(appointment.status)}>
                  {appointment.status}
                </Badge>
              </div>

              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <Link
                  href={`/dashboard/patients/${appointment.patientId}`}
                  className="font-medium hover:underline"
                >
                  {appointment.patientName}
                </Link>
              </div>

              <div className="flex items-center justify-between">
                <Badge className={getTypeBadge(appointment.type)}>
                  {appointment.type}
                </Badge>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/appointments/${appointment.id}`}>
                    Details
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
