// src/components/auth/AuthProvider.tsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthState, AuthStatus, Session } from "@/lib/auth";
import { UserProfiles } from "@/types/user";

// Mock initial state
const initialState: AuthState = {
  status: "loading",
  session: null,
};

// Create Auth Context
const AuthContext = createContext<{
  status: AuthStatus;
  session: Session | null;
  user: UserProfiles | null;
}>({
  status: initialState.status,
  session: initialState.session,
  user: null,
});

// Auth Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Mock session for demonstration
const mockSession: Session = {
  user: {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    role: "admin",
    businessId: "business-1",
    businessType: "clinic",
    businessName: "Bright Smile Dental",
    avatarUrl: "/avatars/john-doe.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>(initialState);
  const router = useRouter();
  const pathname = usePathname();

  // Simulate fetching session on mount
  useEffect(() => {
    // In a real app, this would call getSession() from NextAuth
    const checkSession = async () => {
      // Simulate an API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // We're mocking a session for the demo
      // Auth routes shouldn't have a session
      if (
        pathname.startsWith("/login") ||
        pathname.startsWith("/signup") ||
        pathname.startsWith("/forgot-password") ||
        pathname.startsWith("/reset-password")
      ) {
        setState({
          status: "unauthenticated",
          session: null,
        });
      } else {
        setState({
          status: "authenticated",
          session: mockSession,
        });
      }
    };

    checkSession();
  }, [pathname]);

  // Auth context value
  const value = {
    status: state.status,
    session: state.session,
    user: state.session?.user || null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
