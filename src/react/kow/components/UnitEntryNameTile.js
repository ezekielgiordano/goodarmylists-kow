import style from '../../../assets/stylesheets/kow.module.css'
import React from 'react'

const UnitEntryNameTile = props => {
	let allSelectedUnitOptions = props.selectedUnitOptions.sort((a, b) => {
		return (parseInt(a.points) - parseInt(b.points))
	})
	let nonSpells = []
	let spells = []
	let i
	for (i = 0; i < allSelectedUnitOptions.length; i++) {
		if (allSelectedUnitOptions[i].index === props.unitObject.index) {
			if (allSelectedUnitOptions[i].unitOption.is_spell === true) {
				spells.push(allSelectedUnitOptions[i])
			} else {
				nonSpells.push(allSelectedUnitOptions[i])
			}
		}
	}
	let nonSpellText
	let spellText
	if (nonSpells.length > 0) {
		nonSpellText = nonSpells.map((unitOptionObject, index) => {
			return (
				<div key={index + 15000} >
					<span						
						className={style['unit-option-entry-label']}
						onClick={() => props.removeUnitOption(unitOptionObject, props.alliedArmy)}
					>
						{' -- '}{unitOptionObject.unitOption.display_name}
					</span>
				</div>

			)
		})
	}
	if (spells.length > 0) {
		spellText = spells.map((unitOptionObject, index) => {
			return (
				<div key={index + 30000} >
					<span						
						className={style['unit-option-entry-label']}
						onClick={() => props.removeUnitOption(unitOptionObject, props.alliedArmy)}
					>
						{' -- '}{unitOptionObject.unitOption.display_name}
					</span>
				</div>

			)
		})
	}

	let artefactText
	if (props.selectedArtefacts) {
		let allSelectedArtefacts = props.selectedArtefacts
		let selectedArtefactArray = []
		for (i = 0; i < allSelectedArtefacts.length; i++) {
			if (allSelectedArtefacts[i].index === props.unitObject.index) {
				selectedArtefactArray.push(allSelectedArtefacts[i])
			}
		}
		if (selectedArtefactArray.length > 0) {
			artefactText =
				<div>
					<span
						onClick={() => props.removeArtefact(selectedArtefactArray[0], props.alliedArmy)}
						className={style['unit-option-entry-label']}
					>
						{' -- '}{selectedArtefactArray[selectedArtefactArray.length - 1].artefact.display_name}
					</span>
				</div>
		}
	}

	return (
		<div className={style['list-entry-div']}>
			<div>
				<span 
					onClick={() => props.removeUnitFromList(
						props.unitObject,
						props.alliedArmy			
					)}
					className={style['list-entry-label']}
				>
					{props.unitObject.unit.display_name}
				</span>
			</div>
				{artefactText}
				{nonSpellText}
				{spellText}
		</div>
	)
}

export default UnitEntryNameTile