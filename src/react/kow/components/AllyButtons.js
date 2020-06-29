import style from '../../../assets/stylesheets/kow.module.css'
import React, { Component } from 'react'
import AlliedUnitEntryButton from './AlliedUnitEntryButton'

class AllyButtons extends Component {
	constructor(props) {
		super(props)
		this.state = {
			alliedUnitChoicesVisible: false,
			selectedAlliedArmy: '',
			unitsInAlliedArmyTop: [],
			unitsInAlliedArmyBottom: []
		}
		this.showAlliedUnitChoices = this.showAlliedUnitChoices.bind(this)
		this.hideAlliedUnitChoices = this.hideAlliedUnitChoices.bind(this)
	}

	showAlliedUnitChoices(army, units, alliedListedUnits) {
		let unitsInAlliedArmy = []
		let unitsInAlliedArmyRegular = []
		let unitsInAlliedArmyWithoutLimited = []
		let unitsInAlliedArmyTop = []
		let unitsInAlliedArmyBottom = []
		let i

		for (i = 0; i < units.length; i++) {	
			if (parseInt(units[i].kow_army_id) === parseInt(army.id)) {
				unitsInAlliedArmy.push(units[i])
			}
		}
		for (i = 0; i < unitsInAlliedArmy.length; i++) {
			if (unitsInAlliedArmy[i].is_irregular === false || unitsInAlliedArmy[i].is_irregular === 'f') {
				unitsInAlliedArmyRegular.push(unitsInAlliedArmy[i])
			}		
		}
		for (i = 0; i < unitsInAlliedArmyRegular.length; i++) {
			if (parseInt(unitsInAlliedArmyRegular[i].limited_n) === 0) {
				unitsInAlliedArmyWithoutLimited.push(unitsInAlliedArmyRegular[i])
			}			
		}
		for (i = 0; i < unitsInAlliedArmyWithoutLimited.length; i++) {
			if (parseInt(unitsInAlliedArmyWithoutLimited[i].unlocking_class) > 0) {
				unitsInAlliedArmyTop.push(unitsInAlliedArmyWithoutLimited[i])
			} else {
				unitsInAlliedArmyBottom.push(unitsInAlliedArmyWithoutLimited[i])
			}		
		}

		this.setState({
			alliedUnitChoicesVisible: true,
			selectedAlliedArmy: army,
			unitsInAlliedArmyTop: unitsInAlliedArmyTop,
			unitsInAlliedArmyBottom: unitsInAlliedArmyBottom
		})
	}

	hideAlliedUnitChoices() {
		this.setState({
			alliedUnitChoicesVisible: false,
			selectedAlliedArmy: '',
			unitsInAlliedArmyTop: '',
			unitsInAlliedArmyBottom: ''
		})
	}

