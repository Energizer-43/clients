// Валидация формы
export const validateClientForm = () => {
  const $surname = document.getElementById('surname');
  const $name = document.getElementById('name');
  const $lastName = document.getElementById('lastName');
  const $textError = document.getElementById('errorText');

  const regexp = /[^а-яА-ЯёЁ]+$/g;

  // Сообщения ошибок
  const surnameEmptyMessage = 'Введите фамилию!';
  const nameEmptyMessage = 'Введите имя!';
  const lastNameEmptyMessage = 'Введите отчество!';

  // Функции для добавления ошибок

  // Если поля пустые
  const checkRequiredName = (input, message) => {
    if (!input.value) {
      $textError.textContent = message;
      input.style.borderColor = 'var(--color-burnt-sienna)';
      return false
    } else {
      $textError.textContent = '';
      input.style.borderColor = 'var(--color-gray-suit)';
    }
    return true
  }

  // Если не кириллицей
  const checkbyRegexp = (input, regexp) => {
    if (regexp.test(input.value)) {
      $textError.textContent = 'Разрешено вводить только русские буквы!';
      input.style.borderColor = 'var(--color-burnt-sienna)';
      return false
    } else {
      $textError.textContent = '';
      input.style.borderColor = 'var(--color-gray-suit)';
      return true
    }
  }

  // Максимальная и минимальная длинна
  const checkLength = (input) => {
    if (input.value.length == 1) {
      $textError.textContent = 'Минимальное количество символов: 2';
      input.style.borderColor = 'var(--color-burnt-sienna)';
      return false;
    } else if (input.value.length >= 30) {
      $textError.textContent = 'Максимальное количество символов: 30';
      input.style.borderColor = 'var(--color-burnt-sienna)';
      return false;
    } else {
      $textError.textContent = '';
      input.style.borderColor = 'var(--color-gray-suit)';
      return true
    }
  }

  // Проверка с вызовами
  if (!checkLength($surname)) { return false };
  if (!checkLength($name)) { return false };
  if (!checkLength($lastName)) { return false };

  if (!checkbyRegexp($surname, regexp)) { return false };
  if (!checkbyRegexp($name, regexp)) { return false };
  if (!checkbyRegexp($lastName, regexp)) { return false };

  if (!checkRequiredName($surname, surnameEmptyMessage)) { return false };
  if (!checkRequiredName($name, nameEmptyMessage)) { return false };
  if (!checkRequiredName($lastName, lastNameEmptyMessage)) { return false };

  return true
}
