// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";

// const options = {
//     enableTime: true,
//     time_24hr: true,
//     defaultDate: new Date(),
//     minuteIncrement: 1,
//     onClose(selectedDates) {
//         console.log(selectedDates[0]);
//     },
// };

// const timerEl = {
//     inputDateTimePickerEl: document.querySelector('#datetime-picker'),
//     buttonStartEl : document.querySelector('button[data-start]'),
//     daysEl: document.querySelector('.value[data-days]'),
//     hoursEl: document.querySelector('.value[data-hours]'),
//     minutesEl: document.querySelector('.value[data-minutes]'),
//     secondsEl : document.querySelector('.value[data-seconds]'),
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;

//   // Remaining days
//     const days = Math.floor(ms / day);
//   // Remaining hours
//     const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//     const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//     const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//     return { days, hours, minutes, seconds };
// }



// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// //=========================================================================================================================================
// const refs = {
//   input: document.querySelector('#datetime-picker'),
//   button: document.querySelector('[data-start]'),
//   days: document.querySelector('[data-days]'),
//   hours: document.querySelector('[data-hours]'),
//   minutes: document.querySelector('[data-minutes]'),
//   seconds: document.querySelector('[data-seconds]'),
// };
// refs.button.disabled = true;
// refs.button.addEventListener('click', timerStart);
// let targetTime = null;
// //=========================================================================================================================================
// let datePicker = '';
// const fp = flatpickr('#datetime-picker', {
//   enableTime: false,
//   dateFormat: 'd.m.Y',
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   enableTime: true,
//   enableSeconds: true,
//   onClose(selectedDates) {
//     if (new Date() > fp.selectedDates[0]) {
//         Notify.failure('Please choose a date in the future');
//     } else if(new Date() < fp.selectedDates[0]){
//         Notify.success('Congratulations, the countdown is on!');
//         targetTime = fp.selectedDates[0];
//         refs.button.disabled = false;
//     }
//   },
// });
// //=========================================================================================================================================

// function timerStart() {
//     refs.button.disabled = true;
//     refs.input.disabled = true;
//   const timerId = setInterval(() => {
//     const currentTime = Date.now();
//     const timeDifference = convertMs(targetTime - currentTime);
//     const { days, hours, minutes, seconds } = timeDifference;
//     if (days === '00' && hours === '00' && minutes === '00' && seconds === '00'){
//       clearInterval(timerId);
//       refs.button.disabled = false;
//       refs.input.disabled = false;
//     }
//     refs.days.textContent = `${days}`
//     refs.hours.textContent = `${hours}`
//     refs.minutes.textContent = `${minutes}`
//     refs.seconds.textContent = `${seconds}`
//   }, 1000);
// }
// //=========================================================================================================================================
// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = ddLeadingZero(Math.floor(ms / day));
//   // Remaining hours
//   const hours = ddLeadingZero(Math.floor((ms % day) / hour));
//   // Remaining minutes
//   const minutes = ddLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   // Remaining seconds
//   const seconds = ddLeadingZero(
//     Math.floor((((ms % day) % hour) % minute) / second)
//   );

//   return { days, hours, minutes, seconds };
// }
// //=========================================================================================================================================
// function ddLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }


import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';
import "notiflix/dist/notiflix-3.2.6.min.css"


const refs = {
    inputDateTimePickerEl: document.querySelector('#datetime-picker'),
    buttonStartEl : document.querySelector('button[data-start]'),
    daysEl: document.querySelector('.value[data-days]'),
    hoursEl: document.querySelector('.value[data-hours]'),
    minutesEl: document.querySelector('.value[data-minutes]'),
    secondsEl : document.querySelector('.value[data-seconds]'),
}
// console.log(refs);

let eventDate = null;
let intervalId = null;
refs.buttonStartEl.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (options.defaultDate.getTime() > selectedDates[0].getTime()) {
            Report.warning(
    'Event date selection error',
    'You cannot create events for this date as it has already passed. Please choose a date in the future',
    'Close this message',
    {
        width: '460px',
        svgSize: '120px',
        titleFontSize: '30px',
        messageFontSize: '18px',
        buttonFontSize: '18px',
        cssAnimationDuration: '800',
        cssAnimationStyle: 'fade',
    },
        );
    refs.buttonStartEl.disabled = true;    
return
    }
        refs.buttonStartEl.disabled = false;
    eventDate = selectedDates[0].getTime();
    refs.buttonStartEl.classList.add('button-is-active');
    },
};
flatpickr(refs.inputDateTimePickerEl, options)


refs.buttonStartEl.addEventListener('click', handleButtonStartElClick);
function handleButtonStartElClick(event) {
    refs.inputDateTimePickerEl.nextElementSibling.classList.remove('overlay');
    refs.inputDateTimePickerEl.style.borderColor='black';
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
    refs.inputDateTimePickerEl.disabled = true;
    refs.buttonStartEl.disabled = true;

        const dateNow = Date.now();
        let timeLeftInMs =eventDate-dateNow ;
        
        const timeLeftInArrey = convertMs(timeLeftInMs);
        const { days, hours, minutes, seconds }=timeLeftInArrey
        refs.daysEl.textContent = days;
        refs.hoursEl.textContent = hours;
        refs.minutesEl.textContent = minutes;
        refs.secondsEl.textContent = seconds;
        if (days==='00' && hours==='00' && minutes==='00' && seconds==='00') {
            clearInterval(intervalId);
            console.log('Sale time is over. Try next time.')
            return
        }
    }