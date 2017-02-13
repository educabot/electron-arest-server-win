const express = require('express'),
      path = require('path'),
      //favicon = require('serve-favicon'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      routes = require('./routes/index'),
      serialport = require('serialport');
      app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define port
var port = 4000;

// Rest
var rest = require("arest")(app);
 
// list serial ports:
serialport.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.manufacturer);
    console.log(port.vendorId);
    if (port.vendorId === '8087' || port.vendorId === '2341' ){
      rest.addDevice('serial',port.comName, 115200);
    } else {
      console.log("Soportamos sólo placas Arduino UNO o Genuino 101")
      //window.close();
    }
    
  });
});

// Start server
app.listen(port);
console.log("Escuchando el puerto " + port);

//
app.use('/', routes);



//catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');

  err.status = 404;
  next(err);
});

//error handlers

//development error handler
//will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

//production error handler
//no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
