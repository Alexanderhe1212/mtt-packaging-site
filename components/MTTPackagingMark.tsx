export default function MTTPackagingMark({ size = 40 }: { size?: number }) {
  return <img src="/brand/mtt-gold-triangle.webp" srcSet="/brand/responsive/mtt-gold-triangle-54.webp 54w, /brand/responsive/mtt-gold-triangle-108.webp 108w, /brand/mtt-gold-triangle.webp 256w" sizes={`${size}px`} width={size} height={size} alt="MTT Packaging" style={{ display: 'block', objectFit: 'contain', flexShrink: 0 }} />;
}
