import type { PersonalInfo, WorkExperience } from "../../template.types";

/**
 * Default values for the basic-resume template.
 * These are the initial empty/default values used when creating a new resume.
 */
export const defaultPersonalInfo: PersonalInfo = {
  name: "",
  location: "",
  email: "",
  github: "",
  linkedin: "",
  phone: "",
  personalSite: "",
  accentColor: "#000000",
  font: "New Computer Modern",
  paper: "us-letter",
  authorPosition: "left",
  personalInfoPosition: "left",
};

export const defaultWorkExperience: WorkExperience = {
  title: "",
  location: "",
  company: "",
  startDate: "",
  endDate: "",
  bullet_points: [],
};
