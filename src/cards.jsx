import { tokens } from "./tokens.js";
import { Tag, Trust } from "./ui.jsx";

// ── Small SVG icons — geometric, muted, on-brand ──────────────────────────────
// No emojis. Clean line icons that match the editorial health aesthetic.

function Icon({ name, size = 16, color = tokens.teal }) {
  const s = { width: size, height: size, flexShrink: 0 };
  switch (name) {
    case "check":
      return <svg style={s} viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="1.2"/>
        <path d="M5 8l2 2 4-4" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>;
    case "arrow-right":
      return <svg style={s} viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M9 4l4 4-4 4" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>;
    case "dot":
      return <svg style={{ ...s, width: 8, height: 8, marginTop: 5 }} viewBox="0 0 8 8" fill="none">
        <circle cx="4" cy="4" r="3" fill={color}/>
      </svg>;
    case "dash":
      return <svg style={{ ...s, width: 12, height: 2, marginTop: 8 }} viewBox="0 0 12 2" fill="none">
        <path d="M1 1h10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>;
    case "loop":
      return <svg style={s} viewBox="0 0 16 16" fill="none">
        <path d="M2 8a6 6 0 1 0 6-6" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M5 5L2 8l3 3" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>;
    case "shield":
      return <svg style={s} viewBox="0 0 16 16" fill="none">
        <path d="M8 2l5 2v4c0 3-2.5 5-5 6C5.5 13 3 11 3 8V4l5-2z" stroke={color} strokeWidth="1.2"/>
        <path d="M5.5 8l1.5 1.5 3-3" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>;
    case "book":
      return <svg style={s} viewBox="0 0 16 16" fill="none">
        <path d="M3 3h4c.6 0 1 .4 1 1v8c0-.6-.4-1-1-1H3V3z" stroke={color} strokeWidth="1.2"/>
        <path d="M13 3H9c-.6 0-1 .4-1 1v8c0-.6.4-1 1-1h4V3z" stroke={color} strokeWidth="1.2"/>
      </svg>;
    default:
      return null;
  }
}

// ── Source attribution block — shown prominently on every card ─────────────────
function VerwellMindLogo({ height = 15 }) {
  return (
    <svg height={height} viewBox="0 0 130 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0 }}>
      <path d="M2 9 C2 4.5 5.5 2 9 2 C9 2 9 9 4 13 C2.5 11.5 2 10.5 2 9Z" fill="#00A499"/>
      <path d="M9 2 C12.5 2 16 4.5 16 9 C16 10.5 15.5 11.5 14 13 C9 9 9 2 9 2Z" fill="#004B45"/>
      <text x="22" y="13.5" fontFamily="Georgia, serif" fontSize="11.5" fontWeight="700" fill="#1E2B3A" letterSpacing="-0.3">Verywell Mind</text>
    </svg>
  );
}

function SourceLine({ meta }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "8px",
      marginBottom: "14px",
      paddingBottom: "12px",
      borderBottom: `1px solid ${tokens.border}`,
    }}>
      <VerwellMindLogo height={15} />
      {meta.reviewedBy && (
        <span style={{ fontSize: "11px", color: tokens.muted, fontFamily: "var(--sans)" }}>
          · Reviewed by {meta.reviewedBy}
        </span>
      )}
    </div>
  );
}

// ── Card 1: Summary ────────────────────────────────────────────────────────────
export function SummaryCard({ card, meta }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <SourceLine meta={meta} />
      <Tag label={card.tag} />
      <h2 style={{
        fontSize: "24px", fontFamily: "var(--serif)", fontWeight: "700",
        lineHeight: "1.28", color: tokens.ink, margin: "0 0 16px", letterSpacing: "-0.3px",
      }}>
        {card.headline}
      </h2>
      <p style={{
        fontSize: "15px", lineHeight: "1.7", color: tokens.body,
        margin: "0 0 18px", fontFamily: "var(--sans)",
      }}>
        {card.body}
      </p>
      <div style={{
        background: tokens.parchmentDark,
        borderLeft: `2px solid ${tokens.teal}`,
        borderRadius: "0 6px 6px 0",
        padding: "12px 14px",
        fontSize: "13px", color: tokens.body, lineHeight: "1.6",
        fontFamily: "var(--sans)", fontStyle: "italic",
      }}>
        {card.hint}
      </div>
      <Trust text={`Reviewed by ${meta.reviewedBy}${meta.reviewedRole ? `, ${meta.reviewedRole}` : ""}`} />
    </div>
  );
}

