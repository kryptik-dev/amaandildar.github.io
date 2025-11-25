# Cloudflare Worker for Dynamic Social Media Previews

This Cloudflare Worker dynamically generates Open Graph meta tags for your single track pages, enabling proper social media previews for platforms like Discord, WhatsApp, and Twitter.

## How It Works

1. When a request comes in for `/music/:id`, the Worker intercepts it
2. The Worker fetches song data from your Supabase backend
3. The Worker generates an HTML page with the correct meta tags already injected
4. Social media bots see the ready-to-go metadata without needing to execute JavaScript
5. Regular users still get the full React SPA experience

## Setup Instructions

### 1. Create a Cloudflare Worker

1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to Workers & Pages
3. Create a new Worker
4. Replace the default code with the contents of `track-worker.js`

### 2. Configure Your Supabase Credentials

In the Worker code, update these variables at the top:

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // e.g., 'https://your-project.supabase.co'
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Your Supabase anon key
```

### 3. Deploy the Worker

1. Click "Save and Deploy" in the Cloudflare Worker editor
2. Note the Worker URL (e.g., `https://your-worker.your-subdomain.workers.dev`)

### 4. Configure Your Domain (Optional)

If you want the Worker to handle your custom domain:

1. In the Worker settings, add a route
2. Set the route pattern to `yourdomain.com/music/*`
3. This will make your custom domain use the Worker for all `/music/` paths

## How It Works Technically

The Worker:
- Intercepts requests to `/music/:id` paths
- Fetches song data from your Supabase database
- Generates HTML with proper Open Graph and Twitter meta tags
- Caches responses for 1 hour to reduce backend load
- Falls back to serving your normal React app for any errors

## Benefits

✅ Dynamic song pages work for social previews
✅ No need to pre-build hundreds of static pages
✅ Fully serverless - no extra hosting needed
✅ SPA still works normally for users
✅ Proper caching to reduce backend calls

## Troubleshooting

If previews aren't working:

1. Check that your Supabase credentials are correct
2. Verify that your `music_tracks` table has the expected structure
3. Test the Worker URL directly in your browser
4. Check the Worker logs in the Cloudflare dashboard

## Customization

You can customize:
- The fallback image URL
- Cache duration
- Meta tag content
- Error handling behavior

The Worker is designed to be a drop-in solution that requires minimal configuration.