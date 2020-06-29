import style from '../../../assets/stylesheets/kow.module.css'
import React from 'react'

const UnitEntryButton = props => {
	let extraSpace
	if (parseInt(props.unit.points) < 100) {
		extraSpace = <span className={style['hidden']}>{'_'}</span>
	}
	let asterisk
	if (props.unit.is_irregular === true || props.unit.is_irregular === 't') {
		asterisk = '*'
	}
	let limitNumber
	if (parseInt(props.unit.limited_n) > 0) {
		limitNumber = ` [${parseInt(props.unit.limited_n)}]`
	}

	let greyedOut = false
	let i
	for (i = 0; i < props.greyedOutUnits.length; i++) {
		if (parseInt(props.greyedOutUnits[i].id) === parseInt(props.unit.id)) {
			greyedOut = true
		}
	}

	let display
	if (greyedOut === false) {
		display =
			<div className={style['unit-entry-button-row']}>
				<div className={style['unit-entry-button-point-value-div']}>
					{extraSpace}
					<span className={style['unit-entry-button-point-value-label']}>{parseInt(props.unit.points)}{' '}</span>
				</div>
				<div className={style['unit-entry-button-label-div']}>
					<span
						onClick={() => props.addUnitToList(props.unit)}
						className={style['unit-entry-button-label']}
					>
						{props.unit.display_name}{asterisk}{limitNumber}
					</span>
				</div>
			</div>		
	} else {
		display =
			<div className={style['unit-entry-button-row']}>
				<div className={style['unit-entry-button-point-value-div-greyed-out']}>
					{extraSpace}
					<span className= {style['unit-entry-button-point-value-label-greyed-out']}>
						{parseInt(props.unit.points)}{' '}
					</span>
				</div>
				<div>
					<span className={style['unit-entry-button-label-greyed-out']}>
						{props.unit.display_name}{asterisk}{limitNumber}
					</span>
				</div>
			</div>
	}

	return (
		<div className={style['unit-entry-button']}>
			{display}
		</div>
	)
}

export default UnitEntryButton