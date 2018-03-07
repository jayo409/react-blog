import React from 'react';
import { connect } from 'react-redux';

import {initArticleList} from '../../../actions/actions';
import ArticlePage from '../../../components/articlepage/articlepage';

class Article extends React.Component {
	componentWillMount() {
		this.props.initArticleList('全部');
	}

	render() {
		const currentArticle = this.props.articlelist.filter(v=>{
			return v._id === this.props.match.params.name;
		})[0];
		return(
			this.props.articlelist.length === 0 ?  null :
			<ArticlePage currentArticle={currentArticle}></ArticlePage>
		);
	}
}


const mapStateToProps = (state) =>{
	return {
		articlelist: state.article
	}
}

const mapDispatchToProps = (dispatch) =>{
	return {
		initArticleList: (v) => dispatch(initArticleList(v))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)