// src/components/navigation/Header.tsx
import React from "react";
import { Bell, Search, Menu } from "lucide-react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { MobileNav } from "./MobileNav";
import { signOut } from "next-auth/react";
// import NotificationsDropdown from "@/components/notifications/NotificationsDropdown";
import { UserProfiles } from "@/types/user";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  user?: UserProfiles;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [unreadNotifications, setUnreadNotifications] = React.useState(3);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 lg:px-6">
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowMobileMenu(true)}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      <div className="flex flex-1 items-center gap-4 md:gap-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-8"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
                >
                  {unreadNotifications}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          {/* <NotificationsDropdown
            onNotificationsRead={() => setUnreadNotifications(0)}
          /> */}
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user?.image || ""}
                  alt={user?.name || "User"}
                />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href="/dashboard/settings/profile">Profile</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/dashboard/settings">Settings</a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isMobile && (
        <MobileNav
          open={showMobileMenu}
          onClose={() => setShowMobileMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;
