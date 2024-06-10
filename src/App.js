import React from 'react';
import './index.css';
import PokemList from './components/PokemList';
import ErrorB from './components/ErrorB';

function App() {
  return (
    <ErrorB>
      <div className="App bg-black min-h-screen text-white">
        <PokemList />
      </div>
    </ErrorB>
  );
}

export default App;
