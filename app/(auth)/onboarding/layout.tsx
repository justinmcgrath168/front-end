// src/app/(auth)/onboarding/layout.tsx
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding | DentalSync",
  description: "Complete your account setup to get started with DentalSync",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="DentalSync Logo"
              width={32}
              height={32}
              className="mr-2"
            />
            <span className="font-bold text-xl text-primary">DentalSync</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">{children}</div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>
            Need help?{" "}
            <a href="/support" className="text-primary hover:underline">
              Contact support
            </a>
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} DentalSync. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
