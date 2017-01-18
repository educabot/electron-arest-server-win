const express = require('express'),
      router = express.Router();

//GET home page.
router.get('/', function(req, res) {
  
  // // Define port
  // var port = 4000;

  // // Rest
  // var rest = require("arest")(app);

  // //rest.addDevice('http','192.168.1.103');
  // rest.addDevice('serial','COM8', 115200);

  // // Start server
  // app.listen(port);
  // console.log("Listening on port " + port);

  res.render('index', {title: 'Educa Bloques'});
});

module.exports = router;
