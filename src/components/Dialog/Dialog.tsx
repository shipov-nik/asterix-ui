import React from "react";
import { Button } from "../Button";
import { CloseIcon } from "../CloseIcon";
import { Icon } from "../Icon";
import { Modal } from "../Modal";
import { cn } from "../utils/cn";
import "./Dialog.scss";

export type DialogProps = {
  children?: React.ReactNode;
  size?: "s" | "m" | "l";
  title?: string;
  open?: boolean;
  onClose?: () => void;
};

const dialog = cn("dialog");

export const Dialog: React.FC<DialogProps> = (props) => {
  const { children, size = "s", title = "Dialog title", open, onClose } = props;

  return (
    <Modal open={open} onOpenChange={onClose}>
      <div className={dialog({ size })}>
        <div className={dialog("header")}>
          <h2 className={dialog("title")}>{title}</h2>
          <Button className={dialog("btn-close")} view="ghost" onClick={onClose}>
            <Icon data={CloseIcon} />
          </Button>
        </div>
        <div className={dialog("content")}>{children}</div>
        <div className={dialog("footer")}>
          <Button view="secondary" onClick={onClose}>
            Close
          </Button>
          <Button>Do something</Button>
        </div>
      </div>
    </Modal>
  );
};
