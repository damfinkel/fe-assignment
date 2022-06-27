import './App.css';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import CharacterList from './pages/CharacterList';
import CharacterDetail from './pages/CharacterDetail';
import { CharacterRequestID, getAllCharacters } from './api/characters';

import NavBar from './components/NavBar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 3600, // 2 minutes
      cacheTime: 10 * 3600 // 10 minutes
    }
  }
});

function App() {
  useEffect(() => {
    const prefetchCharacterList = () =>
      queryClient.prefetchQuery(CharacterRequestID.LIST, getAllCharacters);

    prefetchCharacterList();

    return () => {
      queryClient.resetQueries(CharacterRequestID.LIST);
    };
  }, []);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/:id" element={<CharacterDetail />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
