import { useQuery } from 'react-query';
import { CharacterRequestID, getAllCharacters } from '../../api/characters';

function CharacterList() {
  const { data } = useQuery(CharacterRequestID.LIST, getAllCharacters);

  console.log(data);
  return (
    <main>
      <h1>Character list</h1>
    </main>
  );
}

export default CharacterList;
