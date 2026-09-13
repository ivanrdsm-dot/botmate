"use client";
import {usePathname} from "next/navigation";
import {isEnglish} from "@/lib/locale";
import { waLink } from "@/lib/site";
import { MessageCircle } from "lucide-react";
export default function WhatsAppFab() {
  const en=isEnglish(usePathname());
  return (
    <a
      className="whatsapp-fab"
      href={waLink(en?"Hello Botmate, I would like advice about Pudu robots for my business.":undefined)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={en?"Talk to Botmate on WhatsApp (opens a new tab)":"Hablar con Botmate por WhatsApp (abre otra pestaña)"}
    >
      <MessageCircle size={22} />
      <span>{en?"Let’s talk":"Hablemos"}</span>
    </a>
  );
}
