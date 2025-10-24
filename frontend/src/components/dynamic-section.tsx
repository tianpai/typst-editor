import type { SectionSchema, FieldSchema, SectionEntry, FieldValue } from "../codegen/adaptor/base.types";
import { useResumeStore } from "../codegen/resumeState";
import { DynamicField } from "./dynamic-field";

interface DynamicSectionProps {
  schema: SectionSchema;
}

interface SectionWrapperProps {
  title: string;
  children: React.ReactNode;
}

function SectionWrapper({ title, children }: SectionWrapperProps) {
  return (
    <div className="border-2 p-4 mb-2">
      <h3 className="font-bold mb-2">{title}</h3>
      {children}
    </div>
  );
}

interface FieldListProps {
  fields: FieldSchema[];
  data: SectionEntry;
  onFieldChange: (fieldKey: string, value: FieldValue) => void;
}

function FieldList({ fields, data, onFieldChange }: FieldListProps) {
  return (
    <>
      {fields.map((field) => (
        <DynamicField
          key={field.key}
          schema={field}
          value={data[field.key]}
          onChange={(value) => onFieldChange(field.key, value)}
        />
      ))}
    </>
  );
}

interface EntryItemProps {
  label: string;
  index: number;
  fields: FieldSchema[];
  data: SectionEntry;
  canRemove: boolean;
  onFieldChange: (fieldKey: string, value: FieldValue) => void;
  onRemove: () => void;
}

function EntryItem({
  label,
  index,
  fields,
  data,
  canRemove,
  onFieldChange,
  onRemove,
}: EntryItemProps) {
  return (
    <div className="border p-4 mb-2">
      <div className="flex justify-between items-center mb-3">
        <h4>
          {label} #{index + 1}
        </h4>
        {canRemove && (
          <button type="button" onClick={onRemove} className="px-3 py-1">
            Remove
          </button>
        )}
      </div>
      <FieldList fields={fields} data={data} onFieldChange={onFieldChange} />
    </div>
  );
}

export function DynamicSection({ schema }: DynamicSectionProps) {
  const data = useResumeStore((state) => state.data[schema.id]);
  const updateField = useResumeStore((state) => state.updateField);
  const addEntry = useResumeStore((state) => state.addEntry);
  const removeEntry = useResumeStore((state) => state.removeEntry);
  const compile = useResumeStore((state) => state.compile);

  const handleFieldChange = (
    index: number | null,
    fieldKey: string,
    value: FieldValue,
  ) => {
    updateField(schema.id, index, fieldKey, value);
    compile();
  };

  const handleRemove = (index: number) => {
    removeEntry(schema.id, index);
    compile();
  };

  const handleAdd = () => {
    addEntry(schema.id);
  };

  if (!schema.multiple) {
    const sectionData = (data as SectionEntry) || {};
    return (
      <SectionWrapper title={schema.label}>
        <FieldList
          fields={schema.fields}
          data={sectionData}
          onFieldChange={(fieldKey, value) =>
            handleFieldChange(null, fieldKey, value)
          }
        />
      </SectionWrapper>
    );
  }

  const entries = (data as SectionEntry[]) || [];
  const canRemoveAny = !schema.required || entries.length > 1;

  return (
    <SectionWrapper title={schema.label}>
      {entries.length === 0 && (
        <p className="text-gray-500 italic mb-2">
          No {schema.label.toLowerCase()} added yet.
        </p>
      )}

      {entries.map((entry: SectionEntry, index: number) => (
        <EntryItem
          key={index}
          label={schema.label}
          index={index}
          fields={schema.fields}
          data={entry}
          canRemove={canRemoveAny || index !== entries.length - 1}
          onFieldChange={(fieldKey, value) =>
            handleFieldChange(index, fieldKey, value)
          }
          onRemove={() => handleRemove(index)}
        />
      ))}

      <button type="button" onClick={handleAdd} className="px-4 py-2">
        Add {schema.label}
      </button>
    </SectionWrapper>
  );
}
