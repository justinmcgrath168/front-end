// components/dashboard/dashboard-overview.tsx
"use client";

import { useState } from "react";
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  ClipboardList,
  ShoppingCart,
  AlertTriangle,
  ArrowRight,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import Link from "next/link";
import { cn } from "@/lib/utils";

// Types
interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  change: number;
  icon: React.ElementType;
  iconColor: string;
  isLoading?: boolean;
}

interface MetricsData {
  [key: string]: {
    appointments: MetricCardProps;
    newPatients: MetricCardProps;
    revenue: MetricCardProps;
    pendingLabOrders: MetricCardProps;
    lowInventoryItems: MetricCardProps;
    treatmentsCompleted: MetricCardProps;
  };
}

// Badge component for showing metric changes
const BadgeDelta = ({
  value,
  isIncreasePositive = true,
  size = "default",
}: {
  value: number;
  isIncreasePositive?: boolean;
  size?: "default" | "sm";
}) => {
  const isPositive = value > 0;
  const isNeutral = value === 0;

  let colorClasses = "";

  if (isNeutral) {
    colorClasses =
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  } else if (isPositive) {
    colorClasses = isIncreasePositive
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  } else {
    colorClasses = isIncreasePositive
      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
  }

  const sizeClasses =
    size === "sm" ? "text-xs px-1.5 py-0.5" : "text-xs px-2 py-1";

  return (
    <span
      className={cn(
        "flex items-center space-x-1 rounded-full font-medium",
        sizeClasses,
        colorClasses
      )}
    >
      {!isNeutral && (
        <>
          {isPositive ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
        </>
      )}
      <span>
        {isPositive ? "+" : ""}
        {value}%
      </span>
    </span>
  );
};

// Metric card component
const MetricCard = ({
  title,
  value,
  description,
  change,
  icon: Icon,
  iconColor,
  isLoading = false,
}: MetricCardProps) => {
  // Determine if the change is positive or negative
  const isIncreasePositive = !(
    title.includes("Pending") ||
    title.includes("Low") ||
    title.toLowerCase().includes("pending") ||
    title.toLowerCase().includes("inventory")
  );

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div
            className={`p-2 rounded-full ${iconColor} bg-opacity-15 dark:bg-opacity-25`}
          >
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-9 w-24 bg-muted animate-pulse rounded" />
        ) : (
          <div className="text-3xl font-bold">{value}</div>
        )}
        <div className="flex items-center mt-1 space-x-2">
          {isLoading ? (
            <div className="h-5 w-16 bg-muted animate-pulse rounded" />
          ) : (
            <>
              <BadgeDelta
                value={change}
                isIncreasePositive={isIncreasePositive}
              />
              <span className="text-sm text-muted-foreground">
                {description}
              </span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Generate mock data for the dashboard
const generateMetricsData = (): MetricsData => {
  return {
    today: {
      appointments: {
        title: "Appointments",
        value: "8",
        description: "vs. yesterday",
        change: 14,
        icon: Calendar,
        iconColor: "text-blue-600",
      },
      newPatients: {
        title: "New Patients",
        value: "3",
        description: "vs. yesterday",
        change: 50,
        icon: Users,
        iconColor: "text-green-600",
      },
      revenue: {
        title: "Revenue",
        value: "$1,250",
        description: "vs. yesterday",
        change: 5,
        icon: DollarSign,
        iconColor: "text-amber-600",
      },
      pendingLabOrders: {
        title: "Pending Lab Orders",
        value: "4",
        description: "vs. yesterday",
        change: 0,
        icon: ClipboardList,
        iconColor: "text-purple-600",
      },
      lowInventoryItems: {
        title: "Low Inventory Items",
        value: "7",
        description: "vs. yesterday",
        change: 16,
        icon: ShoppingCart,
        iconColor: "text-red-600",
      },
      treatmentsCompleted: {
        title: "Treatments Completed",
        value: "6",
        description: "vs. yesterday",
        change: -10,
        icon: Activity,
        iconColor: "text-cyan-600",
      },
    },
    week: {
      appointments: {
        title: "Appointments",
        value: "42",
        description: "vs. last week",
        change: 8,
        icon: Calendar,
        iconColor: "text-blue-600",
      },
      newPatients: {
        title: "New Patients",
        value: "12",
        description: "vs. last week",
        change: 33,
        icon: Users,
        iconColor: "text-green-600",
      },
      revenue: {
        title: "Revenue",
        value: "$6,850",
        description: "vs. last week",
        change: 12,
        icon: DollarSign,
        iconColor: "text-amber-600",
      },
      pendingLabOrders: {
        title: "Pending Lab Orders",
        value: "15",
        description: "vs. last week",
        change: -5,
        icon: ClipboardList,
        iconColor: "text-purple-600",
      },
      lowInventoryItems: {
        title: "Low Inventory Items",
        value: "7",
        description: "vs. last week",
        change: 5,
        icon: ShoppingCart,
        iconColor: "text-red-600",
      },
      treatmentsCompleted: {
        title: "Treatments Completed",
        value: "35",
        description: "vs. last week",
        change: 15,
        icon: Activity,
        iconColor: "text-cyan-600",
      },
    },
    month: {
      appointments: {
        title: "Appointments",
        value: "186",
        description: "vs. last month",
        change: 5,
        icon: Calendar,
        iconColor: "text-blue-600",
      },
      newPatients: {
        title: "New Patients",
        value: "48",
        description: "vs. last month",
        change: 15,
        icon: Users,
        iconColor: "text-green-600",
      },
      revenue: {
        title: "Revenue",
        value: "$29,750",
        description: "vs. last month",
        change: 8,
        icon: DollarSign,
        iconColor: "text-amber-600",
      },
      pendingLabOrders: {
        title: "Pending Lab Orders",
        value: "28",
        description: "vs. last month",
        change: -12,
        icon: ClipboardList,
        iconColor: "text-purple-600",
      },
      lowInventoryItems: {
        title: "Low Inventory Items",
        value: "23",
        description: "vs. last month",
        change: 15,
        icon: ShoppingCart,
        iconColor: "text-red-600",
      },
      treatmentsCompleted: {
        title: "Treatments Completed",
        value: "165",
        description: "vs. last month",
        change: 7,
        icon: Activity,
        iconColor: "text-cyan-600",
      },
    },
    year: {
      appointments: {
        title: "Appointments",
        value: "2,248",
        description: "vs. last year",
        change: 12,
        icon: Calendar,
        iconColor: "text-blue-600",
      },
      newPatients: {
        title: "New Patients",
        value: "578",
        description: "vs. last year",
        change: 24,
        icon: Users,
        iconColor: "text-green-600",
      },
      revenue: {
        title: "Revenue",
        value: "$352,450",
        description: "vs. last year",
        change: 15,
        icon: DollarSign,
        iconColor: "text-amber-600",
      },
      pendingLabOrders: {
        title: "Pending Lab Orders",
        value: "42",
        description: "vs. last year",
        change: -5,
        icon: ClipboardList,
        iconColor: "text-purple-600",
      },
      lowInventoryItems: {
        title: "Low Inventory Items",
        value: "18",
        description: "vs. last year",
        change: -10,
        icon: ShoppingCart,
        iconColor: "text-red-600",
      },
      treatmentsCompleted: {
        title: "Treatments Completed",
        value: "1,975",
        description: "vs. last year",
        change: 18,
        icon: Activity,
        iconColor: "text-cyan-600",
      },
    },
  };
};

// Alert Card Component
const AlertCard = ({
  type,
  title,
  description,
  actionText,
  actionLink,
  iconColor,
}: {
  type: "warning" | "info" | "error";
  title: string;
  description: string;
  actionText: string;
  actionLink: string;
  iconColor: string;
}) => {
  const Icon =
    type === "warning"
      ? AlertTriangle
      : type === "error"
      ? AlertTriangle
      : Clock;

  return (
    <Card
      className={cn(
        "border-l-4",
        type === "warning"
          ? "border-l-amber-500"
          : type === "error"
          ? "border-l-red-500"
          : "border-l-blue-500"
      )}
    >
      <CardContent className="p-4 flex items-start gap-4">
        <div
          className={`p-2 rounded-full ${iconColor} bg-opacity-15 dark:bg-opacity-25 mt-0.5`}
        >
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>

          <div className="mt-2">
            <Button variant="link" className="p-0 h-auto" asChild>
              <Link href={actionLink} className="flex items-center text-sm">
                {actionText}
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Completion Progress Card
const CompletionCard = ({
  title,
  progress,
  total,
  color,
  icon: Icon,
}: {
  title: string;
  progress: number;
  total: number;
  color: string;
  icon: React.ElementType;
}) => {
  const percentage = Math.round((progress / total) * 100);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-sm">{title}</h4>
          <div
            className={`p-1.5 rounded-full ${color} bg-opacity-15 dark:bg-opacity-25`}
          >
            <Icon className={`h-4 w-4 ${color}`} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-semibold">
              {progress} / {total}
            </span>
            <span className="text-muted-foreground">{percentage}%</span>
          </div>
          <Progress
            value={percentage}
            className={cn(
              percentage < 33
                ? "text-red-600"
                : percentage < 66
                ? "text-amber-600"
                : "text-green-600"
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

// Main Dashboard Overview Component
export default function DashboardOverview() {
  // In a real app, you would fetch this data from your API
  const metricsData = generateMetricsData();
  const [isLoading] = useState(false);
  const timeFrames = ["today", "week", "month", "year"];

  return (
    <div className="space-y-6">
      {/* Key Metrics Section */}
      <Tabs defaultValue="week" className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Key Metrics</h2>
          <TabsList>
            {timeFrames.map((frame) => (
              <TabsTrigger key={frame} value={frame} className="capitalize">
                {frame}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {timeFrames.map((timeFrame) => (
          <TabsContent key={timeFrame} value={timeFrame} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <MetricCard
                {...metricsData[timeFrame].appointments}
                isLoading={isLoading}
              />
              <MetricCard
                {...metricsData[timeFrame].newPatients}
                isLoading={isLoading}
              />
              <MetricCard
                {...metricsData[timeFrame].revenue}
                isLoading={isLoading}
              />
              <MetricCard
                {...metricsData[timeFrame].pendingLabOrders}
                isLoading={isLoading}
              />
              <MetricCard
                {...metricsData[timeFrame].lowInventoryItems}
                isLoading={isLoading}
              />
              <MetricCard
                {...metricsData[timeFrame].treatmentsCompleted}
                isLoading={isLoading}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Alerts & Progress Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Alerts & Notifications</h2>

          <AlertCard
            type="warning"
            title="Low Inventory Alert"
            description="7 items are below minimum stock levels and need to be reordered."
            actionText="View inventory"
            actionLink="/dashboard/inventory"
            iconColor="text-amber-600"
          />

          <AlertCard
            type="info"
            title="Appointment Reminder"
            description="You have 3 appointments tomorrow starting at 9:00 AM."
            actionText="View schedule"
            actionLink="/dashboard/appointments"
            iconColor="text-blue-600"
          />

          <AlertCard
            type="error"
            title="Overdue Lab Orders"
            description="2 lab orders are past their due date and need attention."
            actionText="View lab orders"
            actionLink="/dashboard/lab-orders"
            iconColor="text-red-600"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Daily Progress</h2>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <CompletionCard
              title="Today's Appointments"
              progress={5}
              total={8}
              color="text-blue-600"
              icon={Calendar}
            />

            <CompletionCard
              title="Treatment Plans"
              progress={3}
              total={6}
              color="text-purple-600"
              icon={ClipboardList}
            />

            <CompletionCard
              title="Lab Orders"
              progress={2}
              total={4}
              color="text-amber-600"
              icon={ClipboardList}
            />

            <CompletionCard
              title="Documentation"
              progress={7}
              total={8}
              color="text-green-600"
              icon={FileText}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
