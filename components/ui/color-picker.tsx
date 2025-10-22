"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { Slot } from "@radix-ui/react-slot";
import { PipetteIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useComposedRefs } from "@/lib/compose-refs";
import { cn } from "@/lib/utils";
import { VisuallyHiddenInput } from "@/components/visually-hidden-input";

/**
 * @see https://gist.github.com/bkrmendy/f4582173f50fab209ddfef1377ab31e3
 */
interface EyeDropper {
  open: (options?: { signal?: AbortSignal }) => Promise<{ sRGBHex: string }>;
}

declare global {
  interface Window {
    EyeDropper?: {
      new(): EyeDropper;
    };
  }
}

interface ColorValue {
  r: number;
  g: number;
  b: number;
}

interface HSVColorValue {
  h: number;
  s: number;
  v: number;
}

function hexToRgb(hex: string): ColorValue {
  // Normalize and support both 3-digit and 6-digit hex, with or without '#'
  let normalized = hex.trim().replace(/^#/, "");

  if (/^[a-f\d]{3}$/i.test(normalized)) {
    // Expand short form to full form (e.g., #abc -> #aabbcc)
    normalized = normalized
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const match = /^[a-f\d]{6}$/i.exec(normalized);
  if (!match) {
    return { r: 0, g: 0, b: 0 };
  }

  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

function rgbToHex(color: ColorValue): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
}

function rgbToHsv(color: ColorValue): HSVColorValue {
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  if (diff !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / diff) % 6;
        break;
      case g:
        h = (b - r) / diff + 2;
        break;
      case b:
        h = (r - g) / diff + 4;
        break;
    }
  }
  h = Math.round(h * 60);
  if (h < 0) h += 360;

  const s = max === 0 ? 0 : diff / max;
  const v = max;

  return {
    h,
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

function hsvToRgb(hsv: HSVColorValue): ColorValue {
  const h = hsv.h / 360;
  const s = hsv.s / 100;
  const v = hsv.v / 100;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  let r: number;
  let g: number;
  let b: number;

  switch (i % 6) {
    case 0: {
      r = v;
      g = t;
      b = p;
      break;
    }
    case 1: {
      r = q;
      g = v;
      b = p;
      break;
    }
    case 2: {
      r = p;
      g = v;
      b = t;
      break;
    }
    case 3: {
      r = p;
      g = q;
      b = v;
      break;
    }
    case 4: {
      r = t;
      g = p;
      b = v;
      break;
    }
    case 5: {
      r = v;
      g = p;
      b = q;
      break;
    }
    default: {
      r = 0;
      g = 0;
      b = 0;
    }
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}


type Direction = "ltr" | "rtl";

const DirectionContext = React.createContext<Direction | undefined>(undefined);

function useDirection(dirProp?: Direction): Direction {
  const contextDir = React.useContext(DirectionContext);
  return dirProp ?? contextDir ?? "ltr";
}

function useLazyRef<T>(fn: () => T) {
  const ref = React.useRef<T | null>(null);

  if (ref.current === null) {
    ref.current = fn();
  }

  return ref as React.RefObject<T>;
}

interface ColorPickerStoreState {
  color: ColorValue;
  hsv: HSVColorValue;
  open: boolean;
}

interface ColorPickerStoreCallbacks {
  onColorChange?: (colorString: string) => void;
  onOpenChange?: (open: boolean) => void;
}

interface ColorPickerStore {
  subscribe: (cb: () => void) => () => void;
  getState: () => ColorPickerStoreState;
  setColor: (value: ColorValue) => void;
  setHsv: (value: HSVColorValue) => void;
  setOpen: (value: boolean) => void;
  notify: () => void;
}

function createColorPickerStore(
  listenersRef: React.RefObject<Set<() => void>>,
  stateRef: React.RefObject<ColorPickerStoreState>,
  callbacks?: ColorPickerStoreCallbacks,
): ColorPickerStore {
  const store: ColorPickerStore = {
    subscribe: (cb) => {
      if (listenersRef.current) {
        listenersRef.current.add(cb);
        return () => listenersRef.current?.delete(cb);
      }
      return () => { };
    },
    getState: () =>
      stateRef.current || {
        color: { r: 0, g: 0, b: 0 },
        hsv: { h: 0, s: 0, v: 0 },
        open: false,
      },
    setColor: (value: ColorValue) => {
      if (!stateRef.current) return;
      if (Object.is(stateRef.current.color, value)) return;

      stateRef.current.color = value;

      if (callbacks?.onColorChange) {
        const colorString = rgbToHex(value);
        callbacks.onColorChange(colorString);
      }

      store.notify();
    },
    setHsv: (value: HSVColorValue) => {
      if (!stateRef.current) return;
      if (Object.is(stateRef.current.hsv, value)) return;

      stateRef.current.hsv = value;

      if (callbacks?.onColorChange) {
        const colorValue = hsvToRgb(value);
        const colorString = rgbToHex(colorValue);
        callbacks.onColorChange(colorString);
      }

      store.notify();
    },
    setOpen: (value: boolean) => {
      if (!stateRef.current) return;
      if (Object.is(stateRef.current.open, value)) return;

      stateRef.current.open = value;

      if (callbacks?.onOpenChange) {
        callbacks.onOpenChange(value);
      }

      store.notify();
    },
    notify: () => {
      if (listenersRef.current) {
        for (const cb of listenersRef.current) {
          cb();
        }
      }
    },
  };

  return store;
}

function useColorPickerStoreContext(consumerName: string) {
  const context = React.useContext(ColorPickerStoreContext);
  if (!context) {
    throw new Error(
      `\`${consumerName}\` must be used within \`ColorPickerRoot\``,
    );
  }
  return context;
}

function useColorPickerStore<U>(
  selector: (state: ColorPickerStoreState) => U,
): U {
  const store = useColorPickerStoreContext("useColorPickerStoreSelector");

  const getSnapshot = React.useCallback(
    () => selector(store.getState()),
    [store, selector],
  );

  return React.useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}

interface ColorPickerContextValue {
  dir: Direction;
  disabled?: boolean;
  inline?: boolean;
  readOnly?: boolean;
  required?: boolean;
}

const ColorPickerStoreContext = React.createContext<ColorPickerStore | null>(
  null,
);
const ColorPickerContext = React.createContext<ColorPickerContextValue | null>(
  null,
);

function useColorPickerContext(consumerName: string) {
  const context = React.useContext(ColorPickerContext);
  if (!context) {
    throw new Error(
      `\`${consumerName}\` must be used within \`ColorPickerRoot\``,
    );
  }
  return context;
}

interface ColorPickerRootProps
  extends Omit<React.ComponentProps<"div">, "onValueChange">,
  Pick<
    React.ComponentProps<typeof Popover>,
    "defaultOpen" | "open" | "onOpenChange" | "modal"
  > {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  dir?: Direction;
  name?: string;
  asChild?: boolean;
  disabled?: boolean;
  inline?: boolean;
  readOnly?: boolean;
  required?: boolean;
}

function ColorPickerRoot(props: ColorPickerRootProps) {
  const {
    value: valueProp,
    defaultValue = "#000000",
    onValueChange,
    defaultOpen,
    open: openProp,
    onOpenChange,
    name,
    disabled,
    inline,
    readOnly,
    required,
    ...rootProps
  } = props;

  const initialColor = React.useMemo(() => {
    const colorString = valueProp ?? defaultValue;
    const color = hexToRgb(colorString);

    return {
      color,
      hsv: rgbToHsv(color),
      open: openProp ?? defaultOpen ?? false,
    };
  }, [
    valueProp,
    defaultValue,
    openProp,
    defaultOpen,
  ]);

  const stateRef = useLazyRef(() => initialColor);
  const listenersRef = useLazyRef(() => new Set<() => void>());

  const storeCallbacks = React.useMemo<ColorPickerStoreCallbacks>(
    () => ({
      onColorChange: onValueChange,
      onOpenChange: onOpenChange,
    }),
    [onValueChange, onOpenChange],
  );

  const store = React.useMemo(
    () => createColorPickerStore(listenersRef, stateRef, storeCallbacks),
    [listenersRef, stateRef, storeCallbacks],
  );

  return (
    <ColorPickerStoreContext.Provider value={store}>
      <ColorPickerRootImpl
        {...rootProps}
        value={valueProp}
        defaultOpen={defaultOpen}
        open={openProp}
        onOpenChange={onOpenChange}
        name={name}
        disabled={disabled}
        inline={inline}
        readOnly={readOnly}
        required={required}
      />
    </ColorPickerStoreContext.Provider>
  );
}

type ColorPickerRootImplProps = Omit<
  ColorPickerRootProps,
  | "defaultValue"
  | "onValueChange"
>;

function ColorPickerRootImpl(props: ColorPickerRootImplProps) {
  const {
    value: valueProp,
    dir: dirProp,
    defaultOpen,
    onOpenChange,
    name,
    ref,
    asChild,
    disabled,
    inline,
    modal,
    readOnly,
    required,
    ...rootProps
  } = props;

  const store = useColorPickerStoreContext("ColorPickerRootImpl");

  const dir = useDirection(dirProp);

  const [formTrigger, setFormTrigger] = React.useState<HTMLDivElement | null>(
    null,
  );
  const composedRef = useComposedRefs(ref, (node) => setFormTrigger(node));

  const isFormControl = formTrigger ? !!formTrigger.closest("form") : true;

  React.useEffect(() => {
    if (valueProp !== undefined) {
      const currentState = store.getState();
      const color = hexToRgb(valueProp);
      const hsv = rgbToHsv(color);

      // Only update if the color has actually changed to prevent infinite loops
      const currentColorHex = rgbToHex(currentState.color);
      const newColorHex = rgbToHex(color);

      if (currentColorHex !== newColorHex) {
        store.setColor(color);
        store.setHsv(hsv);
      }
    }
  }, [valueProp, store]);

  // React.useEffect(() => {
  //   if (openProp !== undefined) {
  //     store.setOpen(openProp);
  //   }
  // }, [openProp, store]);

  const contextValue = React.useMemo<ColorPickerContextValue>(
    () => ({
      dir,
      disabled,
      inline,
      readOnly,
      required,
    }),
    [dir, disabled, inline, readOnly, required],
  );

  const value = useColorPickerStore((state) => rgbToHex(state.color));

  const open = useColorPickerStore((state) => state.open);

  const onPopoverOpenChange = React.useCallback(
    (newOpen: boolean) => {
      store.setOpen(newOpen);
      onOpenChange?.(newOpen);
    },
    [store, onOpenChange],
  );

  const RootPrimitive = asChild ? Slot : "div";

  if (inline) {
    return (
      <ColorPickerContext.Provider value={contextValue}>
        <RootPrimitive {...rootProps} ref={composedRef} />
        {isFormControl && (
          <VisuallyHiddenInput
            type="hidden"
            control={formTrigger}
            name={name}
            value={value}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
          />
        )}
      </ColorPickerContext.Provider>
    );
  }

  return (
    <ColorPickerContext.Provider value={contextValue}>
      <Popover
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onPopoverOpenChange}
        modal={modal}
      >
        <RootPrimitive {...rootProps} ref={composedRef} />
        {isFormControl && (
          <VisuallyHiddenInput
            type="hidden"
            control={formTrigger}
            name={name}
            value={value}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
          />
        )}
      </Popover>
    </ColorPickerContext.Provider>
  );
}

type ColorPickerTriggerProps = React.ComponentProps<typeof PopoverTrigger>;

function ColorPickerTrigger(props: ColorPickerTriggerProps) {
  const { asChild, ...triggerProps } = props;
  const context = useColorPickerContext("ColorPickerTrigger");

  const TriggerPrimitive = asChild ? Slot : Button;

  return (
    <PopoverTrigger asChild disabled={context.disabled}>
      <TriggerPrimitive data-slot="color-picker-trigger" {...triggerProps} />
    </PopoverTrigger>
  );
}

type ColorPickerContentProps = React.ComponentProps<typeof PopoverContent>;

function ColorPickerContent(props: ColorPickerContentProps) {
  const { asChild, className, children, ...popoverContentProps } = props;
  const context = useColorPickerContext("ColorPickerContent");

  if (context.inline) {
    const ContentPrimitive = asChild ? Slot : "div";

    return (
      <ContentPrimitive
        data-slot="color-picker-content"
        {...popoverContentProps}
        className={cn("flex w-[340px] flex-col gap-4 p-4", className)}
      >
        {children}
      </ContentPrimitive>
    );
  }

  return (
    <PopoverContent
      data-slot="color-picker-content"
      asChild={asChild}
      {...popoverContentProps}
      className={cn("flex w-[340px] flex-col gap-4 p-4", className)}
    >
      {children}
    </PopoverContent>
  );
}

interface ColorPickerAreaProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

function ColorPickerArea(props: ColorPickerAreaProps) {
  const { asChild, className, ref, ...areaProps } = props;
  const context = useColorPickerContext("ColorPickerArea");
  const store = useColorPickerStoreContext("ColorPickerArea");

  const hsv = useColorPickerStore((state) => state.hsv);

  const isDraggingRef = React.useRef(false);
  const areaRef = React.useRef<HTMLDivElement>(null);
  const composedRef = useComposedRefs(ref, areaRef);

  const updateColorFromPosition = React.useCallback(
    (clientX: number, clientY: number) => {
      if (!areaRef.current) return;

      const rect = areaRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const y = Math.max(
        0,
        Math.min(1, 1 - (clientY - rect.top) / rect.height),
      );

      const newHsv: HSVColorValue = {
        h: hsv?.h ?? 0,
        s: Math.round(x * 100),
        v: Math.round(y * 100),
      };

      store.setHsv(newHsv);
      store.setColor(hsvToRgb(newHsv));
    },
    [hsv, store],
  );

  const onPointerDown = React.useCallback(
    (event: React.PointerEvent) => {
      if (context.disabled) return;

      isDraggingRef.current = true;
      areaRef.current?.setPointerCapture(event.pointerId);
      updateColorFromPosition(event.clientX, event.clientY);
    },
    [context.disabled, updateColorFromPosition],
  );

  const onPointerMove = React.useCallback(
    (event: React.PointerEvent) => {
      if (isDraggingRef.current) {
        updateColorFromPosition(event.clientX, event.clientY);
      }
    },
    [updateColorFromPosition],
  );

  const onPointerUp = React.useCallback((event: React.PointerEvent) => {
    isDraggingRef.current = false;
    areaRef.current?.releasePointerCapture(event.pointerId);
  }, []);

  const hue = hsv?.h ?? 0;
  const backgroundHue = hsvToRgb({ h: hue, s: 100, v: 100 });

  const AreaPrimitive = asChild ? Slot : "div";

  return (
    <AreaPrimitive
      data-slot="color-picker-area"
      {...areaProps}
      className={cn(
        "relative h-40 w-full cursor-crosshair touch-none rounded-sm border",
        context.disabled && "pointer-events-none opacity-50",
        className,
      )}
      ref={composedRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div className="absolute inset-0 overflow-hidden rounded-sm">
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: `rgb(${backgroundHue.r}, ${backgroundHue.g}, ${backgroundHue.b})`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, #fff, transparent)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent, #000)",
          }}
        />
      </div>
      <div
        className="-translate-x-1/2 -translate-y-1/2 absolute size-3 rounded-full border-2 border-white shadow-sm"
        style={{
          left: `${hsv?.s ?? 0}%`,
          top: `${100 - (hsv?.v ?? 0)}%`,
        }}
      />
    </AreaPrimitive>
  );
}

type ColorPickerHueSliderProps = React.ComponentProps<typeof SliderPrimitive.Root>;

function ColorPickerHueSlider(props: ColorPickerHueSliderProps) {
  const { className, ...sliderProps } = props;
  const context = useColorPickerContext("ColorPickerHueSlider");
  const store = useColorPickerStoreContext("ColorPickerHueSlider");

  const hsv = useColorPickerStore((state) => state.hsv);

  const onValueChange = React.useCallback(
    (values: number[]) => {
      const newHsv: HSVColorValue = {
        h: values[0] ?? 0,
        s: hsv?.s ?? 0,
        v: hsv?.v ?? 0,
      };
      store.setHsv(newHsv);
      store.setColor(hsvToRgb(newHsv));
    },
    [hsv, store],
  );

  return (
    <SliderPrimitive.Root
      data-slot="color-picker-hue-slider"
      {...sliderProps}
      max={360}
      step={1}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className,
      )}
      value={[hsv?.h ?? 0]}
      onValueChange={onValueChange}
      disabled={context.disabled}
    >
      <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden rounded-full bg-[linear-gradient(to_right,#ff0000_0%,#ffff00_16.66%,#00ff00_33.33%,#00ffff_50%,#0000ff_66.66%,#ff00ff_83.33%,#ff0000_100%)]">
        <SliderPrimitive.Range className="absolute h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block size-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
}


interface ColorPickerSwatchProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

function ColorPickerSwatch(props: ColorPickerSwatchProps) {
  const { asChild, className, ...swatchProps } = props;
  const context = useColorPickerContext("ColorPickerSwatch");

  const color = useColorPickerStore((state) => state.color);

  const backgroundStyle = React.useMemo(() => {
    if (!color) {
      return {
        background:
          "linear-gradient(to bottom right, transparent calc(50% - 1px), hsl(var(--destructive)) calc(50% - 1px) calc(50% + 1px), transparent calc(50% + 1px)) no-repeat",
      };
    }

    const colorString = `rgb(${color.r}, ${color.g}, ${color.b})`;

    return {
      backgroundColor: colorString,
    };
  }, [color]);

  const ariaLabel = !color
    ? "No color selected"
    : `Current color: ${rgbToHex(color)}`;

  const SwatchPrimitive = asChild ? Slot : "div";

  return (
    <SwatchPrimitive
      role="img"
      aria-label={ariaLabel}
      data-slot="color-picker-swatch"
      {...swatchProps}
      className={cn(
        "box-border size-8 rounded-sm border shadow-sm",
        context.disabled && "opacity-50",
        className,
      )}
      style={{
        ...backgroundStyle,
        forcedColorAdjust: "none",
      }}
    />
  );
}

type ColorPickerEyeDropperProps = React.ComponentProps<typeof Button>;

function ColorPickerEyeDropper(props: ColorPickerEyeDropperProps) {
  const { children, size, ...buttonProps } = props;
  const context = useColorPickerContext("ColorPickerEyeDropper");
  const store = useColorPickerStoreContext("ColorPickerEyeDropper");

  const onEyeDropper = React.useCallback(async () => {
    if (!window.EyeDropper) return;

    try {
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();

      if (result.sRGBHex) {
        const newColor = hexToRgb(result.sRGBHex);
        const newHsv = rgbToHsv(newColor);
        store.setColor(newColor);
        store.setHsv(newHsv);
      }
    } catch (error) {
      console.warn("EyeDropper error:", error);
    }
  }, [store]);

  const hasEyeDropper = typeof window !== "undefined" && !!window.EyeDropper;

  if (!hasEyeDropper) return null;

  const buttonSize = size ?? (children ? "default" : "icon");

  return (
    <Button
      data-slot="color-picker-eye-dropper"
      {...buttonProps}
      variant="outline"
      size={buttonSize}
      onClick={onEyeDropper}
      disabled={context.disabled}
    >
      {children ?? <PipetteIcon />}
    </Button>
  );
}



export {
  ColorPickerRoot as ColorPicker,
  ColorPickerTrigger,
  ColorPickerContent,
  ColorPickerArea,
  ColorPickerHueSlider,
  ColorPickerSwatch,
  ColorPickerEyeDropper,
  //
  ColorPickerRoot as Root,
  ColorPickerTrigger as Trigger,
  ColorPickerContent as Content,
  ColorPickerArea as Area,
  ColorPickerHueSlider as HueSlider,
  ColorPickerSwatch as Swatch,
  ColorPickerEyeDropper as EyeDropper,
  //
  useColorPickerStore as useColorPicker,
};
