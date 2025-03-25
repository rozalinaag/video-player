import './style.css'
import {io} from "socket.io-client";
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

//------------------------------------------------------------------
// WebSocket

const socket = io('http://localhost:3001')

socket.on('message', (msg) => {
    const messageContainer = document.getElementById('messages');
    const newMessage = document.createElement('p');
    newMessage.textContent = msg;
    messageContainer.appendChild(newMessage);
})

//-------------------------------------------------------------------
//Webcamera

const videoElement = document.getElementById('webcam');

async function startWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        videoElement.srcObject = stream;
    } catch (error) {
        console.error('Error accessing webcam:', error);
    }
}

startWebcam();
