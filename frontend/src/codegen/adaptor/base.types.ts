/**
 * Field types for UI rendering
 */
export type FieldType =
  | "text" // Single line text input
  | "email" // Email input with validation
  | "url" // URL input
  | "tel" // Phone number
  | "date" // Date picker
  | "color" // Color picker
  | "textarea" // Multi-line text
  | "select" // Dropdown
  | "text-array"; // Array of text inputs with add/remove buttons

/**
 * The actual runtime value a field can hold.
 * - Most field types hold a string
 * - text-array holds an array of strings
 */
export type FieldValue = string | string[];

/**
 * A single entry in a section (object with field keys mapping to values).
 */
export type SectionEntry = Record<string, FieldValue>;

/**
 * The value of a section in template data.
 * - Single sections: one SectionEntry
 * - Multiple sections: array of SectionEntry
 */
export type SectionValue = SectionEntry | SectionEntry[];

/**
 * Complete template data structure.
 * Maps section IDs to their values.
 */
export type TemplateData = Record<string, SectionValue>;

/**
 * Schema for a single field in a section
 */
export interface FieldSchema {
  /** Field name in data object */
  key: string;
  /** Display label */
  label: string;
  /** Input type */
  type: FieldType;
  /** Optional placeholder text */
  placeholder?: string;
  /** Options for select type only */
  options?: string[];
}

/**
 * Schema for a section (e.g., personalInfo, workExperience)
 *
 * Cardinality (multiple, required):
 * - (false, false) = zero or one
 * - (false, true)  = one
 * - (true, false)  = zero or more
 * - (true, true)   = one or more
 */
export interface SectionSchema {
  /** Section identifier (e.g., "personalInfo", "workExperience") */
  id: string;
  /** Display name (e.g., "Personal Information", "Work Experience") */
  label: string;
  /** true = array, false = single object */
  multiple: boolean;
  /** combined with multiple → 4 cardinality cases */
  required: boolean;
  /** Fields in this section */
  fields: FieldSchema[];
}

/**
 * Base interface for template adapters.
 * Each Typst template (basic-resume, brilliant-cv, etc.) implements this interface
 * to translate common data structures into template-specific Typst syntax.
 */
export interface TemplateAdapter {
  /** Unique identifier for the template */
  id: string;

  /** Display name for the template */
  name: string;

  /** Import statement configuration */
  import: {
    path: string;
    version: string;
  };

  /**
   * Get the schema defining all sections and fields for this template.
   * This drives the UI generation.
   */
  getSchema(): SectionSchema[];

  /**
   * Get default values for all sections based on the schema.
   * These defaults are template-specific (colors, fonts, etc.)
   */
  getDefaults(): TemplateData;

  /**
   * Generate the complete Typst document from dynamic data.
   * @param data - Data object with keys matching section IDs from schema
   */
  generateTypst(data: TemplateData): string;
}
