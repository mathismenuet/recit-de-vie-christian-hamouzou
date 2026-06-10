import { useCallback } from 'react';
import { Cloud, Play } from 'lucide-react';

const CHAPTER_GROUPS = [
  {
    title: "L'école de Papi",
    chapters: [
      { time: "00:00", seconds: 0, title: "Début", text: "Pourquoi garder une trace pour vous." },
      { time: "02:11", seconds: 131, title: "L'école d'autrefois", text: "Les maîtresses, les bons points et les punitions." },
      { time: "04:08", seconds: 248, title: "Les copains", text: "La séparation garçons/filles et la cour de récréation." },
      { time: "07:20", seconds: 440, title: "Les bonbons", text: "Carambars, Roudoudous et Malabars." },
    ]
  },
  {
    title: "L'enfance de Jean",
    chapters: [
      { time: "10:03", seconds: 603, title: "À la maison", text: "Les devoirs, la petite sœur, et vivre chez grand-mère." },
      { time: "15:34", seconds: 934, title: "La maison d'autrefois", text: "Pas de chambre, et toilettes au fond du jardin." },
      { time: "17:28", seconds: 1048, title: "Les vacances", text: "Le camping et l'absence de frigo." },
      { time: "21:38", seconds: 1298, title: "La vie sans téléphone", text: "Le cinéma inexistant et la collection de timbres." },
    ]
  },
  {
    title: "Les voyages",
    chapters: [
      { time: "23:31", seconds: 1411, title: "Le goût de l'aventure", text: "Des rêves d'igloo à l'Antarctique et les nourritures bizarres." },
      { time: "26:39", seconds: 1599, title: "Le premier vol", text: "L'avion pris pour soigner la coqueluche." },
      { time: "29:52", seconds: 1792, title: "Une attaque inattendue", text: "L'attaque du taureau sur la plage." },
    ]
  },
  {
    title: "Les devinettes de Papi Jean VRAI ou FAUX",
    chapters: [
      { time: "31:36", seconds: 1896, title: "Vrai ou Faux ?", text: "Cervelle d'agneau, premier ordinateur et bras cassé." },
    ]
  },
  {
    title: "Mes conseils pour mes petits enfants",
    chapters: [
      { time: "36:49", seconds: 2209, title: "Transmission & Vœux", text: "Se donner les moyens de ses rêves." }
    ]
  }
];

export default function ChaptersTimeline() {
  const seekVideo = useCallback((seconds: number) => {
    const iframe = document.getElementById('main-video') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'seekTo', args: [seconds, true] }),
        '*'
      );
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
        '*'
      );
    }
  }, []);

  return (
    <div id="chapitres" className="w-full py-16 px-6 sm:px-10 lg:px-12 bg-[#fdfbf7] relative overflow-hidden h-full">
      
      {/* Decorative Clouds */}
      <div className="absolute top-20 right-[-5%] opacity-20 animate-float pointer-events-none">
        <Cloud size={140} className="text-medium-dark-green fill-medium-dark-green" strokeWidth={1} />
      </div>
      <div className="absolute top-[30%] left-[-5%] opacity-10 animate-float-delayed pointer-events-none">
        <Cloud size={180} className="text-dark-green fill-dark-green" strokeWidth={1} />
      </div>
      <div className="absolute bottom-[20%] right-[5%] opacity-15 animate-float pointer-events-none">
        <Cloud size={110} className="text-accent-yellow fill-accent-yellow" strokeWidth={1} />
      </div>
      <div className="absolute bottom-[5%] left-[2%] opacity-20 animate-float-delayed pointer-events-none">
        <Cloud size={130} className="text-medium-dark-green fill-medium-dark-green" strokeWidth={1} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-normal text-heading-primary mb-4" style={{ fontFamily: '"Neue Haas Grotesk Display Pro 55 Roman", sans-serif', letterSpacing: '-0.02em' }}>
            Papi Jean nous raconte
          </h2>
          <p className="text-body-green text-base font-inter leading-relaxed">
            Parcourez les anecdotes racontées aux enfants. Cliquez sur un souvenir pour lancer la vidéo au bon moment.
          </p>
        </div>

        <div className="relative border-l-2 border-medium-dark-green/20 ml-4 sm:ml-6 pb-12">
          {CHAPTER_GROUPS.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-10">
              
              {/* Group Header (Grand Chapitre) */}
              <div className="relative pl-8 sm:pl-12 pt-6 pb-6">
                {/* Large Timeline dot for group */}
                <div className="absolute -left-[14px] top-[30px] w-7 h-7 rounded-full bg-heading-primary border-4 border-[#fdfbf7] flex items-center justify-center z-10 shadow-sm">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal text-heading-primary" style={{ fontFamily: '"Neue Haas Grotesk Display Pro 55 Roman", sans-serif' }}>
                  {group.title}
                </h3>
              </div>

              {/* Chapters list */}
              <div className="space-y-6">
                {group.chapters.map((chapter, index) => (
                  <div key={index} className="relative pl-8 sm:pl-12 group">
                    {/* Small Timeline dot */}
                    <div className="absolute -left-[7px] top-6 w-3 h-3 rounded-full border-2 border-white bg-medium-dark-green/40 group-hover:bg-heading-accent group-hover:scale-125 transition-all duration-300 z-10" />
                    
                    {/* Chapter Card */}
                    <button 
                      onClick={() => seekVideo(chapter.seconds)}
                      className="block w-full text-left bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-black/5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group-hover:border-heading-accent/20"
                    >
                      {/* Play icon overlay on hover */}
                      <div className="absolute top-1/2 right-6 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-500 text-heading-accent pointer-events-none">
                        <Play className="w-8 h-8 fill-current opacity-15" />
                      </div>

                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-heading-accent/10 text-heading-primary mb-3 font-inter transition-colors duration-300 group-hover:bg-heading-accent group-hover:text-white">
                        {chapter.time}
                      </span>
                      
                      <h4 className="text-lg sm:text-xl font-normal mb-2 text-dark-green group-hover:text-heading-accent transition-colors duration-300 pr-8" style={{ fontFamily: '"Neue Haas Grotesk Display Pro 55 Roman", sans-serif' }}>
                        {chapter.title}
                      </h4>
                      
                      <p className="text-sm text-body-green/80 font-inter leading-relaxed max-w-[90%]">
                        {chapter.text}
                      </p>
                    </button>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
