export class Http {
  static async get<Type>(url: string): Promise<Type> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        const error = new Error(response.statusText);
        error.name = response.type;
        throw error;
      }
      const data: {contents: string} = await response.json();
      const dataParsed: Type = JSON.parse(data.contents)

      return dataParsed;
    } catch (error) {
      const customError = new Error("Error in HTTP GET request");
      if (error instanceof Error) {
        customError.message = error.message;
        customError.stack = error.stack;
      } else {
        console.error("Unexpected error: ", error);
      }
      return Promise.reject(customError);
    }
  }
}
