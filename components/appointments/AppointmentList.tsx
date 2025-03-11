// src/components/appointments/AppointmentsList.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  CheckCircle,
  Clock,
  Calendar as CalendarIcon,
  MoreHorizontal,
  UserRound,
  AlertCircle,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { DatePicker } from "@/components/ui/date-picker";
import { useAppointments } from "@/hooks/useAppointments";
import { AppointmentStatus } from "@/types/appointment";

interface AppointmentsListProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function AppointmentsList({
  selectedDate,
  onDateChange,
}: AppointmentsListProps) {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "all">(
    "all"
  );

  const { appointments, isLoading, updateAppointment, deleteAppointment } =
    useAppointments({
      date: selectedDate,
    });

  // Status badge component with appropriate styling
  const StatusBadge = ({ status }: { status: AppointmentStatus }) => {
    switch (status) {
      case "registered":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-200 flex items-center gap-1"
          >
            <Clock className="h-3 w-3" />
            Registered
          </Badge>
        );
      case "confirmed":
        return (
          <Badge
            variant="outline"
            className="bg-purple-100 text-purple-800 border-purple-200 flex items-center gap-1"
          >
            <CalendarIcon className="h-3 w-3" />
            Confirmed
          </Badge>
        );
      case "checked-in":
        return (
          <Badge
            variant="outline"
            className="bg-orange-100 text-orange-800 border-orange-200 flex items-center gap-1"
          >
            <UserRound className="h-3 w-3" />
            Checked In
          </Badge>
        );
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-200 flex items-center gap-1"
          >
            <Clock className="h-3 w-3" />
            In Progress
          </Badge>
        );
      case "finished":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1"
          >
            <CheckCircle className="h-3 w-3" />
            Finished
          </Badge>
        );
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 border-red-200 flex items-center gap-1"
          >
            <XCircle className="h-3 w-3" />
            Cancelled
          </Badge>
        );
      case "no-show":
        return (
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-800 border-gray-200 flex items-center gap-1"
          >
            <AlertCircle className="h-3 w-3" />
            No Show
          </Badge>
        );
      case "waitlist":
        return (
          <Badge
            variant="outline"
            className="bg-amber-100 text-amber-800 border-amber-200 flex items-center gap-1"
          >
            <Clock className="h-3 w-3" />
            Waiting
          </Badge>
        );
      default:
        return null;
    }
  };

  // Function to handle status change
  const handleStatusChange = async (
    appointmentId: string,
    newStatus: AppointmentStatus
  ) => {
    try {
      await updateAppointment(appointmentId, { status: newStatus });
    } catch (error) {
      console.error("Failed to update appointment status:", error);
    }
  };

  // Function to handle appointment deletion
  const handleDelete = async (appointmentId: string) => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      try {
        await deleteAppointment(appointmentId);
      } catch (error) {
        console.error("Failed to delete appointment:", error);
      }
    }
  };

  // Filter appointments based on selected status
  const filteredAppointments =
    statusFilter === "all"
      ? appointments
      : appointments.filter(
          (appointment) => appointment.status === statusFilter
        );

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <DatePicker date={selectedDate} onDateChange={onDateChange} />
            <span className="text-sm text-muted-foreground">
              {appointments.length} appointments found
            </span>
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Status: {statusFilter === "all" ? "All" : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("registered")}>
                  Registered
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("confirmed")}>
                  Confirmed
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter("in-progress")}
                >
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("finished")}>
                  Finished
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>
                  Cancelled
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-60">
            <p>Loading appointments...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No appointments found for this date.
            </p>
            <Button
              className="mt-4"
              onClick={() => router.push("/appointments/new")}
            >
              Create New Appointment
            </Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Dentist</TableHead>
                  <TableHead>Treatment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow
                    key={appointment.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() =>
                      router.push(`/appointments/${appointment.id}`)
                    }
                  >
                    <TableCell className="font-medium">
                      {format(appointment.startTime, "h:mm a")} -{" "}
                      {format(appointment.endTime, "h:mm a")}
                    </TableCell>
                    <TableCell>{appointment.patientName}</TableCell>
                    <TableCell>
                      {appointment.dentistId === "1"
                        ? "Dr. Soap Mactavish"
                        : appointment.dentistId === "2"
                        ? "Dr. Cipeng"
                        : "Dr. Putri Larasati"}
                    </TableCell>
                    <TableCell>{appointment.type}</TableCell>
                    <TableCell>
                      <StatusBadge status={appointment.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          asChild
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(
                                `/appointments/${appointment.id}/edit`
                              );
                            }}
                          >
                            Edit
                          </DropdownMenuItem>

                          {appointment.status !== "checked-in" && (
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(
                                  appointment.id,
                                  "checked-in"
                                );
                              }}
                            >
                              Mark as Checked In
                            </DropdownMenuItem>
                          )}

                          {appointment.status !== "in-progress" && (
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(
                                  appointment.id,
                                  "in-progress"
                                );
                              }}
                            >
                              Start Treatment
                            </DropdownMenuItem>
                          )}

                          {appointment.status !== "finished" && (
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(appointment.id, "finished");
                              }}
                            >
                              Mark as Finished
                            </DropdownMenuItem>
                          )}

                          {appointment.status !== "cancelled" && (
                            <DropdownMenuItem
                              className="text-red-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(appointment.id, "cancelled");
                              }}
                            >
                              Cancel Appointment
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuItem
                            className="text-red-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(appointment.id);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
