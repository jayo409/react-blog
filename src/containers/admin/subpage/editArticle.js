import React from 'react';
import { connect } from 'react-redux';

import EditArticleList from '../../../components/editArticleList/editArticleList';
import { initArticleList, delArticle } from '../../../actions/actions';

class EditArticle extends React.Component {

	componentWillMount() {
		this.props.initArticleList('全部');
	}
	handleClickDel = (id) =>{
		this.props.delArticle(id);
	}

	render() {
		return (
			<EditArticleList 
				articlelist={this.props.articlelist} 
				handleClickDel= {this.handleClickDel}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		articlelist: state.article,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		initArticleList: (v) => dispatch(initArticleList(v)),
		delArticle: (id) => dispatch(delArticle(id))
	}
}


export default connect(mapStateToProps, mapDispatchToProps )(EditArticle)
