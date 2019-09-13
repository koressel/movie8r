
(function navbarInit() {
  let prevScrollPos = window.pageYOffset;

  window.onscroll = function () {
    let titleBar = document.querySelector(".title-bar");
    let topBar = document.querySelector(".top-bar");
    let currentScrollPos = window.pageYOffset;

    if (window.innerWidth <= 640) { // small window
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
    else { // medium and large window
      if (currentScrollPos >= 24) {
        if (prevScrollPos < currentScrollPos) {
          topBar.style.top = '-4em';
        }
        else {
          topBar.style.top = '0px';
        }
      }
      prevScrollPos = currentScrollPos;
    }
  };

  window.onresize = function () {
    let topBar = document.querySelector(".top-bar");
    if (window.innerWidth >= 640) {
      topBar.style.top = '0px';
    }
    else {
      topBar.style.top = '3.1em';
    }
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


