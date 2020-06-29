import style from '../../../assets/stylesheets/kow.module.css'
import React from 'react'
import vase from '../../../assets/images/vase.ico'
import white_square from '../../../assets/images/white_square.png'

const ArtefactIcon = props => {
	let display
	if (
		props.no !== 'no' &&
		props.listedUnitsThatCanHaveArtefacts.includes(props.unitObject)
	) {
		display =
			<span
				onClick={() => props.updateUnitBeingGivenArtefact(props.unitObject)}
				className={style['vase']}
			>
				<img src={vase} alt="" width={"20"} height={"12"} />
			</span>		
	} else {
		display =
			<span className={style['removed-vase']}>
				<img src={white_square} alt="" width={"20"} height={"20"} />
			</span>
	}
	
	return (
		<span>{display}</span>
	)
}

export default ArtefactIcon