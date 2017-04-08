import React from 'react';
import ReactDom from 'react-dom';
import {MainWindow} from './MainWindow.js'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {searchReducer} from './reducers/search.js'
import {createLogger} from 'redux-logger'

const logger = createLogger({
	stateTransformer: state => state.toJS()
});
let store = createStore(searchReducer, applyMiddleware(logger));

ReactDom.render(
	<Provider store={store}>
		<MainWindow />
	</Provider>,
	document.getElementById('comicdb')
);
