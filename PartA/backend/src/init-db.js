import mongoose from 'mongoose';
import {dummyTodos} from "./db/random-todo";
import {createTodo} from "./db/todo-dao";
import {Todo} from "./db/todo";

main();

async function main() {
    await mongoose.connect('mongodb://localhost:27017/cs732-se750-quiz-2022', {
        useNewUrlParser: true
    });
    console.log('Connected to database!');
    console.log();

    await clearDatabase();
    console.log();

    await addData();
    console.log();

    // Disconnect when complete
    await mongoose.disconnect();
    console.log('Disconnected from database!');
}

async function clearDatabase() {
    // const response = await Greeting.deleteMany({});
    const response = await Todo.deleteMany({});
    console.log(`Cleared database (removed ${response.deletedCount} todo).`);
}

async function addData() {
    for (let dummyTodo of dummyTodos) {
        const dbTodos = await createTodo(dummyTodo);
        console.log(`Todos '${dbTodos.description}' added to database (_id = ${dbTodos._id})`);
    }
}