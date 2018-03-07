import React from 'react';
import { Upload, Icon, message, Input, Button } from 'antd';

import './editUserPage.scss';

function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

function beforeUpload(file) {
	const isJPG = file.type === 'image/jpeg';
	if (!isJPG) {
		message.error('You can only upload JPG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!');
	}
	return isJPG && isLt2M;
}
class EditUserPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			loading: false,
			avatar: '',
			username: '0',
			oldpassword: '0',
			newpassword: '0',
			repassword: ''
		};
	}

	handleChange(key, v){
		this.setState({
			[key]: v.target.value
		})

	}

	handleClickSave(key){
		this.props.handleClickSave(this.state, key)
	}

	handleChangeImg = (info) => {
		console.log(info)
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, avatar => this.setState({
				avatar: info.file.response.URL,
				loading: false,
			}));
   		}
	}
	render(){
    	const uploadButton = (
    		<div>
    			<Icon type={this.state.loading ? 'loading' : 'plus'} />
    			<div className="ant-upload-text">Upload</div>
    		</div>
    	);
    	const avatar = this.state.avatar;
		return (
			<div className='container-editUser'>
				<div className='avatar-edit'>
					<span className='avatar-edit-title'>编辑头像</span>
					<div className='avatar-edit-content'>
						<span style={{'marginRight': '30px'}}>原本头像:</span>
						<img src={ this.props.avatar } alt="" className='avatar-edit-default' />
						<span style={{'marginLeft': '30px'}}>上传新头像:</span>
						<Upload
    						name="image"
    						listType="picture-card"
    						className="avatar-uploader"
    						showUploadList={false}
    						action="/user/uploadImg"
    						beforeUpload={beforeUpload}
    						onChange={this.handleChangeImg}
    					>
    						{avatar ? <img src={avatar} alt="" /> : uploadButton}
    					</Upload>
    					<Button type="primary" className='edit-btn' onClick={() => this.handleClickSave('avatar')}>保存</Button>
					</div>
					
				</div>
				<div className='username-edit'>
					<span>编辑用户名</span>
					<div className='username-edit-content'>
						<span>原用户名:</span>
						<span style={{'marginLeft': '10px'}}>{this.props.username}</span>
						<span style={{'margin': '0 10px 0 30px'}}>修改用户名: </span>
						<Input className='username-edit-input' onChange={(v) => this.handleChange('username', v)}/>
						<Button type="primary" className='edit-btn' onClick={() => this.handleClickSave('username')}>保存</Button>
					</div>
				</div>
				<div className='password-edit'>
					<span>编辑用户名</span>
					<div className='password-edit-content'>
						<span style={{'margin': '0 10px 0 0'}}>输入旧密码:</span>
						<Input className='password-edit-input' type='password' onChange={(v) => this.handleChange('oldpassword', v)}/>
						<span style={{'margin': '0 10px 0 30px'}}>输入新密码: </span>
						<Input className='password-edit-input' type='password' onChange={(v) => this.handleChange('newpassword', v)}/>
						<span style={{'margin': '0 10px 0 30px'}}>核对新密码: </span>
						<Input className='password-edit-input' type='password' onChange={(v) => this.handleChange('repassword', v)}/>
						<Button type="primary" className='edit-btn' onClick={() => this.handleClickSave('password')}>保存</Button>
					</div>
				</div>

			</div>
		)
	}
}

export default EditUserPage