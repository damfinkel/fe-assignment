import './App.css';
import { Routes, Route } from "react-router-dom";

import CharacterList from './pages/CharacterList';
import CharacterDetail from './pages/CharacterDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/:id" element={<CharacterDetail />} />
      </Routes>
    </div>
  );
}

export default App;
