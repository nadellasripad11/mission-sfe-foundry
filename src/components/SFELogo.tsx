export default function SFELogo({ size = 120 }: { size?: number }) {
  const h = Math.round(size * 0.52);
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 230 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Three diagonal speed stripes */}
      <polygon points="0,108 18,108 34,8 16,8" fill="#1C1C2E" />
      <polygon points="22,108 40,108 56,8 38,8" fill="#2684C6" />
      <polygon points="44,108 62,108 78,8 60,8" fill="#EB5F27" />

      {/* SFE — bold italic */}
      <text
        x="86"
        y="96"
        fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
        fontSize="96"
        fontWeight="900"
        fontStyle="italic"
        fill="#1C1C2E"
        letterSpacing="-3"
      >
        SFE
      </text>

      {/* Orange accent bar under the E */}
      <rect x="178" y="100" width="50" height="9" fill="#EB5F27" rx="2" />

      {/* FOUNDRY label */}
      <text
        x="88"
        y="118"
        fontFamily="Arial, 'Helvetica Neue', sans-serif"
        fontSize="14"
        fontWeight="700"
        fill="#1C1C2E"
        letterSpacing="6"
      >
        FOUNDRY
      </text>
    </svg>
  );
}
