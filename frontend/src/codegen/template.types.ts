import type { SectionEntry, TemplateData } from "./adaptor/base.types";

/**
 * Work experience entry structure for basic-resume template.
 * Compatible with SectionEntry (all fields are FieldValue types).
 */
export interface WorkExperience extends SectionEntry {
  title: string;
  location: string;
  company: string;
  startDate: string;
  endDate: string;
  bullet_points: string[];
}

export interface Education extends SectionEntry {
  institution: string;
  location: string;
  degree: string;
  startDate: string;
  endDate: string;
  bullet_points: string[];
}

export interface ImportStatement {
  path: string;
  version: string;
}

/**
 * Personal info entry structure for basic-resume template.
 * Compatible with SectionEntry (all fields are FieldValue types).
 */
export interface PersonalInfo extends SectionEntry {
  name: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  phone: string;
  personalSite: string;
  accentColor: string;
  font: string;
  paper: string;
  authorPosition: string;
  personalInfoPosition: string;
}

export interface Project extends SectionEntry {
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  url: string;
  bullet_points: string[];
}

export interface Extracurricular extends SectionEntry {
  activity: string;
  dates: string;
  bullet_points: string[];
}

export interface Certificate extends SectionEntry {
  name: string;
  issuer: string;
  url: string;
  date: string;
}

export interface Skill extends SectionEntry {
  category: string;
  items: string[];
}

/**
 * Complete data shape for the basic-resume template.
 * Compatible with TemplateData (properly typed section values).
 */
export interface BasicResumeData extends TemplateData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  extracurriculars: Extracurricular[];
  certificates: Certificate[];
  skills: Skill[];
}
