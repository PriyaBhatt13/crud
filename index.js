var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var customer = require('./routes/customer');
var app = express();

let config = require('config'); //we load the db location from the JSON files
//db options
let options = {
    promiseLibrary: require('bluebird') 
}; 
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
/*mongoose.connect('mongodb://localhost/mern-crud', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));*/


//db connection      
mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.route("/api/customer")
  .get(customer.getCustomers)
  .post(customer.postCustomer);

app.route("/api/customer/:id")
  .get(customer.getCustomerById)
  .delete(customer.deleteCustomer)
  .put(customer.updateCustomer);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
const port = process.env.PORT || 5000;
app.listen(port);
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;