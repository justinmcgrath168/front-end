"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export function SocialLoginButtons() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSocialLogin = (provider: string) => {
    setIsLoading(provider);
    // Here you would integrate with NextAuth.js to handle the social login
    // For demonstration, we're just simulating a delay
    setTimeout(() => {
      setIsLoading(null);
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        variant="outline"
        onClick={() => handleSocialLogin("google")}
        disabled={isLoading !== null}
        className="w-full"
      >
        {isLoading === "google" ? (
          <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : (
          <svg
            aria-hidden="true"
            focusable="false"
            className="mr-2 h-4 w-4"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            />
          </svg>
        )}
        Google
      </Button>
      <Button
        variant="outline"
        onClick={() => handleSocialLogin("microsoft")}
        disabled={isLoading !== null}
        className="w-full"
      >
        {isLoading === "microsoft" ? (
          <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : (
          <svg
            aria-hidden="true"
            focusable="false"
            className="mr-2 h-4 w-4"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 23 23"
          >
            <path
              fill="currentColor"
              d="M0 0h10.931v10.931H0zM12.069 0H23v10.931H12.069zM0 12.069h10.931V23H0zM12.069 12.069H23V23H12.069z"
            />
          </svg>
        )}
        Microsoft
      </Button>
    </div>
  );
}
