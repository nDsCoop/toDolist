import React, { Component } from 'react';
class Sort extends Component {
  constructor(props){
    super(props);
    this.state = {
      };
      this.handleSort = this.handleSort.bind(this);
    }
    handleSort(orderBy, orderDir){
    	this.props.onClickSort(orderBy, orderDir);
    }
  render() {
  	let {orderBy, orderDir} = this.props;
  	let strSort = orderBy +"-" + orderDir;
	return (
		<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
			<div className="dropdown">
				<button type="button" className="btn btn-default dropdown-toggle" aria-expanded="true" aria-haspopup="true" data-toggle="dropdown" id="dropdownMenu1">
					Sort by <span className="caret" />
				</button>
				<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
					<li><a onClick={() =>this.handleSort('Name','ASC')} href="/#" role="button">Name ASC</a></li>
					<li><a  onClick={() =>this.handleSort('Name','DESC')} href="/#" role="button">Name DESC</a></li>
					<li role="separator" className="divider" />
					<li><a  onClick={() => this.handleSort('Level','ASC')} href="/#"  role="button">Level ASC</a></li>
					<li><a  onClick={() => this.handleSort('Level','DESC')} href="/#" role="button">Level DESC</a></li>
				</ul>
			</div>
			<span className="label label-primary label-medium">{strSort}</span>
		</div>
		);
	}
}
export default Sort