import style from '../../../assets/stylesheets/kow.module.css'
import React from 'react'
import ArtefactSelectionLabel from './ArtefactSelectionLabel'

const ArtefactSelectionTile = props => {
	let artefacts = props.artefacts
	let availableArtefacts = []
	let i
	
	if (
		props.unitObject.unit.unit_size === 'Horde' ||
		props.unitObject.unit.unit_size === 'Legion'
	) {
		for (i = 0; i < artefacts.length; i++) {
			if (
				artefacts[i].name !== 'Blessing of the Gods' &&
				artefacts[i].name !== 'Chant of Hate' &&
				artefacts[i].name !== 'Brew of Strength' &&
				artefacts[i].name !== 'Brew of Sharpness' &&
				artefacts[i].name !== 'Darklord\'s Onyx Ring' &&
				artefacts[i].name !== 'Mournful Blade' &&
				artefacts[i].name !== 'Boots of the Seven Leagues' &&
				artefacts[i].name !== 'Wings of Honeymaze'

			) {
				availableArtefacts.push(artefacts[i])
			}
		}
	}

	if (
		props.unitObject.unit.unit_type === 'Hero (Infantry)' ||
		props.unitObject.unit.unit_type === 'Hero (Heavy Infantry)' ||
		props.unitObject.unit.unit_type === 'Hero (Cavalry)'
	) {
		for (i = 0; i < artefacts.length; i++) {
			if (
				artefacts[i].name !== 'Blessing of the Gods (Horde)' &&
				artefacts[i].name !== 'Chant of Hate (Horde)' &&
				artefacts[i].name !== 'Brew of Strength (Horde)' &&
				artefacts[i].name !== 'Brew of Sharpness (Horde)'
			) {
				availableArtefacts.push(artefacts[i])
			}
		}
	}

	if (
		props.unitObject.unit.unit_size !== 'Horde' &&
		props.unitObject.unit.unit_size !== 'Legion' &&
		props.unitObject.unit.unit_type !== 'Hero (Infantry)' &&
		props.unitObject.unit.unit_type !== 'Hero (Heavy Infantry)' &&
		props.unitObject.unit.unit_type !== 'Hero (Cavalry)'
	) {
		for (i = 0; i < artefacts.length; i++) {
			if (
				artefacts[i].name !== 'Blessing of the Gods (Horde)' &&
				artefacts[i].name !== 'Chant of Hate (Horde)' &&
				artefacts[i].name !== 'Brew of Strength (Horde)' &&
				artefacts[i].name !== 'Brew of Sharpness (Horde)' &&
				artefacts[i].name !== 'Darklord\'s Onyx Ring' &&
				artefacts[i].name !== 'Mournful Blade' &&
				artefacts[i].name !== 'Boots of the Seven Leagues' &&
				artefacts[i].name !== 'Wings of Honeymaze'

			) {
				availableArtefacts.push(artefacts[i])
			}
		}			
	}

	let sortedArtefacts = availableArtefacts.sort((a, b) => {
		return ( parseInt(a.points) - parseInt(b.points) )
	})

	let selectedArtefactPoints = 0
	for (i = 0; i < props.selectedArtefacts.length; i++) {
		if (props.selectedArtefacts[i].index === props.unitObject.index) {
			selectedArtefactPoints += parseInt(props.selectedArtefacts[i].artefact.points)
		}
	}

	let artefactDisplay = sortedArtefacts.map(artefact => {
		let greyedOut = false
		if (
			(
				(props.pointTotal + props.alliedPointTotal + parseInt(artefact.points) - selectedArtefactPoints) / 4 <
				props.alliedPointTotal
			) && (
				props.alliedPointTotal > 0
			)
		) {
			greyedOut = true
		}
		return (
			<ArtefactSelectionLabel
				key={parseInt(artefact.id)}
				unitObject={props.unitObject}
				artefact={artefact}
				selectArtefact={props.selectArtefact}
				greyedOut={greyedOut}
			/>
		)
	})

	return (
		<div>
			<h4 className={style['artefact-title']}>
				What Magical Artefact will<br />
				{props.unitObject.unit.display_name} have?
			</h4><br />
			<div>
				<span 
					onClick={props.toggleArtefacts}
					className={style['clear-or-cancel-label']}
				>
					Cancel
				</span>
			</div><br />
			<div className={style['artefact-selections']}>{artefactDisplay}</div>
		</div>
	)
}

export default ArtefactSelectionTile