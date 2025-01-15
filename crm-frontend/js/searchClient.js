import { findClient } from "./clientsApi.js";
import { createItemClient } from './createItemClient.js'

export const searchClients = (clients) => {
  const $findList = document.querySelector('.header__find-list');
  const $findInput = document.querySelector('.header__input');

  clients.forEach(client => {
    const $findItem = document.createElement('li');
    const $findLink = document.createElement('a');

    $findItem.classList.add('search__item');
    $findLink.classList.add('search__link');

    $findLink.textContent = `${client.surname} ${client.name} ${client.lastName}`;
    $findLink.href = '#';

    $findList.append($findItem);
    $findItem.append($findLink);
  });

  const renderTable = async (str) => {
    const response = await findClient(str);
    const $tBody = document.querySelector('.clients__tbody');
    $tBody.innerHTML = '';

    for (const client of response) {
      $tBody.append(createItemClient(client));
    }
  }

  $findInput.addEventListener('input', async () => {
    const value = $findInput.value.trim();
    const foundItems = document.querySelectorAll('.search__link');

    if (value !== '') {
      renderTable(value);

      foundItems.forEach(link => {
        if (link.innerText.search(value) == -1) {
          link.classList.add('hidden');
          link.innerHTML = link.innerText;
        } else {
          link.classList.remove('hidden');
          $findList.classList.remove('hidden');
          const str = link.innerText
          link.innerHTML = insertMark(str, link.innerText.search(value), value.length);
        }
      })
    } else {
      foundItems.forEach(link => {
        const tbody = document.querySelector('.clients__tbody');
        tbody.innerHTML = '';

        clients.forEach(client => {
          tbody.append(createItemClient(client));

          link.classList.remove('hidden');
          $findList.classList.add('hidden');
          link.innerHTML = link.innerText;
        })
      })
    }
  })

  const insertMark = (string, position, length) => string
  .slice(0, position) + '<mark>' + string
  .slice(position, position + length) + '</mark>' + string
  .slice(position + length);
}
