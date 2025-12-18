import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { Icon as IconComponent } from "../Icon";
import { SvgIcon } from "../SvgIcon";
import React from "react";

const meta = {
  component: Button,
  argTypes: {
    view: {
      options: ["primary", "secondary", "ghost"],
      control: { type: "radio" },
    },
    size: {
      options: ["s", "m"],
      control: { type: "radio" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    loading: {
      control: { type: "boolean" },
    },
    selected: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button text",
    view: "primary",
    size: "m",
    disabled: false,
    loading: false,
    selected: false,
  },
  render: (args) => <Button {...args} />,
};

export const View: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "20px" }}>
      <Button view="primary" {...args} />
      <Button view="secondary" {...args} />
      <Button view="ghost" {...args} />
    </div>
  ),
};

export const Size: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "20px" }}>
      <Button size="s" {...args} />
      <Button size="m" {...args} />
    </div>
  ),
};

export const Icon: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "20px" }}>
      <Button {...args}>Button text</Button>
      <Button {...args}>
        <IconComponent data={SvgIcon} size={args.size === "s" ? "16px" : "20px"} />
        Button text
      </Button>
      <Button {...args}>
        Button text
        <IconComponent data={SvgIcon} size={args.size === "s" ? "16px" : "20px"} />
      </Button>
      <Button {...args}>
        <IconComponent data={SvgIcon} size={args.size === "s" ? "16px" : "20px"} />
      </Button>
    </div>
  ),
};