	render() {
		let masterListArmies = []
		let allyChoices = []
		let jarvisCount = 0
		let i3
		let i4

		for (i3 = 0; i3 < this.props.armies.length; i3++) {
			if (
				this.props.armies[i3].name !== 'Order of the Brothermark' &&
				this.props.armies[i3].name !== 'Order of the Green Lady' &&
				this.props.armies[i3].name !== 'Free Dwarfs' &&
				this.props.armies[i3].name !== 'Sylvan Kin' &&
				this.props.armies[i3].name !== 'The Herd' &&
				this.props.armies[i3].name !== 'League of Rhordia' &&
				this.props.armies[i3].name !== 'Ratkin Slaves' &&
				this.props.armies[i3].name !== 'Twilight Kin' &&
				this.props.armies[i3].name !== 'Varangur'
			) {
				masterListArmies.push(this.props.armies[i3])
			}
		}
		for (i3 = 0; i3 < this.props.listedUnits.length; i3++) {
			if (this.props.listedUnits[i3].unit.name === 'Jarvis [1]') {
				jarvisCount += 1
			}
		}

		if (this.props.selectedArmy.alignment === 'Good' || jarvisCount > 0) {
			for (i3 = 0; i3 < masterListArmies.length; i3++) {
				if (
					masterListArmies[i3].name !== this.props.selectedArmy.name && (
						masterListArmies[i3].alignment === 'Good' ||
						masterListArmies[i3].alignment === 'Neutral'					
					)
				) {
					allyChoices.push(masterListArmies[i3])
				}
			}
		}
		if (this.props.selectedArmy.alignment === 'Evil' && jarvisCount === 0) {
			for (i3 = 0; i3 < masterListArmies.length; i3++) {
				if (
					masterListArmies[i3].name !== this.props.selectedArmy.name && (
						masterListArmies[i3].alignment === 'Evil' ||
						masterListArmies[i3].alignment === 'Neutral'	
					)
				) {
					allyChoices.push(masterListArmies[i3])
				}
				if (this.props.selectedArmy.name === 'Varangur') {
					for (i4 = allyChoices.length - 1; i4 >= 0; i4--) {
						if (
							allyChoices[i4].name === 'Abyssal Dwarfs' ||
							allyChoices[i4].name === 'Forces of the Abyss' ||
							allyChoices[i4].name === 'Twilight Kin'
						) {
							allyChoices.splice(allyChoices.indexOf(allyChoices[i4]), 1)
						}
					}
				}
			}
		}
		if (this.props.selectedArmy.alignment === 'Neutral') {
			for (i3 = 0; i3 < masterListArmies.length; i3++) {
				if (masterListArmies[i3].name !== this.props.selectedArmy.name) {
					allyChoices.push(masterListArmies[i3])
				}
				if (this.props.selectedArmy.name === 'Order of the Green Lady') {
					for (i4 = allyChoices.length - 1; i4 >= 0; i4--) {
						if (
							allyChoices[i4].name === 'Abyssal Dwarfs' ||
							allyChoices[i4].name === 'Forces of the Abyss'
						) {
							allyChoices.splice(allyChoices.indexOf(allyChoices[i4]), 1)
						}
					}
				}
			}
		}

		if (this.props.selectedArmy.name === 'Order of the Brothermark') {
			for (i3 = 0; i3 < allyChoices.length; i3++) {
				if (allyChoices[i3].name === 'Basileans') {
					allyChoices.splice(allyChoices.indexOf(allyChoices[i3]), 1)
				}
			}
		}
		if (this.props.selectedArmy.name === 'Order of the Green Lady') {
			for (i3 = 0; i3 < allyChoices.length; i3++) {
				if (allyChoices[i3].name === 'Forces of Nature') {
					allyChoices.splice(allyChoices.indexOf(allyChoices[i3]), 1)
				}
			}
		}
		if (this.props.selectedArmy.name === 'Free Dwarfs') {
			for (i3 = 0; i3 < allyChoices.length; i3++) {
				if (allyChoices[i3].name === 'Dwarfs') {
					allyChoices.splice(allyChoices.indexOf(allyChoices[i3]), 1)
				}
			}
		}
		if (this.props.selectedArmy.name === 'Sylvan Kin') {
			for (i3 = 0; i3 < allyChoices.length; i3++) {
				if (allyChoices[i3].name === 'Elves') {
					allyChoices.splice(allyChoices.indexOf(allyChoices[i3]), 1)
				}
			}
		}
		if (this.props.selectedArmy.name === 'The Herd') {
			for (i3 = 0; i3 < allyChoices.length; i3++) {
				if (allyChoices[i3].name === 'Forces of Nature') {
					allyChoices.splice(allyChoices.indexOf(allyChoices[i3]), 1)
				}
			}
		}
		if (this.props.selectedArmy.name === 'League of Rhordia') {
			for (i3 = 0; i3 < allyChoices.length; i3++) {
				if (allyChoices[i3].name === 'Kingdoms of Men') {
					allyChoices.splice(allyChoices.indexOf(allyChoices[i3]), 1)
				}
			}
		}
		if (this.props.selectedArmy.name === 'Ratkin Slaves') {
			for (i3 = 0; i3 < allyChoices.length; i3++) {
				if (allyChoices[i3].name === 'Abyssal Dwarfs') {
					allyChoices.splice(allyChoices.indexOf(allyChoices[i3]), 1)
				}
			}
		}

		let alliedGreyedOutUnits = this.props.determineIfGreyedOut('Ally', this.props.alliedListedUnits, this.props.alliedArmy)
		let display
		let titleDisplay
		let topDisplay
		let bottomDisplay
		if (this.state.alliedUnitChoicesVisible === false) {
			titleDisplay =
				<div><h4 className={style['allies-title']}>Which allied army?</h4><br /></div>
			topDisplay = allyChoices.map(army => {
				return (						
					<div className={style['allied-army-choices']} key={parseInt(army.id) + 150000}>
						<span
							onClick={() => this.showAlliedUnitChoices(army, this.props.units, this.props.alliedListedUnits)}
							className={style['allied-army-choice']}
						>
						{army.name}
						</span>
					</div>
				)
			})
			display = 
				<div>
					{titleDisplay}
					{topDisplay}				
				</div>
		} else {
			titleDisplay =
				<div>
					<h4 className={style['allies-title']}>
						Add which{' '}{this.state.selectedAlliedArmy.adjective}{' '} unit(s)?
					</h4><br />
					<div className={style['change-allied-army-button-div']}>
						<span
							onClick={this.hideAlliedUnitChoices}
							className={style['change-allied-army-button']}
						>
							Change Ally
						</span>
					</div><br /><br />
				</div>
			topDisplay = this.state.unitsInAlliedArmyTop.map(unit => {	
				return (
					<AlliedUnitEntryButton
						key={parseInt(unit.id)}
						id={parseInt(unit.id)}
						army={this.state.selectedAlliedArmy}
						unit={unit}
						alliedArmy={this.props.alliedArmy}
						alliedListedUnits={this.props.alliedListedUnits}
						alliedGreyedOutUnits={alliedGreyedOutUnits}
						addAlliedUnitToList={this.props.addAlliedUnitToList}
					/>
				)
			})
			bottomDisplay = this.state.unitsInAlliedArmyBottom.map(unit => {
				return (
					<AlliedUnitEntryButton
						key={parseInt(unit.id) + 325000}
						id={parseInt(unit.id)}
						army={this.state.selectedAlliedArmy}
						unit={unit}
						alliedArmy={this.props.alliedArmy}
						alliedListedUnits={this.props.alliedListedUnits}
						alliedGreyedOutUnits={alliedGreyedOutUnits}
						addAlliedUnitToList={this.props.addAlliedUnitToList}
					/>					
				)
			})
			display =
				<div>
					{titleDisplay}
					{topDisplay}<br />
					{bottomDisplay}
				</div>
		}

		return (
			<div className={style['allies-buttons']}>
				{display}
			</div>
		)
	}
}

export default AllyButtons