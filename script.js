const shoppingList = document.querySelector(".shopping-list");
const shoppingListItems = document.querySelectorAll(".shopping-list__item");
const modal = document.querySelector(".modal");
const productNameInput = document.querySelector(".modal__input");
const openModalBtn = document.querySelector(".add-product-button");
const submitModalBtn = document.querySelector(".modal__submit-button");

let productsData = [];
submitModalBtn.addEventListener("click", addProduct);

// Load data from local storage
function loadFromLocalStorage() {
  if (localStorage.getItem("productsArray")) {
    productsData = JSON.parse(localStorage.getItem("productsArray"));
    loadProducts(productsData);
  }
}

// Save data to local storage
function saveToLocalStorage() {
  productsData = Array.from(
    shoppingList.querySelectorAll(".shopping-list__item")
  ).map((product) => {
    return product.querySelector(".shopping-list__item__name").textContent;
  });

  localStorage.setItem("productsArray", JSON.stringify(productsData));
}

// Open modal
openModalBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.showModal();
});

// Add product
function addProduct() {
  const productName = productNameInput.value;
  let productsArray = [];

  // Input filtering
  if (productName.includes(",")) {
    productsArray = [] = productName
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);
    console.log(productsArray);
  } else if (productName.includes("-")) {
    productsArray = [] = productName
      .split("-")
      .map((item) => item.trim())
      .filter((item) => item);
    console.log(productsArray);
  } else if (productName.trim() != "") {
    productsArray = [productName];
  }

  loadProducts(productsArray);
  saveToLocalStorage();

  // Clear input and close modal
  productsArray = [];
  productNameInput.value = "";
  modal.close();
}

// Load products
function loadProducts(productsArray) {
  // Create shopping list items
  productsArray.forEach((item) => {
    const productListItem = `
      <li class="shopping-list__item">
        <input type="checkbox" class="shopping-list__item__checkbox" />
        <p class="shopping-list__item__name">${item}</p>
        <button type="button" class="shopping-list__item__remove-button">X</button>
      </li>
    `;

    // Insert product list item into DOM
    shoppingList.insertAdjacentHTML("beforeend", productListItem);

    // Hook event listener to remove button
    shoppingList.lastElementChild
      .querySelector(".shopping-list__item__remove-button")
      .addEventListener("click", (event) => {
        const item = event.target.parentElement;
        item.remove();
        saveToLocalStorage();
      });
  });
}

loadFromLocalStorage();
