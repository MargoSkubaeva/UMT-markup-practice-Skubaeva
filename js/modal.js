import { showSuccessNotification } from './notifications.js';

const detailModal = document.getElementById('detail-modal');
const orderModal = document.getElementById('order-modal');

const closeDetailBtn = document.getElementById('close-modal-button');
const closeOrderBtn = document.getElementById('close-order-modal-button');

const detailContent = document.getElementById('detail-modal-content');

const orderForm = document.getElementById('order-modal-form');

function lockScroll() {
  document.body.classList.add('modal-open');
  document.documentElement.classList.add('modal-open');
}

function unlockScroll() {
  const anyModalOpen =
    detailModal?.classList.contains('is-open') ||
    orderModal?.classList.contains('is-open');

  if (!anyModalOpen) {
    document.body.classList.remove('modal-open');
    document.documentElement.classList.remove('modal-open');
  }
}

function openDetailModal() {
  detailModal?.classList.add('is-open');
  lockScroll();
}

function closeDetailModal() {
  detailModal?.classList.remove('is-open');
  unlockScroll();
}

function openOrderModal() {
  detailModal?.classList.remove('is-open');
  orderModal?.classList.add('is-open');
  lockScroll();
}

function closeOrderModal() {
  orderModal?.classList.remove('is-open');
  unlockScroll();
}

/* Відкриття модалки по кліку на будь-яку картку */

document.addEventListener('click', (event) => {
  const card = event.target.closest('.bestsellers-card, .bouquets-list-item');

  if (!card) return;

  const img =
    card.querySelector('.bouqets-item-image') ||
    card.querySelector('.bestsellers-image') ||
    card.querySelector('img');

  const title = card.querySelector('.bestsellers-bouqets-title');
  const price = card.querySelector('.price-text');
  const subtitle = card.querySelector('.bestsellers-bouqets-subtitle');

  const modalImg = document.querySelector('.detail-modal-image');
  const modalTitle = document.querySelector('.detail-modal-title');
  const modalPrice = document.querySelector('.detail-modal-price');
  const modalText = document.querySelector('.detail-modal-text');

  if (modalImg && img) {
    modalImg.src = img.currentSrc || img.src;
    modalImg.alt = img.alt || '';

    if (img.srcset) {
      modalImg.srcset = img.srcset;
    } else {
      modalImg.removeAttribute('srcset');
    }
  }

  if (modalTitle && title) {
    modalTitle.textContent = title.textContent.trim();
  }

  if (modalPrice && price) {
    modalPrice.textContent = price.textContent.trim();
  }

  if (modalText && subtitle) {
    modalText.textContent = subtitle.textContent.trim();
  }

  openDetailModal();
});

/* Закриття по хрестику */

closeDetailBtn?.addEventListener('click', closeDetailModal);
closeOrderBtn?.addEventListener('click', closeOrderModal);

/* Закриття по кліку на фон */

detailModal?.addEventListener('click', (event) => {
  if (event.target === detailModal) {
    closeDetailModal();
  }
});

orderModal?.addEventListener('click', (event) => {
  if (event.target === orderModal) {
    closeOrderModal();
  }
});

/* Buy Now */

detailContent?.addEventListener('click', (event) => {
  const buyBtn = event.target.closest('.detail-modal-button');

  if (!buyBtn) return;

  openOrderModal();
});

/* Закриття по Escape */

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeDetailModal();
    closeOrderModal();
  }
});

orderForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  closeOrderModal();
  orderForm.reset();

  showSuccessNotification(
    'Thank you! Your order has been successfully submitted.'
  );
});
