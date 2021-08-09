import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import createPersistenState from "use-persisted-state";
const useTempState = createPersistenState("temp");
let someVal = "";
function App() {
  const brodcast = new BroadcastChannel("someData");
  const [temp, setTemp] = useTempState([36.6]);
  const [data, setData] = useState({ value: 2 });
  brodcast.onmessage = (event) => {
    if (someVal !== event.data.value) {
      someVal = event.data;
      setData(event.data);
      setTemp((prevState) => [...prevState, data.value]);
      console.log(temp);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />{" "}
        <div>
          {temp.map((temperature) => (
            <p>{temperature}</p>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
