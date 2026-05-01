// Optiiimum — shared chrome (nav, footer, floating actions)
// No framework — vanilla JS, runs on every page.

(function(){
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const isHome = path === '' || path === 'index.html';

  // ─── Logo (real wordmark, gradient-tinted via CSS mask) ────────────────
  const logoHTML = `
    <a href="index.html" class="logo" aria-label="Optiiimum home">
      <span class="logo-wordmark" role="img" aria-label="optiiimum"></span>
    </a>`;

  // ─── Nav ────────────────────────────────────────────────────────────────
  const links = [
    { href: 'index.html',          label: 'Home' },
    { href: 'services.html',       label: 'Services' },
    { href: 'index.html#work',     label: 'Case Studies' },
    { href: 'about.html',          label: 'About' },
    { href: 'index.html#pricing',  label: 'Pricing' },
    { href: 'contact.html',        label: 'Contact' },
  ];
  const isActive = (href) => {
    const [base, hash] = href.split('#');
    const baseLc = base.toLowerCase();
    if (hash) {
      // Hash-anchored links: only active if we're on that page AND the hash matches.
      return baseLc === path && location.hash === '#' + hash;
    }
    // Plain page links: active when path matches, or treat root as index.html.
    if (baseLc === path) return !location.hash;
    return isHome && baseLc === 'index.html' && !location.hash;
  };
  const navHTML = `
    <nav class="nav container" aria-label="Primary">
      <div class="nav-inner">
        ${logoHTML}
        <div class="nav-links">
          ${links.map(l => `<a href="${l.href}" class="${isActive(l.href) ? 'active' : ''}">${l.label}</a>`).join('')}
        </div>
        <a class="btn btn-primary btn-sm" href="contact.html">
          Book free consult
          <span class="arr" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6h7M6 3l3 3-3 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </a>
      </div>
    </nav>`;

  // ─── Footer ─────────────────────────────────────────────────────────────
  const footerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-wordmark-img" aria-hidden="true"></div>
        <div class="footer-grid">
          <div>
            <h5>Optiiimum</h5>
            <p style="font-size:14px;line-height:1.6;max-width:34ch;color:var(--muted)">
              We turn personal brands into powerful digital identities — through strategy, content, paid ads, and AI production.
            </p>
            <p style="font-size:12px;color:var(--muted-2);margin-top:18px;letter-spacing:.04em">
              Dubai · Alexandria · Cairo
            </p>
            <div style="display:flex;gap:10px;margin-top:18px;flex-wrap:wrap">
              <a href="tel:+201097961682" class="footer-pill">+20 109 796 1682</a>
              <a href="tel:+971523949481" class="footer-pill">+971 52 394 9481</a>
            </div>
          </div>
          <div>
            <h5>Site</h5>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="services.html">Services</a></li>
              <li><a href="index.html#work">Case Studies</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="index.html#pricing">Pricing</a></li>
              <li><a href="index.html#faq">FAQ</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5>Services</h5>
            <ul>
              <li><a href="services.html#branding">Personal branding</a></li>
              <li><a href="services.html#content">Strategic content</a></li>
              <li><a href="services.html#social">Social media</a></li>
              <li><a href="services.html#ads">Paid &amp; media buying</a></li>
              <li><a href="services.html#ai">AI &amp; event production</a></li>
            </ul>
          </div>
          <div>
            <h5>Elsewhere</h5>
            <ul>
              <li><a href="https://instagram.com/optiiimum" target="_blank" rel="noopener">Instagram &nearr;</a></li>
              <li><a href="https://facebook.com/optiiimum" target="_blank" rel="noopener">Facebook &nearr;</a></li>
              <li><a href="https://tiktok.com/@optiiimum" target="_blank" rel="noopener">TikTok &nearr;</a></li>
              <li><a href="https://behance.net/optiiimum" target="_blank" rel="noopener">Behance &nearr;</a></li>
              <li><a href="https://wa.me/971523949481" target="_blank" rel="noopener">WhatsApp &nearr;</a></li>
              <li><a href="mailto:hello@optiiimum.com">hello@optiiimum.com</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>©  2026 Optiiimum. All Rights Reserved.</span>
          <span>
            <a href="#">Privacy</a> · <a href="#">Terms</a>
          </span>
        </div>
      </div>
    </footer>`;

  // ─── Floating actions: WhatsApp + Call ─────────────────────────────────
  const floatHTML = `
    <div class="float-actions" aria-label="Quick contact">
      <a class="float-pill float-status" aria-hidden="true">
        <span class="dot"></span> Available now
      </a>
      <a class="float-btn float-wa" href="https://wa.me/971523949481" target="_blank" rel="noopener" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M19.05 4.91A10 10 0 0 0 4.07 18.13L2 22l3.97-2.04a10 10 0 0 0 13.08-15.05ZM12 20.27a8.27 8.27 0 0 1-4.21-1.15l-.3-.18-2.36 1.21.63-2.3-.2-.32A8.27 8.27 0 1 1 12 20.27Zm4.55-6.18c-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.13-.56.13-.16.25-.64.81-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23a7.53 7.53 0 0 1-1.39-1.73c-.14-.25 0-.39.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.36-.77-1.86-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2 0 1.18.86 2.32.98 2.48.13.16 1.7 2.59 4.12 3.63.58.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.18-.48-.31Z"/></svg>
      </a>
      <a class="float-btn float-call" href="tel:+201097961682" aria-label="Call">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24c1.16.39 2.4.6 3.67.6a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.27.21 2.51.6 3.67a1 1 0 0 1-.24 1.05l-2.24 2.07Z"/></svg>
      </a>
    </div>`;

  // ─── Inject ─────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    const navSlot = document.querySelector('[data-slot="nav"]');
    if (navSlot) navSlot.outerHTML = navHTML;
    const footSlot = document.querySelector('[data-slot="footer"]');
    if (footSlot) footSlot.outerHTML = footerHTML;
    if (!document.querySelector('.float-actions')){
      document.body.insertAdjacentHTML('beforeend', floatHTML);
    }
  });
})();
