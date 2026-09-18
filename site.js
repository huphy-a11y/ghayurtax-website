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
