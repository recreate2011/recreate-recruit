import { useState, useEffect, useRef } from "react";

// ============================================================
// Scroll Reveal — カスタムフック & コンポーネント
// ============================================================
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
    up:    "translateY(36px)",
    down:  "translateY(-36px)",
    left:  "translateX(36px)",
    right: "translateX(-36px)",
    none:  "none",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0,0)" : dirMap[direction] || dirMap.up,
        transition: `opacity 0.7s cubic-bezier(.22,.68,0,1.1) ${delay}ms, transform 0.7s cubic-bezier(.22,.68,0,1.1) ${delay}ms`,
        willChange: "opacity, transform",
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}

// ============================================================
// Global styles
// ============================================================
const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Shippori+Mincho:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --blue: #3aacff;
    --blue-dark: #1a8fd4;
    --blue-pale: #e8f6ff;
    --blue-pale2: #c2e7ff;
    --warm: #faf5eb;
    --accent: #ffda2a;
    --accent-dark: #e6c400;
    --red: #d63031;
    --text: #1f1f1f;
    --text-light: #4a4a4a;
    --text-muted: #888888;
    --white: #fff;
    --border: #d8d8d8;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'Noto Sans JP', sans-serif; color: var(--text); background: var(--white); line-height: 1.8; font-size: 15px; }
  @keyframes bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(7px); } }

  section, header, footer, .cta-block { width: 100%; box-sizing: border-box; }
  .inner { max-width: 1120px; margin: 0 auto; padding: 0 48px; }

  @media (max-width: 768px) {
    .inner { padding: 0 24px; }
    header { padding: 0 20px !important; }
    header nav { display: none !important; }
    .hero-caption { left: 24px !important; bottom: 60px !important; }
    .hero-catch { font-size: 32px !important; }
    .slide-dots { left: 24px !important; }
    .concept-grid { grid-template-columns: 1fr !important; }
    .concept-img { min-height: 240px !important; }
    .concept-text { padding: 48px 24px !important; }
    section { padding: 72px 0 !important; }
    .svc-grid1 { grid-template-columns: 1fr !important; }
    .svc-grid2 { grid-template-columns: 1fr !important; max-width: 100% !important; }
    .docs-grid { grid-template-columns: 1fr !important; }
    .feat-item { grid-template-columns: 1fr !important; }
    .feat-item .feat-img { min-height: 180px !important; order: 0 !important; }
    .feat-item .feat-body { order: 1 !important; padding: 32px 24px !important; }
    .voices-grid { grid-template-columns: 1fr !important; }
    .welfare-grid { grid-template-columns: 1fr !important; }
    .num-grid { grid-template-columns: repeat(2,1fr) !important; }
    .flow-steps { grid-template-columns: repeat(2,1fr) !important; }
    .jobs-grid { grid-template-columns: 1fr !important; }
    .contact-grid { grid-template-columns: 1fr !important; }
    .campaign-box { padding: 32px 24px !important; }
    .cta-btns { flex-direction: column !important; align-items: center !important; }
  }
