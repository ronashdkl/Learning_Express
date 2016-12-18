var express = require('express'); // loading express
 
var bodyParser = require('body-parser'); // loading body parser

var path = require('path'); // loading path

var app = express(); // initialize express

var expressValidator = require('express-validator');   // loading express validation

// view engine



app.set('views', path.join(__dirname, 'views')); //initializing views path

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//static path
// app.use (express.static(path.join(__dirname, 'public')));

// validator middleware

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


// defeiing global variable
app.use(function(req, res, next){
res.locals.errors= null;
next();

});


//object
var  language = [
{
	id : 1,
	name : "PHP",
	version : "1.0",
	description : "Serve side scripting language"

},

{
	id : 2,
	name : "node",
	version : "1.0",
	uses : "server side scripting language with javaScript"

},





]
// view render. 
app.get('/', function(req, res){

	res.render('index',{
		title : "Testing ejs",
		lang : language


	});
});


app.post("/users/add", function(req,res){

console.log("Form submitted!!!");

// form validation 
req.checkBody('name', 'Name is required!').notEmpty();
req.checkBody('email', 'Email is required!').notEmpty();
req.checkBody('address', 'Address is required!').notEmpty();

var errors = req.validationErrors();

if (errors) {
  
	res.render('index',{
		title : "Error",
		lang : language,
		errors : errors
	});

}else{

var newUser = {
	name : req.body.name,
	email : req.body.email,
	address : req.body.address
}

console.log(newUser);
}

});

app.listen(8080, function (){
	console.log("server started on port 8080");
})