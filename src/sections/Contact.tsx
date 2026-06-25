import { useEffect, useRef, useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);



export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        );
      }
      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: MapPin, label: 'Address', value: 'Westlands, Nairobi, Kenya' },
    { icon: Phone, label: 'Phone', value: '+254 724 151 515' },
    { icon: Mail, label: 'Email', value: 'help@mapema.co.ke' },
    { icon: Clock, label: 'Hours', value: '24/7 Customer Support' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="bg-cream py-24 lg:py-[120px]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left — Form */}
          <div ref={formRef} className="lg:w-[55%] opacity-0">
            <h2 className="font-display font-bold text-navy text-[36px] md:text-[48px] leading-[1.05] tracking-[-0.02em] mb-8">
              Send us a message
            </h2>

            {submitted ? (
              <div className="bg-cream-dark rounded-2xl p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-amber/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-navy text-xl mb-2">Request Received</h3>
                <p className="text-muted-foreground">Our team will reach out within 24 hours to discuss your requirements.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    name="name"
                    placeholder="👤 John Doe"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-cream-dark border border-border text-navy placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-all"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="✉️ john@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-cream-dark border border-border text-navy placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-all"
                  />
                </div>
                <input
                  type="text"
                  name="service"
                  placeholder="Account Support"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-cream-dark border border-border text-navy placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-all"
                />
                <textarea
                  name="message"
                  placeholder="Tell us how we can help you..."
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-cream-dark border border-border text-navy placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-all resize-none"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-amber text-navy font-semibold rounded-full hover:bg-amber-light hover:scale-[1.02] transition-all duration-200 text-[15px]"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Right — Info */}
          <div ref={infoRef} className="lg:w-[45%] opacity-0">
            <span className="text-sm font-medium uppercase tracking-[0.08em] text-amber mb-4 block">
              Need Help? We're Here!
            </span>
            <h3 className="font-display font-bold text-navy text-[36px] leading-[1.05] tracking-[-0.02em] mb-4">
              Contact Information
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Get support with your rewards account or have questions about earning. Reach out anytime, we're always here.
            </p>
            <div className="space-y-6">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-amber" strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block">{item.label}</span>
                      <span className="text-navy font-medium">{item.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
