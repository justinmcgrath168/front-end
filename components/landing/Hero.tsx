// src/components/landing/Hero.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionProps } from "@/types";
import { ArrowRight, CheckCircle } from "lucide-react";

export function Hero({ id, className }: SectionProps) {
  return (
    <section
      id={id || "hero"}
      className={`relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-primary to-primary-dark ${
        className || ""
      }`}
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px] opacity-75"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full max-w-7xl mx-auto">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Unify Your Dental Ecosystem
            </h1>
            <p className="mt-6 text-xl text-white/80 leading-8">
              DentalSync connects clinics, labs, imaging centers, and suppliers
              in one seamless platform. Streamline workflows, enhance patient
              care, and grow your dental business.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                asChild
                className="bg-white text-primary hover:bg-white/90 hover:text-primary shadow-lg"
              >
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/demo">Schedule Demo</Link>
              </Button>
            </div>

            <div className="mt-10">
              <p className="text-white/80 mb-3">
                Trusted by dental professionals worldwide:
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-white" />
                  <span className="text-sm">30-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-white" />
                  <span className="text-sm">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-white" />
                  <span className="text-sm">HIPAA compliant</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative lg:h-[600px]">
            <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="aspect-[16/9] relative">
                <Image
                  src="/images/dashboard-preview.png"
                  alt="DentalSync Dashboard"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/70 to-transparent h-1/4"></div>
            </div>

            {/* Feature cards */}
            <div className="absolute -bottom-10 -left-10 w-64 bg-white rounded-lg shadow-xl p-4 z-20 hidden md:block">
              <h3 className="font-semibold text-primary">Patient Management</h3>
              <p className="text-sm text-gray-600 mt-1">
                Streamlined patient records and appointment scheduling
              </p>
            </div>

            <div className="absolute top-10 -right-10 w-64 bg-white rounded-lg shadow-xl p-4 z-20 hidden md:block">
              <h3 className="font-semibold text-primary">Lab Integration</h3>
              <p className="text-sm text-gray-600 mt-1">
                Seamless communication between clinics and labs
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
