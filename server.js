var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./static")));
app.use(express.static( __dirname + '/sample-app/dist/sample-app' ));
app.set("views", path.join(__dirname, "./views"));

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/RestfulTasksAPI");

var TaskSchema = new mongoose.Schema(
    {
    title:{
        type: String, 
        required: [true, 'Title is required.'], 
        minlength: [3, 'Title must be at least 3 characters.'],
        trim: true
        },
    description: { 
        type: String, 
        required: [true, 'Description is required.'], 
        minlength: [5, 'Description must be at least 5 characters.'],
        trim: true
    },
    completed: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
    }, 
    {
    timestamps: true
    });

mongoose.model("Task", TaskSchema);
var Task = mongoose.model("Task");
mongoose.Promise = global.Promise;

app.get('/task', function(request,response){
    Task.find({}, function(err, data){
        if(err){
            console.log(err);
            response.json({
                message: "THERE IS AN ERROR at INDEX ROUTE!",
                error: error
            });
        } else {
            console.log(data);
            response.json(data)
        }
    });
});

app.get('/task/:id', function(request, response){
    console.log(request.params.id);
    Task.findOne({
        _id: request.params.id
    },
    function(error, task){
        if(error){
            console.log(error);
            response.json(error);
        } else {
            console.log(task);
            response.json({task:task})
        };
    });
});

app.post('/task', function(request, response){
    console.log("AT POST DATA OF TASKS : " + request.body);
    var task = new Task({
        title: request.body.title,
        description: request.body.description,
        completed: request.body.completed
    });
    task.save(function (error, data){
        if(error){
            console.log(error);
            response.json(error);
        } else {
            console.log(data);
            response.json(data)
        };
    });
});

app.put('/task/:id', function(request, response){
    Task.findByIdAndUpdate({ _id: request.params.id }, {$set: {title: request.body.title, description: request.body.description}}, {new:true, runValidators: true} , function (error, task) {
        if (error) {
            response.json(error)
        } else {
            response.json({ message: "Success", data: task })
        }
    });
})


app.delete('/task/:id', function(request, response){
    console.log(request.params.id);
    Task.remove({
        _id: request.params.id
    }, function(error){
        if(error){
            console.log(error);
            response.json({
                message: "Error at REMOVE by ID Route",
                error: error
            });
        } else {
            console.log("REMOVED task by ID.");
            response.json({
                message: "REMOVED task by ID.",
            });
        };
    });
});

app.listen(8000, function(){
    console.log("LISTENING on Port 8000!");
});


// this route will be triggered if any of the routes above did not match
app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./sample-app/dist/sample-app/index.html"))
});
