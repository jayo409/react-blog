import React from 'react';
import { connect } from 'react-redux';

import { getMessage, delMessage } from '../../../actions/actions';
import EditMessageList from '../../../components/editMessageList/editMessageList';

class EditMessage extends React.Component{

	componentWillMount() {
		this.props.getMessage();
	}

	handleClickDel(id){
		this.props.delMessage(id);
	}

	render(){
		return (
			<EditMessageList 
				messagelist={this.props.messagelist}
				handleClickDel={ (id) =>this.handleClickDel(id)}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		messagelist: state.message,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getMessage: () => dispatch(getMessage()),
		delMessage: (id) => dispatch(delMessage(id))
	}
}


export default connect(mapStateToProps, mapDispatchToProps )(EditMessage)