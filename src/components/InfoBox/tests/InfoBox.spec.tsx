import InfoBox from "..";
import {describe, beforeEach} from "vitest";
import {render} from "@testing-library/react";
import {InfoBoxProps} from "../InfoBox.types";
import {TestContext} from "@/types/tests.interface";

type LocalTestContext = TestContext<InfoBoxProps>;

beforeEach<LocalTestContext>((context) => {
  context.wrapper = (props) => render(<InfoBox {...(props as InfoBoxProps)} />);
});

describe.skip("InfoBox", () => {});
