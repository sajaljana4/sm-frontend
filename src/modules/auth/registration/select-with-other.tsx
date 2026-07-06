"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OTHER_OPTION_VALUE, isOtherOption } from "@/lib/other-option";

interface Option {
  value: string;
  label: string;
}

interface SelectWithOtherProps {
  label?: string;
  options: Option[];
  /** Stored field value: a known option value, the sentinel, or a typed value. */
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  otherPlaceholder?: string;
  error?: string;
}

/**
 * A single-select dropdown that reveals a text input when the "Others" option
 * is chosen. The typed value is written back into the same field key, so the
 * caller never needs a separate "specify" field.
 */
export default function SelectWithOther({
  label,
  options,
  value,
  onChange,
  placeholder = "Select...",
  otherPlaceholder = "Please specify",
  error,
}: Readonly<SelectWithOtherProps>) {
  const isKnownOption = (v: string) =>
    options.some((o) => o.value === v && !isOtherOption(o.value));

  // "Other" mode is active when the value is the sentinel or a custom typed
  // value that does not match any concrete option.
  const [otherMode, setOtherMode] = useState(
    () => isOtherOption(value) || (value !== "" && !isKnownOption(value)),
  );

  const selectValue = otherMode ? OTHER_OPTION_VALUE : value;
  const otherText = isOtherOption(value) ? "" : value;

  const handleSelect = (next: string) => {
    if (isOtherOption(next)) {
      setOtherMode(true);
      onChange(OTHER_OPTION_VALUE);
    } else {
      setOtherMode(false);
      onChange(next);
    }
  };

  return (
    <div className="w-full">
      {label && <Label className="mb-2">{label}</Label>}
      <Select value={selectValue} onValueChange={handleSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {otherMode && (
        <Input
          className="mt-2"
          placeholder={otherPlaceholder}
          value={otherText}
          onChange={(e) =>
            // Keep the sentinel while empty so validation flags it as required.
            onChange(e.target.value === "" ? OTHER_OPTION_VALUE : e.target.value)
          }
        />
      )}

      {error && <p className="text-destructive mt-1 text-sm">{error}</p>}
    </div>
  );
}
