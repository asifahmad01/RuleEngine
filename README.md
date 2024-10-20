# 🛠️ Rule Engine Application

The **Rule Engine Application** is a full-stack project designed to allow users to create, combine, and evaluate dynamic rules based on attributes like age, department, salary, and more.

---

## ✨ Features

- **Create Rules**: Define custom rules using logical operators like `AND`, `OR`, `>`, `<`, `==`.
- **Combine Rules**: Combine multiple rules to create complex logic.
- **Evaluate Rules**: Evaluate rules against a dataset to check if the conditions are satisfied.

---

## 📋 Table of Contents

1. [Technologies Used](#technologies-used)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Database Schema](#database-schema)
5. [Project Structure](#project-structure)
6. [Screenshots](#screenshots)
7. [License](#license)

---

## ⚙️ Technologies Used

- **Frontend**: React.js, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Tools**: Axios for HTTP requests, concurrently for running both frontend and backend.

---

## 🚀 Installation

### Prerequisites:

- **Node.js** (v16.x)
- **MongoDB** (local or cloud instance)
- **NPM** package manager

### Steps to Set Up:

1. **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd RuleEngine
    ```

2. **Install Dependencies**:
   - **Backend**:
     ```bash
     cd backend
     npm install
     ```
   - **Frontend**:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the `backend` folder with:
   ```bash
   MONGO_URI=your_mongo_db_uri
   PORT=5000
