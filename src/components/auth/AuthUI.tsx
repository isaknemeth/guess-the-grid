import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const AuthUI = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [testEmail, setTestEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleTestEmail = async () => {
    if (!testEmail) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    try {
      console.log("Sending reset email to:", testEmail);
      const { error, data } = await supabase.auth.resetPasswordForEmail(testEmail, {
        redirectTo: window.location.origin,
      });
      
      console.log("Response data:", data);
      
      if (error) {
        console.error("Supabase error:", error);
        toast({
          title: "Error sending test email",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Test email sent",
          description: "Check your email inbox (and spam folder) for the password reset link",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to send test email. Please check the console for more details.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
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
          disabled={isSending}
        />
        <Button 
          onClick={handleTestEmail}
          variant="outline"
          className="w-full"
          disabled={isSending}
        >
          {isSending ? "Sending..." : "Send Test Email"}
        </Button>
      </div>
    </div>
  );
};

export default AuthUI;