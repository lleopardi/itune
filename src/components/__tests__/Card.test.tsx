import { render, screen } from "@testing-library/react";

import Card from "../Card";
import React from "react";

describe("Card component", () => {
  test("Should render the card with a h1", async () => {
    const expectedValue = 'Hello World'
    render(
      <Card>
        <h1 data-testid="card-title">{expectedValue}</h1>
      </Card>
    );

    const cardContent = await screen.getByTestId("card-title");
    const cardContentText = cardContent.textContent

    expect(cardContentText).toBe(expectedValue)

  });
});
