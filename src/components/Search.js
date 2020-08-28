import React, { Component } from 'react';
class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
    	strSearch :'',
      };
    }
     handleChange = (event) => {
      event.preventDefault();
      this.setState({strSearch: event.target.value});
      
    }
    handleSearch = (e) =>{ 
      e.preventDefault();
    	this.props.onClickGo(this.state.strSearch);
    }
    handleClear = (e) => {
      e.preventDefault();
      this.setState({strSearch: ''});
    	this.props.onClickGo('');
    }
  render() {
	return (
		<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
			<div className="input-group">
				<input value={this.state.strSearch} onChange={this.handleChange} type="text" className="form-control" placeholder="Search for.." />
				<span className="input-group-btn">
          <button type="button" onClick={this.handleSearch} className="btn btn-info">Search</button>
				  <button type="button" onClick={this.handleClear} className="btn btn-warning">Clear</button>
        </span>
			</div>
		</div>
		);
	}
}
export default Search;