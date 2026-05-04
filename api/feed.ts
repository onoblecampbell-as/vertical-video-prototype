const FEED_URL = 'https://www.bild.de/feed/vWNdvZIMOpf9PqfTGWIj'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(_req: any, res: any) {
  try {
    const upstream = await fetch(FEED_URL)
    if (!upstream.ok) {
      res.status(502).end('Feed upstream error')
      return
    }
    const xml = await upstream.text()
    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
    res.send(xml)
  } catch {
    res.status(500).end('Internal error')
  }
}
