"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import React from "react";

import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerEyeDropper,
  ColorPickerHueSlider,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from "@/components/ui/color-picker";

interface ColorPickerWithLabelProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  invalid?: boolean;
}

const isValidHex = (val: string) => /^[a-fA-F0-9]{6}$/.test(val);

const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export function ColorPickerWithLabel({
  value,
  onChange,
  onBlur,
  placeholder = "000000",
  invalid = false
}: ColorPickerWithLabelProps) {
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
    const cleanValue = inputValue.replace('#', '');
    onChange(cleanValue);
    if (isValidHex(cleanValue)) {
      setLastValid(cleanValue);
    }
  };

  const handleColorPickerChange = debounce((colorValue: string) => {
    // Color picker returns value with #, remove it for storage
    const cleanValue = colorValue.replace('#', '');
    // Avoid rewriting user input while they are typing
    if (!isTyping) {
      onChange(cleanValue);
      if (isValidHex(cleanValue)) {
        setLastValid(cleanValue);
      }
    }
  }, 100);

  return (
    <div className="flex items-center gap-2">
      <InputGroup>
        <InputGroupInput
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsTyping(true)}
          onBlur={() => {
            setIsTyping(false);
            if (onBlur) {
              onBlur();
            }
          }}
          aria-invalid={invalid}
          placeholder={placeholder}
          className="w-24 h-8 text-xs"
        />
        <InputGroupAddon>
          #
        </InputGroupAddon>
      </InputGroup>
      <ColorPicker
        value={colorPickerValue}
        onValueChange={handleColorPickerChange}
        onOpenChange={(open) => {
          if (!open && onBlur) {
            onBlur();
          }
        }}
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
            </div>
          </div>
        </ColorPickerContent>
      </ColorPicker>
    </div>
  );
}