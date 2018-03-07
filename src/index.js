import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Layout from './containers/layout/layout';
import reducers from './reducers/reducers';
import registerServiceWorker from './registerServiceWorker';

import './Global.scss';
import './static/font/iconfont.css';

const store = createStore(
	reducers, 
	applyMiddleware(thunk)
)

ReactDOM.render(
	(<Provider store = {store}>
		<BrowserRouter>
			<Layout />
		</BrowserRouter>
	</Provider>), 
	document.getElementById('root')
);

registerServiceWorker();