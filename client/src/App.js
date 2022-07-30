import './App.css';
import { lazy, Suspense, useEffect, useState } from 'react';
import uniqid from 'uniqid';
import * as gameService from './services/gameService';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Create } from './components/Create/Create';
import { Catalog } from './components/Catalog/Catalog';
import { GameDetails } from './components/GameDetails/GameDetails';
import { AuthContext } from './contexts/AuthContext';
import { GameContext } from './contexts/GameContext';
import { Logout } from './components/Logout/Logout.js';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Edit } from './components/Edit/Edit';

// import { Register } from './components/Register/Register';

const Register = lazy(() => import('./components/Register/Register'))

function App() {

  const [games, setGames] = useState([]);
  const [auth, setAuth] = useLocalStorage('auth', {});
  const navigate = useNavigate();

  const userLogin = (authData) => {
    setAuth(authData)
  }

  const userLogout = () => {
    setAuth({})
  };

  const addComment = (gameId, comment) => {
    setGames(state => {
      const game = state.find(x => x._id == gameId);

      const comments = game.comments || [];
      comments.push(comment)

      return [
        ...state.filter(x => x._id !== gameId),
        { ...game, comments },
      ];
    });
  };

  const gameAdd = (gameData) => {
    setGames(state => [
      ...state,
      {
        ...gameData,
      }
    ]);
    navigate('/')
  }

  const gameEdit = (gameId, gameData) => {
    setGames(state => state.map(x => x._id === gameId ? gameData : x));
  }

  useEffect(() => {
    gameService.getAll()
      .then(result => {
        setGames(result)
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
      <div id="box">
        <Header />
        {/* Main Content */}
        <GameContext.Provider value={{games, gameAdd, gameEdit}}>
        <main id="main-content">
          <Routes>
            <Route path="/" component={Home} element={<Home games={games} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={
              <Suspense fallback={<span>Loading...</span>}>
                <Register />
              </Suspense>} />
            <Route path="/logout" element={<Logout />}/>
            <Route path="/create" element={<Create />} />
            <Route path="/games/:gameId/edit" element={<Edit />} />
            <Route path="/catalog" element={<Catalog games={games} />} />
            <Route path="/catalog/:gameId" element={<GameDetails games={games} addComment={addComment} />} />
          </Routes>
        </main>
        </GameContext.Provider>
  
        {/*  */}
        {/*Details Page*/}

        {/* Catalogue */}

      </div>
    </AuthContext.Provider>
  );
}

export default App;
