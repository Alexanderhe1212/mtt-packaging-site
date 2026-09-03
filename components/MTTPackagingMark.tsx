export default function MTTPackagingMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      role="img"
      aria-label="MTT Packaging mark"
    >
      {/* Box base - slightly tapered, 3D depth */}
      <path d="M8 26L12 38H36L40 26Z" fill="none" stroke="#C1A46B" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Box base front face */}
      <path d="M8 26H40" stroke="#C1A46B" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Box base bottom edge */}
      <path d="M12 38H36" stroke="#C1A46B" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Box lid - angled open */}
      <path d="M6 24L24 14L42 24" fill="none" stroke="#C1A46B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Lid top edge */}
      <path d="M6 24L24 18L42 24" fill="none" stroke="#C1A46B" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      {/* MTT text centered in box */}
      <text
        x="24"
        y="34"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="8"
        fontWeight="400"
        letterSpacing="0.14em"
        fill="#F2EFE7"
      >
        MTT
      </text>
    </svg>
  );
}
