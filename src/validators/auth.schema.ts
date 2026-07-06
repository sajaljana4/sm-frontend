import * as z from "zod";
import { OTHER_OPTION_REGEX } from "@/lib/other-option";

/**
 * A non-empty string array that also rejects the un-specified "Others" sentinel.
 * The "specify" check lives at the array root (via refine) so react-hook-form
 * surfaces the message on the field itself rather than on a hidden array index.
 */
const otherGuardedArray = (selectMessage: string, specifyMessage: string) =>
  z
    .array(z.string())
    .min(1, selectMessage)
    .refine((items) => items.every((v) => OTHER_OPTION_REGEX.test(v)), {
      message: specifyMessage,
    });

// ─── Login Schema ──────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.email("Invalid email address").optional(),
  phone: z.string().optional(),
  smId: z.string().optional(),
  password: z.string().min(1, "Password is required"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

// ─── Step 1: Phone Number ──────────────────────────────────────
export const getOtpSchemaForRegistration = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\+?[1-9]\d{7,14}$/,
      "Enter a valid phone number with country code",
    ),
});

export type GetOtpSchemaForRegistrationType = z.infer<
  typeof getOtpSchemaForRegistration
>;

// ─── Step 2: OTP Verification ──────────────────────────────────
export const verifyOtpSchemaForRegistration =
  getOtpSchemaForRegistration.extend({
    otp: z.number().min(1, "OTP is required"),
  });

export type VerifyOtpSchemaForRegistrationType = z.infer<
  typeof verifyOtpSchemaForRegistration
>;

