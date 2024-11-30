const addProductToggle = document.getElementById("addProductToggle");
const addProductForm = document.getElementById("addProductForm");
const productList = document.getElementById("productList");
const saveProduct = document.getElementById("saveProduct");


function loadProducts() {
    fetch("http://localhost:3000/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar os produtos.");
        }
        return response.json();
      })
      .then((products) => {
        products.forEach((product) => displayProduct(product));
      })
      .catch((error) => {
        console.error(error);
        alert("Não foi possível carregar os produtos.");
      });
  }
  
  function displayProduct(product) {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
  
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>R$ ${product.price}</p>
      <button onclick="deleteProduct(${product.id}, this)">Excluir</button>
    `;
  
    productList.appendChild(productCard);
  }
  

// Alterna a visibilidade do formulário
addProductToggle.addEventListener("click", () => {
  addProductForm.classList.toggle("hidden");
});

// Salva um novo produto
saveProduct.addEventListener("click", () => {
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const image = document.getElementById("productImage").value;

  if (name && price && image) {
    addProduct(name, price, image);
    clearForm();
  } else {
    alert("Por favor, preencha todos os campos!");
  }
});

// Adiciona um produto à lista
function addProduct(name, price, image) {
    const product = { name, price, image };
  
    // Faz uma requisição POST para a API
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao salvar o produto.");
        }
        return response.json();
      })
      .then((savedProduct) => {
        // Após salvar, adiciona o produto à lista exibida
        displayProduct(savedProduct);
      })
      .catch((error) => {
        console.error(error);
        alert("Não foi possível salvar o produto.");
      });
  }

// Remove um produto da lista
function deleteProduct(id, button) {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao excluir o produto.");
        }
        // Remove do DOM
        button.parentElement.remove();
      })
      .catch((error) => {
        console.error(error);
        alert("Não foi possível excluir o produto.");
      });
  }  

// Limpa o formulário
function clearForm() {
  document.getElementById("productForm").reset();
}

document.addEventListener("DOMContentLoaded", loadProducts);

