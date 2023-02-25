import {Todo} from './todo';


async function createTodo(todo) {
    const dbTodo = new Todo(todo);
    await dbTodo.save();
    return dbTodo;
}

async function retrieveTodoList() {
    return Todo.find().sort({"deadline": 1});
}

async function retrieveTodo(id) {
    return Todo.findById(id);
}

async function updateTodo(todo) {
    const dbTodo = await Todo.findById(todo._id);
    if (dbTodo) {
        dbTodo.description = todo.description;
        dbTodo.status = todo.status;
        dbTodo.deadline = todo.deadline;
        await dbTodo.save();
        return true;
    }
    return false;
}

async function deleteTodo(id) {
    await Todo.deleteOne({_id: id});
}

export {
    createTodo,
    retrieveTodoList,
    retrieveTodo,
    updateTodo,
    deleteTodo
}