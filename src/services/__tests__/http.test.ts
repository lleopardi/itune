import { Http } from "../http";

describe("Http", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("GET", () => {
    test("should return data if the request is successful", async () => {
      const mockData = {
        contents: "{\"a\": \"Some content\"}"
      };
      const expectedData = {"a": "Some content"};

      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      const result = await Http.get("https://example.com/api/data");

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
