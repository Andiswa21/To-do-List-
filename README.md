
# To-Do List Application

A simple and responsive To-Do List application built with React that allows users to manage their tasks efficiently. Users can register, log in, and perform CRUD (Create, Read, Update, Delete) operations on their to-do items. Tasks can be prioritized as High, Medium, or Low, with corresponding color coding.

## Features

- **User Authentication**: Secure login and registration for users.
- **To-Do List Management**: Users can:
  - **Add** tasks with descriptions and priority levels.
  - **View** their list of tasks.
  - **Update** existing tasks.
  - **Delete** tasks from their list.
  - **Search** for specific tasks.
- **Priority Color Coding**: Tasks are color-coded based on their priority:
  - **Low**: Green
  - **Medium**: Yellow
  - **High**: Red
- **Responsive Design**: The application is designed to be user-friendly on both desktop and mobile devices.

## Technologies Used

- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express
- **Database**: SQLite
- **Authentication**: JSON Web Tokens (JWT)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm (Node Package Manager)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. **Install dependencies**:

   For the frontend:

   ```bash
   cd client
   npm install
   ```

   For the backend:

   ```bash
   cd server
   npm install
   ```

### Setup Backend

1. Create a new SQLite database or use the existing one. Make sure the database is configured in the backend.

2. Start the backend server:

   ```bash
   node server.js
   ```

   The server will run on `http://localhost:5000`.

### Setup Frontend

1. Start the frontend application:

   ```bash
   cd client
   npm start
   ```

   The application will run on `http://localhost:3000`.

## Usage

- **Register a new user**: Navigate to the registration page and fill in the required fields.
- **Log in**: Use your credentials to log in to your account.
- **Manage your To-Do List**: After logging in, you can add, delete, and update tasks, and change their priority.


## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by various to-do list applications.
- Thanks to the open-source community for providing resources and support.
