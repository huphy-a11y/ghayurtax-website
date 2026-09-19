/* ============================================================
   GATS website settings — the only file you need to edit.
   ============================================================ */
window.GATS = {
  // Secure document upload links. Paste the links from your portal
  // (Intuit Link, TaxFolder, a Dropbox file request, etc.) between the
  // quotes. While blank, the buttons open a pre-written email instead.
  uploadLinks: {
    personal: "https://link.intuit.com/",
    corporate: "https://link.intuit.com/"
  },
  // Google review link (from Google Business Profile > "Ask for reviews").
  // While blank, the "Leave a Google review" links stay hidden.
  reviewLink: "https://search.google.com/local/writereview?placeid=ChIJEWnG3jBHK4gRhJqZscz1SMQ",
  // Mailing-list signup link (e.g. a Mailchimp form). While blank, the
  // "Get reminders by email" button opens a pre-written email instead.
  newsletterLink: ""
};

(function () {
  var header = document.querySelector('.site-header');
  var btn = document.getElementById('menu-btn');
  if (btn && header) {
    btn.addEventListener('click', function () {
      var open = header.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Close' : 'Menu';
    });
    header.querySelectorAll('.site-nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        header.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = 'Menu';
      });
    });
  }

  var cfg = window.GATS || {};
  var links = cfg.uploadLinks || {};
  [['personal', 'upload-personal'], ['corporate', 'upload-corporate'], ['corporate', 'upload-childcare']].forEach(function (pair) {
    var url = links[pair[0]], el = document.getElementById(pair[1]);
    if (url && el) {
      el.href = url;
      el.target = '_blank';
      el.rel = 'noopener';
      el.textContent = 'Upload securely via Intuit Link';
    }
  });

  if (cfg.reviewLink) {
    document.querySelectorAll('[data-review-link]').forEach(function (a) { a.href = cfg.reviewLink; });
    document.querySelectorAll('[data-review-item]').forEach(function (li) { li.hidden = false; });
  }

  if (cfg.newsletterLink) {
    document.querySelectorAll('[data-newsletter-link]').forEach(function (a) {
      a.href = cfg.newsletterLink;
      a.target = '_blank';
      a.rel = 'noopener';
    });
  }
})();

/* Fee estimator (home page) and next-deadline bar (all pages) */
(function () {
  var est = document.getElementById('estimator');
  if (est) {
    var t = est.querySelector('[name=type]'), r = est.querySelector('[name=rentals]'),
        c = est.querySelector('[name=complex]'), o = est.querySelector('[data-est-out]');
    var upd = function () {
      var n = Math.max(0, Math.min(20, parseInt(r.value, 10) || 0));
      var fee = parseInt(t.value, 10) + 40 * n;
      o.textContent = (c.checked ? 'From CA$' : 'CA$') + fee + (c.checked ? ' \u2014 we\u2019ll confirm a quote first' : '');
    };
    [t, r, c].forEach(function (e) { e.addEventListener('input', upd); e.addEventListener('change', upd); });
    upd();
  }

  var header = document.querySelector('.site-header');
  if (!header) return;
  var now = new Date(), today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var defs = [
    [2, 1, 'RRSP contribution deadline'],
    [2, 15, 'Personal tax instalment due'],
    [3, 30, 'Personal tax (T1) filing and payment deadline'],
    [5, 15, 'Self-employed T1 filing deadline and instalment due'],
    [8, 15, 'Personal tax instalment due'],
    [11, 15, 'Personal tax instalment due']
  ];
  var best = null;
  [today.getFullYear(), today.getFullYear() + 1].forEach(function (y) {
    defs.forEach(function (d) {
      var dt = new Date(y, d[0], d[1]);
      if (dt.getDay() === 6) dt.setDate(dt.getDate() + 2);
      if (dt.getDay() === 0) dt.setDate(dt.getDate() + 1);
      if (dt >= today && (!best || dt < best.dt)) best = { dt: dt, label: d[2] };
    });
  });
  if (!best) return;
  var days = Math.round((best.dt - today) / 86400000);
  var when = best.dt.toLocaleDateString('en-CA', { month: 'long', day: 'numeric' });
  var left = days === 0 ? 'today' : days === 1 ? 'tomorrow' : 'in ' + days + ' days';
  var bar = document.createElement('div');
  bar.className = 'season-bar';
  bar.innerHTML = '<span class="season-dot" aria-hidden="true"></span>Next deadline: <strong>' + best.label + '</strong> \u2014 ' + when + ', ' + left + '. <a href="key-dates.html">All key dates</a>';
  header.insertAdjacentElement('afterend', bar);
})();
