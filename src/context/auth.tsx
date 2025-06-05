// Runtime imports
import { createContext, useState, useContext } from "react";
// type import
import type { ReactNode } from "react";

// Define the type for your session data

type User = {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
};

type Session = {
  // user: User | null;
  // token: string | null;
  user: User | null; // Temporary, replace with actual user type
} | null;

// Define the context type
type AuthContextType = {
  session: Session;
  setSession: (session: Session) => void;
};

// Create context with initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define props for AuthContextProvider
type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  // add a state with proper typing
  const [session, setSession] = useState<Session>(null);

  // return the created authContext
  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

// function to use user context (renamed from userAuth to useAuth for convention)
export const userAuth = () => {
  /**
   * Custom hook to access the authentication context.
   **/
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
