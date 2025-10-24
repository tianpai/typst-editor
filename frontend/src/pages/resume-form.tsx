import { useResumeStore } from "../codegen/resumeState";
import { getTemplateAdapter } from "../codegen/adaptor/registry";
import { DynamicSection } from "../components/dynamic-section";

export default function ResumeForm() {
  const templateId = useResumeStore((state) => state.templateId);
  const adapter = getTemplateAdapter(templateId);
  const schema = adapter.getSchema();

  return (
    <div className="h-screen overflow-y-auto border-2 p-4">
      {schema.map((sectionSchema) => (
        <DynamicSection key={sectionSchema.id} schema={sectionSchema} />
      ))}
    </div>
  );
}
