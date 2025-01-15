export const sortTable = () => {
  const $table = document.querySelector('.clients__table');
  const $tableHeaders = $table.querySelectorAll('.clients__th__item');
  const $tableBody = $table.querySelector('.clients__tbody');

  // Преобразование в массив
  const directions = Array.from($tableHeaders).map(() => "");
  // Функция принимающая контент столбцов и тип
  const transform = (type, content) => {
    switch (type) {
      case 'id':
      case 'create':
      case 'update':
      case 'text':
      default:
        return content;
    }
  }

  // Сортировка
  const sortColumn = (index) => {
    const type = $tableHeaders[index].getAttribute('data-type');
    const rows = $tableBody.querySelectorAll('tr');
    const direction = directions[index] || 'sortUp';
    const dir = direction === 'sortUp' ? 1 : -1;
    const newRows = Array.from(rows);

    newRows.sort((row1, row2) => {
      const cellA = row1.querySelectorAll('td')[index].textContent;
      const cellB = row2.querySelectorAll('td')[index].textContent;

      const a = transform(type, cellA);
      const b = transform(type, cellB);

      // Направления
      switch (true) {
        case a > b:
          return 1 * dir;
        case a < b:
          return -1 * dir;
        default:
          break;
        case a === b:
          return 0;
      }
    });

    [].forEach.call(rows, (row) => {
      $tableBody.removeChild(row)
    });

    directions[index] = direction === 'sortUp' ? 'sortDown' : 'sortUp';

    newRows.forEach(newRow => {
      $tableBody.appendChild(newRow)
    })
  }

  [].forEach.call($tableHeaders, (header, index) => {
    header.addEventListener('click', () => {
      sortColumn(index);
    })
  })
}
