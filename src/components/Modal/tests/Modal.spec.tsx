import Modal from "..";
import {ModalProps} from "../Modal.types";
import {describe, beforeEach} from "vitest";
import {render} from "@testing-library/react";
import {TestContext} from "@/types/tests.interface";

type LocalTestContext = TestContext<Partial<ModalProps>>;

const title = "Modal";

beforeEach<LocalTestContext>((context) => {
  context.wrapper = (props) =>
    render(
      <Modal title={title} isOpen onClose={() => props?.onClose} {...props} />,
    );
});

describe.skip("Modal", () => {});
