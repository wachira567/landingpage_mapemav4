import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  "Instant cashback on every purchase",
  "Secure payment processing",
  "Easy mobile app access",
  "Multiple ways to redeem rewards",
  "Exclusive member benefits"
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        );
      }

      // Cards stagger
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            delay: 0.15 * i,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="bg-navy py-24 lg:py-[120px]">
      <div className="max-w-[1280px] mx-auto px-6">
        <span className="text-sm font-medium uppercase tracking-[0.08em] text-amber mb-4 block">
          Benefits of joining our rewards platform
        </span>
        <h2
          ref={headingRef}
          className="font-display font-bold text-[#F8FAFC] text-[36px] md:text-[48px] leading-[1.05] tracking-[-0.02em] mb-12 opacity-0"
        >
          Why Earn With Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              ref={(el: HTMLDivElement | null) => { cardsRef.current[i] = el; }}
              className="rounded-2xl p-8 lg:p-10 opacity-0 flex items-center justify-center"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <p className="text-[#F8FAFC] text-lg leading-relaxed text-center font-medium">
                {b}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
