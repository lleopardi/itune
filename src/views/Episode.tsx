import "./Episode.scss";

import Card from "../components/Card";
import CardCover from "../components/CardCover";
import React from "react";
import { useLocation } from "react-router-dom";
import { Episode as EpisodeModel } from "../models/episode";
import { Podcast } from "../models/podcast";

const Episode = () => {
  const { state } = useLocation();
  const { episode, podcast }: {episode: EpisodeModel, podcast: Podcast} = state;
  const { episodeUrl, title, description }= episode;

  const htmlDescription = description.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1">$1</a>'
  );  

  return (
    <section className="episode-layout">
      <div>
        <CardCover podcast={podcast}></CardCover>
      </div>
      <div className="">
        <Card>
          <div className="card-episode">
            <span>
              <h2>{title}</h2>
              <div
                className="card-episode__description"
                dangerouslySetInnerHTML={{ __html: htmlDescription }}
              ></div>
            </span>

            <audio controls className="card-episode__play">
              <source src={episodeUrl} type="audio/mp3" data-testid="play" />
            </audio>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Episode;
