// src/components/landing/FAQ.tsx
"use client";

import { useState } from "react";
import { SectionProps, FAQItemProps } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs: FAQItemProps[] = [
  {
    question: "How does the 30-day free trial work?",
    answer:
      "You can sign up for a full-featured 30-day trial of DentalSync without providing any payment information. During the trial, you'll have access to all features of your selected plan. At the end of the trial, you can choose to subscribe or your account will automatically downgrade to our limited free plan.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to the new features and be billed the prorated difference. When downgrading, changes will take effect at the end of your current billing cycle.",
  },
  {
    question: "Is DentalSync HIPAA compliant?",
    answer:
      "Absolutely. DentalSync is fully HIPAA compliant and we provide Business Associate Agreements (BAA) to all customers. We use enterprise-grade encryption, secure data centers, and regular security audits to ensure your patient data is protected according to the highest standards.",
  },
  {
    question:
      "Can I import data from my existing practice management software?",
    answer:
      "Yes, DentalSync supports data migration from most popular dental practice management systems. Our onboarding team will assist you with a smooth transition, including patient records, appointments, treatment plans, and financial data.",
  },
  {
    question: "How does DentalSync connect clinics with labs and suppliers?",
    answer:
      "DentalSync provides a unified platform where clinics can create digital lab prescriptions, submit them directly to integrated labs, track case status in real-time, and communicate efficiently about case details. Similarly, clinics can manage inventory and place orders with connected suppliers directly through the platform.",
  },
  {
    question: "What training and support options are available?",
    answer:
      "All plans include access to our knowledge base, video tutorials, and email support. Professional and higher plans include live onboarding sessions, priority support, and regular training webinars. Enterprise plans include dedicated account managers and custom training programs for your team.",
  },
  {
    question: "Does DentalSync integrate with my imaging equipment?",
    answer:
      "DentalSync integrates with most major digital imaging systems, including intraoral scanners, CBCT, and 2D imaging. Our platform supports DICOM standards and can connect with imaging centers for seamless radiological workflows.",
  },
  {
    question: "Can I use DentalSync on mobile devices?",
    answer:
      "Yes, DentalSync is fully responsive and works on all devices. We also offer dedicated mobile apps for iOS and Android that allow you to access key features on the go, including appointment scheduling, patient information, and notifications.",
  },
];

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-6">
      <button
        className="flex w-full justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <span className="ml-6 flex-shrink-0 text-primary">
          {isOpen ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </span>
      </button>
      <div
        className={`mt-3 pr-12 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-base text-gray-600">{answer}</p>
      </div>
    </div>
  );
}

export function FAQ({ id, className }: SectionProps) {
  return (
    <section id={id || "faq"} className={`py-20 bg-gray-50 ${className || ""}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to know about DentalSync
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
