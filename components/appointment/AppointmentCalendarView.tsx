// components/appointments/appointment-calendar-view.tsx
"use client";

import { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  parseISO,
  isBefore,
  formatISO,
} from "date-fns";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  PlusCircle,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { generateCalendarAppointments } from "@/lib/appointment-mock-data";
import { Card } from "@/components/ui/card";

interface AppointmentCalendarViewProps {
  filter: {
    status: string;
    dentist: string;
    date: string;
    search: string;
  };
}

export default function AppointmentCalendarView({
  filter,
}: AppointmentCalendarViewProps) {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dayAppointments, setDayAppointments] = useState<any[]>([]);

  // Fetch appointments (simulated)
  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Generate mock data
        const data = generateCalendarAppointments();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Filter appointments for the selected day
  useEffect(() => {
    if (selectedDate && appointments.length > 0) {
      const filtered = appointments.filter((appointment) =>
        isSameDay(parseISO(appointment.startTime.toString()), selectedDate)
      );

      // Sort by time
      filtered.sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );

      setDayAppointments(filtered);
    } else {
      setDayAppointments([]);
    }
  }, [selectedDate, appointments]);

  // Apply filters
  useEffect(() => {
    if (filter.date === "today") {
      setSelectedDate(new Date());
      setCurrentMonth(new Date());
    } else if (filter.date === "tomorrow") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setSelectedDate(tomorrow);
      setCurrentMonth(tomorrow);
    } else if (filter.date === "this-week") {
      setSelectedDate(new Date());
      setCurrentMonth(new Date());
    } else if (filter.date === "next-week") {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      setSelectedDate(nextWeek);
      setCurrentMonth(nextWeek);
    }
  }, [filter.date]);

  // Get days in current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Go to today
  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };

  // Navigate to new appointment page for selected date
  const createAppointment = (date: Date) => {
    const dateStr = formatISO(date, { representation: "date" });
    router.push(`/dashboard/appointments/new?date=${dateStr}`);
  };

  // Get appointment count for a specific day
  const getAppointmentsForDay = (day: Date) => {
    return appointments.filter((appointment) =>
      isSameDay(parseISO(appointment.startTime.toString()), day)
    );
  };

  // Get appointment status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "In Progress":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "Canceled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "No-Show":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>

          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {/* Calendar Grid */}
          <div className="md:col-span-5 border rounded-md overflow-hidden">
            <div className="grid grid-cols-7 text-center bg-muted py-2 border-b">
              <div className="text-sm font-medium">Sun</div>
              <div className="text-sm font-medium">Mon</div>
              <div className="text-sm font-medium">Tue</div>
              <div className="text-sm font-medium">Wed</div>
              <div className="text-sm font-medium">Thu</div>
              <div className="text-sm font-medium">Fri</div>
              <div className="text-sm font-medium">Sat</div>
            </div>

            <div className="grid grid-cols-7 grid-rows-6 h-full">
              {Array.from({ length: 42 }).map((_, index) => {
                // Calculate the day to display
                const firstDayOfMonth = startOfMonth(currentMonth);
                const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday

                const dayOffset = index - firstDayOfWeek;
                const day = new Date(firstDayOfMonth);
                day.setDate(firstDayOfMonth.getDate() + dayOffset);

                // Check if day is in current month
                const isCurrentMonth = isSameMonth(day, currentMonth);

                // Get appointments for this day
                const dayAppointments = getAppointmentsForDay(day);

                // Is this day selected?
                const isSelected = selectedDate
                  ? isSameDay(day, selectedDate)
                  : false;

                // Is this day today?
                const isCurrentDay = isToday(day);

                // Is this day in the past?
                const isPast = isBefore(day, new Date()) && !isCurrentDay;

                return (
                  <div
                    key={index}
                    className={cn(
                      "p-2 border flex flex-col min-h-[100px]",
                      isCurrentMonth
                        ? "bg-background"
                        : "bg-muted/20 text-muted-foreground",
                      isSelected
                        ? "bg-muted/30 ring-2 ring-primary ring-inset"
                        : "",
                      isCurrentDay ? "font-bold" : "",
                      (index + 1) % 7 === 0 || index % 7 === 0
                        ? "bg-muted/10"
                        : "" // Weekend styling
                    )}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className="flex justify-between items-start">
                      <span
                        className={cn(
                          "h-6 w-6 text-sm flex items-center justify-center rounded-full",
                          isCurrentDay
                            ? "bg-primary text-primary-foreground"
                            : ""
                        )}
                      >
                        {format(day, "d")}
                      </span>

                      {isCurrentMonth && dayAppointments.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {dayAppointments.length}
                        </Badge>
                      )}
                    </div>

                    {isCurrentMonth && dayAppointments.length > 0 && (
                      <div className="mt-1 space-y-1 overflow-hidden">
                        {dayAppointments.slice(0, 3).map((appointment, i) => (
                          <TooltipProvider key={i}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className={cn(
                                    "text-xs p-1 rounded-sm truncate cursor-pointer",
                                    getStatusColor(appointment.status)
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(
                                      `/dashboard/appointments/${appointment.id}`
                                    );
                                  }}
                                >
                                  {format(
                                    parseISO(appointment.startTime.toString()),
                                    "h:mm a"
                                  )}{" "}
                                  - {appointment.type}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="space-y-1">
                                  <p className="font-medium">
                                    {appointment.type}
                                  </p>
                                  <p className="text-xs">
                                    {format(
                                      parseISO(
                                        appointment.startTime.toString()
                                      ),
                                      "h:mm a"
                                    )}{" "}
                                    -{" "}
                                    {format(
                                      parseISO(appointment.endTime.toString()),
                                      "h:mm a"
                                    )}
                                  </p>
                                  <p className="text-xs">
                                    Patient: {appointment.patient.name}
                                  </p>
                                  <p className="text-xs">
                                    Dentist: {appointment.dentist.name}
                                  </p>
                                  <p className="text-xs font-medium">
                                    Status: {appointment.status}
                                  </p>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}

                        {dayAppointments.length > 3 && (
                          <div className="text-xs text-muted-foreground text-center">
                            +{dayAppointments.length - 3} more
                          </div>
                        )}
                      </div>
                    )}

                    {isCurrentMonth &&
                      dayAppointments.length === 0 &&
                      !isPast && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-auto mx-auto p-1 h-auto text-xs text-muted-foreground opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            createAppointment(day);
                          }}
                        >
                          <PlusCircle className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Day Appointments */}
          <Card className="md:col-span-2 h-full">
            <div className="p-4 border-b">
              <h3 className="font-medium">
                {selectedDate ? (
                  <>
                    Appointments for {format(selectedDate, "MMMM d, yyyy")}
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({dayAppointments.length}{" "}
                      {dayAppointments.length === 1
                        ? "appointment"
                        : "appointments"}
                      )
                    </span>
                  </>
                ) : (
                  "Select a date to view appointments"
                )}
              </h3>
            </div>

            {selectedDate && (
              <>
                <ScrollArea className="h-[calc(100vh-15rem)] p-4">
                  {dayAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {dayAppointments.map((appointment, index) => (
                        <div
                          key={index}
                          className="p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() =>
                            router.push(
                              `/dashboard/appointments/${appointment.id}`
                            )
                          }
                        >
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm font-medium">
                                  {format(
                                    parseISO(appointment.startTime.toString()),
                                    "h:mm a"
                                  )}{" "}
                                  -{" "}
                                  {format(
                                    parseISO(appointment.endTime.toString()),
                                    "h:mm a"
                                  )}
                                </span>
                              </div>
                              <div className="font-medium">
                                {appointment.type}
                              </div>
                            </div>
                            <Badge
                              className={getStatusColor(appointment.status)}
                            >
                              {appointment.status}
                            </Badge>
                          </div>

                          <div className="mt-2 pt-2 border-t">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={appointment.patient.avatar} />
                                <AvatarFallback>
                                  {getInitials(appointment.patient.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                  {appointment.patient.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  Patient
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={appointment.dentist.avatar} />
                                <AvatarFallback>
                                  {getInitials(appointment.dentist.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                  {appointment.dentist.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {appointment.dentist.specialty}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <Calendar className="h-10 w-10 text-muted-foreground mb-3" />
                      <h3 className="font-medium text-lg">No Appointments</h3>
                      <p className="text-muted-foreground mb-4">
                        There are no appointments scheduled for this day.
                      </p>
                      <Button onClick={() => createAppointment(selectedDate)}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        New Appointment
                      </Button>
                    </div>
                  )}
                </ScrollArea>

                {dayAppointments.length > 0 && (
                  <div className="p-4 border-t">
                    <Button
                      className="w-full"
                      onClick={() => createAppointment(selectedDate)}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      New Appointment
                    </Button>
                  </div>
                )}
              </>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
