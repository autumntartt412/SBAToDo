const express = require("express");
const app = express();


const PORT = 3000;
// add/import comments route *****************************
const users = require("./routes/user");
const todos = require("./routes/todo");
const notes = require("./routes/note");
const error = require("./utilities/error");

const pug = require('pug'); // pug
const fs = require('fs'); // fs template engine



app.set("views", "./views");
app.set("view engine", "pug");





//  Routes // add use of middlewear for comments *****************************
app.use("/api/users", users);
app.use("/api/todos", todos);
app.use("/api/notes", notes);







// 404 Middleware
app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
  });


  // Error-handling middleware.
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
  });



  // PORT
  
  app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON http://localhost:${PORT}`);
  });