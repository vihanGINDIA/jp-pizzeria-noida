import 'lenis/dist/lenis.css';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PHONE_NUMBER = '+919870320025';
const mapListing = 'https://www.google.com/maps/place/JP+PIZZERIA+NOIDA/@28.537116,77.3625991,17z/data=!3m1!4b1!4m6!3m5!1s0x390ce7006fe4f677:0xdab99d6819831b06!8m2!3d28.537116!4d77.365174!16s%2Fg%2F11nr26dvrb';
const menuItems = {
  margherita: {
    title: 'Traditional Neapolitan Margherita Pizza',
    kicker: 'Google Maps menu highlight',
    detail: 'A classic Neapolitan pizza named on JP Pizzeria’s public Google Maps listing. The listing does not show a current price or a full ingredient list, so call the restaurant before ordering.',
    source: mapListing,
    sourceLabel: 'View Google Maps listing',
  },
  burrata: {
    title: 'Burrata Pizza with Pesto Drizzle',
    kicker: 'Google Maps menu highlight',
    detail: 'JP Pizzeria’s public Google Maps listing names this pizza with its burrata and pesto drizzle. The listing does not show a current price or complete ingredient details.',
    source: mapListing,
    sourceLabel: 'View Google Maps listing',
  },
  'pizza-bianca': {
    title: 'Pizza Bianca',
    kicker: 'Official Instagram feature',
    detail: 'Pizza Bianca is named in a post published by JP Pizzeria. The public post does not provide a full ingredient list or price; call the restaurant to confirm current availability.',
    source: 'https://www.instagram.com/jppizzeria/p/DeeU9aHyh__/',
    sourceLabel: 'View official Instagram post',
  },
  mediterranean: {
    title: 'Mediterranean',
    kicker: 'Official Instagram feature',
    detail: 'Mediterranean is named in a post published by JP Pizzeria. The public post does not provide a full ingredient list or price; call the restaurant to confirm current availability.',
    source: 'https://www.instagram.com/jppizzeria/p/DejzcIbSWbM/',
    sourceLabel: 'View official Instagram post',
  },
  'quattro-formaggi': {
    title: 'Quattro Formaggi',
    kicker: 'Official Instagram feature',
    detail: 'Quattro Formaggi is named in a post published by JP Pizzeria. The public post does not provide a full ingredient list or price; call the restaurant to confirm current availability.',
    source: 'https://www.instagram.com/jppizzeria/p/DeeVz2HOlOT/',
    sourceLabel: 'View official Instagram post',
  },
};

function scrollToContact() {
  const target = document.getElementById('phone-number');
  if (!target) return false;
  const lenis = window.__jpLenis;
  if (lenis) {
    lenis.scrollTo(target, { offset: -24, duration: 1.05 });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  target.classList.remove('contact-panel-pulse');
  window.requestAnimationFrame(() => target.classList.add('contact-panel-pulse'));
  return true;
}

function initializeContactLinks() {
  document.querySelectorAll('a[href="/visit/#phone-number"]').forEach(link => {
    link.addEventListener('click', event => {
      if (window.location.pathname !== '/visit/' && window.location.pathname !== '/visit') return;
      event.preventDefault();
      history.replaceState(null, '', '/visit/#phone-number');
      scrollToContact();
    });
  });
  if ((window.location.pathname === '/visit/' || window.location.pathname === '/visit') && window.location.hash === '#phone-number') {
    window.setTimeout(scrollToContact, 80);
  }
}

function initializeMenuDetails() {
  const dialog = document.getElementById('menu-dialog');
  if (!dialog) return;
  const title = document.getElementById('menu-dialog-title');
  const kicker = document.getElementById('menu-dialog-kicker');
  const copy = document.getElementById('menu-dialog-copy');
  const sourceLink = document.getElementById('menu-dialog-source');
  const openCallLink = document.getElementById('menu-dialog-call');
  const openItem = id => {
    const item = menuItems[id];
    if (!item) return;
    title.textContent = item.title;
    kicker.textContent = item.kicker;
    copy.textContent = item.detail;
    sourceLink.href = item.source;
    sourceLink.textContent = `${item.sourceLabel} ↗`;
    openCallLink.href = `tel:${PHONE_NUMBER}`;
    dialog.showModal();
    history.replaceState(null, '', `/menu/#${id}`);
  };
  document.querySelectorAll('[data-menu-id]').forEach(button => {
    button.addEventListener('click', () => openItem(button.dataset.menuId));
  });
  window.__jpOpenMenuItem = openItem;
  const hash = window.location.hash.slice(1);
  if (hash && menuItems[hash]) window.setTimeout(() => openItem(hash), 120);
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
}

function initializeMotion() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;
  const lenis = new Lenis({
    autoRaf: false,
    anchors: true,
    smoothWheel: true,
    lerp: 0.1,
    respectReducedMotion: true,
  });
  window.__jpLenis = lenis;
  const ticker = time => lenis.raf(time * 1000);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);
  const revealContext = gsap.context(() => {
    gsap.utils.toArray('.gsap-reveal').forEach(element => {
      gsap.fromTo(
        element,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 92%', once: true },
        },
      );
    });
  });
  const cleanup = () => {
    revealContext.revert();
    gsap.ticker.remove(ticker);
    lenis.destroy();
    delete window.__jpLenis;
  };
  window.addEventListener('pagehide', cleanup, { once: true });
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}

initializeContactLinks();
initializeMenuDetails();
const carouselHost = document.getElementById('featured-carousel');
if (carouselHost) {
  import('./featured-carousel.jsx').then(({ mountFeaturedCarousel }) => {
    mountFeaturedCarousel(carouselHost);
  }).catch(error => {
    console.error('The featured menu carousel could not be loaded.', error);
  });
}
initializeMotion();
