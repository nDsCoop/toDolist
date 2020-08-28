import React, { Component } from 'react';
class Form extends Component {
        state = {
        taskId: '',
        taskName:'',
        taskLevel: 0
      };

    UNSAFE_componentWillMount(){
         this.UpdateItem(this.props.itemSelected)
    }
    UNSAFE_componentWillReceiveProps(nextProps){
    	 this.UpdateItem(nextProps.itemSelected)
    }

    UpdateItem = (item) =>{
        if(item !== null){
        this.setState({
          taskId: item.id,
          taskName: item.name,
          taskLevel: item.level,
        });
      }
    }
    handleChange = (event) => {
    	const target = event.target;
    	const value = target.type === 'checkbox' ? target.checked : target.value;
     	const name 	= target.name;
     	this.setState({
     		[name]: value
     	});
 
    }
    handleSubmit = (event) => {
    	let item = {
    		name: this.state.taskName,
        id: this.state.taskId,
    		level: this.state.taskLevel,
    	};
    	this.props.onClickSubmit(item);
    	event.preventDefault();
    }
    handleCancel = () => {
    	this.props.onClickCancel();
    }
  render() {
   
	return (
		<div className="row">
				<div className="col-md-offset-7 col-md-6">
					<form action="true" className="form-inline" method="POST">
						<div className="form-group">
							<label className="sr-only" htmlFor="true">label</label>
							<input value={this.state.taskName} name="taskName" onChange = {this.handleChange}  type="text" className="form-control" placeholder="Task name" ref={this.task_name} />
						</div>
						<div className="form-group">
							<label className="sr-only" htmlFor="true">label</label>
							<select value={this.state.taskLevel} onChange = {this.handleChange} name="taskLevel" id="inputDs" className="form-control" required="required" ref={this.task_level}>
								<option value={0}>Small</option>
                                <option value={1}>Medium</option>
								<option value={2}>High</option>
							</select>
						</div>
							<button type="Submit" onClick = {this.handleSubmit} className="btn btn-primary">Submit</button>
							<button type="button" onClick = {this.handleCancel} className="btn btn-warning">Cancel</button>
					</form>
				</div>
			</div>
		);
	}
}
export default Form;