import React from 'react';
import { Button } from 'antd';

import './editMessageList.scss';

export default class EditMessageList extends React.Component {

	render() {
		if( this.props.messagelist.length === 0){
			return (
				<div>暂无留言！</div>
			)
		}
		return (
			<ul className='edit-message'>
				{this.props.messagelist.map( (v, i) =>(
					<li key={i}>
						<div className='edit-message-item'>
							<span>发表自：{v.username}</span>
							<span>时间： {v.date}</span>
							<span>内容： {v.content}</span>
							<span>联系方式：{v.contact}</span>
						</div>
						<Button type='primary' onClick={() => this.props.handleClickDel(v._id)}>删除</Button>
					</li>
				))}
			</ul>
		);
	}
}