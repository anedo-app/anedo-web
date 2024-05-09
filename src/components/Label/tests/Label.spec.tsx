import Label from "..";
import {render} from "@testing-library/react";
import {TestContext} from "@/types/tests.interface";
import {describe, expect, test, beforeEach} from "vitest";
import {LabelProps, LabelRolesEnum} from "../Label.types";

type LocalTestContext = TestContext<Partial<LabelProps>>;

const value = "Text";

beforeEach<LocalTestContext>((context) => {
  context.wrapper = (props) => render(<Label label={value} {...props} />);
});

describe("Label", () => {
  test<LocalTestContext>("should show text", ({wrapper}) => {
    const Label = wrapper();
    expect(Label.getByText(value)).toBeDefined();
  });

  test<LocalTestContext>("should show required state", ({wrapper}) => {
    const Label = wrapper({required: true});
    expect(Label.getByText(value)).toBeDefined();
    expect(Label.getByRole(LabelRolesEnum.REQUIRED)).toBeDefined();
  });
});

describe("Label disabled", () => {
  test<LocalTestContext>("should show disabled state", async ({wrapper}) => {
    const Label = wrapper({disabled: true});

    expect(Label.getByText(value)).toBeDefined();
    expect(Label.getByRole(LabelRolesEnum.LABEL).className).toContain(
      "disabled",
    );
  });
});
