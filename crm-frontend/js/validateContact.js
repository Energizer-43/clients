export const validateClientContact = (contactType, contactInput) => {
  const $textError = document.getElementById('errorText');

  const emptyMessage = 'Заполните поле!';
  const emailMessage = 'Введите корректный Email!';
  const emailMessage2 = 'Некорректный Email! Не хватает "@"';
  const emailMessage3 = `Некорректный Email! Не хватает "."`;
  const onlyEnglish = /[^a-zA-Z|.|@]+$/g;

  const showErrorMessage = (error, message, input) => {
    error.textContent = message;
    input.style.border = '1px solid var(--color-burnt-sienna)'
  }

  if (!contactInput.value) {
    showErrorMessage($textError, emptyMessage, contactInput);
    return false
  }

  switch (contactType.innerHTML) {
    case 'Email':
      if (onlyEnglish.test(contactInput.value)) {
        showErrorMessage($textError, emailMessage, contactInput);
        return false
      } else if (!contactInput.value.includes('@')) {
        showErrorMessage($textError, emailMessage2, contactInput);
        return false
      } else if (!contactInput.value.includes('.')) {
        showErrorMessage($textError, emailMessage3, contactInput);
        return false
      }
    default:
      return true;
  }
}
