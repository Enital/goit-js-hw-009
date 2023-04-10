import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css"

Notiflix.Notify.init({
width: '300px',
position: 'center-top',
cssAnimationStyle: 'zoom',
fontSize: '15px',
failure: {
    notiflixIconColor: 'rgba(230,230,230,0.95)',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlay: true,
    backOverlayColor: 'rgba(0,0,0,0.5)',
    },
});

const timerObj = {
    inputDateTimePickerEl: document.querySelector('#datetime-picker'),
    buttonStartEl : document.querySelector('button[data-start]'),
    daysEl: document.querySelector('.value[data-days]'),
    hoursEl: document.querySelector('.value[data-hours]'),
    minutesEl: document.querySelector('.value[data-minutes]'),
    secondsEl : document.querySelector('.value[data-seconds]'),
}

let eventDate = null;
let intervalId = null;
timerObj.buttonStartEl.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (options.defaultDate.getTime() > selectedDates[0].getTime()) {
            Notiflix.Notify.failure('Please choose a date in the future');
    timerObj.buttonStartEl.disabled = true;    
return
    }
        timerObj.buttonStartEl.disabled = false;
    eventDate = selectedDates[0].getTime();
    timerObj.buttonStartEl.classList.add('button-is-active');
    },
};
flatpickr(timerObj.inputDateTimePickerEl, options)


timerObj.buttonStartEl.addEventListener('click', handleButtonStartElClick);
function handleButtonStartElClick(event) {
    timerObj.inputDateTimePickerEl.nextElementSibling.classList.remove('overlay');
    timerObj.inputDateTimePickerEl.style.borderColor='black';
    intervalId=setInterval(showTimeLeft, 1000);
    showTimeLeft()
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

  // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
    const hours =  addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
    const minutes =  addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
    const seconds =  addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    let valueToString = value.toString();
    return  valueToString.padStart(2, 0)
}

function showTimeLeft() {
    timerObj.inputDateTimePickerEl.disabled = true;
    timerObj.buttonStartEl.disabled = true;

        const dateNow = Date.now();
        let timeLeftInMs =eventDate-dateNow ;
        
        const timeLeftInArray = convertMs(timeLeftInMs);
        const { days, hours, minutes, seconds }=timeLeftInArray
        timerObj.daysEl.textContent = days;
        timerObj.hoursEl.textContent = hours;
        timerObj.minutesEl.textContent = minutes;
        timerObj.secondsEl.textContent = seconds;
        if (days==='00' && hours==='00' && minutes==='00' && seconds==='00') {
            clearInterval(intervalId);
            Notiflix.Report.success('The timer is off.','Believe in yourself and good things will happen to you',);
            return
        }
    }