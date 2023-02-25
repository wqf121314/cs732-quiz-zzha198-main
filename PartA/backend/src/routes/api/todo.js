import express from 'express';
import {createTodo, deleteTodo, retrieveTodo, retrieveTodoList, updateTodo} from "../../db/todo-dao";

// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();

// Retrieve all todos
router.get('/', async (req, res) => {
    res.json(await retrieveTodoList());
});
// Retrieve single todos
router.get('/:id', async (req, res) => {
    if (req.params) {
        const {id} = req.params;
        const todo = await retrieveTodo(id);
        if (todo) {
            res.json(todo);
        } else {
            res.sendStatus(HTTP_NOT_FOUND);
        }
    } else {
        res.sendStatus(HTTP_NOT_FOUND);
    }
});
// Create new todos
router.post('/', async (req, res) => {
    // console.log(req.body.description, req.body.status, req.body.deadline)
    if (req.body.description && req.body.deadline) {
        const newTodo = await createTodo({
            description: req.body.description, status: req.body.status, deadline: req.body.deadline
        });
        res.status(HTTP_CREATED)
            .header('Location', `/api/todos/${newTodo._id}`)
            .json(newTodo);
    } else {
        res.sendStatus(HTTP_NOT_FOUND);
    }
})
// Update todos
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const todo = req.body;
    todo._id = id;
    const success = await updateTodo(todo);
    res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
});

// Delete todos
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    await deleteTodo(id);
    res.sendStatus(HTTP_NO_CONTENT);
});

export default router;