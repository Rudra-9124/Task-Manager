# Task Manager Application
## Description
This is a simple Task Manager application where users can create, view, edit, mark tasks as completed, and delete tasks. It is built using HTML and JavaScript for the frontend, and Node.js/Express with MongoDB for the backend.

## Features
- Create Tasks: Users can enter a title and description to create a task.
- View All Tasks: Displays a list of all tasks with options to mark as completed, edit, or delete tasks.
- Edit Tasks: Users can modify the title and description of a task.
- Mark as Completed: Tasks can be marked as completed and displayed with a strike-through.
- Delete Tasks: Users can remove tasks from the list.

## How to Use
### 1. Prerequisites
  Node.js and npm installed on your local machine. If you don't have them, you can download and install them from Node.js official website.
  MongoDB set up and running. If you don't have MongoDB installed locally, you can use a cloud database like MongoDB Atlas.

### 2. Backend Setup
  The backend server should now be running at http://localhost:3000.

### 3. Frontend Setup
  Open the index.html file in your preferred web browser.

The frontend will automatically fetch tasks from the backend and allow you to interact with them (create, edit, mark as completed, delete).

## Key Decisions Made
### 1. Frontend:
  - HTML is used to create the structure of the app, including forms for creating and editing tasks, buttons for interacting with tasks, and a list to display tasks.
  - JavaScript is used to handle frontend logic such as creating tasks, updating task lists, marking tasks as completed, and deleting tasks. We use fetch() to interact with the backend API.
### 2. Backend:
  - Node.js and Express are used to handle API routes and server-side logic.
  - MongoDB is used to store task data. The app uses Mongoose for interacting with MongoDB and defining task models.
  - The CRUD operations (Create, Read, Update, Delete) are implemented for managing tasks. Each task has a title, description, and a completed status.
### 3. Task Management:
  - For managing tasks, each task has a unique ID assigned by MongoDB. The backend uses RESTful routes to handle task actions.
  - The frontend dynamically updates the task list after actions like creating, editing, marking as completed, or deleting a task.
    
## Future Enhancements
- Authentication: Adding user authentication so each user can manage their tasks separately.
- Task Priorities: Allowing users to set task priorities (e.g., low, medium, high).
- Styling: Adding more advanced styling with frameworks like Bootstrap or Material-UI for a better user interface.
- Task Categories: Allowing users to categorize tasks (e.g., Work, Personal, Urgent).
