import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";
import Card from "./Card"
import MemoryGame from "./MemoryGame"

export default function App() {
  const [options, setOptions] = useState(null)
  const [highScore, setHighScore] = useState(0)

  useEffect(() => {
    const json = localStorage.getItem('memorygamehighscore')
    const savedScore = JSON.parse(json)
    if (savedScore) {
      setHighScore(savedScore)
    }
  }, [])

  return (
    <div>
      <div className="container">
        <h1>Memory Game</h1>
        <div>Number of errors will be shown at completion</div>
        <div>
          {options === null ? (
            <>
              <button onClick={() => setOptions(6)}>Easy</button>
              <button onClick={() => setOptions(12)}>Medium</button>
              <button onClick={() => setOptions(18)}>Hard</button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  const prevOptions = options
                  setOptions(null)
                  setTimeout(() => {
                    setOptions(prevOptions)
                  }, 5)
                }}
              >
                Start Over
              </button>
              <button onClick={() => setOptions(null)}>Main Menu</button>
            </>
          )}
        </div>
      </div>

      {options ? (
        <MemoryGame
          options={options}
          setOptions={setOptions}
          highScore={highScore}
          setHighScore={setHighScore}
        />
      ) : (
        <div>
          <h2>Instructions</h2>
          <h3>Each Card has a color. Click on it to reveal it. Match the colors and win. Each time you mismatch, an erorr count is added. Try to get min error score.</h3>
          <h2>Choose a difficulty to begin!</h2>
        </div>
      )}
    </div>
    
  )
}
