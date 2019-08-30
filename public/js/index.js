(function init() {
  let prevScrollPos = window.pageYOffset;

  window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    let titleBar = document.querySelector(".title-bar");
    let topBar = document.querySelector(".top-bar");

    if (screen.width >= 640) {
      topBar.classList.remove('top-bar-mobile-show');
      topBar.classList.remove('top-bar-mobile-hide');
      if (currentScrollPos >= 24) {
        if (prevScrollPos > currentScrollPos) {
          topBar.classList.remove('top-bar-hide');
          topBar.classList.add('top-bar-show');
        } else {
          topBar.classList.remove('top-bar-show');
          topBar.classList.add('top-bar-hide');
        }
      }
      prevScrollPos = currentScrollPos;
    }
    else {
      if (topBar.classList.contains('top-bar-show')) {
        topBar.classList.remove('top-bar-show');

      }
      else {
        topBar.classList.remove('top-bar-hide');

      }
      if (currentScrollPos >= 24) {

        if (prevScrollPos > currentScrollPos) {
          titleBar.classList.remove('title-bar-hide');
          titleBar.classList.add('title-bar-show');
          topBar.classList.remove('top-bar-mobile-hide');
          topBar.classList.add('top-bar-mobile-show');
        } else {
          titleBar.classList.remove('title-bar-show');
          titleBar.classList.add('title-bar-hide');
          topBar.classList.remove('top-bar-mobile-show');
          topBar.classList.add('top-bar-mobile-hide');
        }
      }
      prevScrollPos = currentScrollPos;
    }

  };
})();


