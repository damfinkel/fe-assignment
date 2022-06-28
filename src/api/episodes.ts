import api from './api';
import { Episode } from '../interfaces/episode';

export enum EpisodeRequestID {
  DETAIL = 'episode-detail'
}

export const getEpisode = (id: string | number) =>
  api.get<Episode>(`/episode/${id}`);
