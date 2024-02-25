const shopList = document.querySelector("#shopList");
const addBtn = document.querySelector("#addBtn");
const modal = document.querySelector("#modalDiv");
const closeBtn = document.querySelector("#closeBtn");
const productInp = document.querySelector("#productInp");

const productArray = [];

addBtn.addEventListener("click", () => {
  modal.classList.add("active");
  productInp.focus();
});

function hideModal() {
  modal.classList.remove("active");
}

closeBtn.addEventListener("click", () => {
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
  } else if (e.key === "Enter") {
    productArray.push(productValue);
    addProduct(productValue);
  }
});

/*
- masło
- bułka tarta
- jajka

masło, bułka tarta, jajka
*/
