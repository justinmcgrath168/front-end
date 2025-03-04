// components/dashboard/sidebar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Users,
  ShoppingCart,
  Image,
  Settings,
  Menu,
  BarChart2,
  MessageSquare,
  X,
  FlaskConical,
} from "lucide-react";

// Define navigation items
const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-blue-500",
  },
  {
    title: "Appointments",
    href: "/dashboard/appointments",
    icon: Calendar,
    color: "text-green-500",
  },
  {
    title: "Patients",
    href: "/dashboard/patients",
    icon: Users,
    color: "text-violet-500",
  },
  {
    title: "Lab Orders",
    href: "/dashboard/lab-orders",
    icon: FlaskConical,
    color: "text-amber-500",
  },
  {
    title: "Imaging",
    href: "/dashboard/imaging",
    icon: Image,
    color: "text-purple-500",
  },
  {
    title: "Inventory",
    href: "/dashboard/inventory",
    icon: ShoppingCart,
    color: "text-teal-500",
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: BarChart2,
    color: "text-red-500",
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
    color: "text-cyan-500",
    badge: "5",
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: FileText,
    color: "text-orange-500",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    color: "text-gray-500",
  },
];

// Define Sidebar component
export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Navigation item component
  const NavItem = ({ item }: { item: (typeof navigationItems)[0] }) => {
    const isActive =
      pathname === item.href || pathname?.startsWith(`${item.href}/`);

    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center py-3 px-3 rounded-lg mb-1 group hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
          isActive
            ? "bg-gray-100 dark:bg-gray-800 text-primary font-medium"
            : "text-gray-600 dark:text-gray-400"
        )}
        onClick={() => setIsMobileOpen(false)}
      >
        <item.icon className={cn("h-5 w-5 mr-3", item.color)} />
        <span>{item.title}</span>
        {item.badge && (
          <span className="ml-auto bg-primary text-primary-foreground text-xs py-1 px-2 rounded-full">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  // Mobile sidebar trigger
  const MobileTrigger = () => (
    <div className="flex items-center h-16 px-4 border-b md:hidden">
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <h2 className="text-lg font-semibold">Dental SaaS</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-4rem)] px-2 py-4">
            <div className="space-y-1 px-2">
              {navigationItems.map((item, index) => (
                <NavItem key={index} item={item} />
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <h2 className="text-lg font-semibold">Dental SaaS</h2>
    </div>
  );

  // Desktop sidebar
  const DesktopSidebar = () => (
    <div className="hidden md:flex h-screen w-64 flex-col fixed inset-y-0 z-50 border-r bg-white dark:bg-gray-950 dark:border-gray-800">
      <div className="flex h-16 items-center border-b px-4">
        <h2 className="text-lg font-semibold">Dental SaaS</h2>
      </div>
      <ScrollArea className="flex-1 px-2 py-4">
        <div className="space-y-1 px-2">
          {navigationItems.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <>
      <MobileTrigger />
      <DesktopSidebar />
    </>
  );
}
