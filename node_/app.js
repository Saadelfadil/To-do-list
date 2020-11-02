const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const objectId = require("mongoose").ObjectId;
const { on } = require("nodemon");

// mongoose connection
// mongoose.connect("mongodb://localhost/todo_db");
// mongoose.connect(
//   "mongodb+srv://Moe:MoeGod@moesolutions.suo4x.mongodb.net/?retryWrites=true&w=majority",
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (err) => {
//     if (err) console.error(err);
//     else console.log("Connected to the mongodb");
//   }
// );
mongoose.connect("mongodb://localhost/todo", {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err)
        console.error(err);
    else
        console.log("Connected to the mongodb");
});
mongoose.set("useFindAndModify", false);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
app.use("/public", express.static("public"));

// mongoose schema
const todoSchema = new mongoose.Schema({
  name: String,
  typeofCheck: Boolean,
});

const Todo = mongoose.model("todo", todoSchema);

// -------- Express Routes Here ---------- //

app.get("/", function (req, res) {
  Todo.find({}, function (err, todoList) {
    if (err) console.log(err);
    else {
      res.render("index.ejs", { todoList: todoList });
    }
  });
});

//-------- Submit button route --------//

app.post("/newtodo", function (req, res) {
  if (req.body.inputTask === "") {
    console.log("Type a task to add");
  } else {
    const newTask = new Todo({
      name: req.body.inputTask,
      typeofCheck: false,
    });
    Todo.create(newTask, function (err, Todo) {
      if (err) console.log(err);
      else {
        console.log("New Task : " + newTask);
      }
    });
    res.redirect("/");
  }
});

app.post("/", function (req, res) {
  // console.log(req.body.checkbox);
  const typeofCh = req.body.checkbox;
  const todoId = req.body.todoId;
  // app.put("todo", function (req, res) {
  //     Todo.updateOne({typeofCheck: true}, typeofCh);
  // });
  var ischecked = typeofCh == "on" ? true : false;
  console.log(ischecked);
  Todo.findByIdAndUpdate({ _id: todoId }, { typeofCheck: ischecked }, function (
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("back");
    }
  });
});


app.get("*", function (req, res) {
  res.send("<h1> Invalid Page </h1>");
});

// ------ server listening on port 3000 ------ //
app.listen(4000, function () {
  console.log("server started in port 4000");
});