// ── Card 2: Explanation ────────────────────────────────────────────────────────
export function ExplanationCard({ card, meta }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <SourceLine meta={meta} />
      <Tag label={card.tag} />
      <h2 style={{
        fontSize: "21px", fontFamily: "var(--serif)", fontWeight: "700",
        lineHeight: "1.3", color: tokens.ink, margin: "0 0 12px",
      }}>
        {card.headline}
      </h2>
      <p style={{
        fontSize: "13px", color: tokens.muted, marginBottom: "14px",
        lineHeight: "1.5", fontFamily: "var(--sans)",
      }}>
        {card.intro}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
        {(card.bullets || []).map((b, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: "11px",
            padding: "11px 13px",
            background: tokens.cardAlt,
            borderRadius: "6px",
          }}>
            <span style={{
              minWidth: "18px", height: "18px",
              border: `1px solid ${tokens.teal}`,
              color: tokens.teal,
              borderRadius: "2px",
              fontSize: "9px", fontWeight: "700",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginTop: "2px", flexShrink: 0, fontFamily: "var(--sans)",
              letterSpacing: "0",
            }}>
              {i + 1}
            </span>
            <span style={{ fontSize: "13px", color: tokens.body, lineHeight: "1.55", fontFamily: "var(--sans)" }}>
              {b}
            </span>
          </div>
        ))}
      </div>
      <Trust text="Based on peer-reviewed research" />
    </div>
  );
}

// ── Card 3: Pattern / Cycle ────────────────────────────────────────────────────
export function PatternCard({ card, meta }) {
  const steps = card.steps || [];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <SourceLine meta={meta} />
      <Tag label={card.tag} />
      <h2 style={{
        fontSize: "21px", fontFamily: "var(--serif)", fontWeight: "700",
        lineHeight: "1.3", color: tokens.ink, margin: "0 0 16px",
      }}>
        {card.headline}
      </h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              width: "100%", padding: "10px 14px",
              background: i === 0 ? tokens.navy
                : i === steps.length - 1 ? tokens.roseLight
                : tokens.cardAlt,
              borderRadius: "6px",
              border: i === steps.length - 1 ? `1px solid ${tokens.rose}` : "none",
            }}>
              {/* Step number instead of emoji */}
              <span style={{
                minWidth: "22px", height: "22px",
                border: `1px solid ${i === 0 ? "rgba(255,255,255,0.3)" : i === steps.length - 1 ? tokens.rose : tokens.tealBorder}`,
                borderRadius: "2px",
                fontSize: "9px", fontWeight: "700",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, fontFamily: "var(--sans)",
                color: i === 0 ? "rgba(255,255,255,0.6)" : i === steps.length - 1 ? tokens.rose : tokens.teal,
              }}>
                {i + 1}
              </span>
              <span style={{
                fontSize: "13px",
                fontWeight: (i === 0 || i === steps.length - 1) ? "600" : "400",
                color: i === 0 ? "white"
                  : i === steps.length - 1 ? tokens.rose
                  : tokens.body,
                fontFamily: "var(--sans)",
                flex: 1,
              }}>
                {step.label}
              </span>
              {i === steps.length - 1 && (
                <Icon name="loop" size={14} color={tokens.rose} />
              )}
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: "1px", height: "6px", background: tokens.tealBorder }} />
            )}
          </div>
        ))}
      </div>
      {card.note && (
        <div style={{
          marginTop: "12px", padding: "11px 13px",
          background: tokens.parchmentDark, borderRadius: "6px",
          fontSize: "12px", color: tokens.body, lineHeight: "1.55",
          fontFamily: "var(--sans)", fontStyle: "italic",
        }}>
          {card.note}
        </div>
      )}
      <Trust text={`From: ${meta.title} — ${meta.source}`} />
    </div>
  );
}

