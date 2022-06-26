import api from './api';

export enum CharacterRequestID {
  LIST = 'character-list',
  DETAIL = 'character-detail'
}

export const getAllCharacters = () => api.get('/character');

export const getCharacter = (id: string) => api.get(`/characters/${id}`);
