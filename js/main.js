const form = document.getElementById("novoItem");
const list = document.querySelector(".lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

// FUNCTIONS

function createButton(li) {
  button = document.createElement("a");
  button.classList.add("del-button");
  button.innerHTML = '<span class="material-symbols-outlined">delete</span>';

  li.appendChild(button);
}

function createElement(item) {
  const li = document.createElement("li");
  li.classList.add("item");
  li.dataset.id = item.id;

  const strong = document.createElement("strong");
  strong.innerHTML = item.quantity;

  li.appendChild(strong);
  li.innerHTML += item.name;

  createButton(li);
  list.appendChild(li);
}

function updateElement(item) {
  const li = document.querySelector(`[data-id='${item.id}']`);
  const strong = li.firstChild;
  // console.log(strong)
  strong.innerHTML = item.quantity;
}

function deleteElement(item) {
  itemId = item.dataset.id;
  itens.splice(itens.findIndex(element => element.id === itemId), 1);

  localStorage.setItem("itens", JSON.stringify(itens));
  list.removeChild(item);
}

// MAIN

itens.forEach((item) => {
  createElement(item);
});

form.addEventListener("submit", (event) => {
  // this prevents what's supposed to happen, so that in a
  // form submit event the form is not submitted
  event.preventDefault();

  const name = event.target.elements["nome"];
  const quantity = event.target.elements["quantidade"];

  if (name.value == "") {
    return;
  }

  const item = {
    name: name.value.charAt(0).toUpperCase()
    + name.value.slice(1),
    quantity: quantity.value,
  };

  const exists = itens.find(
    (item) => item.name.trim().toLowerCase() === name.value.trim().toLowerCase()
  );

  if (exists) {
    item.id = exists.id;
    updateElement(item);
    const index = itens.indexOf(exists);
    if (index != -1) {
      itens.splice(index, 1, item);
    }
  } else {
    item.id = Date.now();
    createElement(item);
    itens.push(item);
  }

  localStorage.setItem("itens", JSON.stringify(itens));

  name.value = "";
  quantity.value = "";
});

const delButtons = document.querySelectorAll(".del-button");
delButtons.forEach((button) => {
  button.addEventListener("click", () => deleteElement(button.parentNode));
});
