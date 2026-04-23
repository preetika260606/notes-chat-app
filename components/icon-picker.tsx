"use client";

import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface IconPickerProps {
  onChange: (icon: string) => void;
  children: React.ReactNode;
  asChild?: boolean;
}

export const IconPicker = ({
  onChange,
  children,
  asChild = false,
}: IconPickerProps) => {
  const { resolvedTheme } = useTheme();

  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };

  const currentTheme =
    (resolvedTheme as keyof typeof themeMap) || "light";

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>
        {children}
      </PopoverTrigger>

      <PopoverContent className="p-0 w-full border-none shadow-none">
        <EmojiPicker
          height={350}
          theme={themeMap[currentTheme]}
          onEmojiClick={(data) => {
            console.log("Selected:", data.emoji); // 👈 debug
            onChange(data.emoji);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};