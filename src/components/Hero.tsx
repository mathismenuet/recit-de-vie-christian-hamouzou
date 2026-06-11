import { useState, useEffect } from 'react';
import { Play, Menu, X, ArrowRight } from 'lucide-react';
import BoomerangVideoBg from './BoomerangVideoBg';

const BG_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4';

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { href: '#film', label: 'Le film' },
    { href: '#chapitres', label: 'Chapitres' },
    { href: '#demarche', label: 'Démarche' },
  ];

  return (
    <section className="relative w-full min-h-[100dvh] sm:h-screen overflow-hidden">
      <BoomerangVideoBg src={BG_VIDEO} className="absolute inset-0 w-full h-full" />
      <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 sm:py-6">
        <div className="flex items-center gap-2 text-medium-dark-green">
          <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight" style={{ fontFamily: '"Neue Haas Grotesk Display Pro 55 Roman", sans-serif' }}>
            Papi Jean
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-1 bg-white/80 backdrop-blur-md rounded-full pl-6 pr-1 py-1 shadow-sm border border-white/60">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm px-3 py-2 transition-colors font-inter ${
                i === 0 ? 'font-semibold text-dark-green' : 'font-medium text-body-green hover:text-dark-green'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="ml-2 bg-dark-green hover:bg-button-hover text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors font-inter">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-3 sm:gap-6 text-medium-dark-green">
          <a href="#contact" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity font-inter">
            Me contacter
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-white/60 text-dark-green transition-all duration-300 hover:bg-white/95"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
          >
            <Menu
              className={`w-5 h-5 absolute transition-all duration-300 ${
                menuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
              }`}
            />
            <X
              className={`w-5 h-5 absolute transition-all duration-300 ${
                menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-20 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-dark-green/40 backdrop-blur-sm" />
      </div>

      {/* Mobile menu drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-20 w-[85%] max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-8">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-semibold text-dark-green py-4 border-b border-dark-green/10 transition-all duration-500 font-inter ${
                  menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: menuOpen ? `${150 + i * 70}ms` : '0ms' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div
            className={`mt-8 flex flex-col gap-4 transition-all duration-500 ${
              menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
            style={{ transitionDelay: menuOpen ? '400ms' : '0ms' }}
          >
            <a href="#contact" onClick={() => setMenuOpen(false)} className="flex items-center justify-between mt-2 bg-dark-green hover:bg-button-hover text-white text-sm font-semibold px-5 py-4 rounded-xl transition-colors font-inter">
              <span>Me contacter</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Hero copy */}
      <div className="relative z-10 flex flex-col items-center text-center pt-32 sm:pt-36 md:pt-40 px-4 sm:px-6">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-green/5 border border-dark-green/10 text-sm font-medium text-dark-green">
          <span>Tourné le 12 avril 2026</span>
          <span className="w-1 h-1 rounded-full bg-dark-green/30" />
          <span>Jean avait [XX] ans</span>
        </div>
        
        <h1
          className="font-normal leading-[0.95] text-heading-primary text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] max-w-5xl"
          style={{ fontFamily: '"Neue Haas Grotesk Display Pro 55 Roman", "Helvetica Neue", Helvetica, Arial, sans-serif', letterSpacing: '-0.035em' }}
        >
          Papi Jean <br className="block sm:hidden" />
          <span className="text-heading-accent">
            nous<br className="hidden sm:block" /> raconte
          </span>
        </h1>
        <p className="mt-6 sm:mt-8 text-body-green text-base sm:text-lg md:text-xl leading-relaxed max-w-xl px-2 font-inter font-medium mb-10">
          Eliott, Timothée, Juliette, Camille... Cette page vous est entièrement dédiée. Papy Jean a souhaité vous offrir cette capsule temporelle pour que vous puissiez retrouver ses souvenirs, sa philosophie et sa voix, à n'importe quel âge de vos propres vies.
        </p>

        <a href="#film" className="bg-dark-green hover:bg-heading-accent text-white text-lg sm:text-xl font-medium px-8 sm:px-10 py-4 sm:py-5 rounded-full transition-all duration-300 shadow-xl shadow-dark-green/20 font-inter flex items-center gap-3 hover:scale-105 transform">
          Voir le film
          <Play className="w-5 h-5 fill-current" />
        </a>
      </div>



      {/* Bottom-right video link */}
      <a href="#chapitres" className="hidden sm:flex absolute right-6 md:right-10 bottom-8 md:bottom-10 z-10 items-center gap-2 text-white/90 text-sm hover:opacity-80 transition-opacity font-inter">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm transition-colors border border-white/30">
          <Menu className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="font-medium">Parcourir les chapitres</span>
      </a>
    </section>
  );
}
