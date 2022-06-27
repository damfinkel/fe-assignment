import { Button, Pagination } from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import cx from 'classnames';

import {
  CharacterListError,
  CharacterListResponse,
  CharacterRequestID,
  getAllCharacters
} from '../../api/characters';
import { FilterReducerState } from '../../redux/filterReducer';
import FilterPanel from './FilterPanel';

import styles from './styles.module.scss';
import { AxiosResponse } from 'axios';

function CharacterList() {
  const [page, setPage] = useState(1);
  const visibleFilter = useSelector(
    (state: FilterReducerState) => state.filter.visibleFilter
  );

  const search = useSelector(
    (state: FilterReducerState) => state.filter.search
  );
  const status = useSelector(
    (state: FilterReducerState) => state.filter.status
  );
  const gender = useSelector(
    (state: FilterReducerState) => state.filter.gender
  );

  const { data, isLoading, isError, error } = useQuery<
    AxiosResponse<CharacterListResponse>,
    CharacterListError
  >(
    [CharacterRequestID.LIST, { page, search, status, gender }],
    () => getAllCharacters({ page, search, status, gender }),
    { keepPreviousData: true }
  );

  const characterData = data?.data;

  const handleChangePage = (
    _: React.ChangeEvent<unknown>,
    nextPage: number
  ) => {
    setPage(nextPage);
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    if (error.response.status === 404) {
      return <h2 className={styles.error}>No results</h2>;
    }
    return (
      <h2 className={styles.error}>
        There was an error. Please try again later
      </h2>
    );
  }

  return (
    <main className={styles.container}>
      <aside className={cx(styles.leftPanel, { [styles.show]: visibleFilter })}>
        <FilterPanel />
      </aside>
      <section className={styles.rightContent}>
        <h1 className={styles.title}>Characters</h1>
        <ul className={styles.listContainer}>
          {characterData?.results.map((character) => (
            <li key={character.id} className={styles.listItem}>
              <img
                src={character.image}
                className={styles.characterImage}
                alt={character.name}
              />
              <h2 className={styles.name}>{character.name}</h2>
              <h2 className={styles.species}>Species: {character.species}</h2>
              <h2 className={styles.status}>Status: {character.status}</h2>
              <Button
                className={styles.detailButton}
                variant="contained"
                href={`/character/${character.id}`}
              >
                Details
              </Button>
            </li>
          ))}
        </ul>
        <Pagination
          count={characterData?.info.pages ?? 1}
          shape="rounded"
          defaultPage={1}
          onChange={handleChangePage}
          page={page}
        />
      </section>
    </main>
  );
}

export default CharacterList;
