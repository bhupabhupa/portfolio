import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Monogram favicon, rendered once at build time.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0a09",
          color: "#2dd4bf",
          borderRadius: 14,
          fontSize: 34,
          letterSpacing: -1,
        }}
      >
        BT
      </div>
    ),
    size,
  );
}
