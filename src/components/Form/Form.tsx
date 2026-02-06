import { useForm, FormProvider, useWatch, UseFormReturn, FieldValues } from "react-hook-form";
import { cn } from "../utils/cn";
import { Field } from "./components";
import "./Form.scss";

type BaseFormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit">;

export type FormProps<T extends FieldValues> = BaseFormProps & {
  form?: UseFormReturn<T, unknown, undefined>;
  onSubmit?: (data: T, event?: React.BaseSyntheticEvent) => void;
};

const block = cn("form");

export const Form = <T extends FieldValues>(props: FormProps<T>) => {
  const { children, className, form, onSubmit, ...attrs } = props;

  const methods = useForm<T>();
  const providerProps = form ?? methods;

  return (
    <FormProvider {...providerProps}>
      <form
        className={block({}, className)}
        onSubmit={onSubmit ? providerProps.handleSubmit(onSubmit) : undefined}
        {...attrs}
      >
        {children}
      </form>
    </FormProvider>
  );
};

Form.Field = Field;
Form.useForm = useForm;
Form.useWatch = useWatch;
