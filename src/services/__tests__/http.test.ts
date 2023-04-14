import { Http } from "../http";

describe("Http", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("GET", () => {
    test("should return data if the request is successful", async () => {
      const expectedData = "some test data";

      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(expectedData),
      });

      const result = await Http.get<string>("https://example.com/api/data");

      expect(result).toEqual(expectedData);
    });

    test("should throw an error", async () => {
      const mockError = {
        ok: false,
        statusText: "Not Found",
        type: "http",
      };

      global.fetch = jest.fn().mockResolvedValue(mockError);
      await expect(Http.get("http://example.com")).rejects.toBeInstanceOf(
        Error
      );
    });
  });
});
