import style from '../../../assets/stylesheets/kow.module.css'
import React from 'react'

const ArtefactSelectionLabel = props => {
	let extraSpace
	if (parseInt(props.artefact.points) < 10) {
		extraSpace = <span className={style['hidden']}>{'_'}</span>
	}

	let display
	if (props.greyedOut === false) {
		display =
			<div className={style['unit-option-selection-tile-row']}>
				<div className={style['unit-option-label-div']}>
					{extraSpace}
					<span className={style['unit-option-points-label']}>{parseInt(props.artefact.points)}</span>
				</div>
				<div className={style['unit-option-label-div']}>
					<span
						onClick={() => props.selectArtefact(props.unitObject, props.artefact)}
						className={style['unit-option-selection-label']}
					>
						{props.artefact.display_name}
					</span>
				</div>
			</div>
	} else {
		display =
			<div className={style['unit-option-selection-tile-row-greyed-out']}>
				<div className={style['unit-option-label-div']}>
					{extraSpace}
					<span>{parseInt(props.artefact.points)}</span>
				</div>
				<div className={style['unit-option-label-div']}>
					<span>
						{props.artefact.display_name}
					</span>
				</div>
			</div>	
	}

	return (
		<div>{display}</div>
	)
}

export default ArtefactSelectionLabel