import { cn } from "@/lib/utils";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  // Simple password strength calculation
  const getStrength = (password: string): number => {
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return Math.min(strength, 4);
  };

  const strength = password ? getStrength(password) : 0;

  const getLabel = (strength: number): string => {
    if (password.length === 0) return "";
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  const getColor = (strength: number): string => {
    if (password.length === 0) return "bg-gray-200";
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-red-500";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-green-500";
    return "bg-green-500";
  };

  return (
    <div className="mt-2">
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-full w-1/4 transition-all duration-300",
              i < strength ? getColor(strength) : "bg-gray-200"
            )}
          />
        ))}
      </div>
      {password && (
        <p
          className={cn(
            "mt-1 text-xs",
            strength <= 1
              ? "text-red-500"
              : strength === 2
              ? "text-yellow-500"
              : "text-green-500"
          )}
        >
          {getLabel(strength)}
        </p>
      )}
    </div>
  );
}
