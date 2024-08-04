import Button from "./Button";
import {EyeIcon} from "@/Icons";
import {fn} from "@storybook/test";
import type {Meta, StoryObj} from "@storybook/react";

const meta = {
  title: "Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {onClick: fn(), icon: EyeIcon},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "success",
    children: "Button",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Button",
  },
};
