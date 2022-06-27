/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export enum Gender {
  UNKNOWN = 'unknown',
  MALE = 'male',
  FEMALE = 'female'
}

export enum Status {
  UNKNOWN = 'unknown',
  ALIVE = 'alive',
  DEAD = 'dead'
}

export const EmptyGender = 'gender';
export const EmptyStatus = 'status';

export interface FilterReducerState {
  filter: {
    visibleFilter: boolean;
    search?: string;
    gender?: Gender;
    status?: Status;
  };
}

export const counterSlice = createSlice({
  name: 'filter',
  initialState: {
    visibleFilter: false,
    status: undefined,
    gender: undefined,
    search: undefined
  },
  reducers: {
    showFilter: (state, action) => {
      state.visibleFilter = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload === 'status' ? undefined : action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload === 'gender' ? undefined : action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    }
  }
});

export const { showFilter, setStatus, setGender, setSearch } =
  counterSlice.actions;

export default counterSlice.reducer;
