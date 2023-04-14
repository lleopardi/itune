import React from "react";
import App from "../App";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom'


const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("", () => {
  test("renders header and main", async () => {
    const routes = [{ path: "/", element: <App /> }];
    const router = createMemoryRouter(routes);
    const { getByRole, getByText } = render(<RouterProvider router={router} />);

    const header = getByRole('heading');
    const main = getByRole('main');
    const title = getByText('Podcaster');

    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
