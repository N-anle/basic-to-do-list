# To-Do List Application

A clean, responsive to-do list web application with a Flask backend that allows users to create, read, update, and delete tasks.

![image](https://github.com/user-attachments/assets/b247be45-5131-42f7-8eb0-babfa9564cc5)


## Features

- ✅ Create new tasks
- 📝 Edit existing tasks
- 🗑️ Delete tasks
- 💾 Data persistence with Flask backend
- 📱 Responsive design that works on desktop and mobile
- 🎨 Modern UI with hover effects and smooth transitions

## Technologies Used

- **Frontend**:
  - HTML5
  - CSS3 (with Flexbox for responsive layouts)
  - JavaScript (ES6+)
  
- **Backend**:
  - Python
  - Flask
  - Flask-CORS for cross-origin resource sharing

## Project Structure

```
to-do-list/
│
├── frontend/
│   ├── index.html         # Main HTML structure
│   ├── styles.css         # CSS styling
│   └── script.js          # Frontend JavaScript
│
└── backend/
    └── app.py             # Flask server application
```

## Setup and Installation

### Prerequisites
- Python 3.6 or higher
- Web browser (Chrome, Firefox, Safari, etc.)

### Backend Setup
1. Install required Python packages:
   ```bash
   pip install flask flask-cors
   ```

2. Run the Flask server:
   ```bash
   python app.py
   ```
   The server will start on `http://localhost:5000`

### Frontend Setup
1. Simply open `index.html` in your web browser
2. Ensure the backend server is running

## API Endpoints

The backend provides the following REST API endpoints:

| Method | URL | Description | Request Body | Response |
|--------|-----|-------------|--------------|----------|
| GET | / | Fetch all tasks | - | Array of task objects |
| POST | / | Create a new task | `{"task": "task name"}` | Success message |
| PATCH | / | Update a task | `{"id": task_id, "task": "new task name"}` | Success message |
| DELETE | / | Delete a task | `{"id": task_id}` | Success message |

## How It Works

1. **Task Display**: On page load, the application fetches all tasks from the backend and displays them.
2. **Adding Tasks**: Users can add a task by typing in the input field and clicking "Add Task" or pressing Enter.
3. **Editing Tasks**: Each task has an "Edit" button that prompts for a new task description.
4. **Deleting Tasks**: Each task has a "Delete" button with a confirmation prompt before removal.

## Customization

### Changing Colors
The application uses a green theme by default. To change the primary color:

1. Open `styles.css`
2. Find all instances of `#28a745` (primary green color) and replace with your desired color
3. Also adjust the hover state colors (e.g., `#218838`)

### Modifying Backend Storage
The current implementation uses in-memory storage. For persistent storage:

1. Modify `app.py` to integrate with a database like SQLite, PostgreSQL, or MongoDB
2. Update the CRUD operations to interact with your database

## Future Enhancements

- Add task categories/tags
- Implement user authentication
- Add due dates and priority levels
- Enable task sorting and filtering
- Add dark mode toggle

## License

[MIT License](LICENSE)

## Acknowledgements

- Font: Arial (sans-serif)
- Background: Linear gradient from #f5f7fa to #c3cfe2
