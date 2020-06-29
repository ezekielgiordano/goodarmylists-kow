import sword from './assets/images/sword.ico'
import React from 'react'
import ReactDOM from 'react-dom'
import Favicon from 'react-favicon'
import App from './react/App'
import * as serviceWorker from './serviceWorker'

document.addEventListener('DOMContentLoaded', () => {
	let page =
		<div>
			<Favicon url={sword} />
			<App />
		</div>
	let app = document.getElementById('app')
	ReactDOM.render(page, app)
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
