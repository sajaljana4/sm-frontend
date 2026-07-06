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
import { Checkbox } from "@/components/ui/checkbox";
import {
  DIET_OPTIONS,
  HOBBY_OPTIONS,
  SPORT_OPTIONS,
  SMOKING_OPTIONS,
  DRINKING_OPTIONS,
} from "@/constants/user.constants";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth.service";
import {
  lifestyleSchema,
  type LifestyleSchemaType,
} from "@/validators/auth.schema";
import MultiSelect from "@/modules/auth/registration/multi-select";
import ProfileSectionShell from "../profile-section-shell";

export default function LifestyleSection() {
  const { profile, setProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<LifestyleSchemaType>({
    resolver: zodResolver(lifestyleSchema),
    defaultValues: {
      lifeStyle: {
        diet: profile?.lifeStyle?.diet ?? "",
        smoking: profile?.lifeStyle?.smoking ?? "",
        drinking: profile?.lifeStyle?.drinking ?? "",
      },
      children: {
        noOfChildren: profile?.children?.noOfChildren ?? 0,
        livingWithMe: profile?.children?.livingWithMe ?? false,
      },
      hobbiesAndInterests: profile?.hobbiesAndInterests ?? [],
      sports: profile?.sports ?? [],
    },
  });

  const noOfChildren = watch("children.noOfChildren");

  const onSubmit = async (data: LifestyleSchemaType) => {
    try {
      setLoading(true);
      const res = await authService.updateProfile(data);
      if (res.statusCode >= 400) throw new Error(res.message);
      setProfile(res.data);
      toast.success("Lifestyle updated");
    } catch (error) {
      toast.error((error as Error).message ?? "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileSectionShell
      title="Lifestyle"
      description="Your lifestyle, hobbies and interests."
      isLoading={loading}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="w-full">
          <Label className="mb-2">Diet</Label>
          <Controller
            control={control}
            name="lifeStyle.diet"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select diet" />
                </SelectTrigger>
                <SelectContent>
                  {DIET_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.lifeStyle?.diet && (
            <p className="text-destructive mt-1 text-sm">
              {errors.lifeStyle.diet.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <Label className="mb-2">Smoking</Label>
          <Controller
            control={control}
            name="lifeStyle.smoking"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
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
          {errors.lifeStyle?.smoking && (
            <p className="text-destructive mt-1 text-sm">
              {errors.lifeStyle.smoking.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <Label className="mb-2">Drinking</Label>
          <Controller
            control={control}
            name="lifeStyle.drinking"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
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
          {errors.lifeStyle?.drinking && (
            <p className="text-destructive mt-1 text-sm">
              {errors.lifeStyle.drinking.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <Controller
          control={control}
          name="children.noOfChildren"
          render={({ field }) => (
            <Input
              label="Number of Children"
              type="number"
              placeholder="0"
              value={field.value ?? 0}
              onChange={(e) => field.onChange(Number(e.target.value))}
              error={errors.children?.noOfChildren?.message}
            />
          )}
        />
        {noOfChildren > 0 && (
          <Controller
            control={control}
            name="children.livingWithMe"
            render={({ field }) => (
              <div className="flex items-center gap-2 h-9">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="livingWithMe"
                />
                <Label htmlFor="livingWithMe" className="cursor-pointer">
                  Children are living with me
                </Label>
              </div>
            )}
          />
        )}
      </div>

      <Controller
        control={control}
        name="hobbiesAndInterests"
        render={({ field }) => (
          <MultiSelect
            label="Hobbies & Interests"
            options={HOBBY_OPTIONS}
            value={field.value}
            onChange={field.onChange}
            error={errors.hobbiesAndInterests?.message}
            otherPlaceholder="Specify other hobby"
          />
        )}
      />

      <Controller
        control={control}
        name="sports"
        render={({ field }) => (
          <MultiSelect
            label="Sports"
            options={SPORT_OPTIONS}
            value={field.value ?? []}
            onChange={field.onChange}
            error={errors.sports?.message}
            otherPlaceholder="Specify other sport"
          />
        )}
      />
    </ProfileSectionShell>
  );
}
