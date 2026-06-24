const bestsellersSwiper = new Swiper('.bestsellers-swiper', {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: true,

  navigation: {
    nextEl: '.bestsellers-next',
    prevEl: '.bestsellers-prev',
  },

  pagination: {
    el: '.bestsellers-pagination',
    clickable: true,
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
    },

    1440: {
      slidesPerView: 3,
    },
  },
});
