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
      const response = await fetch(
        "https://ggxraixmbfonvyxltcme.supabase.co/functions/v1/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            to: testEmail,
            subject: "Test Email from Power_Guessr",
            html: `
              <h1>Welcome to Power_Guessr!</h1>
              <p>This is a test email to verify your email settings are working correctly.</p>
              <p>If you received this email, everything is set up properly!</p>
            `,
          }),
        }
      );

      const data = await response.json();
      console.log("Email sending response:", data);

      if (response.ok) {
        toast({
          title: "Test email sent",
          description: "Please check your inbox (and spam folder) for the test email",
        });
      } else {
        throw new Error(data.error || "Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error sending test email",
        description: error.message || "Failed to send email. Please try again.",
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