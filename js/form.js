import {typesDictionary} from './mocks/data.js';

const adFormElement = document.querySelector('.ad-form');
const adFieldsetElements = adFormElement.querySelectorAll('fieldset');
const priceInput = adFormElement.querySelector('#price');
const typeSelect = adFormElement.querySelector('#type');

const roomNumberSelect = adFormElement.querySelector('#room_number');

const guestNumberSelect = adFormElement.querySelector('#capacity');
const guestNumberOptions = guestNumberSelect.querySelectorAll('option');

const disableAdForm = () => {
  adFormElement.classList.add('ad-form--disabled');
  adFieldsetElements.forEach((element) => element.setAttribute('disabled', ''));
};

const activateAdForm = () => {
  adFormElement.classList.remove('ad-form--disabled');
  adFieldsetElements.forEach((element) => element.removeAttribute('disabled'));
};

const setMinPrice = () => {
  const minPriceValue = typesDictionary[typeSelect.value].price;
  priceInput.setAttribute('placeholder', minPriceValue);
  priceInput.setAttribute('min', minPriceValue);
};

const setFormValidity = () => {
  typeSelect.addEventListener('change', setMinPrice); // Д4. Из названия обработчика события и функции-колбэка следует, что это обработчик.

  roomNumberSelect.addEventListener('change', (evt) => {
    const roomNumber = +evt.target.value;

    guestNumberOptions.forEach((element, index) => {
      if (roomNumber === 100 && +element.value === 0) {
        element.disabled = false;
        guestNumberSelect.selectedIndex = index;
      } else if (roomNumber === 100 && +element.value !== 0 || +element.value === 0 || +element.value > roomNumber) {
        element.disabled = true;
      } else {
        element.disabled = false;
        guestNumberSelect.selectedIndex = index;
      }
    });
  });
};

export {disableAdForm, activateAdForm, setFormValidity};

