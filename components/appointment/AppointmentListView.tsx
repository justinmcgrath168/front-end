// components/appointments/appointment-list-view.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format, parseISO, isToday, isTomorrow, isBefore } from "date-fns";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Calendar,
  Clock,
  PlusCircle,
  ArrowUpDown,
} from "lucide-react";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { generateMockAppointments } from "@/lib/appointment-mock-data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AppointmentListViewProps {
  filter: {
    status: string;
    dentist: string;
    date: string;
    search: string;
  };
}

export default function AppointmentListView({
  filter,
}: AppointmentListViewProps) {
  const router = useRouter();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAppointments, setSelectedAppointments] = useState<string[]>(
    []
  );
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({
    key: "startTime",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmCancel, setConfirmCancel] = useState<string | null>(null);
  const [confirmCompleted, setConfirmCompleted] = useState<string | null>(null);
  const [isBulkActionsOpen, setIsBulkActionsOpen] = useState(false);

  const appointmentsPerPage = 10;

  // Fetch appointments (simulated)
  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Generate mock data
        const data = generateMockAppointments(30);
        setAppointments(data);
        setFilteredAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Apply filters
  useEffect(() => {
    if (!appointments.length) return;

    let filtered = [...appointments];

    // Filter by status
    if (filter.status !== "all") {
      filtered = filtered.filter(
        (appointment) => appointment.status === filter.status
      );
    }

    // Filter by dentist
    if (filter.dentist !== "all") {
      filtered = filtered.filter(
        (appointment) => appointment.dentist.id === filter.dentist
      );
    }

    // Filter by date
    if (filter.date === "today") {
      filtered = filtered.filter((appointment) =>
        isToday(parseISO(appointment.startTime.toString()))
      );
    } else if (filter.date === "tomorrow") {
      filtered = filtered.filter((appointment) =>
        isTomorrow(parseISO(appointment.startTime.toString()))
      );
    } else if (filter.date === "this-week") {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);

      filtered = filtered.filter((appointment) => {
        const appointmentDate = parseISO(appointment.startTime.toString());
        return (
          !isBefore(appointmentDate, today) &&
          isBefore(appointmentDate, nextWeek)
        );
      });
    } else if (filter.date === "next-week") {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      const twoWeeksFromNow = new Date();
      twoWeeksFromNow.setDate(today.getDate() + 14);

      filtered = filtered.filter((appointment) => {
        const appointmentDate = parseISO(appointment.startTime.toString());
        return (
          !isBefore(appointmentDate, nextWeek) &&
          isBefore(appointmentDate, twoWeeksFromNow)
        );
      });
    }

    // Filter by search query
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filtered = filtered.filter(
        (appointment) =>
          appointment.patient.name.toLowerCase().includes(searchLower) ||
          appointment.dentist.name.toLowerCase().includes(searchLower) ||
          appointment.type.toLowerCase().includes(searchLower)
      );
    }

    // Sort by the current sort config
    filtered.sort((a, b) => {
      const aValue = getSortValue(a, sortConfig.key);
      const bValue = getSortValue(b, sortConfig.key);

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredAppointments(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [filter, appointments, sortConfig]);

  // Get sort value based on key
  const getSortValue = (appointment: any, key: string) => {
    switch (key) {
      case "startTime":
        return new Date(appointment.startTime).getTime();
      case "patient":
        return appointment.patient.name;
      case "dentist":
        return appointment.dentist.name;
      case "type":
        return appointment.type;
      case "status":
        return appointment.status;
      default:
        return "";
    }
  };

  // Toggle sort
  const toggleSort = (key: string) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        return {
          key,
          direction: prevConfig.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  // Get sort icon
  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4 ml-1" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-4 w-4 ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 ml-1" />
    );
  };

  // Toggle appointment selection
  const toggleAppointmentSelection = (appointmentId: string) => {
    setSelectedAppointments((prev) => {
      if (prev.includes(appointmentId)) {
        return prev.filter((id) => id !== appointmentId);
      } else {
        return [...prev, appointmentId];
      }
    });
  };

  // Toggle all appointments selection
  const toggleAllAppointments = () => {
    if (selectedAppointments.length === displayedAppointments.length) {
      setSelectedAppointments([]);
    } else {
      setSelectedAppointments(
        displayedAppointments.map((appointment) => appointment.id)
      );
    }
  };

  // Cancel appointment
  const cancelAppointment = async (appointmentId: string) => {
    // In a real app, this would be an API call
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update local state
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, status: "Canceled" }
            : appointment
        )
      );

      setConfirmCancel(null);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  // Mark appointment as completed
  const completeAppointment = async (appointmentId: string) => {
    // In a real app, this would be an API call
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update local state
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, status: "Completed" }
            : appointment
        )
      );

      setConfirmCompleted(null);
    } catch (error) {
      console.error("Error completing appointment:", error);
    }
  };

  // Get status badge color
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

  // Pagination
  const totalPages = Math.ceil(
    filteredAppointments.length / appointmentsPerPage
  );
  const pageStart = (currentPage - 1) * appointmentsPerPage;
  const pageEnd = pageStart + appointmentsPerPage;
  const displayedAppointments = filteredAppointments.slice(pageStart, pageEnd);

  // Navigate to next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((current) => current + 1);
    }
  };

  // Navigate to previous page
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((current) => current - 1);
    }
  };

  // Bulk cancel appointments
  const bulkCancelAppointments = async () => {
    // In a real app, this would be an API call
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update local state
      setAppointments((prev) =>
        prev.map((appointment) =>
          selectedAppointments.includes(appointment.id)
            ? { ...appointment, status: "Canceled" }
            : appointment
        )
      );

      setSelectedAppointments([]);
      setIsBulkActionsOpen(false);
    } catch (error) {
      console.error("Error cancelling appointments:", error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      {selectedAppointments.length > 0 && (
        <div className="bg-muted p-2 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={
                selectedAppointments.length === displayedAppointments.length
              }
              onCheckedChange={toggleAllAppointments}
              id="select-all-bulk"
            />
            <label htmlFor="select-all-bulk" className="text-sm font-medium">
              {selectedAppointments.length}{" "}
              {selectedAppointments.length === 1
                ? "appointment"
                : "appointments"}{" "}
              selected
            </label>
          </div>

          <DropdownMenu
            open={isBulkActionsOpen}
            onOpenChange={setIsBulkActionsOpen}
          >
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Bulk Actions
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={bulkCancelAppointments}
                className="text-red-600"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Cancel Selected
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Mark as Confirmed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Table */}
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={
                        selectedAppointments.length ===
                          displayedAppointments.length &&
                        displayedAppointments.length > 0
                      }
                      onCheckedChange={toggleAllAppointments}
                      aria-label="Select all appointments"
                    />
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => toggleSort("startTime")}
                  >
                    <div className="flex items-center">
                      Date & Time
                      {getSortIcon("startTime")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => toggleSort("patient")}
                  >
                    <div className="flex items-center">
                      Patient
                      {getSortIcon("patient")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => toggleSort("dentist")}
                  >
                    <div className="flex items-center">
                      Dentist
                      {getSortIcon("dentist")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => toggleSort("type")}
                  >
                    <div className="flex items-center">
                      Type
                      {getSortIcon("type")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => toggleSort("status")}
                  >
                    <div className="flex items-center">
                      Status
                      {getSortIcon("status")}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedAppointments.length > 0 ? (
                  displayedAppointments.map((appointment) => {
                    const isPast =
                      isBefore(
                        parseISO(appointment.startTime.toString()),
                        new Date()
                      ) && !isToday(parseISO(appointment.startTime.toString()));

                    return (
                      <TableRow
                        key={appointment.id}
                        className={cn(
                          "cursor-pointer hover:bg-muted/50",
                          isPast &&
                            appointment.status !== "Completed" &&
                            appointment.status !== "Canceled" &&
                            appointment.status !== "No-Show"
                            ? "bg-amber-50/50 dark:bg-amber-950/10"
                            : ""
                        )}
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedAppointments.includes(
                              appointment.id
                            )}
                            onCheckedChange={() =>
                              toggleAppointmentSelection(appointment.id)
                            }
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`Select appointment for ${appointment.patient.name}`}
                          />
                        </TableCell>
                        <TableCell
                          onClick={() =>
                            router.push(
                              `/dashboard/appointments/${appointment.id}`
                            )
                          }
                          className="font-medium"
                        >
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>
                                {format(
                                  parseISO(appointment.startTime.toString()),
                                  "MMM d, yyyy"
                                )}
                              </span>
                            </div>
                            <div className="flex items-center text-muted-foreground text-sm">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>
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
                          </div>
                        </TableCell>
                        <TableCell
                          onClick={() =>
                            router.push(
                              `/dashboard/appointments/${appointment.id}`
                            )
                          }
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={appointment.patient.avatar}
                                alt={appointment.patient.name}
                              />
                              <AvatarFallback>
                                {getInitials(appointment.patient.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {appointment.patient.name}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {appointment.patient.phone}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell
                          onClick={() =>
                            router.push(
                              `/dashboard/appointments/${appointment.id}`
                            )
                          }
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={appointment.dentist.avatar}
                                alt={appointment.dentist.name}
                              />
                              <AvatarFallback>
                                {getInitials(appointment.dentist.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{appointment.dentist.name}</span>
                          </div>
                        </TableCell>
                        <TableCell
                          onClick={() =>
                            router.push(
                              `/dashboard/appointments/${appointment.id}`
                            )
                          }
                        >
                          {appointment.type}
                        </TableCell>
                        <TableCell
                          onClick={() =>
                            router.push(
                              `/dashboard/appointments/${appointment.id}`
                            )
                          }
                        >
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
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
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/dashboard/appointments/${appointment.id}`}
                                >
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/dashboard/appointments/${appointment.id}/edit`}
                                >
                                  Edit Appointment
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  setConfirmCompleted(appointment.id)
                                }
                                disabled={
                                  appointment.status === "Completed" ||
                                  appointment.status === "Canceled" ||
                                  appointment.status === "No-Show"
                                }
                              >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Mark as Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => setConfirmCancel(appointment.id)}
                                disabled={
                                  appointment.status === "Canceled" ||
                                  appointment.status === "Completed"
                                }
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel Appointment
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Calendar className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">
                          No appointments found
                        </p>
                        <Button className="mt-4" asChild>
                          <Link href="/dashboard/appointments/new">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Create Appointment
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredAppointments.length > 0 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {pageStart + 1}-
                {Math.min(pageEnd, filteredAppointments.length)} of{" "}
                {filteredAppointments.length} appointments
              </p>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => {
                      // Only show first, last, current, and pages around current
                      if (
                        page === 1 ||
                        page === totalPages ||
                        page === currentPage ||
                        page === currentPage - 1 ||
                        page === currentPage + 1
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              isActive={page === currentPage}
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }

                      // Show ellipsis for gaps
                      if (page === 2 && currentPage > 3) {
                        return <PaginationEllipsis key={page} />;
                      }

                      if (
                        page === totalPages - 1 &&
                        currentPage < totalPages - 2
                      ) {
                        return <PaginationEllipsis key={page} />;
                      }

                      return null;
                    }
                  )}

                  <PaginationItem>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}

      {/* Cancel Confirmation Dialog */}
      <Dialog
        open={!!confirmCancel}
        onOpenChange={(open) => !open && setConfirmCancel(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmCancel(null)}>
              No, Keep Appointment
            </Button>
            <Button
              variant="destructive"
              onClick={() => confirmCancel && cancelAppointment(confirmCancel)}
            >
              Yes, Cancel Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Complete Confirmation Dialog */}
      <Dialog
        open={!!confirmCompleted}
        onOpenChange={(open) => !open && setConfirmCompleted(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark as Completed</DialogTitle>
            <DialogDescription>
              Are you sure you want to mark this appointment as completed?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmCompleted(null)}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                confirmCompleted && completeAppointment(confirmCompleted)
              }
            >
              Yes, Mark as Completed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
