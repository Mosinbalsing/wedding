import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

const sagarImageUrl = new URL("./assets/images/sagar.jpeg", import.meta.url)
  .href;
const mitaliImageUrl = new URL("./assets/images/mitali.jpeg", import.meta.url)
  .href;

const renderAudioSection = () => `
  <audio id="weddingMusic" loop>
    <source src="/Mangalashtake.mp3" type="audio/mpeg">
  </audio>
`;

const renderMusicControl = () => `
  <div id="musicControl" class="fixed bottom-6 right-6 z-50 cursor-pointer hidden">
    <div class="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 animate-pulse">
      <i id="musicIcon" class="fas fa-music text-royal-900"></i>
    </div>
  </div>
`;

const renderEntryCurtainSection = () => `
  <div id="curtainLayer" class="fixed inset-0 z-[100] flex curtain-container overflow-hidden pointer-events-auto">
    <div id="centerGlow" class="absolute inset-0 stage-glow z-[90]"></div>

    <div class="curtain-panel curtain-left w-1/2 h-full relative z-[100] flex items-center justify-end">
      <div class="absolute right-0 top-0 bottom-0 w-3 md:w-5 curtain-hem border-l-2 border-r-2 border-yellow-700"></div>
      <div class="text-gold-500 opacity-30 text-9xl absolute -right-32 top-1/4 rotate-45 pointer-events-none">✨</div>
    </div>

    <div class="curtain-panel curtain-right w-1/2 h-full relative z-[100] flex items-center justify-start">
      <div class="absolute left-0 top-0 bottom-0 w-3 md:w-5 curtain-hem border-l-2 border-r-2 border-yellow-700"></div>
      <div class="text-gold-500 opacity-30 text-9xl absolute -left-32 top-1/4 rotate-45 pointer-events-none">✨</div>
    </div>

    <div id="entryContent" class="absolute inset-0 flex flex-col items-center justify-center z-[101] text-center px-4">
      <div class="relative p-10 border-4 border-double border-gold-500/50 bg-black/30 backdrop-blur-sm rounded-lg shadow-2xl transform transition-transform hover:scale-105 duration-700">
        <h2 class="marathi-text text-gold-400 text-4xl md:text-6xl mb-4 entry-text">आमंत्रित</h2>
        <h1 class="font-serif text-white text-5xl md:text-8xl font-bold mb-8 entry-text tracking-wider drop-shadow-lg">
          <span class="marathi-text">saagar</span>
          <span class="marathi-text">imataalia</span>
        </h1>

        <button id="openBtn" class="group relative px-10 py-5 bg-royal-900 border border-gold-500 text-gold-500 font-serif text-xl tracking-widest uppercase overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]">
          <span class="relative z-10 group-hover:text-cream transition-colors duration-300">Open Invitation</span>
          <div class="absolute inset-0 bg-gold-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out -z-0"></div>
        </button>
      </div>

      <p class="mt-6 text-sm text-gold-300 entry-text italic opacity-80 animate-pulse">Tap to begin the celebration</p>
    </div>
  </div>
`;

const renderHeroSection = () => `
    <section class="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" class="w-full h-full object-cover opacity-30 scale-110 parallax-bg" alt="Wedding Background">
        <div class="absolute inset-0 bg-gradient-to-b from-royal-900 via-transparent to-royal-900"></div>
      </div>

      <div class="relative z-10 text-center px-4 mt-20">
        <div class="gsap-hero-reveal transform translate-y-10 opacity-0">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Om_symbol.svg/250px-Om_symbol.svg.png" class="w-16 h-16 mx-auto mb-6 opacity-80 invert filter drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" alt="Om">
        </div>

        <p class="gsap-hero-reveal font-serif text-gold-400 tracking-[0.3em] uppercase mb-4 transform translate-y-10 opacity-0">Together with our families</p>

        <h1 class="gsap-hero-reveal font-script text-7xl md:text-9xl text-cream mb-6 transform translate-y-10 opacity-0 text-shadow-gold">
          <span class="marathi-text">saagar</span>
          <span class="marathi-text">imataalia</span>
        </h1>

        <p class="gsap-hero-reveal font-serif text-xl md:text-2xl text-gold-200 mb-10 transform translate-y-10 opacity-0">
          Invite you to join us in the celebration of our love
        </p>

        <div class="gsap-hero-reveal transform translate-y-10 opacity-0">
          <div class="inline-block border-y border-gold-500 py-3 px-8 backdrop-blur-sm bg-royal-900/30">
            <span class="font-serif text-2xl tracking-widest">APRIL 21, 2026</span>
          </div>
          <div class="mt-4 font-sans text-gold-300 tracking-wide marathi-text">महाबळेश्वर, सातारा</div>
        </div>

        <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <i class="fas fa-chevron-down text-gold-500 text-2xl"></i>
        </div>
      </div>
    </section>
`;