// ─── Step 3: Personal Details ──────────────────────────────────
export const personalDetailsSchema = z
  .object({
    profileFor: z.string().min(1, "Please select who this profile is for"),
    firstName: z.string().min(1, "First name is required").max(50),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required").max(50),
    email: z.email("Invalid email address"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(
        /^\+?[1-9]\d{7,14}$/,
        "Enter a valid phone number with country code",
      ),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    maritalStatus: z.string().min(1, "Marital status is required"),
    gender: z.string().min(1, "Please select your gender"),
    dob: z
      .string()
      .min(1, "Date of birth is required")
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
    bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type PersonalDetailsSchemaType = z.infer<typeof personalDetailsSchema>;

// ─── Personal Details (Profile Update — no password) ───────────
export const personalInfoUpdateSchema = z.object({
  profileFor: z.string().min(1, "Please select who this profile is for"),
  firstName: z.string().min(1, "First name is required").max(50),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required").max(50),
  maritalStatus: z.string().min(1, "Marital status is required"),
  gender: z.string().min(1, "Please select your gender"),
  dob: z
    .string()
    .min(1, "Date of birth is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
});

export type PersonalInfoUpdateSchemaType = z.infer<
  typeof personalInfoUpdateSchema
>;

// ─── Step 4: Address & Location ────────────────────────────────
export const addressSchema = z.object({
  address: z.object({
    addressLine: z.string().min(1, "Address line is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    po: z.string().min(1, "Post office is required"),
    postalCode: z
      .string()
      .min(1, "Postal code is required")
      .regex(/^\d{6}$/, "Invalid postal code"),
  }),
  currentLocation: z.object({
    country: z.string().min(1, "Current country is required"),
  }),
});

export type AddressSchemaType = z.infer<typeof addressSchema>;

// ─── Step 5: Religion & Community ──────────────────────────────
export const religionSchema = z.object({
  religion: z
    .string()
    .min(1, "Religion is required")
    .regex(OTHER_OPTION_REGEX, "Please specify your religion"),
  motherTongue: z
    .string()
    .min(1, "Mother tongue is required")
    .regex(OTHER_OPTION_REGEX, "Please specify your mother tongue"),
  knownLanguages: otherGuardedArray(
    "Select at least one language",
    "Please specify the other known language",
  ),
  caste: z
    .string()
    .min(1, "Caste is required")
    .regex(OTHER_OPTION_REGEX, "Please specify your caste"),
  subCaste: z.string().optional(),
  gothra: z.string().optional(),
});

export type ReligionSchemaType = z.infer<typeof religionSchema>;

// ─── Step 6: Physical Information ──────────────────────────────
export const physicalInfoSchema = z.object({
  physicalInformation: z.object({
    height: z
      .number({ message: "Height is required" })
      .min(100, "Height must be at least 100 cm")
      .max(250, "Height must be less than 250 cm"),
    weight: z
      .number({ message: "Weight is required" })
      .min(30, "Weight must be at least 30 kg")
      .max(300, "Weight must be less than 300 kg"),
    bodyType: z.string().min(1, "Body type is required"),
    complexion: z.string().min(1, "Complexion is required"),
    physicalStatus: z.string().min(1, "Physical status is required"),
  }),
});

export type PhysicalInfoSchemaType = z.infer<typeof physicalInfoSchema>;

// ─── Step 7: Education & Occupation ────────────────────────────
export const educationOccupationSchema = z.object({
  education: z.object({
    highestQualification: z
      .string()
      .min(1, "Qualification is required")
      .regex(OTHER_OPTION_REGEX, "Please specify your qualification"),
    yearOfPassing: z
      .number({ message: "Year is required" })
      .min(1970, "Enter a valid year")
      .max(new Date().getFullYear(), "Year cannot be in the future"),
  }),
  occupation: z.object({
    employedIn: z.string().min(1, "Employment sector is required"),
    annualIncome: z.string().min(1, "Annual income is required"),
  }),
});

export type EducationOccupationSchemaType = z.infer<
  typeof educationOccupationSchema
>;

// ─── Step 8: Lifestyle ─────────────────────────────────────────
export const lifestyleSchema = z.object({
  lifeStyle: z.object({
    diet: z.string().min(1, "Diet preference is required"),
    smoking: z.string().min(1, "Smoking preference is required"),
    drinking: z.string().min(1, "Drinking preference is required"),
  }),
  children: z.object({
    noOfChildren: z
      .number()
      .min(0, "Cannot be negative")
      .max(10, "Too many children"),
    livingWithMe: z.boolean().optional(),
  }),
  hobbiesAndInterests: otherGuardedArray(
    "Select at least one hobby",
    "Please specify the other hobby",
  ),
  sports: otherGuardedArray(
    "Select at least one sport",
    "Please specify the other sport",
  ),
});

export type LifestyleSchemaType = z.infer<typeof lifestyleSchema>;

// ─── Step 9: Family Information ────────────────────────────────
export const familyInfoSchema = z
  .object({
    familyInformation: z.object({
      fatherStatus: z.string().min(1, "Father's status is required"),
      motherStatus: z.string().min(1, "Mother's status is required"),
      familyClass: z.string().min(1, "Family class is required"),
      familyType: z.string().min(1, "Family type is required"),
      foodType: z.string().min(1, "Family food type is required"),
      parentsMobileNumber: z
        .string()
        .min(1, "Parent's mobile number is required")
        .regex(/^\+?[1-9]\d{7,14}$/, "Enter a valid phone number"),
      alternateNumber: z
        .string()
        .regex(/^\+?[1-9]\d{7,14}$/, "Enter a valid phone number")
        .optional()
        .or(z.literal("")),
      numberOfBrothers: z.number().min(0, "Cannot be negative").max(20),
      numberOfSisters: z.number().min(0, "Cannot be negative").max(20),
      numberOfBrothersMarried: z.number().min(0, "Cannot be negative").max(20),
      numberOfSistersMarried: z.number().min(0, "Cannot be negative").max(20),
      familyLocationSameAsProfile: z.boolean(),
      familyLocation: z.string().optional(),
      familyAncestralOrigin: z.string().optional(),
    }),
  })
  .refine(
    (data) =>
      data.familyInformation.familyLocationSameAsProfile ||
      !!data.familyInformation.familyLocation?.trim(),
    {
      message: "Family location is required",
      path: ["familyInformation", "familyLocation"],
    },
  );

export type FamilyInfoSchemaType = z.infer<typeof familyInfoSchema>;

// ─── Step 10: Partner Preferences ──────────────────────────────
export const partnerPreferenceSchema = z.object({
  partnerPreference: z
    .object({
      preferredAgeMin: z
        .number({ message: "Min age is required" })
        .min(18, "Minimum age must be at least 18")
        .max(100, "Maximum age cannot exceed 100"),
      preferredAgeMax: z
        .number({ message: "Max age is required" })
        .min(18, "Minimum age must be at least 18")
        .max(100, "Maximum age cannot exceed 100"),
      maritalStatus: z.array(z.string()).min(1, "Select at least one"),
      preferredHeightMin: z
        .number({ message: "Min height is required" })
        .min(100, "Min height must be at least 100 cm")
        .max(250, "Max height cannot exceed 250 cm"),
      preferredHeightMax: z
        .number({ message: "Max height is required" })
        .min(100, "Min height must be at least 100 cm")
        .max(250, "Max height cannot exceed 250 cm"),
      preferredEducation: z.array(z.string()).min(1, "Select at least one"),
      employedIn: z.array(z.string()).min(1, "Select at least one"),
      annualIncome: z.array(z.string()).min(1, "Select at least one"),
      physicalStatus: z.array(z.string()).min(1, "Select at least one"),
      eatingHabits: z.array(z.string()).min(1, "Select at least one"),
      drinkingHabits: z.string().min(1, "Drinking preference is required"),
      smokingHabits: z.string().min(1, "Smoking preference is required"),
      religion: otherGuardedArray(
        "Select at least one",
        "Please specify the other religion",
      ),
      motherTongue: otherGuardedArray(
        "Select at least one",
        "Please specify the other mother tongue",
      ),
      caste: otherGuardedArray(
        "Select at least one",
        "Please specify the other caste",
      ),
      manglik: z.string().min(1, "Please select manglik preference"),
    })
    .refine((data) => data.preferredAgeMin <= data.preferredAgeMax, {
      message: "Minimum age must be less than or equal to maximum age",
      path: ["preferredAgeMin"],
    })
    .refine((data) => data.preferredHeightMin <= data.preferredHeightMax, {
      message: "Minimum height must be less than or equal to maximum height",
      path: ["preferredHeightMin"],
    }),
});

export type PartnerPreferenceSchemaType = z.infer<
  typeof partnerPreferenceSchema
>;

// ─── Combined Registration Schema ─────────────────────────────
export const registrationSchema = z.object({
  registrationToken: z.string(),
  profileFor: z.string().min(1),
  firstName: z.string().min(1).max(50),
  middleName: z.string().optional(),
  lastName: z.string().min(1).max(50),
  phone: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
  maritalStatus: z.string().min(1),
  gender: z.string().min(1),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  bio: z.string().max(500).optional(),
  children: z.object({
    noOfChildren: z.number().min(0).max(10),
    livingWithMe: z.boolean().optional(),
  }),
  address: z.object({
    addressLine: z.string().min(1),
    country: z.string().min(1),
    state: z.string().min(1),
    city: z.string().min(1),
    po: z.string().min(1),
    postalCode: z.string().regex(/^\d{6}$/),
  }),
  religion: z.string().min(1).regex(OTHER_OPTION_REGEX),
  motherTongue: z.string().min(1).regex(OTHER_OPTION_REGEX),
  knownLanguages: otherGuardedArray(
    "Select at least one language",
    "Please specify other languages",
  ),
  caste: z.string().min(1).regex(OTHER_OPTION_REGEX),
  subCaste: z.string().optional(),
  gothra: z.string().optional(),
  physicalInformation: z.object({
    height: z.number().min(100).max(250),
    weight: z.number().min(30).max(300),
    bodyType: z.string().min(1),
    complexion: z.string().min(1),
    physicalStatus: z.string().min(1),
  }),
  education: z.object({
    highestQualification: z.string().min(1).regex(OTHER_OPTION_REGEX),
    yearOfPassing: z.number().min(1970),
  }),
  occupation: z.object({
    employedIn: z.string().min(1),
    annualIncome: z.string().min(1),
  }),
  lifeStyle: z.object({
    diet: z.string().min(1),
    smoking: z.string().min(1),
    drinking: z.string().min(1),
  }),
  familyInformation: z.object({
    fatherStatus: z.string().min(1),
    motherStatus: z.string().min(1),
    familyClass: z.string().min(1),
    familyType: z.string().min(1),
    foodType: z.string().min(1),
    parentsMobileNumber: z.string().min(1),
    alternateNumber: z.string().optional(),
    numberOfBrothers: z.number().min(0).max(20),
    numberOfSisters: z.number().min(0).max(20),
    numberOfBrothersMarried: z.number().min(0).max(20),
    numberOfSistersMarried: z.number().min(0).max(20),
    familyLocationSameAsProfile: z.boolean(),
    familyLocation: z.string().optional(),
    familyAncestralOrigin: z.string().optional(),
  }),
  currentLocation: z.object({ country: z.string().min(1) }),
  hobbiesAndInterests: otherGuardedArray(
    "Select at least one hobby",
    "Please specify other hobbies",
  ),
  sports: otherGuardedArray(
    "Select at least one sport",
    "Please specify other sports",
  ),
  partnerPreference: z.object({
    preferredAgeMin: z.number().min(18).max(100),
    preferredAgeMax: z.number().min(18).max(100),
    maritalStatus: z.array(z.string()).min(1),
    preferredHeightMin: z.number().min(100).max(250),
    preferredHeightMax: z.number().min(100).max(250),
    preferredEducation: z.array(z.string()).min(1),
    employedIn: z.array(z.string()).min(1),
    annualIncome: z.array(z.string()).min(1),
    physicalStatus: z.array(z.string()).min(1),
    eatingHabits: z.array(z.string()).min(1),
    drinkingHabits: z.string().min(1),
    smokingHabits: z.string().min(1),
    religion: otherGuardedArray(
      "Select at least one",
      "Please specify other religion",
    ),
    motherTongue: otherGuardedArray(
      "Select at least one",
      "Please specify other mother tongue",
    ),
    caste: otherGuardedArray(
      "Select at least one",
      "Please specify other caste",
    ),
    manglik: z.string().min(1),
  }),
  profileImages: z
    .array(z.string())
    .min(1, "Select at least one profile image"),
  idCardImages: z.array(z.string()).min(1, "Select at least one ID card image"),
});

export type RegistrationSchemaType = z.infer<typeof registrationSchema>;

export const registrationWithRefineSchema = registrationSchema
  .refine(
    (data) =>
      data.partnerPreference.preferredAgeMin <=
      data.partnerPreference.preferredAgeMax,
    {
      message: "Minimum age must be less than or equal to maximum age",
      path: ["partnerPreference", "preferredAgeMin"],
    },
  )
  .refine(
    (data) =>
      data.partnerPreference.preferredHeightMin <=
      data.partnerPreference.preferredHeightMax,
    {
      message: "Minimum height must be less than or equal to maximum height",
      path: ["partnerPreference", "preferredHeightMin"],
    },
  )
  .refine(
    (data) =>
      data.familyInformation.familyLocationSameAsProfile ||
      !!data.familyInformation.familyLocation?.trim(),
    {
      message: "Family location is required",
      path: ["familyInformation", "familyLocation"],
    },
  );

export type RegistrationFormData = z.infer<typeof registrationWithRefineSchema>;
