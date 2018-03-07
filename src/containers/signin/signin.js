import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import AuthRoute from '../../components/authRoute/authRoute';
import { errorMsg, signin, clearMsg } from '../../actions/actions';

import './signin.scss';

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			account: '',
			password: ''
		}
	}
	register = () =>{
		this.props.history.push('/register');
	}
	signin = () =>{
		const { account, password } = this.state;
		if (!account || !password) {
			return this.props.errorMsg('账号或密码为空!');
		}
		this.props.signin({ account, password });
	}
	handleChange(key, v) {
		this.setState({
			[key]: v.target.value
		})
	}
	clearMsg = () => {
		if (this.props.msg) {
			this.props.clearMsg();
		}
	}
	render() {
		return (
			[
				<AuthRoute key='authRoute'/>,
				<div className='container-signin' onClick={this.clearMsg} key='container-signin'>
					{this.props.redirectTo ? <Redirect to='/admin' /> : null}
					<form className='signin'>
						<input placeholder='用户名' onChange={v => this.handleChange('account', v)} className='signin-input'></input>
						<input placeholder='密码' onChange={v => this.handleChange('password', v)} className='signin-input' type='password'></input>
						{this.props.msg ? <p className='signin-msg'>{this.props.msg}</p> : null}
						<div className='signin-btn'>
							<button type='button' onClick={this.signin}>登陆</button>
							<button type='button' onClick={this.register}>注册</button>
						</div>
					</form>
				</div>
			]
		)
}
}

function mapStateToProps(state) {
	return {
		msg: state.user.msg,
		redirectTo: state.user.redirectTo
	}
}

function mapDispatchToProps(dispatch) {
	return {
		errorMsg: (...text) => dispatch(errorMsg(...text)),
		signin: (...text) => dispatch(signin(...text)),
		clearMsg: () => dispatch(clearMsg())
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));