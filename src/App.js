import { useEffect, useState } from 'react';
import './App.css'
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/helmet-1.png"},
  {"src": "/img/potion-1.png"},
  {"src": "/img/ring-1.png"},
  {"src": "/img/scroll-1.png"},
  {"src": "/img/shield-1.png"},
  {"src": "/img/sword-1.png"},
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  //sheffule card
  const shuffleCard = () => {
    const shuffleCard = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card)=> ({...card, id:Math.random()}))

    setCards(shuffleCard);
    setTurns(0);

  }
  
  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card) 
  }

  // compare 2 selected cards
  useEffect(() => {
    if(choiceOne && choiceTwo) {
      if(choiceOne.src === choiceTwo.src) {
        console.log('they match')
        resetTurn()
      } else{
        console.log('they dont match')
        resetTurn();
      }
    }
  }, [choiceOne, choiceTwo])
  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(preTurns => preTurns + 1)
  }
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCard}>New Game</button>

      <div className="card-grid">
        {cards.map(card=>(
         <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
         />
        ))}
      </div>
    </div>
  );
}

export default App