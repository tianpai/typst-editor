import { create } from "zustand";
import { compileToSVG } from "./compile";
import {
  getTemplateAdapter,
  DEFAULT_TEMPLATE_ID,
} from "./adaptor/registry";
import type { TemplateData, SectionEntry, FieldValue } from "./adaptor/base.types";

interface ResumeState {
  templateId: string;
  data: TemplateData;
  svgOutput: string;

  /**
   * Update a field value in the data.
   * @param sectionId - The section ID (e.g., "personalInfo", "workExperience")
   * @param index - For array sections, the index of the entry. For single sections, pass null
   * @param field - The field name to update
   * @param value - The new value
   */
  updateField: (
    sectionId: string,
    index: number | null,
    field: string,
    value: FieldValue
  ) => void;

  /**
   * Add a new entry to an array section.
   * @param sectionId - The section ID
   */
  addEntry: (sectionId: string) => void;

  /**
   * Remove an entry from an array section.
   * @param sectionId - The section ID
   * @param index - The index of the entry to remove
   */
  removeEntry: (sectionId: string, index: number) => void;

  /**
   * Compile the current data to SVG.
   */
  compile: () => Promise<void>;

  /**
   * Switch to a different template.
   * @param templateId - The new template ID
   */
  switchTemplate: (templateId: string) => void;
}

// Get initial defaults from the default template adapter
const initialAdapter = getTemplateAdapter(DEFAULT_TEMPLATE_ID);
const initialDefaults = initialAdapter.getDefaults();

export const useResumeStore = create<ResumeState>((set, get) => ({
  templateId: DEFAULT_TEMPLATE_ID,
  data: initialDefaults,
  svgOutput: "",

  updateField: (sectionId, index, field, value) => {
    set((state) => {
      const newData: TemplateData = { ...state.data };
      const sectionData = newData[sectionId];

      if (index === null) {
        // Single object section
        const singleEntry = sectionData as SectionEntry;
        newData[sectionId] = {
          ...singleEntry,
          [field]: value as FieldValue,
        };
      } else {
        // Array section
        const arrayData = sectionData as SectionEntry[];
        const updatedArray = [...arrayData];
        updatedArray[index] = {
          ...arrayData[index],
          [field]: value as FieldValue,
        };
        newData[sectionId] = updatedArray;
      }

      return { data: newData };
    });
  },

  addEntry: (sectionId) => {
    set((state) => {
      const adapter = getTemplateAdapter(state.templateId);
      const schema = adapter.getSchema().find((s) => s.id === sectionId);

      if (!schema || !schema.multiple) {
        console.error(`Section ${sectionId} is not an array section`);
        return state;
      }

      // Create empty entry with all fields
      const emptyEntry: SectionEntry = {};
      schema.fields.forEach((field) => {
        if (field.type === "text-array") {
          emptyEntry[field.key] = [];
        } else {
          emptyEntry[field.key] = "";
        }
      });

      const newData: TemplateData = { ...state.data };
      const currentArray = (newData[sectionId] as SectionEntry[]) || [];
      newData[sectionId] = [...currentArray, emptyEntry];

      return { data: newData };
    });
  },

  removeEntry: (sectionId, index) => {
    set((state) => {
      const newData: TemplateData = { ...state.data };
      const currentArray = newData[sectionId];

      if (!Array.isArray(currentArray)) {
        console.error(`Section ${sectionId} is not an array`);
        return state;
      }

      newData[sectionId] = currentArray.filter((_, i) => i !== index);
      return { data: newData };
    });
  },

  compile: async () => {
    const { templateId, data } = get();
    const adapter = getTemplateAdapter(templateId);
    const typstCode = adapter.generateTypst(data);
    const svg = await compileToSVG(typstCode);
    set({ svgOutput: svg });
  },

  switchTemplate: (templateId: string) => {
    const adapter = getTemplateAdapter(templateId);
    const defaults = adapter.getDefaults();
    set({
      templateId,
      data: defaults,
      svgOutput: "",
    });
  },
}));
