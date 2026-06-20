import { ImageResponse } from "next/og"

export const alt = "Zi Designs creative tech studio in Uganda"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background: "linear-gradient(135deg, #071c2d 0%, #0c2535 52%, #102e3b 100%)",
          color: "white",
          fontFamily: "sans-serif",
          padding: "64px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 18% 24%, rgba(64,224,208,0.30), transparent 34%), radial-gradient(circle at 82% 76%, rgba(64,224,208,0.12), transparent 28%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "18px",
                height: "18px",
                borderRadius: "9999px",
                background: "#40E0D0",
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 28,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#b7d3d7",
              }}
            >
              Zi Designs
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "900px",
              gap: "22px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 78,
                fontWeight: 800,
                lineHeight: 1.02,
              }}
            >
              Websites, apps, design, and video that move people to act.
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 32,
                lineHeight: 1.35,
                color: "#d1eaed",
                maxWidth: "860px",
              }}
            >
              Uganda-based creative tech studio for startups and creators.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 26,
              color: "#b7d3d7",
            }}
          >
            <div style={{ display: "flex" }}>zidesigns.vercel.app</div>
            <div style={{ display: "flex", color: "#40E0D0" }}>Websites • Apps • Branding • AI</div>
          </div>
        </div>
      </div>
    ),
    size,
  )
}