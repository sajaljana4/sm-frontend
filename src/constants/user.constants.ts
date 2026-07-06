export const PROFILE_FOR_OPTIONS = [
  { value: "self", label: "Myself" },
  { value: "son", label: "Son" },
  { value: "daughter", label: "Daughter" },
  { value: "brother", label: "Brother" },
  { value: "sister", label: "Sister" },
  { value: "relative", label: "Relative" },
  { value: "friend", label: "Friend" },
];

export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export const BODY_TYPE_OPTIONS = [
  { value: "Slim", label: "Slim" },
  { value: "Athletic", label: "Athletic" },
  { value: "Average", label: "Average" },
  { value: "Heavy", label: "Heavy" },
];

export const COMPLEXION_OPTIONS = [
  { value: "Very Fair", label: "Very Fair" },
  { value: "Fair", label: "Fair" },
  { value: "Wheatish", label: "Wheatish" },
  { value: "Dark", label: "Dark" },
];

export const PHYSICAL_STATUS_OPTIONS = [
  { value: "normal", label: "Normal" },
  { value: "challenged", label: "Challenged" },
];

export const RELIGION_OPTIONS = [
  { value: "hindu", label: "Hindu" },
  { value: "sari dharam", label: "Sari Dharam" },
  { value: "sarna dharam", label: "Sarna Dharam" },
  { value: "christian catholic", label: "Christian Catholic" },
  { value: "christian protestant", label: "Christian Protestant" },
];

/** Partner preference religion also allows an "Other" free-text entry. */
export const RELIGION_OPTIONS_FOR_PARTNER = [
  ...RELIGION_OPTIONS,
  { value: "others", label: "Other" },
];

export const LANGUAGE_OPTIONS = [
  { value: "english", label: "English" },
  { value: "bengali", label: "Bengali" },
  { value: "hindi", label: "Hindi" },
  { value: "oriya", label: "Oriya" },
  { value: "santali", label: "Santali" },
  { value: "assamese", label: "Assamese" },
  { value: "others", label: "Others" },
];

export const MOTHER_TONGUE_OPTIONS = [
  { value: "bengali", label: "Bengali" },
  { value: "hindi", label: "Hindi" },
  { value: "oriya", label: "Oriya" },
  { value: "santali", label: "Santali" },
  { value: "assamese", label: "Assamese" },
  { value: "english", label: "English" },
  { value: "others", label: "Others" },
];

export const CASTE_OPTIONS = [{ value: "santhali", label: "Santhali" }];

export const DIET_OPTIONS = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "non vegetarian", label: "Non Vegetarian" },
  { value: "eggetarian", label: "Eggetarian" },
  { value: "does not matter", label: "Does not matter" },
];

export const EMPLOYMENT_OPTIONS = [
  { value: "government", label: "Government" },
  { value: "semi-government", label: "Semi-Government" },
  { value: "private", label: "Private" },
  { value: "business", label: "Business" },
  { value: "defense", label: "Defense" },
  { value: "self-employed", label: "Self-Employed" },
  { value: "not-working", label: "Not-Working" },
];

export const FAMILY_STATUS_OPTIONS = [
  { value: "alive", label: "Alive" },
  { value: "deceased", label: "Deceased" },
  { value: "not_applicable", label: "Not Applicable" },
];

export const FAMILY_CLASS_OPTIONS = [
  { value: "lower_class", label: "Lower Class" },
  { value: "middle_class", label: "Middle Class" },
  { value: "upper_middle_class", label: "Upper Middle Class" },
  { value: "rich", label: "Rich" },
  { value: "affluent", label: "Affluent" },
];

export const FAMILY_TYPE_OPTIONS = [
  { value: "joint", label: "Joint Family" },
  { value: "nuclear", label: "Nuclear Family" },
];

export const HOBBY_OPTIONS = [
  { value: "cooking", label: "Cooking" },
  { value: "photography", label: "Photography" },
  { value: "dancing", label: "Dancing" },
  { value: "singing", label: "Singing" },
  { value: "painting", label: "Painting" },
  { value: "music", label: "Music" },
  { value: "art/handicraft", label: "Art/Handicraft" },
  { value: "movies", label: "Movies" },
  { value: "travelling", label: "Travelling" },
  { value: "others", label: "Others" },
];

export const SPORT_OPTIONS = [
  { value: "cricket", label: "Cricket" },
  { value: "carrom", label: "Carrom" },
  { value: "chess", label: "Chess" },
  { value: "running", label: "Running" },
  { value: "badminton", label: "Badminton" },
  { value: "swimming", label: "Swimming" },
  { value: "tennis", label: "Tennis" },
  { value: "others", label: "Others" },
];

