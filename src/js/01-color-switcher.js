const buttonStartEl = document.querySelector('button[data-start]');
const buttonStopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;

buttonStopEl.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


buttonStartEl.addEventListener("click", () => {
    buttonStartEl.disabled = true;
    buttonStopEl.disabled = false;
    timerId = setInterval(() => {
        const color = getRandomHexColor();
        document.body.style.background = color;
    }, 1000)
});


buttonStopEl.addEventListener('click', () =>{
    clearInterval(timerId);
    buttonStopEl.disabled = true;
    buttonStartEl.disabled = false;
    intervalId = 1;
});