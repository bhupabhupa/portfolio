import { ImageResponse } from "next/og";
import { profile, stats } from "@/data/profile";

export const alt = `${profile.name}: ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview card, rendered once at build time from profile data.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0c0a09",
          color: "#f5f5f4",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#a8a29e" }}>
          bhupendra<span style={{ color: "#2dd4bf" }}>.</span>tandel
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, letterSpacing: -2, lineHeight: 1.05 }}>{profile.name}</div>
          <div style={{ marginTop: 24, fontSize: 36, color: "#2dd4bf" }}>{profile.headline}</div>
        </div>
        <div style={{ display: "flex", gap: 56, fontSize: 26, color: "#a8a29e" }}>
          {stats.slice(0, 3).map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 48, color: "#f5f5f4" }}>{s.value}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
