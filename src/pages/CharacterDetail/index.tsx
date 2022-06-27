import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';

import { CharacterRequestID, getCharacter } from '../../api/characters';
import Attribute from './Attribute';
import styles from './styles.module.scss';

function CharacterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate('/');
    return <div />;
  }

  const { data } = useQuery([CharacterRequestID.DETAIL, id], () =>
    getCharacter(id)
  );

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

  return (
    <main className={styles.container}>
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
    </main>
  );
}

export default CharacterDetail;
