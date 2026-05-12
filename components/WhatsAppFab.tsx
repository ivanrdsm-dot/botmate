"use client";

import { waLink } from "@/lib/site";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFab() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-emerald-500/30 transition hover:scale-105"
    >
      <span className="absolute -inset-1 -z-10 animate-pulseGlow rounded-full bg-emerald-400/40 blur" />
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
