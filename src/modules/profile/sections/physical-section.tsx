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
  BODY_TYPE_OPTIONS,
  COMPLEXION_OPTIONS,
  PHYSICAL_STATUS_OPTIONS,
} from "@/constants/user.constants";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth.service";
import {
  physicalInfoSchema,
  type PhysicalInfoSchemaType,
} from "@/validators/auth.schema";
import ProfileSectionShell from "../profile-section-shell";

export default function PhysicalSection() {
  const { profile, setProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PhysicalInfoSchemaType>({
    resolver: zodResolver(physicalInfoSchema),
    defaultValues: {
      physicalInformation: {
        height:
          profile?.physicalInformation?.height ??
          (undefined as unknown as number),
        weight:
          profile?.physicalInformation?.weight ??
          (undefined as unknown as number),
        bodyType: profile?.physicalInformation?.bodyType ?? "",
        complexion: profile?.physicalInformation?.complexion ?? "",
        physicalStatus: profile?.physicalInformation?.physicalStatus ?? "",
      },
    },
  });

  const onSubmit = async (data: PhysicalInfoSchemaType) => {
    try {
      setLoading(true);
      const res = await authService.updateProfile(data);
      if (res.statusCode >= 400) throw new Error(res.message);
      setProfile(res.data);
      toast.success("Physical information updated");
    } catch (error) {
      toast.error((error as Error).message ?? "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileSectionShell
      title="Physical Information"
      description="Your physical attributes."
      isLoading={loading}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="physicalInformation.height"
          render={({ field }) => (
            <Input
              label="Height (cm)"
              type="number"
              placeholder="e.g. 175"
              value={field.value ?? ""}
              onChange={(e) =>
                field.onChange(
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
              error={errors.physicalInformation?.height?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="physicalInformation.weight"
          render={({ field }) => (
            <Input
              label="Weight (kg)"
              type="number"
              placeholder="e.g. 70"
              value={field.value ?? ""}
              onChange={(e) =>
                field.onChange(
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
              error={errors.physicalInformation?.weight?.message}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="w-full">
          <Label className="mb-2">Body Type</Label>
          <Controller
            control={control}
            name="physicalInformation.bodyType"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select body type" />
                </SelectTrigger>
                <SelectContent>
                  {BODY_TYPE_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.physicalInformation?.bodyType && (
            <p className="text-destructive mt-1 text-sm">
              {errors.physicalInformation.bodyType.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <Label className="mb-2">Complexion</Label>
          <Controller
            control={control}
            name="physicalInformation.complexion"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select complexion" />
                </SelectTrigger>
                <SelectContent>
                  {COMPLEXION_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.physicalInformation?.complexion && (
            <p className="text-destructive mt-1 text-sm">
              {errors.physicalInformation.complexion.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <Label className="mb-2">Physical Status</Label>
          <Controller
            control={control}
            name="physicalInformation.physicalStatus"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {PHYSICAL_STATUS_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.physicalInformation?.physicalStatus && (
            <p className="text-destructive mt-1 text-sm">
              {errors.physicalInformation.physicalStatus.message}
            </p>
          )}
        </div>
      </div>
    </ProfileSectionShell>
  );
}
