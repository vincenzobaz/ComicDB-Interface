import React from 'react';
import ReactDom from 'react-dom';
import {MainWindow} from './MainWindow.js'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {searchReducer} from './reducers/search.js'

let store = createStore(searchReducer);

ReactDom.render(
	<Provider store={store}>
		<MainWindow />
	</Provider>,
	document.getElementById('comicdb')
);
