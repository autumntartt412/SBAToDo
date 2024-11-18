const express = require("express");
const app = express();
const port = 3000;
// add/import comments route *****************************
const users = require("./routes/users");
const posts = require("./routes/posts");
const error = require("./utilities/error");





//  Routes // add use of middlewear for comments *****************************
app.use("/api/users", users);
app.use("/api/posts", posts);








// // 404 Middleware
// app.use((req, res, next) => {
//     next(error(404, "Resource Not Found"));
//   });


//   // Error-handling middleware.
// app.use((err, req, res, next) => {
//     res.status(err.status || 500);
//     res.json({ error: err.message });
//   });
  
  app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
  });