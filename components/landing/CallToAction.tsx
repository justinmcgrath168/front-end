// src/components/landing/CallToAction.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SectionProps } from "@/types";

export function CallToAction({ id, className }: SectionProps) {
  return (
    <section id={id || "cta"} className={`py-20 bg-primary ${className || ""}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to transform your dental business?
          </h2>
          <p className="mt-4 text-xl text-white/90">
            Join thousands of dental professionals who are streamlining their
            operations, enhancing patient care, and growing their businesses
            with DentalSync.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-white text-primary hover:bg-white/90"
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

          <p className="mt-6 text-white/80">
            No credit card required. 30-day free trial. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
