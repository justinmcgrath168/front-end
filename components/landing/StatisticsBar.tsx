// src/components/landing/StatisticsBar.tsx
import { SectionProps, StatProps } from "@/types";

const stats: StatProps[] = [
  {
    value: "4,500+",
    label: "Dental Practices",
    description: "Active users across clinics",
  },
  {
    value: "98%",
    label: "Customer Satisfaction",
    description: "Based on post-implementation surveys",
  },
  {
    value: "1.2M+",
    label: "Patient Records",
    description: "Managed through our platform",
  },
  {
    value: "32%",
    label: "Productivity Increase",
    description: "Average reported by our users",
  },
];

function StatItem({ value, label, description }: StatProps) {
  return (
    <div className="text-center px-4">
      <p className="text-4xl font-bold text-primary">{value}</p>
      <h3 className="mt-2 text-lg font-medium text-gray-900">{label}</h3>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}

export function StatisticsBar({ id, className }: SectionProps) {
  return (
    <section
      id={id || "stats"}
      className={`py-12 bg-gray-50 border-y border-gray-200 ${className || ""}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
