const { Router } = require(`express`);
const router = Router();
const Todo = require(`../models/Todo`);

/* Все обращения к базе строго через try/catch блоки */

router.get(`/`, async (req, res) => {
  try {
    const todos = await Todo.find({}).lean();

    res.render(`index`, {
      title: "Todos list",
      isIndex: true,
      todos: todos,
    });
  } catch (err) {
    console.log(err);
    res.render(`index`, {
      title: "Todos list",
      isIndex: true,
      todos: [],
    });
  }
});

router.get(`/create`, (req, res) => {
  res.render(`create`, {
    title: `Create todo`,
    isCreate: true,
  });
});

router.post(`/create`, async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
    });

    await todo.save();

    res.redirect(`/`);
  } catch (err) {
    console.log(err);
    res.redirect(`/`);
  }
});

router.post("/complete", async (req, res) => {
  try {
    const todo = await Todo.findById(req.body.id);

    todo.completed = !!req.body.completed;

    await todo.save();

    res.redirect(`/`);
  } catch (err) {
    console.log(err);
    res.redirect(`/`);
  }
});

module.exports = router;
