import React from 'react';
import { withRouter, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Avatar } from 'antd';
import axios from 'axios';

import { getUserInfo } from '../../actions/actions';
import PostArticle from './subpage/postArticle';
import EditArticle from './subpage/editArticle';
import EditUser from './subpage/editUser';
import UpdateArticle from './subpage/updateArticle';
import EditMessage from './subpage/editMessage';
import EditMusic from './subpage/editMusic';

import './admin.scss';

const { Sider, Header, Content } = Layout;

class Admin extends React.Component {
	state = {
		collapsed: false,
	};
	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	}

	componentWillMount() {
		axios.get('/user/info')
			.then(res =>{
				if( res.status === 200 && res.data.code === 0){
						return null
				} else {
						this.props.history.push('/signin')
					}
				}
			)
		this.props.getUserInfo();
	}

	render() {
		const location = this.props.location.pathname;
		return (
			<Layout style={{ minHeight: '100vh' }} key='layout'>
				<Sider
          			trigger={null}
          			collapsible
          			collapsed={this.state.collapsed}
				>
				    <Menu theme="dark" mode="inline" selectedKeys={[location]} >
				        <Menu.Item key='/'>
				        	<Link to='/'>
				            	<Icon type="home" />
				            	<span>网站首页</span>
				            </Link>
				        </Menu.Item>
				        <Menu.Item key='/admin'>
				        	<Link to='/admin'>
								<Icon type="user" />
								<span>用户管理</span>
							</Link>
				        </Menu.Item>
				        <Menu.Item key='/admin/postArticle'>
				        	<Link to='/admin/postArticle'>
								<Icon type="file-add" />
								<span>文章发表</span>
							</Link>
				        </Menu.Item>
				        <Menu.Item key='/admin/editArticle'>
				        	<Link to='/admin/editArticle'>
				            	<Icon type="edit" />
				            	<span>文章管理</span>
				            </Link>
				        </Menu.Item>
				        <Menu.Item key='/admin/editMessage'>
				        	<Link to='/admin/editMessage'>
				            	<Icon type="tool" />
				            	<span>留言管理</span>
				            </Link>
				        </Menu.Item>
				         <Menu.Item key='/admin/editMusic'>
				        	<Link to='/admin/editMusic'>
				            	<Icon type="play-circle-o" />
				            	<span>音乐管理</span>
				            </Link>
				        </Menu.Item>
				    </Menu>
				</Sider>
				<Layout>
				    <Header style={{ background: '#fff', padding: 0 }} className='admin-header'>
          				<Icon
          				  className="trigger"
          				  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
          				  onClick={this.toggle}
          				/>
          				<Avatar 
							src={this.props.user.avatar ? this.props.user.avatar : require('../../static/images/avatar.jpg')}
							className='user-avatar'
							size='large'
          				/>
          			</Header>
          			<Content style={{ margin: '16px' }}>
						<Switch>
							<Route path={`${this.props.match.url}/`} exact component={EditUser} />
							<Route path={`${this.props.match.url}/postArticle`} component={PostArticle} />
							<Route path={`${this.props.match.url}/editArticle`} component={EditArticle} />
							<Route path={`${this.props.match.url}/updateArticle/:name`} component={UpdateArticle} />
							<Route path={`${this.props.match.url}/editMessage`} component={EditMessage} />
							<Route path={`${this.props.match.url}/editMusic`} component={EditMusic} />
						</Switch>
					</Content>
				</Layout>
			</Layout>
			
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) =>{
	return {
		getUserInfo: () => dispatch(getUserInfo())
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin))
