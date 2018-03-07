import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Homepage from '../homepage/homepage';
import Blog from '../blog/blog';
import Message from '../message/message';
import Admin from '../admin/admin';
import Navlist from '../../components/navlist/navlist';
import Signin from '../signin/signin';
import Register from '../register/register';
import Music from '../music/music';

import './layout.scss'

class Layout extends React.Component {
	render() {
		return (
			<div className='wrap'>
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route path="/blog" component={Blog} />
					<Route path="/message" component={Message} />
					<Route path="/music" component={Music} />
				</Switch>
				<Switch>
					<Route path='/admin' component={Admin} />
					<Route path='/signin' component={Signin} />
					<Route path='/register' component={Register} />
					<Route path="/:name" component={Navlist} />
				</Switch>	
			</div>
		)
	}
}

export default Layout