const renderStorySection = ({ sagarUrl, mitaliUrl }) => `
    <section class="py-24 bg-cream text-royal-900 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-64 h-64 opacity-10">
        <img src="https://www.svgrepo.com/show/530219/mandala.svg" class="w-full h-full animate-spin-slow" alt="Mandala">
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl text-royal-900 mb-4 section-title opacity-0">Our Story</h2>
          <div class="w-24 h-1 bg-gold-500 mx-auto rounded-full"></div>
        </div>

        <div class="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
          <div class="text-center couple-card opacity-0 transform -translate-x-20">
            <div class="relative w-64 h-64 mx-auto mb-6">
              <div class="absolute inset-0 border-4 border-gold-500 rounded-full transform rotate-45"></div>
              <div class="absolute inset-0 border-4 border-royal-900 rounded-full transform -rotate-12"></div>
              <img src="${sagarUrl}" class="w-full h-full object-cover rounded-full shadow-xl grayscale hover:grayscale-0 transition-all duration-500" alt="Groom">
            </div>
            <h3 class="font-script text-4xl text-royal-900 mb-2">saagar</h3>
            <p class="font-sans text-gray-600 text-sm italic w-64 mx-auto">"The moment I saw her, I knew my search was over."</p>
          </div>

          <div class="text-gold-500 text-4xl md:text-6xl animate-pulse">
            <i class="fas fa-heart"></i>
          </div>

          <div class="text-center couple-card opacity-0 transform translate-x-20">
            <div class="relative w-64 h-64 mx-auto mb-6">
              <div class="absolute inset-0 border-4 border-gold-500 rounded-full transform -rotate-45"></div>
              <div class="absolute inset-0 border-4 border-royal-900 rounded-full transform rotate-12"></div>
              <img src="${mitaliUrl}" class="w-full h-full object-cover rounded-full shadow-xl grayscale hover:grayscale-0 transition-all duration-500" alt="Bride">
            </div>
            <h3 class="font-script marathi-text text-4xl text-royal-900 mb-2">imataalia</h3>
            <p class="font-sans text-gray-600 text-sm italic w-64 mx-auto">"In him, I found my love, my best friend, and my home."</p>
          </div>
        </div>

        <div class="mt-16 text-center max-w-2xl mx-auto">
          <p id="storyTypewriter" class="font-serif text-xl md:text-2xl text-royal-800 leading-relaxed"></p>
        </div>
      </div>
    </section>
`;

