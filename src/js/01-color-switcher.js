const buttonStartEl = document.querySelector('button[data-start]');
const buttonStopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function changeColor () {
    const color = getRandomHexColor();
    document.body.style.background = color;
};


buttonStartEl.addEventListener("click", () => {
    timerId = setInterval(() => {
        const color = getRandomHexColor();
        document.body.style.background = color;
    }, 1000)
});

buttonStopEl.addEventListener('click', () => {
    clearInterval(timerId);
});