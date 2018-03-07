import React from 'react';

import './articlepage.scss';

class ArticlePage extends React.Component {

	render() {
		const {currentArticle} = this.props;

		return (
			
			
			<div className='container-article' key='container-article'>
				<span className='article-title'>{currentArticle.title}</span>
				<span className='article-date'>{currentArticle.date}</span>
				<div dangerouslySetInnerHTML={{__html: currentArticle.content}} className='article-body'></div>
			</div>	
			
		);
	}
}

export default ArticlePage