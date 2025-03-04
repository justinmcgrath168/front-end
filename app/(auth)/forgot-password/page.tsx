// src/app/(auth)/forgot-password/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, you would call your password reset API here
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Something went wrong. Please try again.",
      //   variant: "destructive",
      // });
      toast("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <Mail className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold">Check your email</h1>
        <p className="mt-4 text-gray-600">
          We've sent a password reset link to <strong>{email}</strong>. Please
          check your inbox and follow the instructions to reset your password.
        </p>
        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-4">
            Didn't receive the email? Check your spam folder or request a new
            link.
          </p>
          <Button
            variant="outline"
            className="mr-4"
            onClick={() => setIsSubmitted(false)}
          >
            Try again
          </Button>
          <Button asChild>
            <Link href="/login">Return to login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Reset your password</h1>
        <p className="mt-2 text-gray-600">
          Enter your email address and we'll send you a link to reset your
          password
        </p>
      </div>

      <div className="mt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Sending...
              </>
            ) : (
              "Send reset link"
            )}
          </Button>

          <p className="text-center text-sm text-gray-600">
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Return to login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
