import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import EditUserPage from '../../../components/editUserPage/editUserPage';

class EditUser extends React.Component {

	handleClickSave(obj, key){
		if( key === 'password'){
			const { oldpassword, newpassword, repassword } = obj;
			const pPattern = /^[a-zA-Z0-9_]{6,16}$/;
			if( repassword === '' || newpassword === ''|| oldpassword === ''){
				return alert('内容不能为空！');
			}
			if( newpassword !== repassword ){
				return alert('两次密码输入不一致！');
			}
			if (!pPattern.test(newpassword)) {
				return alert('密码不规范！');
			}
			axios.post('/user/updatePwd', {oldpassword, newpassword})
				.then( res =>{
					if( res.status === 200 ){
						if( res.data.code === 0){
							alert('修改成功！');
						} else {
							alert('旧密码输入不正确！');
						}
					}
				})
				.then( () =>{
					this.props.history.replace();
				})
		} else {
			const value = obj[key];
			console.log(value)
			axios.post(`/user/update${key}`, {value})
				.then( res =>{
					if(res.status === 200 ){
						if( res.data.code === 0){
							alert('修改成功！');
						}
					}
				})
				.then( () =>{
					window.location.reload();
				})
		}
	}

	render() {
		if( this.props.user._id == null ){
			return null;
		}
		return (
			<EditUserPage
				avatar={this.props.user.avatar || require('../../../static/images/avatar.jpg')}
				username={this.props.user.username || ''}
				handleClickSave={(obj, key) => this.handleClickSave(obj, key)}
			></EditUserPage>
		);
	}
}

const mapStateToProps = (state) =>{
	return {
		user: state.user
	}
}

export default withRouter(connect(mapStateToProps)(EditUser))
