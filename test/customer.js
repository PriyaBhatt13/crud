//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Customer = require('../models/Customer');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Customers', () => {
    beforeEach((done) => { //Before each test we empty the database
        Customer.remove({}, (err) => { 
           done();         
        });     
    });
/*
  * Test the /GET route
  */
  describe('/GET customer', () => {
      it('it should GET all the customers', (done) => {
        chai.request(server)
            .get('/api/customer')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe('/POST customer', () => {
    it('it should not POST a customer without customerId field', (done) => {
      let customer = {
          gender: "male",
          name: {
              first:"J.R.R. Tolkien",
              "last": "last"
          }
      }
      chai.request(server)
          .post('/api/customer')
          .send(customer)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('customerID');
              res.body.errors.customerID.should.have.property('kind').eql('required');
            done();
          });
    });
    it('it should POST a customer ', (done) => {
        let customer = {
            gender: "female",
            name: {
                first:"J.R.R. Tolkien",
                "last": "last"
            },
            customerID: 1
        }
        chai.request(server)
            .post('/api/customer')
            .send(customer)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('gender');
                res.body.should.have.property('name');
                res.body.should.have.property('customerID');
              done();
            });
      });

});
describe('/GET/:id customer', () => {
    it('it should GET a customer by the given id', (done) => {
      let customer = new Customer(
          { 
            customerID: 1, 
            name: {
                first:"J.R.R. Tolkien",
                "last": "last"
            },
            gender: "female"
        });
      customer.save((err, customer) => {
          chai.request(server)
          .get('/api/customer/' + customer.id)
          .send(customer)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('customerID');
              res.body.should.have.property('name');
              res.body.should.have.property('gender');
              res.body.should.have.property('_id').eql(customer.id);
            done();
          });
      });
    });
});

describe('/PUT/:id customer', () => {
    it('it should UPDATE a customer given the id', (done) => {
      let customer = new Customer(
        { 
            customerID: 1, 
            name: {
                first:"J.R.R. Tolkien",
                "last": "last"
            },
            gender: "female"
        });
      customer.save((err, customer) => {
              chai.request(server)
              .put('/api/customer/' + customer.id)
              .send(
                { 
                    customerID: 1, 
                    name: {
                        first:"J.R.R. Tolkien",
                        "last": "last"
                    },
                    gender: "male"
                })
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('gender').eql("male");
                done();
              });
        });
    });
});

describe('/DELETE/:id customer', () => {
    it('it should DELETE a customer given the id', (done) => {
      let customer = new Customer( { 
        customerID: 1, 
        name: {
            first:"J.R.R. Tolkien",
            "last": "last"
        },
        gender: "female"
    });
      customer.save((err, customer) => {
              chai.request(server)
              .delete('/api/customer/' + customer.id)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('ok').eql(1);
                  res.body.should.have.property('n').eql(1);
                done();
              });
        });
    });
});

});