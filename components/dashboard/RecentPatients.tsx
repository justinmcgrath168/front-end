// components/dashboard/recent-patients.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, CalendarClock, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format, formatDistanceToNow } from "date-fns";

// Define patient type
interface Patient {
  id: string;
  name: string;
  image?: string;
  email: string;
  phone: string;
  lastVisit: Date;
  nextAppointment?: {
    date: Date;
    type: string;
  };
  status: "New" | "Regular" | "Returning";
}

const getRecentPatients = (): Patient[] => {
  // In a real app, this would be fetched from your API
  return [
    {
      id: "pat-123",
      name: "Sarah Johnson",
      image: "",
      email: "sarah.j@example.com",
      phone: "(555) 123-4567",
      lastVisit: new Date(2025, 2, 2), // March 2, 2025
      nextAppointment: {
        date: new Date(2025, 3, 15), // April 15, 2025
        type: "Checkup",
      },
      status: "Regular",
    },
    {
      id: "pat-456",
      name: "Michael Chen",
      email: "michael.c@example.com",
      phone: "(555) 987-6543",
      lastVisit: new Date(2025, 2, 3), // March 3, 2025
      status: "New",
    },
    {
      id: "pat-789",
      name: "Emma Rodriguez",
      email: "emma.r@example.com",
      phone: "(555) 456-7890",
      lastVisit: new Date(2025, 2, 3), // March 3, 2025
      nextAppointment: {
        date: new Date(2025, 2, 17), // March 17, 2025
        type: "Cleaning",
      },
      status: "Regular",
    },
    {
      id: "pat-101",
      name: "David Kim",
      email: "david.k@example.com",
      phone: "(555) 234-5678",
      lastVisit: new Date(2024, 11, 15), // December 15, 2024
      nextAppointment: {
        date: new Date(2025, 2, 4), // March 4, 2025
        type: "Surgery",
      },
      status: "Returning",
    },
    {
      id: "pat-112",
      name: "Lisa Patel",
      email: "lisa.p@example.com",
      phone: "(555) 876-5432",
      lastVisit: new Date(2025, 2, 3), // March 3, 2025
      status: "New",
    },
  ];
};

// Get initials for avatar
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

// Get status badge style
const getStatusBadge = (status: Patient["status"]) => {
  const styles = {
    New: "text-sm px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    Regular:
      "text-sm px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Returning:
      "text-sm px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  };

  return styles[status];
};

export default function RecentPatients() {
  const [patients] = useState<Patient[]>(getRecentPatients());

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          Showing {patients.length} recent patients
        </span>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/patients">View All</Link>
        </Button>
      </div>

      <ScrollArea className="h-[300px]">
        <div className="space-y-3">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="flex flex-col space-y-2 p-3 rounded-md border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={patient.image} alt={patient.name} />
                    <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link
                      href={`/dashboard/patients/${patient.id}`}
                      className="font-medium hover:underline"
                    >
                      {patient.name}
                    </Link>
                    <div className="flex text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>
                        Last visit:{" "}
                        {formatDistanceToNow(patient.lastVisit, {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <span className={getStatusBadge(patient.status)}>
                  {patient.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1 text-xs">
                <div className="flex items-center">
                  <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span className="truncate">{patient.email}</span>
                </div>
              </div>

              {patient.nextAppointment && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarClock className="h-3 w-3 mr-1" />
                  <span>
                    Next: {format(patient.nextAppointment.date, "MMM d, yyyy")}(
                    {patient.nextAppointment.type})
                  </span>
                </div>
              )}

              <div className="flex justify-end pt-1">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/patients/${patient.id}`}>
                    View Details
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
