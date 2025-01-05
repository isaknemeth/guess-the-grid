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
      <div className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-sm border-b z-50">
        <div className="container h-full max-w-5xl mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
            Power_Guessr
          </h1>
          <AuthButton isAuthenticated={isAuthenticated} />
        </div>
      </div>
      <div className="pt-16">
        {children}
      </div>
    </>
  );
};

export default AuthWrapper;