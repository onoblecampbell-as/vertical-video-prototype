const CARD_W = 'calc(100% - 16px)'

export default function HorizontalVideoCard({ marginBottom = 0, marginTop = 0, height = 247, width = CARD_W }: { marginBottom?: number; marginTop?: number; height?: number; width?: string }) {
  return (
    <div
      style={{
        height,
        width,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop,
        marginBottom,
        borderRadius: 24,
        overflow: 'hidden',
        flexShrink: 0,
        background: '#000',
      }}
    >
      <img
        src="/images/thumbnails/horizontal-video-thumb1.png"
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  )
}
