const ACCESS_CODE = "AMOUZOU";
const ACCESS_STORAGE_KEY = "christian-recipient-access";

function unlockSite() {
  document.body.classList.remove("auth-pending");
  document.querySelector("[data-access-screen]")?.setAttribute("hidden", "");
  document.querySelector(".site-header")?.removeAttribute("aria-hidden");
  document.querySelector("main")?.removeAttribute("aria-hidden");
  document.querySelector(".site-footer")?.removeAttribute("aria-hidden");
  document.body.style.overflow = "";
  initializeYouTubeEmbeds();
}

function getEmbedOrigin() {
  if (window.location.origin && window.location.origin !== "null") {
    return window.location.origin;
  }

  return "https://recit-de-vie-christian-hamouzou.vercel.app";
}

function initializeYouTubeEmbeds() {
  document.querySelectorAll("[data-youtube-id]").forEach((videoFrame) => {
    if (videoFrame.dataset.loaded === "true") return;

    const params = new URLSearchParams({
      rel: "0",
      modestbranding: "1",
      origin: getEmbedOrigin()
    });

    if (videoFrame.dataset.youtubeJsApi === "true") {
      params.set("enablejsapi", "1");
    }

    videoFrame.src = `https://www.youtube.com/embed/${videoFrame.dataset.youtubeId}?${params.toString()}`;
    videoFrame.dataset.loaded = "true";
  });
}

function setupAccessGate() {
  const form = document.querySelector("[data-access-form]");
  const input = document.querySelector("[data-access-input]");
  const error = document.querySelector("[data-access-error]");

  if (localStorage.getItem(ACCESS_STORAGE_KEY) === "granted") {
    unlockSite();
    return;
  }

  document.querySelector(".site-header")?.setAttribute("aria-hidden", "true");
  document.querySelector("main")?.setAttribute("aria-hidden", "true");
  document.querySelector(".site-footer")?.setAttribute("aria-hidden", "true");
  input?.focus();

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (input.value.trim().toUpperCase() === ACCESS_CODE) {
      localStorage.setItem(ACCESS_STORAGE_KEY, "granted");
      unlockSite();
      return;
    }

    if (error) {
      error.textContent = "Code incorrect";
    }
    input.select();
  });
}

const chapters = [
  {
    time: "00:00",
    seconds: 0,
    title: "Entrer dans le récit",
    text: "Ouverture de l’entretien et premiers repères pour comprendre le parcours de Christian."
  },
  {
    time: "02:10",
    seconds: 130,
    title: "L’enfance au Togo",
    text: "Les souvenirs fondateurs, les lieux de l’enfance et ce qui marque une première vie."
  },
  {
    time: "06:35",
    seconds: 395,
    title: "Études et ambition",
    text: "Les apprentissages, le goût du travail et les décisions qui ouvrent la suite du chemin."
  },
  {
    time: "10:50",
    seconds: 650,
    title: "Arrivée à Paris",
    text: "Un changement de décor, de rythme et de perspectives dans la construction d’une vie adulte."
  },
  {
    time: "15:20",
    seconds: 920,
    title: "Vie d’avocat",
    text: "Le métier, les engagements et la manière de traverser une carrière avec exigence."
  },
  {
    time: "20:05",
    seconds: 1205,
    title: "La famille",
    text: "Les liens, la transmission et les valeurs que Christian souhaite voir circuler."
  },
  {
    time: "24:40",
    seconds: 1480,
    title: "Conseils aux générations",
    text: "Une parole plus intime sur ce qui compte, ce qui reste et ce qui mérite d’être partagé."
  },
  {
    time: "28:10",
    seconds: 1690,
    title: "Conclusion",
    text: "Derniers mots de l’entretien court et ouverture vers la version complète."
  }
];

const track = document.querySelector("[data-chapter-track]");
const timeline = document.querySelector("[data-timeline]");
const chapterStatusIndex = document.querySelector("[data-chapter-status-index]");
const chapterStatusTitle = document.querySelector("[data-chapter-status-title]");
const chapterStatusTime = document.querySelector("[data-chapter-status-time]");
const iframe = document.querySelector("#main-video");
let activeChapterIndex = 0;

