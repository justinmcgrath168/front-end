// src/components/landing/BusinessTypes.tsx
import Link from "next/link";
import { SectionProps, BusinessTypeCardProps } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Stethoscope,
  Camera,
  PackageOpen,
  ChevronRight,
  FlaskConical,
} from "lucide-react";

const businessTypes: BusinessTypeCardProps[] = [
  {
    type: "clinic",
    icon: <Stethoscope className="h-12 w-12 text-primary" />,
    title: "Dental Clinics",
    description:
      "Streamline patient care, appointments, and business operations for solo practices and multi-location groups.",
    features: [
      "Complete patient management",
      "Smart scheduling system",
      "Digital charting and treatment plans",
      "Insurance verification & billing",
      "Lab case management",
    ],
    ctaText: "Solutions for Clinics",
    ctaLink: "/solutions/clinics",
  },
  {
    type: "lab",
    icon: <FlaskConical className="h-12 w-12 text-primary" />,
    title: "Dental Labs",
    description:
      "Optimize lab operations, case management, and clinic communications with our purpose-built lab tools.",
    features: [
      "Digital case acceptance",
      "Production workflow management",
      "Quality control checkpoints",
      "Inventory & materials tracking",
      "Client portal & communications",
    ],
    ctaText: "Solutions for Labs",
    ctaLink: "/solutions/labs",
  },
  {
    type: "imaging",
    icon: <Camera className="h-12 w-12 text-primary" />,
    title: "Imaging Centers",
    description:
      "Manage imaging workflows, patient scheduling, and clinic integrations for dental radiology practices.",
    features: [
      "DICOM image management",
      "Radiologist reporting tools",
      "Clinic integration portal",
      "Patient scheduling system",
      "Billing & insurance processing",
    ],
    ctaText: "Solutions for Imaging",
    ctaLink: "/solutions/imaging",
  },
  {
    type: "supplies",
    icon: <PackageOpen className="h-12 w-12 text-primary" />,
    title: "Dental Suppliers",
    description:
      "Connect with dental practices and labs through our digital marketplace and inventory management system.",
    features: [
      "Order management system",
      "Clinic & lab connectivity",
      "Inventory forecasting",
      "Shipping & fulfillment tools",
      "Client analytics dashboard",
    ],
    ctaText: "Solutions for Suppliers",
    ctaLink: "/solutions/suppliers",
  },
];

function BusinessTypeCard({
  icon,
  title,
  description,
  features,
  ctaText,
  ctaLink,
}: BusinessTypeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 transition-all hover:shadow-xl p-6">
      <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-lg mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>

      <ul className="mt-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 text-primary">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="ml-2 text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button
          asChild
          variant="outline"
          className="group w-full justify-between"
        >
          <Link href={ctaLink}>
            <span>{ctaText}</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function BusinessTypes({ id, className }: SectionProps) {
  return (
    <section id={id || "solutions"} className={`py-20 ${className || ""}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            One Platform, Many Solutions
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            DentalSync is tailored for every business in the dental ecosystem
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessTypes.map((type) => (
            <BusinessTypeCard key={type.type} {...type} />
          ))}
        </div>
      </div>
    </section>
  );
}
