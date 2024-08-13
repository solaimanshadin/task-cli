#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const [command, optionOrValue, secondOptionOrValue] = process.argv.slice(2)

const COMMAND = {
    'ADD': 'add',
    'LIST': 'list',
    'UPDATE': 'update',
    'DELETE': 'delete',
    'MARK_AS_DONE': 'mark-as-done',
    'MARK_AS_INPROGRESS': 'mark-as-inprogress',
}

const filePath = path.join(__dirname, '/todos.json')

readFile(filePath, 'utf-8').then(async (data) => {
    let todos = JSON.parse(data || "[]")

    const updateFile = async () =>  await writeFile(filePath, JSON.stringify(todos, null, 2))

    const findTodoById = (id) =>  todos.find(todo => todo.id == id)
    
    switch (command) {
        case COMMAND.ADD: {
            let newTodoId = await readFile(path.join(__dirname, '/lastId'), 'utf-8') || 0;
            newTodoId++;
            writeFile(path.join(__dirname, '/lastId'), String(newTodoId))
            const createdAt = new Date();
            const newTodo = {
                id: newTodoId,
                status: 'todo',
                description: optionOrValue,
                createdAt,
                updatedAt: createdAt,
            }
            todos.push(newTodo)
            updateFile()
            console.log(`Todo added, ID: ${newTodoId}!`)
            break;
        }
        case COMMAND.LIST: {
            if (optionOrValue === 'inprogress') {
                todos = todos.filter(todo => todo.status === 'inprogress')
            }
            if (optionOrValue === 'todo') {
                todos = todos.filter(todo => todo.status === 'todo')
            }
            if (optionOrValue === 'done') {
                todos = todos.filter(todo => todo.status === 'done')
            }
            todos.forEach(todo => console.table(`${todo.id} - ${todo.status} - ${todo.description}`))
            break;
        }
        case COMMAND.UPDATE:
            const todo = findTodoById(optionOrValue)
            if (todo) {
                todo.description = secondOptionOrValue
                todo.updatedAt = new Date()
                updateFile()
                console.log(`Todo with id ${optionOrValue} updated!`)
            }else {
                console.error(`Todo with id ${optionOrValue} not found!`);
            }
            break;
        case COMMAND.MARK_AS_DONE: {
            const todo = findTodoById(optionOrValue)
            if(todo) {
                todo.status = 'done'
                updateFile()
                console.log(`Todo with id ${optionOrValue} marked as done!`)
            }else{
                console.error(`Todo with id ${optionOrValue} not found!`);
            }
            break;
        }
            
        case COMMAND.MARK_AS_INPROGRESS: {
            const todo = findTodoById(optionOrValue)
            if(todo) {
                todo.status = 'inprogress'
                updateFile()
                console.log(`Todo with id ${optionOrValue} marked as inprogress!`) 
            } else {
                console.error(`Todo with id ${optionOrValue} not found!`);
            }
            break;
        }
            
        case COMMAND.DELETE: {
            const todo = findTodoById(optionOrValue)
            if(todo) {
                todos = todos.filter(todo => todo.id != optionOrValue)
                updateFile()
                console.log(`Todo with id ${optionOrValue} deleted!`)
            } else {
                console.error(`Todo with id ${optionOrValue} not found!`);
            }
            break;
        }
        default:
            console.log("Invalid Command!")

    }
})
