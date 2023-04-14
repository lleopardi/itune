import { API_EPISODES, DAY_IN_MILLISECONDS, PROXY_URL, StorageKeys } from "./constants";

import { Episode } from "../models/episode";
import { EpisodesResponse } from "../models/episodes.response";
import { Http } from "./http";
import { LoaderFunctionArgs } from "react-router-dom";

export interface CachedEpisodes {
  episodes: Episode[];
  detailPersistedAt: number;
}

export interface CacheEpisodes {
  [key: string]: CachedEpisodes;
}

const getCacheEpisodes = (): CacheEpisodes => {
  const cacheEpisodes = localStorage.getItem(StorageKeys.details);
  return cacheEpisodes ? JSON.parse(cacheEpisodes) : {};
};

const setCacheEpisodes = (podcastId: string, episodes: Episode[]): void => {
  const cacheEpisodes = getCacheEpisodes();
  const now = Date.now();
  cacheEpisodes[podcastId] = {
    episodes,
    detailPersistedAt: now + DAY_IN_MILLISECONDS,
  };
  localStorage.setItem(StorageKeys.details, JSON.stringify(cacheEpisodes));
};

const validateExpired = (
  now: number,
  podcastId: string,
  cacheEpisodes: CacheEpisodes
): boolean => {
  const cachedEpisodes = cacheEpisodes[podcastId];
  if (!cachedEpisodes?.detailPersistedAt) return true;
  return cachedEpisodes.detailPersistedAt - now <= 0;
};

const parseEpisodes = (results: any[]): Episode[] => {
  const episodes: Episode[] = [];
  results.forEach((item) => {
    if (item.kind === "podcast-episode") {
      const podcast = new Episode(item);
      episodes.push(podcast);
    }
  });
  return episodes;
};

const getEpisodesByPodcastId = async ({ params }: LoaderFunctionArgs) => {
  const podcastId = params.id || "";
  const cacheEpisodes = getCacheEpisodes();

  const now = Date.now();
  const isExpired = validateExpired(now, podcastId, cacheEpisodes);

  if (!isExpired) {
    const episodes: Episode[] = cacheEpisodes[podcastId].episodes;
    return { episodes };
  } else {
    const resource = `${API_EPISODES}id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
    const api = `${PROXY_URL}${encodeURIComponent(resource)}`;
    const data = await Http.get<EpisodesResponse>(api);

    const episodes: Episode[] = parseEpisodes(data.results);
    setCacheEpisodes(podcastId, episodes);

    return { episodes };
  }
};

export default getEpisodesByPodcastId;
