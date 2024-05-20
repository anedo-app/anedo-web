import PasswordField from "..";
import {TestContext} from "@/types/tests.interface";
import {render, fireEvent} from "@testing-library/react";
import {describe, expect, test, beforeEach} from "vitest";
import {PasswordFieldProps} from "../PasswordField.types";
import {InputTextRolesEnum} from "@/components/InputText/InputText.types";

type LocalTestContext = TestContext<Omit<PasswordFieldProps, "value">>;

const value = "bMBnPgb$n9M?#Ei7";

beforeEach<LocalTestContext>((context) => {
  context.wrapper = (props) =>
    render(<PasswordField value={value} {...props} />);
});

describe("PasswordField", () => {
  test<LocalTestContext>("should show text", ({wrapper}) => {
    const PasswordField = wrapper();
    expect(PasswordField.getByDisplayValue(value)).toBeDefined();
  });

  test.skip<LocalTestContext>("should handle onChange", ({wrapper}) => {
    const PasswordField = wrapper();

    fireEvent.change(PasswordField.getByRole(InputTextRolesEnum.INPUT), {
      target: {value: "12345678"},
    });

    expect(PasswordField.getByDisplayValue("12345678")).toBeDefined();
  });
});

describe("PasswordField error", () => {
  test.skip<LocalTestContext>("should trigger short error", async () => {});
  test.skip<LocalTestContext>("should trigger uppercase error", async () => {});
  test.skip<LocalTestContext>("should trigger lowercase error", async () => {});
  test.skip<LocalTestContext>("should trigger number error", async () => {});
  test.skip<LocalTestContext>("should trigger special error", async () => {});
});
