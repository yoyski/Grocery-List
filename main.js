const itemInput = document.querySelector('.js-item-input');
const addButton = document.querySelector('.js-add-btn');
const editButton = document.querySelector('.js-edit-btn');
const groceryList = document.querySelector('.js-grocery-list');
const finishedItemButton = document.querySelector(".finished-item-btn");
const clearItemButton = document.querySelector('.js-clear-item-btn')
const finishedGroceryList = document.querySelector(".js-finished-grocery-list")

let groceryListObj = JSON.parse(localStorage.getItem("items")) || [];

addButton.addEventListener("click", addItem);
editButton.addEventListener("click", toggleEdit);
groceryList.addEventListener("click", editTask)
finishedItemButton.addEventListener("click", showItem);

renderGroceryList();

function addItem() {
  const item = itemInput.value.trim();
  if (item) {
    groceryListObj.push(item);
    localStorage.setItem("items", JSON.stringify(groceryListObj));
    renderGroceryList();
    //loadStyle();
    itemInput.value = "";
  }
}
/*let styles = JSON.parse(localStorage.getItem('styles')) || {}

loadStyle()

function loadStyle(){
  styles = {
    finishedButtonDisplay: "inline-block",
    clearButtonDisplay: "inline-block"
  }
  
  if(groceryListObj.length){
    localStorage.setItem('styles', JSON.stringify(styles))

    finishedItemButton.style.display = styles.finishedButtonDisplay
    clearItemButton.style.display = styles.clearButtonDisplay
  }
}*/

function toggleEdit() {
  const finishedButton = document.querySelectorAll('.js-finished-btn');
  const taskEdit = document.querySelectorAll('.js-task');
  editButton.textContent = editButton.textContent === "Done" ? "Edit" : "Done";
  finishedButton.forEach( btn => btn.classList.toggle('new-finished-btn'))
}

function editTask(e) {
  const target = e.target;
  const isEditButton = target.classList.contains("js-edit-task-btn");
  const isSpan = target.matches("span");

  if (isEditButton && editButton.textContent === 'Done') {
    const spanElement = target.previousElementSibling;
    spanElement.setAttribute("contenteditable", "true");
    spanElement.focus();
    editButton.textContent = 'Save';
  } else if (isSpan && editButton.textContent === 'Save') {
    target.setAttribute("contenteditable", "false");
    const editedText = target.textContent.trim();
    localStorage.setItem("editedTask", editedText);
    console.log(localStorage.getItem("editedTask"));
    editButton.textContent = 'Done';
  }
}


function showItem() {
  if(groceryListObj.length){
    console.log("items")
  }else{
    const newEl = document.createElement('div')
    newEl.textContent = "No Items"
    finishedGroceryList.style.display = 'block'
    finishedGroceryList.appendChild(newEl)
  }
}

function renderGroceryList() {
  groceryList.textContent = "";
  groceryListObj.forEach(item => {
    const html = `
      <li>
        <input class="js-check-box" type="checkbox">
        <span class="js-task task">${item}</span>
        <button class="js-edit-task-btn edit-task-btn">Edit</button>
        <button class="js-finished-btn finished-btn">Finished</button>
      </li>
    `;
    groceryList.insertAdjacentHTML("beforeend", html);
  });
}