import style from '../../../assets/stylesheets/kow.module.css'
import React from 'react'
import cog from '../../../assets/images/cog.ico'
// import white_square from '../../../assets/images/white_square.png'

const UnitOptionIcon = props => {
	let display
	if (props.listedUnitsThatCanHaveOptions.includes(props.unitObject)) {
		display =
			<span
				onClick={() => props.updateUnitBeingGivenOption(props.unitObject)}
				className={style['cog']}
			>
				<img src={cog} alt="" width={"20"} height={"20"} />
			</span>	
	} else {
		display = <span className={style['removed-cog']}>{'_'}</span>
	}

	return (
		<span>{display}</span>
	)
}

export default UnitOptionIcon