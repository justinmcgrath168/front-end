// components/dashboard/sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  LayoutDashboardIcon,
  Users2Icon,
  ClipboardListIcon,
  PackageIcon,
  BarChart3Icon,
  SettingsIcon,
  MenuIcon,
  XIcon,
  BuildingIcon,
  FlaskRoundIcon,
  ImageIcon,
  BoxIcon,
} from "lucide-react";

type UserRole = "clinic" | "lab" | "imaging" | "supplier" | "admin";

interface SidebarProps {
  userRole: UserRole;
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Define navigation items by role
  const navItems = {
    common: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboardIcon,
      },
      {
        title: "Calendar",
        href: "/calendar",
        icon: CalendarIcon,
      },
      {
        title: "Reports",
        href: "/reports",
        icon: BarChart3Icon,
      },
      {
        title: "Settings",
        href: "/settings",
        icon: SettingsIcon,
      },
    ],
    clinic: [
      {
        title: "Patients",
        href: "/patients",
        icon: Users2Icon,
      },
      {
        title: "Appointments",
        href: "/appointments",
        icon: ClipboardListIcon,
      },
      {
        title: "Lab Orders",
        href: "/lab-orders",
        icon: FlaskRoundIcon,
      },
      {
        title: "Imaging Requests",
        href: "/imaging-requests",
        icon: ImageIcon,
      },
      {
        title: "Supplies",
        href: "/supplies",
        icon: PackageIcon,
      },
    ],
    lab: [
      {
        title: "Work Orders",
        href: "/work-orders",
        icon: ClipboardListIcon,
      },
      {
        title: "Inventory",
        href: "/inventory",
        icon: BoxIcon,
      },
      {
        title: "Clinics",
        href: "/clinics",
        icon: BuildingIcon,
      },
    ],
    imaging: [
      {
        title: "Scan Requests",
        href: "/scan-requests",
        icon: ClipboardListIcon,
      },
      {
        title: "Patient Records",
        href: "/patient-records",
        icon: Users2Icon,
      },
      {
        title: "Clinics",
        href: "/clinics",
        icon: BuildingIcon,
      },
    ],
    supplier: [
      {
        title: "Orders",
        href: "/orders",
        icon: ClipboardListIcon,
      },
      {
        title: "Products",
        href: "/products",
        icon: BoxIcon,
      },
      {
        title: "Customers",
        href: "/customers",
        icon: BuildingIcon,
      },
      {
        title: "Inventory",
        href: "/inventory",
        icon: PackageIcon,
      },
    ],
  };

  // Combine common items with role-specific items
  const roleItems = navItems[userRole] || [];
  const allItems = [...navItems.common, ...roleItems];

  return (
    <>
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50 bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg md:hidden"
      >
        {isOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar background overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 w-64 h-screen pt-20 pb-4 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700",
          "md:translate-x-0 md:static md:h-auto md:pt-0 flex-shrink-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full px-3 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {allItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center p-2 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-700",
                    pathname === item.href
                      ? "bg-gray-100 dark:bg-gray-700 text-primary dark:text-primary-foreground"
                      : "text-gray-900 dark:text-white"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5 transition duration-75" />
                  <span className="ml-3">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
