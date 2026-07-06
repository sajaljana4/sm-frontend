"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  physicalInfoSchema,
  type PhysicalInfoSchemaType,
} from "@/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import StepWrapper from "./step-wrapper";
import {
  BODY_TYPE_OPTIONS,
  COMPLEXION_OPTIONS,
  PHYSICAL_STATUS_OPTIONS,
} from "@/constants/user.constants";

interface PhysicalInfoStepProps {
  defaultValues?: Partial<PhysicalInfoSchemaType>;
  onNext: (data: PhysicalInfoSchemaType) => void;
  onBack: () => void;
}

export default function PhysicalInfoStep({
  defaultValues,
  onNext,
  onBack,
}: Readonly<PhysicalInfoStepProps>) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PhysicalInfoSchemaType>({
    resolver: zodResolver(physicalInfoSchema),
    defaultValues: {
      physicalInformation: {
        height:
          defaultValues?.physicalInformation?.height ??
          (undefined as unknown as number),
        weight:
          defaultValues?.physicalInformation?.weight ??
          (undefined as unknown as number),
        bodyType: defaultValues?.physicalInformation?.bodyType ?? "",
        complexion: defaultValues?.physicalInformation?.complexion ?? "",
        physicalStatus:
          defaultValues?.physicalInformation?.physicalStatus ?? "",
      },
    },
  });

  return (
    <StepWrapper
      title="PHYSICAL INFORMATION"
      subtitle="Help matches know you better"
    >
      <form onSubmit={handleSubmit(onNext)} className="space-y-5">
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
