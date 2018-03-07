import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.scss';

export default class Homepage extends React.Component {

	render() {
		const homenav = [
			{
				title: '博客',
				icon: 'icon-bokexinwen',
				path: '/blog'
			},
			{
				title: '个人简历',
				icon: 'icon-gerenjianli',
				path: '/resume'
			},

			{
				title: '音乐',
				icon: 'icon-yinle',
				path: '/music'
			},
			{
				title: '留言区',
				icon: 'icon-liuyanpinglun',
				path: '/message'
			},
			{
				title: '后台管理',
				icon: 'icon-guanli',
				path: '/admin'
			}
		];
		return (
			<div className='homepage'>
				<div className='homepage-nav'>
					{homenav.map(v => (
						<div key={v.path} className='navlink-wrap'>
							<div className='navlink-con'>
								<Link
									to={v.path}
									className='navlink-item item1'
								>
									<div className='navlink-icon'>
										<i className={`iconfont ${v.icon}`}></i>
										<span>{v.title}</span>
									</div>
								</Link>
								<Link
									to={v.path}
									className='navlink-item item2'
								>
									<div className='navlink-icon'>
										<i className={`iconfont ${v.icon}`}></i>
										<span>{v.title}</span>
									</div>
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}