const renderTimelineSection = () => `
    <section class="py-24 bg-royal-900 relative">
      <div class="container mx-auto px-4">
        <div class="text-center mb-20">
          <h2 class="marathi-text  text-[30px] md:text-8xl text-gold-400 mb-2 section-title opacity-0">lagnaacaa saaehLaa</h2>
          <p class="font-sans text-cream opacity-70">A celebration of love and tradition</p>
        </div>

        <div class="relative max-w-4xl mx-auto">
          <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gold-500 to-transparent transform md:-translate-x-1/2 timeline-line origin-top"></div>

          <div class="relative flex flex-col md:flex-row items-center justify-between mb-16 timeline-item">
            <div class="w-full md:w-[45%] mb-8 md:mb-0 text-left md:text-right pr-0 md:pr-12 pl-12 md:pl-0 order-1">
              <h1 class="marathi-text text-6xl text-gold-400 mb-2">saaKarpauDa</h1>
              <p class="font-sans text-gold-200 text-lg mb-1">April 21, 2026 | 10:015 AM</p>
              <p class="text-cream opacity-80 text-sm">कोटेश्वरी मंदिर भोसे, ता. महाबळेश्वर, जि. सातारा</p>
              <p class="text-xs text-gold-500 mt-2 uppercase tracking-widest">Ring Ceremony</p>
            </div>
            <div class="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-royal-900 border-2 border-gold-500 rounded-full z-10 flex items-center justify-center order-2">
              <div class="w-3 h-3 bg-gold-500 rounded-full"></div>
            </div>
            <div class="w-full md:w-[45%] pl-12 md:pl-12 order-3">
              <div class="bg-royal-800 p-6 rounded-lg border border-gold-600/30 hover:border-gold-500 transition-colors duration-300 shadow-lg group">
                <i class="fas fa-ring text-4xl text-gold-500 mb-4 group-hover:scale-110 transition-transform block"></i>
                <p class="text-sm text-cream opacity-80 italic">"The beginning of forever."</p>
              </div>
            </div>
          </div>

          <div class="relative flex flex-col md:flex-row items-center justify-between mb-16 timeline-item">
            <div class="w-full md:w-[45%] order-3 md:order-1 pl-12 md:pl-0 md:pr-12">
              <div class="bg-royal-800 p-6 rounded-lg border border-gold-600/30 hover:border-gold-500 transition-colors duration-300 shadow-lg group text-right md:text-left">
                <i class="fas fa-hand-sparkles text-4xl text-gold-500 mb-4 group-hover:scale-110 transition-transform block"></i>
                <p class="text-sm text-cream opacity-80 italic">"Color of love on hands."</p>
              </div>
            </div>
            <div class="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-royal-900 border-2 border-gold-500 rounded-full z-10 flex items-center justify-center order-2">
              <div class="w-3 h-3 bg-gold-500 rounded-full"></div>
            </div>
            <div class="w-full md:w-[45%] mb-8 md:mb-0 text-left pl-12 order-1 md:order-3">
              <h3 class="font-serif text-6xl text-gold-400 mb-2 marathi-text ">hLdI</h3>
              <p class="font-sans text-gold-200 text-lg mb-1">April 22, 2026 | 11:00 AM</p>
              <p class="text-cream opacity-80 text-sm">कोटेश्वरी मंदिर भोसे, ता. महाबळेश्वर, जि. सातारा</p>
              <p class="text-xs text-gold-500 mt-2 uppercase tracking-widest">Henna & Folk Songs</p>
            </div>
          </div>

          
        <div class="relative flex flex-col md:flex-row items-center justify-between mb-16 timeline-item">
          <div class="w-full md:w-[45%] mb-8 md:mb-0 text-left md:text-right pr-0 md:pr-12 pl-12 md:pl-0 order-1">
            <h3 class="font-serif text-6xl text-white mb-2 marathi-text">avIvaah</h3>
            <p class="font-sans text-gold-300 text-lg mb-1">April 21, 2026 | 6:15 PM</p>
            <p class="text-cream opacity-80 text-sm">कोटेश्वरी मंदिर भोसे, ता. महाबळेश्वर, जि. सातारा</p>
            <p class="text-xs text-gold-500 mt-2 uppercase tracking-widest">The Wedding</p>
          </div>
          <div class="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gold-500 border-4 border-royal-900 rounded-full z-10 flex items-center justify-center order-2 shadow-[0_0_15px_rgba(212,175,55,0.8)]">
            <i class="fas fa-heart text-royal-900 text-sm"></i>
          </div>
          <div class="w-full md:w-[45%] pl-12 md:pl-12 order-3">
            <div class="bg-gradient-to-br from-gold-600 to-gold-400 p-6 rounded-lg shadow-2xl group text-right md:text-left transform scale-105 border-2 border-white/20">
              <i class="fas fa-dove text-4xl text-royal-900 mb-4 group-hover:scale-110 transition-transform block"></i>
              <p class="text-sm text-royal-900 font-bold italic">"The Royal Union."</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  `;

