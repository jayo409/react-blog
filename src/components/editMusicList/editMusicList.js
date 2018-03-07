import React from 'react';
import { Button } from 'antd';

import './editMusicList.scss';

class EditMuiscList extends React.Component {

	handleClickDel(id){
		this.props.handleClickDel(id);
	}

    render() {
    	console.log('render渲染');
    	if( this.props.musicList.length === 0 ){
    		return (
				<div>暂无歌曲!</div>
    		)
    	}
        return (
			<ul className='edit-music-list'>
				{this.props.musicList.map( (v, i) =>(
					<li key={i} className='edit-music-item'>
						<div className='edit-music-col'>
							<div>歌曲名：{v.title}</div>
							<div>歌手名：{v.author}</div>
						</div>
						<span>封面图：</span>
						<div className='edit-music-col' >
							<img src={v.cover} alt="" />
						</div>
						<Button type="primary" className='edit-music-btn' onClick={ () => this.handleClickDel(v._id)}>删除</Button>
					</li>
				))}
			</ul>
        );
    }

}

export default EditMuiscList;