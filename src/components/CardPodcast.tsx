import React from "react";
import "./CardPodcast.scss";
import { Podcast } from "../models/podcast";
interface Props {
  podcast: Podcast;
}

const CardPodcast = ({ podcast }: Props) => {
  const {image, title, author, shortTitle} = podcast
  return (
    <div className="card-podcast">
      <div className="card-podcast__image-container">
        <img
          src={image}
          alt={title}
          className="card-podcast__image"
        />
      </div>
      <div className="card-podcast__title" title={title}>
        {shortTitle} 
      </div>
      <div className="card-podcast__author">Author: {author}</div>
    </div>
  );
};

export default CardPodcast;