const renderVenueSection = () => `
    <section class="py-24 bg-cream text-royal-900">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div class="venue-card opacity-0 transform translate-y-10">
            <div class="text-center border-4 border-double border-gold-500 p-10 h-full relative">
              <div class="absolute top-0 left-0 text-gold-500 text-4xl -mt-6 -ml-4"><i class="fas fa-crown"></i></div>
              <h2 class="font-serif text-6xl mb-8 marathi-text">AaaSiavaaQd</h2>

              <div class="mb-8">
                <h3 class="font-bold uppercase tracking-widest text-sm mb-2 text-gold-600">नवरदेव चे पालक</h3>
                <p class="font-serif text-4xl marathi-text">sauvaQnaa maaere , SaiSakata maaere</p>
              </div>

              <div class="mb-8">
                <h3 class="font-bold uppercase tracking-widest text-sm mb-2 text-gold-600">वधूचे पालक</h3>
                <p class="font-serif text-4xl marathi-text ">rupaa gaaeLe , rajead^ gaaeLe</p>
              </div>

              <p class="font-script text-2xl text-gold-600 mt-8">आणि आजी आजोबा</p>
            </div>
          </div>

          <div class="venue-card opacity-0 transform translate-y-10 delay-200">
            <div class="h-full bg-white shadow-xl p-4 border border-gold-200 rounded-lg">
              <h2 class="font-serif text-2xl text-center mb-4 text-royal-900">The Royal Venue</h2>
              <div class="w-full h-64 bg-gray-200 mb-4 relative overflow-hidden group rounded">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.6473090407767!2d73.6826693751429!3d24.576599978111953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396cc51e5e050017%3A0xc457335607593d6a!2sThe%20Oberoi%20Udaivilas%2C%20Udaipur!5e0!3m2!1sen!2sin!4v1709400000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                ></iframe>
                <div class="absolute inset-0 bg-gold-500/10 pointer-events-none group-hover:bg-transparent transition-colors"></div>
              </div>

              <div class="text-center">
                <p class="font-serif text-lg mb-4">The Oberoi Udaivilas, Udaipur</p>
                <a href="https://maps.google.com/" target="_blank" class="inline-block bg-royal-900 text-gold-500 px-6 py-2 rounded-full hover:bg-gold-500 hover:text-royal-900 transition-colors uppercase text-sm tracking-wider font-bold">
                  <i class="fas fa-location-arrow mr-2"></i> Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
`;

const renderFooterSection = () => `
    <footer class="bg-black text-center py-10 border-t border-royal-800">
      <h2 class="font-script text-4xl text-gold-500 mb-4">saagar  <span class="marathi-text">imataalia</span></h2>
      <p class="text-gray-500 text-sm uppercase tracking-widest">#saagar<span class="marathi-text">imataalia</span>Wedding</p>
      <p class="text-gray-700 text-xs mt-8">Designed with ❤️ for the special day</p>
    </footer>
`;

const createInvitationMarkup = ({ sagarUrl, mitaliUrl }) => `
  ${renderAudioSection()}
  ${renderMusicControl()}
  ${renderEntryCurtainSection()}

  <main id="mainContent" class="opacity-0 filter blur-xl">
${renderHeroSection()}
${renderStorySection({ sagarUrl, mitaliUrl })}
${renderTimelineSection()}
${renderVenueSection()}
${renderFooterSection()}
  </main>
`;

