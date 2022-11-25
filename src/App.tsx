import React, { FC, useState } from 'react';
import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import RankGames from './components/RankGames/RankGames';
import ChooseGames from './components/ChooseGames/ChooseGames';

const App: FC = () => {
  const [totalSelectedGames, setTotalSelectedGames] = useState(0);
  const [username, setUsername] = useState('');

  return (<>
      <Header totalSelectedGames={totalSelectedGames} setUsername={setUsername} username={username}></Header>
      <div className="App">
        <Routes>
          <Route
            path='/'
            element={<Navigate to="/choose" replace />} />
          <Route
            path='/choose/:username/:page'
            element={<ChooseGames setTotalSelectedGames={setTotalSelectedGames} />}/>
          <Route
            path='/rank/:username'
            element={<RankGames />} />
        </Routes>
      </div>
    </>);
}

export default App;
