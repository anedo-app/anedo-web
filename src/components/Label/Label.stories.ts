import Label from "./Label";
import type {Meta, StoryObj} from "@storybook/react";

const meta = {
  title: "Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    label: "Hello World",
  },
};

export const Error: Story = {
  args: {
    label: "Hello World",
    error: true,
  },
};

export const Required: Story = {
  args: {
    label: "Hello World",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Hello World",
    disabled: true,
  },
};
