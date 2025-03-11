// src/components/appointments/AppointmentDetails.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  User,
  FileText,
  Stethoscope,
  Edit,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Appointment, AppointmentStatus } from "@/types/appointment";

interface AppointmentDetailsProps {
  appointment: Appointment;
  onStatusChange: (status: AppointmentStatus) => void;
  onDelete: () => void;
}

export default function AppointmentDetails({
  appointment,
  onStatusChange,
  onDelete,
}: AppointmentDetailsProps) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case "registered":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            Registered
          </Badge>
        );
      case "confirmed":
        return (
          <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
            Confirmed
          </Badge>
        );
      case "checked-in":
        return (
          <Badge className="bg-purple-100 text-purple-800 border-purple-200">
            Checked In
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            In Progress
          </Badge>
        );
      case "finished":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Finished
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            Cancelled
          </Badge>
        );
      case "no-show":
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            No Show
          </Badge>
        );
      case "waitlist":
        return (
          <Badge className="bg-orange-100 text-orange-800 border-orange-200">
            Waiting for Payment
          </Badge>
        );
      default:
        return null;
    }
  };

  const getDentistName = (dentistId: string) => {
    switch (dentistId) {
      case "1":
        return "Dr. Soap Mactavish";
      case "2":
        return "Dr. Cipeng";
      case "3":
        return "Dr. Putri Larasati";
      default:
        return "Unknown Dentist";
    }
  };

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Appointments
      </Button>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-2xl">Appointment Details</CardTitle>
            <CardDescription>
              View and manage appointment information
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(appointment.status)}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Patient Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{appointment.patientName}</span>
                </div>
                {/* Add more patient details as needed */}
              </div>
            </div>

            {/* Appointment Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Appointment Details</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {format(appointment.startTime, "EEEE, MMMM d, yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {format(appointment.startTime, "h:mm a")} -{" "}
                    {format(appointment.endTime, "h:mm a")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-muted-foreground" />
                  <span>{getDentistName(appointment.dentistId)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>{appointment.type}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          {appointment.notes && (
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Notes</h3>
              <div className="rounded-md bg-muted p-4">
                <p className="text-sm">{appointment.notes}</p>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="flex flex-wrap gap-2">
            {appointment.status !== "checked-in" && (
              <Button
                variant="outline"
                onClick={() => onStatusChange("checked-in")}
              >
                Check In
              </Button>
            )}

            {appointment.status !== "in-progress" && (
              <Button
                variant="outline"
                onClick={() => onStatusChange("in-progress")}
              >
                Start Treatment
              </Button>
            )}

            {appointment.status !== "finished" && (
              <Button
                variant="outline"
                className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                onClick={() => onStatusChange("finished")}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Mark as Finished
              </Button>
            )}

            {appointment.status !== "cancelled" && (
              <Button
                variant="outline"
                className="bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                onClick={() => onStatusChange("cancelled")}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Cancel Appointment
              </Button>
            )}
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              className="flex-1 sm:flex-initial"
              onClick={() =>
                router.push(`/appointments/${appointment.id}/edit`)
              }
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>

            <Dialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="flex-1 sm:flex-initial"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Appointment</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this appointment? This
                    action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDeleteDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      onDelete();
                      setIsDeleteDialogOpen(false);
                      router.push("/appointments");
                    }}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
