import { isEscEvent } from './global-util.js';
import { resetActions } from './reset.js';
import { adFormElement } from './form.js';
import { sendData } from './api.js';

const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
let messageElement = null;

const createMessage = (template) => {
  messageElement = template.cloneNode(true);
  document.body.append(messageElement);

  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onMessageClick);

  return messageElement;
};

// Функции объявлены декларативно, т. к. требуется их поднятие.
function onMessageEscKeydown (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeMessage(messageElement);
  }
}

function onMessageClick (evt) {
  evt.preventDefault();
  closeMessage(messageElement);
}

function closeMessage (message) {
  message.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onMessageClick);
}

const handleSuccess = () => {
  createMessage(successTemplateElement);
  resetActions();
};


const handleError = () => {
  const errorElement = createMessage(errorTemplateElement);

  const errorButton = errorElement.querySelector('.error__button');

  const onErrorButtonClick = (evt) => {
    evt.preventDefault();
    closeMessage(errorElement);
  };
  errorButton.addEventListener('click', onErrorButtonClick);
  errorButton.focus();
};

const setAdFormSubmit = () => {
  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    sendData(handleSuccess, handleError, formData);
  });
};

export { setAdFormSubmit };
