"use client";

import React, { useEffect, useRef, useState } from "react";
import type { Profile } from "../types";

type Props = {
  profile: Profile;
  onSwipe: (id: string, dir: "left" | "right") => void;
  isTop?: boolean;
};

export default function Card({ profile, onSwipe, isTop = false }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const [rot, setRot] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onPointerDown(e: PointerEvent) {
      (e.target as Element).setPointerCapture?.(e.pointerId);
      setIsDragging(true);
      startRef.current = { x: e.clientX, y: e.clientY };
    }

    function onPointerMove(e: PointerEvent) {
      if (!isDragging || !startRef.current) return;
      const dx = e.clientX - startRef.current.x;
      const dy = e.clientY - startRef.current.y;
      setPos({ x: dx, y: dy });
      setRot(dx / 20);
    }

    function onPointerUp(e: PointerEvent) {
      if (!startRef.current) return;
      setIsDragging(false);
      const dx = e.clientX - startRef.current.x;
      const threshold = 120;
      if (Math.abs(dx) > threshold) {
        const dir = dx > 0 ? "right" : "left";
        const toX = dir === "right" ? window.innerWidth : -window.innerWidth;
        setPos({ x: toX, y: e.clientY - window.innerHeight / 2 });
        setTimeout(() => onSwipe(profile.id, dir), 250);
      } else {
        setPos({ x: 0, y: 0 });
        setRot(0);
      }
      startRef.current = null;
    }

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [isDragging, profile.id, onSwipe]);

  const likeOpacity = Math.max(0, Math.min(1, pos.x / 120));
  const nopeOpacity = Math.max(0, Math.min(1, -pos.x / 120));

  const style: React.CSSProperties = {
    transform: `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${rot}deg)`,
    transition: isDragging ? "none" : "transform 300ms ease",
  };

  return (
    <div ref={ref} className="card" style={style} aria-hidden={!isTop}>
      <img src={profile.avatar} alt={profile.name} />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">
            {profile.name}, {profile.age}
          </h2>
        </div>
        <p className="mt-2 text-sm text-gray-600">{profile.bio}</p>
      </div>
      <div className="badge like" style={{ opacity: likeOpacity }}>
        LIKE
      </div>
      <div className="badge nope" style={{ opacity: nopeOpacity }}>
        NOPE
      </div>
    </div>
  );
}