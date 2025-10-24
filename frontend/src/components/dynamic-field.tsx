import type { FieldSchema, FieldValue } from "../codegen/adaptor/base.types";

interface DynamicFieldProps {
  schema: FieldSchema;
  value: FieldValue;
  onChange: (value: FieldValue) => void;
}

interface FieldWrapperProps {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}

function FieldWrapper({ label, htmlFor, children }: FieldWrapperProps) {
  return (
    <div className="mb-2">
      <label htmlFor={htmlFor} className="block mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function TextArrayField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  value: FieldValue;
  onChange: (value: string[]) => void;
}) {
  const items = Array.isArray(value) ? value : [];

  const updateItem = (index: number, newValue: string) => {
    const updated = [...items];
    updated[index] = newValue;
    onChange(updated);
  };

  const addItem = () => onChange([...items, ""]);

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <FieldWrapper label={label}>
      <div className="space-y-2">
        {items.map((item: string, index: number) => (
          <div key={index} className="flex gap-1">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-2 py-2 border"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="px-3 py-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addItem} className="px-4 py-2">
          Add {label}
        </button>
      </div>
    </FieldWrapper>
  );
}

export function DynamicField({ schema, value, onChange }: DynamicFieldProps) {
  const { key, label, type, placeholder, options } = schema;

  if (type === "text-array") {
    return (
      <TextArrayField
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange as (value: string[]) => void}
      />
    );
  }

  const stringValue = typeof value === "string" ? value : "";

  if (type === "select") {
    return (
      <FieldWrapper label={label} htmlFor={key}>
        <select
          id={key}
          value={stringValue}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border"
        >
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </FieldWrapper>
    );
  }

  if (type === "textarea") {
    return (
      <FieldWrapper label={label} htmlFor={key}>
        <textarea
          id={key}
          value={stringValue}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full px-2 py-2 border"
        />
      </FieldWrapper>
    );
  }

  return (
    <FieldWrapper label={label} htmlFor={key}>
      <input
        id={key}
        type={type}
        value={stringValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border"
      />
    </FieldWrapper>
  );
}
