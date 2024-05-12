import Avatar from "./Avatar";
import type {Meta, StoryObj} from "@storybook/react";

const meta = {
  title: "Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    src: "https://picsum.photos/536/354",
  },
};

export const Waiting: Story = {
  args: {
    src: "https://picsum.photos/536/354",
    variant: "waiting",
  },
};

export const Ready: Story = {
  args: {
    src: "https://picsum.photos/536/354",
    variant: "ready",
  },
};

export const Small: Story = {
  args: {
    src: "https://picsum.photos/536/354",
    isSmall: true,
  },
};

export const ImageNotFound: Story = {
  args: {
    src: "https://felixbouveret.com/404",
  },
};
