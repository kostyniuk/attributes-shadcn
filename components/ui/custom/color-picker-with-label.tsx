"use client";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "@/components/ui/input-group"
import React from "react";

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
  placeholder = "000000" 
}: ColorPickerWithLabelProps) {
  // Validate hex (3 or 6 chars)
  const isValidHex = (val: string) => /^[a-fA-F0-9]{3}$|^[a-fA-F0-9]{6}$/.test(val);

  // Track last valid color (stored without '#') to avoid resetting to black while typing
  const [lastValid, setLastValid] = React.useState<string>(() => (isValidHex(value) ? value : "000000"));
  const [isTyping, setIsTyping] = React.useState<boolean>(false);

  // Sync lastValid when external value becomes valid
  React.useEffect(() => {
    if (isValidHex(value)) {
      setLastValid(value);
    }
  }, [value]);

  // Ensure value passed to ColorPicker is always valid with '#'
  const colorPickerValue = `#${isValidHex(value) ? value : lastValid}`;
  
  const handleInputChange = (inputValue: string) => {
    // Remove # if user types it, store without #
    const cleanValue = inputValue.replace('#', '');
    onChange(cleanValue);
    // Update last valid if input becomes valid
    if (isValidHex(cleanValue)) {
      setLastValid(cleanValue);
    }
  };
  
  const handleColorPickerChange = (colorValue: string) => {
    // Color picker returns value with #, remove it for storage
    const cleanValue = colorValue.replace('#', '');
    // Avoid rewriting user input while they are typing
    if (!isTyping) {
      onChange(cleanValue);
      if (isValidHex(cleanValue)) {
        setLastValid(cleanValue);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <InputGroup>
        <InputGroupInput
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
        placeholder={placeholder}
        className="w-24 h-8 text-xs"
      />
        <InputGroupAddon>
                #
        </InputGroupAddon>
      </InputGroup>
      <ColorPicker 
        defaultFormat="hex" 
        value={colorPickerValue}
        onValueChange={handleColorPickerChange}
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