// app/(dashboard)/dashboard/page.tsx
import { Metadata } from "next";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { redirect } from "next/navigation";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import AppointmentsCalendar from "@/components/dashboard/AppointmentCalendar";
import RecentPatients from "@/components/dashboard/RecentPatients";
import LabOrdersStatus from "@/components/dashboard/LabOrderStatus";
import UpcomingTasks from "@/components/dashboard/AppointmentCalendar";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Calendar,
  Users,
  FileText,
  FlaskConical,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard - Dental Management System",
  description: "Overview of your dental practice",
};

export default async function DashboardPage() {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/auth/login");
  // }

  const name = "Dr. Horn Panha";

  // Get current time to personalize greeting
  const currentHour = new Date().getHours();
  let greeting = "Good evening";

  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome header */}
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {greeting}, {name?.split(" ")[0] || "User"}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your dental practice today.
        </p>
      </div>

      {/* Key metrics overview */}
      <DashboardOverview />

      {/* Today's Schedule Preview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-lg">Today's Schedule</CardTitle>
              <CardDescription>You have 5 appointments today</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1" asChild>
              <Link href="/dashboard/appointments">
                View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <AppointmentsCalendar />
          </CardContent>
        </Card>

        {/* Recent Patients */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-lg">Recent Patients</CardTitle>
              <CardDescription>
                Recently added or updated patient records
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1" asChild>
              <Link href="/dashboard/patients">
                View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <RecentPatients />
          </CardContent>
        </Card>
      </div>

      {/* Lab Orders and Tasks */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-lg">Lab Orders Status</CardTitle>
              <CardDescription>
                Track the status of your lab orders
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1" asChild>
              <Link href="/dashboard/lab-orders">
                View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <LabOrdersStatus />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-lg">Upcoming Tasks</CardTitle>
              <CardDescription>
                Your upcoming tasks and reminders
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1" asChild>
              <Link href="/dashboard/tasks">
                View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <UpcomingTasks />
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          asChild
          variant="outline"
          className="h-auto py-4 gap-3 flex-col justify-center items-center"
        >
          <Link href="/dashboard/appointments/new">
            <Calendar className="h-6 w-6 text-blue-600" />
            <span>New Appointment</span>
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="h-auto py-4 gap-3 flex-col justify-center items-center"
        >
          <Link href="/dashboard/patients/new">
            <Users className="h-6 w-6 text-green-600" />
            <span>New Patient</span>
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="h-auto py-4 gap-3 flex-col justify-center items-center"
        >
          <Link href="/dashboard/lab-orders/new">
            <FlaskConical className="h-6 w-6 text-purple-600" />
            <span>New Lab Order</span>
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="h-auto py-4 gap-3 flex-col justify-center items-center"
        >
          <Link href="/dashboard/documents/new">
            <FileText className="h-6 w-6 text-amber-600" />
            <span>New Document</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
