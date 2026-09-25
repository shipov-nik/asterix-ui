import React, { cloneElement, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { Popup, PopupOffset, PopupPlacement } from "../Popup";
import "./Tooltip.scss";

type TooltipDelayProps = {
  openDelay?: number;
  closeDelay?: number;
};

export type TooltipProps = TooltipDelayProps & {
  /** Якорный элемент для тултипа */
  children: React.ReactElement;
  /** Положение тултипа */
  placement?: PopupPlacement;
  /** Текст */
  text?: string;
  /** Расстояние от якоря до тултипа */
  offset?: PopupOffset;
};

const block = cn("tooltip");

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const {
    children,
    placement = "bottom",
    text = "Tooltip text",
    offset,
    openDelay = 0,
    closeDelay = 0,
  } = props;

  const timeoutRef = useRef<number>(0);

  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setVisible(true), openDelay);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setVisible(false), closeDelay);
  };

  const anchorNode = cloneElement(
    children as React.ReactElement<
      React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
    >,
    {
      ref: setAnchorElement,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: () => setVisible(true),
      onBlur: () => setVisible(false),
    },
  );

  return (
    <>
      {anchorNode}
      <Popup anchorElement={anchorElement} placement={placement} open={visible} offset={offset}>
        <div className={block()}>{text}</div>
      </Popup>
    </>
  );
};
