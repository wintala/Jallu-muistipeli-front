import React, { useState } from "react"
import service from '../service'

const ScoreSubmit = ({gameEndStats, setGameEndStats}) => {
	const [username, setUsername] = useState("")

	const handleLogin = (e) => {
		e.preventDefault()
		service.newScore(username, gameEndStats.points)
		setGameEndStats(null)
	}


	return (
		<form onSubmit={handleLogin} className="score-form">
			<div className="score-exit" onClick={() => setGameEndStats(null)}>X</div>
			<h1>Voitit</h1>
			<div>
				<div>Vuroja: {gameEndStats.turn}</div>
				<div>Sekuntia: {gameEndStats.time}</div>
				<div>Pisteesi: {gameEndStats.points}</div>
			</div>
			<div className="input-wrap">
				Username
				<input
					id="username"
					type="text"
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<button  disabled={username.length < 2} id="submit-button">Tallenna pisteesi</button>
		</form>
	)
}

export default ScoreSubmit