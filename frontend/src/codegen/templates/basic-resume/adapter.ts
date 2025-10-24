import type {
  TemplateAdapter,
  SectionSchema,
  TemplateData,
} from "../../adaptor/base.types";
import type {
  PersonalInfo,
  WorkExperience,
  Education,
  Project,
  Extracurricular,
  Certificate,
  Skill,
  BasicResumeData,
} from "../../template.types";
import { defaultPersonalInfo } from "./defaults";

/**
 * Adapter for the basic-resume Typst template.
 *
 * Template: @preview/basic-resume:0.2.9
 * Provides functions like #work(), #edu(), #project() with a simple API.
 */
export class BasicResumeAdapter implements TemplateAdapter {
  id = "basic-resume";
  name = "Basic Resume";
  import = {
    path: "@preview/basic-resume",
    version: "0.2.9",
  };

  getSchema(): SectionSchema[] {
    return [
      {
        id: "personalInfo",
        label: "Personal Information",
        multiple: false,
        required: true, // One (always exists)
        fields: [
          { key: "name", label: "Name", type: "text" },
          { key: "email", label: "Email", type: "email" },
          { key: "phone", label: "Phone", type: "tel" },
          { key: "location", label: "Location", type: "text" },
          { key: "github", label: "GitHub", type: "text" },
          { key: "linkedin", label: "LinkedIn", type: "text" },
          { key: "personalSite", label: "Personal Site", type: "url" },
          { key: "accentColor", label: "Accent Color", type: "color" },
          {
            key: "font",
            label: "Font",
            type: "select",
            options: [
              "New Computer Modern",
              "Latin Modern Roman",
              "TeX Gyre Pagella",
            ],
          },
          {
            key: "paper",
            label: "Paper Size",
            type: "select",
            options: ["us-letter", "a4"],
          },
          {
            key: "authorPosition",
            label: "Author Position",
            type: "select",
            options: ["left", "center", "right"],
          },
          {
            key: "personalInfoPosition",
            label: "Personal Info Position",
            type: "select",
            options: ["left", "center", "right"],
          },
        ],
      },
      {
        id: "workExperience",
        label: "Work Experience",
        multiple: true,
        required: false, // Zero or more
        fields: [
          { key: "title", label: "Job Title", type: "text" },
          { key: "company", label: "Company", type: "text" },
          { key: "location", label: "Location", type: "text" },
          { key: "startDate", label: "Start Date", type: "date" },
          { key: "endDate", label: "End Date", type: "date" },
          {
            key: "bullet_points",
            label: "Responsibilities",
            type: "text-array",
          },
        ],
      },
      {
        id: "education",
        label: "Education",
        multiple: true,
        required: false, // Zero or more
        fields: [
          { key: "institution", label: "Institution", type: "text" },
          { key: "location", label: "Location", type: "text" },
          { key: "degree", label: "Degree", type: "text" },
          { key: "startDate", label: "Start Date", type: "date" },
          { key: "endDate", label: "End Date", type: "date" },
          {
            key: "bullet_points",
            label: "Achievements/Coursework",
            type: "text-array",
          },
        ],
      },
      {
        id: "projects",
        label: "Projects",
        multiple: true,
        required: false, // Zero or more
        fields: [
          { key: "name", label: "Project Name", type: "text" },
          { key: "role", label: "Role", type: "text" },
          { key: "startDate", label: "Start Date", type: "date" },
          { key: "endDate", label: "End Date", type: "date" },
          { key: "url", label: "URL", type: "url" },
          {
            key: "bullet_points",
            label: "Description",
            type: "text-array",
          },
        ],
      },
      {
        id: "extracurriculars",
        label: "Extracurricular Activities",
        multiple: true,
        required: false, // Zero or more
        fields: [
          { key: "activity", label: "Activity", type: "text" },
          { key: "dates", label: "Dates", type: "text" },
          {
            key: "bullet_points",
            label: "Description",
            type: "text-array",
          },
        ],
      },
      {
        id: "certificates",
        label: "Certificates",
        multiple: true,
        required: false, // Zero or more
        fields: [
          { key: "name", label: "Certificate Name", type: "text" },
          { key: "issuer", label: "Issuer", type: "text" },
          { key: "url", label: "URL", type: "url" },
          { key: "date", label: "Date", type: "date" },
        ],
      },
      {
        id: "skills",
        label: "Skills",
        multiple: true,
        required: false, // Zero or more
        fields: [
          { key: "category", label: "Category", type: "text" },
          {
            key: "items",
            label: "Skills",
            type: "text-array",
          },
        ],
      },
    ];
  }

