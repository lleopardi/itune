import React from "react";
import "@testing-library/jest-dom";
import Episode from "../Episode";
import { render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useLocation: () => ({
      state: {
        episode: {
          id: 1,
          title: "Episode title",
          description: "Episode description",
          episodeUrl: "https://example.com/episode.mp3",
          date: "",
          duration: "",
          getDuration: jest.fn(),
        },
        podcast: {
          id: "1",
          author: "Podcast author",
          description: "Podcast description",
          getShortTitle: jest.fn(),
          image: "Podcast image",
          shortTitle: "Podcast Short title",
          title: "Podcast title",
        },
      },
    }),
  };
});

describe("Episode component", () => {
  test("should renders episode information", async () => {
    const routes = [{ path: "/", element: <Episode /> }];
    const router = createMemoryRouter(routes);
    const { getByText, getByTestId } = render(
      <RouterProvider router={router} />
    );

    const episodeTitle = await getByText("Episode title");
    const episodeDescription = await getByText("Podcast description");
    const episodePlay = await getByTestId("play")

    expect(episodeTitle).toBeInTheDocument();
    expect(episodeDescription).toBeInTheDocument();
    expect(episodePlay).toHaveAttribute("src", "https://example.com/episode.mp3");
  });
});
