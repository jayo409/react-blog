import React from 'react';

import './categoryList.scss';

class CategoryList extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			select: '全部'
		}
	}

	handleClickSelect(v){
		this.setState({
			select: v
		})
		this.props.handleClickSelect(v);
	}

	render() {
		return (
			<ul className='categoryList'>
				{ this.props.categorylist.map( (v, i)=>(
					<li key={i} 
						onClick={() => this.handleClickSelect(v)} 
						className={ this.state.select === v ? 'ac' : null }
					>{v}</li>
				))}
			</ul>
		);
	}
}

export default CategoryList
