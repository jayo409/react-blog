import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class AuthRoute extends React.Component{
	componentDidMount(){
		axios.get('/user/info')
			.then(res =>{
				if( res.status === 200 ){
					if( res.data.code === 0 ){
						return null
					} else {
						this.props.history.push('/signin')
					}
				} 
			})
	}
	render(){
		return null
	}
}

export default withRouter(AuthRoute)