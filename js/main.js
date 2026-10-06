/* Glossy Ponytail — prestations, galerie et module de réservation Acuity.
   Toutes les données viennent de data/prestations.json. */
(function () {
  'use strict';

  var ACUITY_EMBED_SCRIPT = 'https://embed.acuityscheduling.com/js/embed.js';
  var data = null;
  var prestationsById = {};

  /* ---------- Petits utilitaires ---------- */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      if (key === 'text') node.textContent = attrs[key];
      else if (key === 'className') node.className = attrs[key];
      else node.setAttribute(key, attrs[key]);
    });
    (children || []).forEach(function (child) { if (child) node.appendChild(child); });
    return node;
  }

  function hasAcuity() {
    return Boolean(data && data.acuity && data.acuity.scheduleUrl);
  }

  function scrollToBooking() {
    var target = document.getElementById('reserver');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ---------- Menu mobile ---------- */
  function initMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var menu = document.getElementById('menu');
    if (!toggle || !menu) return;

    function setOpen(open) {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    }
    toggle.addEventListener('click', function () {
      setOpen(!menu.classList.contains('is-open'));
    });
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });
  }

  /* ---------- Réservation ---------- */
  function loadAcuityScript() {
    if (document.querySelector('script[src="' + ACUITY_EMBED_SCRIPT + '"]')) return;
    var script = document.createElement('script');
    script.src = ACUITY_EMBED_SCRIPT;
    script.async = true;
    document.body.appendChild(script);
  }

  function acuityUrl(acuityId) {
    var url = new URL(data.acuity.scheduleUrl);
    if (acuityId) url.searchParams.set('appointmentType', acuityId);
    return url.toString();
  }

  function renderAcuity(acuityId) {
    var zone = document.getElementById('booking-zone');
    var iframe = el('iframe', {
      src: acuityUrl(acuityId),
      title: 'Réservation en ligne Glossy Ponytail',
      className: 'booking-iframe',
      loading: 'lazy'
    });
    zone.replaceChildren(iframe);
    document.getElementById('booking-provider').textContent = 'Réservation par Acuity Scheduling';
    loadAcuityScript();
  }

  function bookingLinkFor(prestation) {
    // Sans Acuity configuré : on renvoie vers la page de réservation actuelle.
    return data.acuity.fallbackUrl || '#reserver';
  }

  function renderList() {
    var zone = document.getElementById('booking-zone');
    var list = el('div', { className: 'booking-list' }, [
      el('div', { className: 'booking-list-head' }, [
        el('strong', { text: 'Sélectionner une prestation' }),
        el('span', { text: 'Étape 1 sur 3' })
      ])
    ]);

    data.categories.forEach(function (cat) {
      var block = el('div', { className: 'booking-cat' }, [el('h3', { text: cat.nom })]);
      cat.prestations.forEach(function (p) {
        var link = el('a', {
          className: 'btn btn-outline',
          href: bookingLinkFor(p),
          text: 'Réserver',
          'aria-label': 'Réserver : ' + p.nom
        });
        if (/^https?:/.test(link.getAttribute('href'))) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener');
        }
        block.appendChild(el('div', { className: 'booking-row', id: 'presta-' + p.id }, [
          el('div', { className: 'booking-row-info' }, [
            el('span', { className: 'booking-row-name', text: p.nom }),
            el('span', { className: 'booking-row-meta', text: p.duree + ' · ' + p.prix })
          ]),
          link
        ]));
      });
      list.appendChild(block);
    });

    zone.replaceChildren(list);
  }

  function openBooking(prestationId) {
    var prestation = prestationsById[prestationId];
    if (hasAcuity()) {
      renderAcuity(prestation && prestation.acuityId);
      scrollToBooking();
      return;
    }
    // Pas encore d'Acuity : on fait défiler jusqu'à la ligne de la prestation.
    var row = document.getElementById('presta-' + prestationId);
    if (row) {
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      row.classList.remove('is-highlighted');
      void row.offsetWidth;
      row.classList.add('is-highlighted');
    } else {
      scrollToBooking();
    }
  }

  /* ---------- Galerie ---------- */
  function renderGallery() {
    var track = document.getElementById('gallery-track');
    if (!track) return;

    data.realisations.forEach(function (item) {
      var prestation = prestationsById[item.prestation];
      var name = prestation ? prestation.nom : item.alt;

      var photo;
      if (item.image) {
        photo = el('div', { className: 'gallery-photo' }, [
          el('img', { src: item.image, alt: item.alt, loading: 'lazy', width: '560', height: '747' })
        ]);
      } else {
        photo = el('div', { className: 'gallery-photo placeholder', role: 'img', 'aria-label': 'Photo à venir : ' + item.alt }, [
          el('span', { text: 'Photo à venir : ' + name })
        ]);
      }

      var book = el('a', { className: 'gallery-book', href: '#reserver', text: 'Réserver ce style →', 'aria-label': 'Réserver ce style : ' + name });
      book.addEventListener('click', function (event) {
        event.preventDefault();
        openBooking(item.prestation);
      });

      track.appendChild(el('figure', { className: 'gallery-card' }, [
        photo,
        el('figcaption', {}, [el('span', { className: 'gallery-name', text: name }), book])
      ]));
    });

    document.querySelectorAll('.gallery-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = track.querySelector('.gallery-card');
        var step = card ? card.getBoundingClientRect().width + 24 : 300;
        track.scrollBy({ left: step * Number(btn.dataset.dir), behavior: 'smooth' });
      });
    });
  }

  /* ---------- Démarrage ---------- */
  function start(json) {
    data = json;
    data.categories.forEach(function (cat) {
      cat.prestations.forEach(function (p) { prestationsById[p.id] = p; });
    });

    if (hasAcuity()) renderAcuity(null);
    else renderList();
    renderGallery();
  }

  function showError() {
    var zone = document.getElementById('booking-zone');
    zone.replaceChildren(el('p', { className: 'booking-loading' }, [
      document.createTextNode('Les prestations ne se sont pas chargées. Tu peux réserver sur '),
      el('a', { href: 'https://www.iarabeauty.com/pro/glossypony_', text: 'ma page de réservation', rel: 'noopener' }),
      document.createTextNode('.')
    ]));
  }

  initMenu();
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  fetch('data/prestations.json')
    .then(function (res) { if (!res.ok) throw new Error(res.status); return res.json(); })
    .then(start)
    .catch(showError);
})();
