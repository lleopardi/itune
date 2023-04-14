import {
  act,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import Home from "../Home";
import getPodcasts from "../../services/podcast.service";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

jest.mock("../../services/podcast.service");

describe("Home Page", () => {
  beforeEach(async () => {
    //@ts-ignore
    getPodcasts.mockClear();
    //@ts-ignore
    getPodcasts.mockResolvedValue(expectedPodcast);

    const routes = [{ path: "/", element: <Home /> }];
    const router = createMemoryRouter(routes);
    // render(<RouterProvider router={router} />);
    await act(async () => render(<RouterProvider router={router} />));
  });

  describe("when load the page", () => {
    test("should render and input for filter podcast", async () => {
      const input = screen.getByTestId("filter-input");
      expect(input).toBeInTheDocument();
    });

    test("should show a list of podcast", async () => {
      const listOfPodcast = screen.getAllByTestId("podcast-item");
      const numberOfPodcastRendered = listOfPodcast.length;

      expect(numberOfPodcastRendered).toBe(2);
    });
  });

  test("should filter the list of podcast when the user type in the input", async () => {
    const input = await screen.getByTestId("filter-input");
    const contentInput = "bbb bbb";
    const qtyOfPodcastByAuthor = 1;

    fireEvent.change(input, { target: { value: contentInput } });
    const listOfPodcast = screen.getAllByTestId("podcast-item");

    //@ts-ignore
    expect(input.value).toBe(contentInput);
    expect(listOfPodcast.length).toBe(qtyOfPodcastByAuthor);
  });
});

const expectedPodcast = [
  {
    title: "Podcast 1",
    description: "Summary 1",
    image: "imageSrc",
    author: "aaa aaa",
    id: "12345",
    shortTitle: "Podcast 1",
  },
  {
    title: "Podcast 2",
    description: "Summary 2",
    image: "imageSrc",
    author: "bbb bbb",
    id: "22345",
    shortTitle: "Podcast 2",
  },
];
