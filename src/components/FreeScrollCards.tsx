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

// Self-contained interscroller slot — sticky ad background + opaque cards above/below + transparent window
function InterscrollerSlot({
  topCards,
  bottomCards,
  creative,
}: {
  topCards: React.ReactNode
  bottomCards: React.ReactNode
  creative: React.ReactNode
}) {
  return (
    <div style={{ position: 'relative' }}>
      {/* Sticky ad — full viewport height, z: 1, visible through window */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100dvh',
          width: 'calc(100% - 16px)',
          marginLeft: 8,
          marginRight: 8,
          zIndex: 1,
          borderRadius: 24,
          overflow: 'hidden',
        }}
      >
        {creative}
      </div>

      {/* [B-top] Opaque cards above window — dark bg fills card corner gaps, z: 2 */}
      <div style={{ position: 'relative', zIndex: 2, background: BG, marginTop: '-100dvh' }}>
        {topCards}
        <AnzeigeBar />
      </div>

      {/* Transparent window — sticky ad shows through here */}
      <div style={{ height: 274 }} />

      {/* [B-bottom] Opaque cards below window — covers ad after reveal, z: 2 */}
      <div style={{ position: 'relative', zIndex: 2, background: BG }}>
        {bottomCards}
      </div>
    </div>
  )
}

export default function FreeScrollCards() {
  return (
    <div style={{ paddingBottom: 12 }}>
      <InterscrollerSlot
        creative={
          <img
            src="/images/ads/interscroller-static.png"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center top', display: 'block' }}
          />
        }
        topCards={
          <>
            <Card marginBottom={16} />
            <Card marginBottom={8} />
          </>
        }
        bottomCards={
          <>
            <Card marginTop={16} marginBottom={16} />
            <Card />
          </>
        }
      />
    </div>
  )
}
