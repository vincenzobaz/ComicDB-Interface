import React from 'react';
import ReactDom from 'react-dom';
import {MainWindow} from './MainWindow.js';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './reducers/index.js';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const logger = createLogger({
	stateTransformer: state => Object.assign({}, {data: state.get('data').toJS()}, {search: state.get('search').toJS()})
});

let store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(thunkMiddleware, logger)
);

ReactDom.render(
	<Provider store={store}>
		<MainWindow />
	</Provider>,
	document.getElementById('comicdb')
);
