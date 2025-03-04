// src/app/(auth)/two-factor/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Shield, Check } from "lucide-react";

export default function TwoFactorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Timer countdown for code expiration
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle input changes
  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newCode = [...code];

    // Handle paste event with multiple characters
    if (value.length > 1) {
      const pastedValue = value.split("").slice(0, code.length);

      for (let i = 0; i < pastedValue.length; i++) {
        const targetIndex =
          i + index < code.length ? i + index : code.length - 1;
        newCode[targetIndex] = pastedValue[i];
      }

      setCode(newCode);

      // Focus the appropriate input after paste
      const nextIndex = Math.min(index + pastedValue.length, code.length - 1);
      inputRefs[nextIndex]?.current?.focus();
      return;
    }

    // Normal single digit input
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < code.length - 1) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        // If current input is empty, focus previous input
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
        inputRefs[index - 1]?.current?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs[index - 1]?.current?.focus();
    } else if (e.key === "ArrowRight" && index < code.length - 1) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  // Verify the code
  const verifyCode = () => {
    const completeCode = code.join("");

    if (completeCode.length !== 6) {
      // toast({
      //   title: "Incomplete code",
      //   description: "Please enter all 6 digits of the verification code",
      //   variant: "destructive",
      // });
      toast("Please enter all 6 digits of the verification code");
      return;
    }

    setIsVerifying(true);

    // Simulate verification API call
    setTimeout(() => {
      // For demo: Code 123456 is always successful
      if (completeCode === "123456") {
        setIsSuccess(true);

        // Redirect after showing success message
        setTimeout(() => {
          router.push(redirect);
        }, 2000);
      } else {
        // toast({
        //   title: "Invalid code",
        //   description:
        //     "The verification code you entered is incorrect. Please try again.",
        //   variant: "destructive",
        // });
        toast(
          "The verification code you entered is incorrect. Please try again."
        );
        setIsVerifying(false);

        // Reset code
        setCode(["", "", "", "", "", ""]);
        inputRefs[0]?.current?.focus();
      }
    }, 1500);
  };

  // Resend verification code
  const resendCode = () => {
    setIsResending(true);

    // Simulate API call to resend code
    setTimeout(() => {
      setTimeLeft(30);
      setIsResending(false);

      // toast({
      //   title: "Code sent",
      //   description: "A new verification code has been sent to your phone",
      // });
      toast("A new verification code has been sent to your phone");
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold">Verification Successful</h1>
        <p className="mt-4 text-gray-600">
          Your identity has been verified. You will be redirected shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">Two-Factor Authentication</h1>
        <p className="mt-2 text-gray-600">
          We've sent a 6-digit verification code to your phone. Enter the code
          below to verify your identity.
        </p>
      </div>

      <div className="mt-8">
        <div className="flex justify-between mb-8">
          {code.map((digit, index) => (
            <div key={index} className="w-12">
              <Input
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="text-center text-xl h-14 font-mono"
                disabled={isVerifying || isSuccess}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            Code expires in {formatTime(timeLeft)}
          </p>
          <Button
            variant="link"
            size="sm"
            onClick={resendCode}
            disabled={isResending || timeLeft > 0 || isVerifying || isSuccess}
            className="p-0 h-auto"
          >
            {isResending ? "Sending..." : "Resend code"}
          </Button>
        </div>

        <Button
          onClick={verifyCode}
          className="w-full"
          disabled={code.some((d) => !d) || isVerifying || isSuccess}
        >
          {isVerifying ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </div>
    </div>
  );
}
