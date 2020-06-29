import style from '../../../assets/stylesheets/kow.module.css'
import React from 'react'

const UnitEntryNameTileFormatted = props => {
	let nonSpells = []
	let spells = []
	let pointsForEntry = parseInt(props.unitObject.unit.points)
	let i
	for (i = 0; i < props.selectedUnitOptions.length; i++) {
		if (
			(
				props.selectedUnitOptions[i].unitOption.is_spell === false ||
				props.selectedUnitOptions[i].unitOption.is_spell === 'f'
			) &&
			props.selectedUnitOptions[i].index === props.unitObject.index
		) {
			nonSpells.push(props.selectedUnitOptions[i])
			pointsForEntry += parseInt(props.selectedUnitOptions[i].unitOption.points)
		}
		if (
			(
				props.selectedUnitOptions[i].unitOption.is_spell === true ||
				props.selectedUnitOptions[i].unitOption.is_spell === 't'
			) &&
			props.selectedUnitOptions[i].index === props.unitObject.index
		) {
			spells.push(props.selectedUnitOptions[i])
			pointsForEntry += parseInt(props.selectedUnitOptions[i].unitOption.points)
		}	
	}
	let artefact
	let artefactDisplay
	if (props.selectedArtefacts !== undefined) {
		for (i = 0; i < props.selectedArtefacts.length; i++) {
			if (props.selectedArtefacts[i].index === props.unitObject.index) {
				artefact = props.selectedArtefacts[i].artefact
				pointsForEntry += parseInt(props.selectedArtefacts[i].artefact.points)
			}
		}
		if (artefact !== undefined && artefact !== null) {
			artefactDisplay =
				<div>
					--{' '}<i>{artefact.display_name}</i>
				</div>
		}
	}

	let nonSpellDisplay
	if (nonSpells.length > 0) {
		nonSpellDisplay = nonSpells.map(unitOptionObject => {
			return (
				<div key={unitOptionObject.index + parseInt(unitOptionObject.unitOption.id) + 70000}>
					--{' '}<i>{unitOptionObject.unitOption.display_name}</i>
				</div>
			)
		})
	}

	let spellDisplay
	if (spells.length > 0) {
		spellDisplay = spells.map(unitOptionObject => {
			return (
				<div key={unitOptionObject.index + parseInt(unitOptionObject.unitOption.id) + 100000}>
					--{' '}<i>{unitOptionObject.unitOption.display_name}</i>	
				</div>
			)
		})
	}

	return (
		<div className={style['formatted-list-entry']}>
			<div>{pointsForEntry},{' '}{props.unitObject.unit.display_name}</div>
			{artefactDisplay}
			{nonSpellDisplay}
			{spellDisplay}
		</div>
	)
}

export default UnitEntryNameTileFormatted