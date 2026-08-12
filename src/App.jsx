import { useState, useEffect, useRef } from "react";

function useReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px", ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, direction = "up", style: extraStyle = {}, className }) {
  const [ref, visible] = useReveal();
  const dirMap = {
    up: "translateY(36px)", down: "translateY(-36px)",
    left: "translateX(36px)", right: "translateX(-36px)", none: "none",
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translate(0,0)" : dirMap[direction] || dirMap.up,
      transition: `opacity 0.7s cubic-bezier(.22,.68,0,1.1) ${delay}ms, transform 0.7s cubic-bezier(.22,.68,0,1.1) ${delay}ms`,
      willChange: "opacity, transform", ...extraStyle,
    }}>
      {children}
    </div>
  );
}

const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Shippori+Mincho:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --blue: #3aacff; --blue-dark: #1a8fd4; --blue-pale: #e8f6ff; --blue-pale2: #c2e7ff;
    --warm: #faf5eb; --accent: #ffda2a; --accent-dark: #e6c400; --red: #d63031;
    --text: #1f1f1f; --text-light: #4a4a4a; --text-muted: #888888; --white: #fff; --border: #d8d8d8;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'Noto Sans JP', sans-serif; color: var(--text); background: var(--white); line-height: 1.8; font-size: 15px; }
  @keyframes bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(7px); } }
  section, footer, .cta-block { width: 100%; box-sizing: border-box; }
  .inner { max-width: 1120px; margin: 0 auto; padding: 0 48px; }

  @media (max-width: 768px) {
    .inner { padding: 0 20px; }
    .hero-img { object-fit: cover !important; }
    .hero-section { height: 100vh !important; min-height: 500px !important; }
    .hero-caption { left: 20px !important; bottom: 160px !important; right: 20px !important; text-align: left !important; }
.hero-catch { font-size: 41px !important; line-height: 1.35 !important; }
    .hero-en { font-size: 14px !important; }
    .slide-dots { left: 20px !important; bottom: 24px !important; }
    .hero-scroll { display: none !important; }
    .concept-grid { grid-template-columns: 1fr !important; }
    .concept-text { padding: 40px 20px 28px !important; order: 1 !important; align-items: flex-start !important; }
    .concept-text span, .concept-text h2, .concept-text p { text-align: left !important; }
    .concept-text h2 { font-size: 26px !important; line-height: 1.5 !important; }
    .concept-text p { font-size: 13px !important; line-height: 1.9 !important; }
    .concept-img { min-height: 260px !important; order: 2 !important; padding: 0 20px 36px !important; }
    .concept-img > div { width: 90% !important; aspect-ratio: 4/3 !important; }
    .campaign-box { overflow: hidden !important; }
    .campaign-amount { font-size: 32px !important; }
    .campaign-body { font-size: 11px !important; }
    .campaign-note { font-size: 9px !important; }
    .campaign-btn { padding: 12px 32px !important; font-size: 13px !important; width: auto !important; }
    .services-title, .docs-title, .why-title, .day-title, .voices-title, .welfare-title, .message-title, .jobs-title, .contact-title, .apply-title { font-size: 22px !important; white-space: nowrap !important; }
    .cta-title { font-size: 22px !important; }
    .cta-inner { padding-left: 20px !important; padding-right: 20px !important; }
    .svc-grid1 { grid-template-columns: repeat(2,1fr) !important; gap: 12px !important; }
    .svc-overlay { height: 34% !important; display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important; padding: 0 14px !important; background: rgba(255,255,255,0.85) !important; }
    .svc-name { font-size: 14px !important; }
    .svc-en { font-size: 11px !important; }
    .docs-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
    .feat-item { grid-template-columns: 1fr !important; }
    .feat-item .feat-img { min-height: 200px !important; order: 0 !important; }
    .feat-item .feat-body { order: 1 !important; padding: 24px 20px !important; }
    .feat-body span, .feat-body h3, .feat-body p { text-align: left !important; }
    .feat-body h3 { font-size: 17px !important; }
    .feat-title { white-space: pre-line !important; }
    section { padding: 64px 0 !important; }
    .voices-grid { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
    .welfare-grid { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
    .numbers-title { font-size: 22px !important; white-space: nowrap !important; }
    .num-grid { grid-template-columns: repeat(2,1fr) !important; gap: 12px !important; }
    .num-icon { width: 44px !important; height: 44px !important; margin-bottom: 10px !important; }
    .num-val { font-size: 28px !important; }
    .num-val span { font-size: 13px !important; }
    .num-label { font-size: 11px !important; }
    .message-heading { text-align: left !important; }
    .message-body { font-size: 13px !important; text-align: left !important; }
    .requirements-title { font-size: 22px !important; white-space: nowrap !important; }
    .req-row { padding: 14px 16px !important; }
    .req-text { text-align: left !important; }
    .flow-title { font-size: 22px !important; white-space: nowrap !important; }
    .flow-steps { grid-template-columns: repeat(2,1fr) !important; gap: 12px !important; }
    .flow-body { text-align: left !important; }
    .contact-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
    .form-inner { padding: 28px 18px !important; }
    .form-name-row { grid-template-columns: 1fr 1fr !important; }
    .cta-btns { flex-direction: column !important; align-items: center !important; gap: 12px !important; }
    .cta-btn { width: 100% !important; max-width: 320px !important; text-align: center !important; }
    footer { padding: 40px 20px !important; }
    .footer-links { flex-wrap: wrap !important; gap: 16px !important; }
  }

  @media (max-width: 480px) {
    .hero-catch { font-size: 41px !important; }
    .hero-caption { left: 16px !important; bottom: 160px !important; }
    .concept-text h2 { font-size: 22px !important; }
    .docs-grid { grid-template-columns: 1fr !important; }
    .voices-grid { grid-template-columns: 1fr !important; }
    .num-val { font-size: 24px !important; }
  }
`;

function SectionHeader({ en, title, desc, titleClass }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 80 }}>
      <Reveal direction="up">
        <span style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--blue)", fontWeight: 500, textTransform: "uppercase", marginBottom: 10, display: "block" }}>{en}</span>
        <h2 className={titleClass || ""} style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 34, fontWeight: 600, lineHeight: 1.4, color: "var(--text)", marginBottom: 14 }}>{title}</h2>
        <div style={{ width: 32, height: 2, background: "var(--accent)", margin: "0 auto" }} />
        {desc && <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 2, marginTop: 14 }}>{desc}</p>}
      </Reveal>
    </div>
  );
}

// ============================================================
// Header — PC: 白背景80px / SP: 透明64px + ドロワー
// ============================================================
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setIsTop(window.scrollY < window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "コンセプト", en: "CONCEPT", href: "#concept" },
    { label: "事業内容",   en: "SERVICES", href: "#services" },
    { label: "社員の声",   en: "VOICES",   href: "#voices" },
    { label: "募集職種",   en: "JOBS",     href: "#jobs" },
    { label: "会社情報",   en: "ABOUT",    href: "#numbers" },
  ];

  const closeMenu = () => setMenuOpen(false);

  const headerStyle = isMobile ? {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 160,
    background: isTop ? "transparent" : "rgba(255,255,255,1)",
    borderBottom: isTop ? "none" : "1px solid rgba(224,216,228,0.5)",
    padding: "0 20px", height: 64,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    transition: "background 0.4s ease, border-color 0.4s ease",
  } : {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 160,
    background: "rgba(255,255,255,1)",
    borderBottom: "1px solid rgba(224,216,228,0.5)",
    padding: "0 48px", height: 80,
    display: "flex", alignItems: "center", justifyContent: "space-between",
  };

  return (
    <>
      <style>{`
        /* ── ハンバーガー ── */
        .hamburger-btn {
          display: none; flex-direction: column; justify-content: center;
          align-items: flex-end; width: 44px; height: 44px;
          background: none; border: none; cursor: pointer; padding: 10px;
          position: relative; z-index: 200;
        }
        .hamburger-btn .line {
          display: block; height: 1.5px; border-radius: 1px;
          transition: all 0.38s cubic-bezier(.77,0,.18,1); transform-origin: center;
        }
        .hamburger-btn .line1 { width: 22px; margin-bottom: 6px; }
        .hamburger-btn .line2 { width: 16px; }
        .hamburger-btn.open .line1 { width: 20px; transform: translateY(4px) rotate(45deg); margin-bottom: 0; }
        .hamburger-btn.open .line2 { width: 20px; transform: translateY(-4.5px) rotate(-45deg); }
        @media (max-width: 768px) {
          .hamburger-btn { display: flex; }
          .pc-nav { display: none !important; }
        }

        /* ── オーバーレイ ── */
        .sp-drawer-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.18);
          z-index: 149; opacity: 0; pointer-events: none;
          transition: opacity 0.35s ease;
        }
        .sp-drawer-overlay.open { opacity: 1; pointer-events: auto; }

        /* ── ドロワー本体 ── */
        .sp-drawer {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: min(320px, 85vw);
          z-index: 150;
          background: #fff;
          display: flex; flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.42s cubic-bezier(.77,0,.18,1);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .sp-drawer.open { transform: translateX(0); }

        /* ── ドロワーヘッダー ── */
        .sp-drawer-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 24px;
          height: 64px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          flex-shrink: 0;
        }
        .sp-drawer-close {
          width: 36px; height: 36px; border-radius: 50%;
          background: none; border: 1px solid rgba(0,0,0,0.12);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          color: #888; font-size: 15px; line-height: 1;
          transition: background 0.2s;
        }
        .sp-drawer-close:hover { background: #f5f5f5; }

        /* ── ナビリンク ── */
        .sp-drawer-nav { flex: 1; padding: 8px 0; }
        .sp-drawer-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 28px;
          height: 64px;
          border-bottom: 1px solid rgba(0,0,0,0.055);
          text-decoration: none;
          transition: background 0.18s;
        }
        .sp-drawer-link:last-of-type { border-bottom: none; }
        .sp-drawer-link:active { background: #f9f9f9; }

        .sp-drawer-link-texts { display: flex; flex-direction: column; gap: 2px; }
        .sp-drawer-link-ja {
          font-size: 15px; font-weight: 500;
          color: #1f1f1f; letter-spacing: 0.04em;
        }
        .sp-drawer-link-en {
          font-size: 10px; font-weight: 400;
          color: #3aacff; letter-spacing: 0.14em;
        }
        .sp-drawer-link-arrow {
          font-size: 13px; color: #cccccc;
          transition: transform 0.2s;
        }
        .sp-drawer-link:active .sp-drawer-link-arrow { transform: translateX(4px); }

        /* ── フッターエリア ── */
        .sp-drawer-footer {
          padding: 20px 24px 40px;
          border-top: 1px solid rgba(0,0,0,0.06);
          flex-shrink: 0;
          display: flex; flex-direction: column; gap: 10px;
        }

        /* ENTRYボタン（LINE） */
        .sp-drawer-line-btn {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 14px 0;
          background: #06c755; color: #fff;
          border-radius: 6px;
          text-decoration: none;
          font-size: 13px; font-weight: 700; letter-spacing: 0.1em;
          transition: background 0.2s, transform 0.15s;
        }
        .sp-drawer-line-btn:active { background: #05b34c; transform: scale(0.98); }
        .sp-drawer-line-icon {
          width: 20px; height: 20px; flex-shrink: 0;
        }

        /* TELリンク */
        .sp-drawer-tel {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 12px 0;
          background: #f5f5f5;
          border-radius: 6px;
          text-decoration: none;
          font-size: 13px; font-weight: 600; color: #444;
          letter-spacing: 0.04em;
        }
      `}</style>

      {/* ── ヘッダーバー ── */}
      <header style={headerStyle}>
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <img
            src="/images/recreate.logo.png"
            alt="株式会社リクリエイト"
            style={{ height: isMobile ? 37 : 44, width: "auto", objectFit: "contain" }}
          />
        </a>

        {/* PC ナビ */}
        <nav className="pc-nav" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} style={{
              fontSize: 13, color: "var(--text-light)", textDecoration: "none",
              letterSpacing: "0.06em", fontWeight: 500,
            }}>{l.label}</a>
          ))}
          <a href="https://lin.ee/zOsdkEG" target="_blank" rel="noopener noreferrer" style={{
            background: "#06c755", color: "#fff",
            padding: "10px 28px", borderRadius: 4,
            fontSize: 12, fontWeight: 700, letterSpacing: "0.18em",
            textDecoration: "none",
          }}>ENTRY</a>
        </nav>

        {/* SP ハンバーガー */}
        <button
          className={`hamburger-btn${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="メニュー"
        >
          <span className="line line1" style={{ background: (isMobile && isTop) ? "#cccccc" : "var(--text)" }} />
          <span className="line line2" style={{ background: (isMobile && isTop) ? "#cccccc" : "var(--text)" }} />
        </button>
      </header>

      {/* ── SP ドロワー ── */}
      <div className={`sp-drawer-overlay${menuOpen ? " open" : ""}`} onClick={closeMenu} />
      <div className={`sp-drawer${menuOpen ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="メニュー">

        {/* ドロワーヘッダー */}
        <div className="sp-drawer-head">
          <img
            src="/images/recreate.logo.png"
            alt="株式会社リクリエイト"
            style={{ height: 32, width: "auto", objectFit: "contain" }}
          />
          <button className="sp-drawer-close" onClick={closeMenu} aria-label="閉じる">✕</button>
        </div>

        {/* ナビリンク */}
        <nav className="sp-drawer-nav">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="sp-drawer-link" onClick={closeMenu}>
              <div className="sp-drawer-link-texts">
                <span className="sp-drawer-link-ja">{l.label}</span>
                <span className="sp-drawer-link-en">{l.en}</span>
              </div>
              <span className="sp-drawer-link-arrow">›</span>
            </a>
          ))}
        </nav>

        {/* フッター */}
        <div className="sp-drawer-footer">
          {/* LINE ENTRY ボタン */}
          <a
            href="https://lin.ee/zOsdkEG"
            className="sp-drawer-line-btn"
            onClick={closeMenu}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="sp-drawer-line-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.045 2 11.077c0 4.536 3.583 8.315 8.435 9.025.328.07.774.217.887.498.102.254.067.652.033.909l-.143.862c-.044.254-.202.993.869.541 1.071-.451 5.783-3.407 7.889-5.831C21.367 15.386 22 13.307 22 11.077 22 6.045 17.523 2 12 2z"/>
            </svg>
            ENTRY／LINEで問い合わせる
          </a>

          <a href="tel:0648625438" className="sp-drawer-tel" onClick={closeMenu}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            06-4862-5438
          </a>
        </div>
      </div>
    </>
  );
}

const heroSlides = [
  { img: "/images/heroslide1.jpg", imgSp: "/images/heroslide1_sp.jpg", en: "Safety makes people stronger" },
  { img: "/images/heroslide2.jpg", imgSp: "/images/heroslide2_sp.jpg", en: "Caring for those who care" },
  { img: "/images/heroslide3.jpg", imgSp: "/images/heroslide3_sp.jpg", en: "A place where trust is built" },
];

function Hero() {
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [heroIn, setHeroIn] = useState(false);

  useEffect(() => { const t = setTimeout(() => setHeroIn(true), 300); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const t = setInterval(() => triggerNext((cur + 1) % heroSlides.length), 5500);
    return () => clearInterval(t);
  }, [cur, animating]);

  const triggerNext = (idx) => {
    if (animating || idx === cur) return;
    setPrev(cur); setAnimating(true); setCur(idx);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 1000);
  };

  const HeroImage = ({ slide, style, className }) => (
    <picture style={{ width: "100%", height: "100%", display: "block" }}>
      <source media="(max-width: 768px)" srcSet={slide.imgSp} />
      <img src={slide.img} className={className} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...style }} alt="" />
    </picture>
  );

  return (
    <section className="hero-section" style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      <style>{`
        @keyframes kenburns { from { transform: scale(1.08); } to { transform: scale(1.0); } }
        @keyframes slideInFromRight { from { transform: translateX(100%); } to { transform: translateX(0%); } }
      `}</style>
      {prev !== null && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <HeroImage slide={heroSlides[prev]} className="hero-img" />
        </div>
      )}
      <div key={cur} style={{ position: "absolute", inset: 0, zIndex: 2, animation: animating ? "slideInFromRight 1s cubic-bezier(0.77,0,0.18,1) forwards" : "none" }}>
        <HeroImage slide={heroSlides[cur]} className="hero-img" style={{ animation: "kenburns 6s ease-out forwards" }} />
      </div>
      <div className="hero-caption" style={{ position: "absolute", bottom: 80, left: 80, zIndex: 10, opacity: heroIn ? 1 : 0, transform: heroIn ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s", textAlign: "left" }}>
        <p className="hero-en" style={{ fontSize: 15, fontWeight: 300, letterSpacing: "0.18em", color: "#fff", marginBottom: 12, fontStyle: "italic", fontFamily: "'Noto Sans JP', sans-serif", textShadow: "0 1px 8px rgba(0,0,0,0.5)", textAlign: "left" }}>{heroSlides[cur].en}</p>
        <h1 className="hero-catch" style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "clamp(62px, 7vw, 96px)", fontWeight: 700, lineHeight: 1.35, color: "var(--text)", letterSpacing: "0.04em", textShadow: "0 2px 24px rgba(255,255,255,0.95)", textAlign: "left" }}>
          <em style={{ fontStyle: "normal", color: "#e6c400" }}>安心</em>が<br />人を強くする
        </h1>
      </div>
      <div className="slide-dots" style={{ position: "absolute", bottom: 36, left: 80, zIndex: 10, display: "flex", gap: 10, opacity: heroIn ? 1 : 0, transition: "opacity 0.9s ease 0.8s" }}>
        {heroSlides.map((_, i) => (
          <div key={i} onClick={() => triggerNext(i)} style={{ width: i === cur ? 52 : 28, height: 2, background: i === cur ? "var(--accent)" : "rgba(83,70,89,0.18)", cursor: "pointer", transition: "all 0.3s" }} />
        ))}
      </div>
      <div className="hero-scroll" style={{ position: "absolute", bottom: 32, right: 48, zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 5, color: "rgba(83,70,89,0.45)", fontSize: 9, letterSpacing: "0.18em", animation: "bob 2s infinite" }}>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none"><rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" /><circle cx="8" cy="8" r="2" fill="currentColor" /></svg>
        SCROLL
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "30%", background: "linear-gradient(to top, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 100%)", zIndex: 5, pointerEvents: "none" }} />
    </section>
  );
}

function Concept() {
  return (
    <section id="concept" style={{ background: "var(--white)", padding: "160px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 640 }} className="concept-grid">
        <div style={{ padding: "0 80px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} className="concept-text">
          <Reveal direction="right" style={{ maxWidth: 420 }}>
            <span style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--blue)", fontWeight: 500, textTransform: "uppercase", marginBottom: 18, display: "block" }}>CONCEPT</span>
            <h2 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 34, fontWeight: 700, lineHeight: 1.55, color: "var(--text)", marginBottom: 32, textAlign: "left" }}>
              <em style={{ fontStyle: "normal", color: "#e6c400" }}>想い</em><span style={{ color: "#6b7280" }}>を</span><br />
              <span style={{ color: "#6b7280" }}>誰かを支える力に</span>
            </h2>
            <p style={{ fontSize: 18, color: "var(--text-light)", lineHeight: 2.3, textAlign: "left" }}>
              働く人が安心していられること。それが利用者さんやご家族の安心につながり、地域全体の暮らしを支える力になる。私たちはそう信じています。「誰かの力になりたい」。その想いを、ずっと持ち続けられる環境を。あなたの力が、だれかの人生に灯りをともす。そんな仕事がここにあります。
            </p>
          </Reveal>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "var(--white)", padding: "40px" }} className="concept-img">
          <Reveal direction="left" style={{ position: "relative", width: "55%", aspectRatio: "3/4", overflow: "hidden", borderRadius: 8 }}>
            <img src="/images/concept.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Campaign() {
  return (
    <section style={{ background: "var(--warm)", paddingTop: 240, paddingBottom: 200 }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 48px" }}>
        <Reveal direction="up">
          <div style={{ border: "2px solid var(--red)", borderRadius: 8, overflow: "hidden" }} className="campaign-box">
            <div style={{ background: "var(--red)", padding: "14px 20px", textAlign: "center" }}>
              <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--white)", margin: 0, letterSpacing: "0.08em" }}>入職お祝い金プレゼント</p>
            </div>
            <div style={{ borderTop: "2px dashed var(--red)", background: "var(--white)", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p className="campaign-body" style={{ fontSize: 13, color: "var(--text-light)", lineHeight: 1.6, marginBottom: 4 }}>当サイト経由の<br />入職者へ全員支給</p>
                <p className="campaign-note" style={{ fontSize: 9, color: "var(--text-muted)", margin: 0 }}>※入職後6ヶ月経過時点で支給</p>
              </div>
              <div style={{ flexShrink: 0, marginLeft: 16, textAlign: "right" }}>
                <p className="campaign-amount" style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 44, fontWeight: 700, color: "var(--red)", lineHeight: 1, margin: 0 }}>10万円</p>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
            <a href="#jobs" className="campaign-btn" style={{ display: "inline-block", padding: "18px 72px", background: "var(--white)", color: "var(--red)", fontSize: 15, fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none", borderRadius: 6, border: "2px solid var(--red)" }}>募集要項はコチラ</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const services = [
  { name: "豊中事業所", en: "訪問介護", img: "/images/homecare1.jpg" },
  { name: "十三事業所", en: "訪問介護", img: "/images/homecare2.jpg" },
  { name: "庄内事業所", en: "訪問看護", img: "/images/homenursingcare.jpg" },
  { name: "絲 夕日丘", en: "シェアハウス", img: "/images/sharehouse1.jpg" },
  { name: "絲 熊野町", en: "シェアハウス", img: "/images/sharehouse2.jpg" },
  { name: "絲 長興寺", en: "シェアハウス", img: "/images/sharehouse3.jpg" },
];

function Services() {
  return (
    <section id="services" style={{ background: "var(--white)", padding: "144px 0" }}>
      <div className="inner">
        <SectionHeader en="SERVICES" title="事業内容" titleClass="services-title" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="svc-grid1">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={i * 80}><ServiceCard {...s} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ name, en, img }) {
  return (
    <div className="svc-card" style={{ borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)", position: "relative", aspectRatio: "1/1" }}>
      <img src={img} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} alt={name} />
      <div className="svc-overlay" style={{ position: "absolute", bottom: 0, left: 0, width: "100%", padding: "18px 20px", background: "rgba(255,255,255,0.8)", textAlign: "center", boxSizing: "border-box" }}>
        <div className="svc-name" style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>{name}</div>
        <span className="svc-en" style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 400, letterSpacing: "0.1em", display: "block", marginTop: 3 }}>{en}</span>
      </div>
    </div>
  );
}

const docs = ["説明資料", "人事評価資料", "給与表", "定性評価シート", "定量評価シート", "キャリア制度"];

function Docs() {
  return (
    <section style={{ background: "var(--warm)", padding: "120px 0" }}>
      <div className="inner">
        <SectionHeader en="DOCUMENTS" title="会社資料" titleClass="docs-title" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }} className="docs-grid">
          {docs.map((d, i) => (
            <Reveal key={d} delay={i * 60}>
              <a href="#" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--white)", border: "1px solid var(--border)", borderRadius: 6, padding: "18px 24px", textDecoration: "none", color: "var(--text)", fontSize: 14, fontWeight: 700, letterSpacing: "0.04em" }}>
                {d}<span style={{ fontSize: 13, color: "var(--text-muted)" }}>→</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  { en: "WORK STYLE", title: "ライフスタイルが変化しても\n働き続けられる", img: "/images/lifestyle.jpg", imgSp: "/images/lifestyle_sp.jpg", body: "家族との時間や自分らしく過ごす時間。人生の節目や暮らしの変化も大切にしながら働き続けられるよう、仕事と暮らしの両方を大切にできる環境づくりに取り組んでいます。有給取得率は80％以上。人生の大切な節目にも無理なく向き合えるよう、希望休にも柔軟に対応しています。働く人が安心して毎日を過ごせること。それが、より良い介護につながると私たちは考えています。" },
  { en: "SUPPORT", title: "ひとりで抱え込まないサポート体制", img: "/images/support.jpg", imgSp: "/images/support_sp.jpg", body: "入職後の最初の訪問や、利用者さまの引き継ぎが必要な場面では同行訪問を行い、現場の流れや利用者さまの状況、サービス内容を先輩スタッフと一緒に確認できます。また、訪問先でアクシデントやイレギュラーな出来事が起きたときには、LINEでその場からすぐに状況を共有。事務所にいる所長やサービス提供責任者と連携しながら、チームとして対応を考えられる仕組みを整えています。" },
  { en: "CAREER", title: "未来が見えるキャリアデザイン", img: "/images/career.jpg", imgSp: "/images/career_sp.jpg", body: "5年後、自分はどこを目指すのか。理想像を漠然と思い描くだけでなく、現実に近づけていけるように。リクリエイトでは、納得感を持って働き続けられる評価とキャリアの仕組みを大切にしています。感覚で評価するのではなく、日々の行動を具体的に落とし込んだ評価シートを整備。さらに、社内での役割やキャリアのフェーズを給与に反映した給与テーブルによって、自分の現在地と目指す先が見えるようにしています。" },
];

function Features() {
  return (
    <section style={{ background: "var(--white)", padding: "144px 0" }}>
      <style>{`
        @media (max-width: 768px) {
          .feat-item {
            display: flex !important;
            flex-direction: column !important;
            grid-template-columns: none !important;
          }
          .feat-img {
            width: 100% !important;
            aspect-ratio: 16/9 !important;
            min-height: unset !important;
            order: 0 !important;
          }
          .feat-img img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
          }
          .feat-body {
            order: 1 !important;
            padding: 24px 20px !important;
          }
        }
      `}</style>
      <div className="inner">
        <SectionHeader en="WHY RECREATE" title="リクリエイトで働く理由" titleClass="why-title" />
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
           {features.map((f, i) => (
            <Reveal key={f.en} direction={i % 2 === 0 ? "right" : "left"}>
              <div style={{ display: "grid", gridTemplateColumns: i % 2 === 0 ? "3fr 7fr" : "7fr 3fr", borderRadius: 14, overflow: "hidden", border: "1px solid var(--border)" }} className="feat-item">
                {i % 2 === 0 ? (
                  <><div style={{ overflow: "hidden", minHeight: 280 }} className="feat-img"><picture style={{ width: "100%", height: "100%", display: "block" }}><source media="(max-width: 768px)" srcSet={f.imgSp} /><img src={f.img} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} alt="" /></picture></div><FeatureBody f={f} /></>
                ) : (
                  <><FeatureBody f={f} /><div style={{ overflow: "hidden", minHeight: 280 }} className="feat-img"><picture style={{ width: "100%", height: "100%", display: "block" }}><source media="(max-width: 768px)" srcSet={f.imgSp} /><img src={f.img} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} alt="" /></picture></div></>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureBody({ f }) {
  return (
    <div style={{ padding: "48px 52px", display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--white)" }} className="feat-body">
      <span style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--blue)", fontWeight: 500, textTransform: "uppercase", marginBottom: 8, display: "block" }}>{f.en}</span>
      <h3 className="feat-title" style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 22, fontWeight: 600, color: "var(--text)", marginBottom: 16, lineHeight: 1.55, textAlign: "left" }}>{f.title}</h3>
      <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 2.1, textAlign: "left" }}>{f.body}</p>
    </div>
  );
}

const schedule = [
  { time: "09:00", title: "出勤・訪問準備", body: "訪問予定を確認し、1件目の利用者さまのご自宅へ向かいます。" },
  { time: "09:30", title: "午前の訪問", body: "1日の訪問件数は平均5件程度。予定に沿って訪問を行います。" },
  { time: "12:00", title: "昼休憩", body: "午後の訪問に備えて、しっかり休憩を取ります。" },
  { time: "13:00", title: "午後の訪問", body: "気になることは、訪問の合間にLINEや事業所で共有できます。" },
  { time: "16:30", title: "記録入力・確認", body: "記録はスマホ入力が基本で、訪問の合間に進められます。" },
  { time: "18:00", title: "退勤・直帰", body: "訪問と記録が終われば業務終了。そのまま直帰する日もあります。" },
];

function Schedule() {
  return (
    <section style={{ background: "var(--warm)", padding: "144px 0" }}>
      <div className="inner">
        <SectionHeader en="A DAY IN THE LIFE" title="社員の1日" titleClass="day-title" />
        <Reveal direction="up">
          <div style={{ maxWidth: 640, margin: "0 auto", background: "var(--white)", border: "1px solid var(--border)", borderRadius: 12, padding: 26 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", textAlign: "center", marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>介護職 Aさん（30代・女性）の1日</p>
            <ul style={{ listStyle: "none" }}>
              {schedule.map((s, i) => (
                <li key={i} style={{ display: "grid", gridTemplateColumns: "64px 1px 1fr", gap: "0 20px", marginBottom: i < schedule.length - 1 ? 18 : 0, alignItems: "start" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--blue)", paddingTop: 2 }}>{s.time}</span>
                  <div style={{ width: 1, background: "var(--blue-pale2)", alignSelf: "stretch", marginTop: 6 }} />
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{s.title}</h4>
                    <p style={{ fontSize: 13, color: "var(--text-light)", lineHeight: 1.75 }}>{s.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const voices = [
  { name: "田中 さくら", role: "介護職 / 入社3年目", img: "/images/スタッフの声(赤).jpg", text: "未経験でも丁寧に教えてもらえました。今では資格も取得して、自分の成長を実感しています。" },
  { name: "鈴木 健太", role: "訪問看護師 / 入社5年目", img: "/images/スタッフの声(青).jpg", text: "チームの雰囲気がとても良く、困ったときは必ず誰かが助けてくれます。働きやすい職場です。" },
  {
    name: "Kさん",
    role: "訪問看護師 / 主任",
    img: "/images/interview-nurce.jpg",
    text: "「いつも楽しみにしていたよ」ご利用者さまからいただいたこの言葉が、今も忘れられません。",
    interview: {
      profile: "経験年数15年目 ／ 入職6年目 ／ 職種：看護師",
      qa: [
        { q: "この仕事を選んだきっかけや理由は何でしたか？", a: "私が幼い頃から父が病気を患っており、母が看護師さんに感謝してると幼い頃からよく聞いていたので、自然と看護師の仕事に興味を持つ様になりました。" },
        { q: "リクリエイトに入職した決め手はなにでしたか？また入職の前と後で感じたギャップはなにかありますか？", a: "ホームページの写真で、職員同士がワイワイ楽しそうだった事と、利用者様に寄り添った会社で素敵だなと思ったからです。実際社長さんはいつも活き活きされていて面白いです！\n大変だなと思ったことは、真夏・真冬の移動が過酷な事。暑さ日焼け対策、防寒対策バッチリです！" },
        { q: "この職場で働いて「よかった」と感じる瞬間はなにかありますか？", a: "1番は訪問看護という仕事にやりがいを感じられる事です。私は利用者、ご家族様との会話を大事にしていて、そこからさらに良いサービスに繋げられないかを意識して関わっています。\nうちは柔軟性があるステーションなので所長に相談しながら、利用者様がやってほしい事、やりたい事を一緒に叶えやすいかなと思います。\n最近は、長年日本舞踊の先生をされてた利用者さんと、リハビリとして日本舞踊を教えていただいたりして、その方その方との関わりを考えるのが楽しいです。" },
        { q: "仕事で大変なことと、またどのように克服したのか教えてください", a: "訪問看護は基本1人での訪問なので、イレギュラーな事があった時判断に迷うことがあります。そんな時、すぐに相談に乗ってくれる上司、仲間がいるので心強いです。\nまた毎朝申し送りがあるので、自分の担当以外の利用者様の情報も共有できるので、オンコールの不安も軽減されています。相談をしやすい環境は整っていると思います。いつも周りに助けてもらっています！" },
        { q: "この仕事をしていて印象に残っているエピソードについて教えてください", a: "元々ご主人様に訪問看護介入しており、ご主人様をご自宅でお看取りした利用者様。\n仲のいいご夫婦で、それまでご主人様のために趣味の料理やお菓子作りをされていたけど、お一人になり何も作る気にならないと元気がなくなっていました。その奥さまが病気になり、訪問看護として介入始めた際、一緒にシフォンケーキを作らせてもらった事がありました。\nその方を最期お看取りする時「あなたに来てもらえて良かった。いつも来てくれるのを楽しみにしていたよ」と言ってもらえたのが嬉しかったです。" },
        { q: "どんな人と一緒に働きたいですか？", a: "冗談を言ったり、小さいことでも報告し合える様な関係性を作り、お互い切磋琢磨しながら楽しく働きたいです！私もまだまだ未熟なので、高め合えたらいいなと思います。" },
      ],
    },
  },
];

function Voices() {
  const [activeVoice, setActiveVoice] = useState(null);
  return (
    <section id="voices" style={{ background: "var(--warm)", padding: "144px 0" }}>
      <div className="inner">
        <SectionHeader en="STAFF VOICES" title="先輩の声" titleClass="voices-title" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }} className="voices-grid">
          {voices.map((v, i) => (
            <Reveal key={v.name} delay={i * 120}>
              <div
                onClick={v.interview ? () => setActiveVoice(v) : undefined}
                style={{ borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)", background: "var(--white)", maxWidth: 220, margin: "0 auto", cursor: v.interview ? "pointer" : "default" }}
              >
                <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                  <img src={v.img} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} alt={v.name} />
                </div>
                <div style={{ padding: 16 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 2, textAlign: "center" }}>{v.name}</p>
                  <p style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 10, textAlign: "center" }}>{v.role}</p>
                  <p style={{ fontSize: 12, color: "var(--text-light)", lineHeight: 1.8 }}>{v.text}</p>
                  {v.interview && <p style={{ fontSize: 11, color: "var(--blue)", fontWeight: 700, textAlign: "center", marginTop: 10 }}>全文を読む →</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      {activeVoice && <VoiceModal voice={activeVoice} onClose={() => setActiveVoice(null)} />}
    </section>
  );
}

function VoiceModal({ voice, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="job-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="job-modal" role="dialog" aria-modal="true" aria-label={voice.name}>
        <div className="modal-drag-bar" />
        <div style={{ background: "var(--blue)", padding: "24px 28px 20px", display: "flex", gap: 16, alignItems: "center" }}>
          <img src={voice.img} alt={voice.name} style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid rgba(255,255,255,0.6)" }} />
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 19, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>{voice.name}</h2>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", margin: 0 }}>{voice.role}</p>
          </div>
          <button onClick={onClose} aria-label="閉じる" style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", color: "#fff", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
        </div>
        <div className="modal-section" style={{ paddingTop: 20 }}>
          {voice.interview.profile && (
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>{voice.interview.profile}</p>
          )}
          {voice.interview.qa.map((item, i) => (
            <div key={i} style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--blue)", marginBottom: 8, lineHeight: 1.6 }}>Q{i + 1}. {item.q}</p>
              <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.9, whiteSpace: "pre-line" }}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const welfare = [
  { badge: "最大20万円", title: "引越し補助", img: "/images/引越し.jpg" },
  { badge: "費用全額負担", title: "資格取得支援", img: "/images/資格.jpg" },
  { badge: "無料貸与", title: "制服・電動自転車貸与", img: "/images/電動自転車.jpg" },
  { title: "バイク通勤可", img: "/images/バイク通勤可.jpg" },
  { title: "リファラル制度", img: "/images/リファラル制度.jpg" },
  { title: "出産育児支援", img: "/images/出産育児支援.jpg" },
];

function Welfare() {
  return (
    <section style={{ background: "var(--white)", padding: "144px 0" }}>
      <div className="inner">
        <SectionHeader en="WELFARE" title="福利厚生" titleClass="welfare-title" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }} className="welfare-grid">
          {welfare.map((w, i) => (
            <Reveal key={w.title} delay={i * 120}>
              <div style={{ borderRadius: 10, overflow: "hidden", maxWidth: 220, margin: "0 auto" }}>
                <div style={{ position: "relative", aspectRatio: "4/3" }}>
                  <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
                    <img src={w.img} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} alt={w.title} />
                  </div>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(83,70,89,0.72) 0%,rgba(83,70,89,0.08) 60%,transparent 100%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 16 }}>
                    {w.badge && <span style={{ display: "inline-block", background: "var(--accent)", color: "var(--text)", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 3, marginBottom: 6, alignSelf: "flex-start" }}>{w.badge}</span>}
                    <p style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 15, fontWeight: 700, color: "var(--white)", lineHeight: 1.4 }}>{w.title}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const numbers = [
  { val: "2013", unit: "年", label: "設立", icon: "/images/企業設立.png" },
  { val: "約70", unit: "名", label: "スタッフ数", icon: "/images/社員数.png" },
  { val: "47.2", unit: "歳", label: "平均年齢", icon: "/images/年齢.png" },
  { val: "67:33", unit: "", label: "男女比", icon: "/images/男女比.png" },
  { val: "36", unit: "万円", label: "平均給与", icon: "/images/平均給与.png" },
  { val: "10", unit: "時間", label: "月平均残業時間", icon: "/images/月平均残業時間.png" },
];

function Numbers() {
  return (
    <section id="numbers" style={{ background: "var(--blue)", padding: "120px 0" }}>
      <div className="inner">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <Reveal direction="up">
            <span style={{ fontSize: 10, letterSpacing: "0.22em", color: "rgba(255,255,255,0.6)", fontWeight: 500, textTransform: "uppercase", marginBottom: 10, display: "block" }}>NUMBERS</span>
            <h2 className="numbers-title" style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 34, fontWeight: 600, lineHeight: 1.4, color: "var(--white)", marginBottom: 14 }}>数字で見るリクリエイト</h2>
            <div style={{ width: 32, height: 2, background: "var(--accent)", margin: "0 auto" }} />
          </Reveal>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="num-grid">
          {numbers.map((n, i) => (
            <Reveal key={n.label} delay={i * 100}>
              <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "36px 20px 32px", textAlign: "center", border: "1px solid rgba(255,255,255,0.15)" }}>
                {n.icon && (
                  <div className="num-icon" style={{ width: 72, height: 72, margin: "0 auto 20px" }}>
                    <img src={n.icon} style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
                  </div>
                )}
                <div className="num-val" style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 42, fontWeight: 600, color: "var(--white)", lineHeight: 1, marginBottom: 8, marginTop: n.icon ? 0 : 20 }}>
                  {n.val}<span style={{ fontSize: 17, fontWeight: 400 }}>{n.unit}</span>
                </div>
                <div className="num-label" style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", letterSpacing: "0.08em" }}>{n.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Message() {
  return (
    <section style={{ background: "var(--warm)", padding: "144px 0" }}>
      <div className="inner">
        <SectionHeader en="MESSAGE" title="一緒に働きませんか？" titleClass="message-title" />
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <Reveal direction="up">
            <div style={{ width: 160, height: 200, borderRadius: 12, overflow: "hidden", margin: "0 auto 24px", border: "1px solid var(--border)" }}>
              <img src="/images/message.jpg" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} alt="代表取締役 小林祥次" />
            </div>
            <p style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>小林 祥次</p>
            <p style={{ fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.08em", marginBottom: 32 }}>代表取締役 ／ 株式会社リクリエイト</p>
          </Reveal>
          <Reveal direction="up" delay={150}>
            <h3 className="message-heading" style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 24, fontWeight: 600, color: "var(--text)", lineHeight: 1.65, marginBottom: 50 }}>介護の仕事に、誇りと未来を</h3>
            <p className="message-body" style={{ fontSize: 16, color: "var(--text-light)", lineHeight: 2.2, textAlign: "left" }}>
              介護の仕事には、もっと大きな可能性がある。私たちは、そう考えています。<br /><br />
              介護は、ただ決められたサービスを提供するだけの仕事ではありません。利用者さまがこれからどんな暮らしを望んでいるのか。その人らしい生活を続けるために、私たちに何ができるのか。<br /><br />
              日々の関わりの中で小さな変化に気づき、暮らしの可能性を広げていく。介護は、誰かの人生を支える専門性のある仕事だと考えています。<br /><br />
              現在、リクリエイトでは訪問介護2事業所、訪問看護1事業所、シェアハウス2棟を運営しています。事業を増やすこと自体が目的ではありません。地域の中に困っている人がいて、その課題に向き合う必要があるなら、私たちができる形で応えていく。その積み重ねが、今のリクリエイトをつくっています。<br /><br />
              同時に、利用者さまの暮らしを支えるためには、働くスタッフ自身も安心して力を発揮できる環境が必要です。<br /><br />
              だからこそ、私たちは働き方やサポート体制、評価制度を一つひとつ整えてきました。現場で迷ったときに一人で抱え込まないための連携体制。自分の現在地と目指す未来が見えるキャリア制度。現場の声を会社づくりに反映する仕組み。<br /><br />
              介護への想いを、ただの想いで終わらせない。<br />
              その想いを、誰かを支える力に変えていける会社でありたいと思っています。<br /><br />
              リクリエイトは、これからも現場の声を聞きながら変わり続けていく会社です。<br /><br />
              利用者さまの暮らしを支えながら、自分自身のこれからも大切にできる。<br />
              そんな介護のあり方を、私たちと一緒につくっていきませんか。
            </p>
            <p style={{ fontSize: 16, color: "var(--text-light)", textAlign: "right", marginTop: 48, letterSpacing: "0.06em", fontFamily: "'Shippori Mincho', serif" }}>
              代表取締役　小林祥次
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const requirements = [
  "経験年数や年齢は問いません",
  "利用者さまと丁寧に向き合いたい人",
  "自分のペースで慣れていきたい人",
  "安心できる環境で長く働きたい人",
  "チームで支える介護を大切にしたい人",
];

function Requirements() {
  return (
    <section style={{ background: "var(--white)", padding: "72px 0" }}>
      <div className="inner">
        <SectionHeader en="IDEAL CANDIDATE" title="こんな人を求めています" titleClass="requirements-title" />
        <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: 0, border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
          {requirements.map((r, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="req-row" style={{ display: "flex", alignItems: "flex-start", gap: 20, padding: "16px 28px", borderBottom: i < requirements.length - 1 ? "1px solid var(--border)" : "none", background: "var(--white)" }}>
                <div style={{ width: 28, height: 28, background: "var(--blue)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "white", fontSize: 12, fontWeight: 700, marginTop: 2 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="req-text" style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.7, fontWeight: 500 }}>{r}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const flowSteps = [
  { n: "01", title: "お問い合わせ", body: "LINEまたはフォームからお気軽にご連絡ください", icon: "/images/お問合せ.png" },
  { n: "02", title: "書類選考", body: "履歴書・職務経歴書をご提出ください", icon: "/images/書類審査.png" },
  { n: "03", title: "面接", body: "オフィスにてカジュアルな面談を行います", icon: "/images/面接.png" },
  { n: "04", title: "内定・入社", body: "入社日はご相談の上、柔軟に対応します", icon: "/images/入社.png" },
];

function Flow() {
  return (
    <section style={{ background: "var(--warm)", padding: "144px 0" }}>
      <div className="inner">
        <SectionHeader en="HIRING PROCESS" title="採用までの流れ" titleClass="flow-title" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="flow-steps">
          {flowSteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 10, padding: "26px 18px 24px", textAlign: "center" }}>
                <p style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 26, fontWeight: 600, color: "#c8c8c8", lineHeight: 1, marginBottom: 12 }}>{s.n}</p>
                <div style={{ width: 48, height: 48, margin: "0 auto 12px" }}>
                  <img src={s.icon} style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" />
                </div>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{s.title}</h4>
                <p className="flow-body" style={{ fontSize: 11, color: "var(--text-light)", lineHeight: 1.7 }}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SplitLines({ text }) {
  const parts = text.split("／").map(s => s.trim());
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((p, i) => (
        <span key={i} style={{ display: "block", lineHeight: 1.9 }}>{p}</span>
      ))}
    </>
  );
}

const jobDetails = [
  {
    id: "caregiver",
    title: "介護職 / ヘルパー",
    type: "正社員",
    salSummary: "月給 284,379円〜",
    accent: "#3aacff",
    tags: ["未経験・無資格歓迎", "資格取得支援あり", "直行直帰可"],
    sections: [
      {
        label: "給与",
        rows: [
          { th: "月収合計", td: "284,379〜291,882円", emphasis: true },
          { th: "基本給", td: "178,000〜185,000円（経験年数による）" },
          { th: "訪問手当", td: "40,000円〜（1日5件相当）" },
          { th: "処遇改善手当", td: "50,000円" },
          { th: "固定残業代", td: "16,379〜16,882円（10時間分）※超過別途支給" },
          { th: "その他手当", td: "車両持ち込み手当 5,000円 ／ 家族手当（配偶者 10,000円・一親等以内 5,000円）／ 交通費別途支給" },
          { th: "昇給", td: "年1回（4月）" },
          { th: "賞与", td: "年1回（3月・実績による）" },
          { th: "試用期間", td: "6ヶ月（条件変更なし）" },
        ],
      },
      {
        label: "想定年収",
        type: "career",
        rows: [
          { th: "入職1年目", td: "ヘルパー／未経験", salary: "380万円" },
          { th: "入職2年目", td: "サービス提供責任者", salary: "430万円" },
          { th: "入職3年目", td: "訪問介護 主任", salary: "480万円" },
          { th: "入職6年目", td: "訪問介護 所長", salary: "630万円" },
        ],
        note: "※想定年収は1年間在籍した際の一例。賞与額・勤務時間により前後あり。",
      },
      {
        label: "勤務時間・休日",
        rows: [
          { th: "勤務時間", td: "9:00〜18:00（実働8時間・休憩60分）" },
          { th: "休日", td: "完全週休2日（固定シフト：土日いずれか＋平日1日）" },
          { th: "年間休日", td: "120日" },
          { th: "休暇", td: "特別休暇（毎月1日）／ 連続休暇取得可 ／ 産休・育休（取得実績あり）／ 慶弔休暇" },
        ],
      },
      {
        label: "仕事内容",
        rows: [
          { th: "業務内容", td: "身体介護（身の周りのサポート）／ 生活援助（掃除・洗濯・調理など）／ 病院への介助サポート ／ 生活に関するご相談など" },
          { th: "キャリア", td: "実務経験を積みながら研修を受け、入社約半年後にサービス提供責任者へステップアップ" },
          { th: "備考", td: "直行直帰可 ／ 無資格の方は法令範囲内での業務（初任者研修を会社負担で取得）" },
        ],
      },
      {
        label: "応募資格",
        rows: [
          { th: "資格", td: "無資格・未経験・ブランク・新卒・学歴不問、すべて可（会社負担で初任者研修を取得）" },
          { th: "歓迎", td: "介護職員初任者研修（旧ヘルパー2級）／ 介護職員実務者研修（旧ヘルパー1級）／ 介護福祉士（または取得意思のある方）" },
          { th: "歓迎（人物）", td: "第二新卒・社会人未経験・ブランクのある方・社会人経験10年以上の方も大歓迎" },
        ],
      },
      {
        label: "福利厚生",
        rows: [
          { th: "社会保険", td: "雇用・労災・健康・厚生年金" },
          { th: "その他", td: "退職金制度 ／ 引越し補助（上限20万円）／ 資格取得支援・全額会社負担（初任者研修・各種ガイドヘルパー・喀痰吸引など）／ リファラル制度（最大10万円）／ 拠出型企業年金 ／ 出産・育児支援（利用実績あり）／ バイク通勤可 ／ 屋内禁煙（屋外分煙）" },
        ],
      },
    ],
  },
  {
    id: "service-provider",
    title: "サービス提供責任者",
    type: "正社員",
    salSummary: "月給 320,759円〜",
    accent: "#3aacff",
    tags: ["未経験・無資格歓迎", "半年でキャリアアップ", "直行直帰可"],
    sections: [
      {
        label: "給与",
        rows: [
          { th: "月収合計", td: "320,759〜328,764円", emphasis: true },
          { th: "基本給", td: "178,000〜185,000円（経験年数による）" },
          { th: "訪問手当", td: "40,000円〜（1日5件相当）" },
          { th: "処遇改善手当", td: "50,000円" },
          { th: "サ責手当", td: "20,000円〜（担当利用人数により変動あり）" },
          { th: "固定残業代", td: "32,759〜33,764円（20時間分）※超過別途支給" },
          { th: "その他手当", td: "車両持ち込み手当 5,000円 ／ 家族手当（配偶者 10,000円・一親等以内 5,000円）／ 交通費別途支給" },
          { th: "昇給", td: "年1回（4月）" },
          { th: "賞与", td: "年1回（3月・実績による）" },
          { th: "試用期間", td: "6ヶ月（条件変更なし）" },
        ],
      },
      {
        label: "想定年収",
        type: "career",
        rows: [
          { th: "入職1年目", td: "サービス提供責任者", salary: "430万円" },
          { th: "入職3年目", td: "主任", salary: "500万円" },
          { th: "入職6年目", td: "所長", salary: "650万円" },
        ],
        note: "※想定年収は1年間在籍した際の一例。賞与額・勤務時間により前後あり。",
      },
      {
        label: "勤務時間・休日",
        rows: [
          { th: "勤務時間", td: "9:00〜18:00（実働8時間・休憩60分）" },
          { th: "休日", td: "完全週休2日（固定シフト：土日いずれか＋平日1日）" },
          { th: "休暇", td: "特別休暇（毎月1日・有給とは別）／ 有給休暇（取得率90%以上）／ 連続休暇取得可 ／ 産休・育休（取得実績あり）／ 慶弔休暇" },
        ],
      },
      {
        label: "仕事内容",
        rows: [
          { th: "業務内容", td: "訪問介護業務 ／ サービス提供責任者のサポート ／ 簡単な事務作業" },
          { th: "キャリア", td: "実務を経験しながら研修を受け、入社約半年後にサービス提供責任者へステップアップ" },
          { th: "備考", td: "直行直帰可 ／ 無資格の方は法令範囲内での業務（初任者研修を会社負担で取得）／ 法人内で異動の可能性あり" },
        ],
      },
      {
        label: "応募資格",
        rows: [
          { th: "資格", td: "無資格・未経験歓迎（会社負担で初任者研修を取得）" },
          { th: "歓迎", td: "介護職員初任者研修（旧ヘルパー2級）／ 介護職員実務者研修（旧ヘルパー1級）／ 介護福祉士（または取得意思のある方）" },
        ],
      },
      {
        label: "福利厚生",
        rows: [
          { th: "社会保険", td: "雇用・労災・健康・厚生年金" },
          { th: "その他", td: "退職金制度 ／ 引越し補助（上限20万円）／ 資格取得支援・全額会社負担（初任者研修・各種ガイドヘルパー・喀痰吸引など）／ リファラル制度（最大10万円）／ 拠出型企業年金 ／ 出産・育児支援（利用実績あり）／ バイク通勤可 ／ 屋内禁煙（屋外分煙）" },
        ],
      },
    ],
  },
  {
    id: "nurse",
    title: "看護師",
    type: "正社員",
    salSummary: "月給 379,098円〜",
    accent: "#5dcaa5",
    tags: ["正看護師資格必須", "直行直帰相談可", "オンコールあり"],
    sections: [
      {
        label: "給与",
        rows: [
          { th: "月収合計", td: "379,098円〜", emphasis: true },
          { th: "基本給", td: "178,000円" },
          { th: "訪問手当", td: "44,000円" },
          { th: "職務手当", td: "70,000円" },
          { th: "処遇改善加算", td: "45,000円" },
          { th: "固定残業代", td: "42,098円（20時間分）※超過別途支給" },
          { th: "昇給", td: "年1回（4月）" },
          { th: "賞与", td: "年1回（3月・実績による）" },
          { th: "試用期間", td: "6ヶ月（条件変更なし）" },
        ],
      },
      {
        label: "勤務時間・休日",
        rows: [
          { th: "勤務時間", td: "8:30〜17:30（直行直帰相談可）" },
          { th: "オンコール", td: "あり（緊急訪問手当あり）" },
          { th: "休日", td: "完全週休2日制（土日祝）" },
          { th: "休暇", td: "有給休暇 ／ 産休・育休（取得実績あり）／ 慶弔休暇 ／ 夏季冬季休暇" },
        ],
      },
      {
        label: "仕事内容",
        rows: [
          { th: "業務内容", td: "訪問看護業務全般 ／ 病状観察 ／ リハビリ ／ タブレット記録など" },
          { th: "勤務地", td: "庄内事業所" },
        ],
      },
      {
        label: "応募資格",
        rows: [
          { th: "必須", td: "正看護師資格" },
        ],
      },
      {
        label: "福利厚生",
        rows: [
          { th: "社会保険", td: "雇用・労災・健康・厚生年金" },
          { th: "その他", td: "退職金制度 ／ 引越し補助（上限20万円）／ リファラル制度（最大10万円）／ 拠出型企業年金 ／ 出産・育児支援 ／ バイク通勤可 ／ 屋内禁煙" },
        ],
      },
    ],
  },
  {
    id: "caregiver-part",
    title: "介護職 / ヘルパー",
    type: "パート",
    salSummary: "時給 1,470円〜2,593円",
    accent: "#92cef5",
    tags: ["週1日〜OK", "希望シフト制", "正社員登用あり"],
    sections: [
      {
        label: "給与",
        rows: [
          { th: "パートヘルパー", td: "時給 1,470〜1,880円（処遇改善・訪問手当含む）", emphasis: true },
          { th: "登録ヘルパー（通常）", td: "身体介護 2,210円 ／ 生活援助 1,900円（45分：1,525円）／ 移動支援 1,520円" },
          { th: "登録ヘルパー（早朝・夜間）", td: "身体介護 2,593円 ／ 生活援助 1,955円（45分：1,623円）／ 移動支援 1,730円" },
          { th: "早朝・夜間時間帯", td: "6:00〜8:00 ／ 18:00〜20:00" },
          { th: "備考", td: "介護福祉士は30円以上UP ／ 移動中も給与対象 ／ 電動自転車貸与 ／ 昇給あり" },
          { th: "試用期間", td: "3ヶ月（条件変更なし）" },
        ],
      },
      {
        label: "想定年収",
        type: "career",
        rows: [
          { th: "入職1年目", td: "週2勤務・登録ヘルパー／未経験", salary: "103万円" },
          { th: "入職8年目", td: "週5勤務・ベテラン登録ヘルパー", salary: "550万円" },
        ],
        note: "※想定年収は1年間在籍した際の一例。勤務時間・賞与額により前後あり。",
      },
      {
        label: "勤務時間・休日",
        rows: [
          { th: "勤務時間", td: "9:00〜18:00（休憩1時間）" },
          { th: "勤務日数", td: "週1日〜OK（週4・5日も可）" },
          { th: "シフト", td: "希望シフト制・入りたいときに勤務可能" },
          { th: "休日", td: "パートヘルパー：固定休み（土日希望可）／ 登録ヘルパー：希望休制（100%希望通り）" },
          { th: "休暇", td: "産休・育休（取得実績あり）" },
        ],
      },
      {
        label: "仕事内容",
        rows: [
          { th: "業務内容", td: "身体介護（身の周りのサポート）／ 生活援助（掃除・洗濯・調理など）／ 病院への介助サポート ／ 生活に関するご相談など" },
          { th: "備考", td: "直帰可" },
        ],
      },
      {
        label: "応募資格",
        rows: [
          { th: "資格", td: "無資格・未経験・ブランク・学歴不問、すべて可（会社負担で初任者研修を取得）" },
          { th: "歓迎", td: "介護職員初任者研修（旧ヘルパー2級）／ 介護職員実務者研修（旧ヘルパー1級）／ 介護福祉士（または取得意思のある方）" },
          { th: "歓迎（人物）", td: "長期勤務したい方 ／ ブランクのある方" },
        ],
      },
      {
        label: "福利厚生",
        rows: [
          { th: "社会保険", td: "社会保険完備（社内規定時間あり）" },
          { th: "その他", td: "正社員登用制度あり ／ 資格取得支援（初任者研修・各種ガイドヘルパー・喀痰吸引）／ 引越し補助（社内規定あり）／ 出産・育児支援（利用実績あり）／ バイク通勤可 ／ 私服勤務可 ／ 副業OK ／ 屋内禁煙（屋外分煙）／ マスク・アルコールボトル配布 ／ 防護服完備" },
        ],
      },
    ],
  },
  {
    id: "care-manager",
    title: "ケアマネジャー",
    type: "正社員",
    salSummary: "月給 317,943円〜",
    accent: "#f2a65a",
    tags: ["居宅ケアプラン作成", "残業月20時間以内", "土日祝休み"],
    sections: [
      {
        label: "給与",
        rows: [
          { th: "月収合計", td: "317,943〜325,948円", emphasis: true },
          { th: "基本給", td: "178,000〜185,000円（経験年数による）" },
          { th: "職務手当", td: "50,000円" },
          { th: "処遇改善手当", td: "50,000円" },
          { th: "固定残業代", td: "39,943〜40,948円（20時間分）※超過別途支給" },
          { th: "担当数手当", td: "インセンティブ制／担当31人目以降、1名につき3,000円" },
          { th: "その他手当", td: "車両持ち込み手当 5,000円 ／ 家族手当（配偶者 10,000円・一親等以内 5,000円）／ 交通費別途支給" },
          { th: "昇給", td: "年1回（4月）" },
          { th: "賞与", td: "年1回（3月・実績による）" },
          { th: "試用期間", td: "6ヶ月（条件変更なし）" },
        ],
      },
      {
        label: "想定年収",
        type: "career",
        rows: [
          { th: "入職1年目", td: "新入職ケアマネジャー／未経験", salary: "420万円" },
          { th: "入職5年目", td: "主任ケアマネジャー", salary: "500万円" },
        ],
        note: "※想定年収は1年間在籍した際の一例。賞与額・勤務時間により前後あり。",
      },
      {
        label: "勤務時間・休日",
        rows: [
          { th: "勤務時間", td: "9:00〜18:00（実働8時間・休憩60分）" },
          { th: "休日", td: "完全週休2日制（土日祝）／ 年間休日128日" },
          { th: "休暇", td: "夏季休暇（8/13〜15）／ 年末年始休暇（12/30〜1/3）／ 有給休暇（取得率90%以上）／ 産休・育休（取得実績あり）／ 慶弔休暇 ／ 特別休暇（毎月1日）" },
        ],
      },
      {
        label: "仕事内容",
        rows: [
          { th: "業務内容", td: "居宅介護支援専門員業務全般 ／ ケアプラン作成 ／ 介護相談 ／ 要介護認定の書類作成代行 ／ 介護保険の給付請求 ／ 新規利用者獲得" },
          { th: "備考", td: "更新費用・主任ケアマネ受講費用は全額会社負担" },
        ],
      },
      {
        label: "応募資格",
        rows: [
          { th: "必須", td: "介護支援専門員（ケアマネジャー）資格" },
        ],
      },
      {
        label: "福利厚生",
        rows: [
          { th: "社会保険", td: "雇用・労災・健康・厚生年金" },
          { th: "その他", td: "退職金制度 ／ 資格更新費用・主任ケアマネ受講費用 会社負担 ／ バイク通勤可 ／ 服装自由 ／ 出産・育児支援（利用実績あり）／ 屋内禁煙（屋外分煙）" },
        ],
      },
    ],
  },
];

function JobModal({ job, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      <style>{`
        .job-modal-overlay {
          position: fixed; inset: 0; z-index: 900;
          background: rgba(31,31,31,0.55);
          display: flex; align-items: flex-end; justify-content: center;
        }
        @media (min-width: 640px) { .job-modal-overlay { align-items: center; } }
        .job-modal {
          background: var(--white); width: 100%; max-width: 680px;
          max-height: 92vh; border-radius: 20px 20px 0 0;
          overflow-y: auto; -webkit-overflow-scrolling: touch;
          animation: modalSlideUp 0.32s cubic-bezier(.22,.68,0,1.1);
        }
        @media (min-width: 640px) {
          .job-modal { border-radius: 16px; max-height: 88vh; animation: modalFadeIn 0.28s ease; }
        }
        @keyframes modalSlideUp { from { transform: translateY(60px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes modalFadeIn { from { transform: translateY(24px) scale(0.98); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
        .modal-drag-bar { width: 40px; height: 4px; background: #d8d8d8; border-radius: 2px; margin: 12px auto 0; }
        @media (min-width: 640px) { .modal-drag-bar { display: none; } }
        .modal-section { padding: 0 28px 20px; }
        @media (max-width: 480px) { .modal-section { padding: 0 18px 16px; } }
        .modal-table { width: 100%; border-collapse: collapse; }
        .modal-table tr { border-bottom: 1px solid var(--border); }
        .modal-table tr:last-child { border-bottom: none; }
        .modal-table th {
          text-align: left; font-size: 12px; font-weight: 500;
          color: var(--text-muted); padding: 10px 12px 10px 0;
          width: 120px; vertical-align: top; white-space: nowrap;
        }
        .modal-table td { font-size: 13px; color: var(--text); padding: 10px 0; line-height: 1.75; text-align: left; }
        @media (max-width: 480px) {
          .modal-table th { width: 90px; font-size: 11px; }
          .modal-table td { font-size: 12px; }
        }
        .modal-tag { display: inline-block; font-size: 11px; padding: 3px 10px; border-radius: 20px; margin: 3px 4px 3px 0; }
        .modal-section-label {
          font-size: 12px; font-weight: 700; letter-spacing: 0.06em;
          padding: 16px 0 10px; text-align: left;
          border-bottom-width: 2px; border-bottom-style: solid; margin-bottom: 4px;
        }
      `}</style>
      <div className="job-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="job-modal" role="dialog" aria-modal="true" aria-label={job.title}>
          <div className="modal-drag-bar" />
          <div style={{ background: job.accent, padding: "24px 28px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.5)", color: "#fff", fontSize: 10, padding: "2px 10px", borderRadius: 3, marginBottom: 10, letterSpacing: "0.06em" }}>{job.type}</span>
                <h2 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1.4, margin: "0 0 8px" }}>{job.title}</h2>
                <p style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0, opacity: 0.95 }}>{job.salSummary}</p>
              </div>
              <button onClick={onClose} aria-label="閉じる" style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", color: "#fff", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: 12 }}>✕</button>
            </div>
            <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap" }}>
              {job.tags.map(t => (
                <span key={t} className="modal-tag" style={{ background: "rgba(255,255,255,0.22)", color: "#fff", border: "1px solid rgba(255,255,255,0.35)" }}>{t}</span>
              ))}
            </div>
          </div>
          {job.sections.map(sec => (
            <div key={sec.label} className="modal-section">
              <p className="modal-section-label" style={{ color: job.accent, borderBottomColor: `${job.accent}44` }}>{sec.label}</p>
              {sec.type === "career" ? (
                <>
                  <table className="modal-table">
                    <tbody>
                      {sec.rows.map(row => (
                        <tr key={row.th}>
                          <th style={{ width: 90, color: job.accent, fontWeight: 700, fontSize: 12 }}>{row.th}</th>
                          <td style={{ textAlign: "left" }}>{row.td}</td>
                          <td style={{ textAlign: "right", fontWeight: 700, fontSize: 15, color: job.accent, whiteSpace: "nowrap", paddingLeft: 8 }}>{row.salary}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {sec.note && <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 8, lineHeight: 1.7 }}>{sec.note}</p>}
                </>
              ) : (
                <table className="modal-table">
                  <tbody>
                    {sec.rows.map(row => (
                      <tr key={row.th}>
                        <th>{row.th}</th>
                        <td style={row.emphasis ? { fontWeight: 700, fontSize: 16, color: job.accent, textAlign: "left" } : { textAlign: "left" }}>
                          <SplitLines text={row.td} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
          <div style={{ padding: "20px 28px 32px", borderTop: "1px solid var(--border)" }}>
            <a href="#apply" onClick={onClose} style={{ display: "block", width: "100%", padding: "16px 0", background: "#d63031", color: "#fff", fontWeight: 700, fontSize: 15, letterSpacing: "0.06em", textAlign: "center", textDecoration: "none", borderRadius: 8 }}>
              この職種に応募する
            </a>
            <p style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "center", marginTop: 10 }}>まずはLINEでのご相談も大歓迎です</p>
          </div>
        </div>
      </div>
    </>
  );
}

function JobCard({ job, onOpen }) {
  const salSection = job.sections.find(s => s.label === "給与");
  const isPartTime = job.id === "caregiver-part";
  const previewRows = isPartTime
    ? [
        { th: "登録ヘルパー", td: "身体介護　2,052円" },
        { th: "", td: "生活援助　1,650円" },
        { th: "", td: "移動支援　1,490円" },
      ]
    : salSection
      ? salSection.rows.filter(r => !r.emphasis).slice(0, 3)
      : [];

  return (
    <div
      onClick={() => onOpen(job)}
      style={{
        border: "1px solid var(--border)", borderRadius: 12,
        cursor: "pointer", transition: "border-color 0.2s, transform 0.2s",
        background: "var(--white)", display: "flex", flexDirection: "column",
        height: 320, overflow: "hidden",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = job.accent; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ background: job.accent, padding: "16px 18px 14px", flexShrink: 0 }}>
        <span style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.45)", color: "#fff", fontSize: 9, padding: "2px 8px", borderRadius: 3, marginBottom: 6, letterSpacing: "0.06em" }}>{job.type}</span>
        <h3 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 16, fontWeight: 700, color: "#fff", margin: "0 0 3px", lineHeight: 1.3 }}>{job.title}</h3>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.9)", margin: 0 }}>{job.salSummary}</p>
      </div>
      <div style={{ padding: "8px 14px", display: "flex", flexWrap: "wrap", gap: 3, flexShrink: 0 }}>
        {job.tags.map(t => (
          <span key={t} style={{ fontSize: 9, padding: "2px 7px", borderRadius: 20, background: "#e8f6ff", color: job.accent, border: `1px solid ${job.accent}33` }}>{t}</span>
        ))}
      </div>
      <div style={{ padding: "10px 14px 0", borderTop: "1px solid var(--border)", flexShrink: 0 }}>
        <p style={{ fontSize: 9, fontWeight: 700, color: job.accent, letterSpacing: "0.06em", marginBottom: 5, textAlign: "left" }}>給与</p>
        {previewRows.map((row, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: "var(--text-muted)", flexShrink: 0, marginRight: 6, minWidth: 52 }}>{row.th}</span>
            <span style={{ fontSize: 10, color: "var(--text)", textAlign: "right" }}>{row.td.replace("（経験年数による）", "")}</span>
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ padding: "10px 14px 14px", display: "flex", justifyContent: "flex-end", flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: job.accent }}>続きを見る →</span>
      </div>
    </div>
  );
}

function Jobs() {
  const [activeJob, setActiveJob] = useState(null);
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [slideWidth, setSlideWidth] = useState(0);
  const slideRef = useRef(null);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const total = jobDetails.length;
  const GAP = 20;
  const cloneCount = 2;
  const cloned = [...jobDetails.slice(-cloneCount), ...jobDetails, ...jobDetails.slice(0, cloneCount)];
  const offset = cloneCount;

  useEffect(() => {
    const measure = () => {
      if (slideRef.current) setSlideWidth(slideRef.current.offsetWidth + GAP);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (slideRef.current) ro.observe(slideRef.current);
    return () => ro.disconnect();
  }, []);

  const goTo = (index) => { setIsTransitioning(true); setCurrent(index); };
  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  useEffect(() => {
    if (!isTransitioning) return;
    const timer = setTimeout(() => {
      if (current < 0) { setIsTransitioning(false); setCurrent(total - 1); }
      else if (current >= total) { setIsTransitioning(false); setCurrent(0); }
    }, 400);
    return () => clearTimeout(timer);
  }, [current, isTransitioning, total]);

  const onPointerDown = (e) => {
    startX.current = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    isDragging.current = true;
  };
  const onPointerUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const endX = e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX;
    const diff = startX.current - endX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
  };

  const translateIndex = current + offset;
  const activeDot = ((current % total) + total) % total;

  return (
    <section id="jobs" style={{ background: "var(--white)", padding: "144px 0" }}>
      <style>{`
        .jobs-carousel-outer { overflow: hidden; padding: 8px 0 16px; cursor: grab; user-select: none; }
        .jobs-carousel-outer:active { cursor: grabbing; }
        .jobs-carousel-track { display: flex; will-change: transform; }
        .jobs-carousel-track.animated { transition: transform 0.4s cubic-bezier(.22,.68,0,1.1); }
        .jobs-carousel-slide { flex: 0 0 calc(28% - 14px); margin-right: 20px; }
        @media (max-width: 900px) { .jobs-carousel-slide { flex: 0 0 calc(45% - 10px); } }
        @media (max-width: 600px) { .jobs-carousel-slide { flex: 0 0 75%; } }
      `}</style>
      <div className="inner">
        <SectionHeader en="OPEN POSITIONS" title="募集中の職種" titleClass="jobs-title" />
        <div
          className="jobs-carousel-outer"
          onMouseDown={onPointerDown}
          onMouseUp={onPointerUp}
          onMouseLeave={() => { isDragging.current = false; }}
          onTouchStart={onPointerDown}
          onTouchEnd={onPointerUp}
        >
          <div
            className={`jobs-carousel-track${isTransitioning ? " animated" : ""}`}
            style={{ transform: slideWidth ? `translateX(${-translateIndex * slideWidth}px)` : "none" }}
          >
            {cloned.map((job, i) => (
              <div key={i} className="jobs-carousel-slide" ref={i === 0 ? slideRef : null}>
                <JobCard job={job} onOpen={setActiveJob} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {jobDetails.map((_, i) => (
              <div key={i} onClick={() => goTo(i)} style={{ width: i === activeDot ? 20 : 6, height: 6, borderRadius: 3, cursor: "pointer", background: i === activeDot ? "#888888" : "#d8d8d8", transition: "all 0.3s" }} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <button onClick={prev} aria-label="前へ" style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#888888" }}
              onMouseEnter={e => e.currentTarget.style.color = "#444441"}
              onMouseLeave={e => e.currentTarget.style.color = "#888888"}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="13,4 7,10 13,16"/></svg>
            </button>
            <button onClick={next} aria-label="次へ" style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#888888" }}
              onMouseEnter={e => e.currentTarget.style.color = "#444441"}
              onMouseLeave={e => e.currentTarget.style.color = "#888888"}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="7,4 13,10 7,16"/></svg>
            </button>
          </div>
        </div>
      </div>
      {activeJob && <JobModal job={activeJob} onClose={() => setActiveJob(null)} />}
    </section>
  );
}

function Contact() {
  return (
    <section style={{ background: "var(--warm)", padding: "144px 0" }}>
      <div className="inner">
        <SectionHeader en="CONTACT" title="ご応募はコチラ" titleClass="contact-title" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="contact-grid">
          {[
            { ico: "LINE", val: "LINEで問い合わせる", sub: "24時間受付中", href: "https://lin.ee/zOsdkEG", bg: "#7cc98a", border: "1.5px solid #5aaa68" },
            { ico: "FORM", val: "WEB応募フォーム", sub: "24時間受付中", href: "#apply", bg: "#e89090", border: "1.5px solid #c97070" },
            { ico: "TEL", val: "お電話での応募", sub: "平日 9:00〜17:30", href: "tel:0648625438", bg: "#f0d878", border: "1.5px solid #c9b050" },
          ].map((c, i) => (
            <Reveal key={c.ico} delay={i * 100}>
              <a href={c.href} style={{ padding: "36px 28px", textAlign: "center", borderRadius: 10, textDecoration: "none", display: "block", background: c.bg, border: c.border }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "0.1em", marginBottom: 14, display: "block", textShadow: "0 1px 4px rgba(0,0,0,0.28)" }}>{c.ico}</span>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.28)" }}>{c.val}</p>
                {c.sub && <p style={{ fontSize: 12, color: "#fff", opacity: 0.9, marginTop: 4, textShadow: "0 1px 3px rgba(0,0,0,0.22)" }}>{c.sub}</p>}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/maqzkreg";

function ApplyForm() {
  const [form, setForm] = useState({ name: "", kana: "", tel: "", email: "", job: "", cert: "", timing: "", message: "" });
  const [status, setStatus] = useState("idle");

  const fi = { width: "100%", padding: "12px 16px", border: "1px solid var(--border)", borderRadius: 6, fontSize: 14, fontFamily: "'Noto Sans JP', sans-serif", color: "var(--text)", outline: "none", background: "var(--white)" };
  const labelStyle = { display: "block", fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 8, letterSpacing: "0.04em", textAlign: "left" };
  const req = { display: "inline-block", background: "var(--red)", color: "var(--white)", fontSize: 10, padding: "1px 8px", borderRadius: 3, marginLeft: 8, verticalAlign: "middle" };

  const handleSubmit = async () => {
    if (!form.name || !form.kana || !form.tel || !form.email || !form.job) { alert("必須項目をすべてご入力ください。"); return; }
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify({ お名前: form.name, フリガナ: form.kana, 電話番号: form.tel, メールアドレス: form.email, 希望職種: form.job, "資格・経験": form.cert, 希望勤務開始時期: form.timing, "メッセージ・質問": form.message }) });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  };

  if (status === "success") {
    return (
      <section id="apply" style={{ background: "var(--white)", padding: "144px 0" }}>
        <div className="inner">
          <Reveal>
            <div style={{ maxWidth: 640, margin: "0 auto", background: "var(--warm)", border: "1px solid var(--border)", borderRadius: 14, padding: "52px 56px", textAlign: "center" }}>
              <p style={{ fontSize: 24, fontFamily: "'Shippori Mincho', serif", color: "var(--blue)", marginBottom: 16 }}>ご応募ありがとうございます！</p>
              <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 2 }}>担当者より2営業日以内にご連絡いたします。</p>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" style={{ background: "var(--white)", padding: "144px 0" }}>
      <div className="inner">
        <SectionHeader en="APPLY" title="応募フォーム" titleClass="apply-title" desc="必要事項をご記入の上、送信してください。担当者より2営業日以内にご連絡いたします。" />
        <Reveal direction="up">
          <div className="form-inner" style={{ maxWidth: 640, margin: "0 auto", background: "var(--warm)", border: "1px solid var(--border)", borderRadius: 14, padding: "52px 56px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 22 }} className="form-name-row">
              <div>
                <label style={labelStyle}>お名前<span style={req}>必須</span></label>
                <input style={fi} type="text" placeholder="山田 太郎" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>フリガナ<span style={req}>必須</span></label>
                <input style={fi} type="text" placeholder="ヤマダ タロウ" value={form.kana} onChange={e => setForm({ ...form, kana: e.target.value })} />
              </div>
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={labelStyle}>電話番号<span style={req}>必須</span></label>
              <input style={fi} type="tel" placeholder="090-0000-0000" value={form.tel} onChange={e => setForm({ ...form, tel: e.target.value })} />
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={labelStyle}>メールアドレス<span style={req}>必須</span></label>
              <input style={fi} type="email" placeholder="example@mail.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            {[
              { label: "希望職種", req: true, key: "job", opts: ["介護職 / ヘルパー", "看護師", "サービス提供責任者", "その他・未定"] },
              { label: "資格・経験", req: false, key: "cert", opts: ["介護福祉士", "介護職員初任者研修修了", "正看護師", "准看護師", "無資格・未経験"] },
              { label: "希望勤務開始時期", req: false, key: "timing", opts: ["すぐにでも", "1ヶ月以内", "3ヶ月以内", "未定・相談したい"] },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 22 }}>
                <label style={labelStyle}>{f.label}{f.req && <span style={req}>必須</span>}</label>
                <select style={{ ...fi }} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}>
                  <option value="">選択してください</option>
                  {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div style={{ marginBottom: 22 }}>
              <label style={labelStyle}>メッセージ・質問など</label>
              <textarea style={{ ...fi, height: 120, resize: "vertical" }} placeholder="気になることや質問があればお気軽にどうぞ。「まずは話を聞いてみたい」だけでも大歓迎です。" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>
            {status === "error" && <p style={{ color: "var(--red)", fontSize: 13, textAlign: "center", marginBottom: 16 }}>送信に失敗しました。しばらく経ってから再度お試しいただくか、お電話でお問い合わせください。</p>}
            <button onClick={handleSubmit} disabled={status === "submitting"} style={{ width: "100%", padding: "18px 0", background: status === "submitting" ? "#c8c8c8" : "var(--red)", color: "var(--white)", border: "none", borderRadius: 6, fontSize: 15, fontWeight: 700, letterSpacing: "0.08em", cursor: status === "submitting" ? "not-allowed" : "pointer", fontFamily: "'Noto Sans JP', sans-serif", transition: "background 0.2s" }}>
              {status === "submitting" ? "送信中..." : "応募する・お問い合わせする"}
            </button>
            <p style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", marginTop: 16, lineHeight: 1.8 }}>送信後、担当者より2営業日以内にご連絡いたします。<br />個人情報は採用目的のみに使用いたします。</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <div className="cta-inner" style={{ background: "var(--blue)", padding: "80px 48px", textAlign: "center" }}>
      <Reveal direction="up">
        <h2 className="cta-title" style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 28, fontWeight: 700, color: "var(--white)", marginBottom: 12 }}>まずはお気軽にお問合せください</h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 32 }}>「興味はあるけど不安…」でも大丈夫。どんな疑問もお気軽にどうぞ。</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16 }} className="cta-btns">
          <a href="https://lin.ee/zOsdkEG" className="cta-btn" style={{ display: "inline-block", padding: "14px 40px", background: "#06c755", color: "var(--white)", fontWeight: 700, fontSize: 14, borderRadius: 6, textDecoration: "none", letterSpacing: "0.06em" }}>LINEで相談する</a>
          <a href="tel:0648625438" className="cta-btn" style={{ display: "inline-block", padding: "14px 40px", background: "transparent", color: "var(--white)", fontWeight: 700, fontSize: 14, borderRadius: 6, textDecoration: "none", border: "2px solid rgba(255,255,255,0.6)", letterSpacing: "0.06em" }}>電話で相談する</a>
        </div>
      </Reveal>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: "var(--text)", padding: "56px 48px", textAlign: "center" }}>
      <Reveal direction="up">
        <p style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 18, fontWeight: 600, color: "var(--white)", marginBottom: 20 }}>株式会社リクリエイト</p>
        <div className="footer-links" style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 20 }}>
          {["会社概要", "プライバシーポリシー", "お問い合わせ"].map(l => (
            <a key={l} href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>© 2026 株式会社リクリエイト. All Rights Reserved.</p>
      </Reveal>
    </footer>
  );
}

// 会社資料が社長から提出され次第、下記をtrueに変更するだけで掲載されます
const DOCS_READY = false;

export default function App() {
  return (
    <>
      <style>{globalStyle}</style>
      <style>{`html,body,#root{width:100%;max-width:100%;overflow-x:hidden;}`}</style>
      <Header />
      <main style={{ paddingTop: 0, width: "100%" }}>
        <Hero />
        <Concept />
        <Campaign />
        <Services />
        {DOCS_READY && <Docs />}
        <Features />
        <Schedule />
        <Voices />
        <Welfare />
        <Numbers />
        <Message />
        <Requirements />
        <Flow />
        <Jobs />
        <Contact />
        <ApplyForm />
      </main>
      <CTA />
      <Footer />
    </>
  );
}
