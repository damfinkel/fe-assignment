import api from './api';
import { Character } from '../interfaces/character';

interface CharacterListResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev?: string;
  };
  results: Character[];
}

export enum CharacterRequestID {
  LIST = 'character-list',
  DETAIL = 'character-detail'
}

export const getAllCharacters = (page: number) =>
  api.get<CharacterListResponse>(`/character?page=${page}`);

export const getCharacter = (id: string) => api.get(`/character/${id}`);
