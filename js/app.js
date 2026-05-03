"use strict";

const monthConfigs = [
  {
    prefix: "b",
    title: "Gegužė",
    clearTitle: "Gegužės",
    monthIndex: 4,
    days: 31,
    offset: 4,
    workDays: [
      1, 2, 4, 5, 6, 9, 10, 11, 12, 15, 16, 20, 21, 22, 25, 26, 27, 28, 31,
    ],
  },
  {
    prefix: "c",
    title: "Birželis",
    clearTitle: "Birželio",
    monthIndex: 5,
    days: 30,
    offset: 0,
    workDays: [],
  },
  {
    prefix: "d",
    title: "Liepa",
    clearTitle: "Liepos",
    monthIndex: 6,
    days: 31,
    offset: 2,
    workDays: [],
  },
  {
    prefix: "e",
    title: "Rugpjūtis",
    clearTitle: "Rugpjūčio",
    monthIndex: 7,
    days: 31,
    offset: 5,
    workDays: [],
  },
  {
    prefix: "f",
    title: "Rugsėjis",
    clearTitle: "Rugsėjo",
    monthIndex: 8,
    days: 30,
    offset: 1,
    workDays: [],
  },
  {
    prefix: "g",
    title: "Spalis",
    clearTitle: "Spalio",
    monthIndex: 9,
    days: 31,
    offset: 3,
    workDays: [],
  },
  {
    prefix: "h",
    title: "Lapkritis",
    clearTitle: "Lapkričio",
    monthIndex: 10,
    days: 30,
    offset: 6,
    workDays: [],
  },
  {
    prefix: "i",
    title: "Gruodis",
    clearTitle: "Gruodžio",
    monthIndex: 11,
    days: 31,
    offset: 1,
    workDays: [],
  },
];

const weekdayLabels = ["P", "A", "T", "K", "Pe", "Š", "S"];
const localStorageKey = "grafikas-daily-tasks";
const firestoreDb = resolveFirestoreDb();
const isFirestoreAvailable = Boolean(
  firestoreDb && typeof firestoreDb.collection === "function",
);

const editModal = document.querySelector(".edit-modal");
const editModalForm = document.querySelector(".edit-modal .form");
const editModalTitle = document.querySelector(".edit-modal .modal-header h3");

let activeEditTask = null;

function resolveFirestoreDb() {
  if (window.db && typeof window.db.collection === "function") {
    return window.db;
  }

  if (typeof db !== "undefined" && db && typeof db.collection === "function") {
    return db;
  }

  if (
    window.firebase &&
    Array.isArray(window.firebase.apps) &&
    window.firebase.apps.length > 0 &&
    typeof window.firebase.firestore === "function"
  ) {
    return window.firebase.firestore();
  }

  return null;
}

function initializeApp() {
  renderBoards();
  exposeGlobalActions();
  applyWorkDayStyling();
  highlightToday();
  bindModalCloseHandlers();
  bindEditModal();
  initializeTaskCollections();
}

function getVisibleMonthConfigs() {
  const today = new Date();
  return monthConfigs.filter((config) => config.monthIndex >= today.getMonth());
}

function renderBoards() {
  const visibleConfigs = getVisibleMonthConfigs();
  const boards = Array.from(document.querySelectorAll(".board"));

  if (editModal && boards[0] && boards[0].contains(editModal)) {
    boards[0].insertAdjacentElement("afterend", editModal);
  }

  visibleConfigs.forEach((config, index) => {
    const board = boards[index] || document.createElement("div");
    board.className = "board";
    board.dataset.month = config.prefix;
    board.innerHTML = createBoardMarkup(config);

    if (!boards[index]) {
      if (editModal) {
        editModal.insertAdjacentElement("beforebegin", board);
      } else {
        document.body.appendChild(board);
      }
    }
  });

  boards.slice(visibleConfigs.length).forEach((board) => {
    board.remove();
  });
}

