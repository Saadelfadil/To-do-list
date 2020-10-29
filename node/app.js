var express = require("express");
var app = express();

app.set("view engine", "ejs");
// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
app.use('/public', express.static('public'));

var todolist = [
    "Complete course node JS",
    "Complete my first project node JS"
]

// -------- Express Routes Here ---------- //
app.get("/", function(req, res) {
    res.render("index.ejs");
});

app.get("/todo", function(req, res) {
    res.send("<h1> Hello todo </h1>");
});


// ------ server listening on port 3000 ------ //
app.listen(3000, function() {
    console.log("server started in port 3000");
});


























// var app = express();
// app.use(bodyParser.json());

// var mysqlConnection = mysql.createConnection({
//     host : "localhost",
//     user : "root",
//     password : "password",
//     database : "db",
//     multipleStatements : true
// });

// mysqlConnection.connect((err) => {
//     if (!err)
//     {
//         console.log("Connected...");
//     }
//     else
//     {
//         console.log("Connection Failed...");
//     }
// })

// app.listen(3000);