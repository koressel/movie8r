
(function navbarInit() {
  let prevScrollPos = window.pageYOffset;

  window.onscroll = function () {
    let titleBar = document.querySelector(".title-bar");
    let topBar = document.querySelector(".top-bar");
    let currentScrollPos = window.pageYOffset;

    if (window.innerWidth <= 640) {
      if (currentScrollPos >= 24) {
        if (prevScrollPos < currentScrollPos) {
          titleBar.style.top = '-3.7em';
          topBar.style.top = '-7.4em';
        }
        else {
          titleBar.style.top = '0px';
          topBar.style.top = '3.1em';
        }
      }
      prevScrollPos = currentScrollPos;
    }
    else {

    }



    // if (window.innerWidth >= 640) {
    //   topBar.classList.remove('top-bar-mobile-show');
    //   topBar.classList.remove('top-bar-mobile-hide');
    //   if (currentScrollPos >= 24) {
    //     if (prevScrollPos > currentScrollPos) {
    //       topBar.classList.remove('top-bar-hide');
    //       topBar.classList.add('top-bar-show');
    //     } else {
    //       topBar.classList.remove('top-bar-show');
    //       topBar.classList.add('top-bar-hide');
    //     }
    //   }
    //   prevScrollPos = currentScrollPos;
    // }
    // else {
    //   if (topBar.classList.contains('top-bar-show')) {
    //     topBar.classList.remove('top-bar-show');

    //   }
    //   else {
    //     topBar.classList.remove('top-bar-hide');

    //   }
    //   if (currentScrollPos >= 24) {
    //     if (prevScrollPos > currentScrollPos) {
    //       titleBar.classList.remove('title-bar-hide');
    //       titleBar.classList.add('title-bar-show');

    //       topBar.classList.remove('top-bar-mobile-hide');
    //       topBar.classList.add('top-bar-mobile-show');
    //     } else {
    //       titleBar.classList.remove('title-bar-show');
    //       titleBar.classList.add('title-bar-hide');

    //       topBar.classList.remove('top-bar-mobile-show');
    //       topBar.classList.add('top-bar-mobile-hide');
    //     }
    //   }
    //   prevScrollPos = currentScrollPos;
    // }

  };




})();

function addToHomeScreen() {
  deferredPrompt.prompt();  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then(function (choiceResult) {

      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }

      deferredPrompt = null;

    });
}


