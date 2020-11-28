let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  installbutton = document.getElementById("install-button");
  installbutton.addEventListener('click', e => {
    deferredPrompt.prompt();
    // installbutton.disabled = true;
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('PWA setup accepted');
          //hide the callout
        } else {
          console.log('PWA setup rejected');
        }
        deferredPrompt = null;
      });
  });
});






