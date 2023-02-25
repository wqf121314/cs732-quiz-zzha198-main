import dummyjson from 'dummy-json';
import fs from 'fs';

const myHelpers = {};

const template = fs.readFileSync('./src/db/random-todo-template.hbs', {encoding: 'utf-8'});
const todosJson = dummyjson.parse(template, {helpers: myHelpers});
const dummyTodos = JSON.parse(todosJson);

export {dummyTodos};