const shopList = document.querySelector("#shopList");
const addBtn = document.querySelector("#addBtn");
const modal = document.querySelector("#modalDiv");
const closeBtn = document.querySelector("#closeBtn");
const productInp = document.querySelector("#productInp");
const submitBtn = document.querySelector("#submitBtn");

const productArray = [];

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
}

function addMultipleProducts(Array) {
  Array.forEach((productName) => {
    shopList.innerHTML += `<div class="productDiv"><input type="checkbox" name="productCheckbox" class="productChk form-check-input" id="productChk"><li class="">${productName}</li></div>`;
    productArray.push(productName);
  });
  productInp.value = "";
}

productInp.addEventListener("keypress", (e) => {
  let productValue = productInp.value;
  if (e.key === "Enter" && productInp.value === "") {
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
    productArray.push(productValue);
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
    productArray.push(productValue);
    addProduct(productValue);
    productInp.focus();
  }
});
