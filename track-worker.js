/**
 * Cloudflare Worker for dynamic Open Graph meta tags
 * Handles /music/:id routes to inject song metadata for social previews
 */

// External API endpoint for fetching song metadata
const EXTERNAL_API_BASE = 'https://songs.amaandildar53.workers.dev/music';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const pathParts = url.pathname.split('/')
  
  // Check for /music/:id
  if (pathParts[1] === 'music' && pathParts[2]) {
    const songId = pathParts[2]
    
    // Check if this is a bot/crawler by looking at User-Agent
    const userAgent = request.headers.get('User-Agent') || ''
    const isBot = /bot|crawler|spider|crawling/i.test(userAgent) || 
                  request.headers.get('Accept') === '*/*' ||
                  !request.headers.get('Accept') ||
                  /Discordbot|WhatsApp|Instagram|Twitterbot|facebookexternalhit/i.test(userAgent)
    
    // Only intercept for bots/crawlers
    if (isBot) {
      // Fetch song data from external API
      try {
        const songRes = await fetch(`${EXTERNAL_API_BASE}/${songId}`)
        
        if (!songRes.ok) {
          // If song not found, serve normal React app
          return fetch(request)
        }
        
        const song = await songRes.json()
        
        // If no song data, serve normal React app
        if (!song || !song.id) {
          return fetch(request)
        }
        
        // Generate HTML with dynamic OG tags
        const html = generateHtmlWithMetaTags(song, url.origin)
        
        return new Response(html, {
          headers: {
            'Content-Type': 'text/html',
            'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
          }
        })
      } catch (error) {
        console.error('Error fetching song data:', error)
        // On error, serve normal React app
        return fetch(request)
      }
    }
  }
  
  // For all other routes or for regular users, serve normal React app
  return fetch(request)
}

function generateHtmlWithMetaTags(song, origin) {
  // Extract song info with fallbacks
  const title = song.title || 'Unknown Track'
  const artist = song.artist || 'Unknown Artist'
  const album = song.album || 'Single'
  const coverUrl = song.cover_url || song.albumArt || ''
  const songUrl = `${origin}/music/${song.id}`
  const description = `Listen to "${title}" by ${artist} on Kryptik's music collection`
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>${title} by ${artist}</title>
  <meta name="title" content="${title} by ${artist}">
  <meta name="description" content="${description}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="music.song">
  <meta property="og:url" content="${songUrl}">
  <meta property="og:title" content="${title} by ${artist}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${coverUrl}">
  <meta property="og:image:alt" content="${title} album cover">
  <meta property="og:image:width" content="512">
  <meta property="og:image:height" content="512">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${songUrl}">
  <meta property="twitter:title" content="${title} by ${artist}">
  <meta property="twitter:description" content="${description}">
  <meta property="twitter:image" content="${coverUrl}">
  
  <!-- Music specific tags -->
  <meta property="og:audio" content="${song.file_url || song.audioUrl || ''}">
  <meta property="og:audio:type" content="audio/mpeg">
  
  <!-- Preload React app -->
  <link rel="preload" href="${origin}/static/js/bundle.js" as="script">
  <link rel="stylesheet" href="${origin}/static/css/main.css">
</head>
<body>
  <div id="root">
    <!-- Loading placeholder -->
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #000; color: #fff; font-family: Arial, sans-serif;">
      <div>
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="font-size: 24px; margin-bottom: 10px;">${title}</h1>
          <p style="font-size: 18px; color: #ccc;">${artist}</p>
        </div>
        <div style="text-align: center;">
          <p>Loading player...</p>
        </div>
      </div>
    </div>
  </div>
  
  <!-- React app will hydrate here -->
  <script src="${origin}/static/js/bundle.js"></script>
</body>
</html>`
}