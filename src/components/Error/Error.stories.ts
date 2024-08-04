import Error from "./Error";
import type {Meta, StoryObj} from "@storybook/react";

const meta = {
  title: "Error",
  component: Error,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    error:
      "L’identifiant ou le mot de passe ne correspondent pas, retente ta chance.",
  },
} satisfies Meta<typeof Error>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {};
