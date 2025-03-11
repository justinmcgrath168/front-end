// components/appointments/appointment-status-cards.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  CalendarPlus,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateMockAppointments } from "@/lib/appointment-mock-data";
import { isToday, isTomorrow, isThisWeek, parseISO } from "date-fns";

interface StatusCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  onClick?: () => void;
}

// Status Card Component
const StatusCard = ({
  title,
  count,
  icon,
  bgColor,
  onClick,
}: StatusCardProps) => (
  <Card
    className="cursor-pointer hover:shadow-md transition-shadow"
    onClick={onClick}
  >
    <CardContent className="p-6 flex items-center space-x-4">
      <div
        className={`${bgColor} h-12 w-12 rounded-full flex items-center justify-center shrink-0`}
      >
        {icon}
      </div>
      <div className="space-y-1 flex-1">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">{count}</p>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function AppointmentStatusCards() {
  const [statusCounts, setStatusCounts] = useState({
    scheduled: 0,
    today: 0,
    upcoming: 0,
    completed: 0,
    canceled: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch and count appointments (simulated)
  useEffect(() => {
    const fetchAndCountAppointments = async () => {
      setIsLoading(true);

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Generate mock data
        const appointments = generateMockAppointments(35);

        // Count by status
        const scheduled = appointments.filter(
          (a) => a.status === "Scheduled" || a.status === "Confirmed"
        ).length;
        const completed = appointments.filter(
          (a) => a.status === "Completed"
        ).length;
        const canceled = appointments.filter(
          (a) => a.status === "Canceled" || a.status === "No-Show"
        ).length;

        // Count today's appointments
        const todayAppointments = appointments.filter(
          (a) =>
            isToday(parseISO(a.startTime.toString())) &&
            a.status !== "Canceled" &&
            a.status !== "Completed"
        ).length;

        // Count upcoming (this week but not today)
        const upcomingAppointments = appointments.filter(
          (a) =>
            (isThisWeek(parseISO(a.startTime.toString())) ||
              isTomorrow(parseISO(a.startTime.toString()))) &&
            !isToday(parseISO(a.startTime.toString())) &&
            a.status !== "Canceled" &&
            a.status !== "Completed"
        ).length;

        setStatusCounts({
          scheduled,
          today: todayAppointments,
          upcoming: upcomingAppointments,
          completed,
          canceled,
        });
      } catch (error) {
        console.error("Error fetching appointment counts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndCountAppointments();
  }, []);

  // Apply filter handler
  const applyFilter = (filter: string) => {
    // This would be implemented to set the filter in the parent component
    console.log(`Filter by: ${filter}`);
    // Could navigate to filtered view using Next.js router
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {isLoading ? (
        // Loading placeholders
        [...Array(5)].map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-muted animate-pulse"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                <div className="h-6 w-8 bg-muted rounded animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <>
          {/* Today's Appointments Card */}
          <StatusCard
            title="Today"
            count={statusCounts.today}
            icon={<Clock className="h-6 w-6 text-blue-600" />}
            color="text-blue-600"
            bgColor="bg-blue-100 dark:bg-blue-900/30"
            onClick={() => applyFilter("today")}
          />

          {/* Upcoming Appointments Card */}
          <StatusCard
            title="Upcoming"
            count={statusCounts.upcoming}
            icon={<Calendar className="h-6 w-6 text-purple-600" />}
            color="text-purple-600"
            bgColor="bg-purple-100 dark:bg-purple-900/30"
            onClick={() => applyFilter("upcoming")}
          />

          {/* Scheduled Appointments Card */}
          <StatusCard
            title="Scheduled"
            count={statusCounts.scheduled}
            icon={<CalendarPlus className="h-6 w-6 text-green-600" />}
            color="text-green-600"
            bgColor="bg-green-100 dark:bg-green-900/30"
            onClick={() => applyFilter("scheduled")}
          />

          {/* Completed Appointments Card */}
          <StatusCard
            title="Completed"
            count={statusCounts.completed}
            icon={<CheckCircle2 className="h-6 w-6 text-teal-600" />}
            color="text-teal-600"
            bgColor="bg-teal-100 dark:bg-teal-900/30"
            onClick={() => applyFilter("completed")}
          />

          {/* Canceled Appointments Card */}
          <StatusCard
            title="Canceled"
            count={statusCounts.canceled}
            icon={<XCircle className="h-6 w-6 text-red-600" />}
            color="text-red-600"
            bgColor="bg-red-100 dark:bg-red-900/30"
            onClick={() => applyFilter("canceled")}
          />
        </>
      )}
    </div>
  );
}
