import { addCloseBtnSvg, spinnerSvg } from './svgIcons.js'

// Модальное окно удаления клиента
export const deleteClientModal = () => {
  // Создание элементов
  const $deleteModal = document.createElement('div');
  const $deleteModalContent = document.createElement('div');
  const $deleteModalCloseBtn = document.createElement('button');
  const $deleteModalTitle = document.createElement('h2');
  const $deleteModalDescr = document.createElement('p');
  const $deleteModalDeleteBtn = document.createElement('button');
  const $deleteModalCancelBtn = document.createElement('button');
  const $deleteSpinner = document.createElement('span');

  // Добавление классов
  $deleteModal.classList.add('delete-modal', 'modal');
  $deleteModalContent.classList.add('delete-modal__content', 'modal-open');
  $deleteModalCloseBtn.classList.add('delete-modal__close-btn');
  $deleteModalTitle.classList.add('delete-modal__title');
  $deleteModalDescr.classList.add('delete-modal__text');
  $deleteModalDeleteBtn.classList.add('delete-modal__delete-btn');
  $deleteModalCancelBtn.classList.add('delete-modal__cancel-btn');
  $deleteSpinner.classList.add('spinner');

  // Добавление контента
  $deleteModalTitle.textContent = 'Удалить клиента';
  $deleteModalCloseBtn.innerHTML = addCloseBtnSvg;
  $deleteModalDescr.textContent = 'Вы действительно хотите удалить данного клиента?';
  $deleteModalDeleteBtn.textContent = 'Удалить';
  $deleteModalCancelBtn.textContent = 'Отмена';
  $deleteSpinner.innerHTML = spinnerSvg;

  // Добавление в разметку
  $deleteModal.append($deleteModalContent);
  $deleteModalContent.append($deleteModalTitle,
    $deleteModalCloseBtn,
    $deleteModalDescr,
    $deleteModalDeleteBtn,
    $deleteModalCancelBtn);

  $deleteModalDeleteBtn.prepend($deleteSpinner);

  // Закрытие модального окна по кнопке крестик
  $deleteModalCloseBtn.addEventListener('click', () => $deleteModal.remove());

  // Закрытие модального окна по кнопке "Отмена"
  $deleteModalCancelBtn.addEventListener('click', () => $deleteModal.remove());

    return {
      $deleteModal,
      $deleteModalContent,
      $deleteModalDeleteBtn,
      $deleteSpinner
    }
}