function createBoardMarkup(config) {
  const headerButtons = weekdayLabels
    .map((label) => `<button class="workDay">${label}</button>`)
    .join("\n    ");

  const emptyCells = Array.from(
    { length: config.offset },
    () => '<span class="month-empty"></span>',
  ).join("\n    ");
  const dayButtons = Array.from({ length: config.days }, (_, index) => {
    const day = index + 1;
    const collectionName = `${config.prefix}${day}`;
    const buttonClass = `button${config.prefix.toUpperCase()}${day}`;
    return `<button onclick="todo_${collectionName}()" id="${collectionName}" class="${buttonClass}">${day}</button>`;
  }).join("\n    ");

  const modals = Array.from({ length: config.days }, (_, index) => {
    const day = index + 1;
    const collectionName = `${config.prefix}${day}`;
    return `
    <div class="show-modal-${collectionName} modal-wrapper">
      <div class="modal">
        <div class="modal-header"><a href="https://proteinid.uk" target="_blank" class="btn-protein"><i
              class="icon-egg"></i></a><a href="https://costapp.org" target="_blank" class="btn-protein-f"><i
              class="icon-chart"></i></a>
          <h3>${day}</h3><i class="fi fi-br-cross-small" onclick="close_modal()" style="font-size: 24px"></i>
        </div>
        <div class="table-wrapper">
          <table class="table-${collectionName}"></table>
          <div class="add-todo-${collectionName}">
            <form class="form" autocomplete="off">
              <input type="text" name="todo" placeholder="Add todo" maxlength="70" required="required" />
              <button class="btn btn-modal">OK</button>
            </form>
          </div>
        </div>
      </div>
    </div>`;
  }).join("");

  return `
    <div class="men-pav board-title" onclick="clearMonth${config.prefix.toUpperCase()}()">${config.title}</div>
    ${headerButtons}
    ${emptyCells}
    ${dayButtons}
    ${modals}
  `;
}

function exposeGlobalActions() {
  monthConfigs.forEach((config) => {
    window[`clearMonth${config.prefix.toUpperCase()}`] = () =>
      clearMonth(config);

    for (let day = 1; day <= config.days; day += 1) {
      const collectionName = `${config.prefix}${day}`;
      window[`todo_${collectionName}`] = () => openDayModal(collectionName);
    }
  });

  window.close_modal = closeAllModals;
}

function applyWorkDayStyling() {
  monthConfigs.forEach((config) => {
    config.workDays.forEach((day) => {
      const button = document.getElementById(`${config.prefix}${day}`);
      if (button) {
        button.classList.add("scheduled-day");
      }
    });
  });
}

function highlightToday() {
  const today = new Date();
  const monthConfig = monthConfigs.find(
    (config) => config.monthIndex === today.getMonth(),
  );

  if (!monthConfig) {
    return;
  }

  const currentDayButton = document.getElementById(
    `${monthConfig.prefix}${today.getDate()}`,
  );
  if (currentDayButton) {
    currentDayButton.classList.add("today");
  }
}

function bindModalCloseHandlers() {
  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal-wrapper")) {
      closeAllModals();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });
}

function bindEditModal() {
  if (!editModalForm) {
    return;
  }

  editModalForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!activeEditTask) {
      return;
    }

    const todo = editModalForm.todo.value.trim();
    if (!todo) {
      return;
    }

    await updateTask(activeEditTask.collectionName, activeEditTask.id, todo);
    editModalForm.reset();
    activeEditTask = null;
    closeAllModals();
  });
}

function initializeTaskCollections() {
  monthConfigs.forEach((config) => {
    for (let day = 1; day <= config.days; day += 1) {
      const collectionName = `${config.prefix}${day}`;
      initializeTaskCollection(config, day, collectionName);
    }
  });
}

function initializeTaskCollection(config, day, collectionName) {
  const form = document.querySelector(`.add-todo-${collectionName} .form`);
  const table = document.querySelector(`.table-${collectionName}`);
  const button = document.getElementById(collectionName);

  if (!form || !table || !button) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const todo = form.todo.value.trim();

    if (!todo) {
      return;
    }

    await addTask(collectionName, todo);
    form.reset();
  });

  subscribeToCollection(collectionName, (tasks) => {
    renderTaskTable(table, tasks, collectionName, `${config.title} ${day}`);
    button.classList.toggle("addedPlans", tasks.length > 0);
  });
}

function renderTaskTable(table, tasks, collectionName, dayLabel) {
  table.innerHTML = tasks
    .map(
      (task) => `
        <tr data-id="${task.id}">
          <td>${escapeHtml(task.todo)}</td>
          <th>
            <button class="btn btn-edit" data-action="edit" data-collection="${collectionName}" data-id="${task.id}" data-label="${dayLabel}">Edit</button>
            <button class="btn btn-delete" data-action="delete" data-collection="${collectionName}" data-id="${task.id}">Del</button>
          </th>
        </tr>
      `,
    )
    .join("");

  table.querySelectorAll('[data-action="edit"]').forEach((button) => {
    button.addEventListener("click", () => {
      activeEditTask = {
        collectionName,
        id: button.dataset.id,
      };
      editModalTitle.textContent = button.dataset.label;
      editModalForm.todo.value = getTaskText(tasks, button.dataset.id);
      editModal.classList.add("modal-show");
    });
  });

  table.querySelectorAll('[data-action="delete"]').forEach((button) => {
    button.addEventListener("click", async () => {
      const confirmed = window.confirm("Want to delete?");
      if (confirmed) {
        await deleteTask(collectionName, button.dataset.id);
      }
    });
  });
}

