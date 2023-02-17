const modal = document.getElementById('modalBackground');
const body = document.body;
var btnEmail = document.getElementById('emailOption');
var btnForum = document.getElementById('forumOption');
var btnExpert = document.getElementById('expertsOption');

//Get User Details
function getUserDetails() {
  wf_utils.isLoggedIn((isLoggedIn) => {
    if (isLoggedIn) {
      wf_utils.getUser((user) => {
        var userEmail = user.email;
        var userFullName = user.fullName;
        var readOnlyFields = true;
        var userCreatedOn = new Date(user.createdOn);
        var verificationIso = userCreatedOn
          .toISOString()
          .replace('T', ' ')
          .replace('Z', '');
        var verificationUtc = dayjs(verificationIso).format(
          'MMMM Do YYYY, h:mm:ss a' + ' (UTC)'
        );
        zE('webWidget', 'identify', {
          name: userFullName,
          email: userEmail,
        });
        zE('webWidget', 'prefill', {
          name: {
            value: userFullName,
            readOnly: readOnlyFields,
          },
          email: {
            value: userEmail,
            readOnly: readOnlyFields,
          },
        });
        zE('webWidget', 'updateSettings', {
          webWidget: {
            contactForm: {
              ticketForms: customForm,
              fields: [
                { id: 4659025599507, prefill: { '*': verificationIso } },
                { id: 4457667707283, prefill: { '*': verificationUtc } },
              ],
            },
          },
        });
        if (userFullName == null) {
          var $head = $('#webWidget').contents().find('head');
          $head.append(
            $(
              '\
                          <style> \
                          @media screen and (min-width: 500px) { \
                              /* Hide Name Field */ \
                              input[name="name"], [data-fieldid="name"]{ display: none; pointer-events:none;} \
                          } \
                          </style> \
                          '
            )
          );
        }
      });
    }
  });
}

// Show and Hide Widget for custom styles
window.addEventListener('DOMContentLoaded', function () {
  zE('webWidget:on', 'open', () => {
    document.querySelector('.preloader').style.display = 'none';
    const queryString = new URLSearchParams(window.location.search);
    const email = queryString.get('email');
    if (email === 'true') {
      const emailBtn = document.getElementById('emailOption');
      if (emailBtn) {
        setTimeout(() => {
          emailBtn.click();
        }, 500);
      }
    }
  });
  zE('webWidget', 'show');
  zE('webWidget', 'open');
});

//check when widget is ready

//Open Widget
function openWidget() {
  getUserDetails();
  modal.style.display = 'block';
  body.style.overflow = 'hidden';
  zE('webWidget', 'show');
  zE('webWidget', 'open');
  var desktopWidget = document.getElementById('webWidget');
  if (!desktopWidget) return;
  desktopWidget.style.display = 'block';
  var $head = $('#webWidget').contents().find('head');
  $head.append(
    $(
      '\
      <style> \
          @media screen and (min-width: 500px) { \
              /* Widget Border Radius */ \
              body>div>div>div>div>div>div>div, body>div>div>div>div>div>div>div>div>div, body>div>div>div>div>div>div { border-radius: 0 !important; } \
              /* Main Header */ \
              body>div>div>div>div>div>div>div>header>div>h1, body>div>div>div>div>div>div>div>div>div>header>div>h1, body>div>div>div>div>div>div>header>div>h1 { font-size: 38px !important; font-weight: 500 !important; letter-spacing: -0.02em !important; text-align: left !important; margin-left: 5px !important; } \
              /* Sub Header */ \
              body>div>div>div>div>div>div>div>div>div>form>main>div, body>div>div>div>div>div>div>div>form>main>div { color: #000 !important; font-size: 15px !important; line-height: 1.25em !important; margin-bottom: 20px !important; margin-top: 15px !important; } \
              /* Chat Sub Header */ \
              body>div>div>div>div>div>div>div>div>div>div {box-shadow: none !important; border-bottom: 0.0785714rem solid rgb(233, 235, 237) !important;} \
              /* Form Labels */ \
              body>div>div>div>div>div>div>div>form>main>div>div>div>label>div, body>div>div>div>div>div>div>div>form>main>div>div>div>label, body>div>div>div>div>div>div>div>form>main>div>div>div>div>label, body>div>div>div>div>div>div>div>div>div>form>main>div>div>div>label { margin-bottom: 2px !important; font-weight: 500 !important; color: #000 !important; font-size: 16px !important; margin-top: 28px !important; } \
              /* Form Inputs */ \
              body>div>div>div>div>div>div>div>form>main>div>div>div>input { height: 50px !important; margin-bottom: 0 !important; padding-left: 16px !important; border: 1px solid #ddd !important; border-radius: 0px !important; background-color: #fff !important; font-size: 15px !important; } \
              /* Form Inputs Read-Only */ \
              body>div>div>div>div>div>div>div>form>main>div>div>div>input:read-only { background-color: #f3f3f3 !important; } \
              /* Form Textarea */ \
                body>div>div>div>div>div>div>div>form>main>div>div>div>textarea, body>div>div>div>div>div>div>div>div>div>footer>div>div>textarea, body>div>div>div>div>div>div>div>div>div>form>main>div>div>div>textarea { border-radius: 0 !important; margin-bottom: 12px !important; padding-left: 16px !important; border: 1px solid #ddd !important; border-radius: 0px !important; background-color: #fff !important; font-size: 15px !important; } \
              /* Form Upload */ \
              body>div>div>div>div>div>div>div>form>main>div>div>div>button#dropzone-input { border-radius: 0 !important; margin-top: 10px !important; } \
              /* Form Footer Shadow */ \
                body>div>div>div>div>div>div>div>form>footer, body>div>div>div>div>div>div>div>div>div>form>footer { box-shadow: none !important; } \
              /* Form Button */ \
              body>div>div>div>div>div>div>div>form>footer>div>button, body>div>div>div>div>div>div>div>div>div>form>footer>div>button { border-radius: 0 !important; height: 50px !important; margin-top: 0px !important; padding-right: 24px !important; padding-left: 24px !important; background-color: #4353ff !important; font-size: 16px !important; font-weight: 500 !important; } \
              /* Form Dropdown */ \
              body>div>div>div>div>div>div>div>form>main>div>div>div>div>div:last-child { padding: 17px !important; border-radius: 0 !important; font-size: 15px !important; } \
            } \
      /* Verification Field */ \
              input[name="key:4659025599507"], [data-fieldid="key:4659025599507"], input[name="key:4457667707283"], [data-fieldid="key:4457667707283"] { display: none; pointer-events:none; } \
      </style> \
      '
    )
  );
}

