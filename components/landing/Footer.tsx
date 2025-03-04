// src/components/landing/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { SectionProps } from "@/types";
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

export function Footer({ className }: SectionProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-gray-900 text-gray-300 ${className || ""}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and about */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo.svg"
                alt="DentalSync Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="font-bold text-xl text-white">DentalSync</span>
            </Link>
            <p className="mt-4 text-gray-400 max-w-md">
              DentalSync is the leading dental management platform connecting
              clinics, labs, imaging centers, and suppliers in one seamless
              ecosystem.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link
                href="https://facebook.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://twitter.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://instagram.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://youtube.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-semibold mb-4">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/solutions/clinics"
                  className="hover:text-white transition-colors"
                >
                  For Dental Clinics
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/labs"
                  className="hover:text-white transition-colors"
                >
                  For Dental Labs
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/imaging"
                  className="hover:text-white transition-colors"
                >
                  For Imaging Centers
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/suppliers"
                  className="hover:text-white transition-colors"
                >
                  For Dental Suppliers
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/enterprise"
                  className="hover:text-white transition-colors"
                >
                  Enterprise & DSO
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="hover:text-white transition-colors"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/resources/help-center"
                  className="hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/api-docs"
                  className="hover:text-white transition-colors"
                >
                  API Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/community"
                  className="hover:text-white transition-colors"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/webinars"
                  className="hover:text-white transition-colors"
                >
                  Webinars & Events
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/partners"
                  className="hover:text-white transition-colors"
                >
                  Partners
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; {currentYear} DentalSync, Inc. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-4 text-sm">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/security"
              className="hover:text-white transition-colors"
            >
              Security
            </Link>
            <Link
              href="/compliance"
              className="hover:text-white transition-colors"
            >
              HIPAA Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
