import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";
import MemoryGame from "./MemoryGame"
import classnames from "classnames"

export default function Card({
    id,
    color,
    game,
    flippedCount,
    setFlippedCount,
    flippedIndexes,
    setFlippedIndexes,
    boolflip
    //IsInactive
}) {
    const [hide, setHide] = useState(false)
    const [flipped, set] = useState(false)
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    })

    // useEffect(() => {
    //     if (flippedIndexes[2] === true && flippedIndexes.indexOf(id) > -1) {
    //         setTimeout(() => {
    //             set(state => !state)
    //             setFlippedCount(flippedCount + 1)
    //             setFlippedIndexes([])
    //         }, 1000)
    //     } else if (flippedIndexes[2] === false && id === 0) {
    //         setFlippedCount(flippedCount + 1)
    //         setFlippedIndexes([])
    //         // setHide(true)
    //         // console.log(hide)
    //     }
    // }, [flippedIndexes])

    // const onCardClick = () => {
    //     if (!game[id].flipped && flippedCount % 3 === 0) {
    //         set(state => !state)
    //         setFlippedCount(flippedCount + 1)
    //         const newIndexes = [...flippedIndexes]
    //         newIndexes.push(id)
    //         setFlippedIndexes(newIndexes)
    //     } else if (
    //         flippedCount % 3 === 1 &&
    //         !game[id].flipped &&
    //         flippedIndexes.indexOf(id) < 0
    //     ) {
    //         set(state => !state)
    //         setFlippedCount(flippedCount + 1)
    //         const newIndexes = [...flippedIndexes]
    //         newIndexes.push(id)
    //         setFlippedIndexes(newIndexes)
    //     }
    //     //console.log(flippedIndexes)
    // }

    useEffect(() => {
        if (boolflip === true) {
            //console.log('boolflip')
            setTimeout(() => {
                set(state => !state)
                setFlippedCount(flippedCount + 1)
                // setFlippedIndexes(0)
            }, 1000)
        } else if (boolflip === false && id === 0) {
            //console.log('boolflipelseif')
            setFlippedCount(flippedCount + 1)
            // setFlippedIndexes(0)
        }
    }, [flippedIndexes])

    const onCardClick = () => {
        //console.log(id, 'qwreqwreqwer')
        setFlippedIndexes(id)
        if (!game[id].flipped && flippedCount % 3 === 0) {
            set(state => !state)
            setFlippedCount(flippedCount + 1)
            // setFlippedIndexes(id)
        } else if (flippedCount % 3 === 1 && !game[id].flipped ) {
            set(state => !state)
            setFlippedCount(flippedCount + 1)
            // setFlippedIndexes(id)
        }
        //console.log("id=",id)
        //console.log(flippedIndexes)
    }

    return (
        <div onClick={onCardClick}>
            <a.div
                className="c back"
                style={{
                    opacity: opacity.interpolate(o => 1 - o),
                    transform,
                    //display: hide?"hidden":"",
                }}
            />
            <a.div
                className="c front"
                style={{
                    opacity,
                    transform: transform.interpolate(t => `${t} rotateX(180deg)`),
                    background: color,
                    //display: hide == true?"hidden":"", 
                }}
            />
        </div>
    )
}