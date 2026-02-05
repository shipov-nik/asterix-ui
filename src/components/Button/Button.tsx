import React, { isValidElement, useRef } from "react";
import { cn } from "../utils/cn";
import { Icon } from "../Icon";
import "./Button.scss";

type ButtonSize = "s" | "m";

type ButtonView = "primary" | "secondary" | "ghost";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  view?: ButtonView;
  disabled?: boolean;
  loading?: boolean;
  selected?: boolean;
};

const block = cn("button");

export const Button: React.FC<ButtonProps> = React.forwardRef(
  (props, ref: React.Ref<HTMLButtonElement>) => {
    const {
      className,
      children = "Button text",
      size = "m",
      view = "primary",
      disabled,
      loading,
      selected,
      type = "button",
      ...attrs
    } = props;

    const buttonRef = useRef<HTMLButtonElement>(null);

    const additionalClasses = block(
      {
        size,
        view,
        disabled: disabled || loading,
        loading,
        selected,
      },
      className,
    );

    const preparedChildren = (children: React.ReactNode) => {
      const items = React.Children.toArray(children) as React.ReactElement[];

      if (items.length === 1) {
        const сhildElement = items[0];

        if (isValidElement(сhildElement) && сhildElement.type === Icon) {
          return <span className={block("icon")}>{сhildElement}</span>;
        } else {
          return <span className={block("text")}>{сhildElement}</span>;
        }
      } else {
        if (isValidElement(items[1]) && items[1].type === Icon) {
          return (
            <>
              <span className={block("text")}>{items[0]}</span>
              <span className={block("icon")}>{items[1]}</span>
            </>
          );
        }
        return (
          <>
            <span className={block("icon")}>{items[0]}</span>
            <span className={block("text")}>{items[1]}</span>
          </>
        );
      }
    };

    return (
      <button
        ref={ref || buttonRef}
        className={additionalClasses}
        disabled={disabled || loading}
        type={type}
        {...attrs}
      >
        {preparedChildren(children)}
      </button>
    );
  },
);
