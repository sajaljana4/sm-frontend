"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EMPLOYMENT_OPTIONS,
  QUALIFICATION_OPTIONS,
  INCOME_RANGE_OPTIONS,
} from "@/constants/user.constants";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth.service";
import {
  educationOccupationSchema,
  type EducationOccupationSchemaType,
} from "@/validators/auth.schema";
import SelectWithOther from "@/modules/auth/registration/select-with-other";
import ProfileSectionShell from "../profile-section-shell";

export default function EducationSection() {
  const { profile, setProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EducationOccupationSchemaType>({
    resolver: zodResolver(educationOccupationSchema),
    defaultValues: {
      education: {
        highestQualification: profile?.education?.highestQualification ?? "",
        yearOfPassing:
          profile?.education?.yearOfPassing ??
          (undefined as unknown as number),
      },
      occupation: {
        employedIn: profile?.occupation?.employedIn ?? "",
        annualIncome: profile?.occupation?.annualIncome ?? "",
      },
    },
  });

  const onSubmit = async (data: EducationOccupationSchemaType) => {
    try {
      setLoading(true);
      const res = await authService.updateProfile(data);
      if (res.statusCode >= 400) throw new Error(res.message);
      setProfile(res.data);
      toast.success("Education & occupation updated");
    } catch (error) {
      toast.error((error as Error).message ?? "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileSectionShell
      title="Education & Occupation"
      description="Your education and professional details."
      isLoading={loading}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="font-semibold text-foreground">Education</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="education.highestQualification"
          render={({ field }) => (
            <SelectWithOther
              label="Highest Qualification"
              options={QUALIFICATION_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select qualification"
              otherPlaceholder="Specify qualification"
              error={errors.education?.highestQualification?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="education.yearOfPassing"
          render={({ field }) => (
            <Input
              label="Year of Passing"
              type="number"
              placeholder="e.g. 2017"
              value={field.value ?? ""}
              onChange={(e) =>
                field.onChange(
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
              error={errors.education?.yearOfPassing?.message}
            />
          )}
        />
      </div>

      <h3 className="font-semibold text-foreground pt-2">Occupation</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full">
          <Label className="mb-2">Employed In</Label>
          <Controller
            control={control}
            name="occupation.employedIn"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  {EMPLOYMENT_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.occupation?.employedIn && (
            <p className="text-destructive mt-1 text-sm">
              {errors.occupation.employedIn.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <Label className="mb-2">Annual Income</Label>
          <Controller
            control={control}
            name="occupation.annualIncome"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select income range" />
                </SelectTrigger>
                <SelectContent>
                  {INCOME_RANGE_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.occupation?.annualIncome && (
            <p className="text-destructive mt-1 text-sm">
              {errors.occupation.annualIncome.message}
            </p>
          )}
        </div>
      </div>
    </ProfileSectionShell>
  );
}
