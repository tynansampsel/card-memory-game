import { useState, useEffect, useLayoutEffect } from "react";
import { Link } from 'react-router-dom';
import './gameOptions.css';

const faces = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

function GameOptions(props) {
  //const [cards, setCards] = useState([]);
  const [pairs, setPairs] = useState(2);
  const [timer, setTimer] = useState(20);
  const [fails, setFails] = useState(20);


  //creates an array of cards. faceId is for distinguishing which "A"/"B"/ect card it is.
  //not currently neccesary but may be of use later.
  const setCardCount = (count) => {
    const cards = [];
    var faceId = 0;
    const pairSize = 2;

    const pairs = (count * pairSize);

    for (var i = 0; i < pairs; i++) {
      cards.push({
        face: faces[Math.floor(i / pairSize)],
        faceId: faceId,
        complete: false
      })

      faceId++;
      if (faceId >= pairSize) faceId = 0;
    }

    console.log(cards);

    return cards;
    //setCards(c);
  }

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    switch (name) {
      case "pair":
        setPairs(target.value)
        break;

      case "timer":
        setTimer(target.value)
        break;

      case "fails":
        setFails(target.value)
        break;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit");



    props.startGame({
      cards: setCardCount(pairs),
      timer: timer,
      fails: fails
    });
  }

  return (
    <div className="GameOptions">
      <form onSubmit={handleSubmit}>
        <label>
          Pairs
          <input
            name="pair"
            type="number"
            value={pairs}
            onChange={handleChange}
          />
        </label>
        <label>
          Timer
          <input
            name="timer"
            type="number"
            value={timer}
            onChange={handleChange}
          />
        </label>
        <label>
          Fails
          <input
            name="fails"
            type="number"
            value={fails}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Start</button>
      </form>
    </div>
  );
}

export default GameOptions;
