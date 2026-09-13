import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — the brand mark on the Deep Black ground. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0D0C15",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "104px",
            height: "104px",
            borderRadius: "26px",
            background: "linear-gradient(135deg, #C1B8FF 0%, #FED97B 100%)",
            color: "#0D0C15",
            fontSize: "64px",
            fontWeight: 700,
          }}
        >
          A
        </div>
      </div>
    ),
    size,
  );
}
