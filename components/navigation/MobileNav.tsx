// src/components/navigation/MobileNav.tsx
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserRole } from "@/hooks/useUserRole";
import {
  Home,
  Calendar,
  Users,
  FileText,
  Package,
  Image,
  Layers,
  Settings,
  BarChart,
  MessageSquare,
} from "lucide-react";

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  roles: string[];
};

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ open, onClose }) => {
  const router = useRouter();
  const { role } = useUserRole();

  // Close menu when route changes
  useEffect(() => {
    const handleRouteChange = () => onClose();
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, onClose]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />,
      roles: ["admin", "clinic", "lab", "imaging", "supplier"],
    },
    {
      title: "Appointments",
      href: "/dashboard/appointments",
      icon: <Calendar className="h-5 w-5" />,
      roles: ["admin", "clinic"],
    },
    {
      title: "Patients",
      href: "/dashboard/patients",
      icon: <Users className="h-5 w-5" />,
      roles: ["admin", "clinic"],
    },
    {
      title: "Lab Orders",
      href: "/dashboard/lab-orders",
      icon: <FileText className="h-5 w-5" />,
      roles: ["admin", "clinic", "lab"],
    },
    {
      title: "Imaging Requests",
      href: "/dashboard/imaging",
      icon: <Image className="h-5 w-5" />,
      roles: ["admin", "clinic", "imaging"],
    },
    {
      title: "Inventory",
      href: "/dashboard/inventory",
      icon: <Package className="h-5 w-5" />,
      roles: ["admin", "clinic", "lab", "supplier"],
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: <BarChart className="h-5 w-5" />,
      roles: ["admin", "clinic", "lab", "imaging", "supplier"],
    },
    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: <MessageSquare className="h-5 w-5" />,
      roles: ["admin", "clinic", "lab", "imaging", "supplier"],
    },
    {
      title: "Integration",
      href: "/dashboard/integration",
      icon: <Layers className="h-5 w-5" />,
      roles: ["admin", "clinic", "lab", "imaging", "supplier"],
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
      roles: ["admin", "clinic", "lab", "imaging", "supplier"],
    },
  ];

  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(role || "")
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Link href="/dashboard" className="font-bold text-xl">
          DentalSaaS
        </Link>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="flex flex-col space-y-2">
          {filteredNavItems.map((item) => {
            const isActive =
              router.pathname === item.href ||
              router.pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-12 items-center gap-3 rounded-md px-4",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                {item.icon}
                <span className="text-base">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
};
