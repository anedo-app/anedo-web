import TextField from "./TextField";
import type {Meta, StoryObj} from "@storybook/react";

const meta = {
  title: "TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    value: "I am a text field",
    placeholder: "Placeholder",
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
  },
};

export const Error: Story = {
  args: {
    label: "Label",
    error: "An error occured",
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: "Label",
    required: true,
  },
};
