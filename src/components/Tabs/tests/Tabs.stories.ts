import Tabs from "..";
import {fn} from "@storybook/test";
import type {Meta, StoryObj} from "@storybook/react";

const meta = {
  title: "Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    tabs: [
      {label: "Tab 1", value: "tab1", content: "Tab 1 content"},
      {label: "Tab 2", value: "tab2", content: "Tab 2 content"},
      {label: "Tab 3", value: "tab3", content: "Tab 3 content"},
    ],
  },
};

export const Notifications: Story = {
  args: {
    tabs: [
      {
        label: "Tab 1",
        value: "tab1",
        content: "Tab 1 content",
        notification: 3,
      },
      {
        label: "Tab 2",
        value: "tab2",
        content: "Tab 2 content",
        notification: 25,
      },
      {
        label: "Tab 3",
        value: "tab3",
        content: "Tab 3 content",
        notification: 0,
      },
    ],
  },
};
