import { apiClient } from './apiClient.js';
import { showErrorNotification } from './notifications.js';
import { extractErrorMessage } from './utils.js';

const itemsPerPage = 8;

const catalogueList = document.getElementById('bouquets-list');
const catalogueListShell = document.querySelector('.bouquets-list-shell');
const catalogueLoader = document.getElementById('bouquets-loader');
const showMoreButton = document.querySelector('.bouqets-item-show-more-button');

let lastLoadedPage = 1;
let allProducts = [];

function formatPrice(price) {
  if (!price) return '-';

  const str = String(price).trim();

  if (str.startsWith('$')) return str;

  return `$${str}`;
}

function buildItemMarkup() {
  return `
    <li class="bouquets-list-item">
      <img class="bouqets-item-image" alt="">
      <h3 class="bestsellers-bouqets-title"></h3>
      <p class="bestsellers-bouqets-subtitle"></p>
      <p class="price-text"></p>
    </li>
  `;
}

function fillItem(listItem, product) {
  const image = listItem.querySelector('.bouqets-item-image');

  image.src = product.img ?? '';
  image.alt = product.title ?? '';

  listItem.querySelector('.bestsellers-bouqets-title').textContent =
    product.title ?? '';

  listItem.querySelector('.bestsellers-bouqets-subtitle').textContent =
    product.desc ?? '';

  listItem.querySelector('.price-text').textContent = formatPrice(
    product.price
  );
}

function setCatalogueInitialLoading(isLoading) {
  if (catalogueLoader) {
    catalogueLoader.hidden = !isLoading;
  }

  if (catalogueListShell) {
    catalogueListShell.setAttribute('aria-busy', isLoading ? 'true' : 'false');
  }
}

function setShowMoreLoading(isLoading) {
  if (!showMoreButton) return;

  showMoreButton.disabled = isLoading;
  showMoreButton.textContent = isLoading ? 'Loading...' : 'Show More';
}

function renderProducts(products, replace = false) {
  if (!catalogueList) return;

  if (replace) {
    catalogueList.replaceChildren();
  }

  const startIndex = catalogueList.children.length;

  catalogueList.insertAdjacentHTML(
    'beforeend',
    products.map(() => buildItemMarkup()).join('')
  );

  const items = catalogueList.querySelectorAll('.bouquets-list-item');

  products.forEach((product, index) => {
    fillItem(items[startIndex + index], product);
  });
}

function updateShowMoreButton() {
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  showMoreButton.hidden = lastLoadedPage >= totalPages;
}

function renderPage(page) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const products = allProducts.slice(start, end);

  renderProducts(products, page === 1);

  lastLoadedPage = page;

  updateShowMoreButton();
}

async function loadBouquets() {
  setCatalogueInitialLoading(true);

  try {
    const response = await apiClient.get('/bouquets');

    allProducts = response.data;

    renderPage(1);
  } catch (error) {
    showErrorNotification(extractErrorMessage(error));
  } finally {
    setCatalogueInitialLoading(false);
  }
}

function init() {
  if (!catalogueList) return;

  showMoreButton?.addEventListener('click', () => {
    setShowMoreLoading(true);

    renderPage(lastLoadedPage + 1);

    setShowMoreLoading(false);
  });

  loadBouquets();
}

init();
