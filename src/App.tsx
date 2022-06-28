import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme';
import CharacterList from './pages/CharacterList';
import CharacterDetail from './pages/CharacterDetail';
import { CharacterRequestID, getAllCharacters } from './api/characters';

import NavBar from './components/NavBar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 3600, // 2 minutes
      cacheTime: 10 * 3600, // 10 minutes,
      retry: 2,
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  useEffect(() => {
    const prefetchCharacterList = () =>
      queryClient.prefetchQuery(CharacterRequestID.LIST, () =>
        getAllCharacters({ page: 1 })
      );

    prefetchCharacterList();

    return () => {
      queryClient.resetQueries(CharacterRequestID.LIST);
    };
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <NavBar />
          <Routes>
            <Route path="/" element={<CharacterList />} />
            <Route path="/character/:id" element={<CharacterDetail />} />
          </Routes>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
