import InfoBox from "./InfoBox";
import type {Meta, StoryObj} from "@storybook/react";

const meta = {
  title: "InfoBox",
  component: InfoBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    title: "I am a infobox title",
    message: "And I am the infobox content",
    onClose: () => null,
  },
} satisfies Meta<typeof InfoBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {},
};
export const Warning: Story = {
  args: {
    variant: "warning",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
  },
};
