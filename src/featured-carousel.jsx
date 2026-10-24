import React, { useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Carousel from './components/Carousel.jsx';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const featuredDishes = [
  {
    id: 'margherita',
    title: 'Traditional Neapolitan Margherita Pizza',
    note: 'Listed on Google Maps',
    image: '/manus-storage/async-images/yRkxwejKPO7Op672CAOkFu/image-2.webp',
  },
  {
    id: 'burrata',
    title: 'Burrata Pizza with Pesto Drizzle',
    note: 'Listed on Google Maps',
    image: '/manus-storage/async-images/yRkxwejKPO7Op672CAOkFu/image-3.webp',
  },
  {
    id: 'pizza-bianca',
    title: 'Pizza Bianca',
    note: 'Featured by JP Pizzeria on Instagram',
    image: '/manus-storage/async-images/yRkxwejKPO7Op672CAOkFu/image-1.webp',
  },
  {
    id: 'mediterranean',
    title: 'Mediterranean',
    note: 'Featured by JP Pizzeria on Instagram',
    image: '/manus-storage/async-images/yRkxwejKPO7Op672CAOkFu/image-2.webp',
  },
  {
    id: 'quattro-formaggi',
    title: 'Quattro Formaggi',
    note: 'Featured by JP Pizzeria on Instagram',
    image: '/manus-storage/async-images/yRkxwejKPO7Op672CAOkFu/image-3.webp',
  },
];

function FeaturedCard({ dish }) {
  return (
    <a className="featured-card-link" href={`/menu/#${dish.id}`} aria-label={`View ${dish.title} menu details`}>
      <img className="featured-card-photo" src={dish.image} alt="" loading="lazy" draggable="false" />
      <span className="featured-card-shade" aria-hidden="true" />
      <span className="featured-card-copy">
        <span className="featured-card-kicker">{dish.note}</span>
        <span className="featured-card-title">{dish.title}</span>
        <span className="featured-card-link-label">Open menu details <span aria-hidden="true">↗</span></span>
      </span>
    </a>
  );
}

function FeaturedMenuCarousel() {
  const sectionRef = useRef(null);
  const items = featuredDishes.map(dish => <FeaturedCard key={dish.id} dish={dish} />);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(
      sectionRef.current,
      { autoAlpha: 0, y: 18 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 92%', once: true },
      },
    );
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="featured-carousel-react">
      <Carousel
        items={items}
        ariaLabel="JP Pizzeria menu highlights"
        baseWidth={660}
        aspectRatio={1.45}
        peek={28}
        gap={18}
        radius={4}
        frame={false}
        effect="slide"
        indicator="counter"
        arrows
        autoplay={false}
        loop
        draggable
        theme="light"
        className="pizza-carousel"
      />
    </div>
  );
}

export function mountFeaturedCarousel(container) {
  createRoot(container).render(<FeaturedMenuCarousel />);
}
