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

const tasksFilePath = path.join(__dirname, '/tasks.json')
const recentTaskIdFilePath = path.join(__dirname, '/.recent-task-id')

let tasksJson;
try {
    tasksJson = await readFile(filePath, 'utf-8')
} catch (error) {
    await writeFile(tasksFilePath, '[]')
}

let tasks = JSON.parse(tasksJson || "[]")

const updateTasksFile = async () => await writeFile(tasksFilePath, JSON.stringify(tasks, null, 2))

const findTodoById = (id) => tasks.find(todo => todo.id == id)

switch (command) {
    case COMMAND.ADD: {
        let newTodoId = 0;
        try {
            newTodoId = await readFile(recentTaskIdFilePath, 'utf-8') || 0;
        } catch (error) {
            writeFile(recentTaskIdFilePath, '0')
        }
        newTodoId++;
        const createdAt = new Date();
        const newTodo = {
            id: newTodoId,
            status: 'todo',
            description: optionOrValue,
            createdAt,
            updatedAt: createdAt,
        }
        tasks.push(newTodo)
        writeFile(recentTaskIdFilePath, String(newTodoId))
        console.log(`Todo added, ID: ${newTodoId}!`)
        break;
    }
    case COMMAND.LIST: {
        if (optionOrValue === 'inprogress') {
            tasks = tasks.filter(todo => todo.status === 'inprogress')
        }
        if (optionOrValue === 'todo') {
            tasks = tasks.filter(todo => todo.status === 'todo')
        }
        if (optionOrValue === 'done') {
            tasks = tasks.filter(todo => todo.status === 'done')
        }
        tasks.forEach(todo => console.table(`${todo.id} - ${todo.status} - ${todo.description}`))
        break;
    }
    case COMMAND.UPDATE:
        const todo = findTodoById(optionOrValue)
        if (todo) {
            todo.description = secondOptionOrValue
            todo.updatedAt = new Date()
            console.log(`Todo with id ${optionOrValue} updated!`)
        } else {
            console.error(`Todo with id ${optionOrValue} not found!`);
        }
        break;
    case COMMAND.MARK_AS_DONE: {
        const todo = findTodoById(optionOrValue)
        if (todo) {
            todo.status = 'done'
            console.log(`Todo with id ${optionOrValue} marked as done!`)
        } else {
            console.error(`Todo with id ${optionOrValue} not found!`);
        }
        break;
    }

    case COMMAND.MARK_AS_INPROGRESS: {
        const todo = findTodoById(optionOrValue)
        if (todo) {
            todo.status = 'inprogress'
            
            console.log(`Todo with id ${optionOrValue} marked as inprogress!`)
        } else {
            console.error(`Todo with id ${optionOrValue} not found!`);
        }
        break;
    }

    case COMMAND.DELETE: {
        const todo = findTodoById(optionOrValue)
        if (todo) {
            tasks = tasks.filter(todo => todo.id != optionOrValue)
            
            console.log(`Todo with id ${optionOrValue} deleted!`)
        } else {
            console.error(`Todo with id ${optionOrValue} not found!`);
        }
        break;
    }
    default: {
        console.log("Invalid Command!")
        process.exit(1)
    }
}

await updateTasksFile()