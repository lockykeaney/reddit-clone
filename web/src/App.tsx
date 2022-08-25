import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import { Button, Card, TextInput } from "@packages/components";

function App() {
  const [count, setCount] = useState(0);
  const [response, setResponse] = useState<string>();

  useEffect(() => {
    fetch("http://localhost:4000").then((res) => {
      console.log(res);
      setResponse("returned");
    });
  }, []);
  return (
    <div className="App">
      <div>
        <Button />
        <TextInput />
        <Card />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      {response ? <p>{response}</p> : <p>Waiting for response</p>}
    </div>
  );
}

export default App;
