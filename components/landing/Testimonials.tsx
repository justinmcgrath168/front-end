// src/components/landing/Testimonials.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { SectionProps, TestimonialProps } from "@/types";
import { Quote } from "lucide-react";

const testimonials: TestimonialProps[] = [
  {
    quote:
      "DentalSync has transformed how our multi-location practice operates. The seamless integration between our clinics, labs, and suppliers has reduced administrative overhead by 40% and improved our patient experience dramatically.",
    author: "Dr. Emily Johnson",
    position: "Owner",
    company: "Bright Smile Dental Group",
    avatarUrl: "/images/testimonials/emily-johnson.jpg",
  },
  {
    quote:
      "As a dental lab serving over 50 practices, coordinating cases used to be a nightmare. With DentalSync, we've eliminated missed communications, streamlined production, and built stronger relationships with our clinic partners.",
    author: "Michael Chen",
    position: "Operations Director",
    company: "PrecisionDent Laboratory",
    avatarUrl: "/images/testimonials/michael-chen.jpg",
  },
  {
    quote:
      "The integration between our imaging center and referring practices through DentalSync has revolutionized our workflow. Reports are delivered faster, scheduling is automated, and our referring dentists couldn't be happier.",
    author: "Dr. Sarah Rodriguez",
    position: "Clinical Director",
    company: "Advanced Dental Imaging",
    avatarUrl: "/images/testimonials/sarah-rodriguez.jpg",
  },
  {
    quote:
      "Managing our dental supply business through DentalSync has opened new opportunities. We can forecast demand better, serve our clients more efficiently, and gain insights that help us grow strategically.",
    author: "James Wilson",
    position: "CEO",
    company: "DentalSupply Pro",
    avatarUrl: "/images/testimonials/james-wilson.jpg",
  },
];

function TestimonialCard({
  quote,
  author,
  position,
  company,
  avatarUrl,
}: TestimonialProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all hover:shadow-lg flex flex-col h-full">
      <div className="mb-6 text-primary">
        <Quote className="h-8 w-8" />
      </div>
      <blockquote className="flex-grow">
        <p className="text-gray-700 italic leading-relaxed">
          &quot;{quote}&quot;
        </p>
      </blockquote>
      <div className="mt-6 flex items-center">
        <div className="flex-shrink-0">
          <Image
            src={avatarUrl}
            alt={author}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        </div>
        <div className="ml-4">
          <p className="font-medium text-gray-900">{author}</p>
          <p className="text-sm text-gray-500">
            {position}, {company}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials({ id, className }: SectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const checkIfMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  const displayedTestimonials = isMobile
    ? [testimonials[activeIndex]]
    : testimonials;

  return (
    <section
      id={id || "testimonials"}
      className={`py-20 bg-gradient-to-br from-primary/5 to-primary/10 ${
        className || ""
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Trusted by Dental Professionals
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            See what our customers are saying about DentalSync
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>

        {isMobile && (
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`mx-1 h-2 w-2 rounded-full ${
                  index === activeIndex ? "bg-primary" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