//Close Widget
function closeWidget() {
  modal.style.display = 'none';
  body.style.overflow = 'auto';
  zE('webWidget', 'hide');
  zE('webWidget', 'show');
  zE('webWidget', 'open');
  var desktopWidget = document.getElementById('webWidget');
  if (!desktopWidget) return;
  desktopWidget.style.display = 'none';
}

//Email Things
if (btnEmail) {
  //Click Email button to show widget with specific form and hide chat + Analytics
  btnEmail.addEventListener('click', function () {
    zE('webWidget', 'updateSettings', {
      webWidget: {
        chat: {
          suppress: true,
        },
        contactForm: {
          ticketForms: customForm,
        },
      },
    });
    getUserDetails();
    openWidget();
  });
}

//Widget Close when modal clicked or Escape key pressed
if (modal) {
  modal.addEventListener('click', function () {
    closeWidget();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeWidget();
    }
  });
}

//Widget Close when close button clicked
zE('webWidget:on', 'close', function () {
  closeWidget();
});

//Auto-Click Email button with URL Param
const queryString = new URLSearchParams(window.location.search);
const email = queryString.get('email');

// document.addEventListener('DOMContentLoaded', () => {
//   if (email === 'true') {
//     const emailBtn = document.getElementById('emailOption');
//     if (emailBtn) {
//       emailBtn.click();
//     }
//   }
// });

//Tracking accordion opens
document.querySelectorAll('.accordion-trigger-2').forEach((accordion) => {
  accordion.addEventListener(
    'click',
    () => {
      const trackingId = accordion
        .closest('.accordion-item')
        .querySelector('#tracking-id').innerText;
      gtag('event', trackingId);
    },
    { once: true }
  );
});

// Determine which FAQ feedback was given
document
  .querySelectorAll('.faq-feedback-button.yes, .faq-feedback-button.no')
  .forEach((el) => {
    el.addEventListener('click', (e) => {
      const isYes =
        e.target.classList.contains('yes') ||
        e.target.parentNode.classList.contains('yes');
      const closestSlug = e.target
        .closest('.faq-feedback-button')
        .parentNode.querySelector('#tracking-id');
      const GA_TAG = 'faq-' + closestSlug.innerHTML + '-'(isYes ? 'yes' : 'no');
      gtag('event', GA_TAG);
    });
  });

//This triggers on link (<a>) element but should trigger on card-wrapper
//to ensure more accurate analytics

document.addEventListener('click', (event) => {
  if (event.target.id === btnEmail.id) {
    gtag('event', 'contact_email');
  } else if (event.target.id === btnForum.id) {
    gtag('event', 'contact_forum');
  } else if (event.target.id === btnExpert.id) {
    gtag('event', 'contact_experts');
  }
});

// Sends gtag for Lessons & Links as 'article-advanced-publishing-options'
document.querySelectorAll('.article').forEach((lesson) => {
  lesson.addEventListener('click', (e) => {
    const GA_TAG =
      'article-' +
      lesson.querySelector('h3').innerText.toLowerCase().split(' ').join('-');
    gtag('event', GA_TAG);
  });
});