`;

// ============================================================
// 共通
// ============================================================
function SectionHeader({ en, title, desc }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 80 }}>
      <Reveal direction="up">
        <span style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--blue)", fontWeight: 500, textTransform: "uppercase", marginBottom: 10, display: "block" }}>{en}</span>
        <h2 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 34, fontWeight: 600, lineHeight: 1.4, color: "var(--text)", marginBottom: 14 }}>{title}</h2>
        <div style={{ width: 32, height: 2, background: "var(--accent)", margin: "0 auto" }} />
        {desc && <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 2, marginTop: 14 }}>{desc}</p>}
      </Reveal>
    </div>
  );
}

function PhotoPlaceholder({ width = 44, height = 44 }) {
  return (
    <div style={{ textAlign: "center", opacity: 0.28 }}>
      <svg width={width} height={height} viewBox="0 0 44 44" fill="none">
        <rect x="3" y="9" width="38" height="26" rx="3" stroke="#3aacff" strokeWidth="1.5" />
        <circle cx="16" cy="19" r="5" stroke="#3aacff" strokeWidth="1.5" />
        <path d="M5 34l10-9 7 6 6-5 11 8" stroke="#3aacff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <p style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--blue)", marginTop: 6 }}>写真（後日差し替え）</p>
    </div>
  );
}

// ============================================================
// Header
// ============================================================
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "コンセプト", href: "#concept" },
    { label: "事業内容", href: "#services" },
    { label: "社員の声", href: "#voices" },
    { label: "募集職種", href: "#jobs" },
    { label: "会社情報", href: "#numbers" },
  ];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.82)",
      backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
      borderBottom: "1px solid rgba(224,216,228,0.5)",
      padding: "0 48px", height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "background 0.3s",
    }}>
      <a href="#" style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 19, fontWeight: 600, color: "var(--blue)", letterSpacing: "0.04em", textDecoration: "none" }}>
        株式会社リクリエイト
        <span style={{ fontSize: 10, display: "block", color: "var(--text-muted)", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 400, letterSpacing: "0.1em", marginTop: -1 }}>RECREATE Co., Ltd.</span>
      </a>
      <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {navLinks.map(l => (
          <a key={l.href} href={l.href} style={{ fontSize: 13, color: "var(--text-light)", textDecoration: "none", letterSpacing: "0.04em" }}>{l.label}</a>
        ))}
        <a href="#apply" style={{
          background: "var(--accent)", color: "var(--text)",
          padding: "8px 22px", borderRadius: 4,
          fontSize: 13, fontWeight: 700, letterSpacing: "0.04em",
          textDecoration: "none",
        }}>応募する</a>
      </nav>
    </header>
  );
}

// ============================================================
// Hero
// ============================================================
const heroSlides = [
  { img: "/images/heroslide1.jpg", en: "Safety makes people stronger" },
  { img: "/images/heroslide2.jpg", en: "Caring for those who care" },
  { img: "/images/heroslide3.jpg", en: "A place where trust is built" },
];

function Hero() {
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [heroIn, setHeroIn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => triggerNext((cur + 1) % heroSlides.length), 5500);
    return () => clearInterval(t);
  }, [cur, animating]);

  const triggerNext = (idx) => {
    if (animating || idx === cur) return;
    setPrev(cur);
    setAnimating(true);
    setCur(idx);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 1000);
  };

  return (
    <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      <style>{`
        @keyframes kenburns {
          from { transform: scale(1.08); }
          to   { transform: scale(1.0); }
        }
        @keyframes slideInFromRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0%); }
        }
      `}</style>

      {/* 前の画像（下に残る） */}
      {prev !== null && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <img src={heroSlides[prev].img} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      )}

      {/* 現在の画像（右から左へスライドイン） */}
      <div key={cur} style={{
        position: "absolute", inset: 0, zIndex: 2,
        animation: animating ? "slideInFromRight 1s cubic-bezier(0.77,0,0.18,1) forwards" : "none",
      }}>
        <img
          src={heroSlides[cur].img}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            animation: "kenburns 6s ease-out forwards",
          }}
        />
      </div>

      {/* テキスト（固定・最前面） */}
      <div style={{
        position: "absolute", bottom: 80, left: 80, zIndex: 10,
        opacity: heroIn ? 1 : 0,
        transform: heroIn ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s",
      }}>
        <p style={{
          fontSize: 15, fontWeight: 300, letterSpacing: "0.18em",
          color: "#fff", marginBottom: 12,
          fontStyle: "italic", fontFamily: "'Noto Sans JP', sans-serif",
          textAlign: "left",
        }}>
          {heroSlides[cur].en}
        </p>
        <h1 style={{
          fontFamily: "'Shippori Mincho', serif",
          fontSize: "clamp(62px, 7vw, 96px)",
          fontWeight: 700, lineHeight: 1.35,
          color: "var(--text)", letterSpacing: "0.04em",
          textShadow: "0 2px 24px rgba(255,255,255,0.95)",
          textAlign: "left",
        }}>
          <em style={{ fontStyle: "normal", color: "#e6c400" }}>安心</em>が<br />人を強くする
        </h1>
      </div>

      {/* ドットインジケーター */}
      <div style={{
        position: "absolute", bottom: 36, left: 80, zIndex: 10, display: "flex", gap: 10,
        opacity: heroIn ? 1 : 0, transition: "opacity 0.9s ease 0.8s",
      }}>
        {heroSlides.map((_, i) => (
          <div key={i} onClick={() => triggerNext(i)} style={{
            width: i === cur ? 52 : 28, height: 2,
            background: i === cur ? "var(--accent)" : "rgba(83,70,89,0.18)",
            cursor: "pointer", transition: "all 0.3s",
          }} />
        ))}
      </div>

      {/* SCROLLアイコン */}
      <div style={{ position: "absolute", bottom: 32, right: 48, zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 5, color: "rgba(83,70,89,0.45)", fontSize: 9, letterSpacing: "0.18em", animation: "bob 2s infinite" }}>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none"><rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" /><circle cx="8" cy="8" r="2" fill="currentColor" /></svg>
        SCROLL
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "30%", background: "linear-gradient(to top, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 100%)", zIndex: 5, pointerEvents: "none" }} />
    </section>
  );
}
// ============================================================
// Concept
// ============================================================
function Concept() {
  return (
    <section id="concept" style={{ background: "var(--white)", padding: "160px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 640 }} className="concept-grid">
        <div style={{ padding: "0 80px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} className="concept-text">
          <Reveal direction="right" style={{ maxWidth: 420 }}>
            <span style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--blue)", fontWeight: 500, textTransform: "uppercase", marginBottom: 18, display: "block" }}>CONCEPT</span>
            <h2 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 34, fontWeight: 700, lineHeight: 1.55, color: "var(--text)", marginBottom: 32 }}>
              すべての人が<em style={{ fontStyle: "normal", color: "#e6c400" }}>活き活き</em><br />
              <span style={{ color: "#6b7280" }}>暮らせる社会を創る</span>
            </h2>
            <p style={{ fontSize: 18, color: "var(--text-light)", lineHeight: 2.3 }}>
              スタッフ一人ひとりが誇りを持って働くことが、目の前の利用者さんの暮らしを変えていく。リクリエイトはその連鎖を本気で信じて、キャリアと給与と環境を整えてきました。あなたの力が、だれかの人生に灯りをともす。そんな仕事がここにあります。
            </p>
          </Reveal>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "var(--white)", padding: "40px" }} className="concept-img">
          <Reveal direction="left" style={{ position: "relative", width: "55%", aspectRatio: "3/4", overflow: "hidden", borderRadius: 8 }}>
            <img src="/images/concept.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Campaign
// ============================================================
function Campaign() {
  return (
    <section style={{ background: "var(--warm)", paddingTop: 240, paddingBottom: 200 }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 48px" }}>
        <Reveal direction="up">
          <div style={{ background: "var(--red)", padding: "48px 64px", textAlign: "center" }} className="campaign-box">
            <h2 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 30, fontWeight: 700, color: "var(--white)", marginBottom: 16, letterSpacing: "0.04em" }}>入職お祝いキャンペーン実施中</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.9)", lineHeight: 2 }}>
              このページからご応募いただき入職に繋がった方には<br />
              <span style={{ fontSize: 18, fontWeight: 700, color: "var(--accent)", display: "block", marginTop: 6 }}>入職祝い金10万円をプレゼント！</span>
            </p>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
            <a href="#jobs" style={{
              display: "inline-block", padding: "18px 72px",
              background: "var(--white)", color: "var(--red)",
              fontSize: 15, fontWeight: 700, letterSpacing: "0.08em",
              textDecoration: "none", borderRadius: 6,
              border: "2px solid var(--red)",
            }}>募集要項はコチラ</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
// Services
// ============================================================
const services = [
  { name: "訪問介護", en: "Home Care", img: "/images/service1.jpg" },
  { name: "訪問看護", en: "Home Nursing", img: "/images/service2.jpg" },
  { name: "居宅介護支援", en: "Care Management", img: "/images/service4.jpg" },
  { name: "シェアハウス", en: "Share House", img: "/images/service5.jpg" },
  { name: "相談支援", en: "Consulting", img: "/images/service3.jpg" },
];

function Services() {
  return (
    <section id="services" style={{ background: "var(--white)", padding: "144px 0" }}>
      <div className="inner">
        <SectionHeader en="SERVICES" title="事業内容" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 20 }}>
          {services.slice(0, 3).map((s, i) => (
            <Reveal key={s.name} delay={i * 100}>
              <ServiceCard {...s} />
            </Reveal>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, maxWidth: "calc(66.66% + 10px)", margin: "0 auto" }}>
          {services.slice(3).map((s, i) => (
            <Reveal key={s.name} delay={i * 100}>
              <ServiceCard {...s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ name, en, img }) {
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)", position: "relative", aspectRatio: "1/1" }}>
      <img src={img} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", padding: "18px 20px", background: "rgba(255,255,255,0.8)", textAlign: "center", boxSizing: "border-box" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>{name}</div>
        <span style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 400, letterSpacing: "0.1em", display: "block", marginTop: 3 }}>{en}</span>
      </div>
    </div>
  );
}

// ============================================================
// Docs
// ============================================================
const docs = ["説明資料", "人事評価資料", "給与表", "定性評価シート", "定量評価シート", "キャリア制度"];

function Docs() {
  return (
    <section style={{ background: "var(--warm)", padding: "120px 0" }}>
      <div className="inner">
        <SectionHeader en="DOCUMENTS" title="会社資料" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }} className="docs-grid">
          {docs.map((d, i) => (
            <Reveal key={d} delay={i * 60}>
              <a href="#" style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "var(--white)", border: "1px solid var(--border)", borderRadius: 6,
                padding: "18px 24px", textDecoration: "none", color: "var(--text)",
                fontSize: 14, fontWeight: 700, letterSpacing: "0.04em",
              }}>
                {d}
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>→</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Features
// ============================================================
const features = [
  {
    en: "WORK STYLE",
    title: "ライフスタイルが変化しても働き続けられる",
    img: "/images/ライフスタイルが変化しても働き続けられる.jpg",
    body: "残業がほぼなしで、有休消化率80%超の取得率があり仕事が終わってからのファミリータイムや休日は趣味や友人とのプライベートタイムをしっかり楽しめる社風があります。また資格取得支援の福利厚生を充実させているので、ひとりひとりのペースでキャリアアップを目指せます！",
  },
  {
    en: "SUPPORT",
    title: "安心の伴走型ステップアップ教育",
    img: "/images/安心の伴走型ステップアップ教育.jpg",
    body: "未経験の方やブランクがある方でも、基礎からしっかり学べる丁寧な研修プログラムをご用意しています。現場では先輩スタッフがマンツーマンでフォローする制度を取り入れているので、「何を聞けばいいか分からない」という不安もその場で解消！「見て覚えろ」ではなく、あなたのペースに合わせた指導で、自信を持って独り立ちできるまでチーム全員でバックアップします。",
  },
  {
    en: "CAREER",
    title: "５年後が見えるキャリアデザイン",
    img: "/images/５年後が見えるキャリアデザイン.jpg",
    body: "10年後も安心して働き続けられる「見える化」されたキャリアパスを用意しています。役職へのステップアップだけでなく、専門性を高めることで着実に昇給する仕組みがあるため、将来のライフプランも立てやすくなります。また現場での課題に対して法人全体で吸い上げ解決できるシステムを採用しているので、将来的な不安についても前向きに解決していきます。",
  },
];

function Features() {
  return (
    <section style={{ background: "var(--white)", padding: "144px 0" }}>
      <div className="inner">
        <SectionHeader en="WHY RECREATE" title="リクリエイトで働く理由" />
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {features.map((f, i) => (
            <Reveal key={f.en} direction={i % 2 === 0 ? "right" : "left"}>
              <div style={{
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "3fr 7fr" : "7fr 3fr",
                borderRadius: 14, overflow: "hidden", border: "1px solid var(--border)",
              }} className="feat-item">
                {i % 2 === 0 ? (
                  <>
                    <div style={{ overflow: "hidden", minHeight: 280 }} className="feat-img">
                      <img src={f.img} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                    <FeatureBody f={f} />
                  </>
                ) : (
                  <>
                    <FeatureBody f={f} />
                    <div style={{ overflow: "hidden", minHeight: 280 }} className="feat-img">
                      <img src={f.img} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                  </>
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
      <span style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--blue)", fontWeight: 500, marginBottom: 14, display: "block" }}>{f.en}</span>
      <h3 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 22, fontWeight: 600, color: "var(--text)", marginBottom: 16, lineHeight: 1.55 }}>{f.title}</h3>
      <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 2.1 }}>{f.body}</p>
    </div>
  );
}

// ============================================================
// Schedule
// ============================================================
const schedule = [
  { time: "08:30", title: "出勤・朝礼", body: "当日の訪問予定を確認。チームで情報共有を行います。" },
  { time: "09:00", title: "午前の訪問", body: "利用者様のご自宅を訪問。身体介護や生活援助を行います。" },
  { time: "12:00", title: "昼休憩", body: "事業所に戻り、記録入力と昼食をとります。" },
  { time: "13:00", title: "午後の訪問", body: "引き続き訪問業務。利用者様一人ひとりと丁寧に向き合います。" },
  { time: "17:00", title: "記録・退勤", body: "タブレットで記録を入力後、退勤。残業はほぼありません。" },
];

function Schedule() {
  return (
    <section style={{ background: "var(--warm)", padding: "144px 0" }}>
      <div className="inner">
        <SectionHeader en="A DAY IN THE LIFE" title="社員の1日" />
        <Reveal direction="up">
          <div style={{ maxWidth: 640, margin: "0 auto", background: "var(--white)", border: "1px solid var(--border)", borderRadius: 12, padding: 26 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", textAlign: "center", marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
              介護職 Aさん（30代・女性）の1日
            </p>
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

// ============================================================
// Voices
// ============================================================
const voices = [
  { name: "田中 さくら", role: "介護職 / 入社3年目", img: "/images/スタッフの声(赤).jpg", text: "未経験でも丁寧に教えてもらえました。今では資格も取得して、自分の成長を実感しています。" },
  { name: "鈴木 健太", role: "訪問看護師 / 入社5年目", img: "/images/スタッフの声(青).jpg", text: "チームの雰囲気がとても良く、困ったときは必ず誰かが助けてくれます。働きやすい職場です。" },
  { name: "山本 あかね", role: "介護職 / 入社1年目", img: "/images/スタッフの声(赤).jpg", text: "育児との両立を心配していましたが、シフトの融通が利いて助かっています。" },
];

function Voices() {
  return (
    <section id="voices" style={{ background: "var(--warm)", padding: "144px 0" }}>
      <div className="inner">
        <SectionHeader en="STAFF VOICES" title="先輩の声" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="voices-grid">
          {voices.map((v, i) => (
            <Reveal key={v.name} delay={i * 120}>
              <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", background: "var(--white)" }}>
                <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                  <img src={v.img} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ padding: 24 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 2, textAlign: "center" }}>{v.name}</p>
                  <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 14, textAlign: "center" }}>{v.role}</p>
                  <p style={{ fontSize: 13, color: "var(--text-light)", lineHeight: 1.9 }}>{v.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Welfare
// ============================================================
const welfare = [
  { badge: "最大20万円", title: "引越し補助", img: "/images/引越し.jpg" },
  { badge: "費用全額負担", title: "資格取得支援", img: "/images/資格.jpg" },
  { badge: "無料貸与", title: "制服・電動自転車貸与", img: "/images/電動自転車.jpg" },
];

function Welfare() {
  return (
    <section style={{ background: "var(--white)", padding: "144px 0" }}>
      <div className="inner">
        <SectionHeader en="WELFARE" title="福利厚生" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="welfare-grid">
          {welfare.map((w, i) => (
            <Reveal key={w.title} delay={i * 120}>
              <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)" }}>
                <div style={{ position: "relative", aspectRatio: "4/3" }}>
                  <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
                    <img src={w.img} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top,rgba(83,70,89,0.72) 0%,rgba(83,70,89,0.08) 60%,transparent 100%)",
                    display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 22,
                  }}>
                    <span style={{ display: "inline-block", background: "var(--accent)", color: "var(--text)", fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 3, marginBottom: 7, alignSelf: "flex-start" }}>{w.badge}</span>
                    <p style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 17, fontWeight: 700, color: "var(--white)", lineHeight: 1.4 }}>{w.title}</p>
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

// ============================================================
// Numbers
// ============================================================
const numbers = [
  { val: "2013", unit: "年", label: "設立", icon: "/images/企業設立.png" },
  { val: "約70", unit: "名", label: "スタッフ数", icon: "/images/社員数.png" },
  { val: "43", unit: "歳", label: "平均年齢", icon: "/images/年齢.png" },
  { val: "5:5", unit: "", label: "男女比", icon: "/images/男女比.png" },
];

function Numbers() {
  return (
    <section id="numbers" style={{ background: "var(--blue)", padding: "120px 0" }}>
      <div className="inner">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <Reveal direction="up">
            <span style={{ fontSize: 10, letterSpacing: "0.22em", color: "rgba(255,255,255,0.6)", fontWeight: 500, textTransform: "uppercase", marginBottom: 10, display: "block" }}>NUMBERS</span>
            <h2 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 34, fontWeight: 600, lineHeight: 1.4, color: "var(--white)", marginBottom: 14 }}>数字で見るリクリエイト</h2>
            <div style={{ width: 32, height: 2, background: "var(--accent)", margin: "0 auto" }} />
          </Reveal>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="num-grid">
          {numbers.map((n, i) => (
            <Reveal key={n.label} delay={i * 100}>
              <div style={{
                background: "rgba(255,255,255,0.1)", borderRadius: 12,
                padding: "36px 20px 32px", textAlign: "center",
                border: "1px solid rgba(255,255,255,0.15)",
              }}>
                <div style={{ width: 72, height: 72, margin: "0 auto 20px" }}>
                  <img src={n.icon} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <div style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 42, fontWeight: 600, color: "var(--white)", lineHeight: 1, marginBottom: 8 }}>
                  {n.val}<span style={{ fontSize: 17, fontWeight: 400 }}>{n.unit}</span>
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", letterSpacing: "0.08em" }}>{n.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Message
// ============================================================
function Message() {
  return (
    <section style={{ background: "var(--warm)", padding: "144px 0" }}>
      <div className="inner">
        <SectionHeader en="MESSAGE" title="一緒に働きませんか？" />
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <Reveal direction="up">
            <div style={{ width: 160, height: 200, borderRadius: 12, overflow: "hidden", margin: "0 auto 24px", border: "1px solid var(--border)" }}>
              <img src="/images/代表メッセージ.png" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <p style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>小林 祥次</p>
            <p style={{ fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.08em", marginBottom: 32 }}>代表取締役 ／ 株式会社リクリエイト</p>
          </Reveal>
          <Reveal direction="up" delay={150}>
            <h3 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 24, fontWeight: 600, color: "var(--text)", lineHeight: 1.65, marginBottom: 24 }}>業界の社会的ステータスを<br />次のステージへ</h3>
            <p style={{ fontSize: 16, color: "var(--text-light)", lineHeight: 2.2, textAlign: "left" }}>
              介護という仕事が、もっと誇らしい職業になる社会をつくりたい。リクリエイトを立ち上げたとき、それが私の出発点でした。<br /><br />
              この仕事には、人の人生を変える力があります。目の前の一人に誠実に向き合うことで、その人の5年後、10年後が本当に変わっていく。私はそれを、この仕事を通じて何度も目の当たりにしてきました。<br /><br />
              だからこそ、この仕事に関わる人たちが、胸を張って生きていける社会にしたい。給与が上がり、キャリアが見え、プライベートも充実できる。介護や看護の仕事でそれが当たり前になる日を、リクリエイトはつくっていきます。
              ここで働くあなた一人ひとりの姿が、この業界の未来を変えていくと、私は本気で信じています。<br /><br />
              経験・資格の有無は問いません。一人ひとりのペースに合わせてサポートします。ライフスタイルが変わっても、長く働き続けられる職場をつくることが、私たちの約束です。
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Requirements
// ============================================================
const requirements = [
  "経験年数・年齢は問いません",
  "ひとりひとりの利用者との時間を大切にしたい",
  "安心できる環境で長く働きたい",
  "チームで介護福祉の質を高めたい",
  "素直な人",
];

function Requirements() {
  return (
    <section style={{ background: "var(--white)", padding: "72px 0" }}>
      <div className="inner">
        <SectionHeader en="IDEAL CANDIDATE" title="こんな人を求めています" />
        <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: 0, border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
          {requirements.map((r, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 20, padding: "16px 28px", borderBottom: i < requirements.length - 1 ? "1px solid var(--border)" : "none", background: "var(--white)" }}>
                <div style={{ width: 28, height: 28, background: "var(--blue)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "white", fontSize: 12, fontWeight: 700, marginTop: 2 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.7, fontWeight: 500 }}>{r}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Flow
// ============================================================
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
        <SectionHeader en="HIRING PROCESS" title="採用までの流れ" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="flow-steps">
          {flowSteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 12, padding: "36px 24px 32px", textAlign: "center" }}>
                <p style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 32, fontWeight: 600, color: "#c8c8c8", lineHeight: 1, marginBottom: 16 }}>{s.n}</p>
                <div style={{ width: 64, height: 64, margin: "0 auto 16px" }}>
                  <img src={s.icon} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>{s.title}</h4>
                <p style={{ fontSize: 12, color: "var(--text-light)", lineHeight: 1.75 }}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Jobs
// ============================================================
const jobs = [
  {
    title: "介護職 / ヘルパー", type: "正社員", sal: "月給 279,020円〜", dark: false,
    table: [
      { th: "資格", td: ["介護福祉士優遇", "初任者研修優遇", "無資格歓迎"], tags: true },
      { th: "勤務地", td: ["庄内事業所"] },
      { th: "勤務時間", td: ["8:30〜17:30（休憩60分）"] },
      { th: "休日", td: ["完全週休2日制（土日祝）", "有給・夏季冬季・慶弔休暇"] },
    ],
    salRows: [
      { label: "基本給", val: "178,000円" },
      { label: "訪問手当", val: "40,000円" },
      { label: "処遇体制加算", val: "45,000円" },
      { label: "固定残業手当", val: "16,020円" },
    ],
    total: "279,020円〜",
  },
  {
    title: "看護師", type: "正社員", sal: "月給 379,098円〜", dark: true,
    table: [
      { th: "資格", td: ["正看護師資格（必須）"], tags: true },
      { th: "仕事内容", td: ["訪問看護業務全般", "病状観察・リハビリ・タブレット記録など"] },
      { th: "勤務地", td: ["庄内事業所"] },
      { th: "勤務時間", td: ["8:30〜17:30（直行直帰相談可）", "オンコールあり（緊急訪問手当あり）"] },
      { th: "休日", td: ["完全週休2日制（土日祝）", "有給・夏季冬季・慶弔休暇"] },
    ],
    salRows: [
      { label: "基本給", val: "178,000円" },
      { label: "訪問手当", val: "44,000円" },
      { label: "職務手当", val: "70,000円" },
      { label: "処遇改善加算", val: "45,000円" },
      { label: "固定残業手当", val: "42,098円" },
    ],
    total: "379,098円〜",
  },
];

function Jobs() {
  return (
    <section id="jobs" style={{ background: "var(--white)", padding: "144px 0" }}>
      <div className="inner">
        <SectionHeader en="OPEN POSITIONS" title="募集中の職種" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }} className="jobs-grid">
          {jobs.map((j, i) => (
            <Reveal key={j.title} delay={i * 140} direction={i % 2 === 0 ? "right" : "left"}>
              <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ background: j.dark ? "var(--blue-dark)" : "var(--blue)", padding: "28px 32px", color: "var(--white)" }}>
                  <span style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.4)", color: "var(--white)", fontSize: 10, padding: "3px 12px", borderRadius: 3, marginBottom: 12, letterSpacing: "0.06em" }}>{j.type}</span>
                  <h3 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 24, fontWeight: 600, marginBottom: 6 }}>{j.title}</h3>
                  <p style={{ fontSize: 13, opacity: 0.82 }}>{j.sal}</p>
                </div>
                <div style={{ padding: "28px 32px" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      {j.table.map(row => (
                        <tr key={row.th} style={{ borderBottom: "1px solid var(--border)" }}>
                          <th style={{ textAlign: "left", fontSize: 12, fontWeight: 500, color: "var(--text-muted)", padding: "10px 0", width: 96, verticalAlign: "top" }}>{row.th}</th>
                          <td style={{ fontSize: 13, color: "var(--text)", padding: "10px 0 10px 12px", lineHeight: 1.75 }}>
                            {row.tags
                              ? row.td.map((t, i) => <span key={i} style={{ display: "inline-block", background: "var(--blue-pale)", color: "var(--blue)", fontSize: 11, padding: "2px 10px", borderRadius: 3, margin: "2px 2px 2px 0" }}>{t}</span>)
                              : row.td.map((t, i) => <span key={i}>{t}{i < row.td.length - 1 ? <br /> : null}</span>)
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ background: "#fffbe0", borderLeft: "3px solid var(--accent)", padding: "14px 18px", marginTop: 14, borderRadius: 4 }}>
                    <h5 style={{ fontSize: 10, color: "#8a7000", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 8 }}>給与内訳</h5>
                    {j.salRows.map(r => (
                      <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", color: "var(--text-light)", borderBottom: "1px solid rgba(255,218,42,0.2)", fontSize: 12 }}>
                        <span>{r.label}</span><span>{r.val}</span>
                      </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0 0", fontWeight: 700, color: "var(--text)", fontSize: 14, marginTop: 4 }}>
                      <span>合計</span><span>{j.total}</span>
                    </div>
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

// ============================================================
// Contact
// ============================================================
function Contact() {
  return (
    <section style={{ background: "var(--warm)", padding: "144px 0" }}>
      <div className="inner">
        <SectionHeader en="CONTACT" title="ご応募はコチラ" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="contact-grid">
          {[
            { ico: "LINE", val: "LINEで問い合わせる", sub: "24時間受付中", href: "https://lin.ee/zOsdkEG", bg: "#7cc98a", border: "1.5px solid #5aaa68", textColor: "#fff" },
            { ico: "FORM", val: "WEB応募フォーム", sub: "24時間受付中", href: "#apply", bg: "#e89090", border: "1.5px solid #c97070", textColor: "#fff" },
            { ico: "TEL", val: "お電話での応募", sub: "平日 9:00〜17:30", href: "tel:0648625438", bg: "#f0d878", border: "1.5px solid #c9b050", textColor: "#fff" },
          ].map((c, i) => (
            <Reveal key={c.ico} delay={i * 100}>
              <a href={c.href} style={{ padding: "36px 28px", textAlign: "center", borderRadius: 10, textDecoration: "none", display: "block", background: c.bg, border: c.border, color: c.textColor }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: c.textColor, letterSpacing: "0.1em", marginBottom: 14, display: "block", textShadow: "0 1px 4px rgba(0,0,0,0.28), 0 0px 10px rgba(0,0,0,0.14)" }}>{c.ico}</span>
                <p style={{ fontSize: 15, fontWeight: 700, color: c.textColor, textShadow: "0 1px 4px rgba(0,0,0,0.28), 0 0px 10px rgba(0,0,0,0.14)" }}>{c.val}</p>
                {c.sub && <p style={{ fontSize: 12, color: "#fff", opacity: 0.9, marginTop: 4, textShadow: "0 1px 3px rgba(0,0,0,0.22)" }}>{c.sub}</p>}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Form
// ============================================================
function ApplyForm() {
  const [form, setForm] = useState({ name: "", kana: "", tel: "", email: "", job: "", cert: "", timing: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const fi = { width: "100%", padding: "12px 16px", border: "1px solid var(--border)", borderRadius: 6, fontSize: 14, fontFamily: "'Noto Sans JP', sans-serif", color: "var(--text)", outline: "none" };
  const labelStyle = { display: "block", fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 8, letterSpacing: "0.04em" };
  const req = { display: "inline-block", background: "var(--red)", color: "var(--white)", fontSize: 10, padding: "1px 8px", borderRadius: 3, marginLeft: 8, verticalAlign: "middle" };

  if (submitted) {
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
        <SectionHeader en="APPLY" title="応募フォーム" desc="必要事項をご記入の上、送信してください。担当者より2営業日以内にご連絡いたします。" />
        <Reveal direction="up">
          <div style={{ maxWidth: 640, margin: "0 auto", background: "var(--warm)", border: "1px solid var(--border)", borderRadius: 14, padding: "52px 56px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 22 }}>
              <div>
                <label style={labelStyle}>お名前<span style={req}>必須</span></label>
                <input style={fi} type="text" placeholder="山田 太郎" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>フリガナ<span style={req}>必須</span></label>
                <input style={fi} type="text" placeholder="ヤマダ タロウ" value={form.kana} onChange={e => setForm({ ...form, kana: e.target.value })} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 22 }}>
              <div>
                <label style={labelStyle}>電話番号<span style={req}>必須</span></label>
                <input style={fi} type="tel" placeholder="090-0000-0000" value={form.tel} onChange={e => setForm({ ...form, tel: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>メールアドレス<span style={req}>必須</span></label>
                <input style={fi} type="email" placeholder="example@mail.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            {[
              { label: "希望職種", req: true, key: "job", opts: ["介護職 / ヘルパー", "看護師", "その他・未定"] },
              { label: "資格・経験", req: false, key: "cert", opts: ["介護福祉士", "介護職員初任者研修修了", "正看護師", "准看護師", "無資格・未経験"] },
              { label: "希望勤務開始時期", req: false, key: "timing", opts: ["すぐにでも", "1ヶ月以内", "3ヶ月以内", "未定・相談したい"] },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 22 }}>
                <label style={labelStyle}>{f.label}{f.req && <span style={req}>必須</span>}</label>
                <select style={{ ...fi, background: "var(--white)" }} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}>
                  <option value="">選択してください</option>
                  {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div style={{ marginBottom: 22 }}>
              <label style={labelStyle}>メッセージ・質問など</label>
              <textarea style={{ ...fi, height: 120, resize: "vertical" }} placeholder="気になることや質問があればお気軽にどうぞ。「まずは話を聞いてみたい」だけでも大歓迎です。" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>
            <button
              onClick={() => setSubmitted(true)}
              style={{
                width: "100%", padding: "18px 0",
                background: "var(--red)", color: "var(--white)",
                border: "none", borderRadius: 6,
                fontSize: 15, fontWeight: 700, letterSpacing: "0.08em",
                cursor: "pointer", fontFamily: "'Noto Sans JP', sans-serif",
              }}
            >
              応募する・お問い合わせする
            </button>
            <p style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", marginTop: 16, lineHeight: 1.8 }}>
              送信後、担当者より2営業日以内にご連絡いたします。<br />個人情報は採用目的のみに使用いたします。
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
// CTA
// ============================================================
function CTA() {
  return (
    <div style={{ background: "var(--blue)", padding: "80px 48px", textAlign: "center" }}>
      <Reveal direction="up">
        <h2 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 28, fontWeight: 700, color: "var(--white)", marginBottom: 12 }}>まずはお気軽にお問合せください</h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 32 }}>「興味はあるけど不安…」でも大丈夫。どんな疑問もお気軽にどうぞ。</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16 }} className="cta-btns">
          <a href="https://lin.ee/zOsdkEG" style={{ display: "inline-block", padding: "14px 40px", background: "#06c755", color: "var(--white)", fontWeight: 700, fontSize: 14, borderRadius: 6, textDecoration: "none", letterSpacing: "0.06em" }}>LINEで相談する</a>
          <a href="tel:0648625438" style={{ display: "inline-block", padding: "14px 40px", background: "transparent", color: "var(--white)", fontWeight: 700, fontSize: 14, borderRadius: 6, textDecoration: "none", border: "2px solid rgba(255,255,255,0.6)", letterSpacing: "0.06em" }}>電話で相談する</a>
        </div>
      </Reveal>
    </div>
  );
}

// ============================================================
// Footer
// ============================================================
function Footer() {
  return (
    <footer style={{ background: "var(--text)", padding: "56px 48px", textAlign: "center" }}>
      <Reveal direction="up">
        <p style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 18, fontWeight: 600, color: "var(--white)", marginBottom: 20 }}>株式会社リクリエイト</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 20 }}>
          {["会社概要", "プライバシーポリシー", "お問い合わせ"].map(l => (
            <a key={l} href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>© 2026 株式会社リクリエイト. All Rights Reserved.</p>
      </Reveal>
    </footer>
  );
}

// ============================================================
// App Root
// ============================================================
export default function App() {
  return (
    <>
      <style>{globalStyle}</style>
      <style>{`html,body,#root{width:100%;max-width:100%;overflow-x:hidden;}`}</style>
      <Header />
      <main style={{ paddingTop: 64, width: "100%" }}>
        <Hero />
        <Concept />
        <Campaign />
        <Services />
        <Docs />
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
