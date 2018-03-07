import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {initArticleList} from '../../../actions/actions';
import ArticleEditor from '../../../components/articleEditor/articleEditor';

class UpdateArticle extends React.Component {
	componentWillMount() {
		this.props.initArticleList('全部');
		console.log(this.props.match.params.name)
	}
	handleClickSave = (obj) =>{
		const { title, content, category, abstract } = obj;
		if( title === '' || content === '' || abstract === ''){
			return alert('内容不能为空！');
		}
		axios.post('/article/updateArticle', {title, content, category, abstract, _id: this.props.match.params.name } )
			.then( res =>{
				if( res.status === 200 && res.data.code === 1 ){
					alert('修改成功！');
				}
			})
			.then( ()=>{
				this.props.history.replace('/admin/editArticle');
			})
	}

	render() {
		const currentArticle = this.props.articlelist.filter(v=>{
			return v._id === this.props.match.params.name;
		})[0];
		console.log(currentArticle)
		return (
			this.props.articlelist.length === 0 ?  null :
			<ArticleEditor 
				title= {currentArticle.title}
				category={currentArticle.category}
				abstract={currentArticle.abstract}
				content={currentArticle.content}
				handleClickSave={this.handleClickSave}
			/>
			
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateArticle)
