import style from '../assets/stylesheets/games.module.css'
import React from 'react'
import { Link } from 'react-router-dom'

const GamesContainer = props => {
	return (
		<div className={style['main-page']}>
			<div className={style['main-page-box']}>
				<div className={style['main-page-title-box']}>
					<h2 className={style['main-page-title']}>Make a Good Army List</h2>
				</div>
				<div className={style['main-page-games']}>
					<div className={style['main-page-game']}>
						<span className={style['main-page-game-label']}>
							<Link to='/kow'>Kings of War</Link>
						</span>
					</div>
				</div>
			</div>
			<div className={style['email-div']}>
				<span>Email:{' '}</span>admin@goodarmylists.com
			</div>
		</div>
	)
}

export default GamesContainer