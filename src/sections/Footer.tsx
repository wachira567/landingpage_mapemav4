export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy">
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left — Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display text-2xl font-bold text-[#F8FAFC]">Mapema</span>
              <span className="w-2 h-2 rounded-full bg-amber inline-block" />
            </div>
            <span className="text-sm text-[#F8FAFC]/50 block mb-4">151515 Ltd</span>
            <p className="text-sm text-[#F8FAFC]/50 leading-relaxed max-w-xs">
              Enterprise connectivity infrastructure for Kenya's growing businesses.
            </p>
          </div>

          {/* Center — Links */}
          <div>
            <span className="text-sm font-semibold text-[#F8FAFC]/80 uppercase tracking-[0.05em] mb-4 block">Links</span>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Solutions', id: 'services' },
                { label: 'Network', id: 'network' },
                { label: 'Coverage', id: 'consumer' },
                { label: 'About', id: 'testimonials' },
                { label: 'Contact', id: 'contact' },
              ].map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="text-sm text-[#F8FAFC]/50 hover:text-amber transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Connect */}
          <div>
            <span className="text-sm font-semibold text-[#F8FAFC]/80 uppercase tracking-[0.05em] mb-4 block">Connect</span>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#F8FAFC]/5 flex items-center justify-center hover:bg-amber/20 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 text-[#F8FAFC]/70" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#F8FAFC]/5 flex items-center justify-center hover:bg-amber/20 transition-colors duration-200"
                aria-label="Twitter / X"
              >
                <svg className="w-5 h-5 text-[#F8FAFC]/70" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#F8FAFC]/[0.06]">
        <div className="max-w-[1280px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-sm text-[#F8FAFC]/40">
            © 2025 Mapema 151515 Ltd. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-[#F8FAFC]/40 hover:text-[#F8FAFC]/70 transition-colors">Terms</a>
            <a href="#" className="text-sm text-[#F8FAFC]/40 hover:text-[#F8FAFC]/70 transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
