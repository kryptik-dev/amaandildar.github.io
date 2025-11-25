<?php
// Get the track ID from the URL
$trackId = $_GET['id'] ?? '';

// If no track ID, redirect to music page
if (empty($trackId)) {
    header('Location: /music');
    exit;
}

// You would fetch the track data from your database here
// For now, we'll use placeholder data
$trackTitle = 'Unknown Track';
$trackArtist = 'Unknown Artist';
$trackAlbum = 'Single';
$coverUrl = 'https://avatar-cyan.vercel.app/api/pfp/1347203516304986147/image';
$trackUrl = "https://kryptik.dev/music/$trackId";

// In a real implementation, you would query your Supabase database:
/*
$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => 'https://your-supabase-url.supabase.co/rest/v1/music_tracks?id=eq.'.$trackId,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'apikey: YOUR_SUPABASE_ANON_KEY',
        'Authorization: Bearer YOUR_SUPABASE_ANON_KEY'
    ]
]);

$response = curl_exec($curl);
$tracks = json_decode($response, true);
curl_close($curl);

if (!empty($tracks)) {
    $track = $tracks[0];
    $trackTitle = $track['title'] ?? 'Unknown Track';
    $trackArtist = $track['artist'] ?? 'Unknown Artist';
    $trackAlbum = $track['album'] ?? 'Single';
    $coverUrl = $track['cover_url'] ?? 'https://avatar-cyan.vercel.app/api/pfp/1347203516304986147/image';
}
*/
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars("$trackTitle by $trackArtist"); ?></title>
    
    <!-- Primary Meta Tags -->
    <meta name="title" content="<?php echo htmlspecialchars("$trackTitle by $trackArtist"); ?>">
    <meta name="description" content="Listen to <?php echo htmlspecialchars($trackTitle); ?> by <?php echo htmlspecialchars($trackArtist); ?> on Kryptik's music collection">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="music.song">
    <meta property="og:url" content="<?php echo $trackUrl; ?>">
    <meta property="og:title" content="<?php echo htmlspecialchars("$trackTitle by $trackArtist"); ?>">
    <meta property="og:description" content="Listen to <?php echo htmlspecialchars($trackTitle); ?> by <?php echo htmlspecialchars($trackArtist); ?> on Kryptik's music collection">
    <meta property="og:image" content="<?php echo $coverUrl; ?>">
    <meta property="og:image:alt" content="<?php echo htmlspecialchars("$trackTitle album cover"); ?>">
    <meta property="og:image:width" content="512">
    <meta property="og:image:height" content="512">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="<?php echo $trackUrl; ?>">
    <meta property="twitter:title" content="<?php echo htmlspecialchars("$trackTitle by $trackArtist"); ?>">
    <meta property="twitter:description" content="Listen to <?php echo htmlspecialchars($trackTitle); ?> by <?php echo htmlspecialchars($trackArtist); ?> on Kryptik's music collection">
    <meta property="twitter:image" content="<?php echo $coverUrl; ?>">
    
    <!-- Music specific tags -->
    <meta property="og:audio" content="<?php echo $trackUrl; ?>">
    <meta property="og:audio:type" content="audio/mpeg">
    
    <!-- Redirect to the actual React app after a short delay -->
    <meta http-equiv="refresh" content="0;url=/music/<?php echo $trackId; ?>">
    
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #000;
            color: #fff;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
        }
        .redirect-message {
            max-width: 500px;
            padding: 20px;
        }
        .redirect-message h1 {
            font-size: 24px;
            margin-bottom: 20px;
        }
        .redirect-message p {
            font-size: 16px;
            color: #ccc;
        }
    </style>
</head>
<body>
    <div class="redirect-message">
        <h1>Redirecting to <?php echo htmlspecialchars($trackTitle); ?></h1>
        <p>If you are not redirected automatically, <a href="/music/<?php echo $trackId; ?>" style="color: #4ade80;">click here</a>.</p>
    </div>
</body>
</html>