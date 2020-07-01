import style from '../../../assets/stylesheets/kow.module.css'
import paypal from '../../../assets/images/paypal.gif'
import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Select from 'react-select'
import Modal from 'react-modal'
import FormattedList from '../components/FormattedList'
import UnitEntryButton from '../components/UnitEntryButton'
import AllyButtons from '../components/AllyButtons'
import UnitEntryNameTile from '../components/UnitEntryNameTile'
import UnitOptionIcon from '../components/UnitOptionIcon'
import ArtefactIcon from '../components/ArtefactIcon'
import UnitOptionSelectionTile from '../components/UnitOptionSelectionTile'
import ArtefactSelectionTile from '../components/ArtefactSelectionTile'

class KowInnerContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedArmy: '',
			listedUnits: [],
			selectedUnitOptions: [],
			selectedArtefacts: [],
			pointTotal: 0,
			unitStrengthTotal: 0,
			indexCount: 0,
			formattedListVisible: false,
			unitOptionsVisible: false,
			artefactsVisible: false,
			alliesVisible: false,
			unitBeingGivenOption: '',
			unitBeingGivenArtefact: '',
			unitTypeCountObject: '',
			unlockObject: '',
			maximumCount: 3,
			alliedArmy: {
				id: 0,
				name: 'fake',
				adjective: 'fake',
				alignment: 'fake'
			},
			alliedListedUnits: [],
			alliedSelectedUnitOptions: [],
			alliedUnitBeingGivenOption: '',
			alliedPointTotal: 0,
			alliedUnitStrengthTotal: 0,
			alliedUnitTypeCountObject: '',
			alliedUnlockObject: '',
			alliedGreyedOutUnits: []
		}
		this.updateSelectedArmy = this.updateSelectedArmy.bind(this)
		this.calculatePointTotal = this.calculatePointTotal.bind(this)
		this.calculateUnitStrengthTotal = this.calculateUnitStrengthTotal.bind(this)
		this.calculateUnitTypeCounts = this.calculateUnitTypeCounts.bind(this)
		this.calculateMaximumCount = this.calculateMaximumCount.bind(this)
		this.addUnlocks = this.addUnlocks.bind(this)
		this.subtractUnlocks = this.subtractUnlocks.bind(this)
		this.determineIfGreyedOut = this.determineIfGreyedOut.bind(this)
		this.addUnitToList = this.addUnitToList.bind(this)
		this.addAlliedUnitToList = this.addAlliedUnitToList.bind(this)
		this.removeUnitFromList = this.removeUnitFromList.bind(this)
		this.removeAlliedUnitFromList = this.removeAlliedUnitFromList.bind(this)
		this.selectUnitOptions = this.selectUnitOptions.bind(this)
		this.selectAlliedUnitOptions = this.selectAlliedUnitOptions.bind(this)
		this.selectArtefact = this.selectArtefact.bind(this)
		this.removeUnitOption = this.removeUnitOption.bind(this)
		this.removeAlliedUnitOption = this.removeAlliedUnitOption.bind(this)
		this.removeArtefact = this.removeArtefact.bind(this)
		this.toggleFormattedList = this.toggleFormattedList.bind(this)
		this.toggleUnitOptions = this.toggleUnitOptions.bind(this)
		this.toggleArtefacts = this.toggleArtefacts.bind(this)
		this.toggleAllies = this.toggleAllies.bind(this)
		this.updateUnitBeingGivenOption = this.updateUnitBeingGivenOption.bind(this)
		this.updateAlliedUnitBeingGivenOption = this.updateAlliedUnitBeingGivenOption.bind(this)
		this.updateUnitBeingGivenArtefact = this.updateUnitBeingGivenArtefact.bind(this)
		this.clearList = this.clearList.bind(this)
	}

	updateSelectedArmy(army) {
		this.setState({ selectedArmy: army.value })
		this.clearList()
	}

	calculatePointTotal(allyString, listedUnitArray, unitOptionArray, artefactArray) {
		let is_ally = false
		if (allyString === 'Ally') {
			is_ally = true
		}
		let pointTotal = 0
		let i
		if (listedUnitArray.length > 0 && listedUnitArray !== undefined) {
			for (i = 0; i < listedUnitArray.length; i++) {
				pointTotal += parseInt(listedUnitArray[i].unit.points)
			}
		}
		if (unitOptionArray === undefined) {
			if (is_ally === false) {
				unitOptionArray = this.state.selectedUnitOptions
			}
			if (is_ally === true) {
				unitOptionArray = this.state.alliedSelectedUnitOptions
			}		
		}
		for (i = 0; i < unitOptionArray.length; i++) {
			pointTotal += parseInt(unitOptionArray[i].unitOption.points)
		}
		if (artefactArray === undefined) {
			artefactArray = this.state.selectedArtefacts
		}
		if (is_ally === false) {
			for (i = 0; i < artefactArray.length; i++) {
				pointTotal += parseInt(artefactArray[i].artefact.points)
			}
		}
		return pointTotal
	}

	calculateUnitStrengthTotal(allyString, listedUnitArray, unitOptionArray) {
		let is_ally = false
		if (allyString === 'Ally') {
			is_ally = true
		}
		let unitStrengthTotal = 0
		let i
		if (listedUnitArray.length > 0 && listedUnitArray !== undefined) {
			for (i = 0; i < listedUnitArray.length; i++) {
				unitStrengthTotal += parseInt(listedUnitArray[i].unit.unit_strength)
			}
		}
		if (unitOptionArray === undefined) {
			if (is_ally === false) {
				unitOptionArray = this.state.selectedUnitOptions
			}
			if (is_ally === true) {
				unitOptionArray = this.state.alliedSelectedUnitOptions
			}
		}
		for (i = 0; i < unitOptionArray.length; i++) {
			if (
				unitOptionArray[i].unitOption.name === 'Pegasus (Wizard (Kingdoms of Men))' ||
				unitOptionArray[i].unitOption.name === 'Pegasus (Wizard (League of Rhordia))' ||
				unitOptionArray[i].unitOption.name === 'Winged Unicorn (Exemplar Redeemer)' ||
				unitOptionArray[i].unitOption.name === 'Wings (Unicorn (Forces of Nature))' ||
				unitOptionArray[i].unitOption.name === 'Wings (Unicorn (Order of the Green Lady))'
			) {
				unitStrengthTotal += 1
			}
		}
		return unitStrengthTotal
	}

	calculateUnitTypeCounts(listedUnitArray) {
		let unitTypeCountObject = {
			troopCount: 0,
			heroCount: 0,
			warEngineCount: 0,
			monsterCount: 0,
			titanCount: 0,
			monsterAndTitanCount: 0,
			hordeCount: 0,
			largeInfantryCount: 0,
			regimentCount: 0
		}
		let i
		if (listedUnitArray !== undefined) {
			for (i = 0; i < listedUnitArray.length; i++) {
				if (
					listedUnitArray[i].unit.unit_size === 'Troop' ||
					listedUnitArray[i].unit.is_irregular === true ||
					listedUnitArray[i].unit.is_irregular === 't'
				) {
					unitTypeCountObject.troopCount += 1
				}
				if (listedUnitArray[i].unit.unit_type.includes('Hero')) {
					unitTypeCountObject.heroCount += 1
				}
				if (listedUnitArray[i].unit.unit_type === 'War Engine') {
					unitTypeCountObject.warEngineCount += 1
				}	
				if (listedUnitArray[i].unit.unit_type === 'Monster') {
					unitTypeCountObject.monsterCount += 1
					unitTypeCountObject.monsterAndTitanCount += 1
				}
				if (listedUnitArray[i].unit.unit_type === 'Titan') {
					unitTypeCountObject.titanCount += 1
					unitTypeCountObject.monsterAndTitanCount += 1
				}
				if (
					listedUnitArray[i].unit.is_irregular === false ||
					listedUnitArray[i].unit.is_irregular === 'f'
				) {
					if (parseInt(listedUnitArray[i].unit.unlocking_class) === 3) {
						unitTypeCountObject.hordeCount += 1
					}
					if (parseInt(listedUnitArray[i].unit.unlocking_class) === 2) {
						unitTypeCountObject.largeInfantryCount += 1
					}
					if (parseInt(listedUnitArray[i].unit.unlocking_class) === 1) {
						unitTypeCountObject.regimentCount += 1
					}
				}
			}
		}
		return unitTypeCountObject
	}

	calculateMaximumCount(pointTotal) {
		let maximumCount
		if (pointTotal < 3000) {
			maximumCount = 3
		} else {
			let calculation = ((pointTotal + 1000) / 1000).toFixed(20)
			maximumCount = Math.floor(calculation)
		}
		return maximumCount
	}

	addUnlocks(listedUnitArray) {
		let unlockObject = {
			troopUnlocks: 0,
			heroUnlocks: 0,
			warEngineUnlocks: 0,
			monsterUnlocks: 0,
			unlocksFromLargeInfantry: 0,
			unlocksFromRegiments: 0
		}
		let i

		for (i = 0; i < listedUnitArray.length; i++) {
			if (
				listedUnitArray[i].unit.is_irregular === false ||
				listedUnitArray[i].unit.is_irregular === 'f'
			) {
				if (parseInt(listedUnitArray[i].unit.unlocking_class) === 3) {
					unlockObject.troopUnlocks += 4
					unlockObject.heroUnlocks += 1
					unlockObject.warEngineUnlocks += 1
					unlockObject.monsterUnlocks += 1

				}
				if (parseInt(listedUnitArray[i].unit.unlocking_class) === 2) {
					if (listedUnitArray[i].unit.unit_size === 'Horde') {
						unlockObject.troopUnlocks += 2
					}
					if (listedUnitArray[i].unit.unit_size === 'Legion') {
						unlockObject.troopUnlocks += 4
					}
					unlockObject.unlocksFromLargeInfantry += 2
				}
				if (parseInt(listedUnitArray[i].unit.unlocking_class) === 1) {
					unlockObject.troopUnlocks += 2
					unlockObject.unlocksFromRegiments += 1
				}
			}
		}
		return unlockObject
	}

	subtractUnlocks(listedUnitArray) {
		let unitTypeCountObject = this.calculateUnitTypeCounts(listedUnitArray)
		let unlockObject = this.addUnlocks(listedUnitArray)

		let largeInfantryToHero = unlockObject.unlocksFromLargeInfantry / 2
		let largeInfantryToWarEngine = unlockObject.unlocksFromLargeInfantry / 2
		let largeInfantryToMonster = unlockObject.unlocksFromLargeInfantry / 2
		let largeInfantryToTitan = unlockObject.unlocksFromLargeInfantry / 2

		let regimentToHero = unitTypeCountObject.regimentCount
		let regimentToWarEngine = unitTypeCountObject.regimentCount
		let regimentToMonster = unitTypeCountObject.regimentCount
		let regimentToTitan = unitTypeCountObject.regimentCount
		
		let hordeToHero = unitTypeCountObject.hordeCount
		let hordeToWarEngine = unitTypeCountObject.hordeCount
		let hordeToMonster = unitTypeCountObject.hordeCount
		let hordeToTitan = unitTypeCountObject.hordeCount

		let i
		for (i = 0; i < unitTypeCountObject.heroCount; i++) {
			if (hordeToHero > 0) {
				hordeToHero--
			}
			else if (largeInfantryToHero > 0 && unlockObject.unlocksFromLargeInfantry > 0) {
				largeInfantryToHero--
				unlockObject.unlocksFromLargeInfantry--
			}
			else {
				regimentToHero--
				regimentToWarEngine--
				regimentToMonster--
				regimentToTitan--
			}
		}

		for (i = 0; i < unitTypeCountObject.warEngineCount; i++) {
			if (hordeToWarEngine > 0) {
				hordeToWarEngine--
			}
			else if (largeInfantryToWarEngine > 0 && unlockObject.unlocksFromLargeInfantry > 0) {
				largeInfantryToWarEngine--
				unlockObject.unlocksFromLargeInfantry--
			}
			else {
				regimentToHero--
				regimentToWarEngine--
				regimentToMonster--
				regimentToTitan--
			}
		}

		for (i = 0; i < unitTypeCountObject.monsterCount; i++) {
			if (hordeToMonster > 0) {
				hordeToMonster--
				hordeToTitan--
			}
			else if (largeInfantryToMonster > 0 && unlockObject.unlocksFromLargeInfantry > 0) {
				largeInfantryToMonster--
				unlockObject.unlocksFromLargeInfantry--
			}
			else {
				regimentToHero--
				regimentToWarEngine--
				regimentToMonster--
				regimentToTitan--
			}
		}

		for (i = 0; i < unitTypeCountObject.titanCount; i++) {
			if (hordeToTitan > 0) {
				hordeToMonster--
				hordeToTitan--
			}
			else if (largeInfantryToTitan > 0 && unlockObject.unlocksFromLargeInfantry > 0) {
				largeInfantryToTitan--
				unlockObject.unlocksFromLargeInfantry--
			}
			else {
				regimentToHero--
				regimentToWarEngine--
				regimentToMonster--
				regimentToTitan--
			}
		}
		
		let heroTotals = [regimentToHero, hordeToHero]
		let warEngineTotals = [regimentToWarEngine, hordeToWarEngine]
		let monsterTotals = [regimentToMonster, hordeToMonster]
		let titanTotals = [regimentToTitan, hordeToTitan]

		if (unlockObject.unlocksFromLargeInfantry > 0) {
			heroTotals.push(largeInfantryToHero)
			warEngineTotals.push(largeInfantryToWarEngine)
			monsterTotals.push(largeInfantryToMonster)
			titanTotals.push(largeInfantryToTitan)
		}

		unlockObject.troopUnlocks = (unlockObject.troopUnlocks - unitTypeCountObject.troopCount)
		unlockObject.heroUnlocks = Math.max.apply(null, heroTotals)
		unlockObject.warEngineUnlocks = Math.max.apply(null, warEngineTotals)
		unlockObject.monsterUnlocks = Math.max.apply(null, monsterTotals)
		unlockObject.unlocksFromRegiments = regimentToHero

		return unlockObject
	}

	determineIfGreyedOut(allyString, listedUnitArray, alliedArmy) {
		let units = this.props.units
		let greyedOutUnits = []
		let locked
		let pointTotal
		let alliedPointTotal
		let is_ally
		if (allyString === 'Ally') {
			is_ally = true
			pointTotal = parseInt(this.state.pointTotal)
			alliedPointTotal = this.calculatePointTotal('Ally', listedUnitArray)
		} else {
			is_ally = false
			pointTotal = this.calculatePointTotal('Main army', listedUnitArray)
			alliedPointTotal = parseInt(this.state.alliedPointTotal)
		}
		let unitTypeCountObject = this.calculateUnitTypeCounts(listedUnitArray)
		let unlockObject = this.addUnlocks(listedUnitArray)
		let i
		let i2

		let determineIfCanAdd = (unitTypeCountObject, unlockObject) => {
			let canOrCannotAdd = {
				troop: false,
				hero: false,
				warEngine: false,
				monster: false,
				titan: false
			};
			
			// Just to make typing faster...
			let utc = unitTypeCountObject;
			let uo = unlockObject;

			let liHordes = uo.unlocksFromLargeInfantry / 2;
			let liu = uo.unlocksFromLargeInfantry;
			let lih = liHordes;
			let liw = liHordes;
			let lim = liHordes;
			let lit = liHordes;

			let regh = utc.regimentCount;
			let regw = utc.regimentCount;
			let regm = utc.regimentCount;
			let regt = utc.regimentCount;
			
			// horde count does NOT include large/monstrous inf/cav
			let rHordes = utc.hordeCount;
			let hh = rHordes;
			let hw = rHordes;
			let hm = rHordes;
			let ht = rHordes;

			for(let i = 0; i < utc.heroCount; i++) {
				if(lih > 0 && liu > 0) {
					lih--;
					liu--;
				}
				else if(regh > 0) {
					regh--;
					regw--;
					regm--;
					regt--;
				}
				else {
					hh--;
				}
			}

			for(let i = 0; i < utc.warEngineCount; i++) {
				if(liw > 0 && liu > 0) {
					liw--;
					liu--;
				}
				else if(regw > 0) {
					regh--;
					regw--;
					regm--;
					regt--;
				}
				else {
					hw--;
				}
			}

			for(let i = 0; i < utc.monsterCount; i++) {
				if(lim > 0 && liu > 0) {
					lim--;
					liu--;
				}
				else if(regm > 0) {
					regh--;
					regw--;
					regm--;
					regt--;
				}
				else {
					hm--;
					ht--;
				}
			}

			for(let i = 0; i < utc.titanCount; i++) {
				if(lit > 0 && liu > 0) {
					lit--;
					liu--;
				}
				else if(regt > 0) {
					regh--;
					regw--;
					regm--;
					regt--;
				}
				else {
					hm--;
					ht--;
				}
			}
			
			canOrCannotAdd.hero = ((lih > 0 && liu > 0) || regh > 0 || hh > 0);
			canOrCannotAdd.warEngine = ((liw > 0 && liu > 0) || regw > 0 || hw > 0);
			canOrCannotAdd.titan = ((lit > 0 && liu > 0) || regt > 0 || ht > 0);
			canOrCannotAdd.monster = ((lim > 0 && liu > 0) || regm > 0 || hm > 0);
			canOrCannotAdd.troop = (utc.troopCount < uo.troopUnlocks);
			
			return canOrCannotAdd;
		}

		for (i = 0; i < units.length; i++) {
			let limitedHeroCount = 0
			let limitedAndLockedFromJarvisCount = 0
			let limitedDuplicateCount = 0
			let maybeMaxedOut = []
			let limitedUnits = []
			locked = false
			for (i2 = 0; i2 < listedUnitArray.length; i2++) {
				if (parseInt(listedUnitArray[i2].unit.limited_n) > 0 && listedUnitArray[i2].unit.unit_type.includes('Hero')) {
					limitedHeroCount += 1
				}
				if (
					parseInt(units[i].limited_n) > 0 &&
					units[i].unit_type.includes('Hero') &&
					listedUnitArray[i2].unit.name === 'Jarvis [1]'
				) {
					limitedAndLockedFromJarvisCount += 1
				}
				if (parseInt(units[i].limited_n) > 0 && parseInt(listedUnitArray[i2].unit.id) === parseInt(units[i].id)) {
					limitedDuplicateCount += 1
				}
				if (
					(units[i].unit_type.includes('Hero') && parseInt(listedUnitArray[i2].unit.id) === parseInt(units[i].id)) ||
					(units[i].unit_type === 'War Engine' && parseInt(listedUnitArray[i2].unit.id) === parseInt(units[i].id)) ||
					(units[i].unit_type === 'Monster' && parseInt(listedUnitArray[i2].unit.id) === parseInt(units[i].id)) ||
					(units[i].unit_type === 'Titan' && parseInt(listedUnitArray[i2].unit.id) === parseInt(units[i].id))
				) {
					maybeMaxedOut.push(listedUnitArray[i2])
				}
			}

			if (parseInt(units[i].unlocking_class) === 0) {
				locked = true
				if (
					(
						units[i].unit_size === 'Troop' ||
						units[i].is_irregular === true ||
						units[i].is_irregular === 't'
					) &&
					determineIfCanAdd(unitTypeCountObject, unlockObject).troop === true
				) {
					locked = false
				}
				if (
					units[i].unit_type.includes('Hero') &&
					determineIfCanAdd(unitTypeCountObject, unlockObject).hero === true
				) {
					locked = false
				}
				if (
					units[i].unit_type === 'War Engine' &&
					determineIfCanAdd(unitTypeCountObject, unlockObject).warEngine === true
				) {
					locked = false
				}
				if (
					units[i].unit_type === 'Monster' &&
					determineIfCanAdd(unitTypeCountObject, unlockObject).monster === true
				) {
					locked = false
				}
				if (
					units[i].unit_type === 'Titan' &&
					determineIfCanAdd(unitTypeCountObject, unlockObject).titan === true
				) {
					locked = false
				}
				if (
					(
						units[i].unit_type === 'Large Infantry' ||
						units[i].unit_type === 'Large Cavalry' ||
						units[i].unit_type === 'Monstrous Infantry'
					) && (
						units[i].unit_size === 'Regiment'
					) && (
						units[i].is_irregular === false ||
						units[i].is_irregular === 'f'
					)
				) {
					locked = false
				}
			}

			if (is_ally === false) {
				if (
					parseInt(units[i].limited_n) > 0 &&
					units[i].unit_type.includes('Hero') &&
					limitedAndLockedFromJarvisCount > 0
				) {
					locked = true
				}
				if (maybeMaxedOut.length >= this.state.maximumCount) {
					locked = true
				}
				if (limitedDuplicateCount > 0) {
					locked = true
				}
				if (
					units[i].name === 'Jarvis [1]' && (
						limitedHeroCount > 0 || (
							this.state.alliedListedUnits.length > 0 &&
							alliedArmy.alignment === 'Good'
						)
					)
				) {
					locked = true
				}
			}

			if (is_ally === true) {
				if (parseInt(units[i].limited_n) > 0) {
					limitedUnits.push(units[i])
				}
				if (limitedUnits.length > 0 || maybeMaxedOut.length > 0) {
					locked = true
				}
				if (
					parseInt(units[i].kow_army_id) !== parseInt(alliedArmy.id) &&
					alliedArmy.name !== 'fake'
				) {
					locked = true
				}
				if (
					(pointTotal + alliedPointTotal + parseInt(units[i].points)) / 4 <
					alliedPointTotal + parseInt(units[i].points)
				) {
					locked = true
				}
			}
			
			if (locked === true) {
				greyedOutUnits.push(units[i])
			}
		}
		return greyedOutUnits
	}

	addUnitToList(unitToAdd) {
		let listedUnits = this.state.listedUnits
		let indexCount = this.state.indexCount
		let unitToAddWithIndex = { index: indexCount, unit: unitToAdd }
		listedUnits.push(unitToAddWithIndex)
		indexCount += 1
		let pointTotal = this.calculatePointTotal('Main army', listedUnits)
		this.setState({
			listedUnits: listedUnits,
			indexCount: indexCount,
			pointTotal: pointTotal,
			unitStrengthTotal: this.calculateUnitStrengthTotal('Main army', listedUnits),
			unitTypeCountObject: this.calculateUnitTypeCounts(listedUnits),
			unlockObject: this.subtractUnlocks(listedUnits),
			maximumCount: this.calculateMaximumCount(pointTotal + parseInt(this.state.alliedPointTotal)),
			alliedGreyedOutUnits: this.determineIfGreyedOut('Ally', this.state.alliedListedUnits, this.state.alliedArmy),
			unitOptionsVisible: false,
			artefactsVisible: false,
			alliesVisible: false
		})
	}

	addAlliedUnitToList(unitToAdd, alliedArmy) {
		let alliedListedUnits = this.state.alliedListedUnits
		let updatedAlliedArmy
		let indexCount = this.state.indexCount
		let i
		for (i = 0; i < this.props.armies.length; i++) {
			if (parseInt(this.props.armies[i].id) === parseInt(unitToAdd.kow_army_id)) {
				updatedAlliedArmy = this.props.armies[i]
			}
		}
		let unitToAddWithIndex = { index: indexCount + 200000, unit: unitToAdd }
		alliedListedUnits.push(unitToAddWithIndex)
		indexCount += 1
		let alliedPointTotal = this.calculatePointTotal('Ally', alliedListedUnits)

		this.setState({
			alliedListedUnits: alliedListedUnits,
			alliedArmy: updatedAlliedArmy,
			indexCount: indexCount,
			alliedPointTotal: alliedPointTotal,
			alliedUnitStrengthTotal: this.calculateUnitStrengthTotal('Ally', alliedListedUnits),
			alliedUnitTypeCountObject: this.calculateUnitTypeCounts(alliedListedUnits),
			alliedUnlockObject: this.subtractUnlocks(alliedListedUnits),
			maximumCount: this.calculateMaximumCount(parseInt(this.state.pointTotal) + alliedPointTotal),
			alliedGreyedOutUnits: this.determineIfGreyedOut('Ally', alliedListedUnits, alliedArmy),
			unitOptionsVisible: false,
			artefactsVisible: false
		})
	}

	removeUnitFromList(unitObject) {
		let listedUnits = this.state.listedUnits
		let selectedUnitOptions = this.state.selectedUnitOptions
		let selectedArtefacts = this.state.selectedArtefacts
		let removedUnitOptionObjects = []
		let pointTotal
		let oldPointTotal
		let oldAlliedPointTotal
		let unlockObject
		let i
		let i2
		let i3

		let actuallyDeleteStuff = (unitArray, unitOptionArray, artefactArray) => {
			let i4
			for (i4 = unitArray.length - 1; i4 >= 0; i4--) {
				if (unitArray[i4].index === unitObject.index) {
					unitArray.splice(unitArray.indexOf(unitArray[i4]), 1)
				}
			}
			for (i4 = unitOptionArray.length - 1; i4 >= 0; i4--) {
				if (unitOptionArray[i4].index === unitObject.index) {
					removedUnitOptionObjects.push(unitOptionArray[i4])
					unitOptionArray.splice(unitOptionArray.indexOf(unitOptionArray[i4]), 1)
				}
			}
			for (i4 = artefactArray.length - 1; i4 >= 0; i4--) {
				if (artefactArray[i4].index === unitObject.index) {
					artefactArray.splice(artefactArray.indexOf(artefactArray[i4]), 1)
				}
			}				
		}

		let fakeListedUnits = []
		for (i = 0; i < listedUnits.length; i++) {
			fakeListedUnits.push(listedUnits[i])
		}
		let fakeSelectedUnitOptions = []
		for (i = 0; i < selectedUnitOptions.length; i++) {
			fakeSelectedUnitOptions.push(selectedUnitOptions[i])
		}
		let fakeSelectedArtefacts = []
		for (i = 0; i < selectedArtefacts.length; i++) {
			fakeSelectedArtefacts.push(selectedArtefacts[i])
		}

		actuallyDeleteStuff(fakeListedUnits, fakeSelectedUnitOptions, fakeSelectedArtefacts)
		pointTotal = this.calculatePointTotal('Main army', fakeListedUnits, fakeSelectedUnitOptions, fakeSelectedArtefacts)
		unlockObject = this.subtractUnlocks(fakeListedUnits)

		if ((pointTotal + parseInt(this.state.alliedPointTotal)) / 4 < parseInt(this.state.alliedPointTotal)) {
			listedUnits = this.state.listedUnits
			selectedUnitOptions = this.state.selectedUnitOptions
			selectedArtefacts = this.state.selectedArtefacts				
		} else {
			if (parseInt(unitObject.unit.unlocking_class) > 0) {
				listedUnits = fakeListedUnits
				selectedUnitOptions = fakeSelectedUnitOptions
				selectedArtefacts = fakeSelectedArtefacts
				if (unlockObject.troopUnlocks < 0) {
					listedUnits = this.state.listedUnits
					selectedUnitOptions = this.state.selectedUnitOptions
					selectedArtefacts = this.state.selectedArtefacts
				}
				if (this.state.unlockObject.heroUnlocks <= 0) {
					if (this.state.unlockObject.unlocksFromLargeInfantry <= 0) {
						if (this.state.unlockObject.unlocksFromRegiments <= 0) {
							listedUnits = this.state.listedUnits
							selectedUnitOptions = this.state.selectedUnitOptions
							selectedArtefacts = this.state.selectedArtefacts						
						}
					}
				}
				if (this.state.unlockObject.warEngineUnlocks <= 0) {
					if (this.state.unlockObject.unlocksFromLargeInfantry <= 0) {
						if (this.state.unlockObject.unlocksFromRegiments <= 0) {
							listedUnits = this.state.listedUnits
							selectedUnitOptions = this.state.selectedUnitOptions
							selectedArtefacts = this.state.selectedArtefacts						
						}
					}
				}
				if (this.state.unlockObject.monsterUnlocks <= 0) {
					if (this.state.unlockObject.unlocksFromLargeInfantry <= 0) {
						if (this.state.unlockObject.unlocksFromRegiments <= 0) {
							listedUnits = this.state.listedUnits
							selectedUnitOptions = this.state.selectedUnitOptions
							selectedArtefacts = this.state.selectedArtefacts						
						}
					}
					if (this.state.unlockObject.unlocksFromLargeInfantry <= 0) {
						if (this.state.unlockObject.unlocksFromRegiments <= 0) {
							listedUnits = this.state.listedUnits
							selectedUnitOptions = this.state.selectedUnitOptions
							selectedArtefacts = this.state.selectedArtefacts						
						}
					}
				}		
			} else {
				listedUnits = fakeListedUnits
				selectedUnitOptions = fakeSelectedUnitOptions
				selectedArtefacts = fakeSelectedArtefacts
			}
		}

		if (
			unitObject.unit.name === 'Jarvis [1]' &&
			this.state.alliedListedUnits.length > 0 &&
			this.state.alliedArmy.alignment === 'Good'
		) {
			listedUnits = this.state.listedUnits
			selectedUnitOptions = this.state.selectedUnitOptions
			selectedArtefacts = this.state.selectedArtefacts			
		}

		oldPointTotal = this.calculatePointTotal('Main army', this.state.listedUnits, this.state.selectedUnitOptions, this.state.selectedArtefacts)
		oldAlliedPointTotal = this.calculatePointTotal('Ally', this.state.alliedListedUnits, this.state.alliedSelectedUnitOptions)

		if (listedUnits.length < 1) {
			this.clearList()
		}

		pointTotal = this.calculatePointTotal('Main army', listedUnits, selectedUnitOptions, selectedArtefacts)
		let alliedPointTotal = this.calculatePointTotal('Ally', this.state.alliedListedUnits, this.state.alliedSelectedUnitOptions)
		let maximumCountBefore = this.calculateMaximumCount(oldPointTotal + oldAlliedPointTotal)
		let maximumCountAfter = this.calculateMaximumCount(pointTotal + alliedPointTotal)
		if (maximumCountAfter < maximumCountBefore) {
			let countNonUniqueUnits = (array, value) => {
				let count = 0
				for (i3 = 0; i3 < array.length; i3++) {
					if (array[i3].unit === value.unit) {
						count ++
					}
				}
				return count
			}
			for (i2 = 0; i2 < listedUnits.length; i2++) {
				if (
					countNonUniqueUnits(listedUnits, listedUnits[i2]) > maximumCountAfter && (
						listedUnits[i2].unit.unit_type.includes('Hero') ||
						listedUnits[i2].unit.unit_type === 'War Engine' ||
						listedUnits[i2].unit.unit_type === 'Monster' ||
						listedUnits[i2].unit.unit_type === 'Titan'
					)
				) {
					listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
				}			
			}
		}

		this.setState({
			listedUnits: listedUnits,
			selectedUnitOptions: selectedUnitOptions,
			selectedArtefacts: selectedArtefacts,
			pointTotal: this.calculatePointTotal('Main army', listedUnits, selectedUnitOptions, selectedArtefacts),
			unitStrengthTotal: this.calculateUnitStrengthTotal('Main army', listedUnits, selectedUnitOptions),
			unitTypeCountObject: this.calculateUnitTypeCounts(listedUnits),
			unlockObject: this.subtractUnlocks(listedUnits),
			maximumCount: this.calculateMaximumCount(pointTotal + alliedPointTotal),
			alliedGreyedOutUnits: this.determineIfGreyedOut('Ally', this.state.alliedListedUnits, this.state.alliedArmy)
		})
	}

	removeAlliedUnitFromList(unitObject, alliedArmy) {
		let alliedListedUnits = this.state.alliedListedUnits
		let alliedSelectedUnitOptions = this.state.alliedSelectedUnitOptions
		let alliedRemovedUnitOptionObjects = []
		let alliedPointTotal
		let alliedUnitTypeCountObject
		let alliedUnlockObject
		let i

		let actuallyDeleteStuff = (unitArray, unitOptionArray) => {
			let i4
			for (i4 = unitArray.length - 1; i4 >= 0; i4--) {
				if (unitArray[i4].index === unitObject.index) {
					unitArray.splice(unitArray.indexOf(unitArray[i4]), 1)
				}
			}
			for (i4 = unitOptionArray.length - 1; i4 >= 0; i4--) {
				if (unitOptionArray[i4].index === unitObject.index) {
					alliedRemovedUnitOptionObjects.push(unitOptionArray[i4])
					unitOptionArray.splice(unitOptionArray.indexOf(unitOptionArray[i4]), 1)
				}
			}		
		}

		let fakeListedUnits = []
		for (i = 0; i < alliedListedUnits.length; i++) {
			fakeListedUnits.push(alliedListedUnits[i])
		}
		let fakeSelectedUnitOptions = []
		for (i = 0; i < alliedSelectedUnitOptions.length; i++) {
			fakeSelectedUnitOptions.push(alliedSelectedUnitOptions[i])
		}

		actuallyDeleteStuff(fakeListedUnits, fakeSelectedUnitOptions)
		alliedPointTotal = this.calculatePointTotal('Ally', fakeListedUnits, fakeSelectedUnitOptions)
		alliedUnitTypeCountObject = this.calculateUnitTypeCounts(fakeListedUnits)
		alliedUnlockObject = this.subtractUnlocks(fakeListedUnits)

		if (parseInt(unitObject.unit.unlocking_class) > 0) {
			alliedListedUnits = fakeListedUnits
			alliedSelectedUnitOptions = fakeSelectedUnitOptions
			if (alliedUnlockObject.troopUnlocks < 0) {
				alliedListedUnits = this.state.alliedListedUnits
				alliedSelectedUnitOptions = this.state.alliedSelectedUnitOptions
			}
			if (this.state.alliedUnlockObject.alliedHeroUnlocks <= 0) {
				if (this.state.alliedUnlockObject.unlocksFromLargeInfantry <= 0) {
					if (this.state.alliedUnlockObject.unlocksFromRegiments <= 0) {
						alliedListedUnits = this.state.alliedListedUnits
						alliedSelectedUnitOptions = this.state.alliedSelectedUnitOptions					
					}
				}
			}
			if (this.state.alliedUnlockObject.warEngineUnlocks <= 0) {
				if (this.state.alliedUnlockObject.unlocksFromLargeInfantry <= 0) {
					if (this.state.alliedUnlockObject.unlocksFromRegiments <= 0) {
						alliedListedUnits = this.state.alliedListedUnits
						alliedSelectedUnitOptions = this.state.alliedSelectedUnitOptions						
					}
				}
			}
			if (this.state.alliedUnlockObject.monsterUnlocks <= 0) {
				if (this.state.alliedUnlockObject.unlocksFromLargeInfantry <= 0) {
					if (this.state.alliedUnlockObject.unlocksFromRegiments <= 0) {
						alliedListedUnits = this.state.alliedListedUnits
						alliedSelectedUnitOptions = this.state.alliedSelectedUnitOptions					
					}
				}
				if (this.state.alliedUnlockObject.unlocksFromLargeInfantry <= 0) {
					if (this.state.alliedUnlockObject.unlocksFromRegiments <= 0) {
						alliedListedUnits = this.state.alliedListedUnits
						alliedSelectedUnitOptions = this.state.alliedSelectedUnitOptions						
					}
				}
			}		
		} else {
			alliedListedUnits = fakeListedUnits
			alliedSelectedUnitOptions = fakeSelectedUnitOptions
		}

		if (
			(parseInt(this.state.pointTotal) + alliedPointTotal) / 4 < alliedPointTotal
		) {

			alliedListedUnits = this.state.alliedListedUnits
			alliedSelectedUnitOptions = this.state.alliedSelectedUnitOptions				
		}
		alliedUnitTypeCountObject = this.calculateUnitTypeCounts(alliedListedUnits)
		alliedUnlockObject = this.subtractUnlocks(alliedListedUnits)

		let updatedAlliedArmy
		if (alliedListedUnits.length > 0) {
			updatedAlliedArmy = alliedArmy
		} else {
			updatedAlliedArmy = { id: 0, name: 'fake', adjective: 'fake', alignment: 'fake' }
		}

		this.setState({
			alliedArmy: updatedAlliedArmy,
			alliedListedUnits: alliedListedUnits,
			alliedSelectedUnitOptions: alliedSelectedUnitOptions,
			alliedPointTotal: this.calculatePointTotal('Ally', alliedListedUnits, alliedSelectedUnitOptions),
			alliedUnitStrengthTotal: this.calculateUnitStrengthTotal('Ally', alliedListedUnits, alliedSelectedUnitOptions),
			alliedUnitTypeCountObject: alliedUnitTypeCountObject,
			alliedUnlockObject: alliedUnlockObject,	
			alliedGreyedOutUnits: this.determineIfGreyedOut('Ally', alliedListedUnits, alliedArmy)
		})
	}

	selectUnitOptions(unitObject, highlightedUnitOptions) {
		let selectedUnitOptions = []
		let selectedArtefacts = this.state.selectedArtefacts
		let i
		for (i = 0; i < highlightedUnitOptions.length; i++) {
			highlightedUnitOptions[i] = {
				index: unitObject.index,
				unitOption: highlightedUnitOptions[i]
			}
		}
		for (i = 0; i < this.state.selectedUnitOptions.length; i++) {
			if (this.state.selectedUnitOptions[i].index !== unitObject.index) {
				selectedUnitOptions.push(this.state.selectedUnitOptions[i])
			}
		}		
		for (i = 0; i < highlightedUnitOptions.length; i++) {
			let i2
			if (
				highlightedUnitOptions[i].unitOption.display_name === 'Horn of Heroes' ||
				highlightedUnitOptions[i].unitOption.display_name === 'Guiding Flame' ||
				highlightedUnitOptions[i].unitOption.display_name === 'Horn of Ocean\'s Fury' ||
				highlightedUnitOptions[i].unitOption.display_name === 'Infernal Advance' ||
				highlightedUnitOptions[i].unitOption.display_name === 'Eternal Guard' ||
				highlightedUnitOptions[i].unitOption.display_name === 'Raid Leader' ||
				highlightedUnitOptions[i].unitOption.display_name === 'Path of Fire'
			) {
				for (i2 = 0; i2 < selectedArtefacts.length; i2++) {
					if (selectedArtefacts[i].index === unitObject.index) {
						selectedArtefacts.splice(selectedArtefacts.indexOf(selectedArtefacts[i]), 1)
					}
				}
			}
		}
		for (i = 0; i < selectedUnitOptions.length; i++) {
			let i3
			for (i3 = 0; i3 < highlightedUnitOptions.length; i3++) {
				if (
					(
						highlightedUnitOptions[i3].unitOption.is_unique === true ||
						highlightedUnitOptions[i3].unitOption.is_unique === 't'
					) &&
					highlightedUnitOptions[i3].unitOption.display_name === selectedUnitOptions[i].unitOption.display_name
				) {
					selectedUnitOptions.splice(selectedUnitOptions.indexOf(selectedUnitOptions[i]), 1)
				}
			}
		}
		selectedUnitOptions = selectedUnitOptions.concat(highlightedUnitOptions)

		this.setState({
			selectedUnitOptions: selectedUnitOptions,
			selectedArtefacts: selectedArtefacts,
			pointTotal: this.calculatePointTotal('Main army', this.state.listedUnits, selectedUnitOptions, selectedArtefacts),
			unitStrengthTotal: this.calculateUnitStrengthTotal('Main army', this.state.listedUnits, selectedUnitOptions),
			unitBeingGivenOption: '',
			alliedGreyedOutUnits: this.determineIfGreyedOut('Ally', this.state.alliedListedUnits, this.state.alliedArmy)
		})
		this.toggleUnitOptions()
	}

	selectAlliedUnitOptions(unitObject, highlightedUnitOptions) {
		let alliedSelectedUnitOptions = []
		let i
		for (i = 0; i < highlightedUnitOptions.length; i++) {
			highlightedUnitOptions[i] = {
				index: unitObject.index,
				unitOption: highlightedUnitOptions[i]
			}
		}
		for (i = 0; i < this.state.alliedSelectedUnitOptions.length; i++) {
			if (this.state.alliedSelectedUnitOptions[i].index !== unitObject.index) {
				alliedSelectedUnitOptions.push(this.state.alliedSelectedUnitOptions[i])
			}
		}		
		for (i = 0; i < alliedSelectedUnitOptions.length; i++) {
			let i3
			for (i3 = 0; i3 < highlightedUnitOptions.length; i3++) {
				if (
					(
						highlightedUnitOptions[i3].unitOption.is_unique === true ||
						highlightedUnitOptions[i3].unitOption.is_unique === 't'
					) &&
					highlightedUnitOptions[i3].unitOption.display_name === alliedSelectedUnitOptions[i].unitOption.display_name
				) {
					alliedSelectedUnitOptions.splice(alliedSelectedUnitOptions.indexOf(alliedSelectedUnitOptions[i]), 1)
				}
			}
		}
		alliedSelectedUnitOptions = alliedSelectedUnitOptions.concat(highlightedUnitOptions)

		this.setState({
			alliedSelectedUnitOptions: alliedSelectedUnitOptions,
			alliedPointTotal: this.calculatePointTotal('Ally', this.state.alliedListedUnits, alliedSelectedUnitOptions),
			alliedUnitStrengthTotal: this.calculateUnitStrengthTotal('Ally', this.state.alliedListedUnits, alliedSelectedUnitOptions),
			alliedUnitBeingGivenOption: '',
			alliedGreyedOutUnits: this.determineIfGreyedOut('Ally', this.state.alliedListedUnits, this.state.alliedArmy)
		})
		this.toggleUnitOptions()
	}

	selectArtefact(unitObject, artefact) {
		let selectedArtefacts = this.state.selectedArtefacts
		let selectedUnitOptions = this.state.selectedUnitOptions
		let newArtefactSelection = { index: unitObject.index, artefact: artefact }
		let artefactToRemoveIfSame
		let artefactToRemoveIfDifferent
		let artefactsToKeep = []
		let i
		for (i = 0; i < selectedArtefacts.length; i++) {
			if (
				parseInt(selectedArtefacts[i].artefact.id) === parseInt(newArtefactSelection.artefact.id) ||
				selectedArtefacts[i].artefact.display_name === newArtefactSelection.artefact.display_name
			) {
				artefactToRemoveIfSame = selectedArtefacts[i]
			}
			if (selectedArtefacts[i].index === newArtefactSelection.index) {
				artefactToRemoveIfDifferent = selectedArtefacts[i]
			}			
		}
		if (
			artefactToRemoveIfSame !== undefined &&
			artefactToRemoveIfDifferent !== undefined &&
			parseInt(artefactToRemoveIfSame.artefact.id) === parseInt(artefactToRemoveIfDifferent.artefact.id)
		) {
			selectedArtefacts = this.state.selectedArtefacts
		} else {
			if (artefactToRemoveIfSame === undefined &&	artefactToRemoveIfDifferent === undefined				
			) {
				selectedArtefacts = this.state.selectedArtefacts
			}
			if (artefactToRemoveIfSame !== undefined && artefactToRemoveIfDifferent === undefined) {
				for (i = 0; i < selectedArtefacts.length; i++) {
					if (
						parseInt(selectedArtefacts[i].artefact.id) !== parseInt(newArtefactSelection.artefact.id) &&
						selectedArtefacts[i].artefact.display_name !== newArtefactSelection.artefact.display_name
					) {
						artefactsToKeep.push(selectedArtefacts[i])
					}
				}
				selectedArtefacts = artefactsToKeep
			}
			if (artefactToRemoveIfSame === undefined &&	artefactToRemoveIfDifferent !== undefined			
			) {
				for (i = 0; i < selectedArtefacts.length; i++) {
					if (selectedArtefacts[i].index !== newArtefactSelection.index) {
						artefactsToKeep.push(selectedArtefacts[i])
					}
				}
				selectedArtefacts = artefactsToKeep
			}
			if (artefactToRemoveIfSame !== undefined &&	artefactToRemoveIfDifferent !== undefined	
			) {
				for (i = 0; i < selectedArtefacts.length; i++) {
					if (
						selectedArtefacts[i].index !== newArtefactSelection.index &&
						parseInt(selectedArtefacts[i].artefact.id) !== parseInt(newArtefactSelection.artefact.id)
					) {
						artefactsToKeep.push(selectedArtefacts[i])
					}
				}				
				selectedArtefacts = artefactsToKeep
			}
			selectedArtefacts.push(newArtefactSelection)
		}
		for (i = 0; i < selectedUnitOptions.length; i++) {
			if (
				selectedUnitOptions[i].index === newArtefactSelection.index && (
					selectedUnitOptions[i].unitOption.display_name === 'Horn of Heroes' ||
					selectedUnitOptions[i].unitOption.display_name === 'Guiding Flame' ||
					selectedUnitOptions[i].unitOption.display_name === 'Horn of Ocean\'s Fury' ||
					selectedUnitOptions[i].unitOption.display_name === 'Infernal Advance' ||
					selectedUnitOptions[i].unitOption.display_name === 'Eternal Guard' ||
					selectedUnitOptions[i].unitOption.display_name === 'Raid Leader' ||
					selectedUnitOptions[i].unitOption.display_name === 'Path of Fire'
				)
			) {
				selectedUnitOptions.splice(selectedUnitOptions.indexOf(selectedUnitOptions[i]), 1)
			}
		}

		this.setState({
			selectedUnitOptions: selectedUnitOptions,
			selectedArtefacts: selectedArtefacts,
			pointTotal: this.calculatePointTotal('Main army', this.state.listedUnits, selectedUnitOptions, selectedArtefacts),
			unitStrengthTotal: this.calculateUnitStrengthTotal('Main army', this.state.listedUnits, selectedUnitOptions),
			unitBeingGivenArtefact: '',
			alliedGreyedOutUnits: this.determineIfGreyedOut('Ally', this.state.alliedListedUnits, this.state.alliedArmy)
		})
		this.toggleArtefacts()
	}

	removeUnitOption(unitOptionObject) {
		let selectedUnitOptions = []
		let pointTotal
		let i
		for (i = 0; i < this.state.selectedUnitOptions.length; i++) {
			if (
				this.state.selectedUnitOptions[i].index !== unitOptionObject.index ||
				parseInt(this.state.selectedUnitOptions[i].unitOption.id) !== parseInt(unitOptionObject.unitOption.id)
			) {
				selectedUnitOptions.push(this.state.selectedUnitOptions[i])
			}
		}

		pointTotal = this.calculatePointTotal('Main army', this.state.listedUnits, selectedUnitOptions)
		if ((pointTotal + parseInt(this.state.alliedPointTotal)) / 4 < parseInt(this.state.alliedPointTotal)) {
			selectedUnitOptions = this.state.selectedUnitOptions
		}

		this.setState({
			selectedUnitOptions: selectedUnitOptions,
			pointTotal: this.calculatePointTotal('Main army', this.state.listedUnits, selectedUnitOptions),
			unitStrengthTotal: this.calculateUnitStrengthTotal('Main army', this.state.listedUnits, selectedUnitOptions),
			alliedGreyedOutUnits: this.determineIfGreyedOut('Ally', this.state.alliedListedUnits, this.state.alliedArmy)
		})
	}

	removeAlliedUnitOption(unitOptionObject) {
		let alliedSelectedUnitOptions = []
		let i
		for (i = 0; i < this.state.alliedSelectedUnitOptions.length; i++) {
			if (
				this.state.alliedSelectedUnitOptions[i].index !== unitOptionObject.index ||
				parseInt(this.state.alliedSelectedUnitOptions[i].unitOption.id) !== parseInt(unitOptionObject.unitOption.id)
			) {
				alliedSelectedUnitOptions.push(this.state.alliedSelectedUnitOptions[i])
			}
		}
		
		this.setState({
			alliedSelectedUnitOptions: alliedSelectedUnitOptions,
			alliedPointTotal: this.calculatePointTotal('Ally', this.state.alliedListedUnits, alliedSelectedUnitOptions),
			alliedUnitStrengthTotal: this.calculateUnitStrengthTotal('Ally', this.state.alliedListedUnits, alliedSelectedUnitOptions),
			alliedGreyedOutUnits: this.determineIfGreyedOut('Ally', this.state.alliedListedUnits, this.state.alliedArmy)
		})
	}

	removeArtefact(artefactObject) {
		let selectedArtefacts = []
		let pointTotal
		let i
		for (i = 0; i < this.state.selectedArtefacts.length; i++) {
			if (this.state.selectedArtefacts[i].index !== artefactObject.index) {
				selectedArtefacts.push(this.state.selectedArtefacts[i])
			}
		}

		pointTotal = this.calculatePointTotal('Main army', this.state.listedUnits, this.state.selectedUnitOptions, selectedArtefacts)
		if ((pointTotal + parseInt(this.state.alliedPointTotal)) / 4 < parseInt(this.state.alliedPointTotal)) {
			selectedArtefacts = this.state.selectedArtefacts
		}

		this.setState({
			selectedArtefacts: selectedArtefacts,
			pointTotal: this.calculatePointTotal('Main army', this.state.listedUnits, this.state.selectedUnitOptions, selectedArtefacts),
			alliedGreyedOutUnits: this.determineIfGreyedOut('Ally', this.state.alliedListedUnits, this.state.alliedArmy)
		})
	}

	toggleFormattedList() {
		let isAboutToBeVisible
		if (this.state.formattedListVisible === false) {
			isAboutToBeVisible = true
		} else {
			isAboutToBeVisible = false
		}
		this.setState({ formattedListVisible: isAboutToBeVisible })
	}

	toggleUnitOptions() {
		if (this.state.unitOptionsVisible === false) {
			this.setState({ unitOptionsVisible: true })
		} else {
			this.setState({
				unitOptionsVisible: false,
				unitBeingGivenOption: '',
				alliedUnitBeingGivenOption: ''
			})
		}
	}

	toggleArtefacts() {
		if (this.state.artefactsVisible === false) {
			this.setState({ artefactsVisible: true })
		} else {
			this.setState({
				artefactsVisible: false,
				unitBeingGivenArtefact: ''
			})
		}
	}

	toggleAllies() {
		let isAboutToBeVisible
		let buttonLabel = document.getElementById('allies-button')
		if (this.state.alliesVisible === false) {
			isAboutToBeVisible = true
			buttonLabel.innerHTML = 'Main Army Units'
		} else {
			isAboutToBeVisible = false
			buttonLabel.innerHTML = 'Allies'
		}
		this.setState({ alliesVisible: isAboutToBeVisible })
	}

	updateUnitBeingGivenOption(unit) {
		this.setState({ unitBeingGivenOption: unit })
		this.toggleUnitOptions()
	}

	updateAlliedUnitBeingGivenOption(unit) {
		this.setState({ alliedUnitBeingGivenOption: unit })
		this.toggleUnitOptions()
	}

	updateUnitBeingGivenArtefact(unit) {
		this.setState({ unitBeingGivenArtefact: unit })
		this.toggleArtefacts()
	}

	clearList() {
		this.setState({
			listedUnits: [],
			selectedUnitOptions: [],
			selectedArtefacts: [],
			pointTotal: 0,
			unitStrengthTotal: 0,
			indexCount: 0,
			formattedListVisible: false,
			unitOptionsVisible: false,
			artefactsVisible: false,
			alliesVisible: false,
			unitBeingGivenOption: '',
			unitBeingGivenArtefact: '',
			unitTypeCountObject: '',
			unlockObject: '',
			maximumCount: 3,
			alliedArmy: {
				id: 0,
				name: 'fake',
				adjective: 'fake',
				alignment: 'fake'
			},
			alliedListedUnits: [],
			alliedSelectedUnitOptions: [],
			alliedUnitBeingGivenOption: '',
			alliedPointTotal: 0,
			alliedUnitStrengthTotal: 0,
			alliedUnitTypeCountObject: '',
			alliedUnlockObject: '',
			alliedGreyedOutUnits: []
		})
	}

	render() {
		let appElement = document.getElementById('app')
		let selectedArmy = this.state.selectedArmy
		let armyOptions = []
		let labelledArmy
		let i
		for (i = 0; i < this.props.armies.length; i++) {
			labelledArmy = { value: this.props.armies[i], label: this.props.armies[i].name }
			armyOptions.push(labelledArmy)
		}
		let displayNoneBottom
		if (selectedArmy === '') {
			displayNoneBottom = style['display-none']
		} else {
			displayNoneBottom = ''
		}
		let unitOptionSelectionTile
		let artefactSelectionTile
		let clearListDiv
		let unitEntryButtonTitle
		let unitEntryButtonDisplay
		let unitEntryButtonDisplayUnlocked
		let alliesButtonDisplay
		let viewListButtonDisplay
		let pointTotalDisplay
		let unsortedListedUnitsTop = []
		let unsortedListedUnitsSecondQuarter = []
		let unsortedListedUnitsThirdQuarter = []
		let unsortedListedUnitsBottom = []
		let unsortedAlliedListedUnitsTop = []
		let unsortedAlliedListedUnitsSecondQuarter = []
		let unsortedAlliedListedUnitsThirdQuarter = []
		let unsortedAlliedListedUnitsBottom = []

		for (i = 0; i < this.state.listedUnits.length; i++) {
			if (
				parseInt(this.state.listedUnits[i].unit.unlocking_class) === 1 ||
				parseInt(this.state.listedUnits[i].unit.unlocking_class) === 2 ||
				parseInt(this.state.listedUnits[i].unit.unlocking_class) === 3
			) {
				unsortedListedUnitsTop.push(this.state.listedUnits[i])
			}
			if (parseInt(this.state.listedUnits[i].unit.unlocking_class) === 0) {
				if (
					(
						this.state.listedUnits[i].unit.is_irregular === false ||
						this.state.listedUnits[i].unit.is_irregular === 'f'
					) &&
					this.state.listedUnits[i].unit.unit_size === 'Regiment' && (
						this.state.listedUnits[i].unit.unit_type === 'Large Infantry' ||
						this.state.listedUnits[i].unit.unit_type === 'Large Cavalry' ||
						this.state.listedUnits[i].unit.unit_type === 'Monstrous Infantry'
					)
				) {
					unsortedListedUnitsSecondQuarter.push(this.state.listedUnits[i])
				} else {
					if (
						this.state.listedUnits[i].unit.unit_size === 'Troop' && (
							this.state.listedUnits[i].unit.is_irregular === false ||
							this.state.listedUnits[i].unit.is_irregular === 'f'
						)
					) {
						unsortedListedUnitsThirdQuarter.push(this.state.listedUnits[i])
					} else {
						unsortedListedUnitsBottom.push(this.state.listedUnits[i])
					}
				}
			}
		}
		for (i = 0; i < this.state.alliedListedUnits.length; i++) {
			if (
				parseInt(this.state.alliedListedUnits[i].unit.unlocking_class) === 1 ||
				parseInt(this.state.alliedListedUnits[i].unit.unlocking_class) === 2 ||
				parseInt(this.state.alliedListedUnits[i].unit.unlocking_class) === 3
			) {
				unsortedAlliedListedUnitsTop.push(this.state.alliedListedUnits[i])
			}
			if (parseInt(this.state.alliedListedUnits[i].unit.unlocking_class) === 0) {
				if (
					(
						this.state.alliedListedUnits[i].unit.is_irregular === false ||
						this.state.alliedListedUnits[i].unit.is_irregular === 'f'
					) &&
					this.state.alliedListedUnits[i].unit.unit_size === 'Regiment' && (
						this.state.alliedListedUnits[i].unit.unit_type === 'Large Infantry' ||
						this.state.alliedListedUnits[i].unit.unit_type === 'Large Cavalry' ||
						this.state.alliedListedUnits[i].unit.unit_type === 'Monstrous Infantry'
					)
				) {
					unsortedAlliedListedUnitsSecondQuarter.push(this.state.alliedListedUnits[i])
				} else {
					if (
						(
							this.state.alliedListedUnits[i].unit.is_irregular === false ||
							this.state.alliedListedUnits[i].unit.is_irregular === 'f'
						) &&
						this.state.alliedListedUnits[i].unit.unit_size === 'Troop'
					) {
						unsortedAlliedListedUnitsThirdQuarter.push(this.state.alliedListedUnits[i])
					} else {
						unsortedAlliedListedUnitsBottom.push(this.state.alliedListedUnits[i])
					}
				}
			}
		}
		let listedUnitsTop = unsortedListedUnitsTop.sort((a, b) => {
			return ( parseInt(b.unit.unit_strength) - parseInt(a.unit.unit_strength) )
		})
		let listedUnitsSecondQuarter = unsortedListedUnitsSecondQuarter.sort((a, b) => {
			return ( parseInt(b.unit.unit_strength) - parseInt(a.unit.unit_strength) )
		})
		let listedUnitsThirdQuarter = unsortedListedUnitsThirdQuarter.sort((a, b) => {
			return ( parseInt(b.unit.unit_strength) - parseInt(a.unit.unit_strength) )
		})
		let listedUnitsBottom = unsortedListedUnitsBottom.sort((a, b) => {
			return ( parseInt(b.unit.unit_strength) - parseInt(a.unit.unit_strength) )
		})
		let alliedListedUnitsTop = unsortedAlliedListedUnitsTop.sort((a, b) => {
			return ( parseInt(b.unit.unit_strength) - parseInt(a.unit.unit_strength) )
		})
		let alliedListedUnitsSecondQuarter = unsortedAlliedListedUnitsSecondQuarter.sort((a, b) => {
			return ( parseInt(b.unit.unit_strength) - parseInt(a.unit.unit_strength) )
		})
		let alliedListedUnitsThirdQuarter = unsortedAlliedListedUnitsThirdQuarter.sort((a, b) => {
			return ( parseInt(b.unit.unit_strength) - parseInt(a.unit.unit_strength) )
		})
		let alliedListedUnitsBottom = unsortedAlliedListedUnitsBottom.sort((a, b) => {
			return ( parseInt(b.unit.unit_strength) - parseInt(a.unit.unit_strength) )
		})
		let idsOfUnitsThatCanHaveOptions = []
		for (i = 0; i < this.props.unitOptions.length; i++) {
			idsOfUnitsThatCanHaveOptions.push(parseInt(this.props.unitOptions[i].kow_unit_id))
		}

		let listedUnitsThatCanHaveOptions = []
		for (i = 0; i < this.state.listedUnits.length; i++) {
			if (idsOfUnitsThatCanHaveOptions.includes(parseInt(this.state.listedUnits[i].unit.id))) {
				listedUnitsThatCanHaveOptions.push(this.state.listedUnits[i])
			}
		}
		let listedUnitsThatCanHaveArtefacts = []
		for (i = 0; i < this.state.listedUnits.length; i++) {
			if (
				this.state.listedUnits[i].unit.unit_type !== 'War Engine' &&
				this.state.listedUnits[i].unit.unit_type !== 'Monster' &&
				this.state.listedUnits[i].unit.unit_type !== 'Titan' && 
				parseInt(this.state.listedUnits[i].unit.limited_n) === 0
			) {
				listedUnitsThatCanHaveArtefacts.push(this.state.listedUnits[i])
			}

		}
		let alliedListedUnitsThatCanHaveOptions = []
		for (i = 0; i < this.state.alliedListedUnits.length; i++) {
			if (idsOfUnitsThatCanHaveOptions.includes(parseInt(this.state.alliedListedUnits[i].unit.id))) {
				alliedListedUnitsThatCanHaveOptions.push(this.state.alliedListedUnits[i])
			}
		}
		let grandPointTotal
		let unitCount
		let grandUnitStrengthTotal
		let listedUnitTileDisplayTop
		let listedUnitTileDisplaySecondQuarter
		let listedUnitTileDisplayThirdQuarter
		let listedUnitTileDisplayBottom
		let alliedListedUnitTileDisplayTop
		let alliedListedUnitTileDisplaySecondQuarter
		let alliedListedUnitTileDisplayThirdQuarter
		let alliedListedUnitTileDisplayBottom
		if (this.state.unitOptionsVisible) {
			unitOptionSelectionTile =
				<div className={style['unit-option-selection-tile']}>
					<UnitOptionSelectionTile
						unitObject={this.state.unitBeingGivenOption}
						alliedUnitObject={this.state.alliedUnitBeingGivenOption}
						unitOptions={this.props.unitOptions}
						selectUnitOptions={this.selectUnitOptions}
						selectAlliedUnitOptions={this.selectAlliedUnitOptions}
						selectedUnitOptions={this.state.selectedUnitOptions}
						alliedSelectedUnitOptions={this.state.alliedSelectedUnitOptions}
						toggleUnitOptions={this.toggleUnitOptions}
						pointTotal={parseInt(this.state.pointTotal)}
						alliedPointTotal={parseInt(this.state.alliedPointTotal)}
					/>
				</div>
		}
		if (this.state.artefactsVisible) {
			artefactSelectionTile = 
				<div className={style['artefact-selection-tile']}>
					<ArtefactSelectionTile
						unitObject={this.state.unitBeingGivenArtefact}
						selectedArtefacts={this.state.selectedArtefacts}
						artefacts={this.props.artefacts}
						selectArtefact={this.selectArtefact}
						toggleArtefacts={this.toggleArtefacts}
						pointTotal={parseInt(this.state.pointTotal)}
						alliedPointTotal={parseInt(this.state.alliedPointTotal)}
					/>
				</div>
		}
		if (this.state.selectedArmy === '') {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'visible'
			clearListDiv =
				<div className={style['clear-list-div']}>
					<span onClick={this.clearList} className={style['clear-or-cancel-label']}>Clear List</span>
				</div>
			unitEntryButtonTitle = 
				<div className={style['unit-entry-button-title-bar']}>
					<h3 className={style['unit-entry-button-title']}>Available Units</h3>
				</div>

			let units = this.props.units.sort((a, b) => {
				return ( parseInt(b.points) - parseInt(a.points) )
			})

			let unitsInArmyTop = []
			let unitsInArmyBottom = []
			for (i = 0; i < units.length; i++) {	
				if (parseInt(units[i].kow_army_id) === parseInt(selectedArmy.id)) {
					if (parseInt(units[i].unlocking_class) > 0) {
						unitsInArmyTop.push(units[i])
					} else {
						unitsInArmyBottom.push(units[i])
					}
				}
			}
			let greyedOutUnits = this.determineIfGreyedOut('Main army', this.state.listedUnits, this.state.alliedArmy)

			if (this.state.alliesVisible === false) {
				unitEntryButtonDisplay = unitsInArmyTop.map(unit => {
					return (
						<UnitEntryButton
							key={parseInt(unit.id)}
							id={parseInt(unit.id)}
							unit={unit}
							addUnitToList={this.addUnitToList}
							greyedOutUnits={greyedOutUnits}
						/>
					)			
				})
				unitEntryButtonDisplayUnlocked = unitsInArmyBottom.map(unit => {
					return (
						<UnitEntryButton
							key={parseInt(unit.id)}
							id={parseInt(unit.id)}
							unit={unit}
							addUnitToList={this.addUnitToList}
							greyedOutUnits={greyedOutUnits}
						/>
					)			
				})
			} else {
				unitEntryButtonDisplay =
					<AllyButtons
						armies={this.props.armies}
						selectedArmy={this.state.selectedArmy}
						units={units}
						listedUnits={this.state.listedUnits}
						pointTotal={parseInt(this.state.pointTotal)}
						alliedListedUnits={this.state.alliedListedUnits}
						alliedArmy={this.state.alliedArmy}
						alliedPointTotal={parseInt(this.state.alliedPointTotal)}
						alliedTroopUnlocks={this.state.alliedTroopUnlocks}
						alliedHeroUnlocks={this.state.alliedHeroUnlocks}
						alliedWarEngineUnlocks={this.state.alliedWarEngineUnlocks}
						alliedMonsterUnlocks={this.state.alliedMonsterUnlocks}
						alliedUnlocksFromRegiments={this.state.alliedUnlocksFromRegiments}
						alliedUnlocksFromLargeInfantry={this.state.alliedUnlocksFromLargeInfantry}
						alliedHeroCount={this.state.alliedHeroCount}
						alliedWarEngineCount={this.state.alliedWarEngineCount}
						alliedMonsterCount={this.state.alliedMonsterCount}
						alliedTitanCount={this.state.alliedTitanCount}
						alliedHordeCount={this.state.alliedHordeCount}
						alliedLargeInfantryCount={this.state.alliedLargeInfantryCount}
						alliedGreyedOutUnits={this.state.alliedGreyedOutUnits}
						calculateUnitTypeCounts={this.calculateUnitTypeCounts}
						addAlliedUnitToList={this.addAlliedUnitToList}
						determineIfGreyedOut={this.determineIfGreyedOut}
					/>
			}

			grandPointTotal = parseInt(this.state.pointTotal) + parseInt(this.state.alliedPointTotal)
			unitCount = this.state.listedUnits.length + this.state.alliedListedUnits.length
			grandUnitStrengthTotal = parseInt(this.state.unitStrengthTotal) + parseInt(this.state.alliedUnitStrengthTotal)
			pointTotalDisplay =
				<div className={style['point-total']}>
					Points: <span className={style['bold']}>{grandPointTotal}</span><br />
					Unit Count: <span className={style['bold']}>{unitCount}</span><br />
					Unit Strength: <span className={style['bold']}>{grandUnitStrengthTotal}</span>
				</div>

			listedUnitTileDisplayTop = listedUnitsTop.map(unitObject => {
				return (
					<div
						key={unitObject.index}
						id={unitObject.index}
						className={style['list-output-side-row']}
					>
						<div className={style['list-entry-div']}>
							<ArtefactIcon
								key={unitObject.index + 20000}
								id={parseInt(unitObject.unit.id)}
								unitObject={unitObject}
								listedUnitsThatCanHaveArtefacts={listedUnitsThatCanHaveArtefacts}
								updateUnitBeingGivenArtefact={this.updateUnitBeingGivenArtefact}
							/>
							<UnitOptionIcon
								key={unitObject.index}
								id={parseInt(unitObject.unit.id)}
								unitObject={unitObject}
								listedUnitsThatCanHaveOptions={listedUnitsThatCanHaveOptions}
								updateUnitBeingGivenOption={this.updateUnitBeingGivenOption}
							/>
						</div>
						<div className={style['spacer-div']}>_</div>
						<UnitEntryNameTile
							key={unitObject.index}
							id={unitObject.index}
							unitObject={unitObject}
							alliedArmy={this.state.alliedArmy}
							selectedUnitOptions={this.state.selectedUnitOptions}
							selectedArtefacts={this.state.selectedArtefacts}
							removeUnitOption={this.removeUnitOption}
							removeArtefact={this.removeArtefact}
							removeUnitFromList={this.removeUnitFromList}
						/>
					</div>
				)
			})

			listedUnitTileDisplaySecondQuarter = listedUnitsSecondQuarter.map(unitObject => {
				return (
					<div
						key={unitObject.index}
						id={unitObject.index}
						className={style['list-output-side-row']}
					>
						<div className={style['list-entry-div']}>
							<ArtefactIcon
								key={unitObject.index + 20000}
								id={parseInt(unitObject.unit.id)}
								unitObject={unitObject}
								listedUnitsThatCanHaveArtefacts={listedUnitsThatCanHaveArtefacts}
								updateUnitBeingGivenArtefact={this.updateUnitBeingGivenArtefact}
							/>
							<UnitOptionIcon
								key={unitObject.index}
								id={parseInt(unitObject.unit.id)}
								unitObject={unitObject}
								listedUnitsThatCanHaveOptions={listedUnitsThatCanHaveOptions}
								updateUnitBeingGivenOption={this.updateUnitBeingGivenOption}
							/>
						</div>
						<div className={style['spacer-div']}>_</div>
						<UnitEntryNameTile
							key={unitObject.index}
							id={unitObject.index}
							unitObject={unitObject}
							alliedArmy={this.state.alliedArmy}
							selectedUnitOptions={this.state.selectedUnitOptions}
							selectedArtefacts={this.state.selectedArtefacts}
							removeUnitOption={this.removeUnitOption}
							removeArtefact={this.removeArtefact}
							removeUnitFromList={this.removeUnitFromList}
						/>
					</div>
				)
			})

			listedUnitTileDisplayThirdQuarter = listedUnitsThirdQuarter.map(unitObject => {
				return (
					<div
						key={unitObject.index}
						id={unitObject.index}
						className={style['list-output-side-row']}
					>
						<div className={style['list-entry-div']}>
							<ArtefactIcon
								key={unitObject.index + 20000}
								id={parseInt(unitObject.unit.id)}
								unitObject={unitObject}
								listedUnitsThatCanHaveArtefacts={listedUnitsThatCanHaveArtefacts}
								updateUnitBeingGivenArtefact={this.updateUnitBeingGivenArtefact}
							/>
							<UnitOptionIcon
								key={unitObject.index}
								id={parseInt(unitObject.unit.id)}
								unitObject={unitObject}
								listedUnitsThatCanHaveOptions={listedUnitsThatCanHaveOptions}
								updateUnitBeingGivenOption={this.updateUnitBeingGivenOption}
							/>
						</div>
						<div className={style['spacer-div']}>_</div>
						<UnitEntryNameTile
							key={unitObject.index}
							id={unitObject.index}
							unitObject={unitObject}
							alliedArmy={this.state.alliedArmy}
							selectedUnitOptions={this.state.selectedUnitOptions}
							selectedArtefacts={this.state.selectedArtefacts}
							removeUnitOption={this.removeUnitOption}
							removeArtefact={this.removeArtefact}
							removeUnitFromList={this.removeUnitFromList}
						/>
					</div>
				)
			})

			listedUnitTileDisplayBottom = listedUnitsBottom.map(unitObject => {
				return (
					<div
						key={unitObject.index}
						id={unitObject.index}
						className={style['list-output-side-row']}
					>
						<div className={style['list-entry-div']}>
							<ArtefactIcon
								key={unitObject.index + 20000}
								id={parseInt(unitObject.unit.id)}
								unitObject={unitObject}
								listedUnitsThatCanHaveArtefacts={listedUnitsThatCanHaveArtefacts}
								updateUnitBeingGivenArtefact={this.updateUnitBeingGivenArtefact}
							/>
							<UnitOptionIcon
								key={unitObject.index}
								id={parseInt(unitObject.unit.id)}
								unitObject={unitObject}
								listedUnitsThatCanHaveOptions={listedUnitsThatCanHaveOptions}
								updateUnitBeingGivenOption={this.updateUnitBeingGivenOption}
							/>
						</div>
						<div className={style['spacer-div']}>_</div>
						<UnitEntryNameTile
							key={unitObject.index}
							id={unitObject.index}
							unitObject={unitObject}
							alliedArmy={this.state.alliedArmy}
							selectedUnitOptions={this.state.selectedUnitOptions}
							selectedArtefacts={this.state.selectedArtefacts}
							removeUnitOption={this.removeUnitOption}
							removeArtefact={this.removeArtefact}
							removeUnitFromList={this.removeUnitFromList}
						/>
					</div>
				)
			})

			alliedListedUnitTileDisplayTop = alliedListedUnitsTop.map(unitObject => {
				return (
					<div
						key={unitObject.index}
						id={unitObject.index}
						className={style['list-output-side-row']}
					>
						<div className={style['list-entry-div']}>
							<ArtefactIcon
								key={unitObject.index + 300000}
								id={parseInt(unitObject.unit.id)}
								no={'no'}
								listedUnitsThatCanHaveArtefacts={listedUnitsThatCanHaveArtefacts}
								updateUnitBeingGivenArtefact={this.updateUnitBeingGivenArtefact}
							/>
							<UnitOptionIcon
								key={unitObject.index + 250000}
								id={parseInt(unitObject.unit.id)}
								unitObject={unitObject}
								listedUnitsThatCanHaveOptions={alliedListedUnitsThatCanHaveOptions}
								updateUnitBeingGivenOption={this.updateAlliedUnitBeingGivenOption}
							/>
						</div>
						<div className={style['spacer-div']}>_</div>
						<UnitEntryNameTile
							key={unitObject.index + 275000}
							id={unitObject.index}
							unitObject={unitObject}
							alliedArmy={this.state.alliedArmy}
							selectedUnitOptions={this.state.alliedSelectedUnitOptions}
							removeUnitOption={this.removeAlliedUnitOption}
							removeUnitFromList={this.removeAlliedUnitFromList}
						/>
					</div>
				)				
			})

			alliedListedUnitTileDisplaySecondQuarter = alliedListedUnitsSecondQuarter.map(unitObject => {
				return (
					<div
						key={unitObject.index}
						id={unitObject.index}
						className={style['list-output-side-row']}
					>
						<div className={style['list-entry-div']}>
							<ArtefactIcon
								key={unitObject.index + 300000}
								id={parseInt(unitObject.unit.id)}
								no={'no'}
								listedUnitsThatCanHaveArtefacts={listedUnitsThatCanHaveArtefacts}
								updateUnitBeingGivenArtefact={this.updateUnitBeingGivenArtefact}
							/>
							<UnitOptionIcon
								key={unitObject.index + 250000}
								id={parseInt(unitObject.unit.id)}
								unitObject={unitObject}
								listedUnitsThatCanHaveOptions={alliedListedUnitsThatCanHaveOptions}
								updateUnitBeingGivenOption={this.updateAlliedUnitBeingGivenOption}
							/>
						</div>
						<div className={style['spacer-div']}>_</div>
						<UnitEntryNameTile
							key={unitObject.index + 275000}
							id={unitObject.index}
							unitObject={unitObject}
							alliedArmy={this.state.alliedArmy}
							selectedUnitOptions={this.state.alliedSelectedUnitOptions}
							removeUnitOption={this.removeAlliedUnitOption}
							removeUnitFromList={this.removeAlliedUnitFromList}
						/>
					</div>
				)				
			})

			alliedListedUnitTileDisplayThirdQuarter = alliedListedUnitsThirdQuarter.map(unitObject => {
				return (
					<div
						key={unitObject.index}
						id={unitObject.index}
						className={style['list-output-side-row']}
					>
						<div className={style['list-entry-div']}>
							<ArtefactIcon
								key={unitObject.index + 300000}
								id={parseInt(unitObject.unit.id)}
								no={'no'}
								listedUnitsThatCanHaveArtefacts={listedUnitsThatCanHaveArtefacts}
								updateUnitBeingGivenArtefact={this.updateUnitBeingGivenArtefact}
							/>
							<UnitOptionIcon
								key={unitObject.index + 250000}
								id={parseInt(unitObject.unit.id)}
								unitObject={unitObject}
								listedUnitsThatCanHaveOptions={alliedListedUnitsThatCanHaveOptions}
								updateUnitBeingGivenOption={this.updateAlliedUnitBeingGivenOption}
							/>
						</div>
						<div className={style['spacer-div']}>_</div>
						<UnitEntryNameTile
							key={unitObject.index + 275000}
							id={unitObject.index}
							unitObject={unitObject}
							alliedArmy={this.state.alliedArmy}
							selectedUnitOptions={this.state.alliedSelectedUnitOptions}
							removeUnitOption={this.removeAlliedUnitOption}
							removeUnitFromList={this.removeAlliedUnitFromList}
						/>
					</div>
				)				
			})

			alliedListedUnitTileDisplayBottom = alliedListedUnitsBottom.map(unitObject => {
				return (
					<div
						key={unitObject.index}
						id={unitObject.index}
						className={style['list-output-side-row']}
					>
						<div className={style['list-entry-div']}>
							<ArtefactIcon
								key={unitObject.index + 300000}
								id={parseInt(unitObject.unit.id)}
								no={'no'}
								listedUnitsThatCanHaveArtefacts={listedUnitsThatCanHaveArtefacts}
								updateUnitBeingGivenArtefact={this.updateUnitBeingGivenArtefact}
							/>
							<UnitOptionIcon
								key={unitObject.index + 250000}
								id={parseInt(unitObject.unit.id)}
								unitObject={unitObject}
								listedUnitsThatCanHaveOptions={alliedListedUnitsThatCanHaveOptions}
								updateUnitBeingGivenOption={this.updateAlliedUnitBeingGivenOption}
							/>
						</div>
						<div className={style['spacer-div']}>_</div>
						<UnitEntryNameTile
							key={unitObject.index + 275000}
							id={unitObject.index}
							unitObject={unitObject}
							alliedArmy={this.state.alliedArmy}
							selectedUnitOptions={this.state.alliedSelectedUnitOptions}
							removeUnitOption={this.removeAlliedUnitOption}
							removeUnitFromList={this.removeAlliedUnitFromList}
						/>
					</div>
				)				
			})

			if (this.state.listedUnits.length > 0) {
				alliesButtonDisplay =
					<div className={style['allies-button-div']}>
						<br /><br />
						<span
							onClick={this.toggleAllies}
							className={style['allies-button']}
							id="allies-button"
						>
								Allies
							</span>
					</div>
				viewListButtonDisplay =
					<div className={style['view-list-button-div']}>
						<br /><br />
						<span onClick={this.toggleFormattedList} className={style['view-list-button']}>
							View List
						</span>
					</div>
			} else {
				viewListButtonDisplay =
					<div className={style['instruction']}>
						<i>Click units to the left to add them to the list</i>
					</div>
			}
		}

		let listOutputSide
		let alliedPointPercentageBeforeToFixed
		let alliedPointPercentage
		if (this.state.alliedListedUnits.length > 0) {
			alliedPointPercentageBeforeToFixed = (
				(
					parseInt(this.state.alliedPointTotal) /
					(parseInt(this.state.pointTotal) + parseInt(this.state.alliedPointTotal))
				) * 100
			)
			alliedPointPercentage = alliedPointPercentageBeforeToFixed.toFixed(1)
		}
		if (unitOptionSelectionTile !== undefined && artefactSelectionTile === undefined) {
			listOutputSide = unitOptionSelectionTile
		}
		if (unitOptionSelectionTile === undefined && artefactSelectionTile !== undefined) {
			listOutputSide = artefactSelectionTile
		}
 		if (unitOptionSelectionTile === undefined && artefactSelectionTile === undefined) {
			if (this.state.alliedListedUnits.length > 0) {
				listOutputSide =
					<div>
						{pointTotalDisplay}<br />
						<div>							
							{listedUnitTileDisplayTop}
							{listedUnitTileDisplaySecondQuarter}
							{listedUnitTileDisplayThirdQuarter}
							{listedUnitTileDisplayBottom}							
						</div><br />
						<div className={style['allies-title-on-list']}>
							{this.state.alliedArmy.adjective} Allies ({alliedPointPercentage}%):
						</div><br />
						<div>							
							{alliedListedUnitTileDisplayTop}
							{alliedListedUnitTileDisplaySecondQuarter}
							{alliedListedUnitTileDisplayThirdQuarter}
							{alliedListedUnitTileDisplayBottom}							
						</div>
						{viewListButtonDisplay}
					</div>
			} else {
				listOutputSide =
					<div>
						{pointTotalDisplay}<br />
						<div>
							{listedUnitTileDisplayTop}
							{listedUnitTileDisplaySecondQuarter}
							{listedUnitTileDisplayThirdQuarter}
							{listedUnitTileDisplayBottom}							
						</div>
						{viewListButtonDisplay}
					</div>
			}
		
		}

		let display =
			<div id="hidden-section-id" className={displayNoneBottom}>
				{clearListDiv}	
				<div className={style['everything-after-army-dropdown']}>
					<div>
						<div className={style['unit-entry-buttons']}>
							{unitEntryButtonTitle}<br />
							{unitEntryButtonDisplay}<br />
							{unitEntryButtonDisplayUnlocked}
							{alliesButtonDisplay}
						</div>
					</div>
					<div>
						<div className={style['list-output-side']}>
							<div className={style['list-title-bar']}>
								<h3 className={style['list-title']}>{this.state.selectedArmy.name}</h3>
							</div><br />
							{listOutputSide}
						</div>
					</div>
				</div>
				<div className={style['email-div']} id="email-div-id">
					<span>Email:{' '}admin@goodarmylists.com</span>
					<form className={style['paypal-form']} action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
						<input type="hidden" name="cmd" value="_donations" />
						<input type="hidden" name="business" value="admin@goodarmylists.com" />
						<input type="hidden" name="currency_code" value="USD" />
						<input type="image" src={paypal} border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
						<img alt="" border="0" src={paypal} width="1" height="1" />
					</form>
				</div>
			</div>

		return (		
			<div>
				<div
					id="everything-except-print-section-id"
					className={style['everything-except-print-section']}
				>
					<div id="army-dropdown-section-id" className={style['army-dropdown-section']}>
						<div className={style['main-page-link']}>
							<span className={style['main-page-link-label']}>
								<a href="http://goodarmylists.s3-website.us-east-2.amazonaws.com">-- Good Army Lists --</a>
							</span>
						</div>
						<div className={style['main-title-box']}>
							<h2 className={style['main-title']}>Make a Good Kings of War List</h2>
						</div>
						<div className={style['copyright-notice']}>Kings of War is copyrighted by Mantic Entertainment</div>
						<div className={style['css-remover']}>
							<Select
								placeholder="Select Army..."
								options={armyOptions}
								isSearchable={false}
								styles={this.props.dropdownStyle}
								onChange={this.updateSelectedArmy}
							/>
						</div>
					</div>
					<div>{display}</div>
					<Modal
						appElement={appElement}
						isOpen={this.state.formattedListVisible}
						onRequestClose={this.toggleFormattedList}
						shouldCloseOnOverlayClick={true}
						className={style['formatted-list-modal']}
						ariaHideApp={false}
					>
						<FormattedList
							selectedArmy={selectedArmy}
							listedUnitsTop={listedUnitsTop}
							listedUnitsSecondQuarter={listedUnitsSecondQuarter}
							listedUnitsThirdQuarter={listedUnitsThirdQuarter}
							listedUnitsBottom={listedUnitsBottom}
							selectedUnitOptions={this.state.selectedUnitOptions}
							selectedArtefacts={this.state.selectedArtefacts}
							pointTotal={parseInt(this.state.pointTotal)}
							unitStrengthTotal={grandUnitStrengthTotal}
							unitCount={unitCount}
							alliedArmy={this.state.alliedArmy}
							alliedListedUnitsTop={alliedListedUnitsTop}
							alliedListedUnitsSecondQuarter={alliedListedUnitsSecondQuarter}
							alliedListedUnitsThirdQuarter={alliedListedUnitsThirdQuarter}
							alliedListedUnitsBottom={alliedListedUnitsBottom}
							alliedSelectedUnitOptions={this.state.alliedSelectedUnitOptions}
							alliedPointTotal={parseInt(this.state.alliedPointTotal)}
							alliedPointPercentage={alliedPointPercentage}
							toggleFormattedList={this.toggleFormattedList}
						/>
					</Modal>
				</div>
				<div id="print-section-id" className={style['print-section']}></div>
			</div>
		)
	}	
}

export default KowInnerContainer