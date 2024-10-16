# PBKK-JS-CRUD-Local

This project is a simple CRUD (Create, Read, Update, Delete) web application built with **HTML**, **CSS**, and **JavaScript** for the frontend, and **Node.js** with **Express** for the backend. The data is stored in a local array within the server and manipulated via a RESTful API, without using any database. The application allows users to add, view, edit, and delete items with the following fields:

- `item`: the name of the item
- `deskripsi`: the description of the item

## Features

- **Create**: Add a new item with a name and description.
- **Read**: Display all items in a table.
- **Update**: Edit the name and description of an existing item.
- **Delete**: Remove an item from the list.

## Project Structure

```
PBKK-JS-CRUD-Local/
│
├── public/
│   ├── index.html      # Main HTML file for the frontend
│   ├── script.js       # JavaScript file for DOM manipulation and API calls
├── app.js              # Backend server with Express handling CRUD operations
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/en/) (version 14.x or higher)
- [NPM](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/PBKK-JS-CRUD-Local.git
   cd PBKK-JS-CRUD-Local
   ```

2. **Install dependencies**:
   Run the following command to install the required dependencies for the project:
   ```bash
   npm install
   ```

### Running the Application

To start the server and run the application:

1. **Start the server**:
   Use `nodemon` or `node` to run the server (`app.js`):

   ```bash
   nodemon app.js
   ```

   or

   ```bash
   node app.js
   ```

   The server will start on `http://localhost:3000`.

2. **Access the app**:
   Open your browser and navigate to `http://localhost:3000`. You should see the CRUD interface where you can add items to the table.

## API Endpoints

The application provides the following RESTful API endpoints:

- **GET** `/items`: Retrieves all items.
- **POST** `/items`: Adds a new item.
  - Request body:
    ```json
    {
      "item": "Item Name",
      "deskripsi": "Item Description"
    }
    ```
- **PUT** `/items/:id`: Updates an existing item by ID.
  - Request body:
    ```json
    {
      "item": "Updated Item Name",
      "deskripsi": "Updated Item Description"
    }
    ```
- **DELETE** `/items/:id`: Deletes an item by ID.

## Code Snippets

### HTML: `index.html`

This is the HTML structure that includes a form to add items and a table to display them.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CRUD Application</title>
  </head>
  <body>
    <h1>CRUD Application</h1>
    <form id="itemForm">
      <input type="text" id="itemName" placeholder="Item Name" required />
      <input
        type="text"
        id="itemDescription"
        placeholder="Item Description"
        required
      />
      <button type="submit">Add Item</button>
    </form>
    <table id="itemTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    <script src="script.js"></script>
  </body>
</html>
```

### Frontend Logic: `script.js`

This JavaScript file handles the DOM manipulation and the API requests for CRUD operations.

```javascript
// Define the API URL
const apiUrl = "http://localhost:3000/items";

// Get DOM elements
const itemForm = document.getElementById("itemForm");
const itemName = document.getElementById("itemName");
const itemDescription = document.getElementById("itemDescription");
const itemTableBody = document.querySelector("#itemTable tbody");

// Fetch and display items
async function fetchItems() {
  const response = await fetch(apiUrl);
  const items = await response.json();
  itemTableBody.innerHTML = ""; // Clear table

  items.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.item}</td>
      <td>${item.deskripsi}</td>
      <td>
        <button onclick="editItem(${item.id})">Edit</button>
        <button onclick="deleteItem(${item.id})">Delete</button>
      </td>
    `;
    itemTableBody.appendChild(row);
  });
}

// Create a new item
itemForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newItem = {
    item: itemName.value,
    deskripsi: itemDescription.value,
  };

  await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  });

  fetchItems();
  itemForm.reset();
});

// Delete an item
async function deleteItem(id) {
  await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });
  fetchItems();
}

// Initial fetch of items
fetchItems();
```

### Backend Logic: `app.js`

This is the Node.js backend powered by Express, which handles the API requests and manages data in an in-memory array.

```javascript
import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

let items = []; // In-memory data storage

// GET all items
app.get("/items", (req, res) => {
  res.json(items);
});

// POST a new item
app.post("/items", (req, res) => {
  const newItem = {
    id: items.length + 1,
    ...req.body,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT (update) an item by ID
app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === id);
  if (index !== -1) {
    items[index] = { id, ...req.body };
    res.json(items[index]);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// DELETE an item by ID
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter((item) => item.id !== id);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

## How the Application Works

1. **Frontend (HTML, CSS, JavaScript)**:

   - The HTML form allows the user to input an item name and description.
   - JavaScript handles the form submission, fetches data from the API, and updates the DOM dynamically.
   - A table displays all the items, with "Edit" and "Delete" buttons for each item.

   **Form Elements**:

   - `itemForm`: A form that contains two input fields and a submit button.
     - `itemName`: The input field for the item name.
     - `itemDescription`: The input field for the item description.

   **Table Elements**:

   - `itemTable`: A table that displays the list of items and their descriptions. It also contains action buttons for editing and deleting items.

2. **Backend (Node.js with Express)**:
   - A local array is used to store items, acting as an in-memory "database".
   - The server listens on `http://localhost:3000` and exposes the REST API for CRUD operations.
   - When a new item is added, it is pushed into the `items` array, and when an item is edited or deleted, the corresponding array element is updated or removed.

### CRUD Operations

- **Create**:
  - When the user submits the form, a `POST` request is sent to the backend. The new item is stored in the `items` array, and the table is updated dynamically.
- **Read**:

  - On page load, a `GET` request is sent to fetch all items from the server. The items are then displayed in the table.

- **Update**:

  - When the user clicks "Edit" on an item, a `PUT` request is sent to the backend with the updated data. The corresponding item in the `items` array is updated, and the table reflects the changes.

- **Delete**:
  - When the user

clicks "Delete" on an item, a `DELETE` request is sent to the server, removing the item from the `items` array and the table.

### Future Updates

- The project might be updated to include more fields for each item as per assignment requirements.

## License

This project is licensed under the MIT License.

Now you can copy and paste this into your project's `README.md` file.
