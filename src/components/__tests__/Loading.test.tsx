import React from "react";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import Loading from "../Loading";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");

  return {
    ...originalModule,
    useNavigation: () => ({
      state: "loading",
    }),
  };
});

describe("Loading", () => {
  beforeEach(() => {
    cleanup();
  });

  test("should renders loading spinner when navigation state is 'loading'", async () => {
    const routes = [{ path: "/", element: <Loading /> }];
    const router = createMemoryRouter(routes);
    render(<RouterProvider router={router} />);

    const spinner = await screen.getByTestId("loading-spinner");
    const spinnerClass = spinner.className;

    expect(spinnerClass).toBe("lds-ripple");
  });
});

export {};
