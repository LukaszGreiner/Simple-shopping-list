const shareBtn = document.querySelector(".header__share-button");
const shoppingList = document.querySelector(".shopping-list");
const shoppingListItems = document.querySelectorAll(".shopping-list__item");
const modal = document.querySelector(".modal");
const optionsShareBtn = document.getElementById("modalShareBtn");
const optionsCopyBtn = document.getElementById("modalCopyBtn");
const optionsPasteBtn = document.getElementById("modalPasteBtn");
const productNameInput = document.querySelector(".modal__input");
const openModalBtn = document.getElementById("openModalBtn");
const submitModalBtn = document.getElementById("modalSubmitBtn");

let productsData = [];
let sms = "";
submitModalBtn.addEventListener("click", addProduct);
loadFromLocalStorage();
printProducts(productsData);
modal.showModal();

// LOCAL STORAGE

// Load data from local storage
function loadFromLocalStorage() {
  if (localStorage.getItem("productsArray")) {
    productsData = JSON.parse(localStorage.getItem("productsArray"));
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

// MODAL MENU OPTIONS

function createSMS() {
  let result = "";
  productsData.forEach((product) => {
    result += `-${product}\n`;
  });

  sms = `
Lista zakupów:
  ${"\n- " + productsData.toString().replace(/,/g, "\n- ")}
  \nSkopiuj wiadomość i kliknij link, aby wyświetlić listę zakupów w aplikacji.
🔗 https://prostalistazakupow.netlify.app/`;
}

// Share list via socials
shareBtn.addEventListener("click", () => {
  createSMS();
  if (navigator.share) {
    navigator.share({
      text: sms,
      url: "https://prostalistazakupow.netlify.app/",
      title: "Lista zakupów",
    });
  } else {
    navigator.clipboard.writeText(sms);
  }
});
optionsShareBtn.addEventListener("click", () => {
  shareBtn.click();
});

// Copy list to the clipboard
optionsCopyBtn.addEventListener("click", async () => {
  if (productsData == "") alert("Dodaj produkty");
  else {
    createSMS();
    await navigator.clipboard.writeText(sms);
    alert(`Skopiowano do schowka listę produktów!`);
  }
});

//Paste list from the clipboard
optionsPasteBtn.addEventListener("click", async () => {
  const read = await navigator.clipboard.readText();
  productNameInput.value = read.slice(19, -122);
  submitModalBtn.focus();
});

// Paste directly into input field
// productNameInput.addEventListener("paste", (e) => {
//   e.preventDefault();
//   const pastedData = event.clipboardData.getData("text/plain");
//   const modifiedData = pastedData.slice(19, -122);

//   productNameInput.value = modifiedData;
// });

// Open modal
openModalBtn.addEventListener("click", (e) => {
  modal.showModal();
  productNameInput.focus();
});

// Add product
function addProduct() {
  let productName = productNameInput.value;
  let productsArray = [];

  // Filter sms, when paste EventListnerFails
  productNameInput.value.includes("https://prostalistazakupow.netlify.app/")
    ? (productName = productNameInput.value.slice(19, -122))
    : null;

  // Input filtering
  if (productName.includes(",")) {
    productsArray = productName
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);
  } else if (productName.includes("-")) {
    productsArray = productName
      .split("-")
      .map((item) => item.trim())
      .filter((item) => item);
  } else if (productName.trim() != "") {
    productsArray = [productName];
  }

  printProducts(productsArray);
  saveToLocalStorage();

  // Clear input and close modal
  productsArray = [];
  productNameInput.value = "";
  modal.close();
}

// Load products
function printProducts(productsArray) {
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
