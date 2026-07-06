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
import { COUNTRY_OPTIONS, STATE_OPTIONS } from "@/constants/user.constants";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth.service";
import {
  addressSchema,
  type AddressSchemaType,
} from "@/validators/auth.schema";
import SelectWithOther from "@/modules/auth/registration/select-with-other";
import ProfileSectionShell from "../profile-section-shell";

export default function AddressSection() {
  const { profile, setProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddressSchemaType>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: {
        addressLine: profile?.address?.addressLine ?? "",
        country: profile?.address?.country ?? "",
        state: profile?.address?.state ?? "",
        city: profile?.address?.city ?? "",
        po: profile?.address?.po ?? "",
        postalCode: profile?.address?.postalCode ?? "",
      },
      currentLocation: {
        country: profile?.currentLocation?.country ?? "",
      },
    },
  });

  const onSubmit = async (data: AddressSchemaType) => {
    try {
      setLoading(true);
      const res = await authService.updateProfile(data);
      if (res.statusCode >= 400) throw new Error(res.message);
      setProfile(res.data);
      toast.success("Address updated");
    } catch (error) {
      toast.error((error as Error).message ?? "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileSectionShell
      title="Address & Location"
      description="Where you currently live and your present location."
      isLoading={loading}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Address Line"
        placeholder="e.g. 42, Saheed Nagar"
        {...register("address.addressLine")}
        error={errors.address?.addressLine?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="address.country"
          render={({ field }) => (
            <SelectWithOther
              label="Country"
              options={COUNTRY_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select country"
              otherPlaceholder="Specify country"
              error={errors.address?.country?.message}
            />
          )}
        />

        <div className="w-full">
          <Label className="mb-2">State</Label>
          <Controller
            control={control}
            name="address.state"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {STATE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.address?.state && (
            <p className="text-destructive mt-1 text-sm">
              {errors.address.state.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="City"
          placeholder="City"
          {...register("address.city")}
          error={errors.address?.city?.message}
        />
        <Input
          label="Post Office"
          placeholder="Post office"
          {...register("address.po")}
          error={errors.address?.po?.message}
        />
        <Input
          label="Postal Code"
          placeholder="e.g. 751007"
          {...register("address.postalCode")}
          error={errors.address?.postalCode?.message}
        />
      </div>

      <div className="pt-2">
        <Controller
          control={control}
          name="currentLocation.country"
          render={({ field }) => (
            <SelectWithOther
              label="Current Location (Country)"
              options={COUNTRY_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select current country"
              otherPlaceholder="Specify current country"
              error={errors.currentLocation?.country?.message}
            />
          )}
        />
      </div>
    </ProfileSectionShell>
  );
}
