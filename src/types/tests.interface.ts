import {RenderResult} from "@testing-library/react";
export interface TestContext<T> {
  wrapper: (componentProps?: T) => RenderResult;
}
