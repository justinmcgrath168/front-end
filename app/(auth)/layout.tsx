import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | DentalSync",
  description: "Sign in to your DentalSync account or create a new one",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Brand sidebar */}
      <div className="hidden md:flex md:w-1/2 lg:w-2/5 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="relative flex flex-col justify-between w-full p-8 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>

          {/* Brand logo and info */}
          <div className="relative z-10">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-white.svg"
                alt="DentalSync Logo"
                width={48}
                height={48}
                className="mr-2"
              />
              <span className="font-bold text-2xl">DentalSync</span>
            </Link>

            <div className="mt-12 max-w-sm">
              <h1 className="text-3xl font-bold">
                The Complete Dental Management Ecosystem
              </h1>
              <p className="mt-4 text-white/80">
                Streamline your dental business with our all-in-one platform
                connecting clinics, labs, imaging centers, and suppliers in one
                integrated ecosystem.
              </p>
            </div>
          </div>

          {/* Testimonial */}
          <div className="relative z-10 mt-auto bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <blockquote className="text-white/90 italic">
              &quot;DentalSync has transformed how our multi-location practice
              operates. The seamless integration between our clinics, labs, and
              suppliers has reduced administrative overhead by 40%.&quot;
            </blockquote>
            <div className="mt-4 flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white font-medium">EJ</span>
              </div>
              <div className="ml-3">
                <p className="font-medium">Dr. Emily Johnson</p>
                <p className="text-sm text-white/70">
                  Bright Smile Dental Group
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col justify-center md:w-1/2 lg:w-3/5">
        <div className="sm:mx-auto sm:w-full sm:max-w-md md:max-w-lg">
          {/* Mobile logo */}
          <div className="flex justify-center md:hidden pt-8 pb-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="DentalSync Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="font-bold text-xl text-primary">DentalSync</span>
            </Link>
          </div>

          {/* Main content */}
          <div className="px-4 py-8 sm:px-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
