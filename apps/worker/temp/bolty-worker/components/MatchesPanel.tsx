    "use client";

    import React, { useEffect, useState } from "react";
    import type { Profile } from "../lib/types";

    type Props = {
      matches: Profile[];
      onClose: () => void;
    };

    export default function MatchesPanel({ matches, onClose }: Props) {
      const [active, setActive] = useState<Profile | null>(null);
      const [messages, setMessages] = useState<Record<string, { text: string; from: "you" | "them" }[]>>({});

      useEffect(() => {
        if (matches.length > 0) setActive(matches[0]);
        try {
          const saved = localStorage.getItem("tinder_messages");
          if (saved) setMessages(JSON.parse(saved));
        } catch {
          // ignore
        }
      }, [matches]);

      const sendMessage = (profileId: string, text: string) => {
        const prev = messages[profileId] ?? [];
        const newMessages = { ...messages, [profileId]: [...prev, { text, from: "you" }] };
        setMessages(newMessages);
        localStorage.setItem("tinder_messages", JSON.stringify(newMessages));

        // simulated reply
        setTimeout(() => {
          const reply = { text: "Nice to meet you 😊", from: "them" } as const;
          const cur = newMessages[profileId] ?? [];
          const next = { ...newMessages, [profileId]: [...cur, reply] };
          setMessages(next);
          localStorage.setItem("tinder_messages", JSON.stringify(next));
        }, 1200);
      };

      return (
        <div
          className="match-panel"
          style={{
            position: "fixed",
            right: 20,
            top: 80,
            width: 340,
            height: "calc(100% - 120px)",
            background: "white",
            boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            borderRadius: 12,
            overflow: "hidden",
            zIndex: 9999,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 12, borderBottom: "1px solid #f3f3f3" }}>
            <strong>Matches</strong>
            <button onClick={onClose} style={{ background: "transparent", border: "none", fontSize: 18 }}>
              ✕
            </button>
          </div>

          <div style={{ display: "flex", height: "100%" }}>
            <aside style={{ width: 120, borderRight: "1px solid #f3f3f3", overflowY: "auto" }}>
              {matches.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setActive(m)}
                  style={{
                    padding: 12,
                    cursor: "pointer",
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    borderBottom: "1px solid #f4f4f4",
                  }}
                >
                  <img src={m.images?.[0]} alt={m.name} style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover" }} />
                  <div>
                    <div style={{ fontWeight: 700 }}>{m.name}</div>
                    <div style={{ fontSize: 12, color: "#666" }}>{m.age}</div>
                  </div>
                </div>
              ))}
            </aside>

            <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {active ? (
                <>
                  <div style={{ padding: 12, borderBottom: "1px solid #f3f3f3" }}>
                    <strong>{active.name}</strong>
                  </div>
                  <div style={{ flex: 1, padding: 12, overflowY: "auto" }}>
                    {(messages[active.id] ?? []).map((m, i) => (
                      <div key={i} style={{ marginBottom: 8, textAlign: m.from === "you" ? "right" : "left" }}>
                        <div
                          style={{
                            display: "inline-block",
                            background: m.from === "you" ? "linear-gradient(90deg,#ff7a7f,#ff5864)" : "#f3f3f3",
                            color: m.from === "you" ? "white" : "black",
                            padding: "8px 12px",
                            borderRadius: 18,
                            maxWidth: 220,
                          }}
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ padding: 12, borderTop: "1px solid #f3f3f3", display: "flex", gap: 8 }}>
                    <input id="msg-input" placeholder="Say hello" style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid #eee" }} />
                    <button
                      onClick={() => {
                        const el = document.getElementById("msg-input") as HTMLInputElement | null;
                        if (!el || !el.value) return;
                        sendMessage(active.id, el.value);
                        el.value = "";
                      }}
                      style={{ padding: "8px 12px", borderRadius: 8, background: "var(--accent)", color: "white", border: "none" }}
                    >
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ padding: 12 }}>No match selected</div>
              )}
            </main>
          </div>
        </div>
      );
    }