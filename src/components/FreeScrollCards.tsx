const CARD_H = 'calc(100dvh - env(safe-area-inset-top) - 94px)'
const CARD_W = 'calc(100% - 16px)'
const BG = '#0d0d0d'

function Card({ marginBottom = 0, marginTop = 0 }: { marginBottom?: number; marginTop?: number }) {
  return (
    <div
      style={{
        height: CARD_H,
        width: CARD_W,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop,
        marginBottom,
        borderRadius: 24,
        background: '#fff',
        flexShrink: 0,
      }}
    />
  )
}

function AnzeigeBar() {
  return (
    <div
      style={{
        height: 28,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        borderTop: '1px solid #FFBE00',
        borderBottom: '1px solid #FFBE00',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
          color: '#fff',
        }}
      >
        Anzeige
      </span>
    </div>
  )
}

export default function FreeScrollCards() {
  return (
    <div style={{ position: 'relative', paddingBottom: 12 }}>

      {/* [A] Sticky ad — sits at vertical centre of viewport, z: 1, behind cards */}
      <div
        style={{
          position: 'sticky',
          top: 'calc(50dvh - 125px)',
          height: 250,
          width: '100%',
          zIndex: 1,
        }}
      >
        <img
          src="/images/ads/interscroller-static.png"
          alt=""
          style={{ width: '100%', height: 250, objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* [B-top] Cards 1+2 + Anzeige bar — dark bg fills rounded card corners, z: 2 */}
      <div style={{ position: 'relative', zIndex: 2, background: BG, marginTop: -250 }}>
        <Card marginBottom={16} />
        <Card marginBottom={8} />
        <AnzeigeBar />
      </div>

      {/* Window — transparent gap; sticky ad (z: 1) paints through here */}
      <div style={{ height: 274 }} />

      {/* [B-bottom] Cards 3+4 — dark bg fills card corners, z: 2 */}
      <div style={{ position: 'relative', zIndex: 2, background: BG }}>
        <Card marginTop={16} marginBottom={16} />
        <Card />
      </div>

    </div>
  )
}
