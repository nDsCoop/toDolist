import React, { Component } from 'react';
import './App.css';
import Title from './components/Title';
import Control from './components/Control';
import Form from './components/Form';
import List from './components/List';
import {filter, includes, remove, orderBy as funcOrderBy, reject} from 'lodash';
import Footer from './components/Footer';
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
			{/*ins			<!-- Modal -->*/}
			<div className="instruc">
				<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
					Instruction
				</button>
				<div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLongTitle">Instruction</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
							You can add jobs at Add Task. Just enter a name and choose a priority.
							At the main page you can search by entering a word you are looking for. You can sort jobs by name and level next to the search bar.
							Jobs are cached in your browser, they are only lost when you clear the clipboard of your open browser.
							According to nDs
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
    );
  }
}
export default App;
