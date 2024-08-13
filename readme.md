
# task-cli :
Simple CLI app to manage tasks/todos.



## Install and run

Clone the project

```bash
  git clone https://github.com/solaimanshadin/task-cli.git
```

Go to the project directory

```bash
  cd task-cli
```


Intall the CLI app

```bash
  npm install -g .
```



## Command Overview

| Command               | Description                                              | Usage Example                                      | Options/Arguments                    |
|-----------------------|----------------------------------------------------------|----------------------------------------------------|--------------------------------------|
| `add`                 | Adds a new task to the list with the status `todo`.      | `tasks-cli add "Buy groceries"`                    | `description` (string)               |
| `list`                | Lists tasks filtered by their status.                    | `tasks-cli list todo`                              | `status` (`todo`, `inprogress`, `done`)          |
| `update`              | Updates the description of an existing task.             | `tasks-cli update 1 "Buy groceries and cook dinner"`| `taskId` (number), `description` (string) |
| `delete`              | Deletes a task by its ID.                                | `tasks-cli delete 1`                               | `taskId` (number)                    |
| `mark-as-done`        | Marks a task as `done`.                                  | `tasks-cli mark-as-done 1`                         | `taskId` (number)                    |
| `mark-as-inprogress`  | Marks a task as `inprogress`.                            | `tasks-cli mark-as-inprogress 1`                   | `taskId` (number)                    |

## Command Details

### 1. `add`

- **Description**: Adds a new task with the status `todo`.
- **Usage**: `tasks-cli add "description"`
- **Arguments**:
  - `description`: A string that describes the task to be added.
- **Example**:
  ```bash
  tasks-cli add "Buy groceries"
  ```

### 2. `list`

- **Description**: Lists tasks filtered by their status.
- **Usage**: `tasks-cli list [status]`
- **Options**:
  - `status`: The status of tasks to list (`todo`, `inprogress`, `done`). If not provided, all tasks are listed.
- **Example**:
  ```bash
  tasks-cli list todo
  ```

### 3. `update`

- **Description**: Updates the description of an existing task.
- **Usage**: `tasks-cli update taskId "new description"`
- **Arguments**:
  - `taskId`: The ID of the task to update.
  - `new description`: The new description for the task.
- **Example**:
  ```bash
  tasks-cli update 1 "Buy groceries and cook dinner"
  ```

### 4. `delete`

- **Description**: Deletes a task by its ID.
- **Usage**: `tasks-cli delete taskId`
- **Arguments**:
  - `taskId`: The ID of the task to delete.
- **Example**:
  ```bash
  tasks-cli delete 1
  ```

### 5. `mark-as-done`

- **Description**: Marks a task as `done`.
- **Usage**: `tasks-cli mark-as-done taskId`
- **Arguments**:
  - `taskId`: The ID of the task to mark as done.
- **Example**:
  ```bash
  tasks-cli mark-as-done 1
  ```

### 6. `mark-as-inprogress`

- **Description**: Marks a task as `inprogress`.
- **Usage**: `tasks-cli mark-as-inprogress taskId`
- **Arguments**:
  - `taskId`: The ID of the task to mark as in progress.
- **Example**:
  ```bash
  tasks-cli mark-as-inprogress 1
  ```