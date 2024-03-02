const shoppingList = document.querySelector(".shopping-list");
const shoppingListItems = document.querySelectorAll(".shopping-list__item");
const modal = document.querySelector(".modal");
const productNameInput = document.querySelector(".modal__input");
const openModalBtn = document.querySelector(".add-product-button");
const submitModalBtn = document.querySelector(".modal__submit-button");

let productsData = [];

// LOCAL STORAGE

// Get the data from local storage
if (localStorage.getItem("productsArray")) {
  productsData = JSON.parse(localStorage.getItem("productsArray"));
  loadProducts(productsData);
}

function saveToLocalStorage() {
  productsData = Array.from(
    shoppingList.querySelectorAll(".shopping-list__item")
  ).map((product) => {
    return product.querySelector(".shopping-list__item__name").textContent;
  });

  localStorage.setItem("productsArray", JSON.stringify(productsData));
}

function loadProducts(productsArray) {
  // Creating shopping-list__item
  productsArray.forEach((item) => {
    const productListItem = `
      <li class="shopping-list__item">
        <input type="checkbox" class="shopping-list__item__checkbox" />
        <p class="shopping-list__item__name">${item}</p>
        <button type="button" class="shopping-list__item__remove-button">X</button>
      </li>
    `;

    // Inserting shopping-list__item in the DOM
    shoppingList.insertAdjacentHTML("beforeend", productListItem);

    // Hooking EventListener to remove buttons
    shoppingList.lastElementChild
      .querySelector(".shopping-list__item__remove-button")
      .addEventListener("click", (event) => {
        const item = event.target.parentElement;
        item.remove();
        saveToLocalStorage();
      });
  });
}

// MODAL
openModalBtn.addEventListener("click", () => {
  modal.showModal();
});

// ADDING PRODUCTS
submitModalBtn.addEventListener("click", () => {
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

  productsArray = [];
  productNameInput.value = "";
  modal.close();
});
