import './style.css'

import Hls from 'hls.js'

const video = document.getElementById('video');

const hlsUrl = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'

if (Hls.isSupported()) {
    const hls = new Hls()
    hls.loadSource(hlsUrl);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play()
    })
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = hlsUrl;
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
} else{
    alert("Your browser doesn't support HLS playback")
}