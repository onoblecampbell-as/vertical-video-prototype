import ArticleCard from './ArticleCard'
import type { ArticleCardData } from './ArticleCard'
import MiniArticleCard from './MiniArticleCard'
import type { MiniArticleCardData } from './MiniArticleCard'
import PodcastCard from './PodcastCard'
import MiniPodcastCard from './MiniPodcastCard'
import MiniVideoCard from './MiniVideoCard'

const CARD_H = 'calc(var(--real-vh, 100dvh) - env(safe-area-inset-top) - 94px)'
const CARD_W = 'calc(100% - 16px)'
const BG = '#0d0d0d'

const BAHN2_ARTICLE: MiniArticleCardData = {
  heroSrc: '/images/articles/bahn2-hero.jpg',
  kicker: 'Minus 760 Millionen Euro',
  title: 'Mega-Verlust bei der Deutschen Bahn',
}

const DAX_ARTICLE: MiniArticleCardData = {
  heroSrc: '/images/articles/dax-hero.png',
  kicker: '„Größte Ölkrise der Geschichte"',
  title: 'Rund 150 Milliarden Euro weg - Krieg drückt den Dax',
}

const BAHN_ARTICLE: ArticleCardData = {
  heroSrc: '/images/articles/bahn-hero.png',
  kicker: 'Minus 760 Millionen Euro',
  title: 'Mega-Verlust bei der Deutschen Bahn',
  description: 'Die Deutschen Bahn (DB) hat im ersten Halbjahr einen Verlust in Höhe von 760 Millionen Euro eingefahren',
  likeCount: 120,
}

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

function DoubleCard({
  marginBottom = 0,
  marginTop = 0,
  top,
  bottom,
}: {
  marginBottom?: number
  marginTop?: number
  top?: React.ReactNode
  bottom?: React.ReactNode
}) {
  return (
    <div
      style={{
        height: CARD_H,
        width: CARD_W,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop,
        marginBottom,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {top ?? <div style={{ flex: 1, borderRadius: 24, background: '#fff' }} />}
      {bottom ?? <div style={{ flex: 1, borderRadius: 24, background: '#fff' }} />}
    </div>
  )
}

function WeiterBar() {
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
        Weiter mit Inhalt
      </span>
    </div>
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
          height: 'var(--real-vh, 100dvh)',
          width: 'calc(100% - 16px)',
          marginLeft: 8,
          marginRight: 8,
          zIndex: 1,
        }}
      >
        {/* overflow:hidden lives on inner wrapper — putting it on the sticky element itself breaks iOS Safari */}
        <div style={{ width: '100%', height: '100%', borderRadius: 24, overflow: 'hidden' }}>
          {creative}
        </div>
      </div>

      {/* [B-top] Opaque cards above window — dark bg fills card corner gaps, z: 2 */}
      <div style={{ position: 'relative', zIndex: 2, background: BG, marginTop: 'calc(-1 * var(--real-vh, 100dvh))' }}>
        {topCards}
        <AnzeigeBar />
      </div>

      {/* Transparent window — sticky ad shows through here */}
      <div style={{ height: 274 }} />

      {/* [B-bottom] Opaque cards below window — covers ad after reveal, z: 2 */}
      <div style={{ position: 'relative', zIndex: 2, background: BG }}>
        <WeiterBar />
        {bottomCards}
      </div>
    </div>
  )
}

export default function FreeScrollCards() {
  return (
    <div>
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
            <ArticleCard data={BAHN_ARTICLE} marginBottom={16} />
            <DoubleCard
              marginBottom={16}
              top={<MiniArticleCard data={DAX_ARTICLE} />}
              bottom={<PodcastCard />}
            />
          </>
        }
        bottomCards={
          <>
            <DoubleCard
              marginTop={16}
              marginBottom={16}
              top={<MiniPodcastCard />}
              bottom={<MiniArticleCard data={BAHN2_ARTICLE} />}
            />
          </>
        }
      />
    </div>
  )
}
