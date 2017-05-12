var express = require("express"),
	bodyParser = require("body-parser"),
	mongoose = require ("mongoose"),
	//"./task" is a local folder not node-module
	Task = require("./task"),
	path = require("path"),
	app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended : true
}));


app.get("/", function(req, res){
	res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/task", function(req,res){
	//creating  anew model
	var task = new Task({
		//inserting data into our model. taking what ever data (Name & description) 
		//is taken from the client;  creating the date ourselves
		name: req.body.taskName,
		description : req.body.desc,
		date : new Date()
	});

	task.save(function(err){
		if(err){
			console.log(err);
		} else{
			res.redirect("/data");
		}
	});
});
//going into our database, taking every document that is out database and sending it out via json
app.get("/data", function (req, res){
	Task.find({}, function(err,data){
		res.json(data);
	});
});
//mongodb url (specific types of database)
mongoose.connect("mongodb://localhost/task");

app.listen(8080);

console.log("Server is running");

