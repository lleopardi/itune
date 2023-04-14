import "./CardCover.scss";

import Card from "./Card";
import { Podcast } from "../models/podcast";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  podcast: Podcast;
}

const CardCover = ({ podcast }: Props) => {
  const navigation = useNavigate();
  const { title, author, description, image } = podcast;

  const backAction = () => {
    navigation(-1);
  };

  return (
    <Card>
      <div className="card-cover">
        <div className="card-cover__container">
          <img
            onClick={backAction}
            className="card-cover__image"
            src={image}
            alt={title}
          />
        </div>
        <div className="card-cover__info">
          <p className="card-cover__title" onClick={backAction}>
            {title}
          </p>
          <span className="card-cover__author">by: {author}</span>
        </div>
        <div className="card-cover__description">
          <p className="card-cover__description-title">Description:</p>
          <p className="card-cover__description-content">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default CardCover;
