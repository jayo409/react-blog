import React from 'react';

import './messagelist.scss';

class MessageList extends React.Component {

	render() {
		if( this.props.messagelist.length === 0 ){
			return (
				<div>暂无留言！</div>
			)
		}
		return (
			<ul className='message-list'>
				{ this.props.messagelist.map( (v, i) =>(
					<li key={i}>
						<p>{v.content}</p>
						<div >
							<span>来自于：{v.username}</span>
							<span>发表时间：{v.date}</span>
						</div>
					</li>
				))}
			</ul>
		);
	}
}

export default MessageList
