import { tokens } from "./tokens.js";

export function Tag({ label, variant = "teal" }) {
  const bg    = variant === "rose" ? tokens.roseLight  : tokens.tealLight;
  const color = variant === "rose" ? tokens.rose       : tokens.tealDark;
  return (
    <span style={{
      display: "inline-block",
      fontSize: "9.5px",
      fontWeight: "700",
      letterSpacing: "1.4px",
      textTransform: "uppercase",
      color,
      background: bg,
      borderRadius: "3px",
      padding: "4px 9px",
      marginBottom: "16px",
      fontFamily: "var(--sans)",
    }}>
      {label}
    </span>
  );
}

export function Trust({ text }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      marginTop: "auto",
      paddingTop: "18px",
      borderTop: `1px solid ${tokens.border}`,
    }}>
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <circle cx="6.5" cy="6.5" r="6" stroke={tokens.teal} strokeWidth="1"/>
        <path d="M4 6.5l1.8 1.8L9.5 4.5" stroke={tokens.teal} strokeWidth="1.2"
              strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span style={{ fontSize: "11px", color: tokens.muted, fontFamily: "var(--sans)" }}>
        {text}
      </span>
    </div>
  );
}