// ── Card 4: Triggers ───────────────────────────────────────────────────────────
export function TriggersCard({ card, meta }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <SourceLine meta={meta} />
      <Tag label={card.tag} />
      <h2 style={{
        fontSize: "21px", fontFamily: "var(--serif)", fontWeight: "700",
        lineHeight: "1.3", color: tokens.ink, margin: "0 0 16px",
      }}>
        {card.headline}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {(card.groups || []).map((group, gi) => (
          <div key={gi}>
            <div style={{
              fontSize: "10px", fontWeight: "700", letterSpacing: "1.2px",
              textTransform: "uppercase",
              color: gi === 0 ? tokens.teal : tokens.rose,
              marginBottom: "7px", fontFamily: "var(--sans)",
            }}>
              {group.label}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {(group.items || []).map((item, ii) => (
                <div key={ii} style={{
                  display: "flex", alignItems: "flex-start", gap: "10px",
                  padding: "9px 13px",
                  background: gi === 0 ? tokens.tealLight : tokens.roseLight,
                  borderRadius: "6px",
                }}>
                  <Icon name="dash" color={gi === 0 ? tokens.teal : tokens.rose} />
                  <span style={{ fontSize: "13px", color: tokens.body, fontFamily: "var(--sans)", lineHeight: "1.5" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Trust text={`Source: ${meta.source}`} />
    </div>
  );
}

// ── Card 5: Action ─────────────────────────────────────────────────────────────
export function ActionCard({ card, meta }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <SourceLine meta={meta} />
      <Tag label={card.tag} />
      <h2 style={{
        fontSize: "21px", fontFamily: "var(--serif)", fontWeight: "700",
        lineHeight: "1.3", color: tokens.ink, margin: "0 0 12px",
      }}>
        {card.headline}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "7px", overflowY: "auto" }}>
        {(card.actions || []).map((a, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: "12px",
            padding: "11px 13px",
            background: tokens.cardAlt,
            borderRadius: "6px",
          }}>
            <Icon name="check" size={16} color={tokens.teal} />
            <div style={{ marginTop: "-1px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: tokens.ink, marginBottom: "3px", fontFamily: "var(--sans)" }}>
                {a.title}
              </div>
              <div style={{ fontSize: "12px", color: tokens.muted, lineHeight: "1.5", fontFamily: "var(--sans)" }}>
                {a.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Trust text={`Source: ${meta.title} — ${meta.source}`} />
    </div>
  );
}

// ── Card 6: Full article CTA ───────────────────────────────────────────────────
export function FullArticleCard({ card, meta }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Dark header */}
      <div style={{
        background: tokens.navy, borderRadius: "10px",
        padding: "20px 18px", marginBottom: "16px",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px",
        }}>
          <svg height={14} viewBox="0 0 130 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0 }}>
            <path d="M2 9 C2 4.5 5.5 2 9 2 C9 2 9 9 4 13 C2.5 11.5 2 10.5 2 9Z" fill="#4DD9D0"/>
            <path d="M9 2 C12.5 2 16 4.5 16 9 C16 10.5 15.5 11.5 14 13 C9 9 9 2 9 2Z" fill="rgba(255,255,255,0.7)"/>
            <text x="22" y="13.5" fontFamily="Georgia, serif" fontSize="11.5" fontWeight="700" fill="white" letterSpacing="-0.3">Verywell Mind</text>
          </svg>
          <span style={{
            background: tokens.teal, color: "white",
            fontSize: "9px", fontWeight: "700", letterSpacing: "0.5px",
            textTransform: "uppercase", padding: "3px 7px", borderRadius: "2px",
            fontFamily: "var(--sans)",
          }}>
            Medically Reviewed
          </span>
        </div>
        <h2 style={{
          fontSize: "17px", fontFamily: "var(--serif)", fontWeight: "700",
          lineHeight: "1.35", color: "white", margin: 0,
        }}>
          {card.headline || meta.title}
        </h2>
      </div>

      {/* Reviewer row */}
      {meta.reviewedBy && (
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          padding: "11px 13px",
          background: tokens.parchmentDark, borderRadius: "6px", marginBottom: "14px",
        }}>
          <Icon name="shield" size={18} color={tokens.teal} />
          <div>
            <div style={{ fontSize: "12px", fontWeight: "600", color: tokens.ink, fontFamily: "var(--sans)" }}>
              {meta.reviewedBy}
            </div>
            <div style={{ fontSize: "11px", color: tokens.muted, fontFamily: "var(--sans)" }}>
              {meta.reviewedRole}
            </div>
          </div>
        </div>
      )}

      <p style={{
        fontSize: "13px", color: tokens.body, lineHeight: "1.6",
        fontFamily: "var(--sans)", margin: "0 0 14px",
      }}>
        {card.excerpt}
      </p>

      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        marginBottom: "18px",
      }}>
        <Icon name="book" size={13} color={tokens.muted} />
        <span style={{ fontSize: "11.5px", color: tokens.muted, fontFamily: "var(--sans)" }}>
          {meta.readTime} · {meta.source}
        </span>
      </div>

      <a href={meta.articleUrl || "#"} style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
        padding: "14px",
        background: tokens.navy, color: "white",
        borderRadius: "8px", textDecoration: "none",
        fontSize: "14px", fontWeight: "700",
        letterSpacing: "0.2px", fontFamily: "var(--sans)",
        marginTop: "auto",
      }}>
        Read full article on Verywell Mind
        <Icon name="arrow-right" size={16} color="white" />
      </a>
    </div>
  );
}
