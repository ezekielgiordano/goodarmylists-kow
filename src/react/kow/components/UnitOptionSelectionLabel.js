import style from '../../../assets/stylesheets/kow.module.css'
import React from 'react'

const UnitOptionSelectionLabel = props => {
	let extraSpace
	if (parseInt(props.unitOption.points) < 10) {
		extraSpace = <span className={style['hidden']}>{'_'}</span>
	}

	let className
	let highlightingAction
	if (props.highlighted === true && props.greyedOut === true) {
		className = style['highlighted-unit-option']
		highlightingAction = 'none'
	}
	if (props.highlighted === true && props.greyedOut === false) {
		className = style['unit-option-selection-label-highlighted-unit-option']
		highlightingAction = 'remove'
	}
	if (props.highlighted === false && props.greyedOut === true) {
		className = style['nothing-class']
		highlightingAction = 'none'
	}
	if (props.highlighted === false && props.greyedOut === false) {
		className = style['unit-option-selection-label']
		highlightingAction = 'add'
	}

	let display
	if (props.greyedOut === false) {
		display =				
			<div className={style['unit-option-selection-tile-row']} id={parseInt(props.unitOption.id)}>
				<div className={style['unit-option-label-div']}>
					{extraSpace}
					<span className={style['unit-option-points-label']}>{parseInt(props.unitOption.points)}</span>
				</div>
				<div className={style['unit-option-label-div']}>
					<span
						onClick={() => props.updateHighlightedUnitOptions(
							props.unitOption,
							highlightingAction
						)}				
						className={className}
						id={parseInt(props.unitOption.id)}
					>
						{props.unitOption.display_name}
					</span>
				</div>
			</div>
				
			
	} else {
		display =
			<div  className={style['unit-option-selection-tile-row-greyed-out']} id={parseInt(props.unitOption.id)}>
				<div className={style['unit-option-label-div']}>
					{extraSpace}
					<span>{parseInt(props.unitOption.points)}</span>
				</div>
				<div className={style['unit-option-label-div']}>
					<span className={className}>{props.unitOption.display_name}</span>
				</div>
			</div>
	}

	return (
		<div>
			{display}
		</div>		
	)
}

export default UnitOptionSelectionLabel