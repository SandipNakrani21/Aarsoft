import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { site } from "@/lib/site-config";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
const font = readFile(path.join(process.cwd(), "public/fonts/Poppins-SemiBold.ttf"));
const mark = readFile(path.join(process.cwd(), "public/aarsoft-mark.png"));

/**
 * Generates the social share image for any page.
 * Uses only the approved brand colours, rendered on the Deep Black ground.
 */
export async function GET(request: NextRequest) {
  const [fontData, markData] = await Promise.all([font, mark]);
  const title =
    request.nextUrl.searchParams.get("title")?.slice(0, 110) ?? site.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0D0C15",
          fontFamily: "Poppins",
          padding: "72px",
          position: "relative",
        }}
      >
        {/* Primary brand gradient bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "linear-gradient(90deg, #C1B8FF 0%, #FED97B 100%)",
          }}
        />

        {/*
         * Satori has no blur filter, so a large translucent shape renders as
         * flat grey. A thin gradient wedge reads as a deliberate accent
         * instead.
         */}
        <div
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            width: "560px",
            height: "630px",
            background:
              "linear-gradient(105deg, rgba(13,12,21,0) 0%, rgba(193,184,255,0.10) 55%, rgba(193,184,255,0.30) 100%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img alt="" src={`data:image/png;base64,${markData.toString("base64")}`} width={52} height={52} />
          <div
            style={{
              fontSize: "26px",
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            Aarsoft Technologies
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: "900px" }}>
          <div
            style={{
              width: "84px",
              height: "5px",
              borderRadius: "999px",
              marginBottom: "30px",
              background: "linear-gradient(90deg, #C1B8FF 0%, #FED97B 100%)",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: title.length > 60 ? "58px" : "72px",
              lineHeight: 1.1,
              color: "#FFFFFF",
              letterSpacing: "-0.035em",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "22px",
            color: "#8E8D98",
          }}
        >
          <span>{site.tagline}</span>
          <span style={{ color: "#C1B8FF" }}>{new URL(site.url).host}</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: [{ name: "Poppins", data: fontData, weight: 600, style: "normal" }] },
  );
}