export const MARITAL_STATUS_OPTIONS = [
  { value: "never_married", label: "Never Married" },
  { value: "widowed", label: "Widowed" },
  { value: "divorced", label: "Divorced" },
  { value: "awaiting_divorce", label: "Awaiting Divorce" },
  { value: "separated", label: "Separated" },
];

export const EDUCATION_LEVEL_OPTIONS = [
  { value: "bachelors", label: "Bachelors" },
  { value: "masters", label: "Masters" },
  { value: "doctorate", label: "Doctorate / PhD" },
  { value: "diploma", label: "Diploma" },
  { value: "high_school", label: "High School" },
];

export const INCOME_RANGE_OPTIONS = [
  { value: "None", label: "None" },
  { value: "1-4 lakhs", label: "1-4 lakhs" },
  { value: "5-8 lakhs", label: "5-8 lakhs" },
  { value: "9-12 lakhs", label: "9-12 lakhs" },
  { value: "13-16 lakhs", label: "13-16 lakhs" },
  { value: "17-20 lakhs", label: "17-20 lakhs" },
  { value: "21-24 lakhs", label: "21-24 lakhs" },
  { value: "25-28 lakhs and above", label: "25-28 lakhs and above" },
];

/** Partner preference income offers an "Any" choice instead of "None". */
export const INCOME_RANGE_OPTIONS_FOR_PARTNER = [
  { value: "1-4 lakhs", label: "1-4 lakhs" },
  { value: "5-8 lakhs", label: "5-8 lakhs" },
  { value: "9-12 lakhs", label: "9-12 lakhs" },
  { value: "13-16 lakhs", label: "13-16 lakhs" },
  { value: "17-20 lakhs", label: "17-20 lakhs" },
  { value: "21-24 lakhs", label: "21-24 lakhs" },
  { value: "25-28 lakhs and above", label: "25-28 lakhs and above" },
  { value: "any", label: "Any" },
];

export const DRINKING_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "occasionally", label: "Occasionally" },
  { value: "does not matter", label: "Does not matter" },
];

export const SMOKING_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "occasionally", label: "Occasionally" },
  { value: "does not matter", label: "Does not matter" },
];

export const MANGLIK_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "doesnt_matter", label: "Doesn't Matter" },
];

export const COUNTRY_OPTIONS = [
  { value: "India", label: "India" },
  { value: "USA", label: "USA" },
  { value: "UK", label: "UK" },
  { value: "Canada", label: "Canada" },
  { value: "Australia", label: "Australia" },
  { value: "UAE", label: "UAE" },
  { value: "Singapore", label: "Singapore" },
  { value: "others", label: "Other" },
];

export const STATE_OPTIONS = [
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Bihar", label: "Bihar" },
  { value: "Chhattisgarh", label: "Chhattisgarh" },
  { value: "Delhi", label: "Delhi" },
  { value: "Goa", label: "Goa" },
  { value: "Gujarat", label: "Gujarat" },
  { value: "Jharkhand", label: "Jharkhand" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Kerala", label: "Kerala" },
  { value: "Madhya Pradesh", label: "Madhya Pradesh" },
  { value: "Maharashtra", label: "Maharashtra" },
  { value: "Odisha", label: "Odisha" },
  { value: "Punjab", label: "Punjab" },
  { value: "Rajasthan", label: "Rajasthan" },
  { value: "Tamil Nadu", label: "Tamil Nadu" },
  { value: "Telangana", label: "Telangana" },
  { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  { value: "West Bengal", label: "West Bengal" },
];

export const QUALIFICATION_OPTIONS = [
  { value: "B.Tech (Computer Science)", label: "B.Tech (CS)" },
  { value: "B.Tech (Other)", label: "B.Tech (Other)" },
  { value: "B.E.", label: "B.E." },
  { value: "BBA", label: "BBA" },
  { value: "BCA", label: "BCA" },
  { value: "B.Com", label: "B.Com" },
  { value: "B.Sc", label: "B.Sc" },
  { value: "BA", label: "BA" },
  { value: "MBA", label: "MBA" },
  { value: "M.Tech", label: "M.Tech" },
  { value: "MCA", label: "MCA" },
  { value: "M.Sc", label: "M.Sc" },
  { value: "MBBS", label: "MBBS" },
  { value: "MD", label: "MD" },
  { value: "LLB", label: "LLB" },
  { value: "PhD", label: "PhD" },
  { value: "Diploma", label: "Diploma" },
  { value: "others", label: "Other" },
];

export const AGE_OPTIONS = Array.from({ length: 43 }, (_, i) => 18 + i); // 18–60
