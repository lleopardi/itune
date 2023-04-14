import "./Podcast.scss";

import {
  Link,
  useLoaderData,
  useLocation,
} from "react-router-dom";

import Card from "../components/Card";
import CardCover from "../components/CardCover";
import { Episode } from "../models/episode";
import React from "react";

const Podcast = () => {
  // @ts-ignore
  const { episodes }: {episodes: Episode[]} = useLoaderData();
  const { state: podcast } = useLocation();

  return (
    <section className="podcast-layout">
      <CardCover podcast={podcast}></CardCover>
      
      <div className="episode-container">
        <Card>
          <span className="episodes">Episodes: {episodes.length}</span>
        </Card>
        <div className="list-episodes">
          <Card>
            <table className="table">
              <thead className="table__head">
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody className="table__body">
                {episodes.map((episode: Episode) => (
                  <tr key={episode.id} data-testid="row-episode">
                    <td>
                      <Link
                        to={`episode/${episode.id}`}
                        state={{ episode, podcast }}
                      >
                        {episode.title}
                      </Link>
                    </td>
                    <td>{episode.date}</td>
                    <td>{episode.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Podcast;
