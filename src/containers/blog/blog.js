import React from 'react';
import { Switch, Route } from 'react-router-dom';

import BlogIndex from './subpage/blogindex';
import Article from './subpage/article';

import './blog.scss';

class Blog extends React.Component {
	render() {
		return (
			[
			<div className='blog-bg' key='blog-bg'></div>,
			<Switch key='Switch'>
				<Route exact path={`${this.props.match.url}/`} component={BlogIndex}></Route>
				<Route path={`${this.props.match.url}/article/:name`} component={Article} />
			</Switch>
			]

		);
	}
}
export default Blog