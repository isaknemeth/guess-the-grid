import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "@/hooks/use-theme";

const AuthUI = () => {
  const { theme } = useTheme();

  return (
    <div className="w-full max-w-md mx-auto">
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
      />
    </div>
  );
};

export default AuthUI;