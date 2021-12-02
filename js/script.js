"use strict";
const showTodo1 = document.querySelector(".show-modal");
const showTodo2 = document.querySelector(".show-modal");
const modalWrapper = document.querySelector(".modal-wrapper");
// modal add
const addTodo = document.querySelector(".add-todo");
const addTodoForm = document.querySelector(".add-todo .form");
// modal edit
const editModal = document.querySelector(".edit-modal");
const doneTodo = document.querySelector(".done");
const editModalForm = document.querySelector(".edit-modal .form");
const btnAdd = document.querySelector(".btn-add");
const tableTodos1 = document.querySelector(".table-1");
const tableTodos2 = document.querySelector(".table-1");
let id;

window.onload = function () {
  today();
};

function today() {
  const date = new Date();
  const day = date.getDate();
  console.log(day);
  // const day = 27;

  switch (day) {
    case 1:
      // document.getElementById("1").innerHTML = "1";
      document.getElementById("1").className = "free today";
      break;
    case 2:
      document.getElementById("2").className = "work today";
      break;
    case 3:
      document.getElementById("3").className = "work today";
      break;
    case 4:
      document.getElementById("4").className = "free today";
      break;
    case 5:
      document.getElementById("5").className = "free today";
      break;
    case 6:
      document.getElementById("6").className = "work today";
      break;
    case 7:
      document.getElementById("7").className = "work today";
      break;
    case 8:
      document.getElementById("8").className = "work today";
      break;
    case 9:
      document.getElementById("9").className = "work today";
      break;
    case 10:
      document.getElementById("10").className = "work today";
      break;
    case 11:
      document.getElementById("11").className = "free today";
      break;
    case 12:
      document.getElementById("12").className = "free today";
      break;
    case 13:
      document.getElementById("13").className = "work today";
      break;
    case 14:
      document.getElementById("14").className = "work today";
      break;
    case 15:
      document.getElementById("15").className = "work today";
      break;
    case 16:
      document.getElementById("16").className = "work today";
      break;
    case 17:
      document.getElementById("17").className = "free today";
      break;
    case 18:
      document.getElementById("18").className = "work today";
      break;
    case 19:
      document.getElementById("19").className = "work today";
      break;
    case 20:
      document.getElementById("20").className = "work today";
      break;
    case 21:
      document.getElementById("21").className = "free today";
      break;
    case 22:
      document.getElementById("22").className = "free today";
      break;
    case 23:
      document.getElementById("23").className = "work today";
      break;
    case 24:
      document.getElementById("24").className = "work today";
      break;
    case 25:
      document.getElementById("25").className = "work today";
      break;
    case 26:
      document.getElementById("26").className = "work today";
      break;
    case 27:
      document.getElementById("27").className = "free today";
      break;
    case 28:
      document.getElementById("28").className = "free today";
      break;
    case 29:
      document.getElementById("29").className = "work today";
      break;
    case 30:
      document.getElementById("30").className = "work today";
      break;
    case 31:
      document.getElementById("31").className = "today";
      break;
  } //switch
} //today()

function todo_1() {
  showTodo1.classList.add("modal-show");
}
function todo_2() {
  open("html/todo_2.html");
}
function todo_3() {
  open("html/todo_3.html");
}
function todo_4() {
  open("html/todo_4.html");
}
function todo_5() {
  open("html/todo_5.html");
}
function todo_6() {
  open("html/todo_6.html");
}
function todo_7() {
  open("html/todo_7.html");
}
function todo_8() {
  open("html/todo_8.html");
}
function todo_9() {
  open("html/todo_9.html");
}
function todo_10() {
  open("html/todo_10.html");
}
function todo_11() {
  open("html/todo_11.html");
}
function todo_12() {
  open("html/todo_12.html");
}
function todo_13() {
  open("html/todo_13.html");
}
function todo_14() {
  open("html/todo_14.html");
}
function todo_15() {
  open("html/todo_15.html");
}
function todo_16() {
  open("html/todo_16.html");
}
function todo_17() {
  open("html/todo_17.html");
}
function todo_18() {
  open("html/todo_18.html");
}
function todo_19() {
  open("html/todo_19.html");
}
function todo_20() {
  open("html/todo_20.html");
}
function todo_21() {
  open("html/todo_21.html");
}
function todo_22() {
  open("html/todo_22.html");
}
function todo_23() {
  open("html/todo_23.html");
}
function todo_24() {
  open("html/todo_24.html");
}
function todo_25() {
  open("html/todo_25.html");
}
function todo_26() {
  open("html/todo_26.html");
}
function todo_27() {
  open("html/todo_27.html");
}
function todo_28() {
  open("html/todo_28.html");
}
function todo_29() {
  open("html/todo_29.html");
}
function todo_30() {
  open("html/todo_30.html");
}
function todo_31() {
  open("html/todo_31.html");
}
function todo_m() {
  open("html/todo_m.html");
}

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
  tableTodos1.insertAdjacentHTML("beforeend", tr);

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
    db.collection("1")
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
  if (e.target === showTodo1) {
    showTodo1.classList.remove("modal-show");
  }
  if (e.target === showTodo2) {
    showTodo2.classList.remove("modal-show");
  }
});
// Real time listener
db.collection("1").onSnapshot((snapshot) => {
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
  db.collection("1").add({
    todo: addTodoForm.todo.value,
  });
  addTodoForm.todo.value = "";
});

// Click submit in edit to-do
editModalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("1").doc(id).update({
    todo: editModalForm.todo.value,
  });
  editModal.classList.remove("modal-show");
});
