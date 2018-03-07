import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import ArticleEditor from '../../../components/articleEditor/articleEditor';


class PostArticle extends React.Component {

	
	handleClickSave = (obj) =>{
		const { title, content, category, abstract } = obj;
		if( title === '' || content === '' || abstract === ''){
			return alert('内容不能为空！');
		}
		axios.post('/article/postArticle', {title, content, category, abstract} )
			.then( res =>{
				if( res.status === 200 && res.data.code === 1 ){
					alert('保存成功！');
				}
			})
			.then( ()=>{
				this.props.history.push('editArticle');
			})
	}


	render() {

		return (
			<ArticleEditor 
				title= {''}
				category={'杂记'}
				abstract={''}
				content={''}
				handleClickSave={this.handleClickSave }
			/>
		);

	}
}



export default withRouter(PostArticle)
