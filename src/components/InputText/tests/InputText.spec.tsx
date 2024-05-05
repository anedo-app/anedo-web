import InputText from "..";
import {fn} from "@vitest/spy";
import {TestContext} from "@/types/tests.interface";

import {fireEvent, render} from "@testing-library/react";
import {describe, expect, test, beforeEach} from "vitest";
import {InputTextProps, InputTextRolesEnum} from "../InputText.types";

type LocalTestContext = TestContext<Omit<InputTextProps, "value">>;

const value = "Text";
const placeholder = "Placeholder";

beforeEach<LocalTestContext>((context) => {
  context.wrapper = (props) =>
    render(
      <InputText
        value={value}
        onChange={() => props?.onChange}
        placeholder={placeholder}
        {...props}
      />,
    );
});

describe("InputText", () => {
  test<LocalTestContext>("should show text", ({wrapper}) => {
    const InputText = wrapper();
    expect(InputText.getByDisplayValue(value)).toBeDefined();
  });

  test<LocalTestContext>("should handle onChange", ({wrapper}) => {
    const handleClick = fn();
    const InputText = wrapper({onChange: handleClick});

    fireEvent.change(InputText.getByRole(InputTextRolesEnum.INPUT), {
      target: {value: "new value"},
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe("InputText disabled", () => {
  test<LocalTestContext>("should show disabled state", async ({wrapper}) => {
    const InputText = wrapper({disabled: true});

    expect(InputText.getByDisplayValue(value)).toBeDefined();
    expect(InputText.getByRole(InputTextRolesEnum.INPUT).className).toContain(
      "disabled",
    );
  });

  test<LocalTestContext>("should prevent click", async ({wrapper}) => {
    const handleClick = fn();
    const InputText = wrapper({onClick: handleClick, disabled: true});

    fireEvent.click(InputText.getByRole(InputTextRolesEnum.INPUT));

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
