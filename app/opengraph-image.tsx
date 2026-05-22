import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "#f8fafc",
          fontSize: 56,
          fontWeight: 700,
        }}
      >
        Siam On Cloud
        <div
          style={{
            fontSize: 34,
            fontWeight: 500,
            color: "#bae6fd",
          }}
        >
          Elevation of Future Journeys
        </div>
      </div>
    ),
    size
  );
}
