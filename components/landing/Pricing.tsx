// src/components/landing/Pricing.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionProps, PricingTierProps } from "@/types";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

type BusinessFilter = "all" | "clinic" | "lab" | "imaging" | "supplies";

const pricingTiers: PricingTierProps[] = [
  {
    name: "Starter",
    price: "$99",
    description:
      "Everything you need to get started with basic dental management.",
    features: [
      "Single location management",
      "Up to 5 staff accounts",
      "Patient records & scheduling",
      "Basic reporting",
      "Email support",
    ],
    businessType: "all",
    ctaText: "Get Started",
    ctaLink: "/signup?plan=starter",
  },
  {
    name: "Professional",
    price: "$249",
    description: "Advanced features for growing dental businesses.",
    features: [
      "Up to 3 locations",
      "Unlimited staff accounts",
      "Advanced analytics",
      "Lab order management",
      "Imaging integration",
      "Priority support",
      "Patient portal access",
    ],
    isPopular: true,
    businessType: "clinic",
    ctaText: "Get Started",
    ctaLink: "/signup?plan=professional",
  },
  {
    name: "Lab Professional",
    price: "$299",
    description: "Built for dental labs with robust production features.",
    features: [
      "Unlimited case management",
      "Production workflow tools",
      "Quality control system",
      "Materials inventory",
      "Multi-clinic connections",
      "Client portal",
      "Priority support",
    ],
    businessType: "lab",
    ctaText: "Get Started",
    ctaLink: "/signup?plan=lab",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large organizations and DSOs.",
    features: [
      "Multi-location management",
      "Custom integrations",
      "Advanced security features",
      "Dedicated account manager",
      "Custom reporting",
      "24/7 priority support",
      "Staff training & onboarding",
    ],
    businessType: "all",
    ctaText: "Contact Sales",
    ctaLink: "/contact",
  },
];

function PricingCard({
  name,
  price,
  description,
  features,
  isPopular,
  ctaText,
  ctaLink,
}: PricingTierProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md border ${
        isPopular ? "border-primary shadow-xl scale-105" : "border-gray-100"
      } p-6 flex flex-col h-full relative`}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
          Most Popular
        </div>
      )}

      <h3 className="text-xl font-bold text-gray-900">{name}</h3>
      <div className="mt-4 flex items-baseline">
        <span className="text-4xl font-extrabold text-gray-900">{price}</span>
        {price !== "Custom" && (
          <span className="ml-1 text-xl text-gray-500">/month</span>
        )}
      </div>
      <p className="mt-4 text-gray-600">{description}</p>

      <ul className="mt-6 space-y-3 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="ml-2 text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button
          asChild
          className={`w-full ${
            isPopular ? "bg-primary hover:bg-primary/90" : ""
          }`}
          variant={isPopular ? "default" : "outline"}
        >
          <Link href={ctaLink}>{ctaText}</Link>
        </Button>
      </div>
    </div>
  );
}

export function Pricing({ id, className }: SectionProps) {
  const [activeFilter, setActiveFilter] = useState<BusinessFilter>("all");

  const filteredPricing =
    activeFilter === "all"
      ? pricingTiers
      : pricingTiers.filter(
          (tier) =>
            tier.businessType === "all" || tier.businessType === activeFilter
        );

  return (
    <section id={id || "pricing"} className={`py-20 ${className || ""}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the plan that&apos;s right for your business
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-lg bg-gray-100">
            {[
              { value: "all", label: "All Plans" },
              { value: "clinic", label: "Clinics" },
              { value: "lab", label: "Labs" },
              { value: "imaging", label: "Imaging" },
              { value: "supplies", label: "Suppliers" },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value as BusinessFilter)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeFilter === filter.value
                    ? "bg-white shadow-sm text-primary"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {filteredPricing.map((tier, index) => (
            <PricingCard key={index} {...tier} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            All plans include a 30-day free trial. No credit card required.
          </p>
          <p className="mt-2 text-gray-600">
            Need a custom solution?{" "}
            <Link
              href="/contact"
              className="text-primary font-medium hover:underline"
            >
              Contact our sales team
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
