import React, { Component } from 'react';
import Items from './Items';
class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      };
    }
  render() {
  	const items = this.props.items;
	const elmItem = items.map((item, index) =>{
		return (
			<Items key={index} 
			onClickEdit= {this.props.onClickEdit}
			onClickDelete={this.props.onClickDelete} 
			index={index} item={item}
			/>
			);
	});
	return (
		<div className="panel panel-info">
			<div className="panel-heading">Task list
			</div>
			<table className="table table-hover">
				<thead>
					<tr>
						<th style={{width: '10%'}} className="text-center">#</th>
						<th>Task</th>
						<th style={{width: '20%'}} className="text-center">Level</th>
						<th style={{width: '20%'}}>Action</th>
					</tr>
				</thead>
				<tbody>
					{elmItem}
				</tbody>
			</table>
		</div>
		);
	}
}
export default List;