import Tag from "..";
import {fn} from "@vitest/spy";
import {EyeIcon} from "@/Icons";
import {TestContext} from "@/types/tests.interface";
import {TagProps, TagRolesEnum} from "../Tag.types";
import {fireEvent, render} from "@testing-library/react";
import {describe, expect, test, beforeEach} from "vitest";

type LocalTestContext = TestContext<Partial<TagProps>>;

const title = "Text";

beforeEach<LocalTestContext>((context) => {
  context.wrapper = (props) => render(<Tag text={title} {...props} />);
});

describe("Tag", () => {
  test<LocalTestContext>("should show text", ({wrapper}) => {
    const tag = wrapper();
    expect(tag.getByText(title)).toBeDefined();
  });

  test<LocalTestContext>("should handle close", ({wrapper}) => {
    const handleClick = fn();
    const tag = wrapper({onClose: handleClick});

    expect(tag.getByRole(TagRolesEnum.CLOSE)).toBeDefined();
    fireEvent.click(tag.getByRole(TagRolesEnum.CLOSE));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test<LocalTestContext>("should display Icon", ({wrapper}) => {
    const tag = wrapper({icon: EyeIcon});

    expect(tag.getByRole(TagRolesEnum.ICON)).toBeDefined();
  });
});
