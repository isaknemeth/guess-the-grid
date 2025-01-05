import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "@/hooks/use-theme";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";

const AuthUI = () => {
  const { theme } = useTheme();
  const [error, setError] = useState<string | null>(null);

  const handleAuthError = (error: Error) => {
    if (error.message.includes("weak_password")) {
      setError("Password must be at least 6 characters long");
    } else {
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: 'rgb(147, 51, 234)',
                brandAccent: 'rgb(126, 34, 206)',
              },
            },
          },
        }}
        theme={theme}
        providers={[]}
        localization={{
          variables: {
            sign_up: {
              password_label: 'Password (minimum 6 characters)',
              password_input_placeholder: 'Enter your password (min. 6 characters)',
            },
            sign_in: {
              password_label: 'Your password',
              password_input_placeholder: 'Enter your password',
            },
          },
        }}
        options={{
          onError: handleAuthError
        }}
      />
    </div>
  );
};

export default AuthUI;