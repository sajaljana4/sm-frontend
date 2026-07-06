"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FAMILY_STATUS_OPTIONS,
  FAMILY_CLASS_OPTIONS,
  FAMILY_TYPE_OPTIONS,
  DIET_OPTIONS,
} from "@/constants/user.constants";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth.service";
import {
  familyInfoSchema,
  type FamilyInfoSchemaType,
} from "@/validators/auth.schema";
import ProfileSectionShell from "../profile-section-shell";

export default function FamilySection() {
  const { profile, setProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const dv = profile?.familyInformation;
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FamilyInfoSchemaType>({
    resolver: zodResolver(familyInfoSchema),
    defaultValues: {
      familyInformation: {
        fatherStatus: dv?.fatherStatus ?? "",
        motherStatus: dv?.motherStatus ?? "",
        familyClass: dv?.familyClass ?? "",
        familyType: dv?.familyType ?? "",
        foodType: dv?.foodType ?? "",
        parentsMobileNumber: dv?.parentsMobileNumber ?? "",
        alternateNumber: dv?.alternateNumber ?? "",
        numberOfBrothers: dv?.numberOfBrothers ?? 0,
        numberOfSisters: dv?.numberOfSisters ?? 0,
        numberOfBrothersMarried: dv?.numberOfBrothersMarried ?? 0,
        numberOfSistersMarried: dv?.numberOfSistersMarried ?? 0,
        familyLocationSameAsProfile: dv?.familyLocationSameAsProfile ?? false,
        familyLocation: dv?.familyLocation ?? "",
        familyAncestralOrigin: dv?.familyAncestralOrigin ?? "",
      },
    },
  });

  const fe = errors.familyInformation;
  const sameAsProfile = watch("familyInformation.familyLocationSameAsProfile");

  const renderSelect = (
    name: keyof FamilyInfoSchemaType["familyInformation"],
    label: string,
    options: { value: string; label: string }[],
  ) => (
    <div className="w-full">
      <Label className="mb-2">{label}</Label>
      <Controller
        control={control}
        name={`familyInformation.${name}`}
        render={({ field }) => (
          <Select value={field.value as string} onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {fe?.[name] && (
        <p className="text-destructive mt-1 text-sm">
          {(fe[name] as { message?: string })?.message}
        </p>
      )}
    </div>
  );

  const onSubmit = async (data: FamilyInfoSchemaType) => {
    try {
      setLoading(true);
      const res = await authService.updateProfile(data);
      if (res.statusCode >= 400) throw new Error(res.message);
      setProfile(res.data);
      toast.success("Family information updated");
    } catch (error) {
      toast.error((error as Error).message ?? "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileSectionShell
      title="Family Information"
      description="Details about your family."
      isLoading={loading}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderSelect("fatherStatus", "Father's Status", FAMILY_STATUS_OPTIONS)}
        {renderSelect("motherStatus", "Mother's Status", FAMILY_STATUS_OPTIONS)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderSelect("familyClass", "Family Class", FAMILY_CLASS_OPTIONS)}
        {renderSelect("familyType", "Family Type", FAMILY_TYPE_OPTIONS)}
        {renderSelect("foodType", "Family Food Type", DIET_OPTIONS)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="familyInformation.parentsMobileNumber"
          render={({ field }) => (
            <PhoneInput
              label="Parent's Mobile"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fe?.parentsMobileNumber?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="familyInformation.alternateNumber"
          render={({ field }) => (
            <PhoneInput
              label="Alternate Number"
              placeholder="XXXXXXXXXX (optional)"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fe?.alternateNumber?.message}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Controller
          control={control}
          name="familyInformation.numberOfBrothers"
          render={({ field }) => (
            <Input
              label="Brothers"
              type="number"
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
              error={fe?.numberOfBrothers?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="familyInformation.numberOfSisters"
          render={({ field }) => (
            <Input
              label="Sisters"
              type="number"
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
              error={fe?.numberOfSisters?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="familyInformation.numberOfBrothersMarried"
          render={({ field }) => (
            <Input
              label="Brothers Married"
              type="number"
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
              error={fe?.numberOfBrothersMarried?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="familyInformation.numberOfSistersMarried"
          render={({ field }) => (
            <Input
              label="Sisters Married"
              type="number"
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
              error={fe?.numberOfSistersMarried?.message}
            />
          )}
        />
      </div>

      <Controller
        control={control}
        name="familyInformation.familyLocationSameAsProfile"
        render={({ field }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              id="familyLocation"
            />
            <Label htmlFor="familyLocation" className="cursor-pointer">
              Family location is same as my profile
            </Label>
          </div>
        )}
      />

      {!sameAsProfile && (
        <Input
          label="Family Location"
          placeholder="e.g. Cuttack, Odisha"
          {...register("familyInformation.familyLocation")}
          error={fe?.familyLocation?.message}
        />
      )}

      <Input
        label="Family Ancestral Origin (optional)"
        placeholder="e.g. Puri, Odisha"
        {...register("familyInformation.familyAncestralOrigin")}
        error={fe?.familyAncestralOrigin?.message}
      />
    </ProfileSectionShell>
  );
}
