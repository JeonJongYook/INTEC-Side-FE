<script setup lang="ts">
import { ref } from "vue";

let isRecording = ref(false);
let mediaRecorder: MediaRecorder | null = null;
const audioArray: any = [];
let mediaStream: MediaStream;
const audioElement: HTMLAudioElement | null = document.querySelector("audio");
// const recordedAudio: HTMLElement | null = document.getElementById("recordedAudio");
const audio = new Audio("test.mp3");

// const AudioContext = window.AudioContext;
const audioCtx = new AudioContext();

const recordButtonClickHandler = async () => {
  try {
    console.log("Record Button Clicked.");
    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    mediaRecorder = new MediaRecorder(mediaStream);
    mediaRecorder.ondataavailable = (event: BlobEvent) => {
      audioArray.push(event.data);
      // console.log(audioArray);
      console.log(event.data);
    };
    mediaRecorder.onstop = (event: any) => {
      const blob = new Blob(audioArray, { type: "audio/webm;codecs=opus" });
      // audioArray.splice(0);
      const blobURL = window.URL.createObjectURL(blob);
      console.log(blobURL);
      if (audioElement) {
        console.log(blobURL);
        console.log("recorder stopped");
        audioArray.splice(0);
        const playAudio = new Audio(blobURL);
        // audioElement.src = blobURL;
        // audioElement.play();
        playAudio.play();
      }
      // const buffer = new ArrayBuffer(length);
      // return new Blob([buffer], {type: "audio/mp3"});
    };
    mediaRecorder.start();
    isRecording.value = true;
    console.log(isRecording.value);
  } catch (e) {
    console.error(e);
  }
  // mediaStream = await navigator.mediaDevices.getUserMedia({
  //   audio: true,
  // });
  // mediaRecorder = new MediaRecorder(mediaStream);
  // mediaRecorder.ondataavailable = (event: BlobEvent) => {
  //   audioArray.push(event.data);
  // };
  // mediaRecorder.onstop = (event: any) => {
  //   const blob = new Blob(audioArray, { type: "audio/webm;codecs=opus" });
  //   audioArray.splice(0);
  //   const blobURL = window.URL.createObjectURL(blob);
  //   if (audioElement) {
  //     audioElement.src = blobURL;
  //     audioElement.play();
  //   }
  // };
  // mediaRecorder.start();
  // isRecording.value = true;
};
const onStopButtonClicked = async () => {
  console.log("Stop Button Clicked.");
  if (mediaStream && isRecording.value) {
    mediaStream.getTracks().forEach((track) => track.stop());
  }
  isRecording.value = false;
};

const audioPlayHandler = async () => {
  audio.loop = true;
  audio.volume = 1;
  audio.play();
  console.log("Audio 재생중..");
};

const audioPauseHandler = async () => {
  audio.pause();
  console.log("Audio 재생 일시 정지함.");
}

const audioStopHandler = async () => {
  audio.pause();
  audio.currentTime = 0;
  console.log("Audio 재생 정지함.");
}

</script>
<template>
  <h1>Audio Recorder</h1>
  <div>
    <div id="controls">
      <button v-if="isRecording" id="stopButton" @click="onStopButtonClicked">
        중지
      </button>
      <button v-else id="recordButton" @click="recordButtonClickHandler">
        녹음
      </button>
      <button v-if="audioPlayHandler" @click="audioPlayHandler">
        시작
      </button>
      <button @click="audioPauseHandler">
        일시정지
      </button>
      <button @click="audioStopHandler">
        정지
      </button>
    </div>
    <h3>Recordings List</h3>
    <ol id="recordingsList"></ol>
  </div>
  <br /><br />
  <audio id="AudioElement">녹음된 소리를 재생할 audio 엘리먼트</audio>
  <audio id="recordedAudio"></audio>
  <br /><br />
  <br /><br />
  <br /><br />
  <input type=checkbox id="chk-hear-mic"><label for="chk-hear-mic">마이크 소리 듣기</label>
  <button id="record" @click="makeSound">녹음</button>
  <button id="stop">정지</button>
  <div id="sound-clips"></div>
  <br /><br /><br /><br /><br />
  <h1>Audio Recording Demo With WebAudioRecorder.js</h1>
  <p><small>Made by the <a href="https://addpipe.com" target="_blank">Pipe Video Recording Platform</a></small></p>
  <p>This demo shows you how to use <a href="https://github.com/higuma/web-audio-recorder-js" target="_blank">WebAudioRecorder.js</a> - a JavaScript library written in 2015 by higuma - to record audio and encode to common formats (pcm, Vorbis, mp3) directly in the browser.</p>
  <p>Check out the <a href="https://github.com/addpipe/simple-web-audio-recorder-demo" target="_blank">code on GitHub</a> and our <a href="https://addpipe.com/blog/using-webaudiorecorder-js-to-record-audio-on-your-website/" target="_blank">blog post on using WebAudioRecorder.js to Record MP3, Vorbis and WAV Audio</a>.</p>
    <div id="controls">
      <button id="recordButton">Record</button>
      <button id="stopButton" disabled>Stop</button>
    </div>
    <div id="formats"></div>
    <pre>Log</pre>
    <pre id="log"></pre>

    <pre>Recordings</pre>
    <ol id="recordingsList"></ol>
</template>
<style scoped>
button {
  border: 1px solid black;
  margin: 10px;
}
#controls {
  max-width: 120em;
}
</style>
