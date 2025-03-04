// src/components/landing/Integrations.tsx
import Image from "next/image";
import Link from "next/link";
import { SectionProps, IntegrationProps } from "@/types";
import { Button } from "@/components/ui/button";

const integrations: IntegrationProps[] = [
  {
    name: "Carestream Dental",
    logoUrl: "/images/integrations/carestream.svg",
    description: "Connect with imaging equipment and practice management",
  },
  {
    name: "Dentsply Sirona",
    logoUrl: "/images/integrations/dentsply.svg",
    description: "Integrate with CEREC and treatment center equipment",
  },
  {
    name: "3Shape",
    logoUrl: "/images/integrations/3shape.svg",
    description: "Digital impressions and CAD/CAM workflow integration",
  },
  {
    name: "Stripe",
    logoUrl: "/images/integrations/stripe.svg",
    description: "Secure payment processing for patient billing",
  },
  {
    name: "Twilio",
    logoUrl: "/images/integrations/twilio.svg",
    description: "SMS appointment reminders and patient communication",
  },
  {
    name: "Google Calendar",
    logoUrl: "/images/integrations/google.svg",
    description: "Sync appointments with your team's calendars",
  },
];

export function Integrations({ id, className }: SectionProps) {
  return (
    <section
      id={id || "integrations"}
      className={`py-20 bg-gray-50 ${className || ""}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Seamless Integrations
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Connect DentalSync with your favorite tools and technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex items-start hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 w-16 h-16 relative mr-4">
                <Image
                  src={integration.logoUrl}
                  alt={`${integration.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  {integration.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {integration.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link href="/integrations">View All Integrations</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
