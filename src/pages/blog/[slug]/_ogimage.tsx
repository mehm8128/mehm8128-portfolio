import { ImageResponse } from "@vercel/og";
import fs from "node:fs";

export const generateOgImage = (title: string) => {
  const fontNormal = fs.readFileSync("src/assets/font/NotoSansJP-Medium.ttf");
  const fontBold = fs.readFileSync("src/assets/font/NotoSansJP-Bold.ttf");
  const iconSvg = fs.readFileSync("public/single_color_circle.svg");
  const iconBase64 = `data:image/svg+xml;base64,${iconSvg.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        position: "relative",
        border: "48px solid #2563eb", //  --color-accent
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "40px",
          color: "#111827", // --color-text
          fontSize: "24px",
        }}
      >
        mehm8128のWeblog
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 100px",
        }}
      >
        <div
          style={{
            color: "#111827", // --color-text
            fontSize: "48px",
            fontWeight: 700,
            lineHeight: 1.5, // --line-height-relaxed
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <img
          src={iconBase64}
          alt=""
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            color: "#111827", // --color-text
            fontSize: "28px",
          }}
        >
          mehm8128
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Noto Sans JP",
          data: fontNormal,
          weight: 500,
          style: "normal",
        },
        {
          name: "Noto Sans JP",
          data: fontBold,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
};
