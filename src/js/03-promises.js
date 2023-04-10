import Notiflix from 'notiflix';

Notiflix.Notify.init({
width: '300px',
  position: 'center-top',
distance: '120px',
cssAnimationStyle: 'zoom',
fontSize: '15px',
failure: {
    notiflixIconColor: 'rgba(230,230,230,0.95)',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    },
success: {
    background: '#3DA35D',
    notiflixIconColor: 'rgba(230,230,230,0.95)',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
}
});

const formObj = {
  form: document.querySelector('.form'),
  firstDelayForm: document.querySelector('[name="delay"]'),
  stepDelayForm: document.querySelector('[name="step"]'),
  amountForm: document.querySelector('[name="amount"]'),
  btn: document.querySelector('[type="submit"]'),
};

formObj.form.addEventListener('submit', onFormSubmit)

function onFormSubmit(event) {
  // console.log(event);
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