import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AuthUI from "./AuthUI";
import { supabase } from "@/integrations/supabase/client";
import UserStats from "./UserStats";

const AuthButton = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const [showStats, setShowStats] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    }
    // Close the dialog after logout
    setShowStats(false);
  };

  if (isAuthenticated) {
    return (
      <>
        <Dialog open={showStats} onOpenChange={setShowStats}>
          <DialogTrigger asChild>
            <Button variant="outline">
              Stats
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
            <UserStats />
          </DialogContent>
        </Dialog>
        <Button 
          variant="outline" 
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Log in
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <AuthUI />
      </DialogContent>
    </Dialog>
  );
};

export default AuthButton;