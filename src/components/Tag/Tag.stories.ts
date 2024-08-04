import Tag from "./Tag";
import {EyeIcon} from "@/Icons";
import {fn} from "@storybook/test";
import type {Meta, StoryObj} from "@storybook/react";

const meta = {
  title: "Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "I am a tag",
  },
};

export const Icon: Story = {
  args: {
    text: "I am a tag",
    icon: EyeIcon,
  },
};

export const Closable: Story = {
  args: {
    text: "I am a tag",
    onClose: fn(),
  },
};

export const IconAndClosable: Story = {
  args: {
    text: "I am a tag",
    icon: EyeIcon,
    onClose: fn(),
  },
};
