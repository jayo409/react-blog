import React from 'react';
import { Link } from 'react-router-dom';

import './articlelist.scss';

class ArticleList extends React.Component {

	render() {

		if( this.props.articlelist.length === 0 ){
			return <div>暂无此分类文章！</div>
		}
		return (
			<ul className='articlelist'>
				{this.props.articlelist.map( (v) => (
					<li key={v._id} className='articlelist-item'>
						<Link to={'/blog/article/'+v._id} className='articlelist-title'>{v.title}</Link>
						<div className='articlelist-abstract'>
							{v.abstract}
						</div>
						<div className='articlelist-bot'>
							<span>时间：{v.date}</span>
							<span>分类：{v.category}</span>
						</div>
					</li>
				))}
			</ul>
		);
	}
}
export default ArticleList