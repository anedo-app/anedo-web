import EmailField from "..";
import type {Meta, StoryObj} from "@storybook/react";

const meta = {
  title: "EmailField",
  component: EmailField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Password",
    value: "test.email@anedo.app",
    placeholder: "Placeholder",
  },
} satisfies Meta<typeof EmailField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    label: "Password",
  },
};

export const Error: Story = {
  args: {
    value: "test.email@",
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    disabled: true,
  },
};
