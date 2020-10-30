import React, {useEffect, useState} from 'react'
import service from '../service'

const TopScores = () => {
	const [scores, setScores] = useState(null)


	useEffect(() => {
		service.getTopScores().then(r => setScores(r))
	}, [])


	return(
		scores ? 
		<table className="score-table">
			<tbody>
			{scores.map((s, i) => 
			<tr key={s.id}>
				<td>
					{i + 1}
				</td>
				<td>
					{s.playername}
				</td>
				<td>
					{s.score}
				</td>
			</tr>
			)}
			</tbody>
		</table>:
		<div className="load-wrap">
			<div className="spin-loading"></div>
		</div>
		
	)
}

export default TopScores