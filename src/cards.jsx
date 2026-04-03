import { tokens } from "./tokens.js";
import { Tag, Trust } from "./ui.jsx";

// ── Card 1: Summary ────────────────────────────────────────────────────────────
export function SummaryCard({ card, meta }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
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
        borderLeft: `3px solid ${tokens.teal}`,
        borderRadius: "0 8px 8px 0",
        padding: "12px 14px",
        fontSize: "13px", color: tokens.body, lineHeight: "1.55",
        fontFamily: "var(--sans)", fontStyle: "italic",
      }}>
        {card.hint}
      </div>
      <Trust text={
        meta.reviewedBy
          ? `Reviewed by ${meta.reviewedBy}${meta.reviewedRole ? `, ${meta.reviewedRole}` : ""}`
          : `Source: ${meta.source}`
      } />
    </div>
  );
}

// ── Card 2: Explanation ────────────────────────────────────────────────────────
export function ExplanationCard({ card }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
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
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {(card.bullets || []).map((b, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: "10px",
            padding: "11px 13px",
            background: i % 2 === 0 ? tokens.tealLight : "transparent",
            borderRadius: "8px",
          }}>
            <span style={{
              minWidth: "20px", height: "20px",
              background: tokens.teal, color: "white",
              borderRadius: "50%", fontSize: "10px", fontWeight: "700",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginTop: "1px", flexShrink: 0, fontFamily: "var(--sans)",
            }}>
              {i + 1}
            </span>
            <span style={{ fontSize: "13.5px", color: tokens.body, lineHeight: "1.55", fontFamily: "var(--sans)" }}>
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
      <Tag label={card.tag} />
      <h2 style={{
        fontSize: "21px", fontFamily: "var(--serif)", fontWeight: "700",
        lineHeight: "1.3", color: tokens.ink, margin: "0 0 18px",
      }}>
        {card.headline}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              width: "100%", padding: "10px 14px",
              background: i === 0 ? tokens.navy
                : i === steps.length - 1 ? tokens.roseLight
                : tokens.cardAlt,
              borderRadius: "9px",
              border: i === steps.length - 1 ? `1px solid ${tokens.rose}` : "none",
            }}>
              <span style={{ fontSize: "19px" }}>{step.icon}</span>
              <span style={{
                fontSize: "13.5px",
                fontWeight: (i === 0 || i === steps.length - 1) ? "600" : "400",
                color: i === 0 ? "white"
                  : i === steps.length - 1 ? tokens.rose
                  : tokens.body,
                fontFamily: "var(--sans)",
              }}>
                {step.label}
              </span>
              {i === 0 && (
                <span style={{ marginLeft: "auto", fontSize: "9px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.8px", fontWeight: "700" }}>
                  START
                </span>
              )}
              {i === steps.length - 1 && (
                <span style={{ marginLeft: "auto", fontSize: "9px", color: tokens.rose, letterSpacing: "0.8px", fontWeight: "700" }}>
                  LOOP
                </span>
              )}
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: "1.5px", height: "7px", background: tokens.tealBorder }} />
            )}
          </div>
        ))}
      </div>
      {card.note && (
        <div style={{
          marginTop: "14px", padding: "11px 13px",
          background: tokens.parchmentDark, borderRadius: "8px",
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
      <Tag label={card.tag} />
      <h2 style={{
        fontSize: "21px", fontFamily: "var(--serif)", fontWeight: "700",
        lineHeight: "1.3", color: tokens.ink, margin: "0 0 18px",
      }}>
        {card.headline}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {(card.groups || []).map((group, gi) => (
          <div key={gi}>
            <div style={{
              fontSize: "10px", fontWeight: "700", letterSpacing: "1.2px",
              textTransform: "uppercase", color: tokens.teal,
              marginBottom: "8px", fontFamily: "var(--sans)",
            }}>
              {group.label}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {(group.items || []).map((item, ii) => (
                <div key={ii} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "9px 13px",
                  background: gi === 0 ? tokens.tealLight : tokens.roseLight,
                  borderRadius: "8px",
                }}>
                  <div style={{
                    width: "5px", height: "5px", borderRadius: "50%",
                    background: gi === 0 ? tokens.teal : tokens.rose,
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: "13.5px", color: tokens.body, fontFamily: "var(--sans)" }}>
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
      <Tag label={card.tag} />
      <h2 style={{
        fontSize: "21px", fontFamily: "var(--serif)", fontWeight: "700",
        lineHeight: "1.3", color: tokens.ink, margin: "0 0 14px",
      }}>
        {card.headline}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "7px", overflowY: "auto" }}>
        {(card.actions || []).map((a, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: "12px",
            padding: "11px 13px",
            background: tokens.cardAlt,
            borderRadius: "9px",
          }}>
            <span style={{ fontSize: "20px", flexShrink: 0, marginTop: "1px" }}>{a.emoji}</span>
            <div>
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
      <div style={{
        background: tokens.navy, borderRadius: "12px",
        padding: "20px 18px", marginBottom: "18px",
      }}>
        <div style={{
          fontSize: "9.5px", fontWeight: "700", letterSpacing: "1.4px",
          textTransform: "uppercase", color: "rgba(255,255,255,0.45)",
          marginBottom: "10px", fontFamily: "var(--sans)",
        }}>
          SOURCE ARTICLE
        </div>
        <h2 style={{
          fontSize: "18px", fontFamily: "var(--serif)", fontWeight: "700",
          lineHeight: "1.35", color: "white", margin: "0 0 10px",
        }}>
          {card.headline || meta.title}
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            background: tokens.teal, color: "white",
            fontSize: "9px", fontWeight: "700", letterSpacing: "0.6px",
            textTransform: "uppercase", padding: "3px 8px", borderRadius: "3px",
            fontFamily: "var(--sans)",
          }}>
            {meta.reviewedBy ? "Medically Reviewed" : "Editorial"}
          </span>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--sans)" }}>
            {meta.source}
          </span>
        </div>
      </div>

      {meta.reviewedBy && (
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          padding: "12px 14px",
          background: tokens.parchmentDark, borderRadius: "9px", marginBottom: "14px",
        }}>
          <div style={{
            width: "36px", height: "36px", background: tokens.teal,
            borderRadius: "50%", display: "flex", alignItems: "center",
            justifyContent: "center", color: "white", fontSize: "14px", flexShrink: 0,
          }}>
            👨‍⚕️
          </div>
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
        fontFamily: "var(--sans)", margin: "0 0 16px",
      }}>
        {card.excerpt}
      </p>

      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        marginBottom: "18px", fontSize: "11.5px", color: tokens.muted,
        fontFamily: "var(--sans)",
      }}>
        <span>📖 {meta.readTime}</span>
        <span style={{ color: tokens.border }}>·</span>
        <span>{meta.source}</span>
      </div>

      <a href={meta.articleUrl || "#"} style={{
        display: "block", padding: "14px",
        background: tokens.navy, color: "white",
        borderRadius: "10px", textDecoration: "none",
        fontSize: "14px", fontWeight: "700", textAlign: "center",
        letterSpacing: "0.2px", fontFamily: "var(--sans)",
        marginTop: "auto",
      }}>
        Read full article on {meta.source} →
      </a>
    </div>
  );
}
