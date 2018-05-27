import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customer: {}
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    axios.get('/api/customer/'+this.props.match.params.id)
      .then(res => {
        this.setState({ customer: res.data });
        console.log(this.state.customer);
      });
  }

  delete(id){
    console.log(id);
    axios.delete('/api/customer/'+id)
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    console.log(this.state);
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              {this.state.customer.name && `${this.state.customer.name.first} ${this.state.customer.name.last}`}
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> customer List</Link></h4>
            <dl>
              <dt>CustomerId:</dt>
              <dd>{this.state.customer.customerID}</dd>
              <dt>LastContact:</dt>
              <dd>{this.state.customer.lastContact}</dd>
              <dt>customerLifetimeValue:</dt>
              <dd>{this.state.customer.customerLifetimeValue}</dd>
              <dt>BirthDay:</dt>
              <dd>{this.state.customer.birthday}</dd>
              <dt>Gender:</dt>
              <dd>{this.state.customer.gender}</dd>
            </dl>
            <Link to={`/edit/${this.state.customer._id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.customer._id)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;