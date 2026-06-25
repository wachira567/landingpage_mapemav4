import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import WaveformCanvas from './WaveformCanvas';

interface HeroProps {
  isVisible: boolean;
}

export default function Hero({ isVisible }: HeroProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    if (badgeRef.current) {
      tl.to(badgeRef.current, { opacity: 1, duration: 0.6, ease: 'power3.out' }, 0);
    }

    if (line1Ref.current) {
      const words = line1Ref.current.querySelectorAll('.hero-word');
      tl.fromTo(words, { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'power3.out' }, 0.2);
    }

    if (line2Ref.current) {
      const words = line2Ref.current.querySelectorAll('.hero-word');
      tl.fromTo(words, { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'power3.out' }, 0.4);
    }

    if (subRef.current) {
      tl.to(subRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.7);
    }

    if (ctaRef.current) {
      tl.to(ctaRef.current, { opacity: 1, duration: 0.5 }, 1.0);
    }

    return () => { tl.kill(); };
  }, []);

  const handleExploreClick = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const headline1 = 'Earn Rewards with'.split(' ');
  const headline2 = 'Every Airtime Purchase'.split(' ');

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{ background: '#FDF8F0' }}
    >
      <WaveformCanvas isVisible={isVisible} />

      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ pointerEvents: 'none' }}
      >
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber/15 border border-amber/30 mb-8 opacity-0"
          style={{ pointerEvents: 'auto' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
          <span className="text-sm font-medium text-navy uppercase tracking-[0.08em]">Enterprise Internet Infrastructure</span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-bold text-navy mb-6" style={{ textShadow: '0 0 40px rgba(253, 248, 240, 0.9), 0 0 80px rgba(253, 248, 240, 0.6)' }}>
          <div ref={line1Ref} className="text-[48px] sm:text-[64px] lg:text-[80px] leading-[0.9] tracking-[-0.03em] mb-2">
            {headline1.map((w, i) => (
              <span key={i} className="hero-word inline-block mr-[0.3em]">{w}</span>
            ))}
          </div>
          <div ref={line2Ref} className="text-[48px] sm:text-[64px] lg:text-[80px] leading-[0.9] tracking-[-0.03em]">
            {headline2.map((w, i) => (
              <span key={i} className="hero-word inline-block mr-[0.3em]">{w}</span>
            ))}
          </div>
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 translate-y-[30px]"
          style={{ lineHeight: 1.65 }}
        >
          Join thousands of customers earning cashback and rewards on everyday purchases. Buy airtime/data, and get rewarded instantly with our partner services across Kenya.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0" style={{ pointerEvents: 'auto' }}>
          <button
            onClick={handleExploreClick}
            className="px-8 py-3.5 bg-amber text-navy font-semibold rounded-full hover:bg-amber-light hover:scale-[1.02] transition-all duration-200 text-[15px]"
          >
            Start Earning
          </button>
        </div>
      </div>
    </section>
  );
}
