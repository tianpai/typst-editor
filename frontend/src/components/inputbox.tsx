export default function InputBox({
  labelName,
  value,
  onChange,
}: {
  labelName: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={labelName}>{labelName}</label>
      <input
        type="text"
        id={labelName}
        className="border-2"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export function InputGroup<T>({
  fields,
  data,
  onChange,
}: {
  fields: { key: keyof T; label: string }[];
  data: T;
  onChange: (
    field: keyof T,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="m-2">
      {fields.map((field) => (
        <InputBox
          key={String(field.key)}
          labelName={field.label}
          value={String(data[field.key] || "")}
          onChange={onChange(field.key)}
        />
      ))}
    </div>
  );
}