export default function App() {
  const invitationMarkup = createInvitationMarkup({
    sagarUrl: sagarImageUrl,
    mitaliUrl: mitaliImageUrl,
  });

  // Import the custom font CSS
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/ams-indu-font.css";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    function createParticles() {
      const container = document.body;
      const particleCount = 30;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = "#d4af37";
        particle.style.borderRadius = "50%";
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;

        container.appendChild(particle);

        gsap.to(particle, {
          y: -100 - Math.random() * 200,
          x: Math.random() * 50 - 25,
          opacity: Math.random() * 0.5 + 0.2,
          duration: Math.random() * 5 + 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 5,
        });
      }
    }

    function createPetals() {
      const container = document.body;
      const petalCount = 20;
      const petalSVG =
        "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzAgMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE1LDBDNSwxMCwwLDIwLDE1LDMwQzMwLDIwLDI1LDEwLDE1LDB6IiBmaWxsPSIjZmZjMGNiIiBvcGFjaXR5PSIwLjYiLz48L3N2Zz4=";

      for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement("div");
        petal.classList.add("petal");
        petal.style.backgroundImage = `url("${petalSVG}")`;

        const size = Math.random() * 20 + 10;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.top = "-50px";

        container.appendChild(petal);

        gsap.to(petal, {
          y: "110vh",
          x: `+=${Math.random() * 100 - 50}`,
          rotation: Math.random() * 360 + 360,
          duration: Math.random() * 5 + 8,
          repeat: -1,
          ease: "none",
          delay: Math.random() * 5,
        });
      }
    }

    function runHeroAnimations() {
      gsap.to(".gsap-hero-reveal", {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.5,
      });

      gsap.to(".parallax-bg", {
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 200,
        scale: 1,
      });
    }

    const openBtn = document.getElementById("openBtn");
    const curtainLayer = document.getElementById("curtainLayer");
    const audio = document.getElementById("weddingMusic");
    const musicControl = document.getElementById("musicControl");
    const musicIcon = document.getElementById("musicIcon");
    const form = document.getElementById("rsvpForm");

    let isPlaying = false;

    gsap.to(".entry-text", {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
    });

    const onOpen = () => {
      if (audio) {
        audio.volume = 0.5;
        audio
          .play()
          .then(() => {
            isPlaying = true;
            musicControl?.classList.remove("hidden");
          })
          .catch(() => {});
      }

      const openTl = gsap.timeline({
        onComplete: () => {
          if (curtainLayer) curtainLayer.style.display = "none";
          ScrollTrigger.refresh();
        },
      });

      openTl.to("#entryContent", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
      openTl.to("#centerGlow", { opacity: 0.8, duration: 1, scale: 1.5 }, "<");
      openTl.to(
        ".curtain-left",
        {
          xPercent: -100,
          skewX: 10,
          scaleX: 0.9,
          duration: 2.5,
          ease: "power4.inOut",
        },
        "open",
      );
      openTl.to(
        ".curtain-right",
        {
          xPercent: 100,
          skewX: -10,
          scaleX: 0.9,
          duration: 2.5,
          ease: "power4.inOut",
        },
        "open",
      );
      openTl.to(
        "#mainContent",
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 2.5,
          ease: "power2.out",
        },
        "-=2.0",
      );
      openTl.set(".curtain-panel", { skewX: 0, scaleX: 1 });

      createParticles();
      createPetals();
      runHeroAnimations();
    };

    const onMusicToggle = () => {
      if (!audio) return;

      if (isPlaying) {
        audio.pause();
        musicIcon?.classList.remove("fa-music");
        musicIcon?.classList.add("fa-volume-mute");
        musicControl?.classList.remove("animate-pulse");
      } else {
        audio.play();
        musicIcon?.classList.add("fa-music");
        musicIcon?.classList.remove("fa-volume-mute");
        musicControl?.classList.add("animate-pulse");
      }

      isPlaying = !isPlaying;
    };

    const onRsvp = (e) => {
      e.preventDefault();
      gsap.to(form, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => {
          form.style.display = "none";
          const success = document.getElementById("rsvpSuccess");
          success?.classList.remove("hidden");
          gsap.fromTo(
            ".success-icon",
            { scale: 0, rotation: -180 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.8,
              ease: "elastic.out(1, 0.5)",
            },
          );
        },
      });
    };

    openBtn?.addEventListener("click", onOpen);
    musicControl?.addEventListener("click", onMusicToggle);
    form?.addEventListener("submit", onRsvp);

    gsap.utils.toArray(".section-title").forEach((title) => {
      gsap.to(title, {
        scrollTrigger: { trigger: title, start: "top 80%" },
        opacity: 1,
        y: 0,
        duration: 1,
      });
    });

    gsap.to(".couple-card", {
      scrollTrigger: { trigger: ".couple-card", start: "top 75%" },
      x: 0,
      opacity: 1,
      stagger: 0.3,
      duration: 1,
      ease: "back.out(1.7)",
    });

    ScrollTrigger.create({
      trigger: "#storyTypewriter",
      start: "top 80%",
      onEnter: () => {
        gsap.to("#storyTypewriter", {
          text: {
            value:
              "Love is not just about finding the right person, but creating the right relationship. It's not about how much love you have in the beginning but how much love you build until the end. We are starting our forever, and we want you to be part of it.",
          },
          duration: 6,
          ease: "none",
        });
      },
    });

    gsap.from(".timeline-line", {
      scrollTrigger: {
        trigger: ".timeline-item",
        start: "top 70%",
        end: "bottom 20%",
        scrub: 1,
      },
      scaleY: 0,
      transformOrigin: "top center",
      ease: "none",
      immediateRender: false,
    });

    gsap.utils.toArray(".timeline-item").forEach((item, i) => {
      gsap.fromTo(
        item,
        {
          y: 50,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          delay: i * 0.1,
          immediateRender: false,
        },
      );
    });

    gsap.utils.toArray(".venue-card").forEach((card) => {
      gsap.to(card, {
        scrollTrigger: { trigger: card, start: "top 85%" },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      });
    });

    return () => {
      openBtn?.removeEventListener("click", onOpen);
      musicControl?.removeEventListener("click", onMusicToggle);
      form?.removeEventListener("submit", onRsvp);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: invitationMarkup }} />;
}
