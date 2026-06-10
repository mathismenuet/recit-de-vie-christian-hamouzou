import { useState, useEffect } from 'react';

type Props = {
  onUnlock: () => void;
};

export default function AccessGate({ onUnlock }: Props) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('christian-recipient-access') === 'granted') {
      onUnlock();
    }
  }, [onUnlock]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().toUpperCase() === 'JEANRACONTE') {
      localStorage.setItem('christian-recipient-access', 'granted');
      setUnlocked(true);
      setTimeout(onUnlock, 800);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-dark-green transition-opacity duration-700 ease-in-out ${unlocked ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-heading-accent/10 blur-[100px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-medium-dark-green/30 blur-[120px]" />
      </div>

      <form 
        onSubmit={handleSubmit} 
        className={`relative z-10 w-full max-w-md p-8 sm:p-10 mx-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transition-transform duration-700 ease-out ${unlocked ? 'scale-95 translate-y-8' : 'scale-100 translate-y-0'}`}
      >
        <p className="text-heading-accent text-sm font-semibold tracking-wider uppercase mb-2">Espace familial</p>
        <h1 className="text-3xl sm:text-4xl font-normal text-white mb-4 tracking-tight" style={{ fontFamily: '"Neue Haas Grotesk Display Pro 55 Roman", sans-serif' }}>Papi Jean nous raconte</h1>
        <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8 font-inter">
          (ses souvenirs, ses histoires, sa vie) - Entrez le code pour accéder à la page.
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="access-code" className="sr-only">Code d'accès</label>
            <input
              id="access-code"
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code d'accès"
              className={`w-full bg-white/10 border ${error ? 'border-red-400/50 text-red-200' : 'border-white/20 text-white'} rounded-xl px-4 py-3 sm:py-4 outline-none focus:border-heading-accent focus:bg-white/15 transition-all placeholder:text-white/40 font-inter`}
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-heading-accent hover:bg-white text-dark-green font-semibold rounded-xl px-4 py-3 sm:py-4 transition-colors flex items-center justify-center group font-inter"
          >
            <span>Accéder au récit</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          
          {error && (
            <p className="text-red-400 text-sm text-center animate-pulse font-inter">Code incorrect. Veuillez réessayer.</p>
          )}
        </div>
      </form>
    </div>
  );
}
