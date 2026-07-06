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
  MARITAL_STATUS_OPTIONS,
  EDUCATION_LEVEL_OPTIONS,
  EMPLOYMENT_OPTIONS,
  INCOME_RANGE_OPTIONS_FOR_PARTNER,
  PHYSICAL_STATUS_OPTIONS,
  DIET_OPTIONS,
  DRINKING_OPTIONS,
  SMOKING_OPTIONS,
  RELIGION_OPTIONS_FOR_PARTNER,
  MOTHER_TONGUE_OPTIONS,
  CASTE_OPTIONS,
  MANGLIK_OPTIONS,
} from "@/constants/user.constants";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth.service";
import {
  partnerPreferenceSchema,
  type PartnerPreferenceSchemaType,
} from "@/validators/auth.schema";
import MultiSelect from "@/modules/auth/registration/multi-select";
import ProfileSectionShell from "../profile-section-shell";

export default function PartnerPreferenceSection() {
  const { profile, setProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const pp = profile?.partnerPreference;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PartnerPreferenceSchemaType>({
    resolver: zodResolver(partnerPreferenceSchema),
    defaultValues: {
      partnerPreference: {
        preferredAgeMin:
          pp?.preferredAgeMin ?? (undefined as unknown as number),
        preferredAgeMax:
          pp?.preferredAgeMax ?? (undefined as unknown as number),
        maritalStatus: pp?.maritalStatus ?? [],
        preferredHeightMin:
          pp?.preferredHeightMin ?? (undefined as unknown as number),
        preferredHeightMax:
          pp?.preferredHeightMax ?? (undefined as unknown as number),
        preferredEducation: pp?.preferredEducation ?? [],
        employedIn: pp?.employedIn ?? [],
        annualIncome: pp?.annualIncome ?? [],
        physicalStatus: pp?.physicalStatus ?? [],
        eatingHabits: pp?.eatingHabits ?? [],
        drinkingHabits: pp?.drinkingHabits ?? "",
        smokingHabits: pp?.smokingHabits ?? "",
        religion: pp?.religion ?? [],
        motherTongue: pp?.motherTongue ?? [],
        caste: pp?.caste ?? [],
        manglik: pp?.manglik ?? "",
      },
    },
  });

  const pe = errors.partnerPreference;

  const onSubmit = async (data: PartnerPreferenceSchemaType) => {
    try {
      setLoading(true);
      const res = await authService.updateProfile(data);
      if (res.statusCode >= 400) throw new Error(res.message);
      setProfile(res.data);
      toast.success("Partner preferences updated");
    } catch (error) {
      toast.error((error as Error).message ?? "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileSectionShell
      title="Partner Preferences"
      description="What you're looking for in a partner."
      isLoading={loading}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Controller
          control={control}
          name="partnerPreference.preferredAgeMin"
          render={({ field }) => (
            <Input
              label="Min Age"
              type="number"
              placeholder="e.g. 22"
              value={field.value ?? ""}
              onChange={(e) =>
                field.onChange(
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
              error={pe?.preferredAgeMin?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="partnerPreference.preferredAgeMax"
          render={({ field }) => (
            <Input
              label="Max Age"
              type="number"
              placeholder="e.g. 28"
              value={field.value ?? ""}
              onChange={(e) =>
                field.onChange(
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
              error={pe?.preferredAgeMax?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="partnerPreference.preferredHeightMin"
          render={({ field }) => (
            <Input
              label="Min Height (cm)"
              type="number"
              placeholder="155"
              value={field.value ?? ""}
              onChange={(e) =>
                field.onChange(
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
              error={pe?.preferredHeightMin?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="partnerPreference.preferredHeightMax"
          render={({ field }) => (
            <Input
              label="Max Height (cm)"
              type="number"
              placeholder="170"
              value={field.value ?? ""}
              onChange={(e) =>
                field.onChange(
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
              error={pe?.preferredHeightMax?.message}
            />
          )}
        />
      </div>

      <Controller
        control={control}
        name="partnerPreference.maritalStatus"
        render={({ field }) => (
          <MultiSelect
            label="Marital Status"
            options={MARITAL_STATUS_OPTIONS}
            value={field.value}
            onChange={field.onChange}
            error={pe?.maritalStatus?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="partnerPreference.preferredEducation"
        render={({ field }) => (
          <MultiSelect
            label="Education"
            options={EDUCATION_LEVEL_OPTIONS}
            value={field.value}
            onChange={field.onChange}
            error={pe?.preferredEducation?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="partnerPreference.employedIn"
        render={({ field }) => (
          <MultiSelect
            label="Employment"
            options={EMPLOYMENT_OPTIONS}
            value={field.value}
            onChange={field.onChange}
            error={pe?.employedIn?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="partnerPreference.annualIncome"
        render={({ field }) => (
          <MultiSelect
            label="Annual Income"
            options={INCOME_RANGE_OPTIONS_FOR_PARTNER}
            value={field.value}
            onChange={field.onChange}
            error={pe?.annualIncome?.message}
          />
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="partnerPreference.physicalStatus"
          render={({ field }) => (
            <MultiSelect
              label="Physical Status"
              options={PHYSICAL_STATUS_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={pe?.physicalStatus?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="partnerPreference.eatingHabits"
          render={({ field }) => (
            <MultiSelect
              label="Eating Habits"
              options={DIET_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={pe?.eatingHabits?.message}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full">
          <Label className="mb-2">Drinking Habits</Label>
          <Controller
            control={control}
            name="partnerPreference.drinkingHabits"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  {DRINKING_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {pe?.drinkingHabits && (
            <p className="text-destructive mt-1 text-sm">
              {pe.drinkingHabits.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <Label className="mb-2">Smoking Habits</Label>
          <Controller
            control={control}
            name="partnerPreference.smokingHabits"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  {SMOKING_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {pe?.smokingHabits && (
            <p className="text-destructive mt-1 text-sm">
              {pe.smokingHabits.message}
            </p>
          )}
        </div>
      </div>

      <Controller
        control={control}
        name="partnerPreference.religion"
        render={({ field }) => (
          <MultiSelect
            label="Religion"
            options={RELIGION_OPTIONS_FOR_PARTNER}
            value={field.value}
            onChange={field.onChange}
            error={pe?.religion?.message}
            otherPlaceholder="Specify other religion"
          />
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="partnerPreference.motherTongue"
          render={({ field }) => (
            <MultiSelect
              label="Mother Tongue"
              options={MOTHER_TONGUE_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={pe?.motherTongue?.message}
              otherPlaceholder="Specify other mother tongue"
            />
          )}
        />
        <Controller
          control={control}
          name="partnerPreference.caste"
          render={({ field }) => (
            <MultiSelect
              label="Caste"
              options={CASTE_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={pe?.caste?.message}
              otherPlaceholder="Specify other caste"
            />
          )}
        />
      </div>

      <div className="w-full">
        <Label className="mb-2">Manglik</Label>
        <Controller
          control={control}
          name="partnerPreference.manglik"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select preference" />
              </SelectTrigger>
              <SelectContent>
                {MANGLIK_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {pe?.manglik && (
          <p className="text-destructive mt-1 text-sm">{pe.manglik.message}</p>
        )}
      </div>
    </ProfileSectionShell>
  );
}
