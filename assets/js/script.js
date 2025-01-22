/* -------------------------------- 

Banner hider

-------------------------------- */
!function () { var n = document.getElementsByClassName("js-notice"); if (0 < n.length) for (var c = 0; c < n.length; c++)!function (e) { var t; (t = n[c]).addEventListener("click", function (e) { e.target.closest(".js-notice__hide-control") && (e.preventDefault(), t.classList.add("notice--hide")) }) }() }();
/* -------------------------------- 

Download List

-------------------------------- */

var btns = document.getElementsByClassName('dow-list__btn');
if (btns.length > 0) {
  for (var i = 0; i < btns.length; i++) {
    (function (i) {
      btnAnimation(btns[i]);
    })(i);
  }
}

function btnAnimation(btn) {
  btn.addEventListener('click', function (event) {
    event.preventDefault();
    btn.classList.add('dow-list__btn--is-loading');

    // Set timeout for button animation completion (3.6s)
    setTimeout(function () {
      btn.classList.add('dow-list__btn--success');
    }, 3600);

    // After animation is complete, trigger download
    setTimeout(function () {
      btn.classList.add('dow-list__btn--reset');

      // Trigger file download after the animation is complete
      const fileUrl = btn.getAttribute('data-file-url'); // File URL from `data-file-url` attribute
      if (fileUrl) {
        // Ensure the file download triggers and doesn't reload the page immediately
        setTimeout(function () {
          downloadFile(fileUrl); // Trigger the file download
          // Now show the success message after download starts
          showSuccessMessage(fileUrl);
        }, 500); // Small delay to ensure reset state is applied
      }

      // Reset the button state after animation reset
      var delay = parseFloat(getComputedStyle(btn).getPropertyValue('--hover-transition-duration')) * 1000;
      setTimeout(function () {
        btn.classList.remove('dow-list__btn--is-loading', 'dow-list__btn--success', 'dow-list__btn--error');
        setTimeout(function () {
          btn.classList.remove('dow-list__btn--reset');
        }, 10);
      }, delay);
    }, 5300);
  });
}

// Function to trigger the file download
function downloadFile(url) {
  var a = document.createElement('a');
  a.href = url;
  a.download = ''; // Optional: Specify a filename for the downloaded file
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Function to show success message with dynamic link
function showSuccessMessage(fileUrl) {
  var successMessage = document.getElementById('success_download');

  // Update the content of the success message with dynamic link
  var p = successMessage.querySelector('p');
  p.innerHTML = `<strong class="alert__label">Success:</strong> Your file has started downloading. If not,  <a href="${fileUrl}" class="" target="_blank">Click here</a> to start the download.`;

  // Show the success message
  successMessage.classList.add('alert--is-visible');
}

(function () {
  var alertClose = document.getElementsByClassName('js-alert__close-btn');
  if (alertClose.length > 0) {
    for (var i = 0; i < alertClose.length; i++) {
      (function (i) { initAlertEvent(alertClose[i]); })(i);
    }
  };
}());

function initAlertEvent(element) {
  element.addEventListener('click', function (event) {
    event.preventDefault();
    element.closest('.js-alert').classList.remove('alert--is-visible');
  });
}



/* -------------------------------- 

Cookie banner

-------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  const cookieBanner = document.getElementById("cookie_banner");
  const okButton = document.getElementById("ok_button");
  const noThanksButton = document.getElementById("nothanks_button");

  // Helper function to set a cookie
  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }

  // Helper function to get a cookie
  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === name) return value;
    }
    return null;
  }

  // Check cookie to determine banner visibility
  const cookieConsent = getCookie("cookieConsent");
  if (!cookieConsent || cookieConsent === "no") {
    cookieBanner.style.display = "block"; // Show the banner
    // console.log("Banner shown because no consent or consent is 'no'");
  } else {
    cookieBanner.style.display = "none"; // Hide the banner
    // console.log("Banner hidden because consent is:", cookieConsent);
  }

  // "OK, Got it!" button handler
  okButton.addEventListener("click", () => {
    setCookie("cookieConsent", "ok", 365); // Store user consent for 1 year
    // cookieBanner.style.display = "none"; // Hide the banner
    // console.log("OK clicked: Banner hidden, consent set to 'ok'");
  });

  // "No, Thanks" button handler
  noThanksButton.addEventListener("click", () => {
    setCookie("cookieConsent", "no", 365); // Store refusal for 1 year
    // cookieBanner.style.display = "block"; // Keep the banner visible
    // console.log("No, Thanks clicked: Banner kept visible, consent set to 'no'");
  });
});

tippy('[data-tippy-content]', {
  animation: 'shift-away',
  arrow: false,
});