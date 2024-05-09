import TextField from "..";
import {render} from "@testing-library/react";
import {fireEvent, fn} from "@storybook/test";
import {TextFieldProps} from "../TextField.types";
import {TestContext} from "@/types/tests.interface";
import {describe, expect, test, beforeEach} from "vitest";
import {InputTextRolesEnum} from "@/components/InputText/InputText.types";

type LocalTestContext = TestContext<Omit<TextFieldProps, "value">>;

const value = "Text";
const placeholder = "Placeholder";

beforeEach<LocalTestContext>((context) => {
  context.wrapper = (props) =>
    render(
      <TextField
        value={value}
        onChange={() => props?.onChange}
        placeholder={placeholder}
        {...props}
      />,
    );
});

describe("TextField", () => {
  test<LocalTestContext>("should show text", ({wrapper}) => {
    const TextField = wrapper();
    expect(TextField.getByDisplayValue(value)).toBeDefined();
  });

  test<LocalTestContext>("should handle onChange", ({wrapper}) => {
    const handleClick = fn();
    const TextField = wrapper({onChange: handleClick});

    fireEvent.change(TextField.getByRole(InputTextRolesEnum.INPUT), {
      target: {value: "new value"},
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe("TextField disabled", () => {
  test<LocalTestContext>("should show disabled state", async ({wrapper}) => {
    const TextField = wrapper({disabled: true});

    expect(TextField.getByDisplayValue(value)).toBeDefined();
    expect(TextField.getByRole(InputTextRolesEnum.INPUT).className).toContain(
      "disabled",
    );
  });

  test<LocalTestContext>("should prevent click", async ({wrapper}) => {
    const handleClick = fn();
    const TextField = wrapper({onClick: handleClick, disabled: true});

    fireEvent.click(TextField.getByRole(InputTextRolesEnum.INPUT));

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
