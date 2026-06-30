import type { ChangeEvent, HTMLInputTypeAttribute } from 'react';

type FormFieldProps = {
  id: string;
  label: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  value: string;
  placeholder?: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function FormField({
  id,
  label,
  name,
  type = 'text',
  value,
  placeholder = '',
  error,
  onChange,
}: FormFieldProps) {
  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={id}>
        {label}
      </label>

      <input
        className="form-field__input"
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />

      {error && <p className="form-field__error">{error}</p>}
    </div>
  );
}

export default FormField;