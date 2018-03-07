import React from 'react';

import './musicPlayer.scss';

export default class MusicPlayer extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isPlay: false,
			currentTime: '',
			allTime: '',
			isMuted: false,
			volume: 100,
			volumeDisplay: false
		}
	}

	controlAudio(type, value){
		let audio = this.audio;
		switch(type){
			case 'play':
				audio.play();
				this.setState({
					isPlay: true
				})
				break;
			case 'pause':
				audio.pause()
				this.setState({
					isPlay: false
				})
				break;
			case 'allTime':
				this.setState({
					allTime: audio.duration
				});
				break;
			case 'changeCurrentTime':
				this.setState({
					currentTime: value.target.value
				})
				audio.currentTime = value.target.value;
				if(value === audio.duration) {
					this.setState({
						isPlay: false
					})
				}
				break;
			case 'getCurrentTime':
				this.setState({
					currentTime: audio.currentTime
				})
				if(audio.currentTime === audio.duration) {
					this.setState({
						isPlay: false
					})
				}
				break;
			case 'changeVolume':
				audio.volume = value.target.value / 100
				this.setState({
					volume: value.target.value,
					isMuted: !value.target.value
				})
				break;
			default:
				return;		
		}
	}

	handleEnded = () => {
		console.log(1);
	}

	handleMouseVolume = () =>{
		this.setState({
			volumeDisplay: this.state.volumeDisplay ? false : true
		})
	}
	handleClickChange(id){
		this.setState({
			isPlay: false
		})	
		this.props.handleClickChange(id);

	}

	_millisecondToDate(time) {
		const second = Math.floor(time % 60)
		let minite = Math.floor(time / 60)
		return `${minite}:${second >= 10 ? second : `0${second}`}`
	}

	render() {
		const { isPlay, currentTime, allTime, isMuted, volume, volumeDisplay } = this.state;
		const { musicList, currentMusic } = this.props;
		if( musicList.length === 0 || currentMusic === undefined){
			return <div  className='container-music'>暂无歌曲！</div>
		}
		return (
			<div className='container-music'>
				<audio 
					src={ currentMusic.content }
					ref={ ref => this.audio = ref }
					onCanPlay={() => this.controlAudio('allTime')}
					onTimeUpdate={(e) => this.controlAudio('getCurrentTime')}
					onEnded={this.handleEnded}
				/>
				<div className='music-player'>
					<img className={`music-avatar ${isPlay ? 'rotate' : null}`} src={currentMusic.cover} alt=''/>
					<div className='music-title'>
						{currentMusic.title}
					</div>
					<div className='music-author'>
						{currentMusic.author}
					</div>
					<div className='music-row'>
						<span className="music-current">
							{this._millisecondToDate(currentTime)+'/'+this._millisecondToDate(allTime)}
						</span>
						<div className='music-volume' onMouseOver={ this.handleMouseVolume } onMouseOut={ () => this.handleMouseVolume()}>
							<i className={ volume > 66 ? 'iconfont icon-yinliang3' : ( volume > 33 ? 'iconfont icon-yinliang2' : 'iconfont icon-yinliang1') } />
							<input
								type="range"
								onChange={(value) => this.controlAudio('changeVolume',value)}
								value={isMuted ? 0 : volume}
								style={ volumeDisplay ? { opacity: '100'} : {opacity: '0'}}
							/>
						</div>
					</div>
					<input 
						type="range" 
						className="music-time"
						step="0.01" 
						max={allTime}     
						value={currentTime ? currentTime : 0}
						onChange={(value) => this.controlAudio('changeCurrentTime',value)}
					/>
					<div className='music-row'>
						<div className='music-lbtn'><i className='iconfont icon-xiangzuo' /></div>
						<div 
							onClick={() => this.controlAudio(isPlay ? 'pause' : 'play')} 
							className='music-playbtn'
						>
							<i 
								className={`iconfont ${isPlay ? 'icon-zanting' : 'icon-bofang'}`  }
							/>
						</div>
						<div className='music-rbtn'><i className='iconfont icon-xiangyou' /></div>
					</div>
				</div>
				<div className='music-list'>
					<div className='music-list-top'>
						私人歌单:
					</div>
					{musicList.map( (v,i) =>(
						<div className='music-item' key={i} onClick={() =>this.handleClickChange(i)}>
							<span>{v.title}</span>
							<span>-{v.author}</span>
						</div>
					))}
				</div>
			</div>
		);
	}
}