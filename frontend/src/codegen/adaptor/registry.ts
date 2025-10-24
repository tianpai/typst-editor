import type { TemplateAdapter } from "./base.types";
import { BasicResumeAdapter } from "../templates/basic-resume/adapter";

/**
 * Registry of all available template adapters.
 *
 * To add a new template:
 * 1. Create a new directory in templates/[template-name]
 * 2. Implement the TemplateAdapter interface in adapter.ts
 * 3. Add it to this registry
 */
export const TEMPLATE_REGISTRY: Record<string, TemplateAdapter> = {
  "basic-resume": new BasicResumeAdapter(),
  // Add more templates here:
  // "brilliant-cv": new BrilliantCVAdapter(),
  // "modern-cv": new ModernCVAdapter(),
};

/**
 * Get a template adapter by ID.
 * @param templateId - The unique identifier for the template
 * @returns The template adapter instance
 * @throws Error if template not found
 */
export function getTemplateAdapter(templateId: string): TemplateAdapter {
  const adapter = TEMPLATE_REGISTRY[templateId];
  if (!adapter) {
    throw new Error(
      `Template "${templateId}" not found. Available templates: ${Object.keys(TEMPLATE_REGISTRY).join(", ")}`
    );
  }
  return adapter;
}

/**
 * Get all available template IDs.
 */
export function getAvailableTemplates(): string[] {
  return Object.keys(TEMPLATE_REGISTRY);
}

/**
 * Default template ID to use when none is specified.
 */
export const DEFAULT_TEMPLATE_ID = "basic-resume";
