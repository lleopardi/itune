import {
  API_PODCAST,
  DAY_IN_MILLISECONDS,
  PROXY_URL,
  StorageKeys,
} from "./constants";
import { Entry, ItunesResponse } from "../models/itunes.response";

import { Http } from "./http";
import { Podcast } from "../models/podcast";

const getPodcasts = async (): Promise<Podcast[]> => {
  const now = Date.now();
  const persistedAt = getLocalStorageExpireDate();
  const isExpired = isDataExpired(now, persistedAt);

  if (!isExpired) {
    return getCachedPodcasts();
  } else {
    const podcasts = await getRemotePodcasts();
    podcasts.length && cachePodcasts(podcasts, now);
    return podcasts;
  }
};

const getLocalStorageExpireDate = () => {
  const expireDate = localStorage.getItem(StorageKeys.podcastsPersistedAt);
  return expireDate ? +expireDate : 0;
};

const isDataExpired = (now: number, persistedAt: number) => {
  return persistedAt - now <= 0;
};

const parsePodcasts = (entries: Entry[]): Podcast[] => {
  return entries.map((entry) => new Podcast(entry));
};

const cachePodcasts = (podcasts: Podcast[], now: number) => {
  localStorage.setItem(StorageKeys.podcasts, JSON.stringify(podcasts));
  localStorage.setItem(
    StorageKeys.podcastsPersistedAt,
    JSON.stringify(now + DAY_IN_MILLISECONDS)
  );
};

const getCachedPodcasts = (): Podcast[] => {
  const localData = localStorage.getItem(StorageKeys.podcasts) || "[]";
  return JSON.parse(localData);
};

const getRemotePodcasts = async (): Promise<Podcast[]> => {
  try {
    const resource = `${API_PODCAST}limit=100/genre=1310/json`
    const api = `${PROXY_URL}${encodeURIComponent(resource)}`;
    const data = await Http.get<ItunesResponse>(api);
    return parsePodcasts(data.feed.entry);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getPodcasts;
