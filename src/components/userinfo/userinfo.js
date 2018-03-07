import React from 'react';

import './userinfo.scss';

class UserInfo extends React.Component {

	render() {
		return (
			<div className='userinfo'>
				<img src={this.props.avatar} alt="" />
				<span>{this.props.username}</span>
			</div>
		);
	}
}

export default UserInfo
