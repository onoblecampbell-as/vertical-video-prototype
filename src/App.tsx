import VideoFeed from './components/VideoFeed'
import TopBar from './components/TopBar'

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
      <TopBar />
    </div>
  )
}