  getDefaults(): TemplateData {
    const defaults: BasicResumeData = {
      personalInfo: defaultPersonalInfo,
      workExperience: [],
      education: [],
      projects: [],
      extracurriculars: [],
      certificates: [],
      skills: [],
    };
    return defaults;
  }

  generateTypst(data: TemplateData): string {
    const typedData = data as BasicResumeData;
    const personalInfo = typedData.personalInfo;
    const workExperience = typedData.workExperience;
    const education = typedData.education;
    const projects = typedData.projects;
    const extracurriculars = typedData.extracurriculars;
    const certificates = typedData.certificates;
    const skills = typedData.skills;

    let output = this.generateImportStatement();
    output += "\n\n";
    output += this.generatePersonalInfo(personalInfo);

    if (workExperience && workExperience.length > 0) {
      output += "\n\n== Work Experience\n";
      workExperience.forEach((exp) => {
        output += "\n" + this.generateWorkEntry(exp);
      });
    }

    if (education && education.length > 0) {
      output += "\n\n== Education\n";
      education.forEach((edu) => {
        output += "\n" + this.generateEducationEntry(edu);
      });
    }

    if (projects && projects.length > 0) {
      output += "\n\n== Projects\n";
      projects.forEach((project) => {
        output += "\n" + this.generateProjectEntry(project);
      });
    }

    if (extracurriculars && extracurriculars.length > 0) {
      output += "\n\n== Extracurricular Activities\n";
      extracurriculars.forEach((activity) => {
        output += "\n" + this.generateExtracurricularEntry(activity);
      });
    }

    if (certificates && certificates.length > 0) {
      output += "\n\n== Certificates\n";
      certificates.forEach((cert) => {
        output += "\n" + this.generateCertificateEntry(cert);
      });
    }

    if (skills && skills.length > 0) {
      output += "\n\n== Skills\n";
      skills.forEach((skill) => {
        output += this.generateSkillEntry(skill) + "\n";
      });
    }

    return output;
  }

  generateImportStatement(): string {
    return `#import "${this.import.path}:${this.import.version}": *`;
  }

  generatePersonalInfo(personalInfo: PersonalInfo): string {
    return `#let name = "${personalInfo.name}"
#let location = "${personalInfo.location}"
#let email = "${personalInfo.email}"
#let github = "${personalInfo.github}"
#let linkedin = "${personalInfo.linkedin}"
#let phone = "${personalInfo.phone}"
#let personal-site = "${personalInfo.personalSite}"

#show: resume.with(
  author: name,
  location: location,
  email: email,
  github: github,
  linkedin: linkedin,
  phone: phone,
  personal-site: personal-site,
  accent-color: "${personalInfo.accentColor}",
  font: "${personalInfo.font}",
  paper: "${personalInfo.paper}",
  author-position: ${personalInfo.authorPosition},
  personal-info-position: ${personalInfo.personalInfoPosition}
)`;
  }

  generateWorkEntry(workExperience: WorkExperience): string {
    return `#work(
  title: "${workExperience.title}",
  location: "${workExperience.location}",
  company: "${workExperience.company}",
  dates: dates-helper(start-date: "${workExperience.startDate}", end-date: "${workExperience.endDate}"),
)
${workExperience.bullet_points.map((bullet) => `- ${bullet}`).join("\n")}`;
  }

  generateEducationEntry(education: Education): string {
    const bulletPoints =
      education.bullet_points.length > 0
        ? "\n" +
          education.bullet_points.map((bullet) => `- ${bullet}`).join("\n")
        : "";

    return `#edu(
  institution: "${education.institution}",
  location: "${education.location}",
  dates: dates-helper(start-date: "${education.startDate}", end-date: "${education.endDate}"),
  degree: "${education.degree}",
)${bulletPoints}`;
  }

  generateProjectEntry(project: Project): string {
    return `#project(
  name: "${project.name}",
  role: "${project.role}",
  dates: dates-helper(start-date: "${project.startDate}", end-date: "${project.endDate}"),
  url: "${project.url}",
)
${project.bullet_points.map((bullet) => `- ${bullet}`).join("\n")}`;
  }

  generateExtracurricularEntry(extracurricular: Extracurricular): string {
    return `#extracurriculars(
  activity: "${extracurricular.activity}",
  dates: "${extracurricular.dates}",
)
${extracurricular.bullet_points.map((bullet) => `- ${bullet}`).join("\n")}`;
  }

  generateCertificateEntry(certificate: Certificate): string {
    return `#certificates(
  name: "${certificate.name}",
  issuer: "${certificate.issuer}",
  url: "${certificate.url}",
  date: "${certificate.date}",
)`;
  }

  generateSkillEntry(skill: Skill): string {
    return `- *${skill.category}*: ${skill.items.join(", ")}`;
  }
}
