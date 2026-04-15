import VideoFeed from './components/VideoFeed'
import BottomNav from './components/BottomNav'

export default function App() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <VideoFeed />
      <BottomNav />
    </div>
  )
}
