import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Card(props) {
  const [cards, setCards] = useState({});


  useEffect(() => {
    
  }, [])

  return (
    <div className={`card ${props.complete ? "complete" : ""} ${props.selected ? "selected" : "unselected"}`} 
    onClick={() => !props.complete ? props.handleCardClick(props.reftableId) : null }>
        <h3>{props.face}</h3>
    </div>
  );
}

export default Card;
