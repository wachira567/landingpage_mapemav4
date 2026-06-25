import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 50, suffix: 'K+', label: 'Active Members' },
  { value: 2, suffix: 'M+', prefix: 'KES ', label: 'Rewards Paid' },
  { value: 4, suffix: '%', label: 'Max Cashback' },
  { value: 100, suffix: '+', label: 'Partner Services' },
];

export default function StatsStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      );

      // Counter animations
      stats.forEach((stat, i) => {
        const el = numberRefs.current[i];
        if (!el) return;

        // no special check needed

        const proxy = { value: 0 };
        gsap.to(proxy, {
          value: stat.value,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          onUpdate: () => {
            const prefix = (stat as any).prefix || '';
            if (stat.value < 100 && stat.value % 1 !== 0) {
              el.textContent = prefix + proxy.value.toFixed(1) + stat.suffix;
            } else {
              el.textContent = prefix + Math.round(proxy.value) + stat.suffix;
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="w-full bg-navy py-14 md:py-16 opacity-0">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <span
                ref={(el) => { numberRefs.current[i] = el; }}
                className="block text-[40px] md:text-[56px] font-display font-bold text-amber leading-tight"
              >
                0
              </span>
              <span className="text-sm md:text-base text-[#F8FAFC]/70 font-body mt-1 block">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
