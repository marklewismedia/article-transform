import { useState, useRef } from "react";
import { tokens } from "./tokens.js";

export function UploadScreen({ onArticleReady }) {
  const [state, setstate] = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload an image file (PNG, JPG).");
      setstate("error");
      return;
    }

    setstate("loading");
    setErrorMsg("");

    try {
      // Read file as base64
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });

      const response = await fetch("/.netlify/functions/transform-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: base64,
          mediaType: file.type,
        }),
      });

      // Always try to get the real error message from the server
      if (!response.ok) {
        let errMsg = `Server error (${response.status})`;
        try {
          const errBody = await response.json();
          errMsg = errBody.error || errMsg;
        } catch {
          const text = await response.text().catch(() => "");
          if (text) errMsg = text.slice(0, 200);
        }
        throw new Error(errMsg);
      }

      const article = await response.json();
      onArticleReady(article);
    } catch (err) {
      setErrorMsg(err.message);
      setstate("error");
    }
  };

  const onInputChange = (e) => {
    handleFile(e.target.files?.[0]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div style={{
      width: "390px",
      height: "844px",
      background: tokens.bg,
      display: "flex",
      flexDirection: "column",
      fontFamily: "var(--sans)",
      overflow: "hidden",
    }}>
      {/* Top bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "14px 20px 12px",
        background: tokens.navy,
        gap: "10px",
      }}>
        <div style={{
          width: "30px", height: "30px",
          background: tokens.teal, borderRadius: "8px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "14px",
        }}>🌿</div>
        <div>
          <div style={{
            fontFamily: "var(--serif)", fontWeight: "700",
            fontSize: "14px", color: "white", lineHeight: "1",
          }}>EczemaSpace</div>
          <div style={{ fontSize: "9.5px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>
            Calm. Informed. Ready.
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: "32px 24px",
        gap: "24px",
      }}>
        <div>
          <h1 style={{
            fontFamily: "var(--serif)",
            fontSize: "26px",
            fontWeight: "700",
            color: tokens.ink,
            lineHeight: "1.25",
            margin: "0 0 10px",
          }}>
            Transform an article into cards.
          </h1>
          <p style={{
            fontSize: "14px",
            color: tokens.body,
            lineHeight: "1.65",
            margin: 0,
          }}>
            Upload a screenshot of any health article. Claude will read it and generate a swipeable card sequence.
          </p>
        </div>

        {/* Drop zone */}
        <div
          onClick={() => state !== "loading" && fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          style={{
            border: `2px dashed ${dragOver ? tokens.teal : tokens.border}`,
            borderRadius: "16px",
            background: dragOver ? tokens.tealLight : tokens.cardBg,
            padding: "36px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            cursor: state === "loading" ? "default" : "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={onInputChange}
          />

          {state === "loading" ? (
            <>
              <div style={{
                width: "48px", height: "48px",
                border: `3px solid ${tokens.tealLight}`,
                borderTop: `3px solid ${tokens.teal}`,
                borderRadius: "50%",
                animation: "spin 0.9s linear infinite",
              }} />
              <div style={{ fontSize: "14px", fontWeight: "600", color: tokens.ink }}>
                Reading article…
              </div>
              <div style={{ fontSize: "12px", color: tokens.muted, textAlign: "center" }}>
                Claude is transforming the content into cards. This takes around 15–30 seconds.
              </div>
            </>
          ) : (
            <>
              <div style={{
                width: "52px", height: "52px",
                background: tokens.tealLight,
                borderRadius: "14px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "24px",
              }}>
                📄
              </div>
              <div style={{ fontSize: "15px", fontWeight: "600", color: tokens.ink, textAlign: "center" }}>
                Drop a PNG screenshot here
              </div>
              <div style={{ fontSize: "12px", color: tokens.muted, textAlign: "center" }}>
                or tap to choose from your files
              </div>
              <div style={{
                marginTop: "4px",
                background: tokens.navy,
                color: "white",
                fontSize: "13px",
                fontWeight: "600",
                padding: "10px 22px",
                borderRadius: "8px",
                letterSpacing: "0.2px",
              }}>
                Choose file
              </div>
            </>
          )}
        </div>

        {/* Error — now shows the real reason */}
        {state === "error" && (
          <div style={{
            background: tokens.roseLight,
            border: `1px solid ${tokens.rose}`,
            borderRadius: "10px",
            padding: "13px 15px",
            fontSize: "13px",
            color: tokens.rose,
            lineHeight: "1.5",
          }}>
            <strong>Something went wrong.</strong>
            <div style={{ marginTop: "4px", color: tokens.body, fontSize: "12px", wordBreak: "break-word" }}>
              {errorMsg}
            </div>
            <div
              onClick={() => setstate("idle")}
              style={{
                marginTop: "8px",
                fontSize: "12px",
                color: tokens.teal,
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Try again →
            </div>
          </div>
        )}

        {/* Instructions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[
            { icon: "📸", text: "Take a full-page screenshot of any eczema or health article" },
            { icon: "🤖", text: "Claude reads the content and extracts the key points" },
            { icon: "🃏", text: "Swipe through 6 cards: insight, mechanism, cycle, triggers, what helps, and the full source" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: "11px",
              padding: "10px 13px",
              background: tokens.cardAlt,
              borderRadius: "9px",
            }}>
              <span style={{ fontSize: "18px", flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontSize: "12.5px", color: tokens.body, lineHeight: "1.5" }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
