// app/(dashboard)/dashboard/appointments/page.tsx
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentCalendarView from "@/components/appointment/AppointmentCalendarView";
import AppointmentListView from "@/components/appointment/AppointmentListView";
import AppointmentFilters from "@/components/appointment/AppointmentFilters";
import AppointmentStatusCards from "@/components/appointment/AppointmentStatusCard";
import AppointmentToolbar from "@/components/appointment/AppointmentToolbar";
import { CalendarCheck, List } from "lucide-react";

export default function AppointmentsPage() {
  const [activeFilter, setActiveFilter] = useState({
    status: "all",
    dentist: "all",
    date: "all",
    search: "",
  });

  const handleFilterChange = (newFilter: Partial<typeof activeFilter>) => {
    setActiveFilter((prev) => ({ ...prev, ...newFilter }));
  };

  return (
    <div className="space-y-6">
      {/* Status Cards */}
      <AppointmentStatusCards />

      {/* Toolbar & Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <AppointmentToolbar />
        <AppointmentFilters
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Calendar/List View Tabs */}
      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <CalendarCheck className="h-4 w-4" />
            <span>Calendar</span>
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            <span>List</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <AppointmentCalendarView filter={activeFilter} />
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <AppointmentListView filter={activeFilter} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
