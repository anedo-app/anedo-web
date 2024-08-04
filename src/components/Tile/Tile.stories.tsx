import Tile from "./Tile";
import Avatar from "../Avatar";
import {EyeIcon} from "@/Icons";
import {fn} from "@storybook/test";
import type {Meta, StoryObj} from "@storybook/react";

const meta = {
  title: "Tile",
  component: Tile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {onClick: fn(), icon: EyeIcon},
} satisfies Meta<typeof Tile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "I am a tile title",
    description: "And I am the tile content",
  },
};

export const Disabled: Story = {
  args: {
    title: "I am a tile title",
    description: "And I am the tile content",
    disabled: true,
  },
};

export const NoTitle: Story = {
  args: {
    description: "And I am the tile content",
  },
};
export const NoDescription: Story = {
  args: {
    title: "I am a tile title",
  },
};

export const NoIcon: Story = {
  args: {
    icon: undefined,
    title: "I am a tile title",
    description: "And I am the tile content",
  },
};

export const WithChild: Story = {
  args: {
    icon: undefined,
    children: <Avatar src="" />,
    description: "I am a user name ",
  },
};

export const SmallWithChild: Story = {
  args: {
    small: true,
    icon: undefined,
    children: <Avatar src="" />,
    description: "I am a user name ",
  },
};
