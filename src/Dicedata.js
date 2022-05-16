import React from 'react';
export default function  Dicedata(props){
  const dicestyles = {
    backgroundColor: props.flag  ? "#59E391" : "white"
  }
    return(
      <div className="die" style={dicestyles} onClick={props.holdDice}>
         <h2>{props.value}</h2>
      </div>

    );
}
