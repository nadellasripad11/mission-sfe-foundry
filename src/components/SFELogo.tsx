export default function SFELogo({ size = 120 }: { size?: number }) {
  const scale = size / 120;
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 120 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Dark stripe */}
      <path
        d="M 8 12 L 32 12 L 24 36 L 0 36 Z"
        fill="#1A1A1A"
      />
      {/* Blue stripe */}
      <path
        d="M 20 12 L 44 12 L 36 36 L 12 36 Z"
        fill="#2684C6"
      />
      {/* Orange stripe */}
      <path
        d="M 32 12 L 56 12 L 48 36 L 24 36 Z"
        fill="#EB5F27"
      />

      {/* SFE Text */}
      <text
        x="65"
        y="28"
        fontFamily="Arial, sans-serif"
        fontSize="32"
        fontWeight="900"
        fill="#1A1A1A"
        letterSpacing="-2"
      >
        SFE
      </text>

      {/* FOUNDRY Text */}
      <text
        x="65"
        y="48"
        fontFamily="Arial, sans-serif"
        fontSize="12"
        fontWeight="600"
        fill="#1A1A1A"
        letterSpacing="2"
      >
        FOUNDRY
      </text>
    </svg>
  );
}
