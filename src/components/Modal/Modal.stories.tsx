import Modal from "./Modal";
import {fn} from "@storybook/test";
import type {Meta, StoryObj} from "@storybook/react";

const meta = {
  title: "Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onClose: fn(),
    title: "I am a modal title",
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "I am a modal title",
    isOpen: true,
  },
};
