// src/components/appointments/AppointmentCalendar.tsx
"use client";

import { useState, useEffect } from "react";
import { format, addDays, subDays } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DentistColumn from "./DentistColumn";
// import CalendarHeader from "./CalendarHeader";
import { Dentist, Appointment } from "@/types/appointment";

// Mock data for demo purposes
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
  {
    id: "4",
    patientId: "p4",
    patientName: "Lembayung Senja",
    dentistId: "1",
    startTime: new Date("2022-05-16T12:00:00"),
    endTime: new Date("2022-05-16T13:00:00"),
    status: "in-progress",
    type: "Extraction",
  },
  {
    id: "5",
    patientId: "p5",
    patientName: "Daniswara",
    dentistId: "1",
    startTime: new Date("2022-05-16T14:30:00"),
    endTime: new Date("2022-05-16T15:30:00"),
    status: "registered",
    type: "General Checkup",
  },
];

interface AppointmentCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function AppointmentCalendar({
  selectedDate,
  onDateChange,
}: AppointmentCalendarProps) {
  const [dentists, setDentists] = useState<Dentist[]>(mockDentists);
  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [selectedDentist, setSelectedDentist] = useState<string>("all");

  useEffect(() => {
    // In a real app, this would fetch appointments from the API
    // based on the selected date and dentist
    const filteredAppointments = mockAppointments.filter(
      (apt) =>
        format(apt.startTime, "yyyy-MM-dd") ===
        format(selectedDate, "yyyy-MM-dd")
    );
    setAppointments(filteredAppointments);
    setTotalAppointments(filteredAppointments.length);
  }, [selectedDate]);

  const handlePreviousDay = () => {
    onDateChange(subDays(selectedDate, 1));
  };

  const handleNextDay = () => {
    onDateChange(addDays(selectedDate, 1));
  };

  const handleTodayClick = () => {
    onDateChange(new Date());
  };

  const displayedDentists =
    selectedDentist === "all"
      ? dentists
      : dentists.filter((d) => d.id === selectedDentist);

  return (
    <Card className="border shadow-sm">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="flex flex-col">
              <div className="text-lg font-semibold">
                {format(selectedDate, "d")}
              </div>
              <div className="text-xs text-muted-foreground">
                Total appointments
              </div>
            </div>
            <div className="text-2xl font-bold">{totalAppointments}</div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleTodayClick}>
              Today
            </Button>

            <div className="flex">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePreviousDay}
                className="rounded-r-none"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNextDay}
                className="rounded-l-none"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="ml-2">
              <span className="text-sm">
                {format(selectedDate, "EEE, d MMM yyyy")}
              </span>
            </div>

            <div className="ml-6 flex items-center space-x-2">
              <span className="text-sm">Day</span>
              <Button variant="outline" size="sm">
                Week
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Select value={selectedDentist} onValueChange={setSelectedDentist}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Dentist" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dentist</SelectItem>
                {dentists.map((dentist) => (
                  <SelectItem key={dentist.id} value={dentist.id}>
                    Dr. {dentist.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-1"
            >
              <span>Filters</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[72px_1fr] overflow-hidden">
        {/* Time column */}
        <div className="border-r">
          <div className="h-16 border-b"></div> {/* Empty cell for header */}
          <div className="relative h-[1400px]">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-full border-b px-2 py-1"
                style={{ top: `${i * 100}px` }}
              >
                <span className="text-xs text-muted-foreground">
                  {i + 8 === 12
                    ? "12pm"
                    : i + 8 < 12
                    ? `${i + 8}am`
                    : `${i + 8 - 12}pm`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dentist columns */}
        <div className="overflow-x-auto">
          <div className="flex divide-x border-b h-16">
            {displayedDentists.map((dentist) => (
              <div key={dentist.id} className="flex-1 min-w-[300px] p-3">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                    <img
                      src={dentist.avatar || "/placeholder-avatar.png"}
                      alt={dentist.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{dentist.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      Today's appointments:{" "}
                      {
                        appointments.filter((a) => a.dentistId === dentist.id)
                          .length
                      }{" "}
                      patient(s)
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex divide-x relative h-[1400px]">
            {displayedDentists.map((dentist) => (
              <DentistColumn
                key={dentist.id}
                dentist={dentist}
                appointments={appointments.filter(
                  (a) => a.dentistId === dentist.id
                )}
                date={selectedDate}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
