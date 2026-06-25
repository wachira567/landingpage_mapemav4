import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import StatsStrip from './sections/StatsStrip';
import ServicesGrid from './sections/ServicesGrid';
import NetworkCoverage from './sections/NetworkCoverage';
import ConsumerAwareness from './sections/ConsumerAwareness';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [heroVisible, setHeroVisible] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // IntersectionObserver for hero visibility (pauses WebGL when off-screen)
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(heroEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      <Navigation />

      <div ref={heroRef}>
        <Hero isVisible={heroVisible} />
      </div>

      <main className="relative z-10">
        <StatsStrip />
        <ServicesGrid />
        <NetworkCoverage />
        <ConsumerAwareness />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
