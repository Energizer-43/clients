import { addContactDeleteSvg } from './svgIcons.js'
import Inputmask from "./inputmask.es6.js";

// Создание меню для контактов
export const createContactItem = () => {
  // Создание элементов
  const $contact = document.createElement('div');
  const $contactType = document.createElement('div');
  const $contactNameBtn = document.createElement('button');
  const $contactList = document.createElement('ul');
  const $contactItemPhone = document.createElement('li');
  const $contactItemEmail = document.createElement('li');
  const $contactItemVk = document.createElement('li');
  const $contactItemFacebook = document.createElement('li');
  const $contactItemOther = document.createElement('li');
  const $contactImput = document.createElement('input');
  const $contactDeleteBtn = document.createElement('button');
  const $contactDeleteTooltip = document.createElement('span');

  // Добавление классов
  $contact.classList.add('contact');
  $contactType.classList.add('contact__type');
  $contactNameBtn.classList.add('contact__name-btn');
  $contactList.classList.add('contact__list');
  $contactItemPhone.classList.add('contact__item');
  $contactItemEmail.classList.add('contact__item');
  $contactItemVk.classList.add('contact__item');
  $contactItemFacebook.classList.add('contact__item');
  $contactItemOther.classList.add('contact__item');
  $contactImput.classList.add('contact__input');
  $contactDeleteBtn.classList.add('contact__delete-btn');
  $contactDeleteTooltip.classList.add('tooltips', '--delete-tooltip');

  // Добавление контента и атрибутов
  $contactNameBtn.textContent = 'Телефон';
  $contactItemPhone.textContent = 'Телефон';
  $contactItemEmail.textContent = 'Email';
  $contactItemVk.textContent = 'Vk';
  $contactItemFacebook.textContent = 'Facebook';
  $contactItemOther.textContent = 'Другое';
  $contactDeleteTooltip.textContent = 'Удалить контакт';
  $contactImput.type = 'text';
  $contactImput.placeholder = 'Введите данные контакта';
  $contactDeleteBtn.innerHTML = addContactDeleteSvg;

  // Добавление события клика на кнопку типа контакта для появления меню
  $contactNameBtn.addEventListener('click', (e) => {
    e.preventDefault();

    $contactNameBtn.classList.toggle('contact__list--active-arrow');
    $contactList.classList.toggle('contact__list--active');
  });
  // Удаление меню когда курсор вне меню
  $contactType.addEventListener('mouseleave', () => {
    $contactNameBtn.classList.remove('contact__list--active-arrow');
    $contactList.classList.remove('contact__list--active');
  });

  // Функция для создания/удаления маски телефона
  const createInputMask = (btn, input) => {
    if (btn.textContent == 'Телефон') {
      let im = new Inputmask('+7(999) 999-99-99');
      im.mask(input);
    } else {
      Inputmask.remove(input);
    }
  }

  createInputMask($contactNameBtn, $contactImput);

  // Функция для выбора типа контака
  const changeType = (type) => {
    type.addEventListener('click', () => {
      $contactNameBtn.textContent = type.textContent;
      createInputMask($contactNameBtn, $contactImput);
      $contactNameBtn.classList.remove('contact__list--active-arrow');
      $contactList.classList.remove('contact__list--active');
    });
  };

  // Массив с типами контактов
  const typesArr = [$contactItemPhone,
    $contactItemEmail,
    $contactItemVk,
    $contactItemFacebook,
    $contactItemOther];

  // Цикл для каждого типа
  for (const type of typesArr) {
    changeType(type);
  }

  // Добавление события клика на кнопку удаления контакта и появление кнопки если контактов меньше 10
  $contactDeleteBtn.addEventListener('click', (e) => {
    e.preventDefault();

    $contact.remove();
    document.querySelector('.modal__btn-add').classList.remove('hidden');
  });

  // Добавление в разметку
  $contact.append($contactType, $contactImput, $contactDeleteBtn);
  $contactType.append($contactNameBtn, $contactList);
  $contactList.append($contactItemPhone,
    $contactItemEmail,
    $contactItemVk,
    $contactItemFacebook,
    $contactItemOther);
  $contactDeleteBtn.append($contactDeleteTooltip);

  return {
    $contact,
    $contactNameBtn,
    $contactImput,
    $contactDeleteBtn
  }
}
