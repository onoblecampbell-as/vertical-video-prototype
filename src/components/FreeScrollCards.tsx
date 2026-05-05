export default function FreeScrollCards() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 12 }}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            height: 'calc(100dvh - env(safe-area-inset-top) - 94px)',
            width: 'calc(100% - 16px)',
            margin: '0 auto',
            borderRadius: 24,
            background: '#fff',
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  )
}
