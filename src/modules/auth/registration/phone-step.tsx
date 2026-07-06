"use client";

import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  getOtpSchemaForRegistration,
  type GetOtpSchemaForRegistrationType,
} from "@/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import StepWrapper from "./step-wrapper";

interface PhoneStepProps {
  defaultValues?: Partial<GetOtpSchemaForRegistrationType>;
  onNext: (data: GetOtpSchemaForRegistrationType) => void;
  isLoading?: boolean;
}

export default function PhoneStep({
  defaultValues,
  onNext,
  isLoading,
}: Readonly<PhoneStepProps>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GetOtpSchemaForRegistrationType>({
    resolver: zodResolver(getOtpSchemaForRegistration),
    defaultValues: {
      phone: defaultValues?.phone ?? "",
    },
  });

  return (
    <StepWrapper
      title="CREATE ACCOUNT"
      subtitle="Your partner search begins with a FREE REGISTRATION!"
    >
      <form onSubmit={handleSubmit(onNext)} className="space-y-5">
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <PhoneInput
              label="Phone Number"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.phone?.message}
            />
          )}
        />
        <p className="text-xs text-muted-foreground">
          We will send an OTP to this number for verification.
        </p>
        <Button
          type="submit"
          size="lg"
          className="w-full bg-[#E32C6F] hover:bg-[#c4225e] text-white rounded-full"
          isLoading={isLoading}
        >
          Send OTP
        </Button>
      </form>
    </StepWrapper>
  );
}
