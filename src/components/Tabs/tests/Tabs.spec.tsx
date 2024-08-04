import Tabs from "..";
import {render} from "@testing-library/react";
import {fireEvent, fn} from "@storybook/test";
import {TestContext} from "@/types/tests.interface";
import {TabsProps, TabsRolesEnum} from "../Tabs.types";
import {describe, expect, test, beforeEach} from "vitest";

type LocalTestContext = TestContext<Omit<TabsProps, "tabs">>;

beforeEach<LocalTestContext>((context) => {
  context.wrapper = (props) =>
    render(
      <Tabs
        onChange={() => props?.onChange}
        tabs={[
          {label: "Tab 1", value: "tab1", content: "Tab 1 content"},
          {label: "Tab 2", value: "tab2", content: "Tab 2 content"},
          {label: "Tab 3", value: "tab3", content: "Tab 3 content"},
        ]}
        {...props}
      />,
    );
});

describe("Tabs component", () => {
  test<LocalTestContext>("should render component", ({wrapper}) => {
    const Tabs = wrapper();
    expect(Tabs.getByRole(TabsRolesEnum.TABS)).toBeDefined();
  });

  test<LocalTestContext>("should render all tabs", ({wrapper}) => {
    const Tabs = wrapper();
    expect(Tabs.getAllByRole(TabsRolesEnum.TAB)).toHaveLength(3);
  });

  test.skip<LocalTestContext>("should change tab on click", ({wrapper}) => {
    const handleClick = fn();
    const Tabs = wrapper({onChange: handleClick});

    fireEvent.click(Tabs.getAllByRole(TabsRolesEnum.TAB)[1]);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(Tabs.getByText("Tab 2 content")).toBeDefined();
  });
});
