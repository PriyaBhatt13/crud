import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: []
    };
  }

  componentDidMount() {
    axios.get('/api/customer')
      .then(res => {
        this.setState({ customers: res.data });
        console.log(this.state.customers);
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              customer CATALOG
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add customer</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>CustomerId</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                </tr>
              </thead>
              <tbody>
                {this.state.customers.map(customer =>
                  <tr>
                    <td><Link to={`/show/${customer._id}`}>{customer.customerID}</Link></td>
                    <td>{customer.name.first}</td>
                    <td>{customer.name.last}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
