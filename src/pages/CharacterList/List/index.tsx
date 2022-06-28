import { useRef } from 'react';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';
import { Character } from '../../../interfaces/character';

interface Props {
  characters: Character[];
  pages: number;
  currentPage: number;
  onChangePage: (_: React.ChangeEvent<unknown>, nextPage: number) => void;
  isError: boolean;
  isLoading: boolean;
  status?: number;
}

function List({
  characters,
  pages,
  currentPage,
  onChangePage,
  isError,
  isLoading,
  status
}: Props) {
  const navigate = useNavigate();
  const listRef = useRef<HTMLUListElement | null>(null);

  const handleGoToTop = () => {
    if (listRef) {
      listRef.current?.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return <CircularProgress color="primary" />;
  }

  if (isError) {
    if (status === 404) {
      return <h2 className={styles.error}>No results</h2>;
    }
    return (
      <h2 className={styles.error}>
        There was an error. Please try again later
      </h2>
    );
  }

  const onSelectCharacter = (e: React.MouseEvent<HTMLElement>, id: number) => {
    e.preventDefault();
    navigate(`/character/${id}`);
  };

  return (
    <>
      <h1 className={styles.title}>Characters</h1>
      <ul className={styles.listContainer} ref={listRef}>
        {characters.map((character) => (
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
              color="primary"
              onClick={(e) => onSelectCharacter(e, character.id)}
            >
              Details
            </Button>
          </li>
        ))}
      </ul>
      <Pagination
        count={pages}
        shape="rounded"
        defaultPage={1}
        onChange={onChangePage}
        page={currentPage}
        sx={{
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: '#83d2e4',
            color: 'white'
          }
        }}
      />
      <Fab
        variant="extended"
        className={styles.toTopButton}
        onClick={handleGoToTop}
      >
        <ArrowUpwardIcon sx={{ mr: 1 }} />
        <span className={styles.goToTopTitle}>Go to top</span>
      </Fab>
    </>
  );
}

export default List;
