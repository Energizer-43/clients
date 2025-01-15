import { createClientsForm } from './createModalForm.js'
import { sendClientData } from './clientsApi.js'
import { validateClientForm } from './validateForm.js';
import { validateClientContact } from './validateContact.js';

export const addClientModal = () => {
  // Создание элементов
  const createForm = createClientsForm();
  const $modalWindow = document.createElement('div');
  const $modalBox = document.createElement('div');

  // Добавление классов
  $modalWindow.classList.add('modal');
  $modalBox.classList.add('modal__content', 'modal-open');
  createForm.$modalForm.classList.add('add-client');

  // Добавление в разметку
  $modalWindow.append($modalBox);
  $modalBox.append(createForm.$modalTitle, createForm.$modalBtnClose, createForm.$modalForm);

  // Форма
  createForm.$modalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateClientForm()) {
      return
    }

    // Получение кнопки и инпута
    const contactTypes = document.querySelectorAll('.contact__name-btn');
    const contactInputValues = document.querySelectorAll('.contact__input');

    // Объект в который добавляется клиент, и массив в который добавляются контакты
    let contacts = [];
    let clientObj = {};

    // Цикл по всем элементам и добавление объекта с контактами
    for (let i = 0; i < contactTypes.length; i++) {
      if (!validateClientContact(contactTypes[i], contactInputValues[i])) {
        return;
      }
      contacts.push({
        type: contactTypes[i].textContent,
        value: contactInputValues[i].value
      })
    };

    // Присвоение свойств в объект
    clientObj.surname = createForm.$modalInputSurname.value;
    clientObj.name = createForm.$modalInputName.value;
    clientObj.lastName = createForm.$modalInputLastName.value;
    clientObj.contacts = contacts;

    const $spinner = document.querySelector('.spinner');

    try {
      $spinner.style.display = 'flex';
      await sendClientData(clientObj, 'POST');
    } catch (error) {
      console.log(error);
    } finally {
      $spinner.style.display = 'none';
    }
  })

  // Удаление клиента кликом по кнопке
  createForm.$modalBtnClose.addEventListener('click', (e) => {
    e.preventDefault();

    $modalWindow.remove();
  })

  return $modalWindow;
}
