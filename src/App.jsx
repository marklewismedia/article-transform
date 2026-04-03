import { useState, useRef } from "react";
import { tokens } from "./tokens.js";
import { defaultArticle } from "./defaultArticle.js";
import {
  SummaryCard,
  ExplanationCard,
  PatternCard,
  TriggersCard,
  ActionCard,
  FullArticleCard,
} from "./cards.jsx";

function CardContent({ card, meta }) {
  switch (card.type) {
    case "summary":      return <SummaryCard      card={card} meta={meta} />;
    case "explanation":  return <ExplanationCard  card={card} meta={meta} />;
    case "pattern":      return <PatternCard      card={card} meta={meta} />;
    case "triggers":     return <TriggersCard     card={card} meta={meta} />;
    case "action":       return <ActionCard       card={card} meta={meta} />;
    case "full_article": return <FullArticleCard  card={card} meta={meta} />;
    default:             return null;
  }
}

export default function App() {
  const [current, setCurrent] = useState(0);
  const [anim, setAnim]       = useState(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const article = defaultArticle;
  const total   = article.cards.length;
  const meta    = article.metadata;

  const goTo = (index, dir) => {
    if (anim || index < 0 || index >= total) return;
    setAnim(dir);
    setTimeout(() => { setCurrent(index); setAnim(null); }, 240);
  };

  const next = () => goTo(current + 1, "left");
  const prev = () => goTo(current - 1, "right");

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (Math.abs(dx) > 44 && dy < 60) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  const cardStyle = {
    background: tokens.cardBg,
    borderRadius: "18px",
    padding: "22px 20px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    boxShadow: `0 3px 24px rgba(30,43,58,0.10), 0 1px 4px rgba(30,43,58,0.05)`,
    border: `1px solid ${tokens.border}`,
    transform: anim === "left" ? "translateX(-50px)" : anim === "right" ? "translateX(50px)" : "translateX(0)",
    opacity: anim ? 0 : 1,
    transition: "transform 0.24s cubic-bezier(0.4,0,0.2,1), opacity 0.24s ease",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        :root {
          --serif: 'Playfair Display', Georgia, serif;
          --sans:  'Inter', system-ui, sans-serif;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: var(--sans);
          background: #E8E1D5;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        button { font-family: var(--sans); }
        ::-webkit-scrollbar { width: 0; }
      `}</style>

      <div style={{
        width: "390px", height: "844px",
        background: tokens.bg,
        display: "flex", flexDirection: "column",
        overflow: "hidden", fontFamily: "var(--sans)",
      }}>
        {/* Top bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 20px 12px", background: tokens.navy,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "30px", height: "30px", background: tokens.teal,
              borderRadius: "8px", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "14px",
            }}>🌿</div>
            <div>
              <div style={{ fontFamily: "var(--serif)", fontWeight: "700", fontSize: "14px", color: "white", lineHeight: "1" }}>
                EczemaSpace
              </div>
              <div style={{ fontSize: "9.5px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>
                Calm. Informed. Ready.
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {article.cards.map((_, i) => (
              <div
                key={i}
                onClick={() => goTo(i, i > current ? "left" : "right")}
                style={{
                  width: i === current ? "20px" : "6px",
                  height: "6px", borderRadius: "3px",
                  background: i === current
                    ? tokens.teal
                    : i < current
                    ? "rgba(255,255,255,0.3)"
                    : "rgba(255,255,255,0.15)",
                  transition: "all 0.3s ease", cursor: "pointer",
                }}
              />
            ))}
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginLeft: "3px" }}>
              {current + 1}/{total}
            </span>
          </div>
        </div>

        {/* Topic chip */}
        <div style={{ padding: "10px 20px 0" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            background: tokens.parchmentDark, border: `1px solid ${tokens.border}`,
            borderRadius: "4px", padding: "5px 11px",
            fontSize: "11.5px", color: tokens.body, fontWeight: "500",
          }}>
            <span>📰</span>
            <span style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {meta.title}
            </span>
            <span style={{ color: tokens.border, margin: "0 1px" }}>·</span>
            <span style={{ color: tokens.muted, whiteSpace: "nowrap" }}>{meta.source}</span>
          </div>
        </div>

        {/* Card */}
        <div
          style={{ flex: 1, padding: "10px 16px 0", display: "flex", flexDirection: "column" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div style={cardStyle}>
            <CardContent card={article.cards[current]} meta={meta} />
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", alignItems: "center", padding: "12px 20px 18px", gap: "12px" }}>
          <button onClick={prev} disabled={current === 0} style={{
            width: "44px", height: "44px", borderRadius: "50%",
            border: `1px solid ${tokens.border}`, background: "white",
            color: current === 0 ? tokens.border : tokens.body,
            fontSize: "16px", cursor: current === 0 ? "default" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "all 0.2s",
          }}>←</button>

          <div style={{ flex: 1, textAlign: "center" }}>
            {current === 0 && <span style={{ fontSize: "11px", color: tokens.muted }}>Swipe or tap → to continue</span>}
            {current > 0 && current < total - 1 && (
              <span style={{ fontSize: "11px", color: tokens.muted }}>
                {total - current - 1} card{total - current - 1 !== 1 ? "s" : ""} remaining
              </span>
            )}
            {current === total - 1 && <span style={{ fontSize: "11px", color: tokens.teal, fontWeight: "600" }}>End of sequence</span>}
          </div>

          <button onClick={next} disabled={current === total - 1} style={{
            width: "44px", height: "44px", borderRadius: "50%",
            border: "none",
            background: current === total - 1 ? tokens.border : tokens.navy,
            color: "white", fontSize: "16px",
            cursor: current === total - 1 ? "default" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "all 0.2s",
            boxShadow: current === total - 1 ? "none" : `0 4px 14px rgba(30,43,58,0.28)`,
          }}>→</button>
        </div>
      </div>
    </>
  );
}
