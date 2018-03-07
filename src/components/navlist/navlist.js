import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './navlist.scss';

class Navlist extends React.Component{
    
    render(){
		const navlist = [
            {
                title: '首页',
                icon: 'icon-home',
                path: '/'
            },
			{
				title: '博客',
				icon: 'icon-bokexinwen',
				path: '/blog'
			},

			{
				title: '音乐',
				icon: 'icon-yinle',
				path: '/music'
			},
			{
				title: '留言',
				icon: 'icon-liuyanpinglun',
				path: '/message'
			},			
			{
				title: '简历',
				icon: 'icon-gerenjianli',
				path: '/resume'
			},
			{
				title: '管理',
				icon: 'icon-guanli',
				path: '/admin'
			}
        ];
        return (
            <nav className='navlist'>
                {
                    navlist.map( v => (
                        <Link
                            to={v.path}
                            className={ `navlink iconfont ${v.icon} ${this.props.match.url === v.path ? 'ac' : null}`}
                            key={v.path}
                        >
                        <span>{v.title}</span>
                        </Link>
                    ))
                }
            </nav>
        )
    }
}

export default withRouter(Navlist)