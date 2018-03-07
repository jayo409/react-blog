import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import './editArticleList.scss';

class EditArticleList extends React.Component{

	handleClickDel(id){
		this.props.handleClickDel(id)
	}
	
	render(){
		if(this.props.articlelist.length === 0) {
			return <div>暂无文章可编辑。</div>
		}
		return (
		
			<ul className='edit-article-list'>
				{this.props.articlelist.map( (v) => (
					<li key={v._id} className='edit-article-item'>
						<span className='edit-article-title'>{v.title}</span>
						<Button type="primary" ><Link to={'/admin/updateArticle/'+ v._id}>编辑</Link></Button>
						<Button type="primary" onClick={ () => this.handleClickDel(v._id)}>删除</Button>
						<Button type="primary"><Link to={'/blog/article/'+ v._id}>查看</Link></Button>
					</li>
				))}
			</ul>
		
		)
	}
}

export default EditArticleList