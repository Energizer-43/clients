// Хедер
// Экспорт в main
export const createHeader = () => {
  // Создание элементов
  const $header = document.createElement('header');
  const $container = document.createElement('div');
  const $headerWrapper = document.createElement('div');
  const $headerLinkLogo = document.createElement('a');
  const $headerImgLogo = document.createElement('img');
  const $headerForm = document.createElement('form');
  const $headerInput = document.createElement('input');
  const $inner = document.createElement('div');
  const $findList = document.createElement('ul');

  // Добавление классов и атрибутов
  $header.classList.add('header');
  $container.classList.add('container', 'header__container');
  $headerWrapper.classList.add('header__wrapper');
  $headerLinkLogo.classList.add('logo', 'header__logo');
  $headerImgLogo.classList.add('logo__img');
  $headerImgLogo.src = 'img/logo.svg';
  $headerImgLogo.alt = 'Логотип';
  $headerForm.classList.add('header__form');
  $inner.classList.add('header__inner');
  $headerInput.classList.add('header__input');
  $headerInput.placeholder = 'Введите запрос';
  $findList.classList.add('header__find-list', 'hidden');

  // Добавление в разметку
  $header.append($container);
  $container.append($headerWrapper);
  $headerWrapper.append($headerLinkLogo, $headerForm);
  $headerLinkLogo.append($headerImgLogo);
  $headerForm.append($inner);
  $inner.append($headerInput, $findList);

  return $header;
}
