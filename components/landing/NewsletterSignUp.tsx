// src/components/landing/NewsletterSignup.tsx
"use client";

import { useState } from "react";
import { SectionProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Check } from "lucide-react";

export function NewsletterSignup({ id, className }: SectionProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // In a real implementation, this would call an API to submit the email
    console.log("Subscribing email:", email);
    setSubmitted(true);
    setError("");
  };

  return (
    <section id={id || "newsletter"} className={`py-16 ${className || ""}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Stay Updated with Dental Industry Insights
            </h2>
            <p className="mt-3 text-gray-600">
              Get the latest news, dental best practices, and DentalSync updates
              delivered to your inbox.
            </p>
          </div>

          {submitted ? (
            <div className="mt-8 bg-green-50 rounded-lg p-4 flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Subscription successful!
                </h3>
                <p className="mt-1 text-xs text-green-700">
                  Thank you for subscribing. Check your email for a confirmation
                  link.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-grow">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full ${
                      error ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                  )}
                </div>
                <Button type="submit" className="whitespace-nowrap">
                  <Send className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
              </div>
              <p className="mt-3 text-xs text-gray-500 text-center">
                By subscribing, you agree to our{" "}
                <a href="/privacy" className="underline hover:text-gray-700">
                  Privacy Policy
                </a>{" "}
                and to receive marketing communications from DentalSync.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
