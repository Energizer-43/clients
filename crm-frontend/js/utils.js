import { phoneContactSvg, fbContactSvg, vkContactSvg, emailContactSvg, otherContactsSvg } from './svgIcons.js';
import { contactTooltip } from './createTooltip.js'

// Функция создания элементов контактов и тултипов
export const createContactLink = (type, value, element, icon, item) => {
  const setTooltip = contactTooltip(type, value);
  element = document.createElement('a');
  element.classList.add('clients__link');
  element.innerHTML = icon;

  if (type === 'Email') {
    element.href = `mailto:${value.trim()}`;
  } else if (type === 'Телефон') {
    element.href = `tel:${value.replace(/[^+0-9]/g, '')}`;
    setTooltip.$tooltipValue.style.textDecoration = 'none';
    setTooltip.$tooltip.style.width = '190px';
  } else {
    element.href = value.trim();
  }

  item.append(element);
  element.append(setTooltip.$tooltip);
}

// Функция отрисовки контактов, switch/case - какой именно контакт
export const createContactItemByType = (type, value, item) => {
  switch (type) {
    case 'Телефон':
      let phone;
      createContactLink(type, value, phone, phoneContactSvg, item)
      break;
    case 'Facebook':
      let facebook;
      createContactLink(type, value, facebook, fbContactSvg, item)
      break;
    case 'Vk':
      let vk;
      createContactLink(type, value, vk, vkContactSvg, item)
      break;
    case 'Email':
      let email;
      createContactLink(type, value, email, emailContactSvg, item)
      break;
    case 'Другое':
      let other;
      createContactLink(type, value, other, otherContactsSvg, item)
      break;
    default:
      break;
  }
}

// Функция чтобы каждую букву ФИО сделать заглавной
export const getUpperString = (string) => {
  let words = string.split(' ');

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
  }

  return words.join(' ');
}

// Функция получения части строки с датой (Число, месяц, год)
export const getCurrentDate = (obj) => {
  return obj.substring(0, 10).split('-').reverse().join('.');
}

// Функция получения части строки с временем
export const getCurrentTime = (obj) => {
  return obj.substring(11, 16);
}
