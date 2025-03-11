// src/app/(dashboard)/appointments/page.tsx
"use client";

import { useState } from "react";
import { CalendarDays, List } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AppointmentCalendar from "@/components/appointments/AppointmentCalendar";
import AppointmentsList from "@/components/appointments/AppointmentList";

export default function AppointmentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "calendar";
  const dateParam = searchParams.get("date");
  const [selectedDate, setSelectedDate] = useState<Date>(
    dateParam ? new Date(dateParam) : new Date()
  );

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const params = new URLSearchParams(searchParams);
    params.set("date", date.toISOString().split("T")[0]);
    router.push(`/appointments?${params.toString()}`);
  };

  const handleViewChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("view", value);
    router.push(`/appointments?${params.toString()}`);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reservations</h1>
        <Button onClick={() => router.push("/appointments/new")}>
          New Appointment
        </Button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue={view} onValueChange={handleViewChange}>
          <TabsList>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              List
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="text-sm text-muted-foreground">
          {format(selectedDate, "EEEE, MMMM do yyyy")}
        </div>
      </div>

      {view === "calendar" ? (
        <AppointmentCalendar
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
      ) : (
        <AppointmentsList
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
      )}
    </div>
  );
}
