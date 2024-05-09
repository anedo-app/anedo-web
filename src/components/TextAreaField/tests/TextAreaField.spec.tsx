import TextAreaField from "..";
import {render} from "@testing-library/react";
import {fireEvent, fn} from "@storybook/test";
import {TestContext} from "@/types/tests.interface";
import {describe, expect, test, beforeEach} from "vitest";
import {TextAreaFieldProps} from "../TextAreaField.types";
import {TextAreaRolesEnum} from "@/components/TextArea/TextArea.types";

type LocalTestContext = TestContext<Omit<TextAreaFieldProps, "value">>;

const value = "Text";
const placeholder = "Placeholder";

beforeEach<LocalTestContext>((context) => {
  context.wrapper = (props) =>
    render(
      <TextAreaField
        value={value}
        onChange={() => props?.onChange}
        placeholder={placeholder}
        {...props}
      />,
    );
});

describe("TextAreaField", () => {
  test<LocalTestContext>("should show text", ({wrapper}) => {
    const TextAreaField = wrapper();
    expect(TextAreaField.getByDisplayValue(value)).toBeDefined();
  });

  test<LocalTestContext>("should handle onChange", ({wrapper}) => {
    const handleClick = fn();
    const TextAreaField = wrapper({onChange: handleClick});

    fireEvent.change(TextAreaField.getByRole(TextAreaRolesEnum.TEXT_AREA), {
      target: {value: "new value"},
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe("TextAreaField disabled", () => {
  test<LocalTestContext>("should show disabled state", async ({wrapper}) => {
    const TextAreaField = wrapper({disabled: true});

    expect(TextAreaField.getByDisplayValue(value)).toBeDefined();
    expect(
      TextAreaField.getByRole(TextAreaRolesEnum.TEXT_AREA).className,
    ).toContain("disabled");
  });

  test<LocalTestContext>("should prevent click", async ({wrapper}) => {
    const handleClick = fn();
    const TextAreaField = wrapper({onClick: handleClick, disabled: true});

    fireEvent.click(TextAreaField.getByRole(TextAreaRolesEnum.TEXT_AREA));

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
