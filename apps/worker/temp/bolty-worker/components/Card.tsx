    "use client";

    import React, { useEffect, useRef, useState } from "react";
    import type { Profile } from "../lib/types";

    type Props = {
      profile: Profile;
      onSwipe: (dir: "left" | "right", profile: Profile) => void;
      index?: number;
    };

    export default function Card({ profile, onSwipe, index = 0 }: Props) {
      const ref = useRef<HTMLDivElement | null>(null);
      const [isDragging, setIsDragging] = useState(false);
      const [x, setX] = useState(0);
      const [y, setY] = useState(0);
      const [rot, setRot] = useState(0);
      const start = useRef({ x: 0, y: 0 });
      const timeoutRef = useRef<number | null>(null);

      useEffect(() => {
        return () => {
          if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        };
      }, []);

      const handlePointerDown = (e: React.PointerEvent) => {
        (e.target as Element).setPointerCapture(e.pointerId);
        start.current = { x: e.clientX, y: e.clientY };
        setIsDragging(true);
      };

      const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return;
        const dx = e.clientX - start.current.x;
        const dy = e.clientY - start.current.y;
        setX(dx);
        setY(dy);
        setRot(dx / 20);
      };

      const finishSwipe = (dir: "left" | "right") => {
        // animate off-screen then call parent
        const toX = dir === "right" ? 1000 : -1000;
        setX(toX);
        setRot(dir === "right" ? 25 : -25);
        timeoutRef.current = window.setTimeout(() => {
          onSwipe(dir, profile);
        }, 300);
      };

      const handlePointerUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        const threshold = 120;
        if (x > threshold) {
          finishSwipe("right");
        } else if (x < -threshold) {
          finishSwipe("left");
        } else {
          // snap back
          setX(0);
          setY(0);
          setRot(0);
        }
      };

      const scale = 1 - index * 0.04;
      const topOffset = index * 10;
      const transform = `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`;

      return (
        <div
          className="card"
          ref={ref}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{
            zIndex: 200 - index,
            marginTop: `${topOffset}px`,
            transform,
            transition: isDragging ? "none" : "transform 300ms ease",
          }}
          aria-live="polite"
        >
          <div className="badge">{profile.name}</div>
          <img src={profile.images?.[0] ?? ""} alt={profile.name} />
          <div className="info">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 700 }}>
                {profile.name}, {profile.age}
              </div>
              <div style={{ color: "var(--muted)", fontSize: "0.9rem" }} />
            </div>
            <div style={{ color: "var(--muted)", fontSize: "0.95rem" }}>{profile.bio}</div>
          </div>
        </div>
      );
    }