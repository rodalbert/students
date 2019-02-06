

// NPM packages imports

const express = require("express");
const bodyParser = require("body-parser")
const request = require("request");

// Express setup

var app = express();

// Static files folder definition

app.use(express.static('public'));

// Set up express to use body parser package to parse all request bodies in urlencoded to javascript

app.use(bodyParser.urlencoded({extended: true}));



// Routes

  
app.listen(3000, function() {
    
  console.log("server started on port 3000");

}); 
  

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/landing.html');
});


// Route that receives the info about the new subscriber. This route will receive the info a send that info to mailhcimp's server

app.post("/sign-up", function(req, res) {

  console.log(req.body);

  console.log(req.body.email)

  const email  = req.body.email;

  const body = JSON.stringify({
    email_address: email,
    status: "subscribed"
  })


//Mailchimp

  const options = {
      url: "https://us7.api.mailchimp.com/3.0/lists/db28a590fb/members",
      auth: {
        username: "anystring",
        password: "879f7131ab3b6f6933f629e88157aa9a-us7"
      }
     
    }

  request.get(options, function (err, response, body) {
    console.log(body)

    if(err) {
      return res.send(err)
    }

    res.send("sucess!")

  })



