import { ImageResponse } from "next/og";
export const alt = "Botmate · Robótica que trabaja contigo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#f5f6f8",
          padding: "80px",
          color: "#202326",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 25,
            color: "#5161ff",
            marginBottom: 35,
          }}
        >
          BOTMATE · MÉXICO
        </div>
        <div style={{ display: "flex",
          flexDirection: "column",
          fontSize: 80, letterSpacing: -4, lineHeight: 1.07 }}>
          Robótica que
          <br />
          trabaja contigo.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            marginTop: 38,
            color: "#646a73",
          }}
        >
          Entrega · Publicidad · Limpieza
        </div>
      </div>
    ),
    size,
  );
}
