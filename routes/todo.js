const express = require("express");
const router = express.Router();

// IMPORT DATA
const users = require("../data/users");
const todos = require("../data/todos");
const notes = require("../data/notes");
const error = require("../utilities/error");


// http://localhost:3000/api/todos/1


  router
  .route("/")
  .get((req, res, next) => {
    if (req.query.userId){
      const userId = Number(req.query.userId); 

      const userTodos = todos.filter((t) => t.userId == userId); 

      return res.json({userId: userId, todos: userTodos})
    }
    const links = [
      {
        href: "todos/:id",
        rel: ":id",
        type: "GET",
      },
    ];
    res.json({ todos, links });
  })
  .post((req, res, next) => {
    if (req.body.userId && req.body.title && req.body.content) {
      const todo = {
        id: todos[todos.length - 1].id + 1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
      };

      todos.push(todo);
      res.json(todos[todos.length - 1]);
    } else next(error(400, "Incorrect Data"));
  });



 
// http://localhost:3000/api/todos/?todoid=1

router
  .route("/:id")
  .get((req, res, next) => {
    const todo = todos.find((t) => t.id == req.params.id);
    const links = [
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "PATCH",
      },
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "DELETE",
      },
    ];

    if (todo) res.json({ todo, links });
    else next();
  })
  .patch((req, res, next) => {
    const todo = todos.find((t, i) => {
      if (t.id == req.params.id) {
        for (const key in req.body) {
          todos[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (todo) res.json(todo);
    else next();
  })
  .delete((req, res, next) => {
    const todo = todos.find((t, i) => {
      if (t.id == req.params.id) {
        todos.splice(i, 1);
        return true;
      }
    });

    if (todo) res.json(todo);
    else next();
  });



 
  // http://localhost:3000/api/users/1/notes


router
  .route("/:id/notes")
  .get((req, res, next) => {
    if (req.query.userId){
      const userId = Number(req.query.userId);
      const userNotes = comments.filter((n) => n.userId == userId); 
      res.json({userId: userId, notes: userNotes}); 

      if (isNaN(userId)) return next(error(400, "Invalid user ID"))
    } 
    const id = Number(req.params.id);
    const userNotes = notes.filter((n) => n.id == id); 
    res.json({id: id, notes: userNotes});
});

  module.exports = router;