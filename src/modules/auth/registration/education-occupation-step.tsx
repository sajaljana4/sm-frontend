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
  educationOccupationSchema,
  type EducationOccupationSchemaType,
} from "@/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import StepWrapper from "./step-wrapper";
import SelectWithOther from "./select-with-other";
import {
  EMPLOYMENT_OPTIONS,
  QUALIFICATION_OPTIONS,
  INCOME_RANGE_OPTIONS,
} from "@/constants/user.constants";

interface EducationOccupationStepProps {
  defaultValues?: Partial<EducationOccupationSchemaType>;
  onNext: (data: EducationOccupationSchemaType) => void;
  onBack: () => void;
}

export default function EducationOccupationStep({
  defaultValues,
  onNext,
  onBack,
}: Readonly<EducationOccupationStepProps>) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EducationOccupationSchemaType>({
    resolver: zodResolver(educationOccupationSchema),
    defaultValues: {
      education: {
        highestQualification:
          defaultValues?.education?.highestQualification ?? "",
        yearOfPassing:
          defaultValues?.education?.yearOfPassing ??
          (undefined as unknown as number),
      },
      occupation: {
        employedIn: defaultValues?.occupation?.employedIn ?? "",
        annualIncome: defaultValues?.occupation?.annualIncome ?? "",
      },
    },
  });

  return (
    <StepWrapper
      title="EDUCATION & CAREER"
      subtitle="Your qualifications and professional details"
    >
      <form onSubmit={handleSubmit(onNext)} className="space-y-5">
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
