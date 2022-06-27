import { Button, Pagination } from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { CharacterRequestID, getAllCharacters } from '../../api/characters';

import styles from './styles.module.scss';

function CharacterList() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery(
    [CharacterRequestID.LIST, page],
    () => getAllCharacters(page),
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

  return (
    <main className={styles.container}>
      <section className={styles.leftPanel}>TODO</section>
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
