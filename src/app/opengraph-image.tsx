import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "JAMUN - Middle School Academic Competitions";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Base64 encoded SVG logo (pre-generated for static export)
const logoDataUrl = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgMTA2Ij48dGV4dCB4PSIyNTAiIHk9IjcwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSI2MCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMzOTdiY2UiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkpBTVVOPC90ZXh0Pjwvc3ZnPg==";

export default async function Image() {

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #f5f0ff 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <img
            src={logoDataUrl}
            alt="JAMUN Logo"
            width={500}
            height={106}
            style={{
              width: "500px",
              height: "106px",
            }}
          />
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: "36px",
            fontWeight: 600,
            color: "#333",
            textAlign: "center",
            marginBottom: "24px",
            maxWidth: "900px",
          }}
        >
          <span>Affordable Academic Competitions for </span>
          <span style={{ color: "#397bce", marginLeft: "10px" }}>Middle School</span>
        </div>

        {/* Programs */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 28px",
              borderRadius: "100px",
              background: "#397bce15",
              border: "2px solid #397bce30",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#397bce",
                marginRight: "12px",
              }}
            />
            <span
              style={{
                fontSize: "22px",
                fontWeight: 600,
                color: "#397bce",
              }}
            >
              Model UN
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 28px",
              borderRadius: "100px",
              background: "#7c3aed15",
              border: "2px solid #7c3aed30",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#7c3aed",
                marginRight: "12px",
              }}
            />
            <span
              style={{
                fontSize: "22px",
                fontWeight: 600,
                color: "#7c3aed",
              }}
            >
              Mock Trial
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 28px",
              borderRadius: "100px",
              background: "#10b98115",
              border: "2px solid #10b98130",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#10b981",
                marginRight: "12px",
              }}
            />
            <span
              style={{
                fontSize: "22px",
                fontWeight: 600,
                color: "#10b981",
              }}
            >
              Mathletes
            </span>
          </div>
        </div>

        {/* Footer tagline */}
        <div
          style={{
            display: "flex",
            marginTop: "60px",
            fontSize: "20px",
            color: "#888",
            fontWeight: 500,
          }}
        >
          Make Academics Fun | Grades 5-8 | 501(c)(3) Nonprofit
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
