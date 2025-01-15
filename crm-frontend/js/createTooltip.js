// Тултипы

export const contactTooltip = (type, value) => {
  // Добавление элементов
  const $tooltip = document.createElement('div');
  const $tooltipType = document.createElement('span');
  const $tooltipValue = document.createElement('a');

  // Добавление классов
  $tooltip.classList.add('contact-tooltip', 'tooltips');
  $tooltipType.classList.add('contact-tooltip__type');
  $tooltipValue.classList.add('contact-tooltip__value');

  // Добавление контента
  $tooltipType.textContent = type + ':';
  $tooltipValue.textContent = value;

  // Добавление в разметку
  $tooltip.append($tooltipType, $tooltipValue);

  return {
    $tooltip,
    $tooltipType,
    $tooltipValue
  }
}
