import Avatar from "..";
import {render} from "@testing-library/react";
import {TestContext} from "@/types/tests.interface";
import {describe, expect, test, beforeEach} from "vitest";
import {AvatarProps, AvatarRolesEnum} from "../Avatar.types";

type LocalTestContext = TestContext<AvatarProps>;

beforeEach<LocalTestContext>((context) => {
  context.wrapper = (props) => render(<Avatar {...(props as AvatarProps)} />);
});

describe("Avatar", () => {
  test<LocalTestContext>("should show image", ({wrapper}) => {
    const Avatar = wrapper({src: "https://picsum.photos/536/354"});
    expect(Avatar.getByRole(AvatarRolesEnum.AVATAR)).toBeDefined();
  });

  test<LocalTestContext>("should show waiting state", ({wrapper}) => {
    const Avatar = wrapper({
      src: "https://picsum.photos/536/354",
      variant: "waiting",
    });
    expect(Avatar.getByRole(AvatarRolesEnum.AVATAR)).toBeDefined();
    expect(Avatar.getByRole(AvatarRolesEnum.CONTAINER).className).toContain(
      "waiting",
    );
  });

  test<LocalTestContext>("should show ready state", ({wrapper}) => {
    const Avatar = wrapper({
      src: "https://picsum.photos/536/354",
      variant: "ready",
    });
    expect(Avatar.getByRole(AvatarRolesEnum.AVATAR)).toBeDefined();
    expect(Avatar.getByRole(AvatarRolesEnum.CONTAINER).className).toContain(
      "ready",
    );
  });

  test<LocalTestContext>("should be small", ({wrapper}) => {
    const Avatar = wrapper({
      src: "https://picsum.photos/536/354",
      isSmall: true,
    });
    expect(Avatar.getByRole(AvatarRolesEnum.AVATAR)).toBeDefined();
    expect(Avatar.getByRole(AvatarRolesEnum.CONTAINER).className).toContain(
      "small",
    );
  });

  test.skip<LocalTestContext>("should handle image error", ({wrapper}) => {
    const Avatar = wrapper({src: "https://felixbouveret.com/404"});
    expect(Avatar.getByRole(AvatarRolesEnum.ERROR)).toThrowError();
  });
});
