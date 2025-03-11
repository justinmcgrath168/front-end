// app/(dashboard)/dashboard/appointments/layout.tsx
import { ReactNode } from "react";

interface AppointmentLayoutProps {
  children: ReactNode;
}

export default function AppointmentLayout({
  children,
}: AppointmentLayoutProps) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
        <p className="text-muted-foreground">
          Schedule, manage, and track patient appointments
        </p>
      </div>

      {children}
    </div>
  );
}
