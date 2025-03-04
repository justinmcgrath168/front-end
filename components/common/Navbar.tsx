// src/components/common/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const businessTypes = [
  {
    title: "Dental Clinics",
    href: "/solutions/clinics",
    description: "Streamline patient care, appointments, and treatment plans.",
  },
  {
    title: "Dental Labs",
    href: "/solutions/labs",
    description:
      "Manage cases, production, and clinic communications efficiently.",
  },
  {
    title: "Imaging Centers",
    href: "/solutions/imaging",
    description:
      "Organize imaging workflows, reports, and clinic integrations.",
  },
  {
    title: "Dental Suppliers",
    href: "/solutions/suppliers",
    description: "Optimize inventory, orders, and clinic/lab relationships.",
  },
];

const features = [
  {
    title: "Patient Management",
    href: "/features/patient-management",
    description: "Comprehensive patient records and engagement tools.",
  },
  {
    title: "Practice Management",
    href: "/features/practice-management",
    description: "Full business operations, scheduling, and billing solutions.",
  },
  {
    title: "Lab Connection",
    href: "/features/lab-connection",
    description: "Seamless digital workflows between clinics and labs.",
  },
  {
    title: "Supply Chain",
    href: "/features/supply-chain",
    description: "Automated inventory and ordering with preferred suppliers.",
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="DentalSync Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <span
            className={cn(
              "font-bold text-xl transition-colors",
              isScrolled ? "text-primary" : "text-white"
            )}
          >
            DentalSync
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "bg-transparent hover:bg-transparent hover:text-primary focus:bg-transparent",
                    isScrolled ? "text-gray-700" : "text-white"
                  )}
                >
                  Solutions
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[700px]">
                    {businessTypes.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {item.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "bg-transparent hover:bg-transparent hover:text-primary focus:bg-transparent",
                    isScrolled ? "text-gray-700" : "text-white"
                  )}
                >
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[700px]">
                    {features.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {item.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      "px-4 py-2 rounded-md",
                      isScrolled ? "text-gray-700" : "text-white"
                    )}
                  >
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      "px-4 py-2 rounded-md",
                      isScrolled ? "text-gray-700" : "text-white"
                    )}
                  >
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="outline"
              asChild
              className={cn(
                "font-medium border-2",
                isScrolled
                  ? "border-primary text-primary hover:bg-primary hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-primary"
              )}
            >
              <Link href="/login">Log in</Link>
            </Button>

            <Button asChild className="font-medium">
              <Link href="/signup">Start Free Trial</Link>
            </Button>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X
              className={isScrolled ? "text-gray-700" : "text-white"}
              size={24}
            />
          ) : (
            <Menu
              className={isScrolled ? "text-gray-700" : "text-white"}
              size={24}
            />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white p-4 shadow-md">
          <nav className="flex flex-col space-y-4">
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100">
                <span className="text-sm font-medium">Solutions</span>
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>
              <ul className="mt-2 space-y-1 px-4">
                {businessTypes.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>

            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100">
                <span className="text-sm font-medium">Features</span>
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>
              <ul className="mt-2 space-y-1 px-4">
                {features.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>

            <Link
              href="/pricing"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Pricing
            </Link>

            <Link
              href="/about"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              About
            </Link>

            <div className="pt-2 flex flex-col space-y-2">
              <Button variant="outline" asChild className="w-full">
                <Link href="/login">Log in</Link>
              </Button>

              <Button asChild className="w-full">
                <Link href="/signup">Start Free Trial</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
