import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function NetworkCoverage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left slide in
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          }
        );
      }

      // Right slide in
      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          }
        );
      }

      // Counter animation
      if (counterRef.current) {
        const proxy = { value: 0 };
        gsap.to(proxy, {
          value: 2400,
          duration: 2.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 75%' },
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = Math.round(proxy.value).toLocaleString() + '+';
            }
          },
        });
      }

      // SVG stroke animation
      if (svgRef.current) {
        const paths = svgRef.current.querySelectorAll('path, line, polyline');
        paths.forEach((path) => {
          const el = path as SVGGeometryElement;
          const length = el.getTotalLength?.() || 200;
          gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(el, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: rightRef.current, start: 'top 70%' },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="network" ref={sectionRef} className="bg-cream">
      <div className="flex flex-col lg:flex-row">
        {/* Left — Text */}
        <div ref={leftRef} className="lg:w-1/2 py-24 lg:py-[120px] px-6 lg:px-16 opacity-0">
          <span className="text-sm font-medium uppercase tracking-[0.08em] text-amber mb-4 block">
            Why Choose Mapema 151515 Ltd? - The smartest way to earn while you spend
          </span>
          <h2 className="font-display font-bold text-navy text-[36px] md:text-[48px] leading-[1.05] tracking-[-0.02em] mb-6">
            Rewarding Every Airtime Purchase You Make
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4 max-w-xl">
            Mapema 151515 Ltd transforms your everyday airtime and data purchases into rewarding experiences. Every transaction you make earns you instant cashback that you can use immediately or for future purchases.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4 max-w-xl">
            Our platform partners with leading merchants and service providers across Kenya to ensure you get the best rewards - from mobile top-ups to insurance payments.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
            Join thousands of smart customers who are already earning while they spend. It's not just about staying connected - it's about getting rewarded for it.
          </p>
        </div>

        {/* Right — Interactive */}
        <div
          ref={rightRef}
          className="lg:w-1/2 bg-navy py-24 lg:py-[120px] px-6 lg:px-16 flex flex-col items-center justify-center opacity-0"
        >
          {/* Counter */}
          <div className="text-center mb-10">
            <span
              ref={counterRef}
              className="block text-[64px] lg:text-[80px] font-display font-bold text-amber leading-none"
            >
              0+
            </span>
            <span className="text-[#F8FAFC]/60 text-lg mt-2 block">Kilometers of Fiber Laid</span>
          </div>

          {/* Abstract Map SVG */}
          <svg
            ref={svgRef}
            viewBox="0 0 400 300"
            className="w-full max-w-md opacity-60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Central hub */}
            <circle cx="200" cy="150" r="6" stroke="#F59E0B" strokeWidth="1.5" />
            {/* Outer ring */}
            <circle cx="200" cy="150" r="80" stroke="#F59E0B" strokeWidth="1" opacity="0.4" />
            <circle cx="200" cy="150" r="120" stroke="#F59E0B" strokeWidth="0.8" opacity="0.25" />

            {/* Connection lines to nodes */}
            <line x1="200" y1="150" x2="120" y2="90" stroke="#F59E0B" strokeWidth="1.2" />
            <line x1="200" y1="150" x2="280" y2="90" stroke="#F59E0B" strokeWidth="1.2" />
            <line x1="200" y1="150" x2="120" y2="210" stroke="#F59E0B" strokeWidth="1.2" />
            <line x1="200" y1="150" x2="280" y2="210" stroke="#F59E0B" strokeWidth="1.2" />
            <line x1="200" y1="150" x2="200" y2="40" stroke="#F59E0B" strokeWidth="1.2" />
            <line x1="200" y1="150" x2="200" y2="260" stroke="#F59E0B" strokeWidth="1.2" />

            {/* Cross connections */}
            <line x1="120" y1="90" x2="280" y2="90" stroke="#F59E0B" strokeWidth="0.8" opacity="0.5" />
            <line x1="120" y1="210" x2="280" y2="210" stroke="#F59E0B" strokeWidth="0.8" opacity="0.5" />

            {/* Nodes */}
            <circle cx="120" cy="90" r="4" stroke="#F59E0B" strokeWidth="1.5" fill="#0F172A" />
            <circle cx="280" cy="90" r="4" stroke="#F59E0B" strokeWidth="1.5" fill="#0F172A" />
            <circle cx="120" cy="210" r="4" stroke="#F59E0B" strokeWidth="1.5" fill="#0F172A" />
            <circle cx="280" cy="210" r="4" stroke="#F59E0B" strokeWidth="1.5" fill="#0F172A" />
            <circle cx="200" cy="40" r="4" stroke="#F59E0B" strokeWidth="1.5" fill="#0F172A" />
            <circle cx="200" cy="260" r="4" stroke="#F59E0B" strokeWidth="1.5" fill="#0F172A" />

            {/* Small labels */}
            <text x="100" y="82" fill="#F59E0B" fontSize="8" opacity="0.5">Westlands</text>
            <text x="290" y="82" fill="#F59E0B" fontSize="8" opacity="0.5">Upper Hill</text>
            <text x="100" y="230" fill="#F59E0B" fontSize="8" opacity="0.5">Kilimani</text>
            <text x="285" y="230" fill="#F59E0B" fontSize="8" opacity="0.5">Ind. Area</text>
            <text x="210" y="35" fill="#F59E0B" fontSize="8" opacity="0.5">Thika Rd</text>
            <text x="210" y="278" fill="#F59E0B" fontSize="8" opacity="0.5">Mombasa Rd</text>
          </svg>
        </div>
      </div>
    </section>
  );
}
