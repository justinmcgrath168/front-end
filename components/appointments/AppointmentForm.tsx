// src/components/appointments/AppointmentForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarClock, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Appointment,
  Dentist,
  Patient,
  TreatmentType,
} from "@/lib/types/appointment";

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

const mockPatients: Patient[] = [
  {
    id: "p1",
    name: "Rifli Jahudin",
    phone: "+62812345678",
    email: "rifli@example.com",
  },
  {
    id: "p2",
    name: "Sekar Nandita",
    phone: "+62823456789",
    email: "sekar@example.com",
  },
  {
    id: "p3",
    name: "Angkasa Pura",
    phone: "+62834567890",
    email: "angkasa@example.com",
  },
];

const mockTreatmentTypes: TreatmentType[] = [
  { id: "t1", name: "General Checkup", duration: 60 },
  { id: "t2", name: "Scaling", duration: 60 },
  { id: "t3", name: "Bleaching", duration: 60 },
  { id: "t4", name: "Extraction", duration: 60 },
  { id: "t5", name: "Root Canal", duration: 90 },
];

// Time slots available for selection
const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

interface AppointmentFormProps {
  initialAppointment?: Appointment;
  mode: "create" | "edit";
}

export default function AppointmentForm({
  initialAppointment,
  mode,
}: AppointmentFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    patientId: initialAppointment?.patientId || "",
    dentistId: initialAppointment?.dentistId || "",
    date: initialAppointment?.startTime || new Date(),
    startTime: initialAppointment?.startTime
      ? format(initialAppointment.startTime, "HH:mm")
      : "09:00",
    treatmentTypeId: "",
    notes: initialAppointment?.notes || "",
  });

  // Calculated end time based on treatment type duration
  const [endTime, setEndTime] = useState(
    initialAppointment?.endTime
      ? format(initialAppointment.endTime, "HH:mm")
      : "10:00"
  );

  useEffect(() => {
    if (formData.treatmentTypeId) {
      const treatment = mockTreatmentTypes.find(
        (t) => t.id === formData.treatmentTypeId
      );
      if (treatment) {
        // Calculate end time based on start time and treatment duration
        const [hours, minutes] = formData.startTime.split(":").map(Number);
        const startDate = new Date();
        startDate.setHours(hours, minutes, 0);

        const endDate = new Date(startDate);
        endDate.setMinutes(startDate.getMinutes() + treatment.duration);

        setEndTime(format(endDate, "HH:mm"));
      }
    }
  }, [formData.startTime, formData.treatmentTypeId]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create appointment object
      const appointmentData = {
        id: initialAppointment?.id || `new-${Date.now()}`,
        patientId: formData.patientId,
        patientName:
          mockPatients.find((p) => p.id === formData.patientId)?.name || "",
        dentistId: formData.dentistId,
        startTime: new Date(
          `${format(formData.date, "yyyy-MM-dd")}T${formData.startTime}`
        ),
        endTime: new Date(`${format(formData.date, "yyyy-MM-dd")}T${endTime}`),
        status: initialAppointment?.status || "registered",
        type:
          mockTreatmentTypes.find((t) => t.id === formData.treatmentTypeId)
            ?.name || "",
        notes: formData.notes,
      };

      // In a real app, this would submit to an API
      console.log("Submitting appointment:", appointmentData);

      // Simulate API request delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate back to appointments page
      router.push("/appointments");
      router.refresh();
    } catch (error) {
      console.error("Error submitting appointment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>
            {mode === "create" ? "New Appointment" : "Edit Appointment"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Patient Selection */}
          <div className="space-y-2">
            <Label htmlFor="patient">Patient</Label>
            <Select
              value={formData.patientId}
              onValueChange={(value) => handleChange("patientId", value)}
            >
              <SelectTrigger id="patient">
                <SelectValue placeholder="Select a patient" />
              </SelectTrigger>
              <SelectContent>
                {mockPatients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name} - {patient.phone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-1"
              onClick={() =>
                router.push("/patients/new?returnTo=/appointments/new")
              }
            >
              Add New Patient
            </Button>
          </div>

          {/* Dentist Selection */}
          <div className="space-y-2">
            <Label htmlFor="dentist">Dentist</Label>
            <Select
              value={formData.dentistId}
              onValueChange={(value) => handleChange("dentistId", value)}
            >
              <SelectTrigger id="dentist">
                <SelectValue placeholder="Select a dentist" />
              </SelectTrigger>
              <SelectContent>
                {mockDentists.map((dentist) => (
                  <SelectItem key={dentist.id} value={dentist.id}>
                    {dentist.name} - {dentist.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date & Time Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarClock className="mr-2 h-4 w-4" />
                    {format(formData.date, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => date && handleChange("date", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Start Time</Label>
              <Select
                value={formData.startTime}
                onValueChange={(value) => handleChange("startTime", value)}
              >
                <SelectTrigger id="time" className="w-full">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Treatment Type */}
          <div className="space-y-2">
            <Label htmlFor="treatmentType">Treatment Type</Label>
            <Select
              value={formData.treatmentTypeId}
              onValueChange={(value) => handleChange("treatmentTypeId", value)}
            >
              <SelectTrigger id="treatmentType">
                <SelectValue placeholder="Select treatment type" />
              </SelectTrigger>
              <SelectContent>
                {mockTreatmentTypes.map((treatment) => (
                  <SelectItem key={treatment.id} value={treatment.id}>
                    {treatment.name} ({treatment.duration} min)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Calculated End Time (Read Only) */}
          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <div className="flex items-center border rounded-md p-2">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{endTime}</span>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any relevant notes about this appointment"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? "Saving..."
              : mode === "create"
              ? "Create Appointment"
              : "Update Appointment"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
