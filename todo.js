const taskForm = document.querySelector(".js-taskForm");
const taskInput = taskForm.querySelector("input");
const pendingList = document.querySelector(".js-pendingList");
const finishedList = document.querySelector(".js-finishedList");

const PENDING = "PENDING";
const FINISHED = "FINISHED";
let pending = [];
let finished = [];

function saveTasks() {
  localStorage.setItem("PENDING", JSON.stringify(pending));
  localStorage.setItem("FINISHED", JSON.stringify(finished));
}

function deleteFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanFinished = finished.filter(function (fin) {
    return fin.id !== parseInt(li.id);
  });
  finished = cleanFinished;
  saveTasks();
}

function addFinished(text, finId) {
  const finLi = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = "checked";
  const delFinBtn = document.createElement("button");
  const finText = document.createElement("span");
  delFinBtn.innerText = "❎";
  delFinBtn.style.border = 0;
  delFinBtn.style.background = "transparent";
  delFinBtn.addEventListener("click", deleteFinished);
  checkbox.addEventListener(
    "change",
    function () {
      addPending(text, finId);
    },
    false
  );
  checkbox.addEventListener("change", deleteFinished);
  finText.innerText = text;
  finText.style.textDecoration = "line-through";
  finLi.appendChild(checkbox);
  finLi.appendChild(finText);
  finLi.appendChild(delFinBtn);
  finLi.id = finId;
  finishedList.appendChild(finLi);
  const finObj = {
    id: finId,
    text: text,
  };
  finished.push(finObj);
  saveTasks();
}

function deletePending(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pendingList.removeChild(li);
  const cleanPending = pending.filter(function (pend) {
    return pend.id !== parseInt(li.id);
  });
  pending = cleanPending;
  saveTasks();
}

function addPending(text, pendId) {
  const pendLi = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const delPendBtn = document.createElement("button");
  const pendText = document.createElement("span");
  delPendBtn.style.border = 0;
  delPendBtn.style.background = "transparent";
  delPendBtn.innerText = "❎";
  delPendBtn.addEventListener("click", deletePending);
  checkbox.addEventListener(
    "change",
    function () {
      addFinished(text, pendId);
    },
    false
  );
  checkbox.addEventListener("change", deletePending);
  pendText.innerText = text;
  pendLi.appendChild(checkbox);
  pendLi.appendChild(pendText);
  pendLi.appendChild(delPendBtn);
  pendLi.id = pendId;
  pendingList.appendChild(pendLi);

  const pendObj = {
    id: pendId,
    text: text,
  };
  pending.push(pendObj);
  saveTasks();
}

function handleSubmit(e) {
  e.preventDefault();
  let pendCount = JSON.parse(localStorage.PENDING).length;
  let finCount = JSON.parse(localStorage.FINISHED).length;

  if (parseInt(pendCount) + parseInt(finCount) < 8) {
    const currentValue = taskInput.value;
    const currentId = Date.now();
    addPending(currentValue, currentId);
    taskInput.value = "";
  } else {
    alert("You can add tasks up to 8.");
  }
}

function loadTasks() {
  const loadedPending = localStorage.getItem("PENDING");
  const loadedFinished = localStorage.getItem("FINISHED");

  if (loadedPending !== null) {
    const parsedPending = JSON.parse(loadedPending);
    parsedPending.forEach(function (pend) {
      addPending(pend.text, pend.id);
    });
  }
  if (loadedFinished !== null) {
    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach(function (fin) {
      addFinished(fin.text, fin.id);
    });
  }
}

function init() {
  loadTasks();
  taskForm.addEventListener("submit", handleSubmit);
}

init();
