import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ConsumerAwareness() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCheckAvailability = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="consumer" ref={sectionRef} className="bg-cream-dark py-24 lg:py-[100px]">
      <div
        ref={contentRef}
        className="max-w-[700px] mx-auto px-6 text-center opacity-0"
      >
        <span className="text-sm font-medium uppercase tracking-[0.08em] text-amber mb-4 block">
          For Homes
        </span>
        <h2 className="font-display font-bold text-navy text-[36px] md:text-[48px] leading-[1.05] tracking-[-0.02em] mb-6">
          Reliable Internet for Your Household
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
          While our focus is enterprise, we also serve select residential areas along our fiber routes. Check if your home is within our coverage area.
        </p>
        <button
          onClick={handleCheckAvailability}
          className="px-8 py-3.5 border-2 border-navy text-navy font-semibold rounded-full hover:bg-navy hover:text-cream transition-all duration-200 text-[15px]"
        >
          Check Residential Availability
        </button>
      </div>
    </section>
  );
}
