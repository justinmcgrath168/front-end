// src/components/onboarding/OnboardingProgress.tsx
"use client";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface OnboardingProgressProps {
  steps: OnboardingStep[];
  currentStep: string;
}

export function OnboardingProgress({
  steps,
  currentStep,
}: OnboardingProgressProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-start">
          <div className="flex flex-col items-center mr-4">
            <div
              className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium ${
                step.isCompleted
                  ? "bg-primary text-white"
                  : step.isCurrent
                  ? "bg-primary/10 border-2 border-primary text-primary"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {step.isCompleted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-10 w-0.5 ${
                  step.isCompleted ? "bg-primary" : "bg-gray-200"
                }`}
              />
            )}
          </div>
          <div
            className={`pt-1 ${
              step.isCurrent
                ? "text-primary"
                : step.isCompleted
                ? "text-gray-900"
                : "text-gray-500"
            }`}
          >
            <h3
              className={`text-sm font-medium ${
                step.isCurrent ? "font-bold" : ""
              }`}
            >
              {step.title}
            </h3>
            <p className="text-xs mt-0.5">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
