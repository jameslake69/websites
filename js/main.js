/* ==========================================================================
   Growing Happy — main.js (vanilla JS, no libraries, no tracking)
   --------------------------------------------------------------------------
   Three small behaviours only:
   1. Mobile nav toggle
   2. FAQ accordion (one open at a time, keyboard friendly)
   3. Contact form -> opens the visitor's email app (mailto).
      No data is stored or sent anywhere by this site.
   4. Footer year
   If this file fails to load, everything still works except the accordion
   (answers stay hidden — see the <noscript> note in SETUP.md) and the
   mailto form falls back to a plain mailto link in the contact details.
   ========================================================================== */
(function () {
  'use strict';

  /* --- 1. Mobile nav -------------------------------------------------- */
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.querySelector('[data-nav]');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    /* Close the menu after tapping a link (mobile). */
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --- 2. FAQ accordion ------------------------------------------------ */
  var faq = document.querySelector('[data-faq]');
  if (faq) {
    var buttons = faq.querySelectorAll('.faq-item button');
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var item = button.closest('.faq-item');
        var answer = item.querySelector('.faq-answer');
        var isOpen = button.getAttribute('aria-expanded') === 'true';
        /* Close all, then open the clicked one (if it was closed). */
        buttons.forEach(function (other) {
          other.setAttribute('aria-expanded', 'false');
          other.closest('.faq-item').querySelector('.faq-answer').hidden = true;
        });
        if (!isOpen) {
          button.setAttribute('aria-expanded', 'true');
          answer.hidden = false;
        }
      });
    });
  }

  /* --- 3. Contact form -> mailto ----------------------------------------
     TODO BEFORE PUBLISHING: replace the address below with the real inbox
     that should receive tour requests (e.g. hello@growinghappy.example).
     For a form that saves enquiries without opening an email app, use
     Formspree or Netlify Forms — see SETUP.md. That is a separate decision;
     do not wire it without approval. */
  var CONTACT_EMAIL = 'hello@example.com';
  var form = document.querySelector('[data-mailto-form]');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var name = form.elements['name'].value.trim();
      var email = form.elements['email'].value.trim();
      var age = form.elements['child-age'].value;
      var message = form.elements['message'].value.trim();
      var subject = encodeURIComponent('Tour request — ' + name);
      var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        "Child's age: " + age + '\n\n' +
        (message ? message + '\n' : '')
      );
      window.location.href =
        'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + body;
    });
  }

  /* --- 4. Footer year --------------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
