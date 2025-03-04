"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, Eye, EyeOff, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordStrengthIndicator } from "@/components/auth/PasswordStrengthIndicator";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const errors = {
      password: "",
      confirmPassword: "",
    };
    let isValid = true;

    // Password validation
    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, you would call your password reset API here
      // const response = await fetch('/api/auth/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     token,
      //     password: formData.password,
      //   }),
      // });

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSuccess(true);

      // Redirect to login after a delay
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description:
      //     "Failed to reset password. Please try again or request a new link.",
      //   variant: "destructive",
      // });
      toast(
        "Failed to reset password. Please try again or request a new link."
      );
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if token exists
  if (!token) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Invalid or Expired Link</h1>
        <p className="mt-4 text-gray-600">
          This password reset link is invalid or has expired. Please request a
          new one.
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link href="/forgot-password">Request New Link</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold">Password Reset Successfully</h1>
        <p className="mt-4 text-gray-600">
          Your password has been reset successfully. You will be redirected to
          the login page.
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Suspense>
      <div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create New Password</h1>
          <p className="mt-2 text-gray-600">
            Please enter a new password for your account
          </p>
        </div>

        <div className="mt-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className={`pl-10 pr-10 ${
                    formErrors.password ? "border-red-500" : ""
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-sm text-red-500">{formErrors.password}</p>
              )}
              <PasswordStrengthIndicator password={formData.password} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  className={`pl-10 pr-10 ${
                    formErrors.confirmPassword ? "border-red-500" : ""
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {formErrors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Resetting...
                </>
              ) : (
                "Reset Password"
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
    </Suspense>
  );
}
