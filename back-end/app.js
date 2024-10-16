import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let items = []; // Array to store items

// Create (POST) - Add a new item
app.post('/items', (req, res) => {
    const { item, deskripsi } = req.body;
    const newItem = { id: items.length + 1, item, deskripsi };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Read (GET) - Get all items
app.get('/items', (req, res) => {
    res.status(200).json(items);
});

// Update (PUT) - Update an existing item
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { item, deskripsi } = req.body;

    const index = items.findIndex(i => i.id == id);
    if (index !== -1) {
        items[index].item = item;
        items[index].deskripsi = deskripsi;
        res.status(200).json(items[index]);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

// Delete (DELETE) - Remove an item
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    const index = items.findIndex(i => i.id == id);

    if (index !== -1) {
        const deletedItem = items.splice(index, 1);
        res.status(200).json(deletedItem);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

// Serve static files (for index.html and script.js)
app.use(express.static('public'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
