const modalWrapper = document.querySelector(".modal-wrapper");
// modal add
const addTodo = document.querySelector(".add-todo");
const addTodoForm = document.querySelector(".add-todo .form");
// modal edit
const editModal = document.querySelector(".edit-modal");
const doneTodo = document.querySelector(".done");
const editModalForm = document.querySelector(".edit-modal .form");
const btnAdd = document.querySelector(".btn-add");
const tableTodos = document.querySelector(".table-todos");
let id;
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Create element and render to-do
const renderTodo = (doc) => {
  const tr = `  
    <tr data-id='${doc.id}'>
      <td>${doc.data().todo}</td>        
      <th>         
        <button class="btn btn-edit">Edit</button>
        <button class="btn btn-delete">Del</button>        
      </th>
    </tr>
  `;
  tableTodos.insertAdjacentHTML("beforeend", tr);

  // Click edit to-do
  const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
  btnEdit.addEventListener("click", () => {
    editModal.classList.add("modal-show");
    id = doc.id;
    editModalForm.todo.value = doc.data().todo;
  });

  // Click delete to-do
  const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
  btnDelete.addEventListener("click", () => {
    db.collection("16")
      .doc(`${doc.id}`)
      .delete()
      .then(() => {
        console.log("Document succesfully deleted!");
      })
      .catch((err) => {
        console.log("Error removing document", err);
      });
  });
};
// User click anyware outside the modal
window.addEventListener("click", (e) => {
  if (e.target === addTodo) {
    addModal.classList.remove("modal-show");
  }
  if (e.target === editModal) {
    editModal.classList.remove("modal-show");
  }
});
// Real time listener
db.collection("16").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      renderTodo(change.doc);
    }
    if (change.type === "removed") {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableTodos.removeChild(tbody);
    }
    if (change.type === "modified") {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableTodos.removeChild(tbody);
      renderTodo(change.doc);
    }
  });
});

addTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("16").add({
    todo: addTodoForm.todo.value,
  });
  addTodoForm.todo.value = "";
});

// Click submit in edit to-do
editModalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("16").doc(id).update({
    todo: editModalForm.todo.value,
  });
  editModal.classList.remove("modal-show");
});
