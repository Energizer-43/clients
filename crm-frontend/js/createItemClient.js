import { changeContactSvg, deleteContactSvg, spinnerSvg } from './svgIcons.js'
import { getCurrentDate, getCurrentTime, getUpperString, createContactItemByType } from './utils.js'
import { deleteClientModal } from './createModalDelete.js'
import { editClientModal } from './createModalEdit.js'

// Функция принимающая данные с сервера и создание Tr
export const createItemClient = (data) => {
  const $clientTr = document.createElement('tr');
  const $clientTdId = document.createElement('td');
  const $clientTdFullName = document.createElement('td');
  const $clientTdCreateDate = document.createElement('td');
  const $clientTdCreateDateSpan = document.createElement('span');
  const $clientTdCreateTimeSpan = document.createElement('span');
  const $clientTdLastChange = document.createElement('td');
  const $clientTdLastChangeSpanDate = document.createElement('span');
  const $clientTdLastChangeSpanTime = document.createElement('span');
  const $clientTdContacts = document.createElement('td');
  const $clientTdActionsEdit = document.createElement('td');
  const $clientTdActionsEditBtn = document.createElement('button');
  const $clientTdActionsEditSpanSvg = document.createElement('span');
  const $clientTdActionsEditSpanText = document.createElement('span');
  const $clientTdActionsDelete = document.createElement('td');
  const $clientTdActionsDeleteBtn = document.createElement('button');
  const $clientTdActionsDeleteSpanSvg = document.createElement('span');
  const $clientTdActionsDeleteSpanText = document.createElement('span');
  const $deleteClient = deleteClientModal();
  const $editClient = editClientModal(data);
  const $spinnerEdit = document.createElement('span');
  const $spinnerDelete = document.createElement('span');

  // Добавление классов
  $clientTr.classList.add('clients__item');
  $clientTdId.classList.add('clients__id');
  $clientTdFullName.classList.add('clients__full-name');
  $clientTdCreateDate.classList.add('clients__create-date');
  $clientTdCreateDateSpan.classList.add('clients__create-date-span');
  $clientTdCreateTimeSpan.classList.add('clients__create-time-span');
  $clientTdLastChange.classList.add('clients__last-change');
  $clientTdLastChangeSpanDate.classList.add('clients__last-change-date-span');
  $clientTdLastChangeSpanTime.classList.add('clients__last-change-time-span');
  $clientTdContacts.classList.add('clients__contacts');
  $clientTdActionsEdit.classList.add('clients__actions-edit');
  $clientTdActionsEditBtn.classList.add('clients__edit-btn');
  $clientTdActionsEditSpanSvg.classList.add('clients__edit-span-svg');
  $clientTdActionsEditSpanText.classList.add('clients__edit-span-text');
  $clientTdActionsDelete.classList.add('clients__actions-delete');
  $clientTdActionsDeleteBtn.classList.add('clients__delete-btn');
  $clientTdActionsDeleteSpanSvg.classList.add('clients__delete-span-svg');
  $clientTdActionsDeleteSpanText.classList.add('clients__delete-span-text');
  $spinnerEdit.classList.add('spinner-edit');
  $spinnerDelete.classList.add('spinner-delete');

  // Для каждого контакта вызываю функцию и передаю аргументы
  for (const contact of data.contacts) {
    createContactItemByType(contact.type, contact.value, $clientTdContacts)
  }

  // Функция удаления клиента
  const deleteById = () => {
    import('./clientsApi.js').then(({ deleteClientItem }) => {
      $deleteClient.$deleteModalDeleteBtn.addEventListener('click', () => {
        try {
          $deleteClient.$deleteSpinner.style.display = 'none';
          deleteClientItem(data.id);
          document.getElementById(data.id).remove();
        } catch (error) {
          console.log(error);
        } finally {
          $deleteClient.$deleteSpinner.style.display = 'flex';
        }
      })
    })
  }

  $clientTdActionsEditBtn.addEventListener('click', () => {
    $spinnerEdit.style.display = 'block';
    $clientTdActionsEditSpanSvg.classList.add('invisible');

    setTimeout(() => {
      document.body.append($editClient.$editModal);
      $spinnerEdit.style.display = 'none';
      $clientTdActionsEditSpanSvg.classList.remove('invisible');
    }, 500);
  })

  // Обработчик события для кнопки удаления
  $clientTdActionsDeleteBtn.addEventListener('click', () => {
    $spinnerDelete.style.display = 'block';
    $clientTdActionsDeleteSpanSvg.classList.add('invisible');
    setTimeout(() => {
      deleteById();
      document.body.append($deleteClient.$deleteModal);
      $spinnerDelete.style.display = 'none';
      $clientTdActionsDeleteSpanSvg.classList.remove('invisible');
    }, 300);
  })

  // Добавление контента
  $clientTdId.textContent = data.id.substring(7, 13);
  $clientTdFullName.textContent = getUpperString(`${data.surname} ${data.name} ${data.lastName}`);
  $clientTdCreateDateSpan.textContent = getCurrentDate(data.createdAt);
  $clientTdCreateTimeSpan.textContent = getCurrentTime(data.createdAt);
  $clientTdLastChangeSpanDate.textContent = getCurrentDate(data.updatedAt);
  $clientTdLastChangeSpanTime.textContent = getCurrentTime(data.updatedAt);
  $clientTdActionsEditSpanSvg.innerHTML = changeContactSvg;
  $clientTdActionsEditSpanText.textContent = 'Изменить';
  $clientTdActionsDeleteSpanSvg.innerHTML = deleteContactSvg;
  $clientTdActionsDeleteSpanText.textContent = 'Удалить';
  $spinnerEdit.innerHTML = spinnerSvg;
  $spinnerDelete.innerHTML = spinnerSvg;

  // Добавление в разметку
  $clientTr.append($clientTdId,
    $clientTdFullName,
    $clientTdCreateDate,
    $clientTdLastChange,
    $clientTdContacts,
    $clientTdActionsEdit,
    $clientTdActionsDelete
  )
  $clientTdCreateDate.append($clientTdCreateDateSpan, $clientTdCreateTimeSpan);
  $clientTdLastChange.append($clientTdLastChangeSpanDate, $clientTdLastChangeSpanTime);
  $clientTdActionsEdit.append($clientTdActionsEditBtn);
  $clientTdActionsDelete.append($clientTdActionsDeleteBtn);
  $clientTdActionsEditBtn.append($spinnerEdit, $clientTdActionsEditSpanSvg, $clientTdActionsEditSpanText);
  $clientTdActionsDeleteBtn.append($spinnerDelete, $clientTdActionsDeleteSpanSvg, $clientTdActionsDeleteSpanText);
  return $clientTr;
}
