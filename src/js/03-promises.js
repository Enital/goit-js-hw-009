// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// const formEl = document.querySelector('.form');

// formEl.addEventListener('submit', handleFormElSubmit)

// function handleFormElSubmit(event) {
//   event.preventDefault();
//   const inputFirstDelayValue = Number(event.target.elements.delay.value);
//   const inputStepValue = Number(event.target.elements.step.value);
//   const inputAmountValue = Number(event.target.elements.amount.value);
  
//   for (let i = 1; i <= inputAmountValue; i += 1) {
//     let currentDelay = inputFirstDelayValue + (i - 1) * inputStepValue;
  
//     createPromise(i, currentDelay).then(({ position, delay }) => {
//       Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`,
//         {
//           // opacity: '0.9',
//           timeout: 3000,
//           backOverlay: false,
//           clickToClose: 'true',
    
//         });
//   })
//       .catch(({ position, delay }) => {
//         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`,
//           {
//           // opacity: '0.9',
//           timeout: 3000,
//           clickToClose: 'true',
//         });
//   }); 
//   }
// }

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay })
//       } else {
//         reject({ position, delay })
//       }
//     }, delay);
//   }
//   );
// }

import Notiflix from 'notiflix';

const formObj = {
  form: document.querySelector('.form'),
  firstDelayForm: document.querySelector('[name="delay"]'),
  stepDelayForm: document.querySelector('[name="step"]'),
  amountForm: document.querySelector('[name="amount"]'),
  btn: document.querySelector('[type="submit"]'),
};

formObj.form.addEventListener('submit', onFormSubmit)

function onFormSubmit(event) {
  console.log(event);
  event.preventDefault();
  const firstDelay = Number(event.target.delay.value);
  const step = Number(event.target.step.value);
  const amount = Number(event.target.amount.value);
  let runPromises = firstDelay;
  for (let i = 1; i <= amount; i++) {
    createPromise(i, runPromises)
      .then(successFunc)
      .catch(errorFunc)
runPromises += step
  }};

  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
return new Promise((resolve, reject) => {
  setTimeout(() => {
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`)
    }
    else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`)
    }
  }, delay)
  
})
  };

  function successFunc(result) {
    Notiflix.Notify.success(result);
  }

  function errorFunc(error) {
    Notiflix.Notify.failure(error);
  }