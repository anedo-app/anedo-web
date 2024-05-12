import TextArea from "..";
import {fn} from "@vitest/spy";
import {TestContext} from "@/types/tests.interface";

import {fireEvent, render} from "@testing-library/react";
import {describe, expect, test, beforeEach} from "vitest";
import {TextAreaProps, TextAreaRolesEnum} from "../TextArea.types";

type LocalTestContext = TestContext<Omit<TextAreaProps, "value">>;

const value = "Text";
const placeholder = "Placeholder";

beforeEach<LocalTestContext>((context) => {
  context.wrapper = (props) =>
    render(
      <TextArea
        value={value}
        onChange={() => props?.onChange}
        placeholder={placeholder}
        {...props}
      />,
    );
});

describe("TextArea", () => {
  test<LocalTestContext>("should show text", ({wrapper}) => {
    const TextArea = wrapper();
    expect(TextArea.getByDisplayValue(value)).toBeDefined();
  });

  test<LocalTestContext>("should handle onChange", ({wrapper}) => {
    const handleClick = fn();
    const TextArea = wrapper({onChange: handleClick});

    fireEvent.change(TextArea.getByRole(TextAreaRolesEnum.TEXT_AREA), {
      target: {value: "new value"},
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe("TextArea disabled", () => {
  test<LocalTestContext>("should show disabled state", async ({wrapper}) => {
    const TextArea = wrapper({disabled: true});

    expect(TextArea.getByDisplayValue(value)).toBeDefined();
    expect(TextArea.getByRole(TextAreaRolesEnum.TEXT_AREA).className).toContain(
      "disabled",
    );
  });

  test<LocalTestContext>("should prevent click", async ({wrapper}) => {
    const handleClick = fn();
    const TextArea = wrapper({onClick: handleClick, disabled: true});

    fireEvent.click(TextArea.getByRole(TextAreaRolesEnum.TEXT_AREA));

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
