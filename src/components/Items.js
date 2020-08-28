import React, { Component } from 'react';
class Items extends Component {
	constructor(props){
		super(props);
		this.state = {
		};
	}
	handleDelete = (id) => {
		this.props.onClickDelete(id);
	}
	handleEdit = (item) => {
		this.props.onClickEdit(item);
	}
  	render() {
  	const {index} = this.props;
  	const item = this.props.item; // cách 2 const {item} = this.props;
	return (
		<tr>
			<td style={{padding: '15px'}} className="text-center">{index + 1}</td>
			<td style={{padding: '15px'}}>{item.name}</td>
			<td style={{padding: '15px'}} className="text-center">{this.showelmLevel(item.level)}</td>
			<td>
			<button type="button" onClick = {() => this.handleEdit(item)}  className="btn btn-warning">Edit</button>
			<button type="button" onClick = {() => this.handleDelete(item.id)} className="btn btn-danger">Delete</button>
			</td>
		</tr>	
		);
	}

showelmLevel(level){
		let elmLevel = <span className="label label-default">Small</span>; 
		if(level === 1){
			elmLevel = <span className="label label-warning">Medium</span>;
		}else if(level === 2){
			elmLevel = <span className="label label-danger">High</span>;
		}
		return elmLevel;
	}
}
export default Items;