const backgrounds = document.querySelector("body");
const imgcolor = document.querySelector("#imgcolor");

const IMG = 5;
const colorList = ["#B5C9DE", "#B5ACDE", "#F2EF95", "#368965"];
const COL = 4;

const BGIMG = "IMAGES";
const BGCOL = "COLORS";

function random(num) {
  const ranNum = Math.floor(Math.random() * num) + 1;
  return ranNum;
}

function setBackgroundImage() {
  const ranImgNum = random(IMG);
  const i = `url(images/${ranImgNum}.jpg)`;
  backgrounds.style.backgroundImage = i;
}

function setBackgroundColor() {
  const ranColorNum = random(COL);
  backgrounds.style.backgroundImage = "none";
  backgrounds.style.backgroundColor = colorList[ranColorNum - 1];
}

function colToImg() {
  imgcolor.innerText = "🎨";
  setBackgroundImage();
  localStorage.setItem("BG", BGIMG);
  imgcolor.value = "images";
}

function imgToColor() {
  imgcolor.innerText = "🖼️";
  setBackgroundColor();
  localStorage.setItem("BG", BGCOL);
  imgcolor.value = "colors";
}

function loadImgColor() {
  const img_color = localStorage.getItem("BG");

  if (!img_color) {
    colToImg();
  } else {
    if (img_color === BGIMG) {
      colToImg();
    } else {
      imgToColor();
    }
  }
}

function init() {
  loadImgColor();

  imgcolor.addEventListener(
    "click",
    function () {
      if (imgcolor.value === "images") {
        imgToColor();
      } else {
        colToImg();
      }
    },
    false
  );
}

init();
