"use client";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { OTHER_OPTION_VALUE, isOtherOption } from "@/lib/other-option";

interface MultiSelectProps {
  label?: string;
  options: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  placeholder?: string;
  otherPlaceholder?: string;
}

export default function MultiSelect({
  label,
  options,
  value,
  onChange,
  error,
  placeholder = "Select options...",
  otherPlaceholder = "Please specify",
}: Readonly<MultiSelectProps>) {
  const hasOtherOption = options.some((o) => isOtherOption(o.value));
  const optionValues = new Set(options.map((o) => o.value));

  // The single free-text entry: the sentinel, or a typed value not in the list.
  const customEntry = hasOtherOption
    ? value.find((v) => isOtherOption(v) || !optionValues.has(v))
    : undefined;
  const otherActive = customEntry !== undefined;
  const otherText =
    customEntry && !isOtherOption(customEntry) ? customEntry : "";

  const isSelected = (optionValue: string) =>
    isOtherOption(optionValue) ? otherActive : value.includes(optionValue);

  const toggleOption = (optionValue: string) => {
    if (isOtherOption(optionValue)) {
      if (otherActive) {
        onChange(value.filter((v) => v !== customEntry));
      } else {
        onChange([...value, OTHER_OPTION_VALUE]);
      }
      return;
    }
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const removeOption = (optionValue: string) => {
    onChange(value.filter((v) => v !== optionValue));
  };

  const setOtherText = (text: string) => {
    // Keep the sentinel while empty so validation flags it as required.
    const next = text === "" ? OTHER_OPTION_VALUE : text;
    if (customEntry === undefined) {
      onChange([...value, next]);
    } else {
      onChange(value.map((v) => (v === customEntry ? next : v)));
    }
  };

  // The custom entry is surfaced through the input below, not as a chip.
  const chipValues = value.filter((v) => v !== customEntry);

  return (
    <div className="w-full">
      {label && <Label className="mb-2">{label}</Label>}

      {/* Selected chips */}
      {chipValues.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {chipValues.map((v) => {
            const opt = options.find((o) => o.value === v);
            return (
              <span
                key={v}
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-medium"
              >
                {opt?.label ?? v}
                <button
                  type="button"
                  onClick={() => removeOption(v)}
                  className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="size-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}

      {/* Options grid */}
      <div
        className={cn(
          "flex flex-wrap gap-2 p-3 rounded-xl border border-input bg-input/30 transition-colors",
          error && "border-destructive",
        )}
      >
        {options.length === 0 && (
          <p className="text-sm text-muted-foreground">{placeholder}</p>
        )}
        {options.map((option) => {
          const selected = isSelected(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleOption(option.value)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium border transition-all duration-150",
                selected
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-input hover:border-primary/50 hover:bg-primary/5",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Free-text input shown when "Others" is active */}
      {otherActive && (
        <Input
          className="mt-2"
          placeholder={otherPlaceholder}
          value={otherText}
          onChange={(e) => setOtherText(e.target.value)}
        />
      )}

      {error && <p className="text-destructive mt-1 text-sm">{error}</p>}
    </div>
  );
}
