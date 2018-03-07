import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import UploadMusic from '../../../components/uploadMusic/uploadMusic';
import EditMusicList from '../../../components/editMusicList/editMusicList';
import { getMusicList } from '../../../actions/actions';

class EditMusic extends React.Component {

	componentWillMount() {
		this.props.getMusicList();
	}

	handleClickSave = (value) =>{
		const { title, author, cover, content } = value;
		axios.post('/music/addMusic', { title, author, cover, content })
			.then( res =>{
				if( res.status === 200 && res.data.code === 0 ){
					alert('上传成功！');
				}
			})
			.then( () =>{
				this.props.history.replace('/music');
			})
	}
	
	handleClickDel = (id) =>{
		axios.post('/music/delMusic', { id })
			.then( res =>{
				if( res.status === 200 && res.data.code === 0 ){
					this.props.getMusicList();
				}
			})
	}

	render() {
		return (
			[
				<UploadMusic 
					key='uploadMuisc'
					handleClickSave={ this.handleClickSave }
				/>,
				<EditMusicList 
					key='editMuiscList'
					musicList={this.props.musicList}
					handleClickDel={this.handleClickDel}
				/>
			]
		);
	}
}

const mapStateToProps = (state) => {
	return {
		musicList: state.music.musicList
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getMusicList: () => dispatch(getMusicList())
	}
}

export default connect(mapStateToProps, mapDispatchToProps )(EditMusic)