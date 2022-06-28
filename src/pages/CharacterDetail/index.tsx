import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CircularProgress from '@mui/material/CircularProgress';

import { CharacterRequestID, getCharacter } from '../../api/characters';
import Attribute from './Attribute';
import EpisodeList from './EpisodeList';
import styles from './styles.module.scss';

function CharacterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate('/');
    return <div />;
  }

  const { data, isLoading } = useQuery([CharacterRequestID.DETAIL, id], () =>
    getCharacter(id)
  );

  if (isLoading) {
    return <CircularProgress color="primary" className={styles.loading} />;
  }

  const characterData = data?.data;

  if (!characterData) {
    return (
      <h1>
        There has been an error retrieving the character. Please try again
        later.
      </h1>
    );
  }

  const created = new Date(characterData.created).toLocaleDateString();

  const handleBack = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <main className={styles.container}>
      <Button
        className={styles.backButton}
        variant="text"
        onClick={handleBack}
        startIcon={<ArrowBackIosNewIcon className={styles.backIcon} />}
      >
        <span className={styles.backButtonTitle}>Back</span>
      </Button>
      <section className={styles.topSection}>
        <img
          src={characterData.image}
          className={styles.image}
          alt={characterData.name}
        />
        <div className={styles.attributeList}>
          <Attribute title="Id" value={characterData.id} />
          <Attribute title="Name" value={characterData.name} />
          <Attribute title="Status" value={characterData.status} />
          <Attribute title="Species" value={characterData.species} />
          <Attribute title="Type" value={characterData.type} />
          <Attribute title="Gender" value={characterData.gender} />
          <Attribute title="Origin" value={characterData.origin.name} />
          <Attribute title="Created" value={created} />
        </div>
      </section>
      <section className={styles.bottomSection}>
        <EpisodeList episodeUrls={characterData.episode} />
      </section>
    </main>
  );
}

export default CharacterDetail;
