import { useState, useEffect, useLayoutEffect } from "react";
import CardGame from './CardGame';
import GameOptions from './GameOptions';
import Popup from './Popup';
import { Link } from 'react-router-dom';


function App() {
  const [gameData, setGameData] = useState({});
  const [inGame, setInGame] = useState(false);
  const [ready, setReady] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);


  useEffect(() => {
    if(!inGame && ready){
      console.log("got Game Data");

      setInGame(true);
    }
  }, [gameData, ready])


  useEffect(() => {
    console.log("v changed" + inGame);
  }, [inGame])


  const startGame = (newGameData) => {
    setGameData(newGameData);
    setReady(true);
    console.log("starting game");
  }
  
  
  //gets the cards from gameData. could have just called gameData.cards
  //but this makes it a bit more consistent in the JSX.
  const getCards = () => {
    console.log(gameData.cards);
    return gameData.cards;
  }

  const restart = () => {
    setReady(false);
    setGameOver(false);
    setInGame(false);
    setVictory(false);
  }

  const handleGameOver = () => {
    setGameOver(true);
    console.log("end")
  }

  const handleVictory = () => {
    setVictory(true);
  }

  //returns the ids of the cards scrambled.
  const getIds = () => {
    var ids = gameData.cards.map((cards, i) => i);
    const idsScrambled = ids.sort(() => Math.random() - 0.5);
    console.log(idsScrambled);

    return idsScrambled;
  }

  //gets the timer from gameData. could have just called gameData.timer
  //but this makes it a bit more consistent in the JSX.
  const getTimer = () => {
    console.log(gameData.timer)
    return gameData.timer;
  }

  return (
    <div className="App">
      {inGame ? <CardGame cards={getCards()} ids={getIds()} timer={getTimer()} fails={gameData.fails} handleGameOver={handleGameOver} handleVictory={handleVictory}/> : <GameOptions startGame={startGame}/>}
      {gameOver && inGame && !victory ? <Popup restart={restart} message="GAME OVER!"/> : null}
      {victory && inGame ? <Popup restart={restart} message="YOU WIN!"/> : null}
    </div>
  );
}

export default App;
