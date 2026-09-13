import { waLink } from "@/lib/site";
import { MessageCircle } from "lucide-react";
export default function WhatsAppFab() {
  return (
    <a
      className="whatsapp-fab"
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar con Botmate por WhatsApp (abre otra pestaña)"
    >
      <MessageCircle size={22} />
      <span>Hablemos</span>
    </a>
  );
}
