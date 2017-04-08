import React from 'react';
import ReactDom from 'react-dom';
import {MainWindow} from './MainWindow.js'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {reducer} from './reducers/index.js'
import {createLogger,logger} from 'redux-logger'

/*
const logger = createLogger({
	stateTransformer: state => {
		let newState = {};
		newState.data = state.data.toJS();
		newState.search = state.search.toJS();
		return newState;
	}
});*/

let store = createStore(reducer, applyMiddleware(logger));

ReactDom.render(
	<Provider store={store}>
		<MainWindow />
	</Provider>,
	document.getElementById('comicdb')
);
