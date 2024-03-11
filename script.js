const shareBtn = document.querySelector(".header__share-button");
const shoppingList = document.querySelector(".shopping-list");
const modal = document.querySelector(".modal");
const optionsShareBtn = document.getElementById("modalShareBtn");
const optionsCopyBtn = document.getElementById("modalCopyBtn");
const optionsPasteBtn = document.getElementById("modalPasteBtn");
const itemNameInput = document.querySelector(".modal__input");
const openModalBtn = document.getElementById("openModalBtn");
const submitModalBtn = document.getElementById("modalSubmitBtn");

const itemTemplate = document.getElementById("item-template");

//LOCAL STORAGE
let shoppingListData =
  JSON.parse(localStorage.getItem("shoppingListData")) || [];

// Event handlers
openModalBtn.addEventListener("click", openModal);
submitModalBtn.addEventListener("click", handleSubmitModal);
itemNameInput.addEventListener(
  "keyup",
  (e) => e.key === "Enter" && handleSubmitModal()
);

// MODAL
// Open modal
function openModal() {
  modal.showModal();
  setTimeout(() => itemNameInput.focus(), 100);
}

function closeModal() {
  modal.close();
}

function handleSubmitModal() {
  // Filter user input
  if (itemNameInput.value.trim() === "") {
    closeModal();
    return;
  }
  const filteredData = filterInput(itemNameInput.value); //  returns [{item1}, {item2}, {item3]

  // Update shoppingListData
  shoppingListData.push(...filteredData);
  console.log(shoppingListData);

  // Render shoppingList from shoppingListData
  renderShoppingListData();
  save();
  // Clear input field
  itemNameInput.value = "";
}

function createItemNode(itemObj) {
  const itemNode = document.importNode(itemTemplate.content, true);
  itemNode
    .querySelector("li")
    .setAttribute("data-id", itemObj.id ? itemObj.id : uid());
  itemNode.querySelector("p").textContent = itemObj.name
    ? itemObj.name
    : "placeholder";
  itemNode.querySelector("input").checked = itemObj.isChecked;

  // Hook event handlers
  // Removing item from the DOM and shoppingListData
  itemNode.querySelector("button").addEventListener("click", (e) => {
    e.target.parentElement.remove();
    save();
  });
  // Saving checkbox state in the shoppingListData
  itemNode.querySelector("input").addEventListener("change", save);

  return itemNode;
}

function renderShoppingListData() {
  // Clear shopping list
  shoppingList.innerHTML = "";
  // Render items from shoppingListData
  shoppingListData.map((item) => {
    const itemNode = createItemNode(item);
    shoppingList.appendChild(itemNode);
  });
}

function save() {
  shoppingListData = [];
  const shoppingListItems = document.querySelectorAll(".shopping-list__item");

  shoppingListItems.forEach((item) => {
    shoppingListData.push({
      id: item.dataset.id,
      name: item.querySelector("p").textContent,
      isChecked: item.querySelector("input").checked,
    });
  });

  localStorage.setItem("shoppingListData", JSON.stringify(shoppingListData));
  console.log("Saved: ", shoppingListData);
}

//Fiter user Input
function filterInput(itemName) {
  let filteredData = [];
  if (itemName.includes(",")) {
    filteredData = itemName
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);
  } else if (itemName.includes("-")) {
    filteredData = itemName
      .split("-")
      .map((item) => item.trim())
      .filter((item) => item);
  } else if (itemName !== "") {
    filteredData = [itemName.trim()];
  }

  // [item1, item2] -> [{"name":"item1"},{name:"item2"}]
  filteredData = filteredData.map((itemName) => {
    return { name: itemName };
  });

  return filteredData;
}

// MODAL MENU OPTIONS
function createSMS() {
  const itemNames = shoppingListData.map((item) => item.name).join("\n- ");
  const sms = `Lista zakupów:
  ${"\n- " + itemNames}
  \nSkopiuj wiadomość i kliknij link, aby wyświetlić listę zakupów w aplikacji.
  🔗 https://prostalistazakupow.netlify.app/`;

  return sms;
}

// Share list via socials
shareBtn.addEventListener("click", () => {
  if (shoppingListData == "") return alert("Dodaj produkty");

  if (navigator.share) {
    navigator.share({
      text: createSMS(),
    });
  } else {
    navigator.clipboard.writeText(sms) &&
      alert("Skopiowano listę zakupów do schowka");
  }
});
optionsShareBtn.addEventListener("click", () => {
  shareBtn.click();
});

// Copy list to the clipboard
optionsCopyBtn.addEventListener("click", async () => {
  if (shoppingListData == "") return alert("Dodaj produkty");

  try {
    await navigator.clipboard.writeText(createSMS());
    alert(`Skopiowano listę zakupów do schowka`);
  } catch (error) {
    console.error(error.message);
    alert("Nie udało się wczytać listy zakupów ze schowka\n\n" + error.message);
  }
});

//Paste list from the clipboard
optionsPasteBtn.addEventListener("click", async () => {
  try {
    const read = await navigator.clipboard.readText();
    if (read.includes("https://prostalistazakupow.netlify.app/")) {
      itemNameInput.value = read.slice(19, read.lastIndexOf("S"));
    }
  } catch (error) {
    console.error(error.message);
    alert("Nie udało się wczytać listy zakupów ze schowka\n\n" + error.message);
  }

  submitModalBtn.focus();
});

// Paste directly into input field
itemNameInput.addEventListener("paste", (event) => {
  event.preventDefault();
  let modifiedData = "";
  let pastedData = "";

  try {
    pastedData = event.clipboardData.getData("text/plain");
    if (pastedData.includes("https://prostalistazakupow.netlify.app/")) {
      modifiedData = pastedData.slice(19, pastedData.lastIndexOf("S"));
    }
  } catch (error) {
    console.error(error.message);
    alert("Nie udało się wkleić listy zakupów do schowka");
  }

  modifiedData
    ? (itemNameInput.value = modifiedData)
    : (itemNameInput.value = pastedData);
});

const uid = function () {
  return Math.random().toString(36).slice(2, -1);
};

renderShoppingListData();
