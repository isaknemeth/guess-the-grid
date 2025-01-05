import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AuthButton from "./AuthButton";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <AuthButton isAuthenticated={isAuthenticated} />
      </div>
      {children}
    </>
  );
};

export default AuthWrapper;