function renderChapters() {
  if (!track) return;

  track.innerHTML = chapters
    .map(
      (chapter, index) => `
        <button
          class="chapter-card${index === activeChapterIndex ? " is-active" : ""}"
          type="button"
          data-seek="${chapter.seconds}"
          data-chapter-index="${index}"
          style="--index: ${index}"
          aria-label="Aller au chapitre ${index + 1}, ${chapter.title}, ${chapter.time}"
        >
          <span class="chapter-time">${chapter.time}</span>
          <h3>${chapter.title}</h3>
          <p>${chapter.text}</p>
        </button>
      `
    )
    .join("");
}

function updateActiveChapter(index, shouldScroll = false) {
  activeChapterIndex = Math.min(chapters.length - 1, Math.max(0, index));
  const chapter = chapters[activeChapterIndex];

  track?.querySelectorAll(".chapter-card").forEach((card, cardIndex) => {
    card.classList.toggle("is-active", cardIndex === activeChapterIndex);
  });

  if (chapterStatusIndex) {
    chapterStatusIndex.textContent = String(activeChapterIndex + 1).padStart(2, "0");
  }
  if (chapterStatusTitle) {
    chapterStatusTitle.textContent = chapter.title;
  }
  if (chapterStatusTime) {
    chapterStatusTime.textContent = chapter.time;
  }
  if (timeline) {
    timeline.style.setProperty("--chapter-progress", String(activeChapterIndex / (chapters.length - 1)));
  }

  if (shouldScroll) {
    track
      ?.querySelector(`[data-chapter-index="${activeChapterIndex}"]`)
      ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }
}

function seekVideo(seconds) {
  if (!iframe || !iframe.contentWindow) return;

  iframe.contentWindow.postMessage(
    JSON.stringify({
      event: "command",
      func: "seekTo",
      args: [seconds, true]
    }),
    "*"
  );

  iframe.contentWindow.postMessage(
    JSON.stringify({
      event: "command",
      func: "playVideo",
      args: []
    }),
    "*"
  );
}

function setupChapterClicks() {
  if (!track) return;

  track.addEventListener("click", (event) => {
    const card = event.target.closest("[data-seek]");
    if (!card) return;

    updateActiveChapter(Number(card.dataset.chapterIndex), false);
    seekVideo(Number(card.dataset.seek));
    document.querySelector("#film")?.scrollIntoView({ block: "start", behavior: "smooth" });
  });

  track.addEventListener("focusin", (event) => {
    const card = event.target.closest("[data-chapter-index]");
    if (!card) return;
    updateActiveChapter(Number(card.dataset.chapterIndex), false);
  });
}

function setupTimelineMotion() {
  if (!timeline || !track) return;

  let rafId = 0;
  let scrollRafId = 0;
  const canUseHoverPan = window.matchMedia("(pointer: fine)").matches;

  timeline.addEventListener("pointermove", (event) => {
    if (!canUseHoverPan || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const rect = timeline.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const maxScroll = track.scrollWidth - track.clientWidth;
      track.scrollLeft = maxScroll * ratio;
    });
  });

  track.addEventListener("scroll", () => {
    cancelAnimationFrame(scrollRafId);
    scrollRafId = requestAnimationFrame(() => {
      const cards = [...track.querySelectorAll(".chapter-card")];
      if (!cards.length) return;

      const trackCenter = track.getBoundingClientRect().left + track.clientWidth / 2;
      const closestIndex = cards.reduce(
        (closest, card, index) => {
          const rect = card.getBoundingClientRect();
          const distance = Math.abs(rect.left + rect.width / 2 - trackCenter);
          return distance < closest.distance ? { index, distance } : closest;
        },
        { index: activeChapterIndex, distance: Number.POSITIVE_INFINITY }
      ).index;

      if (closestIndex !== activeChapterIndex) {
        updateActiveChapter(closestIndex, false);
      }
    });
  });
}

function setupScrollButtons() {
  document.querySelectorAll("[data-scroll-chapters]").forEach((button) => {
    button.addEventListener("click", () => {
      const direction = Number(button.dataset.scrollChapters);
      const nextIndex = Math.min(chapters.length - 1, Math.max(0, activeChapterIndex + direction));
      updateActiveChapter(nextIndex, true);
    });
  });
}

setupAccessGate();
renderChapters();
updateActiveChapter(0, false);
setupChapterClicks();
setupTimelineMotion();
setupScrollButtons();
