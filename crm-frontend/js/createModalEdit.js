import { createClientsForm } from './createModalForm.js'
import { deleteClientModal } from './createModalDelete.js'
import { createContactItem } from './createContact.js'
import { sendClientData } from './clientsApi.js';
import { validateClientForm } from './validateForm.js';
import { validateClientContact } from './validateContact.js';
import Inputmask from "./inputmask.es6.js";

// Модальное окно изменения клиента
export const editClientModal = (data) => {
  // Создание элементов
  const $editModal = document.createElement('div');
  const $editModalContent = document.createElement('div');
  const $titleIdSpan = document.createElement('span');
  // Импорт ранее созданой формы
  const $editModalForm = createClientsForm();

  // Добавление классов
  $editModal.classList.add('edit-modal', 'modal');
  $editModalContent.classList.add('edit-modal__content', 'modal-open');
  $titleIdSpan.classList.add('edit-modal__id-span');

  // Изменение атрибутов из ранее созданной формы
  $editModalForm.$modalTitle.textContent = 'Изменить данные';
  $editModalForm.$modalBtnCancelContact.textContent = 'Удалить клиента';
  $titleIdSpan.textContent = `ID: ${data.id.substring(7, 13)}`;

  // Удаление окна и клиента с сервера на кнопку
  $editModalForm.$modalBtnCancelContact.addEventListener('click', (e) => {
    e.preventDefault();

    // Вызов модального окна с подтверждением удаления
    const deleteClient = deleteClientModal();
    document.body.append(deleteClient.$deleteModal);

    // Удаление с сервера
    import('./clientsApi.js').then(({ deleteClientItem }) => {
      deleteClient.$deleteModalDeleteBtn.addEventListener('click', () => {
        deleteClientItem(data.id);
        document.getElementById(data.id).remove();
      })
    })
  })

  // Закрытие окна
  $editModalForm.$modalBtnClose.addEventListener('click', () => {
    $editModal.remove();
  })

  // Заполнение инпутов
  $editModalForm.$modalInputSurname.value = data.surname;
  $editModalForm.$modalInputName.value = data.name;
  $editModalForm.$modalInputLastName.value = data.lastName;

  // Заполнение контактов
  for (const contact of data.contacts) {
    const createContact = createContactItem();

    createContact.$contactNameBtn.textContent = contact.type;
    createContact.$contactImput.value = contact.value;

    if (createContact.$contactNameBtn.textContent == 'Телефон') {
      let im = new Inputmask('+7(999) 999-99-99');
      im.mask(createContact.$contactImput);
    } else {
      Inputmask.remove(createContact.$contactImput);
      createContact.$contactImput.value = contact.value;
    }

    $editModalForm.$contactsBlock.prepend(createContact.$contact);
  }

  // Убрать кнопку если контактов больше 10

  if (data.contacts.length === 10) {
    $editModalForm.$modalBtnAddContact.classList.add('hidden');
  }

  // Изменение клиентов
  $editModalForm.$modalForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateClientForm()) {
      return
    }

    // Все значения типов контактов и инпутов
    const contactTypes = document.querySelectorAll('.contact__name-btn');
    const contactValues = document.querySelectorAll('.contact__input');

    // Пустой массив и объект
    let contactsArray = [];
    let clientsObj = {};

    // Цикл по массиву с типами контактов
    for (let i = 0; i < contactTypes.length; i++) {
      if (!validateClientContact(contactTypes[i], contactValues[i])) {
        return;
      }
      contactsArray.push({
        type: contactTypes[i].innerHTML,
        value: contactValues[i].value
      })
    }

    // Присвоение значений
    clientsObj.surname = $editModalForm.$modalInputSurname.value;
    clientsObj.name = $editModalForm.$modalInputName.value;
    clientsObj.lastName = $editModalForm.$modalInputLastName.value;
    clientsObj.contacts = contactsArray;

    // Вызов функции изменений на сервер
    const $spinner = document.querySelector('.spinner');

    try {
      $spinner.style.display = 'flex';
      await sendClientData(clientsObj, 'PATCH', data.id);;
    } catch (error) {
      console.log(error);
    } finally {
      $spinner.style.display = 'none';
    }
  })

  // Добавление в разметку
  $editModal.append($editModalContent);
  $editModalContent.append($editModalForm.$modalTitle,
    $editModalForm.$modalBtnClose,
    $editModalForm.$modalForm),
    $editModalForm.$modalTitle.append($titleIdSpan);

  return {
    $editModal,
    $editModalContent
  }
}
