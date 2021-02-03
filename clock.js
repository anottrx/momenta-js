const clock = document.querySelector(".js-clock");
const ampm = document.querySelector("#ampm");
let ampm_24 = ["0"];

const am = "AM";
const pm = "PM";

function word(time) {
  if (time < 10) {
    return "0" + time;
  } else {
    return time;
  }
}

function showTime() {
  const timeAMPM = localStorage.getItem("TIME");
  const today = new Date();
  if (timeAMPM === "24") {
    let hour = today.getHours();
    hour = word(hour);
    let minute = today.getMinutes();
    minute = word(minute);
    let second = today.getSeconds();
    second = word(second);
    return `${hour}:${minute}:${second}`;
  } else {
    let hour = today.getHours();
    let minute = today.getMinutes();
    minute = word(minute);
    let second = today.getSeconds();
    second = word(second);
    if (hour < 12) {
      hour = word(hour);
      return `${hour}:${minute}:${second} ${am}`;
    } else {
      hour = hour - 12;
      hour = word(hour);
      return `${hour}:${minute}:${second} ${pm}`;
    }
  }
}

function showDate() {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  month = word(month);
  let date = today.getDate();
  date = word(date);
  const day = today.getDay();
  const days = ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"];
  return `${year}-${month}-${date} ${days[day]}`;
}

function showDateTime() {
  let datePrint = showDate();
  let timePrint = showTime();
  clock.innerHTML =
    `<span style="font-size:35px">${datePrint}</span>` + "<br>" + timePrint;
}

function showTimeAMPM() {
  localStorage.setItem("TIME", "AMPM");
  showDateTime();
}

function showTime24() {
  localStorage.setItem("TIME", "24");
  showDateTime();
}

function loadTimeAMPM() {
  const timeAMPM = localStorage.getItem("TIME");
  showDateTime();
  if (!timeAMPM) {
    showTime24();
  } else {
    showTimeAMPM();
  }
}

function init() {
  loadTimeAMPM();
  setInterval(showDateTime, 1000);

  ampm.addEventListener("click", function () {
    if (this.value === "ampm") {
      showTime24();
      this.value = "24";
    } else {
      showTimeAMPM();
      this.value = "ampm";
    }
  });
}

init();
