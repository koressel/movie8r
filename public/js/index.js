(function init() {
  let prevScrollPos = window.pageYOffset;
  window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (currentScrollPos >= 24) {
      if (prevScrollPos > currentScrollPos) {
        document.getElementById("mobile-menu").style.top = "0";
      } else {
        document.getElementById("mobile-menu").style.top = "-52px";
      }
    }
    prevScrollPos = currentScrollPos;
  };
})();