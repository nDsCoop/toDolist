import React, { Component } from 'react';
import './App.css';
import Title from './components/Title';
import Control from './components/Control';
import Form from './components/Form';
import List from './components/List';
import {filter, includes, remove, orderBy as funcOrderBy, reject} from 'lodash';
const { v4: uuidv4 } = require('uuid');
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
		items     : [],
		isShowForm: false,
    	strSearch :'',
    	orderBy   :'Name',
    	orderDir  :'ASC',
    	itemSelected: null,
      };
      this.handleFormAdd = this.handleFormAdd.bind(this);
      this.closeFormAdd = this.closeFormAdd.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      this.handleSort = this.handleSort.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
    }
    UNSAFE_componentWillMount(){
    	let items = JSON.parse(localStorage.getItem('task')) || [];
    	this.setState({
    		items: items,
    	})
    }
    handleEdit = (item) => {
    	this.setState({
    		itemSelected: item,
    		isShowForm: true
    	});
    }
    handleDelete = (id) => {
    	let items = this.state.items;
    	remove(items, (item) =>{
    		return item.id === id;
    		});
    	this.setState({
    		items: items
    	});
    	localStorage.setItem('task', JSON.stringify(items));
    }
    handleSort = (orderBy , orderDir) => {
    	this.setState({
    		orderBy: orderBy,
    		orderDir: orderDir
    	});
    }
    handleFormAdd = () => {
    	this.setState({
    		itemSelected: null,
    		isShowForm: !this.state.isShowForm,
    	});
    }
    handleSubmit = (item) => {
     	let items = this.state.items;
     	let id = null;
     	if(item.id !==''){
     		items = reject(items,{id: item.id});
     		id = item.id;
     	}else{
     		id = uuidv4();
     	}
     	items.push({
     		id: id,
			name :item.name,
			level : +item.level //Lv small
     		})
     	this.setState({
    		items: items,
     		isShowForm: false
    	});
     	localStorage.setItem('task', JSON.stringify(items));

    }
    closeFormAdd(){
      this.setState({
        isShowForm: false
      });
    }
    handleSearch(value){
        this.setState({
        strSearch: value
        });
    }
  render() {
  	let itemsMain =(this.state.items !== null) ? [...this.state.items] : [];
  	let items = [];
  	let {isShowForm, orderBy, orderDir, strSearch} =this.state;
  	let elmForm = null;
  	// Search
  	items = filter(itemsMain, (item) => {
  		return includes(item.name.toLowerCase(), strSearch.toLowerCase());
  	 });
  	// Sort
  	items = funcOrderBy(items, [orderBy.toLowerCase()], [orderDir.toLowerCase()]);

  	if(isShowForm){
  		elmForm = <Form itemSelected={this.state.itemSelected} onClickSubmit={this.handleSubmit}  onClickCancel = {this.closeFormAdd}/>;
  	}
	return (
		<div className="row">
			{/*title: start*/}
				<Title />
			{/*title: end*/}

			{/*Search+Sort+Add in start*/}
				<Control
            orderBy = {orderBy}
            orderDir = {orderDir}
            onClickSort = {this.handleSort}
            onClickSearchGo = {this.handleSearch}
            isShowForm = {isShowForm}
            onClickAdd={this.handleFormAdd} />
			{/*Search+Sort+Add end*/}

			{/*Form start*/}
				{ elmForm }
			{/*form end*/}

			{/*list start*/}
				<List
				onClickEdit={this.handleEdit}
				onClickDelete = {this.handleDelete}
				 items={items}
				 />
			{/*list end*/}
		</div>
    );
  }
}
export default App;
