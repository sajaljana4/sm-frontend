"use client";

import { Button } from "@/components/ui/button";
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
  addressSchema,
  type AddressSchemaType,
} from "@/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import StepWrapper from "./step-wrapper";
import SelectWithOther from "./select-with-other";
import { COUNTRY_OPTIONS, STATE_OPTIONS } from "@/constants/user.constants";

interface AddressStepProps {
  defaultValues?: Partial<AddressSchemaType>;
  onNext: (data: AddressSchemaType) => void;
  onBack: () => void;
}

export default function AddressStep({
  defaultValues,
  onNext,
  onBack,
}: Readonly<AddressStepProps>) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddressSchemaType>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: {
        addressLine: defaultValues?.address?.addressLine ?? "",
        country: defaultValues?.address?.country ?? "",
        state: defaultValues?.address?.state ?? "",
        city: defaultValues?.address?.city ?? "",
        po: defaultValues?.address?.po ?? "",
        postalCode: defaultValues?.address?.postalCode ?? "",
      },
      currentLocation: {
        country: defaultValues?.currentLocation?.country ?? "",
      },
    },
  });

  return (
    <StepWrapper
      title="ADDRESS & LOCATION"
      subtitle="Where are you currently located?"
    >
      <form onSubmit={handleSubmit(onNext)} className="space-y-5">
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
