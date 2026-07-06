"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RELIGION_OPTIONS,
  MOTHER_TONGUE_OPTIONS,
  LANGUAGE_OPTIONS,
  CASTE_OPTIONS,
} from "@/constants/user.constants";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth.service";
import { generalService } from "@/services/generals.service";
import type { SubCastType, GothraType } from "@/types/generals/reponse.type";
import {
  religionSchema,
  type ReligionSchemaType,
} from "@/validators/auth.schema";
import MultiSelect from "../../auth/registration/multi-select";
import SelectWithOther from "../../auth/registration/select-with-other";
import ProfileSectionShell from "../profile-section-shell";

export default function ReligionSection() {
  const { profile, setProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReligionSchemaType>({
    resolver: zodResolver(religionSchema),
    defaultValues: {
      religion: profile?.religion ?? "",
      motherTongue: profile?.motherTongue ?? "",
      knownLanguages: profile?.knownLanguages ?? [],
      caste: profile?.caste ?? "",
      subCaste: profile?.subCaste ?? "",
      gothra: profile?.gothra ?? "",
    },
  });

  const [subCasts, setSubCasts] = useState<SubCastType[]>([]);
  const [gothras, setGothras] = useState<GothraType[]>([]);

  const selectedSubCaste = watch("subCaste");

  // Load the sub-caste list once on mount.
  useEffect(() => {
    let active = true;
    generalService
      .getSubCasts()
      .then((res) => {
        if (active) setSubCasts(res?.data ?? []);
      })
      .catch(() => {
        if (active) setSubCasts([]);
      });
    return () => {
      active = false;
    };
  }, []);

  // Fetch gothras for the selected sub-caste; the gothra field is hidden when
  // the selected sub-caste has none.
  useEffect(() => {
    const subCast = subCasts.find((s) => s.name === selectedSubCaste);
    if (!subCast) {
      setGothras([]);
      return;
    }
    let active = true;
    generalService
      .getGothra(subCast._id)
      .then((res) => {
        if (active) setGothras(res?.data ?? []);
      })
      .catch(() => {
        if (active) setGothras([]);
      });
    return () => {
      active = false;
    };
  }, [selectedSubCaste, subCasts]);

  const hasGothras = gothras.length > 0;

  const onSubmit = async (data: ReligionSchemaType) => {
    try {
      setLoading(true);
      const res = await authService.updateProfile(data);
      if (res.statusCode >= 400) throw new Error(res.message);
      setProfile(res.data);
      toast.success("Religion & community updated");
    } catch (error) {
      toast.error((error as Error).message ?? "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileSectionShell
      title="Religion & Community"
      description="Your religious and community background."
      isLoading={loading}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="religion"
          render={({ field }) => (
            <SelectWithOther
              label="Religion"
              options={RELIGION_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select religion"
              otherPlaceholder="Specify your religion"
              error={errors.religion?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="motherTongue"
          render={({ field }) => (
            <SelectWithOther
              label="Mother Tongue"
              options={MOTHER_TONGUE_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select mother tongue"
              otherPlaceholder="Specify your mother tongue"
              error={errors.motherTongue?.message}
            />
          )}
        />
      </div>

      <Controller
        control={control}
        name="knownLanguages"
        render={({ field }) => (
          <MultiSelect
            label="Known Languages"
            options={LANGUAGE_OPTIONS}
            value={field.value}
            onChange={field.onChange}
            error={errors.knownLanguages?.message}
            otherPlaceholder="Specify other language"
          />
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Caste */}
        <div className="w-full">
          <Label className="mb-2">Caste</Label>
          <Controller
            control={control}
            name="caste"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select caste" />
                </SelectTrigger>
                <SelectContent>
                  {CASTE_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.caste && (
            <p className="text-destructive mt-1 text-sm">
              {errors.caste.message}
            </p>
          )}
        </div>

        {/* Sub Caste — loaded from the API */}
        <div className="w-full">
          <Label className="mb-2">Sub Caste</Label>
          <Controller
            control={control}
            name="subCaste"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  // Reset gothra when the sub-caste changes.
                  setValue("gothra", "");
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      subCasts.length === 0
                        ? "Loading sub castes..."
                        : "Select sub caste"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {subCasts.map((s) => (
                    <SelectItem key={s._id} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.subCaste && (
            <p className="text-destructive mt-1 text-sm">
              {errors.subCaste.message}
            </p>
          )}
        </div>

        {/* Gothra — only shown when the sub-caste has gothras */}
        {hasGothras && (
          <div className="w-full">
            <Label className="mb-2">Gothra</Label>
            <Controller
              control={control}
              name="gothra"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gothra" />
                  </SelectTrigger>
                  <SelectContent>
                    {gothras.map((g) => (
                      <SelectItem key={g._id} value={g.name}>
                        {g.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gothra && (
              <p className="text-destructive mt-1 text-sm">
                {errors.gothra.message}
              </p>
            )}
          </div>
        )}
      </div>
    </ProfileSectionShell>
  );
}
