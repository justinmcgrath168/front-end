// hooks/useUserRole.ts

import { useState, useEffect } from "react";

// Possible roles as a TypeScript union type
export type UserRole =
  | "clinic"
  | "lab"
  | "imaging"
  | "supplier"
  | "admin"
  | "unknown";

export const useUserRole = () => {
  const [role, setRole] = useState<UserRole>("unknown");

  useEffect(() => {
    // Simulate fetching user role (replace this with real API call)
    const fetchUserRole = async () => {
      try {
        // Replace this with your actual fetch call
        const response = await fetch("/api/user-role");
        if (!response.ok) {
          throw new Error("Failed to fetch user role");
        }

        const data = await response.json();

        // Validate the role against known roles
        const validRoles: UserRole[] = [
          "clinic",
          "lab",
          "imaging",
          "supplier",
          "admin",
        ];
        if (validRoles.includes(data.role)) {
          setRole(data.role);
        } else {
          setRole("unknown");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setRole("unknown");
      }
    };

    fetchUserRole();
  }, []);

  return { role };
};
