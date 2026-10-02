import { ImageResponse } from "@vercel/og";

export const generateOgImage = async (title: string, seriesTitle?: string) => {
  const baseUrl = import.meta.env.SITE;
  const fontNormalUrl = `${baseUrl}/font/NotoSansJP-Medium.ttf`;
  const fontBoldUrl = `${baseUrl}/font/NotoSansJP-Bold.ttf`;
  const iconUrl = `${baseUrl}/single_color_circle.svg`;

  // フォントファイルをfetchで取得
  const [fontNormalResponse, fontBoldResponse, iconResponse] =
    await Promise.all([
      fetch(fontNormalUrl),
      fetch(fontBoldUrl),
      fetch(iconUrl),
    ]);

  const fontNormal = await fontNormalResponse.arrayBuffer();
  const fontBold = await fontBoldResponse.arrayBuffer();
  const iconSvg = await iconResponse.text();
  const iconBase64 = `data:image/svg+xml;base64,${Buffer.from(iconSvg).toString("base64")}`;

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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          maxWidth: "1000px",
          padding: "80px 100px",
        }}
      >
        {seriesTitle && (
          <div
            style={{
              color: "#6b7280",
              fontSize: "28px",
              fontWeight: 500,
              paddingLeft: "32px",
            }}
          >
            {seriesTitle}
          </div>
        )}
        <div
          style={{
            color: "#111827", // --color-text
            fontSize: "56px",
            fontWeight: 700,
            lineHeight: 1.5, // --line-height-relaxed
            textAlign: "center",
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
          gap: "4px",
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
            fontSize: "32px",
          }}
        >
          mehm8128のWeblog
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
    },
  );
};
