import React from 'react';
import { connect } from 'react-redux';

import MessageList from '../../components/messagelist/messagelist';
import MessagePost from '../../components/messagepost/messagepost';
import { getMessage, postMessage } from '../../actions/actions';

import './message.scss';

class Message extends React.Component {

	componentWillMount() {
		this.props.getMessage();
	}

	render() {
		return (
			[
				<div className='blog-bg' key='blog-bg'></div>,
				<div className='container-message' key='container-message'>
					<MessageList messagelist={this.props.messageList}/>
					<MessagePost postMessage={this.props.postMessage}/>
				</div>
			]
		);
	}
}

const mapStateToProps = (state) =>{
	return {
		messageList: state.message
	}
}
const mapDispatchToProps = (dispatch) =>{
	return {
		getMessage: () => dispatch(getMessage()),
		postMessage: (value) => dispatch(postMessage(value))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Message)