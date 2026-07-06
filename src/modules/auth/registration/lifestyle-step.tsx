"use client";

import { Button } from "@/components/ui/button";
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
  lifestyleSchema,
  type LifestyleSchemaType,
} from "@/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import StepWrapper from "./step-wrapper";
import MultiSelect from "./multi-select";
import {
  DIET_OPTIONS,
  HOBBY_OPTIONS,
  SPORT_OPTIONS,
  SMOKING_OPTIONS,
  DRINKING_OPTIONS,
} from "@/constants/user.constants";
import { Input } from "@/components/ui/input";

interface LifestyleStepProps {
  defaultValues?: Partial<LifestyleSchemaType>;
  onNext: (data: LifestyleSchemaType) => void;
  onBack: () => void;
}

export default function LifestyleStep({
  defaultValues,
  onNext,
  onBack,
}: Readonly<LifestyleStepProps>) {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<LifestyleSchemaType>({
    resolver: zodResolver(lifestyleSchema),
    defaultValues: {
      lifeStyle: {
        diet: defaultValues?.lifeStyle?.diet ?? "",
        smoking: defaultValues?.lifeStyle?.smoking ?? "",
        drinking: defaultValues?.lifeStyle?.drinking ?? "",
      },
      children: {
        noOfChildren: defaultValues?.children?.noOfChildren ?? 0,
        livingWithMe: defaultValues?.children?.livingWithMe ?? false,
      },
      hobbiesAndInterests: defaultValues?.hobbiesAndInterests ?? [],
      sports: defaultValues?.sports ?? [],
    },
  });

  const noOfChildren = watch("children.noOfChildren");

  return (
    <StepWrapper title="LIFESTYLE" subtitle="Your daily habits and interests">
      <form onSubmit={handleSubmit(onNext)} className="space-y-5">
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
