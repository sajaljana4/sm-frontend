"use client";

import { registrationImage } from "@/assets";
import PageBanner from "@/modules/shared/page-banner";
import Image from "next/image";
import { useState, useCallback } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  registrationDataAtom,
  updateRegistrationDataAtom,
} from "@/context/registration.context";
import { toast } from "sonner";

import PhoneStep from "@/modules/auth/registration/phone-step";
import OtpStep from "@/modules/auth/registration/otp-step";
import PersonalDetailsStep from "@/modules/auth/registration/personal-details-step";
import AddressStep from "@/modules/auth/registration/address-step";
import ReligionStep from "@/modules/auth/registration/religion-step";
import PhysicalInfoStep from "@/modules/auth/registration/physical-info-step";
import EducationOccupationStep from "@/modules/auth/registration/education-occupation-step";
import LifestyleStep from "@/modules/auth/registration/lifestyle-step";
import FamilyInfoStep from "@/modules/auth/registration/family-info-step";
import PartnerPreferenceStep from "@/modules/auth/registration/partner-preference-step";
import ImageUploadStep from "@/modules/auth/registration/image-upload-step";

import type {
  GetOtpSchemaForRegistrationType,
  VerifyOtpSchemaForRegistrationType,
  PersonalDetailsSchemaType,
  AddressSchemaType,
  ReligionSchemaType,
  PhysicalInfoSchemaType,
  EducationOccupationSchemaType,
  LifestyleSchemaType,
  FamilyInfoSchemaType,
  PartnerPreferenceSchemaType,
  RegistrationSchemaType,
} from "@/validators/auth.schema";
import { authService } from "@/services/auth.service";

type StepType =
  | "registration-otp"
  | "registration-otp-verify"
  | "personal-details"
  | "address"
  | "religion"
  | "physical-info"
  | "education-occupation"
  | "lifestyle"
  | "family-info"
  | "partner-preference"
  | "image-upload"
  | "complete";

const STEP_LABELS: Record<string, string> = {
  "registration-otp": "Phone",
  "registration-otp-verify": "Verify OTP",
  "personal-details": "Personal",
  address: "Address",
  religion: "Community",
  "physical-info": "Physical",
  "education-occupation": "Education",
  lifestyle: "Lifestyle",
  "family-info": "Family",
  "partner-preference": "Partner",
  "image-upload": "Photos",
};

const STEP_ORDER: StepType[] = [
  "registration-otp",
  "registration-otp-verify",
  "personal-details",
  "address",
  "religion",
  "physical-info",
  "education-occupation",
  "lifestyle",
  "family-info",
  "partner-preference",
  "image-upload",
];

