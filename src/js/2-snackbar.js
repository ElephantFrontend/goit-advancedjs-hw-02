import iziToast from 'izitoast';
import { refsSnackbar } from './refs';
import { capitalizeFirstLetter } from './utils';

const { form, delay } = refsSnackbar;
let delayTime;

form.addEventListener('submit', event => {
  event.preventDefault();
  delayTime = parseInt(delay.value) > 0 ? parseInt(delay.value) : 0;

  const selectedState = document.querySelector('[name="state"]:checked').value;

  simulatePromise(selectedState, delayTime)
    .then(message => {
      iziToast.success({
        message,
        position: 'topRight',
      });
    })
    .catch(message => {
      iziToast.error({
        message,
        position: 'topRight',
      });
    });
});

function simulatePromise(state, daleyValue) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(message(state, daleyValue));
      }
        reject(message(state, daleyValue));
    }, delayTime);
  });
}

function message(stateValue, delaySet) {
  return `${capitalizeFirstLetter(stateValue)} promise in ${delaySet}ms`;
}