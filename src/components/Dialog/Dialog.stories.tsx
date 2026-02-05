import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dialog, DialogProps } from "./Dialog";
import { Button } from "../Button";

export default {
  component: Dialog,
} as Meta<typeof Dialog>;

type Story = StoryObj<typeof Dialog>;

const DialogWithHooks = (args: DialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button view="secondary" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} {...args}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </Dialog>
    </>
  );
};

export const Default: Story = {
  render: (args) => <DialogWithHooks {...args} />,
};
