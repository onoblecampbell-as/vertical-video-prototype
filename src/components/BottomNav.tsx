import { HomeIcon, SearchIcon, UserIcon } from './icons'

export default function BottomNav() {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'calc(var(--nav-height) + env(safe-area-inset-bottom))',
        background: 'rgba(0, 0, 0, 0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        paddingTop: 8,
        zIndex: 100,
      }}
    >
      <NavItem icon={<HomeIcon active />} label="Feed" active />
      <NavItem icon={<SearchIcon />} label="Discover" />
      <NavItem icon={<UserIcon />} label="Profile" />
    </nav>
  )
}

function NavItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  return (
    <button
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: active ? '#fff' : 'rgba(255,255,255,0.38)',
        padding: '4px 20px',
        minWidth: 64,
      }}
    >
      {icon}
      <span
        style={{
          fontSize: 10,
          fontWeight: active ? 600 : 400,
          letterSpacing: '0.03em',
        }}
      >
        {label}
      </span>
    </button>
  )
}