function getTaskText(tasks, taskId) {
  const task = tasks.find((item) => item.id === taskId);
  return task ? task.todo : "";
}

function openDayModal(collectionName) {
  const modal = document.querySelector(`.show-modal-${collectionName}`);
  if (modal) {
    modal.classList.add("modal-show");
  }
}

function closeAllModals() {
  document.querySelectorAll(".modal-wrapper.modal-show").forEach((modal) => {
    modal.classList.remove("modal-show");
  });
}

async function clearMonth(config) {
  const confirmed = window.confirm(
    `Ar tikrai norite ištrinti visus ${config.clearTitle} mėnesio planus?`,
  );
  if (!confirmed) {
    return;
  }

  for (let day = 1; day <= config.days; day += 1) {
    await deleteCollection(`${config.prefix}${day}`);
  }
}

function subscribeToCollection(collectionName, onChange) {
  if (isFirestoreAvailable) {
    return firestoreDb.collection(collectionName).onSnapshot(
      (snapshot) => {
        const tasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          todo: (doc.data() && doc.data().todo) || "",
        }));
        onChange(tasks);
      },
      (error) => {
        console.error(`Failed to sync ${collectionName}:`, error);
        onChange(readLocalTasks(collectionName));
      },
    );
  }

  const subscribers = localSubscribers.get(collectionName) || [];
  subscribers.push(onChange);
  localSubscribers.set(collectionName, subscribers);
  onChange(readLocalTasks(collectionName));

  return () => {
    const nextSubscribers = (localSubscribers.get(collectionName) || []).filter(
      (callback) => callback !== onChange,
    );
    localSubscribers.set(collectionName, nextSubscribers);
  };
}

async function addTask(collectionName, todo) {
  if (isFirestoreAvailable) {
    const payload = { todo };
    if (
      window.firebase &&
      window.firebase.firestore &&
      window.firebase.firestore.FieldValue
    ) {
      payload.createdAt =
        window.firebase.firestore.FieldValue.serverTimestamp();
    }
    await firestoreDb.collection(collectionName).add(payload);
    return;
  }

  const state = readLocalState();
  const tasks = state[collectionName] || [];
  tasks.push({ id: createLocalTaskId(), todo });
  state[collectionName] = tasks;
  writeLocalState(state);
  notifyLocalSubscribers(collectionName);
}

async function updateTask(collectionName, taskId, todo) {
  if (isFirestoreAvailable) {
    await firestoreDb.collection(collectionName).doc(taskId).update({ todo });
    return;
  }

  const state = readLocalState();
  state[collectionName] = (state[collectionName] || []).map((task) =>
    task.id === taskId ? { ...task, todo } : task,
  );
  writeLocalState(state);
  notifyLocalSubscribers(collectionName);
}

async function deleteTask(collectionName, taskId) {
  if (isFirestoreAvailable) {
    await firestoreDb.collection(collectionName).doc(taskId).delete();
    return;
  }

  const state = readLocalState();
  state[collectionName] = (state[collectionName] || []).filter(
    (task) => task.id !== taskId,
  );
  writeLocalState(state);
  notifyLocalSubscribers(collectionName);
}

async function deleteCollection(collectionName) {
  if (isFirestoreAvailable) {
    const snapshot = await firestoreDb.collection(collectionName).get();
    await Promise.all(snapshot.docs.map((doc) => doc.ref.delete()));
    return;
  }

  const state = readLocalState();
  delete state[collectionName];
  writeLocalState(state);
  notifyLocalSubscribers(collectionName);
}

const localSubscribers = new Map();

function createLocalTaskId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function notifyLocalSubscribers(collectionName) {
  const subscribers = localSubscribers.get(collectionName) || [];
  const tasks = readLocalTasks(collectionName);
  subscribers.forEach((callback) => callback(tasks));
}

function readLocalTasks(collectionName) {
  return readLocalState()[collectionName] || [];
}

function readLocalState() {
  try {
    return JSON.parse(window.localStorage.getItem(localStorageKey) || "{}");
  } catch (error) {
    console.error("Failed to parse local tasks:", error);
    return {};
  }
}

function writeLocalState(state) {
  window.localStorage.setItem(localStorageKey, JSON.stringify(state));
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

initializeApp();
