import InputText from "./InputText";
import {fn} from "@storybook/test";
import type {Meta, StoryObj} from "@storybook/react";

const meta = {
  title: "InputText",
  component: InputText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {onChange: fn()},
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    value: "Hello World",
  },
};

export const Danger: Story = {
  args: {
    value: "Hello World",
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    value: "Hello World",
    disabled: true,
  },
};
