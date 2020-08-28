import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';
class Control extends Component {
 
    handleAdd = () => {
    	this.props.onClickAdd();
    }
  	render() {
	  	let {orderBy, orderDir} =this.props;
	  	let elmBtnAdd = <button onClick={this.handleAdd} type="button" className="btn btn-info btn-block">Add Task</button>;
	  	 if(this.props.isShowForm === true)
  		 {
  		 	elmBtnAdd = <button onClick={this.handleAdd} type="button" className="btn btn-warning btn-block">Close Add</button>;
  		 }
		return (
		<div className="row">
			{/*Search*/}
				<Search onClickGo = {this.props.onClickSearchGo} />
			{/*search end*/}

			{/*sort start*/}
				<Sort 
				onClickSort = {this.props.onClickSort}
				orderBy = {orderBy}
				orderDir = {orderDir}
				/>
			{/*Sort end*/}

			{/*Add start*/}
			<div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				{ elmBtnAdd }
			{/*Add end*/}
				</div>
		</div>
		);
	}
}
	
export default Control;