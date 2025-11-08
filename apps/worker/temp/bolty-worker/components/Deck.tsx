    "use client";

    import React, { useRef, useState } from "react";
    import ProfileCard from "./ProfileCard";
    import type { Profile } from "../lib/profiles";

    type Props = {
      initialProfiles: Profile[];
    };

    export default function Deck({ initialProfiles }: Props) {
      const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
      const [drag, setDrag] = useState({
        x: 0,
        y: 0,
        rot: 0,
        transition: "",
      });
      const draggingRef = useRef(false);
      const startRef = useRef({ x: 0, y: 0 });

      const shown = profiles.slice(0, 5);
      const rendered = [...shown].reverse();

      function onPointerDown(e: React.PointerEvent) {
        (e.target as Element).setPointerCapture?.(e.pointerId);
        draggingRef.current = true;
        startRef.current = { x: e.clientX, y: e.clientY };
        setDrag((d) => ({ ...d, transition: "" }));
      }

      function onPointerMove(e: React.PointerEvent) {
        if (!draggingRef.current) return;
        const dx = e.clientX - startRef.current.x;
        const dy = e.clientY - startRef.current.y;
        const rot = dx / 20;
        setDrag({ x: dx, y: dy, rot, transition: "" });
      }

      function finishSwipe(direction: "left" | "right") {
        if (profiles.length === 0) return;
        const toX =
          (direction === "right" ? window.innerWidth : -window.innerWidth) * 1.2;
        setDrag((d) => ({ ...d, x: toX, transition: "transform 320ms ease" }));
        setTimeout(() => {
          setProfiles((p) => p.slice(1));
          setDrag({ x: 0, y: 0, rot: 0, transition: "" });
        }, 320);
      }

      function onPointerUp(e: React.PointerEvent) {
        draggingRef.current = false;
        const dx = drag.x;
        const threshold = 120;
        if (Math.abs(dx) > threshold) {
          finishSwipe(dx > 0 ? "right" : "left");
        } else {
          setDrag({ x: 0, y: 0, rot: 0, transition: "transform 220ms cubic-bezier(.2,.8,.2,1)" });
        }
        (e.target as Element).releasePointerCapture?.(e.pointerId);
      }

      return (
        <div className="deck-wrap">
          <div className="deck">
            {rendered.length === 0 && (
              <div className="empty">
                <strong>No more profiles</strong>
                <div className="empty-sub">Come back later to see more people.</div>
              </div>
            )}

            {rendered.map((profile, idx, arr) => {
              const isTop = idx === arr.length - 1;
              const stackIndex = arr.length - 1 - idx;
              const baseTransform = `translateX(-50%) translateY(${ -stackIndex * 8 }px) scale(${1 - stackIndex * 0.03})`;
              const style: React.CSSProperties = isTop
                ? {
                    zIndex: 50,
                    transform: `translateX(-50%) translate(${drag.x}px, ${drag.y}px) rotate(${drag.rot}deg)`,
                    transition: drag.transition,
                    touchAction: "none",
                  }
                : {
                    zIndex: 50 - stackIndex,
                    transform: baseTransform,
                    transition: "transform 200ms ease",
                  };

              return (
                <div
                  key={profile.id}
                  className="card-wrapper"
                  style={style}
                  onPointerDown={isTop ? onPointerDown : undefined}
                  onPointerMove={isTop ? onPointerMove : undefined}
                  onPointerUp={isTop ? onPointerUp : undefined}
                >
                  <ProfileCard profile={profile} />
                  {isTop && drag.x > 40 && <div className="overlay like">LIKE</div>}
                  {isTop && drag.x < -40 && <div className="overlay nope">NOPE</div>}
                </div>
              );
            })}
          </div>

          <div className="controls" role="toolbar" aria-label="Swipe controls">
            <button
              className="btn dislike"
              onClick={() => finishSwipe("left")}
              aria-label="Nope"
            >
              ✖
            </button>
            <button
              className="btn like"
              onClick={() => finishSwipe("right")}
              aria-label="Like"
            >
              ❤
            </button>
          </div>
        </div>
      );
    }
  