"use client";

import {
    ColorPicker,
    ColorPickerAlphaSlider,
    ColorPickerArea,
    ColorPickerContent,
    ColorPickerEyeDropper,
    ColorPickerFormatSelect,
    ColorPickerHueSlider,
    ColorPickerInput,
    ColorPickerSwatch,
    ColorPickerTrigger,
  } from "@/components/ui/color-picker";
import { Input } from "@/components/ui/input";

interface ColorPickerWithLabelProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ColorPickerWithLabel({ 
  value, 
  onChange,
  placeholder = "#000000" 
}: ColorPickerWithLabelProps) {
  return (
    <div className="flex items-center gap-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-24 h-8 text-xs"
      />
      <ColorPicker 
        defaultFormat="hex" 
        value={value}
        onValueChange={onChange}
      >
        <ColorPickerTrigger asChild>
          <ColorPickerSwatch className="w-8 h-8" />
        </ColorPickerTrigger>
        <ColorPickerContent>
          <ColorPickerArea />
          <div className="flex items-center gap-2">
            <ColorPickerEyeDropper />
            <div className="flex flex-1 flex-col gap-2">
              <ColorPickerHueSlider />
              <ColorPickerAlphaSlider />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ColorPickerFormatSelect />
            <ColorPickerInput />
          </div>
        </ColorPickerContent>
      </ColorPicker>
    </div>
  );
}