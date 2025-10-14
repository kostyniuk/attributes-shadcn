"use client";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "@/components/ui/input-group"

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
      <InputGroup>
        <InputGroupInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-24 h-8 text-xs"
      />
        <InputGroupAddon>
                #
        </InputGroupAddon>
      </InputGroup>
      <ColorPicker 
        defaultFormat="hex" 
        value={value}
        onValueChange={(val) => onChange(val.replace('#', ''))}
      >
        <ColorPickerTrigger asChild>
          <ColorPickerSwatch className="w-8 h-8" />
        </ColorPickerTrigger>
        <ColorPickerContent>
          <ColorPickerArea />
          <div className="flex items-center gap-2">
            <ColorPickerFormatSelect />
            <ColorPickerInput />
          </div>
        </ColorPickerContent>
      </ColorPicker>
    </div>
  );
}