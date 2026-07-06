"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "@/components/ui/input-group";

/** Default country dial code prepended to every phone number. */
const DEFAULT_DIAL_CODE = "+91";

interface PhoneInputProps {
  label?: string;
  error?: string;
  /** Full value stored in the form, e.g. "+919876543210" (empty string when blank). */
  value?: string;
  /** Receives the full value with the dial code, or "" when cleared. */
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  id?: string;
  /** Fixed dial-code prefix shown as an addon. Defaults to +91. */
  dialCode?: string;
  /** Max length of the national part (digits after the dial code). */
  maxLength?: number;
  disabled?: boolean;
}

/** Strip the dial-code prefix to get the national digits shown in the field. */
function toNationalNumber(value: string | undefined, dialCode: string) {
  if (!value) return "";
  // Only drop the prefix when it's literally present, so a national number
  // that happens to start with the code's digits is never mangled.
  const national = value.startsWith(dialCode)
    ? value.slice(dialCode.length)
    : value;
  return national.replace(/\D/g, "");
}

export function PhoneInput({
  label,
  error,
  value,
  onChange,
  onBlur,
  placeholder = "XXXXXXXXXX",
  id,
  dialCode = DEFAULT_DIAL_CODE,
  maxLength = 10,
  disabled,
}: PhoneInputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const national = toNationalNumber(value, dialCode);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, maxLength);
    onChange?.(digits ? `${dialCode}${digits}` : "");
  };

  return (
    <div className="w-full">
      {label && (
        <Label className="mb-2" htmlFor={inputId}>
          {label}
        </Label>
      )}
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText className="text-foreground">{dialCode}</InputGroupText>
        </InputGroupAddon>
        <input
          id={inputId}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          data-slot="input-group-control"
          aria-invalid={error ? true : undefined}
          disabled={disabled}
          value={national}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={cn(
            "h-full w-full flex-1 rounded-none border-0 bg-transparent pr-3 text-base outline-none placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          )}
        />
      </InputGroup>
      {error && <p className="text-destructive mt-1 text-sm">{error}</p>}
    </div>
  );
}
