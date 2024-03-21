<?php

$data = '{"success":true,"data":{"memes":[{"id":"181913649","name":"Drake Hotline Bling","url":"https:\/\/i.imgflip.com\/30b1gx.jpg","width":1200,"height":1200,"box_count":2,"captions":1218750},{"id":"87743020","name":"Two Buttons","url":"https:\/\/i.imgflip.com\/1g8my4.jpg","width":600,"height":908,"box_count":3,"captions":977000},{"id":"112126428","name":"Distracted Boyfriend","url":"https:\/\/i.imgflip.com\/1ur9b0.jpg","width":1200,"height":800,"box_count":3,"captions":1010750},{"id":"217743513","name":"UNO Draw 25 Cards","url":"https:\/\/i.imgflip.com\/3lmzyx.jpg","width":500,"height":494,"box_count":2,"captions":539250},{"id":"131087935","name":"Running Away Balloon","url":"https:\/\/i.imgflip.com\/261o3j.jpg","width":761,"height":1024,"box_count":5,"captions":518250},{"id":"124822590","name":"Left Exit 12 Off Ramp","url":"https:\/\/i.imgflip.com\/22bdq6.jpg","width":804,"height":767,"box_count":3,"captions":620000},{"id":"222403160","name":"Bernie I Am Once Again Asking For Your Support","url":"https:\/\/i.imgflip.com\/3oevdk.jpg","width":750,"height":750,"box_count":2,"captions":275250},{"id":"129242436","name":"Change My Mind","url":"https:\/\/i.imgflip.com\/24y43o.jpg","width":482,"height":361,"box_count":2,"captions":608500},{"id":"4087833","name":"Waiting Skeleton","url":"https:\/\/i.imgflip.com\/2fm6x.jpg","width":298,"height":403,"box_count":2,"captions":413750},{"id":"249257686","name":"Bugs bunny communist","url":"https:\/\/i.imgflip.com\/44eggm.png","width":460,"height":284,"box_count":2,"captions":40250}]}}';

// Decode the JSON data
$dataArray = json_decode($data, true);

// Extract memes data
$memes = $dataArray['data']['memes'];

// Function to format meme data
function formatMeme($meme) {
    $formattedMeme = [
        'id' => $meme['id'],
        'name' => $meme['name'],
        'url' => $meme['url'],
        'width' => $meme['width'],
        'height' => $meme['height'],
        'box_count' => $meme['box_count'],
        'captions' => $meme['captions']
    ];

    return $formattedMeme;
}

// Array to store formatted memes
$formattedMemes = [];

// Format each meme
foreach ($memes as $meme) {
    $formattedMemes[$meme['id']] = formatMeme($meme);
}

// Output the formatted memes
print_r($formattedMemes);

?>
