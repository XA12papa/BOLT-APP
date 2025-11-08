    "use client";

    import React from "react";
    import type { Profile } from "../lib/types";

    export default function MatchModal({ profile, onClose }: { profile: Profile; onClose: () => void }) {
      return (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 }}>
          <div style={{ background: "white", padding: 20, borderRadius: 12, width: 360, textAlign: "center" }}>
            <h2 style={{ margin: 0 }}>It's a match!</h2>
            <p style={{ color: "var(--muted)" }}>You and {profile.name} liked each other.</p>
            <img src={profile.images?.[0]} alt={profile.name} style={{ width: 120, height: 120, borderRadius: 12, objectFit: "cover", marginTop: 8 }} />
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 14 }}>
              <button onClick={onClose} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #eee" }}>
                Close
              </button>
              <button onClick={onClose} style={{ padding: "8px 12px", borderRadius: 8, background: "var(--accent)", color: "white", border: "none" }}>
                Say Hi
              </button>
            </div>
          </div>
        </div>
      );
    }