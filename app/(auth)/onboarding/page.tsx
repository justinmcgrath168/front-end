"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { OnboardingCard } from "@/components/onboarding/OnboardingCard";
import { StaffInviteForm } from "@/components/onboarding/StaffInviteForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Define the onboarding steps
const onboardingSteps = [
  {
    id: "setup",
    title: "Complete Setup",
    description: "Set up your account and business profile",
    component: "BusinessSetup",
  },
  {
    id: "invite",
    title: "Invite Team",
    description: "Invite your team members to collaborate",
    component: "TeamInvite",
  },
  {
    id: "integrations",
    title: "Connect Integrations",
    description: "Connect your existing tools and services",
    component: "Integrations",
  },
  {
    id: "explore",
    title: "Explore Features",
    description: "Learn about key features and how to use them",
    component: "FeatureExplore",
  },
];

// BusinessSetup component for step 1
function BusinessSetup({ onComplete }: { onComplete: () => void }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);

      // Wait a moment before advancing
      setTimeout(onComplete, 1000);
    }, 1500);
  };

  return (
    <OnboardingCard
      title="Business Profile Setup"
      description="Tell us more about your business to get started"
      footer={
        <div className="w-full flex justify-end">
          <Button
            onClick={handleComplete}
            disabled={isSubmitting || isCompleted}
            className="ml-auto"
          >
            {isSubmitting ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Saving...
              </>
            ) : isCompleted ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Completed
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      }
    >
      <div className="space-y-4 bg-green-50 rounded-md p-4 border border-green-200">
        <div className="flex items-center">
          <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
          <div>
            <h3 className="font-medium text-green-800">
              Profile Already Completed
            </h3>
            <p className="text-sm text-green-700">
              Your business profile was completed during signup. You can edit
              your profile later from the account settings.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <p className="text-sm text-gray-600">
            <Link
              href="/settings/profile"
              className="text-primary hover:underline"
            >
              View or edit your business profile →
            </Link>
          </p>
        </div>
      </div>
    </OnboardingCard>
  );
}

// TeamInvite component for step 2
function TeamInvite({ onComplete }: { onComplete: () => void }) {
  return (
    <OnboardingCard
      title="Invite Your Team"
      description="Add team members to collaborate with you"
      footer={
        <div className="w-full flex justify-between">
          <Button variant="ghost" onClick={onComplete}>
            Skip for now
          </Button>
          <Button onClick={onComplete}>
            Continue
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      }
    >
      <StaffInviteForm />
    </OnboardingCard>
  );
}

// Integrations component for step 3
function Integrations({ onComplete }: { onComplete: () => void }) {
  const integrations = [
    {
      id: "practice-management",
      name: "Practice Management",
      options: ["Dentrix", "Eaglesoft", "Open Dental", "Curve Dental"],
    },
    {
      id: "imaging",
      name: "Imaging Systems",
      options: ["Carestream", "Dexis", "Planmeca", "Sirona"],
    },
    {
      id: "lab",
      name: "Lab Management",
      options: ["LabStar", "Dental Lab Management", "exocad"],
    },
    {
      id: "erp",
      name: "Accounting & ERP",
      options: ["QuickBooks", "Xero", "Microsoft Dynamics"],
    },
  ];

  return (
    <OnboardingCard
      title="Connect Your Integrations"
      description="Connect your existing tools and systems"
      footer={
        <div className="w-full flex justify-between">
          <Button variant="ghost" onClick={onComplete}>
            Skip for now
          </Button>
          <Button onClick={onComplete}>
            Continue
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Connect your existing software to streamline your workflow. Our team
          will help you with the integration process.
        </p>

        <Accordion type="multiple" className="w-full">
          {integrations.map((category) => (
            <AccordionItem key={category.id} value={category.id}>
              <AccordionTrigger className="text-base">
                {category.name}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {category.options.map((option) => (
                    <div
                      key={option}
                      className="border rounded-md p-3 hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors"
                    >
                      <p className="font-medium">{option}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Click to set up integration
                      </p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't see your software?{" "}
            <Link href="/integrations" className="text-primary hover:underline">
              Browse all integrations
            </Link>
          </p>
        </div>
      </div>
    </OnboardingCard>
  );
}

// FeatureExplore component for step 4
function FeatureExplore({ onComplete }: { onComplete: () => void }) {
  const features = [
    {
      title: "Patient Management",
      description: "Manage patient records, appointments, and communications.",
      videoId: "patient-management",
    },
    {
      title: "Lab Orders",
      description: "Create and track digital lab prescriptions and cases.",
      videoId: "lab-orders",
    },
    {
      title: "Billing & Insurance",
      description: "Process payments and manage insurance claims.",
      videoId: "billing",
    },
    {
      title: "Reporting & Analytics",
      description: "Gain insights with customizable dashboards and reports.",
      videoId: "analytics",
    },
  ];

  return (
    <OnboardingCard
      title="Explore Key Features"
      description="Watch quick videos to learn about essential features"
      footer={
        <div className="w-full flex justify-end">
          <Button onClick={onComplete} className="ml-auto">
            Complete Onboarding
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="border rounded-md overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="p-4">
                <h3 className="font-medium">{feature.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {feature.description}
                </p>
                <Button variant="link" className="p-0 h-auto mt-2 text-primary">
                  Watch Video
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <p className="text-sm text-gray-600">
            <Link
              href="/support/tutorials"
              className="text-primary hover:underline"
            >
              View all tutorials and guides →
            </Link>
          </p>
        </div>
      </div>
    </OnboardingCard>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Process the step data for the progress component
  const progressSteps = onboardingSteps.map((step, index) => ({
    id: step.id,
    title: step.title,
    description: step.description,
    isCompleted: index < currentStepIndex,
    isCurrent: index === currentStepIndex,
  }));

  const goToNextStep = () => {
    if (currentStepIndex < onboardingSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      window.scrollTo(0, 0);
    } else {
      // Onboarding complete, redirect to dashboard
      router.push("/dashboard");
    }
  };

  // Render the current step component
  const renderStepComponent = () => {
    const currentStep = onboardingSteps[currentStepIndex];

    switch (currentStep.component) {
      case "BusinessSetup":
        return <BusinessSetup onComplete={goToNextStep} />;
      case "TeamInvite":
        return <TeamInvite onComplete={goToNextStep} />;
      case "Integrations":
        return <Integrations onComplete={goToNextStep} />;
      case "FeatureExplore":
        return <FeatureExplore onComplete={goToNextStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome to DentalSync
        </h1>
        <p className="text-gray-600 mt-2">
          Let's get your account set up so you can start using DentalSync
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <OnboardingProgress
            steps={progressSteps}
            currentStep={onboardingSteps[currentStepIndex].id}
          />
        </div>
        <div className="md:col-span-2">{renderStepComponent()}</div>
      </div>
    </div>
  );
}
