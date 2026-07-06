"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  personalDetailsSchema,
  type PersonalDetailsSchemaType,
} from "@/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import StepWrapper from "./step-wrapper";
import {
  PROFILE_FOR_OPTIONS,
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
} from "@/constants/user.constants";

interface PersonalDetailsStepProps {
  defaultValues?: Partial<PersonalDetailsSchemaType>;
  onNext: (data: PersonalDetailsSchemaType) => void;
  onBack: () => void;
}

export default function PersonalDetailsStep({
  defaultValues,
  onNext,
  onBack,
}: Readonly<PersonalDetailsStepProps>) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PersonalDetailsSchemaType>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues,
  });

  return (
    <StepWrapper title="PERSONAL DETAILS" subtitle="Tell us about yourself">
      <form onSubmit={handleSubmit(onNext)} className="space-y-5">
        {/* Profile For */}
        <div className="w-full">
          <Label className="mb-2">Select Matrimony Profile for</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            <Controller
              control={control}
              name="profileFor"
              render={({ field }) => (
                <>
                  {PROFILE_FOR_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => field.onChange(opt.value)}
                      className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-all duration-150 ${
                        field.value === opt.value
                          ? "bg-[#E32C6F] text-white border-[#E32C6F]"
                          : "bg-background text-foreground border-input hover:border-[#E32C6F]/50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </>
              )}
            />
          </div>
          {errors.profileFor && (
            <p className="text-destructive mt-1 text-sm">
              {errors.profileFor.message}
            </p>
          )}
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="First Name"
            placeholder="First name"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <Input
            label="Middle Name"
            placeholder="Middle name (optional)"
            {...register("middleName")}
            error={errors.middleName?.message}
          />
          <Input
            label="Last Name"
            placeholder="Last name"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
        </div>

        {/* Email */}
        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          {...register("email")}
          error={errors.email?.message}
        />

        {/* Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Password"
            type="password"
            placeholder="Create password"
            {...register("password")}
            error={errors.password?.message}
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        </div>

        {/* Gender, DOB & Marital Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="w-full">
            <Label className="mb-2">Gender</Label>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {GENDER_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && (
              <p className="text-destructive mt-1 text-sm">
                {errors.gender.message}
              </p>
            )}
          </div>
          <Input
            label="Date of Birth"
            type="date"
            {...register("dob")}
            error={errors.dob?.message}
          />
          <div className="w-full">
            <Label className="mb-2">Marital Status</Label>
            <Controller
              control={control}
              name="maritalStatus"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {MARITAL_STATUS_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.maritalStatus && (
              <p className="text-destructive mt-1 text-sm">
                {errors.maritalStatus.message}
              </p>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="w-full">
          <Label className="mb-2">Bio</Label>
          <Textarea
            placeholder="Tell us about yourself..."
            rows={3}
            {...register("bio")}
          />
          {errors.bio && (
            <p className="text-destructive mt-1 text-sm">
              {errors.bio.message}
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
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
          >
            Continue
          </Button>
        </div>
      </form>
    </StepWrapper>
  );
}
