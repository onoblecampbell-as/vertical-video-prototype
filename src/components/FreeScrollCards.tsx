const CARD_H = 'calc(100dvh - env(safe-area-inset-top) - 94px)'
const CARD_W = 'calc(100% - 16px)'

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

function LabelBar({ children }: { children: string }) {
  return (
    <div
      style={{
        height: 24,
        background: '#e9ecef',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span style={{ fontSize: 12, color: '#495057', letterSpacing: '0.04em' }}>{children}</span>
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

      {/* [B] Content overlay — pulled up by -250px so it starts at wrapper top, z: 2 */}
      {/* Opaque white cards hide the ad; transparent window reveals it */}
      <div style={{ marginTop: -250, position: 'relative', zIndex: 2 }}>
        <Card marginBottom={16} />
        <Card marginBottom={8} />
        <LabelBar>Anzeige</LabelBar>
        {/* Window — no background, sticky ad shows through */}
        <div style={{ height: 274, background: 'transparent' }} />
        <LabelBar>Weiter mit BILD</LabelBar>
        <Card marginTop={8} marginBottom={16} />
        <Card />
      </div>

    </div>
  )
}
