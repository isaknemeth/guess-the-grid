import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

const AuthUI = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [testEmail, setTestEmail] = useState("");

  const handleTestEmail = async () => {
    if (!testEmail) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(testEmail, {
        redirectTo: window.location.origin,
      });
      
      if (error) {
        toast({
          title: "Error sending test email",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Test email sent",
          description: "Check your email inbox for the password reset link",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to send test email",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
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
        providers={["google"]}
      />
      
      <div className="pt-4 border-t space-y-2">
        <Input
          type="email"
          placeholder="Enter email for testing"
          value={testEmail}
          onChange={(e) => setTestEmail(e.target.value)}
        />
        <Button 
          onClick={handleTestEmail}
          variant="outline"
          className="w-full"
        >
          Send Test Email
        </Button>
      </div>
    </div>
  );
};

export default AuthUI;