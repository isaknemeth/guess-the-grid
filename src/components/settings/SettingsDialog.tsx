import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SettingsDialogProps {
  showDistances: boolean;
  setShowDistances: (show: boolean) => void;
  showDirections: boolean;
  setShowDirections: (show: boolean) => void;
}

const SettingsDialog = ({
  showDistances,
  setShowDistances,
  showDirections,
  setShowDirections,
}: SettingsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Game Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="show-distances" className="text-sm">
              Show Distances
            </Label>
            <Switch
              id="show-distances"
              checked={showDistances}
              onCheckedChange={setShowDistances}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="show-directions" className="text-sm">
              Show Directions
            </Label>
            <Switch
              id="show-directions"
              checked={showDirections}
              onCheckedChange={setShowDirections}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;