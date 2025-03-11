// components/appointments/appointment-toolbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PlusCircle,
  Calendar,
  Download,
  Upload,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AppointmentToolbar() {
  const [showExportDialog, setShowExportDialog] = useState(false);

  // Would be implemented with real backend
  const exportAppointments = (format: string) => {
    console.log(`Exporting appointments as ${format}`);
    setShowExportDialog(false);
  };

  return (
    <div className="flex items-center gap-2">
      {/* New Appointment Button */}
      <Button asChild>
        <Link href="/dashboard/appointments/new">
          <PlusCircle className="h-4 w-4 mr-2" />
          New Appointment
        </Link>
      </Button>

      {/* Export/Import Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Schedule Options</span>
            <MoreHorizontal className="h-4 w-4 ml-2 sm:hidden" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowExportDialog(true)}>
            <Download className="h-4 w-4 mr-2" />
            Export Appointments
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Upload className="h-4 w-4 mr-2" />
            Import Appointments
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/appointments/availability">
              Set Availability
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/appointments/settings">
              Schedule Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Export Dialog */}
      <AlertDialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Export Appointments</AlertDialogTitle>
            <AlertDialogDescription>
              Choose a format to export your appointments data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => exportAppointments("csv")}
            >
              <span className="font-semibold">CSV</span>
              <span className="text-xs text-muted-foreground">
                Spreadsheet software
              </span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => exportAppointments("excel")}
            >
              <span className="font-semibold">Excel</span>
              <span className="text-xs text-muted-foreground">
                Microsoft Excel
              </span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => exportAppointments("ical")}
            >
              <span className="font-semibold">iCal</span>
              <span className="text-xs text-muted-foreground">
                Calendar format
              </span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => exportAppointments("pdf")}
            >
              <span className="font-semibold">PDF</span>
              <span className="text-xs text-muted-foreground">
                Document format
              </span>
            </Button>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
