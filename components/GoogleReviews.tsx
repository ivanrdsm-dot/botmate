import { ArrowUpRight } from "lucide-react";

// Render only after the owner provides the real Google Business Profile URL.
export default function GoogleReviews() {
  const raw = process.env.GOOGLE_BUSINESS_PROFILE_URL;
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (
    url.protocol !== "https:" ||
    ![
      "maps.app.goo.gl",
      "g.page",
      "www.google.com",
      "maps.google.com",
    ].includes(url.hostname)
  )
    return null;
  return (
    <section className="section-space section-compact">
      <div className="container-x google-reviews-panel">
        <div>
          <p className="eyebrow">EXPERIENCIAS COMPARTIDAS</p>
          <h2>
            Conoce las opiniones
            <br />
            directamente en Google.
          </h2>
          <p>
            Consulta las experiencias que nuestros clientes han decidido
            compartir.
          </p>
        </div>
        <a
          className="btn-primary"
          href={url.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver opiniones en Google <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
