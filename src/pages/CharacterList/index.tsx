import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { AxiosResponse } from 'axios';

import {
  CharacterListError,
  CharacterListResponse,
  CharacterRequestID,
  getAllCharacters
} from '../../api/characters';
import { FilterReducerState } from '../../redux/filterReducer';
import FilterPanel from './FilterPanel';

import styles from './styles.module.scss';
import List from './List';

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

  return (
    <main className={styles.container}>
      <aside className={cx(styles.leftPanel, { [styles.show]: visibleFilter })}>
        <FilterPanel />
      </aside>
      <section className={styles.rightContent}>
        <List
          pages={characterData?.info.pages ?? 1}
          currentPage={page}
          onChangePage={handleChangePage}
          characters={characterData?.results ?? []}
          isLoading={isLoading}
          isError={isError}
          status={error?.response.status}
        />
      </section>
    </main>
  );
}

export default CharacterList;
