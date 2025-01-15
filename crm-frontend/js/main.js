import { createHeader } from './createHeader.js'
import { createSectionClients } from './createSectionClients.js'
import { getClients } from './clientsApi.js'
import { createItemClient } from './createItemClient.js'
import { sortTable } from './sortClient.js'
import { searchClients } from './searchClient.js'

// Создание приложения
const createClientsApp = async () => {
  const header = createHeader();
  const clientsSection = createSectionClients();
  document.body.append(header, clientsSection.$main);
  const preloader = document.getElementById('preloader');

  try {
    const clients = await getClients();
    searchClients(clients);

    for (const client of clients) {
      document.querySelector('.clients__tbody').append(createItemClient(client));
    }
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => preloader.remove(), 1000);
  }
}

createClientsApp();
document.addEventListener('DOMContentLoaded', sortTable());

