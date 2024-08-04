import PasswordField from "..";
import type {Meta, StoryObj} from "@storybook/react";

const meta = {
  title: "PasswordField",
  component: PasswordField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Password",
    value: "bMBnPgb$n9M?#Ei7",
    placeholder: "Placeholder",
  },
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    label: "Password",
  },
};

export const Error: Story = {
  args: {
    value: "12345azert",
    error: "An error occured",
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    disabled: true,
  },
};
