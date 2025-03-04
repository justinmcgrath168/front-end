// app/(dashboard)/layout.tsx
import { ReactNode } from "react";
import { Toaster } from "sonner";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "@/lib/auth";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  // Check authentication
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/auth/login");
  // }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar for navigation */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col ml-0 md:ml-64 min-h-screen">
        {/* Header with user info and actions */}
        <Header />

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">{children}</main>

        {/* Footer could go here */}
      </div>

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}
