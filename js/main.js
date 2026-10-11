/* Glossy Ponytail — prestations, galerie et module de réservation Acuity.
   Toutes les données viennent de data/prestations.json. */
(function () {
  'use strict';

  var ACUITY_EMBED_SCRIPT = 'https://embed.acuityscheduling.com/js/embed.js';
  var data = null;
  var prestationsById = {};
  var categoryByPrestation = {};

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

  function pulseBooking() {
    var card = document.querySelector('.booking-card');
    if (!card) return;
    card.classList.remove('is-pulsing');
    void card.offsetWidth;
    card.classList.add('is-pulsing');
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
    // Voile « chargement » tant que la page Acuity n'est pas affichée (retiré au plus tard après 8 s).
    zone.classList.add('is-loading');
    function stopLoading() { zone.classList.remove('is-loading'); }
    iframe.addEventListener('load', stopLoading);
    setTimeout(stopLoading, 8000);
    var children = [iframe];
    if (acuityId) {
      // Un lien direct vers une prestation n'affiche pas de retour dans Acuity : on l'ajoute.
      var back = el('button', { type: 'button', className: 'booking-back', text: '← Voir toutes les prestations' });
      back.addEventListener('click', function () { renderAcuity(null); });
      children.unshift(back);
    }
    zone.replaceChildren.apply(zone, children);
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

  function openBookingById(acuityId) {
    renderAcuity(acuityId);
    scrollToBooking();
    setTimeout(pulseBooking, 450);
  }

  function openBooking(prestationId) {
    var prestation = prestationsById[prestationId];
    if (hasAcuity()) {
      openBookingById(prestation && prestation.acuityId);
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

    var cards = [];
    var prev = document.querySelector('.gallery-btn[data-dir="-1"]');
    var next = document.querySelector('.gallery-btn[data-dir="1"]');

    // Apparition douce des photos quand elles entrent à l'écran.
    var observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 })
      : null;

    data.realisations.forEach(function (item) {
      var prestation = prestationsById[item.prestation];
      var name = prestation ? prestation.nom : item.alt;
      var label = item.variante ? name + ', ' + item.variante : name;

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

      var book;
      if (prestation && prestation.surDemande) {
        // Prestation privée dans Acuity (à domicile) : pas de réservation en ligne, on renvoie vers Instagram.
        book = el('a', { className: 'gallery-book', href: data.instagram || 'https://www.instagram.com/glossypony_/', target: '_blank', rel: 'noopener', text: 'Sur demande · contacte-moi →', 'aria-label': 'Sur demande : contacte-moi sur Instagram pour ' + label + ' (s\'ouvre dans un nouvel onglet)' });
      } else {
        book = el('a', { className: 'gallery-book', href: '#reserver', text: 'Réserver ce style →', 'aria-label': 'Réserver ce style : ' + label });
        book.addEventListener('click', function (event) {
          event.preventDefault();
          openBooking(item.prestation);
        });
      }

      var title = [el('span', { className: 'gallery-name', text: name })];
      if (item.variante) title.push(el('span', { className: 'gallery-variant', text: item.variante }));

      var card = el('figure', { className: 'gallery-card reveal', 'data-category': categoryByPrestation[item.prestation] || '' }, [
        photo,
        el('figcaption', {}, [el('div', { className: 'gallery-title' }, title), book])
      ]);
      track.appendChild(card);
      cards.push(card);
      if (observer) observer.observe(card);
      else card.classList.add('is-visible');
    });

    function updateArrows() {
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    }

    function applyFilter(category) {
      var shown = 0;
      cards.forEach(function (card) {
        var match = !category || card.getAttribute('data-category') === category;
        card.hidden = !match;
        card.classList.remove('is-entering');
        if (match) {
          void card.offsetWidth;
          card.style.setProperty('--enter-delay', Math.min(shown, 8) * 45 + 'ms');
          card.classList.add('is-visible', 'is-entering');
          shown++;
        }
      });
      track.scrollLeft = 0;
      updateArrows();
      var status = document.getElementById('gallery-status');
      if (status) status.textContent = shown + (shown > 1 ? ' réalisations affichées' : ' réalisation affichée');
    }

    var filters = document.getElementById('gallery-filters');
    if (filters) {
      ['Tout'].concat(data.categories.map(function (c) { return c.nom; })).forEach(function (label, index) {
        var btn = el('button', {
          type: 'button',
          className: 'gallery-filter' + (index === 0 ? ' is-active' : ''),
          'aria-pressed': index === 0 ? 'true' : 'false',
          text: label
        });
        btn.addEventListener('click', function () {
          filters.querySelectorAll('.gallery-filter').forEach(function (other) {
            var active = other === btn;
            other.classList.toggle('is-active', active);
            other.setAttribute('aria-pressed', active ? 'true' : 'false');
          });
          applyFilter(index === 0 ? null : label);
        });
        filters.appendChild(btn);
      });
    }

    document.querySelectorAll('.gallery-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = track.querySelector('.gallery-card:not([hidden])');
        var step = card ? card.getBoundingClientRect().width + 24 : 300;
        track.scrollBy({ left: step * Number(btn.dataset.dir), behavior: 'smooth' });
      });
    });
    track.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    updateArrows();
  }

  /* ---------- Acompte par Revolut (lu dans data/prestations.json, bloc « acompte ») ---------- */
  function renderAcompte() {
    var a = data && data.acompte;
    if (!a) return;
    var montant = a.montant + ' €';

    // Mentions courtes (ligne du hero, pied du module)
    document.querySelectorAll('[data-acompte="montant"]').forEach(function (node) { node.textContent = montant; });

    // Encadré juste au-dessus du module de réservation
    var card = document.querySelector('#reserver .booking-card');
    if (!card) return;
    var pay = el('a', { className: 'btn btn-outline btn-small acompte-pay', href: a.lien, target: '_blank', rel: 'noopener', text: 'Payer l\'acompte sur Revolut', 'aria-label': 'Payer l\'acompte de ' + montant + ' sur Revolut (s\'ouvre dans un nouvel onglet)' });
    var box = el('aside', { id: 'acompte', className: 'acompte', 'aria-labelledby': 'acompte-titre' }, [
      el('h3', { id: 'acompte-titre', className: 'acompte-title', text: 'Acompte de ' + montant + ' pour bloquer ton créneau' }),
      el('p', { className: 'acompte-text', text: 'Règle-le par Revolut juste après ta réservation (le lien est aussi dans ton e-mail de confirmation). Il est déduit du prix final.' }),
      el('p', { className: 'acompte-rule', text: 'Sans acompte reçu dans les ' + a.delaiHeures + ' h, ton rendez-vous est annulé.' }),
      pay
    ]);
    card.parentNode.insertBefore(box, card);
  }

  /* ---------- Promotion (affichée seulement pendant sa période) ---------- */
  var PUMPKIN_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 6.5c-5 0-9 2.8-9 6.7S7 20 12 20s9-2.9 9-6.8-4-6.7-9-6.7z"/><path d="M12 6.5c-2.2 1.4-3.3 3.8-3.3 6.7s1.1 5.3 3.3 6.8M12 6.5c2.2 1.4 3.3 3.8 3.3 6.7s-1.1 5.3-3.3 6.8"/><path d="M12 6.5V4.2c0-1 .7-1.7 1.7-1.7"/></svg>';

  function parisToday(zone) {
    return new Intl.DateTimeFormat('en-CA', { timeZone: zone || 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  }

  function frenchDate(iso) {
    var p = iso.split('-').map(Number);
    return new Date(Date.UTC(p[0], p[1] - 1, p[2])).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', timeZone: 'UTC' });
  }

  function promoIsActive() {
    var promo = data && data.promo;
    if (!promo) return false;
    if (new URLSearchParams(window.location.search).get('promo') === 'apercu') return true;
    var today = parisToday(promo.fuseau);
    // La promo s'affiche dès « affichageDebut » (réservations à l'avance), jusqu'à la fin de « fin » incluse.
    return today >= (promo.affichageDebut || promo.debut) && today <= promo.fin;
  }

  function pumpkinIcon(className) {
    var span = el('span', { className: className });
    span.innerHTML = PUMPKIN_SVG; // constante définie ci-dessus, aucune donnée externe
    return span;
  }

  function renderPromo() {
    if (!promoIsActive()) return;
    var promo = data.promo;
    var dates = 'du ' + frenchDate(promo.debut) + ' au ' + frenchDate(promo.fin);

    // Bandeau tout en haut de la page
    var header = document.querySelector('.site-header');
    if (header) {
      var link = el('a', { className: 'promo-bar-link', href: '#promo', text: promo.bandeau.lien + ' →' });
      var bar = el('aside', { className: 'promo-bar', 'aria-label': 'Offre en cours : ' + promo.titre }, [
        el('div', { className: 'container promo-bar-inner' }, [
          el('p', { className: 'promo-bar-main' }, [
            pumpkinIcon('promo-icon'),
            el('strong', { text: promo.titre }),
            document.createTextNode(' · ' + promo.bandeau.texte)
          ]),
          el('p', { className: 'promo-bar-sub', text: dates }),
          link
        ])
      ]);
      header.parentNode.insertBefore(bar, header);
    }

    // Bloc promo, juste avant « Tarifs & réservation »
    var target = document.getElementById('reserver');
    if (!target) return;

    var lines = el('ul', { className: 'promo-lines' });
    promo.lignes.forEach(function (line) {
      var li = el('li');
      var idx = line.accent ? line.texte.indexOf(line.accent) : -1;
      if (idx < 0) {
        li.textContent = line.texte;
      } else {
        li.appendChild(document.createTextNode(line.texte.slice(0, idx)));
        li.appendChild(el('strong', { className: 'promo-accent', text: line.accent }));
        li.appendChild(document.createTextNode(line.texte.slice(idx + line.accent.length)));
      }
      lines.appendChild(li);
    });

    var actions = el('div', { className: 'promo-actions' });
    promo.boutons.forEach(function (b, i) {
      var a = el('a', { className: 'btn ' + (i === 0 ? 'btn-promo' : 'btn-promo-outline'), href: '#reserver', text: b.libelle });
      a.addEventListener('click', function (event) {
        event.preventDefault();
        openBookingById(b.acuityId);
      });
      actions.appendChild(a);
    });

    var text = el('div', { className: 'promo-text' }, [
      el('p', { className: 'promo-eyebrow' }, [pumpkinIcon('promo-icon'), document.createTextNode(promo.titre)]),
      el('h2', { id: 'promo-titre', className: 'section-title' }, [
        document.createTextNode(promo.accroche + ' '),
        el('em', { text: promo.accrocheItalique })
      ]),
      el('p', { className: 'promo-dates', text: dates.charAt(0).toUpperCase() + dates.slice(1) }),
      el('p', { className: 'promo-label', text: promo.etiquette }),
      el('p', { className: 'promo-price', text: promo.prix }),
      lines,
      actions
    ]);

    var children = [text];
    if (promo.image && promo.image.src) {
      children.unshift(el('div', { className: 'promo-visual' }, [
        el('div', { className: 'arch arch-promo' }, [
          el('img', { src: promo.image.src, alt: promo.image.alt, loading: 'lazy', width: String(promo.image.largeur || 880), height: String(promo.image.hauteur || 1160) })
        ])
      ]));
    }

    var section = el('section', { id: 'promo', className: 'promo', 'aria-labelledby': 'promo-titre' }, [
      el('div', { className: 'container promo-inner' }, children)
    ]);
    target.parentNode.insertBefore(section, target);

    // Barre « Réserver » mobile : prix de la promo, bouton vers le bloc promo
    var barPrice = document.querySelector('.mobile-bar-price');
    if (barPrice && promo.barreMobile) {
      var label = barPrice.querySelector('span');
      var price = barPrice.querySelector('strong');
      if (label) label.textContent = promo.barreMobile.libelle;
      if (price) price.textContent = promo.barreMobile.prix;
    }
    var barBtn = document.querySelector('.mobile-bar-btn');
    if (barBtn) barBtn.setAttribute('href', '#promo');

    // Arrivée depuis un lien « …/#promo » : le bloc n'existait pas encore au chargement
    if (window.location.hash === '#promo') section.scrollIntoView();
  }

  /* ---------- Démarrage ---------- */
  function start(json) {
    data = json;
    data.categories.forEach(function (cat) {
      cat.prestations.forEach(function (p) { prestationsById[p.id] = p; categoryByPrestation[p.id] = cat.nom; });
    });

    if (hasAcuity()) renderAcuity(null);
    else renderList();
    renderGallery();
    renderAcompte();
    renderPromo();
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
