"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scroll = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setP(max ? (scroll / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-accent via-accent-violet to-pink-400 transition-[width] duration-100"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}
