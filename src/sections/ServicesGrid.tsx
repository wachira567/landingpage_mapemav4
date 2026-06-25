import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Link2, Cloud, Wifi, Server, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Globe,
    title: 'Step 1: Buy Airtime or Data',
    description: 'Use Mpesa to purchase airtime or data using our service.',
  },
  {
    icon: Link2,
    title: 'Step 2: Earn Instantly',
    description: 'Get automatic rewards credited to your account immediately after each transaction.',
  },
  {
    icon: Cloud,
    title: 'Step 3: Redeem & Enjoy',
    description: 'Redeem your rewards immediately for data, airtime, or other services offered by our partners.',
  },
];

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.service-word');
        gsap.fromTo(
          words,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
          }
        );
      }

      // Cards stagger
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: { trigger: card, start: 'top 85%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="bg-cream py-24 lg:py-[120px]">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Label */}
        <span className="text-sm font-medium uppercase tracking-[0.08em] text-amber mb-4 block">
          How It Works
        </span>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-display font-bold text-navy text-[36px] md:text-[48px] leading-[1.05] tracking-[-0.02em] mb-16"
        >
          {'Three simple steps to start earning rewards on every purchase'.split(' ').map((w, i) => (
            <span key={i} className="service-word inline-block mr-[0.25em]">{w}</span>
          ))}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="bg-cream-dark rounded-2xl p-8 lg:p-10 opacity-0 cursor-default group hover:-translate-y-1 hover:shadow-card transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-6">
                  <Icon className="w-10 h-10 text-amber" strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-semibold text-navy text-xl lg:text-2xl tracking-[-0.01em] mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
