import React, {useState, useEffect} from 'react'
import axios from 'axios';
// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at


export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [email, setEmail] = useState(initialEmail);

 
  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    return [index % 3 + 1, Math.floor(index / 3 + 1)];
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    let [x,y] = getXY();
    return `Coordinates (${x}, ${y})`;
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setIndex(initialIndex);
    setSteps(initialSteps);
    setEmail(initialEmail);
    document.getElementById('message').textContent='';
    document.getElementById('email').value='';
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

    let messageElement = document.getElementById('message');
    messageElement.textContent = '';

    let [x,y] = getXY();

    if(direction=="LEFT") {
      if(x > 1) {
        return index-1;
      }
    }
    if(direction=="RIGHT") {
      if(x<3) {
        return index+1;
      }
    }
    if(direction=="UP") {
      if(y>1) {
        return index-3;
      }
    }
    if(direction=="DOWN") {
      if(y<3) {
        return index+3;
      }
    }
    messageElement.textContent = `You can't go ${direction.toLowerCase()}`
    return index;
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    let newIndex = getNextIndex(evt.target.textContent);
    if(newIndex != index) {
      setIndex(newIndex);
      setSteps(steps + 1);
    }
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    let url = 'http://localhost:9000/api/result'
    let [x,y] = getXY();

    let args = {x:x, y:y, steps:steps, email:email};

    let messageElement = document.getElementById('message');

    axios
      .post(url, {x:x, y:y, steps:steps, email:email})
      .then((res) => {messageElement.textContent = res.data.message})
      .catch((err) => {messageElement.textContent = err.response.data.message;});
      
      setEmail('');
      document.getElementById('email').value='';
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} time{steps==1?'':'s'}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email" onChange={onChange}></input>
        <input id="submit" type="submit" onClick={onSubmit}></input>
      </form>
    </div>
  )
}
