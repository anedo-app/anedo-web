import EmailField from "..";
import {TestContext} from "@/types/tests.interface";
import {EmailFieldProps} from "../EmailField.types";
import {render, fireEvent} from "@testing-library/react";
import {describe, expect, test, beforeEach} from "vitest";
import {InputTextRolesEnum} from "@/components/InputText/InputText.types";

type LocalTestContext = TestContext<Omit<EmailFieldProps, "value">>;

const value = "test.email@anedo.app";

beforeEach<LocalTestContext>((context) => {
  context.wrapper = (props) => render(<EmailField value={value} {...props} />);
});

describe("EmailField", () => {
  test<LocalTestContext>("should show text", ({wrapper}) => {
    const EmailField = wrapper();
    expect(EmailField.getByDisplayValue(value)).toBeDefined();
  });

  test.skip<LocalTestContext>("should handle onChange", ({wrapper}) => {
    const EmailField = wrapper();

    fireEvent.change(EmailField.getByRole(InputTextRolesEnum.INPUT), {
      target: {value: "test2.email@anedo.app"},
    });

    expect(EmailField.getByDisplayValue("test2.email@anedo.app")).toBeDefined();
  });

  test.skip<LocalTestContext>("should trigger invalid error", async () => {});
});
