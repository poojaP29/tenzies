import { useState,useEffect } from 'react';
import './App.css';
import Dicedata from './Dicedata.js';
import {nanoid} from "nanoid";


function App() {
  const [dice,setDice]=useState(newDice());
  const [tenzies, setTenzies] = useState(false)

    useEffect(() => {
      const flagValues = dice.every(die => die.flag)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)

      if (flagValues && allSameValue) {
        setTenzies(true);
         console.log("You won!")
      }
   }, [dice])
  
  function generateNewDice() {
    return {
        value: Math.ceil(Math.random() * 6),
        flag: false,
        id: nanoid()
    }
}

  function newDice()
  {
    const dieArray=[];
    for(let i=0;i<10;i++)
    {  
        
        dieArray.push(generateNewDice())
    }
    return dieArray;
  }
    function rollDice()
    {
      if(!tenzies) {
        setDice(prevDice => prevDice.map(dicedata => {
            return dicedata.flag ? 
                dicedata :
                generateNewDice()
        }))
      } 
      else 
      {
        setTenzies(false)
        setDice(newDice())
      }
  
    }
    function holdDice(id) {
      setDice(prevDice => prevDice.map(dicedata => {
        return dicedata.id === id ? {...dicedata, flag: !dicedata.flag} : dicedata;
    }))
  }
  const dicenumbers=dice.map(dicedata => <Dicedata key={dicedata.id} value={dicedata.value} flag={dicedata.flag} holdDice={() => holdDice(dicedata.id)} />)
  
  return (

      <main>
         <h1 className="title">Tenzies</h1>
         <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
         <div className="container">
            {dicenumbers}
         </div>
         <button className="rolldice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>

      </main>
  );
}

export default App;
