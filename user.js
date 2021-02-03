const user = document.querySelector(".js-user");
const userNameInput = document.querySelector("#userNameInput");
const helloPrint = document.querySelector("#helloPrint");
const namePrint = document.querySelector("#namePrint");
const enterBtn = document.querySelector("#enterBtn");
const changeBtn = document.querySelector("#changeBtn");

let lastClick = ["0"];

function getUserName(e) {
  const getName = e.target.value;

  if (e.keyCode === 13) {
    localStorage.setItem("USER", getName);
    loadUser();
  }
}

function changeUserName() {
  const userName = localStorage.getItem("USER");
  helloPrint.innerHTML = "What is your name?";
  userNameInput.style.display = "inline";
  userNameInput.value = userName;
  namePrint.style.display = "none";
  enterBtn.style.display = "inline";
  changeBtn.style.display = "none";
  handleUserName();
}

function handleUserName() {
  userNameInput.addEventListener("keydown", getUserName);
}

function loadUser() {
  const userName = localStorage.getItem("USER");
  if (userName) {
    const now = new Date();
    let hour = now.getHours();
    if (hour >= 5 && hour < 12) {
      helloPrint.innerHTML = "Good morning, ";
    } else if (hour >= 12 && hour < 20) {
      helloPrint.innerHTML = "Good afternoon, ";
    } else {
      helloPrint.innerHTML = "Good night, ";
    }
    userNameInput.style.display = "none";
    enterBtn.style.display = "none";
    changeBtn.style.display = "inline";
    namePrint.style.display = "inline";
    namePrint.innerHTML = userName;
  } else {
    helloPrint.innerHTML = "What is your name?";
    enterBtn.style.display = "inline";
    changeBtn.style.display = "none";
    handleUserName();
  }
}

function init() {
  loadUser();

  namePrint.addEventListener(
    "click",
    function () {
      const thisClick = Date.now();
      if (parseFloat(thisClick) - parseFloat(lastClick[0]) < 1000) {
        lastClick[0] = thisClick;
        changeUserName();
      }
      lastClick[0] = thisClick;
    },
    false
  );

  enterBtn.addEventListener(
    "click",
    function () {
      if (userNameInput.value) {
        localStorage.setItem("USER", userNameInput.value);
        loadUser();
      } else {
        localStorage.removeItem("USER");
      }
    },
    false
  );

  changeBtn.addEventListener(
    "click",
    function () {
      const userName = localStorage.getItem("USER");
      helloPrint.innerHTML = "What is your name?";
      userNameInput.style.display = "inline";
      userNameInput.value = userName;
      enterBtn.style.display = "inline";
      changeBtn.style.display = "none";
      namePrint.style.display = "none";
      handleUserName();
    },
    false
  );
}

init();