function Page() {
  const [step, setStep] = useState<StepType>("registration-otp");
  const [loading, setLoading] = useState(false);
  const registrationData = useAtomValue(registrationDataAtom);
  const updateRegistrationData = useSetAtom(updateRegistrationDataAtom);

  const currentStepIndex = STEP_ORDER.indexOf(step);

  const goNext = useCallback(() => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx < STEP_ORDER.length - 1) {
      setStep(STEP_ORDER[idx + 1]);
    }
  }, [step]);

  const goBack = useCallback(() => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx > 0) {
      setStep(STEP_ORDER[idx - 1]);
    }
  }, [step]);

  // ─── Step Handlers ─────────────────────────────────────────
  const handlePhoneSubmit = async (data: GetOtpSchemaForRegistrationType) => {
    try {
      setLoading(true);
      const response = await authService.sendOtpForRegistration(data);
      if (response.statusCode >= 400) {
        throw new Error(response.message);
      }
      updateRegistrationData({ phone: data.phone });
      toast.success(response.message);
      goNext();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (data: VerifyOtpSchemaForRegistrationType) => {
    try {
      setLoading(true);
      const response = await authService.verifyOtpForRegistration(data);
      if (response.statusCode >= 400) {
        throw new Error(response.message);
      }
      toast.success("OTP verified successfully!");
      updateRegistrationData({
        registrationToken: response.data.registrationToken,
      });
      goNext();
    } catch {
      toast.error("Failed to verify OTP!");
    } finally {
      setLoading(false);
    }
  };

  const handlePersonalDetails = (data: PersonalDetailsSchemaType) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = data;
    updateRegistrationData(rest);
    goNext();
  };

  const handleAddress = (data: AddressSchemaType) => {
    updateRegistrationData(data);
    goNext();
  };

  const handleReligion = (data: ReligionSchemaType) => {
    updateRegistrationData(data);
    goNext();
  };

  const handlePhysicalInfo = (data: PhysicalInfoSchemaType) => {
    updateRegistrationData(data);
    goNext();
  };

  const handleEducationOccupation = (data: EducationOccupationSchemaType) => {
    updateRegistrationData(data);
    goNext();
  };

  const handleLifestyle = (data: LifestyleSchemaType) => {
    updateRegistrationData(data);
    goNext();
  };

  const handleFamilyInfo = (data: FamilyInfoSchemaType) => {
    updateRegistrationData(data);
    goNext();
  };

  const handlePartnerPreference = (data: PartnerPreferenceSchemaType) => {
    updateRegistrationData(data);
    goNext();
  };

  const handleImageUpload = async (data: {
    profileImages: string[];
    idCardImages: string[];
  }) => {
    try {
      setLoading(true);
      updateRegistrationData(data);
      const response = await authService.register({
        ...registrationData,
        ...data,
      } as RegistrationSchemaType);
      if (response.statusCode >= 400) {
        throw new Error(response.message);
      }
      setStep("complete");
      toast.success(response.message ?? "Profile created successfully!");
    } catch {
      toast.error("Failed to register!");
    } finally {
      setLoading(false);
    }
  };

  // ─── Render Current Step ───────────────────────────────────
  const renderStep = () => {
    switch (step) {
      case "registration-otp":
        return (
          <PhoneStep
            defaultValues={{ phone: registrationData.phone }}
            onNext={handlePhoneSubmit}
            isLoading={loading}
          />
        );
      case "registration-otp-verify":
        return (
          <OtpStep
            phone={registrationData.phone ?? ""}
            onNext={handleOtpSubmit}
            onBack={goBack}
          />
        );
      case "personal-details":
        return (
          <PersonalDetailsStep
            defaultValues={registrationData}
            onNext={handlePersonalDetails}
            onBack={goBack}
          />
        );
      case "address":
        return (
          <AddressStep
            defaultValues={{
              address: registrationData.address,
              currentLocation: registrationData.currentLocation,
            }}
            onNext={handleAddress}
            onBack={goBack}
          />
        );
      case "religion":
        return (
          <ReligionStep
            defaultValues={registrationData}
            onNext={handleReligion}
            onBack={goBack}
          />
        );
      case "physical-info":
        return (
          <PhysicalInfoStep
            defaultValues={registrationData}
            onNext={handlePhysicalInfo}
            onBack={goBack}
          />
        );
      case "education-occupation":
        return (
          <EducationOccupationStep
            defaultValues={registrationData}
            onNext={handleEducationOccupation}
            onBack={goBack}
          />
        );
      case "lifestyle":
        return (
          <LifestyleStep
            defaultValues={registrationData}
            onNext={handleLifestyle}
            onBack={goBack}
          />
        );
      case "family-info":
        return (
          <FamilyInfoStep
            defaultValues={registrationData}
            onNext={handleFamilyInfo}
            onBack={goBack}
          />
        );
      case "partner-preference":
        return (
          <PartnerPreferenceStep
            defaultValues={{
              partnerPreference: registrationData.partnerPreference,
            }}
            onNext={handlePartnerPreference}
            onBack={goBack}
          />
        );
      case "image-upload":
        return (
          <ImageUploadStep
            registrationToken={registrationData.registrationToken ?? ""}
            defaultProfileImages={registrationData.profileImages}
            defaultIdCardImages={registrationData.idCardImages}
            onComplete={handleImageUpload}
            onBack={goBack}
            isLoading={loading}
          />
        );
      case "complete":
        return (
          <div className="text-center py-12 animate-in fade-in-0 zoom-in-95 duration-500">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Registration Complete!
            </h2>
            <p className="text-muted-foreground">
              Your profile has been saved. We&apos;ll review it and get back to
              you shortly.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <PageBanner
        title="REGISTRATION"
        description="Bringing Santhali matches closer, every day"
      />
      <section className="base-section grid grid-cols-1 lg:grid-cols-2 gap-8 py-8">
        {/* Left: Form Area */}
        <div className="w-full h-fit bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-border/50">
          {/* Progress Bar */}
          {step !== "complete" && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Step {currentStepIndex + 1} of {STEP_ORDER.length}
                </span>
                <span className="text-xs font-medium text-[#E32C6F]">
                  {STEP_LABELS[step] ?? ""}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-[#E32C6F] to-[#FF6B9D] rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${((currentStepIndex + 1) / STEP_ORDER.length) * 100}%`,
                  }}
                />
              </div>
              {/* Step Dots */}
              <div className="flex justify-between mt-3">
                {STEP_ORDER.map((s, i) => (
                  <div key={s} className="flex flex-col items-center">
                    <div
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        i <= currentStepIndex
                          ? "bg-[#E32C6F] scale-110"
                          : "bg-muted"
                      }`}
                    />
                    <span className="text-[9px] text-muted-foreground mt-1 hidden md:block">
                      {STEP_LABELS[s]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {renderStep()}

          {step === "registration-otp" && (
            <p className="text-xs text-muted-foreground text-center mt-6">
              I agree to the{" "}
              <span className="text-[#E32C6F] font-medium cursor-pointer hover:underline">
                terms and conditions
              </span>
            </p>
          )}
        </div>

        {/* Right: Image */}
        <div className="w-full relative hidden lg:block -left-50 -z-1 scale-125">
          <div className="sticky top-24">
            <Image
              src={registrationImage}
              alt="Registration"
              width={800}
              height={900}
              className="w-full h-auto object-cover rounded-2xl"
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Page;
