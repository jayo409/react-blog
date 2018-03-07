import React from 'react';
import { connect } from 'react-redux';

import { getMusicList, changeMusic } from '../../actions/actions';
import MusicPlayer from '../../components/musicPlayer/musicPlayer';

import './music.scss';

class Music extends React.Component {

	componentWillMount() {
		this.props.getMusicList();
	}
	
	handleClickChange = (id) =>{
		this.props.changeMusic(id);
	}

	render() {
		return (
				<MusicPlayer 
					musicList={this.props.musicList}
					currentMusic={this.props.musicList[this.props.id]}
					handleClickChange={this.handleClickChange}
					currentId={this.props.id}
				/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		musicList: state.music.musicList,
		id: state.music.currentMusic
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getMusicList: () => dispatch(getMusicList()),
		changeMusic: (id) => dispatch(changeMusic(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps )(Music)