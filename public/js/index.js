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

let deferredPrompt; // Allows to show the install prompt

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  console.log("beforeinstallprompt fired");
  installbutton = document.getElementById("install-button");
  installbutton.addEventListener('click', e => {
    deferredPrompt.prompt();
    installButton.disabled = true;
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('PWA setup accepted');
        } else {
          console.log('PWA setup rejected');
        }
        deferredPrompt = null;
      });
  });
});






