import { useState, useEffect, useLayoutEffect } from "react";
import { Link } from 'react-router-dom';
import './gameOptions.css';

const faces = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

function GameOptions(props) {
  const [cards, setCards] = useState([]);
  const [pairs, setPairs] = useState(2);
  const [timer, setTimer] = useState(20);
  const [fails, setFails] = useState(20);


  const setCardCount = (count) => {
    const c = [];
    var fi = 0;
    const pairs = (count * 2);

    for (var i = 0; i < pairs; i++) {
      var f = Math.floor(i / 2);

      c.push({
        face: faces[f],
        faceId: fi,
        complete: false
      })

      fi++;
      if (fi > 1) fi = 0;
    }

    console.log(c);

    return c;
    setCards(c);
  }

  const handleChange = (event) => {
    const target = event.target;
    //const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(name);

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
