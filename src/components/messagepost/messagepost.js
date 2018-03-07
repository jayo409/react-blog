import React from 'react';

import './messagepost.scss';

class MessagePost extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			username: '',
			contact: '',
			content: ''
		}
	}

	handleChange(v, key){
		this.setState({
			[key]: v.target.value
		})
	}

	handleClickPost = () =>{
		if( this.state.username === '' || this.state.contact === '' || this.state.content === ''){
			return alert('内容还未填写！');
		}
		if( this.state.content.length > 180 ){
			return alert('留言最大180个字符！');
		}
		if( this.state.username.length > 10 ){
			return alert('用户名最大10个字符！');
		}
		if( this.state.contact.length > 50 ){
			return alert('联系方式最大50个字符！');
		}
		this.props.postMessage(this.state);
		this.setState({
			username: '',
			contact: '',
			content: ''			
		})
	}

	render(){
		return (
			<div className='message-post'>
				<div className='message-edit'>
					<div className='message-username'>
						<span>发表用户名：</span>
						<input type="text" onChange={ (v) => this.handleChange(v, 'username') } value={this.state.username} />
					</div>
					<div className='message-contact'>
						<span>联系方式(只显示给博主)：</span>
						<input type="text" onChange={ (v) => this.handleChange(v, 'contact') } value={this.state.contact} />
					</div>
					<textarea className='message-content' onChange={ (v) => this.handleChange(v, 'content') } value={this.state.content} placeholder='在此输入留言，最大180个字符。'></textarea>
				</div>
				<button className='message-btn' onClick={this.handleClickPost}>发表</button>
			</div>
		)
	}
}

export default MessagePost