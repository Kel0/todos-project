const { Router } = require('express');
const Todo = require('../models/Todo');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find({});

        res.render('index', {
            title: 'Home page',
            isHome: true,
            todo_array: todos
        });
    } catch (e) {
        console.log(e);
    }
});

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create page',
        isCreate: true
    });
});

router.post('/create', async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title,
        });
        await todo.save();
        res.redirect('/create');
    } catch (e) {
        console.log(e);
    }
});

router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.todo_id);

    todo.completed = req.body.completed;
    await todo.save();

    res.json({data: 'success'});
});

router.get('/delete', async (req, res) => {
    try {
        const todo = await Todo.find({});

        res.render('delete', {
            title: 'Delete page',
            isDelete: true,
            todo_array: todo
        });
    } catch (e) {
        console.log(e);
    }
});

router.post('/delete', async (req, res) => {
    try {
        const todo = await Todo.findById(req.body.todo_id);
        
        todo.remove();

        res.json({data: 'success'});
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
