import Button from "..";
import {fn} from "@vitest/spy";
import {EyeIcon} from "@/Icons";
import {TestContext} from "@/types/tests.interface";
import {fireEvent, render} from "@testing-library/react";
import {describe, expect, test, beforeEach} from "vitest";
import {ButtonProps, ButtonRolesEnum} from "../Button.types";

type LocalTestContext = TestContext<Partial<ButtonProps>>;

const title = "Text";

beforeEach<LocalTestContext>((context) => {
  context.wrapper = (props) => render(<Button children={title} {...props} />);
});

describe("Button", () => {
  test<LocalTestContext>("should show text", ({wrapper}) => {
    const button = wrapper();
    expect(button.getByText(title)).toBeDefined();
  });

  test<LocalTestContext>("should be a link", ({wrapper}) => {
    const button = wrapper({
      href: "https://www.google.com",
    });
    expect(button.getByRole(ButtonRolesEnum.LINK)).toBeDefined();
  });

  test<LocalTestContext>("should handle click", ({wrapper}) => {
    const handleClick = fn();
    const button = wrapper({onClick: handleClick});

    fireEvent.click(button.getByRole(ButtonRolesEnum.BUTTON));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test<LocalTestContext>("should display Icon", ({wrapper}) => {
    const button = wrapper({icon: EyeIcon});

    expect(button.getByRole(ButtonRolesEnum.ICON)).toBeDefined();
  });
});

describe("Button disabled", () => {
  test<LocalTestContext>("should show disabled state", async ({wrapper}) => {
    const button = wrapper({disabled: true});

    expect(button.getByText(title)).toBeDefined();
    expect(button.getByRole(ButtonRolesEnum.BUTTON).className).toContain(
      "disabled",
    );

    expect(button.getByRole(ButtonRolesEnum.BUTTON).className).toContain(
      "pushed",
    );
  });

  test<LocalTestContext>("should prevent click", async ({wrapper}) => {
    const handleClick = fn();
    const button = wrapper({onClick: handleClick, disabled: true});

    fireEvent.click(button.getByRole(ButtonRolesEnum.BUTTON));

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
