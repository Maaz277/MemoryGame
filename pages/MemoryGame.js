import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";
import Card from "./Card"


export default function MemoryGame({ options, setOptions, highScore, setHighScore }) {
    const [game, setGame] = useState([])
    const [gameSet1, setGameSet1] = useState([])
    const [gameSet2, setGameSet2] = useState([])
    const [flippedCount, setFlippedCount] = useState(0)
    const [flippedIndexes, setFlippedIndexes] = useState([])
    const [errorCount, setErrorCount] = useState(0)
    const [second, setSecond] = useState('00');
    const [minute, setMinute] = useState('00');
    const [counter, setCounter] = useState(0);
    const [clearedCards, setClearedCards] = useState({})
    const [flip1, setFlip1] = useState(0)
    const [flip2, setFlip2] = useState(0)
    const [boolflip, setBoolFlip] = useState(false)
    const colors = [
        '#ecdb54',
        '#e34132',
        '#6ca0dc',
        '#944743',
        '#dbb2d1',
        '#ec9787',
        '#00a68c',
        '#645394',
        '#6c4f3d',
        '#ebe1df',
        '#bc6ca7',
        '#bfd833',
    ]

    useEffect(() => {
        let intervalId;

        intervalId = setInterval(() => {
            const secondCounter = counter % 60;
            const minuteCounter = Math.floor(counter / 60);

            const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
            const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

            setSecond(computedSecond);
            setMinute(computedMinute);

            setCounter(counter => counter + 1);
        }, 1000)


        return () => clearInterval(intervalId);
    }, [counter])

    // useEffect(() => {
    //     const newGame = []
    //     for (let i = 0; i < options/2 ; i++) {
    //         const firstOption = {
    //             id: 2 * i,
    //             colorId: i,
    //             color: colors[i],
    //             flipped: false,
    //         }
    //         const secondOption = {
    //             id: 2 * i + 1,
    //             colorId: i,
    //             color: colors[i],
    //             flipped: false,
    //         }

    //         newGame.push(firstOption)
    //         newGame.push(secondOption)
    //     }

    //     const shuffledGame = newGame.sort(() => Math.random() - 0.5)
    //     setGame(shuffledGame)
    //     console.log(shuffledGame)
    // }, [])

    useEffect(() => {
        const newGame1 = []
        for (let i = 0; i < options ; i++) {
            const firstOption = {
                id: i,
                colorId: i,
                color: colors[i],
                flipped: false,
            }
            // const secondOption = {
            //     id: 2 * i + 1,
            //     colorId: i,
            //     color: colors[i],
            //     flipped: false,
            // }

            newGame1.push(firstOption)
            //newGame1.push(secondOption)
        }

        const shuffledGame1 = newGame1.sort(() => Math.random() - 0.5)
        setGameSet1(shuffledGame1)
        //console.log(shuffledGame)
        const newGame2 = []
        for (let i = 0; i < options ; i++) {
            const firstOption = {
                id: i,
                colorId: i,
                color: colors[i],
                flipped: false,
            }
            // const secondOption = {
            //     id: 2 * i + 1,
            //     colorId: i,
            //     color: colors[i],
            //     flipped: false,
            // }

            newGame2.push(firstOption)
            //newGame2.push(secondOption)
        }

        const shuffledGame2 = newGame2.sort(() => Math.random() - 0.5)
        setGameSet2(shuffledGame2)
    }, [])

    useEffect(() => {
        const finished1 = !gameSet1.some(card => !card.flipped)
        const finished2 = !gameSet2.some(card => !card.flipped) 
        if (finished1 && gameSet1.length > 0 && finished2 && gameSet2.length > 0) {
            setTimeout(() => {
                let score = errorCount
                // setHighScore(score)
                // const json = JSON.stringify(score)
                // localStorage.setItem('memorygamehighscore', json)

                const newGame = confirm('ERROR SCORE: ' + score + ' , TIME: ' + minute + ':' + second + '....' + ' Play again?')
                if (newGame) {
                    const gameLength = gameSet1.length
                    setOptions(null)
                    setTimeout(() => {
                        setOptions(gameLength)
                    }, 5)
                } else {
                    setOptions(null)
                }
            }, 500)
        }
    }, [gameSet1,gameSet2])

    // if (flippedIndexes.length === 2) {
    //     //console.log(flippedIndexes)
    //     const match = game[flippedIndexes[0]].colorId === game[flippedIndexes[1]].colorId

    //     if (match) {
    //         const newGame = [...game]
    //         newGame[flippedIndexes[0]].flipped = true
    //         newGame[flippedIndexes[1]].flipped = true
    //         setGame(newGame)

    //         const newIndexes = [...flippedIndexes]
    //         newIndexes.push(false)
    //         setFlippedIndexes(newIndexes)
           
            

    //     } else {
    //         const newIndexes = [...flippedIndexes]
    //         newIndexes.push(true)
    //         setFlippedIndexes(newIndexes)
    //         setErrorCount(errorCount + 1)
    //     }
    //     console.log(flippedIndexes)
    // }

    useEffect(() => {
        //console.log(flip1, flip2, 'values')
        if (!!gameSet1.length && !!gameSet2.length) {
            const match = gameSet1[flip1].colorId === gameSet2[flip2].colorId
            console.log(match, 'ísmatchiong')
            if (match) {
                const newGame1 = [...gameSet1]
                newGame1[flip1].flipped = true
                setGameSet1(newGame1)
    
                const newGame2 = [...gameSet2]
                newGame2[flip2].flipped = true
                setGameSet2(newGame2)

                setBoolFlip(false)
    
    
            } else {
                setBoolFlip(true)
    
                setErrorCount(errorCount + 1)
            }
            //console.log("1:",flip1)
            //console.log("2:",flip2)
            
        }
    }, [flip1, flip2])

    // useEffect(() => {
    //     console.log(flip1, flip2, 'values')
    //     if (!!game.length) {
    //         const match = game[flip1].colorId === game[flip2].colorId
    //         console.log(match, 'ísmatchiong')
    //         if (match) {
    //             const newGame = [...game]
    //             newGame[flip1].flipped = true
    //             newGame[flip2].flipped = true
    //             setGame(newGame)
    
    //             setBoolFlip(false)
    
    
    //         } else {
    //             setBoolFlip(true)
    
    //             setErrorCount(errorCount + 1)
    //         }
    //         console.log("1:",flip1)
    //         console.log("2:",flip2)
            
    //     }
    // }, [flip1, flip2])


    const checkIsInactive = (card) => {
        return Boolean(clearedCards[card.id])
    }

    if (gameSet1.length === 0) return <div>loading...</div>
    else {
        return (
            <div>
                <div className="sets">
                    <div id="cards">
                        {gameSet1.map((card, index) => {
                            // console.log(card)
                            return (
                                <div className="card" key={index}>
                                    <Card
                                        id={index}
                                        color={card.color}
                                        game={gameSet1}
                                        flippedCount={flippedCount}
                                        setFlippedCount={setFlippedCount}
                                        flippedIndexes={flip1}
                                        setFlippedIndexes={setFlip1}
                                        boolflip={boolflip}

                                    //IsInactive={checkIsInactive(card)}
                                    />
                                </div>
                            )
                        })}
                    </div>
                        <div id="cards">
                            {gameSet2.map((card, index) => (
                                <div className="card" key={index}>
                                    <Card
                                        id={index}
                                        color={card.color}
                                        game={gameSet2}
                                        flippedCount={flippedCount}
                                        setFlippedCount={setFlippedCount}
                                        flippedIndexes={flip2}
                                        setFlippedIndexes={setFlip2}
                                        boolflip={boolflip}
                                    />
                                </div>
                            ))}
                        </div>
                </div>
                <h2>Time Elapsed</h2>
                <span className="minute">{minute}</span>
                <span>:</span>
                <span className="second">{second}</span>
            </div>
        )
    }
}