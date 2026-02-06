import { cloneElement } from "react";
import {
  Controller,
  ControllerRenderProps,
  FieldError,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { Checkbox, Input, RadioGroup, Segmented, Select, Switch, Textarea } from "components";
import type { FieldRule } from "./Field";

type ControlChildProps = {
  id?: string;
  value?: unknown;
  checked?: boolean;
  onChange?: (...args: unknown[]) => void;
};

type ControlProps = {
  /** Единственный дочерний элемент — контрол ввода (Input, Select, Checkbox и т.д.) */
  child: React.ReactElement;
  name?: string;
  rules?: FieldRule;
  error?: FieldError;
  id?: string;
};

const getDefaultValue = (child: React.ReactElement): unknown => {
  switch (child.type) {
    case Checkbox:
    case Switch:
      return false;
    case Input:
    case Textarea:
    case RadioGroup:
    case Select:
    case Segmented:
      return "";
    default:
      return undefined;
  }
};

export const Control: React.FC<ControlProps> = (props) => {
  const { child, name, rules, error, id: fieldId } = props;

  const { control } = useFormContext();

  const renderedControl = ({ field }: { field: ControllerRenderProps<FieldValues, string> }) => {
    const childProps = child.props as ControlChildProps;
    const baseMerged = { ...childProps, ...field, error, id: fieldId ?? childProps.id };

    switch (child.type) {
      case Input:
      case Textarea: {
        const onChange = childProps.onChange;
        return cloneElement(child, {
          ...baseMerged,
          value: childProps.value ?? field.value,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            field.onChange(event.target.value);
            (onChange as ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined)?.(event);
          },
        } as React.ComponentProps<typeof child.type>);
      }
      case Checkbox:
      case Switch: {
        const onChange = childProps.onChange;
        return cloneElement(child, {
          ...baseMerged,
          checked: childProps.checked ?? field.value,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            field.onChange(event.target.checked);
            (onChange as ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined)?.(event);
          },
        } as React.ComponentProps<typeof child.type>);
      }
      case RadioGroup: {
        const onChange = childProps.onChange;
        return cloneElement(child, {
          ...baseMerged,
          value: childProps.value ?? field.value,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            field.onChange(event.target.value);
            (onChange as ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined)?.(event);
          },
        } as React.ComponentProps<typeof child.type>);
      }
      case Select: {
        const onChange = childProps.onChange;
        return cloneElement(child, {
          ...baseMerged,
          value: childProps.value ?? field.value,
          onChange: (event: unknown, option: unknown) => {
            field.onChange(option);
            (onChange as ((e: unknown, o: unknown) => void) | undefined)?.(event, option);
          },
        } as React.ComponentProps<typeof child.type>);
      }
      case Segmented: {
        const onChange = childProps.onChange;
        return cloneElement(child, {
          ...baseMerged,
          value: childProps.value ?? field.value,
          onChange: (value: string) => {
            field.onChange(value);
            (onChange as ((value: string) => void) | undefined)?.(value);
          },
        } as React.ComponentProps<typeof child.type>);
      }
      default:
        return child;
    }
  };

  if (!name) {
    return child;
  }

  return (
    <Controller
      control={control}
      defaultValue={getDefaultValue(child) as string | number | boolean}
      name={name}
      rules={rules}
      render={renderedControl}
    />
  );
};
