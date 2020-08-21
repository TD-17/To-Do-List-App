const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const TodoTask = require('./models/TodoTask');

dotenv.config();


app.use('/static', express.static('public'));

//this will allow us to use data of request using body property
app.use(express.urlencoded({ extended: true }));

mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
console.log("Connected to db!");
app.listen(3000, () => console.log("Server Up and running..."));
});

//view engine configuration
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
    console.log(tasks);
    res.render("todo.ejs", { todoTasks: tasks });
    });
});

app.post('/', (req, res) => {
    const todoTask = new TodoTask({
    content: req.body.content
    });

    todoTask.save(function (err) {
        if (err) return handleError(err);
      });
    res.redirect("/");
}); 
