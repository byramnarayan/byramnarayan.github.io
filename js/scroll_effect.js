document.addEventListener("DOMContentLoaded", () => {
  // GSAP and Lenis must be loaded
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof Lenis === 'undefined') {
    return;
  }
  
  gsap.registerPlugin(ScrollTrigger);

  // Smooth scrolling with Lenis
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const heroContent = document.querySelector(".hero-content");
  if (!heroContent) return;

  const heroImg = document.querySelector(".hero-img");
  const heroImgElement = document.querySelector(".hero-img img");
  const heroMask = document.querySelector(".hero-mask");
  const heroGridOverlay = document.querySelector(".hero-grid-overlay");
  const marker1 = document.querySelector(".marker-1");
  const marker2 = document.querySelector(".marker-2");
  const progressBar = document.querySelector(".hero-scroll-progress-bar");
  
  // Get total content height for scroll distance
  const getScrollDistance = () => {
    return heroContent ? heroContent.offsetHeight : window.innerHeight * 4;
  };

  const ease = (x) => x * x * (3 - 2 * x);

  ScrollTrigger.create({
    trigger: ".hero-pinned-section",
    start: "top top",
    end: () => `+=${getScrollDistance()}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      const heroContentHeight = heroContent.offsetHeight;
      const viewportHeight = window.innerHeight;
      const heroContentMovedistance = Math.max(heroContentHeight - viewportHeight, 0);

      const heroImgHeight = heroImg ? heroImg.offsetHeight : 0;
      const heroImgMovedistance = heroImgHeight - viewportHeight;

      if (progressBar) {
        gsap.set(progressBar, {
          "--progress": self.progress,
        });
      }

      if (heroContent) {
        gsap.set(heroContent, {
          y: -self.progress * heroContentMovedistance,
        });
      }

      if (heroImg) {
        let heroImgProgress;
        if (self.progress <= 0.45) {
          heroImgProgress = ease(self.progress / 0.45) * 0.65;
        } else if (self.progress <= 0.75) {
          heroImgProgress = 0.65;
        } else {
          heroImgProgress = 0.65 + ease((self.progress - 0.75) / 0.25) * 0.35;
        }

        gsap.set(heroImg, {
          y: heroImgProgress * heroImgMovedistance,
        });
      }

      if (heroMask) {
        let heroMaskScale;
        let heroImgSaturation;
        let heroImgOverlayOpacity;

        if (self.progress <= 0.1) {
          heroMaskScale = 2.5;
          heroImgSaturation = 1;
          heroImgOverlayOpacity = 0.35;
        } else if (self.progress <= 0.2) {
          const phaseProgress = ease((self.progress - 0.1) / 0.1);
          heroMaskScale = 2.5 - phaseProgress * 1.5;
          heroImgSaturation = 1 - phaseProgress;
          heroImgOverlayOpacity = 0.35 + phaseProgress * 0.35;
        } else if (self.progress <= 0.8) {
          heroMaskScale = 1;
          heroImgSaturation = 0;
          heroImgOverlayOpacity = 0.7;
        } else if (self.progress <= 0.9) {
          const phaseProgress = ease((self.progress - 0.8) / 0.1);
          heroMaskScale = 1 + phaseProgress * 1.5;
          heroImgSaturation = phaseProgress;
          heroImgOverlayOpacity = 0.7 - phaseProgress * 0.35;
        } else {
          heroMaskScale = 2.5;
          heroImgSaturation = 1;
          heroImgOverlayOpacity = 0.35;
        }

        gsap.set(heroMask, {
          scale: heroMaskScale,
        });

        if (heroImgElement) {
          gsap.set(heroImgElement, {
            filter: `saturate(${heroImgSaturation})`,
          });
        }

        if (heroImg) {
          gsap.set(heroImg, {
            "--overlay-opacity": heroImgOverlayOpacity,
          });
        }
      }

      if (heroGridOverlay) {
        let heroGridOpacity;
        if (self.progress <= 0.15) {
          heroGridOpacity = 0;
        } else if (self.progress <= 0.2) {
          heroGridOpacity = ease((self.progress - 0.15) / 0.05);
        } else if (self.progress <= 0.8) {
          heroGridOpacity = 1;
        } else if (self.progress <= 0.85) {
          heroGridOpacity = 1 - ease((self.progress - 0.8) / 0.05);
        } else {
          heroGridOpacity = 0;
        }

        gsap.set(heroGridOverlay, {
          opacity: heroGridOpacity,
        });
      }

      if (marker1) {
        let marker1Opacity;
        if (self.progress <= 0.2) {
          marker1Opacity = 0;
        } else if (self.progress <= 0.25) {
          marker1Opacity = ease((self.progress - 0.2) / 0.05);
        } else if (self.progress <= 0.7) {
          marker1Opacity = 1;
        } else if (self.progress <= 0.75) {
          marker1Opacity = 1 - ease((self.progress - 0.7) / 0.05);
        } else {
          marker1Opacity = 0;
        }

        gsap.set(marker1, {
          opacity: marker1Opacity,
        });
      }

      if (marker2) {
        let marker2Opacity;
        if (self.progress <= 0.25) {
          marker2Opacity = 0;
        } else if (self.progress <= 0.3) {
          marker2Opacity = ease((self.progress - 0.25) / 0.05);
        } else if (self.progress <= 0.7) {
          marker2Opacity = 1;
        } else if (self.progress <= 0.75) {
          marker2Opacity = 1 - ease((self.progress - 0.7) / 0.05);
        } else {
          marker2Opacity = 0;
        }

        gsap.set(marker2, {
          opacity: marker2Opacity,
        });
      }
    },
  });
});
