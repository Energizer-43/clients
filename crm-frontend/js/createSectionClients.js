// Импорт SVG иконок
import { addClientSvg, addArrowUpSvg } from './svgIcons.js'
import { createPreloader } from './preloader.js'

// Импорт функции создания модального окна
import { addClientModal } from './addClient.js'

// Секция клиенты
export const createSectionClients = () => {
  // Создание элементов
  const $main = document.createElement('main');
  const $container = document.createElement('div');
  const $section = document.createElement('section');
  const $h1 = document.createElement('h1');
  const $tableWrapper = document.createElement('div');
  const $table = document.createElement('table');
  const $tableHead = document.createElement('thead');
  const $tableTr = document.createElement('tr');
  const $tableThId = document.createElement('th');
  const $tableThIdSpanText = document.createElement('span');
  const $tableThIdSpanSvg = document.createElement('span');
  const $tableThName = document.createElement('th');
  const $tableThNameSpanTextFullName = document.createElement('span');
  const $tableThNameSpanSvg = document.createElement('span');
  const $tableThNameSpanText = document.createElement('span');
  const $tableThDateCreate = document.createElement('th');
  const $tableThDateCreateSpanText = document.createElement('span');
  const $tableThDateCreateSpanSvg = document.createElement('span');
  const $tableThDateChange = document.createElement('th');
  const $tableThDateChangeSpanText = document.createElement('span');
  const $tableThDateChangeSpanSvg = document.createElement('span');
  const $tableThContacts = document.createElement('th');
  const $tableThActions = document.createElement('th');
  const $tableBody = document.createElement('tbody');
  const $addClientBtn = document.createElement('button');
  const $addClientBtnSpanSvg = document.createElement('span');

  // Массив для сортировки
  const headersArray = [$tableThId, $tableThName, $tableThDateCreate, $tableThDateChange];

  // Добавление классов
  $main.classList.add('main');
  $container.classList.add('container', 'clients__container');
  $section.classList.add('clients');
  $h1.classList.add('clients__title');
  $tableWrapper.classList.add('clients__wrapper');
  $table.classList.add('clients__table');
  $tableHead.classList.add('clients__thead');
  $tableTr.classList.add('clients__tr');
  $tableThId.classList.add('clients__th__item', 'clients__th__item--id', 'sort-up');
  $tableThIdSpanText.classList.add('id-text-span');
  $tableThIdSpanSvg.classList.add('id-svg-span');
  $tableThName.classList.add('clients__th__item', 'clients__th__item--name');
  $tableThNameSpanTextFullName.classList.add('full-name-text-span');
  $tableThNameSpanSvg.classList.add('name-span');
  $tableThNameSpanText.classList.add('name-text-span');
  $tableThDateCreate.classList.add('clients__th__item', 'clients__th__item--date-create');
  $tableThDateCreateSpanText.classList.add('date-create-text-span');
  $tableThDateCreateSpanSvg.classList.add('date-create-span');
  $tableThDateChange.classList.add('clients__th__item', 'clients__th__item--date-change');
  $tableThDateChangeSpanText.classList.add('date-change-text-span');
  $tableThDateChangeSpanSvg.classList.add('date-change-span');
  $tableThContacts.classList.add('clients__th__item', 'clients__th__item--contacts');
  $tableThActions.classList.add('clients__th__item', 'clients__th__item--actions');
  $tableBody.classList.add('clients__tbody');
  $addClientBtn.classList.add('clients__btn');
  $addClientBtnSpanSvg.classList.add('clients__svg');

  // Цикл по массиву с заголовками чтобы добавить класс
  for (const item of headersArray) {
    item.addEventListener('click', () => {
      item.classList.toggle('sort-up');
      if ($tableThName.classList.contains('sort-up')) {
        $tableThNameSpanText.textContent = 'А-Я';
      } else $tableThNameSpanText.textContent = 'Я-А';
    })
  }

  // Дата атрибуты для сортировки
  $tableThId.setAttribute('data-type', 'id');
  $tableThName.setAttribute('data-type', 'text');
  $tableThDateCreate.setAttribute('data-type', 'create');
  $tableThDateChange.setAttribute('data-type', 'update');

  // Добавление контента
  $h1.textContent = 'Клиенты';
  $tableThId.scope = 'col';
  $tableThIdSpanText.textContent = 'ID';
  $tableThIdSpanSvg.innerHTML = addArrowUpSvg;
  $tableThName.scope = 'col';
  $tableThNameSpanTextFullName.textContent = 'Фамилия Имя Отчество';
  $tableThNameSpanSvg.innerHTML = addArrowUpSvg;
  $tableThNameSpanText.textContent = 'А-Я';
  $tableThDateCreate.scope = 'col';
  $tableThDateCreateSpanText.textContent = 'Дата и время создания';
  $tableThDateCreateSpanSvg.innerHTML = addArrowUpSvg;
  $tableThDateChange.scope = 'col';
  $tableThDateChangeSpanText.textContent = 'Последние изменения';
  $tableThDateChangeSpanSvg.innerHTML = addArrowUpSvg;
  $tableThContacts.scope = 'col';
  $tableThContacts.textContent = 'Контакты';
  $tableThActions.scope = 'col';
  $tableThActions.textContent = 'Действия';
  $addClientBtn.textContent = 'Добавить клиента';
  $addClientBtnSpanSvg.innerHTML = addClientSvg;

  // Добавление события для кнопки
  $addClientBtn.addEventListener('click', () => {
    document.body.append(addClientModal());
  })

  // Добавление в разметку
  $main.append($section);
  $section.append($container);
  $container.append($h1, $tableWrapper, $addClientBtn);
  $addClientBtn.prepend($addClientBtnSpanSvg);
  $tableWrapper.append($table);
  $table.append($tableHead, $tableBody);
  $tableBody.append(createPreloader());
  $tableHead.append($tableTr);
  $tableTr.append($tableThId,
    $tableThName,
    $tableThDateCreate,
    $tableThDateChange,
    $tableThContacts,
    $tableThActions);
  $tableThId.append($tableThIdSpanText, $tableThIdSpanSvg);
  $tableThName.append($tableThNameSpanTextFullName, $tableThNameSpanSvg, $tableThNameSpanText);
  $tableThDateCreate.append($tableThDateCreateSpanText, $tableThDateCreateSpanSvg);
  $tableThDateChange.append($tableThDateChangeSpanText, $tableThDateChangeSpanSvg);

  return {
    $main,
    $table,
    $tableBody
  }
}

