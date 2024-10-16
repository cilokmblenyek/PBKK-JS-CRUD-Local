const form = document.getElementById('itemForm');
const itemName = document.getElementById('itemName');
const itemDescription = document.getElementById('itemDescription');
const itemTable = document.getElementById('itemTable').getElementsByTagName('tbody')[0];

// Fetch all products on page load
document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('/produk');
  const products = await response.json();
  products.forEach(product => addProductToTable(product));
});

// Add new product on form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newProduct = {
    item: itemName.value,
    deskripsi: itemDescription.value
  };

  const response = await fetch('/produk', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newProduct)
  });
  
  const product = await response.json();
  addProductToTable(product);

  // Clear form
  itemName.value = '';
  itemDescription.value = '';
});

// Function to add product to table
function addProductToTable(product) {
  const row = itemTable.insertRow();
  row.innerHTML = `
    <td>${product.item}</td>
    <td>${product.deskripsi}</td>
    <td>
      <button onclick="editProduct(${product.id}, this)">Edit</button>
      <button onclick="deleteProduct(${product.id}, this)">Delete</button>
    </td>
  `;
}

// Edit product function
async function editProduct(id, button) {
  const row = button.parentElement.parentElement;
  const item = prompt('Update item name:', row.cells[0].textContent);
  const deskripsi = prompt('Update description:', row.cells[1].textContent);

  const updatedProduct = { item, deskripsi };

  await fetch(`/produk/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedProduct)
  });

  row.cells[0].textContent = item;
  row.cells[1].textContent = deskripsi;
}

// Delete product function
async function deleteProduct(id, button) {
  await fetch(`/produk/${id}`, {
    method: 'DELETE'
  });
  const row = button.parentElement.parentElement;
  row.remove();
}
