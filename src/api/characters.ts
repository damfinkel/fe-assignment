import api from './api';
import { Character } from '../interfaces/character';
import { Gender, Status } from '../redux/filterReducer';

export interface CharacterListResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev?: string;
  };
  results: Character[];
}

export interface CharacterListError {
  response: {
    status: number;
  };
}

export enum CharacterRequestID {
  LIST = 'character-list',
  DETAIL = 'character-detail'
}

export const getAllCharacters = ({
  page,
  search,
  status,
  gender
}: {
  page: number;
  search?: string;
  status?: Status;
  gender?: Gender;
}) => {
  let params = `page=${page}`;
  if (status) {
    params = `${params}&status=${status}`;
  }
  if (gender) {
    params = `${params}&gender=${gender}`;
  }
  if (search) {
    params = `${params}&name=${search}`;
  }
  return api.get<CharacterListResponse>(`/character?${params}`);
};

export const getCharacter = (id: string) =>
  api.get<Character>(`/character/${id}`);
