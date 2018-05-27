import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      customerId: '',
      firstName: '',
      lastName: '',
      birthday: '',
      gender: '',
      _id: ''
    };
  }

  componentDidMount() {
    if(this.props.match.params.id){
      axios.get('/api/customer/'+this.props.match.params.id)
      .then(res => {
        this.setState({ 
          customerId: res.data.customerID,
          firstName: res.data.name.first,
          lastName: res.data.name.last,
          birthday: res.data.birthday,
          gender: res.data.gender,
          _id: res.data._id
         });
        console.log(this.state, res.data);
      });
    }    
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { customerId, firstName, lastName, birthday, gender } = this.state;
    const apiUrl = this.props.match.params.id ? `/api/customer/${this.props.match.params.id}` : '/api/customer';
    if(this.props.match.params.id){
      axios.put(apiUrl, { customerID: customerId, name:{first:firstName, last:lastName}, birthday: new Date(birthday), gender, lastContact: new Date()})
      .then((result) => {
        this.props.history.push("/show/"+this.props.match.params.id)
      });      
    }else{
      axios.post(apiUrl, { customerID: customerId, name:{first:firstName, last:lastName}, birthday: new Date(birthday), gender,  lastContact: new Date() })
      .then((result) => {
        this.props.history.push("/")
      });
    }
    
  }  

  render() {
    const { customerId, firstName, lastName, birthday, gender } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              {this.props.match.id ? 'Edit Customer' : 'Add Customer'}
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Customer List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="customerId">customerId:</label>
                <input type="text" class="form-control" name="customerId" value={customerId} onChange={this.onChange} placeholder="customerId" required />
              </div>
              <div class="form-group">
                <label for="firstName">FirstName:</label>
                <input type="text" class="form-control" name="firstName" value={firstName} onChange={this.onChange} placeholder="FirstName" required />
              </div>
              <div class="form-group">
                <label for="lastName">LastName:</label>
                <input type="text" class="form-control" name="lastName" value={lastName} onChange={this.onChange} placeholder="LastName" required />
              </div>
              <div class="form-group">
                <label for="birthday">Birthday:</label>
                <input type="date" class="form-control" name="birthday" onChange={this.onChange} value={birthday} placeholder="birthday" required/>
              </div>
              <div class="form-group">
                <label for="gender">Gender:</label>
                <input type="text" class="form-control" name="gender" value={gender} onChange={this.onChange} placeholder="gender" required />
              </div>              
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;