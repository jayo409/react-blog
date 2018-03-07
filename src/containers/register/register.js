import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { errorMsg, register, clearMsg } from '../../actions/actions';

import './register.scss';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			account: '',
			password: '',
			repassword: ''
		}
	}
	handleChange(key, v) {
		this.setState({
			[key]: v.target.value
		})
	}
	handleBack = () =>{
		this.props.history.push('signin');
	}
	handleRegister = () =>{
		const { account, password, repassword } = this.state;
		const uPattern = /^[a-zA-Z0-9_]{6,16}$/;
		const pPattern = /^[a-zA-Z0-9_]{6,16}$/;

		if (!account || !password || !repassword) {
			return this.props.errorMsg('注册信息不能为空!');
		}
		if (!uPattern.test(account)) {
			return this.props.errorMsg('Account number is not required!');
		}
		if (repassword !== password) {
			return this.props.errorMsg('Confirm the inconsistency of ciphers!');
		}
		if (!pPattern.test(password)) {
			return this.props.errorMsg('Password undesirable!');
		}
		this.props.register(this.state)
	}
	clearMsg() {
		if (this.props.msg) {
			this.props.clearMsg();
		}
	}
	render() {
		return (
			<div className='container-register' onClick={this.clearMsg.bind(this)}>
				{this.props.redirectTo ? <Redirect to={'/admin'}/> : null}
				<form className='register'>
					{this.props.msg ? <p className='register-msg'>{this.props.msg}</p> : null}
					<input type='text' className='register-input' placeholder='注册账号' onChange={v => this.handleChange('account', v)}></input>
					<input type='password' className='register-input' placeholder='注册密码' onChange={v => this.handleChange('password', v)}></input>
					<input type='password' className='register-input' placeholder='再输入密码' onChange={v => this.handleChange('repassword', v)}></input>
					<div className='register-btn'>
						<button type='button' onClick={this.handleBack}>后退</button>
						<button type='button' onClick={this.handleRegister}>注册</button>
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		msg: state.user.msg,
		redirectTo: state.user.redirectTo
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		register: (...text) => dispatch(register(...text)),
		errorMsg: (...text) => dispatch(errorMsg(...text)),
		clearMsg: () => dispatch(clearMsg())
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);;


