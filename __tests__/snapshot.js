import { expect, it } from "@jest/globals";
import { render } from "@testing-library/react";

import Page from "../app/page1";

it("renders homepage unchanged", () => {
  const { container } = render(<Page />);
  expect(container).toMatchSnapshot();
});
