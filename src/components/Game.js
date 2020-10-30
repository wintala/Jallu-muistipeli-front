import React, {useEffect, useState, useRef} from 'react';
import ScoreSubmit from './ScoreSubmitForm'

// DRY as fuck :D 
import QMimage from '../qm.jpg'
import kossu from '../kossu.jpg'
import jallu1 from '../Jallut/jallu1.jpg'
import jallu10 from '../Jallut/jallu10.jpg'
import jallu11 from '../Jallut/jallu11.jpg'
import jallu12 from '../Jallut/jallu12.jpg'
import jallu13 from '../Jallut/jallu13.jpg'
import jallu14 from '../Jallut/jallu14.jpg'
import jallu15 from '../Jallut/jallu15.jpg'
import jallu16 from '../Jallut/jallu16.jpg'
import jallu2 from '../Jallut/jallu2.jpg'
import jallu3 from '../Jallut/jallu3.jpg'
import jallu4 from '../Jallut/jallu4.jpg'
import jallu5 from '../Jallut/jallu5.jpg'
import jallu6 from '../Jallut/jallu6.jpg'
import jallu7 from '../Jallut/jallu7.jpg'
import jallu8 from '../Jallut/jallu8.jpg'
import jallu9 from '../Jallut/jallu9.jpg'


const Game = () => {
  const pairsTotal = 16
  const [cards, setCards] = useState([])
  const [turn, setTurn] = useState(1)
  const [currentlyTurnedIndecies, setCurrentlyTurnedIndecies] = useState([])
  const [pairsFound, setPairsFound] = useState(0)
  const [gameEndStats, setGameEndStats] = useState(null)
  const startTime = useRef(null)


  useEffect(() => {
    if (pairsFound === pairsTotal) {
      const endTime = new Date()
      const timeDiff = Math.floor((endTime - startTime.current) / 1000)
      setGameEndStats({points: Math.floor(1000000 / (turn * timeDiff)), turn, time: timeDiff})
    }
  },[pairsFound, turn, cards])


  useEffect(() => {
		const shuffleCards = () => {
			const backgrounds = [jallu1, jallu10, jallu11, jallu12, jallu13, jallu14, jallu15, jallu16, jallu2, jallu3, jallu4, jallu5, jallu6, jallu7, jallu8, jallu9]

			const half = backgrounds.map( (b, i) => (
				{text: `jallu${i}`, turned: false, partOfPair: i, found: false, backgroundImage: b}
				))
	
			const otherhalf = backgrounds.map( (b, i) => (
				{text: `jallu${i + backgrounds.length}`, turned: false, partOfPair: i, found: false, backgroundImage: b}
				))
	
			const toBeShuffeled = half.concat(otherhalf).concat({text: 'kossu', turned: false, partOfPair: -1, found: false, backgroundImage: kossu})
	
			for (let i = toBeShuffeled.length - 1; i > 0; i--){
				const j = Math.floor(Math.random() * i)
				const temp = toBeShuffeled[i]
				toBeShuffeled[i] = toBeShuffeled[j]
				toBeShuffeled[j] = temp
			}
			return toBeShuffeled
		}
    setPairsFound(0)
    setTurn(1)
    setCurrentlyTurnedIndecies([])
    setCards(shuffleCards())
    startTime.current = new Date()
	}, [gameEndStats])


  const turnCard = (index) => {
    if (index === currentlyTurnedIndecies[0] || cards[index].found){
      return null
    }

    if (currentlyTurnedIndecies.length === 2) {
      setTurn(turn + 1)
      setCurrentlyTurnedIndecies([index])
      setCards(cards.map((c, i) => (
        {...c, turned: (c.found || (i === index)) ? true : false}
      )))
    } else {
      setCurrentlyTurnedIndecies(currentlyTurnedIndecies.concat(index))
      const newCards = [...cards]
      newCards[index].turned = true
      setCards(newCards)
    }


    if (currentlyTurnedIndecies.length === 1){
      const corectPair = cards[currentlyTurnedIndecies[0]].partOfPair

      if (cards[index].partOfPair === corectPair) {
        setPairsFound(pairsFound + 1)
        setCards(cards.map(c => (
          {...c, found: c.partOfPair === corectPair ? true : c.found}
        )))
      }
    }
  }

  return(
    <>
      {gameEndStats ? <ScoreSubmit gameEndStats={gameEndStats} setGameEndStats={setGameEndStats}/> : null}
      <div id="turns">
        Turn: {turn}
      </div>
      <div className="h-div">
        <h1>
          Jallu-muistipeli
        </h1>
        <div className="tooltip">
          <div className="tooltip-text">
             Löydä jalluille parit.  Pisteesi määrittyvät käytetyn ajan ja vuorejen perusteella.  Huomaa että joukossa on pariton koskenkorva. 
          </div>
        </div>
      </div>
      <div id="card-container">
        {cards.map((c, i) => 
        <div className="card"
        key={c.text + (c.turned ? 0 : 1)} 
        onClick={() => turnCard(i)} 
        style={{backgroundImage: c.turned ? `url(${c.backgroundImage})` : `url(${QMimage})`}}>
          <div className="filter" style={{backgroundColor: c.found ? "rgba(255, 0, 43, 0.7)" : "transparent"}}></div>
        </div>)}
      </div>
    </>
  )
}

export default Game