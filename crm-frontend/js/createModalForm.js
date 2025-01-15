// Импорт SVG иконок
import { addContactSvg, addCloseBtnSvg, spinnerSvg } from './svgIcons.js'

// Импорт функции добавления контактов
import { createContactItem } from './createContact.js'

// Модальное окно для добавления нового клиента

export const createClientsForm = () => {
  // Создание элементов
  const $modalTitle = document.createElement('h2');
  const $modalBtnClose = document.createElement('button');
  const $modalForm = document.createElement('form');
  const $modalInputSurname = document.createElement('input');
  const $modalInputSurnameLabel = document.createElement('label');
  const $modalInputSurnameRequired = document.createElement('span');
  const $modalInputName = document.createElement('input');
  const $modalInputNameLabel = document.createElement('label');
  const $modalInputNameRequired = document.createElement('span');
  const $modalInputLastName = document.createElement('input');
  const $modalInputLastNameLabel = document.createElement('label');
  const $modalBtnAddContact = document.createElement('button');
  const $modalBtnAddContactSvg = document.createElement('span');
  const $modalBtnSaveContact = document.createElement('button');
  const $modalBtnCancelContact = document.createElement('button');
  const $contactsBlock = document.createElement('div');
  const $contactsBlockFloatingSurname = document.createElement('div');
  const $contactsBlockFloatingName = document.createElement('div');
  const $contactsBlockFloatingLastName = document.createElement('div');

  // Спиннер
  const $spinner = document.createElement('span');

  // Для валидации
  const $errorBlock = document.createElement('div');
  const $errorText = document.createElement('p');


  // Добавление классов и атрибутов
  $modalTitle.classList.add('modal__title');
  $modalBtnClose.classList.add('modal__close');
  $modalForm.classList.add('modal__form');
  $modalInputSurname.classList.add('modal__input');
  $modalInputSurname.type = 'text';
  $modalInputSurname.id = 'surname';
  $modalInputSurname.placeholder = " ";
  $modalInputSurnameLabel.classList.add('modal__label');
  $modalInputSurnameLabel.setAttribute('for', $modalInputSurname.id);
  $modalInputSurnameRequired.classList.add('modal__span');
  $modalInputName.classList.add('modal__input');
  $modalInputName.type = 'text';
  $modalInputName.id = 'name';
  $modalInputName.placeholder = ' ';
  $modalInputNameLabel.classList.add('modal__label');
  $modalInputNameLabel.setAttribute('for', $modalInputName.id);
  $modalInputLastName.classList.add('modal__input');
  $modalInputLastName.type = 'text';
  $modalInputLastName.id = 'lastName';
  $modalInputLastName.placeholder = ' ';
  $modalInputLastNameLabel.classList.add('modal__label');
  $modalInputLastNameLabel.setAttribute('for', $modalInputLastName.id);
  $modalInputNameRequired.classList.add('modal__span');
  $modalBtnAddContact.classList.add('modal__btn-add');
  $modalBtnAddContactSvg.classList.add('btn-add-span');
  $modalBtnSaveContact.classList.add('modal__btn-save');
  $modalBtnCancelContact.classList.add('modal__btn-cancel');
  $contactsBlock.classList.add('modal__contact');
  $contactsBlockFloatingSurname.classList.add('form__input-group');
  $contactsBlockFloatingName.classList.add('form__input-group');
  $contactsBlockFloatingLastName.classList.add('form__input-group');

  // Спинннер
  $spinner.classList.add('spinner');

  // Для валидации
  $errorBlock.classList.add('error-block');
  $errorText.classList.add('error-block__text');

  // Добавление контента
  $modalTitle.textContent = 'Новый клиент';
  $modalBtnClose.innerHTML = addCloseBtnSvg;
  $modalInputSurnameLabel.textContent = 'Фамилия';
  $modalInputSurnameRequired.textContent = '*';
  $modalInputNameLabel.textContent = 'Имя';
  $modalInputNameRequired.textContent = '*';
  $modalInputLastNameLabel.textContent = 'Отчество';
  $modalBtnAddContact.textContent = 'Добавить контакт';
  $modalBtnAddContactSvg.innerHTML = addContactSvg;
  $modalBtnSaveContact.textContent = 'Сохранить';
  $modalBtnCancelContact.textContent = 'Отмена';

  $spinner.innerHTML = spinnerSvg;

  $errorText.id = 'errorText';

  // Добавление в разметку
  $modalForm.append($contactsBlockFloatingSurname,
    $contactsBlockFloatingName,
    $contactsBlockFloatingLastName,
    $contactsBlock,
    $errorBlock,
    $modalBtnSaveContact,
    $modalBtnCancelContact,
  );

  $contactsBlockFloatingSurname.append($modalInputSurname, $modalInputSurnameLabel);
  $contactsBlockFloatingName.append($modalInputName, $modalInputNameLabel);
  $contactsBlockFloatingLastName.append($modalInputLastName, $modalInputLastNameLabel);

  $modalInputSurnameLabel.append($modalInputSurnameRequired);
  $modalInputNameLabel.append($modalInputNameRequired);

  $contactsBlock.append($modalBtnAddContact);
  $modalBtnAddContact.prepend($modalBtnAddContactSvg);

  $modalBtnSaveContact.prepend($spinner);

  $errorBlock.append($errorText);

  // Появление контактов по клику
  $modalBtnAddContact.addEventListener('click', (e) => {
    e.preventDefault();

    const contactItems = document.getElementsByClassName('contact');
    if (contactItems.length < 9) {
      const contactItem = createContactItem();
      $contactsBlock.prepend(contactItem.$contact);
    } else {
      const contactItem = createContactItem();
      $contactsBlock.prepend(contactItem.$contact);
      $modalBtnAddContact.classList.add('hidden');
    }
  })

  return {
    $modalTitle,
    $modalForm,
    $modalBtnClose,
    $contactsBlock,
    $modalBtnAddContact,
    $modalBtnCancelContact,
    $modalInputSurname,
    $modalInputSurnameLabel,
    $modalInputName,
    $modalInputNameLabel,
    $modalInputLastName,
    $modalInputLastNameLabel,
  }
}
