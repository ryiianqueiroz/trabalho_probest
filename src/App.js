import './App.css';
import Form from "./components/form"
import Result from "./components/result"
import { useState } from "react";

function App() {

  const [ isResult, setIsResult ] = useState(false)
  const [ predict, setPredict ] = useState("")

  return (
    <main>
      <Form 
        resultado={setIsResult}
        classe={setPredict}
      />
      { isResult ? (
        <Result 
          resultado={predict}/>
      ) : (
        <></>
      ) }
    </main>
  );
}

export default App;
