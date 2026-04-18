"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useSetting } from "@/hooks/use-setting";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";

export const SettingModal = () => {
  const setting = useSetting();

  return (
    <Dialog open={setting.isOpen} onOpenChange={setting.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <DialogTitle className="text-lg font-medium">My Settings</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-1">
          <label>Appearance</label>
          <span className="text-[0.8rem] text-muted-foreground">
            Customize how jotion looks on your device
          </span>
        </div>
        <ModeToggle />
      </DialogContent>
    </Dialog>
  );
};
