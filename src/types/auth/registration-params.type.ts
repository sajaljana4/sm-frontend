export interface RegistrationChildren {
  noOfChildren: number;
  livingWithMe?: boolean;
}

export interface RegistrationAddress {
  addressLine: string;
  country: string;
  state: string;
  city: string;
  po: string;
  postalCode: string;
}

export interface RegistrationPhysicalInfo {
  height: number;
  weight: number;
  bodyType: string;
  complexion: string;
  physicalStatus: string;
}

export interface RegistrationEducation {
  highestQualification: string;
  yearOfPassing: number;
}

export interface RegistrationOccupation {
  employedIn: string;
  annualIncome: string;
}

export interface RegistrationLifestyle {
  diet: string;
  smoking: string;
  drinking: string;
}

export interface RegistrationFamilyInfo {
  fatherStatus: string;
  motherStatus: string;
  familyClass: string;
  familyType: string;
  foodType: string;
  parentsMobileNumber: string;
  alternateNumber?: string;
  numberOfBrothers: number;
  numberOfSisters: number;
  numberOfBrothersMarried: number;
  numberOfSistersMarried: number;
  familyLocationSameAsProfile: boolean;
  familyLocation?: string;
  familyAncestralOrigin?: string;
}

export interface RegistrationCurrentLocation {
  country: string;
}

export interface RegistrationPartnerPreference {
  preferredAgeMin: number;
  preferredAgeMax: number;
  maritalStatus: string[];
  preferredHeightMin: number;
  preferredHeightMax: number;
  preferredEducation: string[];
  employedIn: string[];
  annualIncome: string[];
  physicalStatus: string[];
  eatingHabits: string[];
  drinkingHabits: string;
  smokingHabits: string;
  religion: string[];
  motherTongue: string[];
  caste: string[];
  manglik: string;
}

export interface RegistrationProfile {
  registrationToken: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  profileFor: string;
  gender: string;
  dob: string;
  maritalStatus: string;
  bio?: string;
  children: RegistrationChildren;
  address: RegistrationAddress;
  religion: string;
  motherTongue: string;
  knownLanguages: string[];
  caste: string;
  subCaste: string;
  gothra: string;
  physicalInformation: RegistrationPhysicalInfo;
  education: RegistrationEducation;
  occupation: RegistrationOccupation;
  lifeStyle: RegistrationLifestyle;
  familyInformation: RegistrationFamilyInfo;
  currentLocation: RegistrationCurrentLocation;
  hobbiesAndInterests: string[];
  sports: string[];
  partnerPreference: RegistrationPartnerPreference;
  profileImages?: string[];
  idCardImages?: string[];
}
