import { ChevronLeftIcon } from './icons'

export default function TopBar() {
  const handleBack = () => window.history.back()

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: 'calc(env(safe-area-inset-top) + 8px)',
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          height: 44,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 4,
        }}
      >
        <button
          onClick={handleBack}
          aria-label="Go back"
          style={{
            pointerEvents: 'auto',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#fff',
            padding: '8px 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.8))',
          }}
        >
          <ChevronLeftIcon />
        </button>
      </div>
    </div>
  )
}
