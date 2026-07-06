"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  PROFILE_FOR_OPTIONS,
} from "@/constants/user.constants";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth.service";
import {
  personalInfoUpdateSchema,
  type PersonalInfoUpdateSchemaType,
} from "@/validators/auth.schema";
import ProfileSectionShell from "../profile-section-shell";

export default function PersonalSection() {
  const { profile, setProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PersonalInfoUpdateSchemaType>({
    resolver: zodResolver(personalInfoUpdateSchema),
    defaultValues: {
      profileFor: profile?.profileFor ?? "",
      firstName: profile?.firstName ?? "",
      middleName: profile?.middleName ?? "",
      lastName: profile?.lastName ?? "",
      maritalStatus: profile?.maritalStatus ?? "",
      gender: profile?.gender ?? "",
      dob: profile?.dob?.slice(0, 10) ?? "",
      bio: profile?.bio ?? "",
    },
  });

  const onSubmit = async (data: PersonalInfoUpdateSchemaType) => {
    try {
      setLoading(true);
      const res = await authService.updateProfile(data);
      if (res.statusCode >= 400) throw new Error(res.message);
      setProfile(res.data);
      toast.success("Personal details updated");
    } catch (error) {
      toast.error((error as Error).message ?? "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileSectionShell
      title="Personal Details"
      description="Update your name, contact email and basic information."
      isLoading={loading}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full">
        <Label className="mb-2">Profile is for</Label>
        <div className="mt-1 flex flex-wrap gap-2">
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
                    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-150 ${
                      field.value === opt.value
                        ? "border-[#E32C6F] bg-[#E32C6F] text-white"
                        : "border-input bg-background text-foreground hover:border-[#E32C6F]/50"
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
          <p className="mt-1 text-sm text-destructive">
            {errors.profileFor.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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

        <Input
          label="Email"
          type="email"
          value={profile?.email ?? ""}
          disabled
          className="md:col-span-2"
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="XXXXXXXXXX"
          value={profile?.phone ?? ""}
          disabled
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
            <p className="mt-1 text-sm text-destructive">
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
            <p className="mt-1 text-sm text-destructive">
              {errors.maritalStatus.message}
            </p>
          )}
        </div>
      </div>

      <div className="w-full">
        <Label className="mb-2">Bio</Label>
        <Textarea
          placeholder="Tell us about yourself..."
          rows={3}
          {...register("bio")}
        />
        {errors.bio && (
          <p className="mt-1 text-sm text-destructive">{errors.bio.message}</p>
        )}
      </div>
    </ProfileSectionShell>
  );
}
