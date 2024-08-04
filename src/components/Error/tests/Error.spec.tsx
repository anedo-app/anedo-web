import Error from "..";
import {ErrorProps} from "../Error.types";
import {render} from "@testing-library/react";
import {TestContext} from "@/types/tests.interface";
import {describe, expect, test, beforeEach} from "vitest";

type LocalTestContext = TestContext<Partial<ErrorProps>>;

const value = "Text";

beforeEach<LocalTestContext>((context) => {
  context.wrapper = (props) => render(<Error error={value} {...props} />);
});

describe("Error", () => {
  test<LocalTestContext>("should show text", ({wrapper}) => {
    const Error = wrapper();
    expect(Error.getByText(value)).toBeDefined();
  });
});
