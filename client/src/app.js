import React from 'react';
import ReactDom from 'react-dom';
import {MainWindow} from './MainWindow.js';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './reducers/index.js';
import thunkMiddleware from 'redux-thunk';

let store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(thunkMiddleware)
);

ReactDom.render(
	<Provider store={store}>
		<MainWindow />
	</Provider>,
	document.getElementById('comicdb')
);
