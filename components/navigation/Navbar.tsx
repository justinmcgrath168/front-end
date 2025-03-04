// components/dashboard/navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserNav } from "@/components/dashboard/user-nav";
import { Notifications } from "@/components/dashboard/notifications";
import { Search } from "@/components/dashboard/search";
import { cn } from "@/lib/utils";
import { ToothIcon } from "lucide-react";

type UserRole = "clinic" | "lab" | "imaging" | "supplier" | "admin";

interface NavbarProps {
  userRole: UserRole;
}

export function Navbar({ userRole }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 mr-4">
          <ToothIcon className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">DentalOS</span>
          {userRole !== "admin" && (
            <span className="ml-2 bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded capitalize">
              {userRole}
            </span>
          )}
        </div>

        <div className="hidden md:flex flex-1 items-center gap-6 md:gap-10">
          <nav className="flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              href="/calendar"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Calendar
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Search />
          <Notifications />
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
