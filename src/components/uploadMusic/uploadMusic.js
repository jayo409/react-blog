import React from 'react';
import { Row, Col, Input, Upload, message, Icon, Button } from 'antd';

import './uploadMusic.scss';

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

class UploadMuisc extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			title: '',
			author: '',
			cover: '',
			content: '',
		};
	}

	handleChangeImg = (info) => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, cover => this.setState({
				cover: info.file.response.URL,
				loading: false,
			}));
   		}
	}

	handleChange(v, key){
		this.setState({
			[key]: v.target.value
		})
	}

	handleClickSave = () =>{
		const {title, author, cover, content} = this.state;
		if( title === '' || author === '' || cover === '' || content === ''){
			return alert('内容不能为空！');
		}
		this.props.handleClickSave(this.state);
	}

    render() {
    	const uploadButton = (
    		<div>
    			<Icon type={this.state.loading ? 'loading' : 'plus'} />
    			<div className="ant-upload-text">Upload</div>
    		</div>
    	);
    	const { cover } = this.state;
		const props = {
			name: 'music',
			action: '/music/uploadMusic',
			headers: {
				authorization: 'authorization-text',
			},
			onChange: (info)=> {
				if (info.file.status !== 'uploading') {
					console.log(info.file, info.fileList);
				}
				if (info.file.status === 'done') {
					this.setState({
						content: info.file.response.URL
					})
					message.success(`${info.file.name} file uploaded successfully`);
				} else if (info.file.status === 'error') {
					message.error(`${info.file.name} file upload failed.`);
				}
			},
		};

        return (
            <div className='music-upload'>
				<Row>
					<Col span={4} >
						<div>
							<span>歌曲名：</span>
							<Input onChange={ (v) => this.handleChange(v, 'title')}></Input>
						</div>
						<div style={{'marginTop': '30px'}}>
							<span>歌手名：</span>
							<Input onChange={ (v) => this.handleChange(v, 'author')}></Input>
						</div>
					</Col>
					<Col span={4} offset={2} >
						<div>
							<div style={{'marginBottom': '20px'}}>上传封面：</div>
							<Upload
    							name="image"
    							listType="picture-card"
    							className="cover-uploader"
    							showUploadList={false}
    							action="/music/uploadImg"
    							beforeUpload={beforeUpload}
    							onChange={this.handleChangeImg}
    						>
    							{cover ? <img src={cover} alt="" /> : uploadButton}
    						</Upload>
						</div>
					</Col>
					<Col span={4} offset={1} >
						<div>
							<div style={{marginBottom: '30px'}}>上传音乐文件：</div>
							<Upload {...props}>
								<Button>
									<Icon type="upload" /> Click to Upload
								</Button>
							</Upload>
						</div>
					</Col>
					<Button 
						className='music-upload-btn' 
						type="primary" 
						onClick={this.handleClickSave }
					>保存</Button>						
				</Row>
            </div>
        );
    }
}

export default UploadMuisc;
