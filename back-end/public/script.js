const form = document.getElementById('itemForm');
const itemName = document.getElementById('itemName');
const itemDescription = document.getElementById('itemDescription');
const itemTable = document.getElementById('itemTable').getElementsByTagName('tbody')[0];

// Fetch all items on page load
document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/items');
    const items = await response.json();
    items.forEach(item => addItemToTable(item));
});

// Handle form submission (Create)
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newItem = {
        item: itemName.value,
        deskripsi: itemDescription.value
    };

    const response = await fetch('/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
    });

    const item = await response.json();
    addItemToTable(item);

    // Clear form
    itemName.value = '';
    itemDescription.value = '';
});

// Add item to table
function addItemToTable(item) {
    const row = itemTable.insertRow();
    row.dataset.id = item.id; // Store item ID in dataset
    row.innerHTML = `
        <td>${item.item}</td>
        <td>${item.deskripsi}</td>
        <td>
            <button onclick="editItem(${item.id}, this)">Edit</button>
            <button onclick="deleteItem(${item.id}, this)">Delete</button>
        </td>
    `;
}

// Edit item
async function editItem(id, button) {
    const row = button.parentElement.parentElement;
    const item = prompt('Update item name:', row.cells[0].textContent);
    const deskripsi = prompt('Update description:', row.cells[1].textContent);

    const updatedItem = { item, deskripsi };

    await fetch(`/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem)
    });

    row.cells[0].textContent = item;
    row.cells[1].textContent = deskripsi;
}

// Delete item
async function deleteItem(id, button) {
    await fetch(`/items/${id}`, { method: 'DELETE' });
    const row = button.parentElement.parentElement;
    row.remove();
}
