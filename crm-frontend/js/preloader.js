export const createPreloader = () => {
  // Элементы
  const $preloaderWrapper = document.createElement('div');
  const $preloaderBlock = document.createElement('div');

  // Класс
  $preloaderWrapper.classList.add('preloader__wrapper');
  $preloaderWrapper.id = 'preloader';
  $preloaderBlock.classList.add('loader');

  // Добавление
  $preloaderWrapper.append($preloaderBlock);

  return $preloaderWrapper;
}
