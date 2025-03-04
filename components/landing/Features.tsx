// src/components/landing/Features.tsx
import { SectionProps, FeatureProps } from "@/types";
import Image from "next/image";
import {
  CalendarDays,
  ClipboardList,
  Users,
  BarChart4,
  Shield,
  Zap,
} from "lucide-react";

const features: FeatureProps[] = [
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Unified Patient Records",
    description:
      "Create comprehensive patient profiles accessible across your organization. Track treatment history, imaging, lab orders, and billing in one place.",
    imageUrl: "/images/features/patient-records.jpg",
    reversed: false,
  },
  {
    icon: <CalendarDays className="h-10 w-10 text-primary" />,
    title: "Smart Appointment Management",
    description:
      "Optimize chair time with intelligent scheduling that considers procedure types, staff availability, and patient preferences. Reduce no-shows with automated reminders.",
    imageUrl: "/images/features/appointment-scheduling.jpg",
    reversed: true,
  },
  {
    icon: <ClipboardList className="h-10 w-10 text-primary" />,
    title: "Digital Lab Orders & Tracking",
    description:
      "Submit digital impressions and treatment plans directly to labs. Track case status in real-time and communicate with lab technicians in one collaborative workspace.",
    imageUrl: "/images/features/lab-orders.jpg",
    reversed: false,
  },
  {
    icon: <BarChart4 className="h-10 w-10 text-primary" />,
    title: "Business Intelligence",
    description:
      "Gain insights into practice performance with customizable dashboards. Track KPIs, identify trends, and make data-driven decisions to grow your business.",
    imageUrl: "/images/features/analytics.jpg",
    reversed: true,
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "HIPAA Compliant Security",
    description:
      "Protect sensitive patient data with enterprise-grade security. Role-based access control ensures information is only accessible to authorized personnel.",
    imageUrl: "/images/features/security.jpg",
    reversed: false,
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Seamless Integrations",
    description:
      "Connect with your existing tools and equipment through our extensive integration ecosystem. Import legacy data and expand functionality with specialized add-ons.",
    imageUrl: "/images/features/integrations.jpg",
    reversed: true,
  },
];

function FeatureItem({
  icon,
  title,
  description,
  imageUrl,
  reversed,
}: FeatureProps) {
  return (
    <div
      className={`grid md:grid-cols-2 gap-8 items-center ${
        reversed ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className={reversed ? "order-first md:order-last" : ""}>
        <div className="mb-4 inline-flex items-center justify-center p-2 bg-primary/10 rounded-lg">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg">
        <Image
          src={imageUrl || "/images/features/placeholder.jpg"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

export function Features({ id, className }: SectionProps) {
  return (
    <section
      id={id || "features"}
      className={`py-20 bg-gray-50 ${className || ""}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Features Built for Dental Excellence
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Our comprehensive platform is designed to streamline every aspect of
            your dental practice, lab, or supplier business.
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
