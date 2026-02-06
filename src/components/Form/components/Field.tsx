import { FieldError, Message, ValidationRule, useFormContext } from "react-hook-form";
import { cn } from "../../utils/cn";
import { Control } from "./Control";

export type FieldRule = {
  required?: Message | ValidationRule<boolean>;
  pattern?: ValidationRule<RegExp>;
  minLength?: ValidationRule<number>;
  maxLength?: ValidationRule<number>;
  min?: ValidationRule<number>;
  max?: ValidationRule<number>;
};

export type FieldProps = {
  children?: React.ReactElement;
  label?: string;
  name?: string;
  rules?: FieldRule;
};

const field = cn("form-field");

export const Field: React.FC<FieldProps> = (props) => {
  const { children, label, name, rules } = props;

  const {
    formState: { errors },
  } = useFormContext();

  const fieldId = name ? `field-${name}` : undefined;
  const error = name ? (errors[name] as FieldError | undefined) : undefined;

  return (
    <div className={field()}>
      {label && (
        <label className={field("label")} htmlFor={fieldId}>
          {label}
          {rules?.required && <span className={field("required-mark")}>*</span>}
        </label>
      )}
      {children && (
        <Control child={children} error={error} id={fieldId} name={name} rules={rules} />
      )}
      {error?.message && (
        <span className={field("error")} role="alert">
          {String(error.message)}
        </span>
      )}
    </div>
  );
};
