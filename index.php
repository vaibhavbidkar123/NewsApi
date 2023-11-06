<?php
$api_key = '68d0b002f6ff432f9a3e9c3d237ef0fc';

$endpoint = 'https://newsapi.org/v2/top-headlines';

// Customize your query parameters
$parameters = [
    'country' => 'us', // Example: Get top headlines in the United States
    'apiKey' => $api_key,
];

$headers = [
    'User-Agent: YourAppName/1.0', // Replace 'YourAppName' with your application's name and version
];

$url = $endpoint . '?' . http_build_query($parameters);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); // Set the User-Agent header
$response = curl_exec($ch);
curl_close($ch);

if ($response !== false) {
    $data = json_decode($response, true);
    if ($data['status'] == 'ok' && isset($data['articles'])) {
        $articles = $data['articles'];

        // Begin HTML output
        echo '<html>';

        echo '<head><link rel="stylesheet" type="text/css" href="style.css"><title>News Articles</title></head><body>';

        // Loop through and display articles
        foreach ($articles as $index => $article) {
            echo "<div class='card'>";
            echo "<h2>News Article $index</h2>";
            echo "<p><strong>Source:</strong> " . $article['source']['name'] . "</p>";
            echo "<p><strong>Title:</strong> " . $article['title'] . "</p>";
            echo "<p><strong>Description:</strong> " . $article['description'] . "</p>";
            echo "<p><strong>URL:</strong> <a href='" . $article['url'] . "' target='_blank'>Read More</a></p>";
            echo "<p><strong>Published At:</strong> " . $article['publishedAt'] . "</p>";
            echo "<p><strong>Content:</strong> " . $article['content'] . "</p>";
            echo "</div>";
        }

        // End HTML output
        echo '</body></html>';
    } else {
        echo 'No articles found.';
    }
} else {
    echo 'Error fetching data from the API';
}
?>
