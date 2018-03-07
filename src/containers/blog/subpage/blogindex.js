import React from 'react';
import { connect } from 'react-redux';

import { initArticleList, getBlogInfo } from '../../../actions/actions';
import ArticleList from '../../../components/articlelist/articlelist';
import UserInfo from '../../../components/userinfo/userinfo';
import CategoryList from '../../../components/categorylist/categorylist';


class BlogIndex extends React.Component {

	componentWillMount() {
		this.props.initArticleList('全部');
		this.props.getBlogInfo();
	}

	handleClickSelect = (value) =>{
		this.props.initArticleList(value);
	}

	render() {
		const categorylist = [
			'全部', 'javascript', 'css', 'html', 'nodejs', 'React', '杂记', '转载'
		]
		return (
			<div className='container-blog'>
				<div className='container-left'>
					<ArticleList articlelist={this.props.articlelist} />
				</div>
				<div className='container-right'>
					<UserInfo 
						username={this.props.user.username}
						avatar={this.props.user.avatar}
					/>
					<CategoryList 
						categorylist={categorylist}
						handleClickSelect={this.handleClickSelect}
					/>
				</div>
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		articlelist: state.article,
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		initArticleList: (v) => dispatch(initArticleList(v)),
		getBlogInfo: () => dispatch(getBlogInfo())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogIndex)