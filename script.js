const shopList = document.querySelector("#shopList");
const addBtn = document.querySelector("#addBtn");
const modal = document.querySelector("#modalDiv");
const closeBtn = document.querySelector("#closeBtn");
const productInp = document.querySelector("#productInp");
const submitBtn = document.querySelector("#submitBtn");

let productArray = [];

// Check if there is data in local storage
if (localStorage.getItem("productArray")) {
  // Get the data from local storage
  productArray = JSON.parse(localStorage.getItem("productArray"));
}

// Add products to the list
productArray.forEach((product) => {
  shopList.innerHTML += `<div class="productDiv"><input type="checkbox" name="productCheckbox" class="productChk form-check-input" id="productChk"><li class="">${product}</li></div>`;
});

// BUTTONS
addBtn.addEventListener("click", () => {
  modal.classList.add("active");
  submitBtn.classList.add("active");
  productInp.focus();
});

addBtn.addEventListener("click", () => {
  modal.classList.add("active");
  submitBtn.classList.add("active");
  productInp.focus();
});

function hideModal() {
  modal.classList.remove("active");
  submitBtn.classList.remove("active");
}

// Redundant, because of productInp blur event listener
closeBtn.addEventListener("click", () => {
  hideModal();
});

productInp.addEventListener("blur", (e) => {
  if (e.relatedTarget != null && e.relatedTarget.id === "submitBtn") return;
  hideModal();
});

function addProduct(productName) {
  productArray.push(productName);
  shopList.innerHTML += `<div class="productDiv"><input type="checkbox" name="productCheckbox" class="productChk form-check-input" id="productChk"><li class="">${productName}</li></div>`;
  productInp.value = "";

  // Add product to local storage
  localStorage.setItem("productArray", JSON.stringify(productArray));
}

function addMultipleProducts(Array) {
  Array.forEach((productName) => {
    shopList.innerHTML += `<div class="productDiv"><input type="checkbox" name="productCheckbox" class="productChk form-check-input" id="productChk"><li class="">${productName}</li></div>`;
    productArray.push(productName);
  });
  productInp.value = "";

  // Add product to local storage
  localStorage.setItem("productArray", JSON.stringify(productArray));
}

productInp.addEventListener("keydown", (e) => {
  let productValue = productInp.value;
  if ((e.key === "Enter" && productInp.value === "") || e.key === "Escape") {
    hideModal();
  }
  // Multiple products separated by ","
  else if (e.key === "Enter" && productInp.value.includes(",")) {
    let productArray = [];
    productArray = productInp.value.split(",");
    addMultipleProducts(productArray);
    hideModal();
  }
  // Multiple products separated by "-"
  else if (e.key === "Enter" && productInp.value.includes("-")) {
    let productArray = [];
    productArray = productInp.value.split("-");
    productArray.shift();
    addMultipleProducts(productArray);
    hideModal();
  }
  // Add single product
  else if (e.key === "Enter") {
    addProduct(productValue);
  }
});

// Add product when user click on sumbmit button\
// Maybe slice string after pasting it?
submitBtn.addEventListener("click", (e) => {
  let productValue = productInp.value;

  if (productInp.value === "") hideModal();
  // Multiple products separated by ","
  else if (productInp.value.includes(",")) {
    let productArray = [];
    productArray = productInp.value.split(",");
    addMultipleProducts(productArray);
    hideModal();
  }
  // Multiple products separated by "-"
  else if (productInp.value.includes("-")) {
    let productArray = [];
    productArray = productInp.value.split("-");
    productArray.shift();
    addMultipleProducts(productArray);
    hideModal();
  }
  // Add single product
  else {
    addProduct(productValue);
    productInp.focus();
  }
});
