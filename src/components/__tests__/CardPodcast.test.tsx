import CardPodcast from "../CardPodcast";
import { Podcast } from "../../models/podcast";
import React from "react";
import { render } from "@testing-library/react";
describe('CardPodcast component', ()=>{
  test('should first', async() => { 
    const podcast = mockPodcast
    const expectedData = {
      shortTitle: 'Short title',
      author: 'Author: Jhon Doe'
    }
    const {getByText } = render(<CardPodcast podcast={podcast}></CardPodcast>)

    const shortTitle = await getByText(/Short title/)
    const shortTitleContent = shortTitle.textContent
    const author = await getByText(/Jhon Doe/)
    const authorContent = author.textContent

    expect(shortTitleContent).toBe(expectedData.shortTitle);
    expect(authorContent).toBe(expectedData.author)

   })
})

const mockPodcast: Podcast = {
  author: "Jhon Doe",
  description: "description",
  shortTitle: "Short title",
  id: "1",
  image: "Some, image",
  title: "Some Title",
  getShortTitle: jest.fn(),
};