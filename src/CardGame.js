import { useState, useEffect, useRef  } from "react";
import Card from './Card';
import { Link } from 'react-router-dom';

var cardsDef = [
  {
    face: "A",
    faceId: 0,
    complete: false
  },
  {
    face: "A",
    faceId: 1,
    complete: false
  },
  {
    face: "B",
    faceId: 0,
    complete: false
  },
  {
    face: "B",
    faceId: 1,
    complete: false
  },
  {
    face: "C",
    faceId: 0,
    complete: false
  },
  {
    face: "C",
    faceId: 1,
    complete: false
  },
  {
    face: "D",
    faceId: 0,
    complete: false
  },
  {
    face: "D",
    faceId: 1,
    complete: false
  },
  {
    face: "F",
    faceId: 0,
    complete: false
  },
  {
    face: "F",
    faceId: 1,
    complete: false
  }
]
function CardGame(props) {
  const [cards, setCards] = useState(props.cards);
  const [timer, setTimer] = useState(props.timer);
  const [fails, setFails] = useState(props.fails);
  const [ids, setIds] = useState(props.ids);
  const [selectedCardIds, setSelectedCardIds] = useState([]);
  const [canPlay, setCanPlay] = useState(true);
  const [hasWon, setHasWon] = useState(false);

  const timerInterval = useRef();

  useEffect(() => {
    timerInterval.current = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);
  }, [])

  useEffect(() => {
    console.log(timer)
    if(timer <= 0 && canPlay){
      gameOver();
    }

  }, [timer])

  useEffect(() => {
    if(hasWon){

    }

  }, [hasWon])

  useEffect(() => {
    console.log(selectedCardIds)
    if (selectedCardIds.length >= 2) {
      endSelection();
    }
  }, [selectedCardIds])

  const handleCardClick = (id) => {
    if(selectedCardIds.length < 2 && canPlay){
      setSelectedCardIds([...selectedCardIds, id])
    } else {
      console.log("cannot click a card yet!")

    }
  }

  const endSelection = () => {
    if (matched()) {
      console.log("match!")

      cards[ids[selectedCardIds[0]]].complete = true;
      cards[ids[selectedCardIds[1]]].complete = true;

      checkForVictory();

    } else {
      console.log("no match")
      setFails(fails - 1);
      if((fails - 1) <= 0){
        gameOver();
      }

    }

    setTimeout(function() {
      setSelectedCardIds([]);
    }, 1000);
  }

  const checkForVictory = () => {
    const foundIncompletePair = cards.find((card) => card.complete === false )

    if(!foundIncompletePair){
      clearInterval(timerInterval.current);

      props.handleVictory();
    }
  }

  const gameOver = () => {
    clearInterval(timerInterval.current);
    setCanPlay(false);
    console.log("You Lose!")
    props.handleGameOver();
  }

  const matched = () => {
    return cards[ids[selectedCardIds[0]]].face === cards[ids[selectedCardIds[1]]].face
  }

  return (
    <div className="CardGame">
      <h2 className="timer">{timer > 0 ? timer : "Times Up!"}</h2>
      <div className="cardContainer">
        {
          cards ?
          ids.map((id, i) => {
            return <Card 
              key={i} 
              cardId={id} 
              reftableId={i} 
              selected={selectedCardIds.includes(i)} 
              complete={cards[id].complete} 
              face={cards[id].face} 
              handleCardClick={handleCardClick} 
            />
          }) : null
        }
      </div>
    </div>
  );
}

export default CardGame;
