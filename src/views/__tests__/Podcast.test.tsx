import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Podcast from "../Podcast";
import { fireEvent, getAllByTestId, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  
  return {
    ...originalModule,
    useLoaderData: () => ({
      episodes: [
        {
          id: 1,
          title: "Episode title",
          description: "Episode description",
          episodeUrl: "https://example.com/episode.mp3",
          date: "2/15/2023",
          duration: "4:00",
          getDuration: jest.fn(),
        },
      ],
    }),
    useLocation: () => ({
      state: {
        id: "1",
        author: "Podcast author",
        description: "Podcast description",
        getShortTitle: jest.fn(),
        image: "Podcast image",
        shortTitle: "Podcast Short title",
        title: "Podcast title",
      },
    }),
  };
});

describe("Podcast Page", () => {
  test("should render the list of episodes and and podcast information", async () => {
    const routes = [{ path: "/", element: <Podcast /> }];
    const router = createMemoryRouter(routes);
    const { getByText, getAllByTestId } = render(
      <RouterProvider router={router} />
    );
    const qtyOfEpisodes = 1;

    const numberOfEpisodes = await getByText("Episodes: 1");
    const listOfEpisodes = await getAllByTestId("row-episode");
    const titleOfPodcast = await getByText("Podcast title");
    const authorPodcast = await getByText("by: Podcast author");

    expect(numberOfEpisodes).toBeInTheDocument();
    expect(listOfEpisodes.length).toBe(qtyOfEpisodes);
    expect(titleOfPodcast).toBeInTheDocument();
    expect(authorPodcast).toBeInTheDocument();
  });
});
