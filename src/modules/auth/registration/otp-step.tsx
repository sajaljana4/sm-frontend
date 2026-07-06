"use client";

import { Button } from "@/components/ui/button";
import {
  verifyOtpSchemaForRegistration,
  type VerifyOtpSchemaForRegistrationType,
} from "@/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import StepWrapper from "./step-wrapper";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useEffect } from "react";

interface OtpStepProps {
  phone: string;
  onNext: (data: VerifyOtpSchemaForRegistrationType) => void;
  onBack: () => void;
  isLoading?: boolean;
}

export default function OtpStep({
  phone,
  onNext,
  onBack,
  isLoading,
}: Readonly<OtpStepProps>) {
  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpSchemaForRegistrationType>({
    resolver: zodResolver(verifyOtpSchemaForRegistration),
  });

  const otp = watch("otp");

  useEffect(() => {
    setValue("phone", phone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone]);

  return (
    <StepWrapper
      title="VERIFY OTP"
      subtitle={`Enter the 6-digit code sent to ${phone}`}
    >
      <form
        onSubmit={handleSubmit(onNext)}
        className="space-y-5 flex flex-col justify-between items-center w-full"
      >
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          onChange={(value) => {
            setValue("otp", Number(value));
          }}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSeparator />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        {errors.otp?.message && (
          <p className="text-xs text-red-500 text-center">
            {errors.otp?.message}
          </p>
        )}

        <p className="text-xs text-muted-foreground text-center">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            className="text-[#E32C6F] font-medium hover:underline"
          >
            Resend OTP
          </button>
        </p>

        <div className="flex gap-3 w-full">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="flex-1 rounded-full"
            onClick={onBack}
          >
            Back
          </Button>
          <Button
            type="submit"
            size="lg"
            className="flex-1 bg-[#E32C6F] hover:bg-[#c4225e] text-white rounded-full"
            isLoading={isLoading}
            disabled={otp?.toString().length !== 6}
          >
            Verify & Continue
          </Button>
        </div>
      </form>
    </StepWrapper>
  );
}
