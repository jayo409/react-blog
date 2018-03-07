import React from 'react';
import axios from 'axios';
import { Input, Row, Col, Select, Button  } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';

import './articleEditor.scss';

const Option = Select.Option;
class ArticleEditor extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			title: this.props.title,
			category: this.props.category,
			content: this.props.content,
			abstract: this.props.abstract
		}
	}
	componentWillUnmount(){ 
		this.setState = (state,callback)=>{
		  return;
		};  
	}

	handleChange(key, v){
		this.setState({
			[key]: v.target ? v.target.value : v
		})
	}
	handleClickSave = () =>{
		this.props.handleClickSave(this.state);
	}

	render() {
		const uploadFn = (param) => {
			const fd = new FormData();
			fd.append('image', param.file);
			const successFn = (res) => {
				param.success({
					url: res.data.URL
				})
			}
			const progressFn = (event) => {
				param.progress(event.loaded / event.total * 100)
			}
			axios.post('/article/uploadImg', fd, progressFn)
				.then((res)=>{
					successFn(res);
				})
		}
		const editorProps = {
			onHTMLChange: v => this.handleChange('content', v),
			controls: [
				'undo', 'redo', 'split', 'font-size', 'font-family', 'text-color',
				'bold', 'italic', 'underline', 'strike-through', 'superscript',
				'subscript', 'text-align', 'split', 'headings', 'list_ul', 'list_ol',
				'blockquote', 'code','split', 'link', 'split', 'media'
			],
			viewWrapper: '.braft-editor',
			media: {
				image: true,
				validateFn: null,
				uploadFn: v => uploadFn(v) 
			},
			contentFormat: 'html',
			initialContent: this.props.content
    	}
		return (
			<div className='article-editor'>
				<Row>
					<Col span={16}>
						<Input placeholder='文章标题' onChange={v => this.handleChange('title', v)} defaultValue={this.props.title} />
					</Col>
					<Col span={3} offset={1}>
						<Select defaultValue={this.props.category} className='article-category' onChange={ v => this.handleChange('category', v)}>
							<Option value="javasrcipt">javasrcipt</Option>
							<Option value="css">css</Option>
							<Option value="html">html</Option>
							<Option value="nodejs">nodejs</Option>
							<Option value="React">React</Option>
							<Option value="杂记">杂记</Option>
							<Option value="转载">转载</Option>
						</Select>
					</Col>
				</Row>
				<Row style={{'marginTop': '20px'}}>
					<Col span={16}>
						<Input placeholder='文章摘要' onChange={v => this.handleChange('abstract', v)} defaultValue={this.props.abstract} />
					</Col>
					<Col span={1} offset={2}>
						<Button type="primary" onClick={this.handleClickSave }>保存</Button>
					</Col>
				</Row>
				<div className='braft-editor'>
					<BraftEditor {...editorProps} />
				</div>
			</div>
		);
	}
}

export default ArticleEditor
