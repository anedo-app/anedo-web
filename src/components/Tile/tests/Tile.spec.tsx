import Tile from "..";
import {fn} from "@vitest/spy";
import {EyeIcon} from "@/Icons";
import {TestContext} from "@/types/tests.interface";
import {TileProps, TileRolesEnum} from "../Tile.types";
import {fireEvent, render} from "@testing-library/react";
import {describe, expect, test, beforeEach} from "vitest";

type LocalTestContext = TestContext<Partial<TileProps>>;

const title = "Text";
const description = "Description";

beforeEach<LocalTestContext>((context) => {
  context.wrapper = (props) =>
    render(<Tile title={title} description={description} {...props} />);
});

describe("Tile", () => {
  test<LocalTestContext>("should show text", ({wrapper}) => {
    const tile = wrapper();
    expect(tile.getByText(title)).toBeDefined();
  });

  test<LocalTestContext>("should handle click", ({wrapper}) => {
    const handleClick = fn();
    const tile = wrapper({onClick: handleClick});

    fireEvent.click(tile.getByRole(TileRolesEnum.TILE));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test<LocalTestContext>("should display Icon", ({wrapper}) => {
    const tile = wrapper({icon: EyeIcon});

    expect(tile.getByRole(TileRolesEnum.ICON)).toBeDefined();
  });
});

describe("Tile disabled", () => {
  test<LocalTestContext>("should show disabled state", async ({wrapper}) => {
    const tile = wrapper({disabled: true});

    expect(tile.getByText(title)).toBeDefined();
    expect(tile.getByRole(TileRolesEnum.TILE).className).toContain("disabled");
    expect(tile.getByRole(TileRolesEnum.TILE).className).toContain("keyDown");
  });

  test<LocalTestContext>("should prevent click", async ({wrapper}) => {
    const handleClick = fn();
    const tile = wrapper({onClick: handleClick, disabled: true});

    fireEvent.click(tile.getByRole(TileRolesEnum.TILE));

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
