import { Http } from "../http";
import getPodcasts from "../podcast.service";

describe("Podcast service", () => {
  let spy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    spy = jest.spyOn(Http, "get").mockResolvedValue(mockData);
  });

  test("should get episodes when doesn't exist cache", async () => {
    const expectedResponse = expectedData;
    const response = await getPodcasts();

    expect(response).toEqual(expectedResponse);
    expect(spy).toBeCalledTimes(1);
  });

  test("should get data from cache when exist cache", async () => {
    await getPodcasts();
    const cachePodcast = await getPodcasts();

    expect(cachePodcast).toEqual(expectedData);
    expect(spy).toBeCalledTimes(1);
  });

  test("should return an empty array when throw an error", async () => {
    const rejectedSpy = jest
      .spyOn(Http, "get")
      .mockRejectedValue(new Error("Unexpected Error"));

    const response = await getPodcasts();

    expect(response.length).toBe(0);
    expect(response).toEqual([]);
    expect(rejectedSpy).toBeCalledTimes(1);
  });
});

const mockData = {
  feed: {
    entry: [
      {
        title: { label: "Podcast 1" },
        "im:artist": { label: "Artist 1" },
        summary: { label: "Summary 1" },
        "im:image": [{}, {}, { label: "imageSrc" }],
        id: {
          attributes: {
            "im:id": "12345",
          },
        },
      },
    ],
  },
};

const expectedData = [
  {
    title: "Podcast 1",
    description: "Summary 1",
    image: "imageSrc",
    author: "Artist 1",
    id: "12345",
    shortTitle: "Podcast 1",
  },
];
