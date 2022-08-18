<script setup lang="ts">
import { ref } from "vue";

let isRecording = ref(false);
let mediaRecorder: MediaRecorder | null = null;
const audioArray: any = [];
let mediaStream: MediaStream;
let audioElement: HTMLAudioElement | null;

const audio = new Audio("test.mp3");

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
      console.log(event.data);
    };
    mediaRecorder.onstop = (event: any) => {
      const blob = new Blob(audioArray,{ type: "audio/webm;codecs=opus" });
      const blobURL = window.URL.createObjectURL(blob);
      audioElement = document.querySelector("audio");

      if (audioElement) {
        audioArray.splice(0);
        audioElement.src = blobURL;
        audioElement.play();
        console.log(blobURL);
      }
    };
    mediaRecorder.start();
    isRecording.value = true;
    console.log(isRecording.value);
  } catch (e) {
    console.error(e);
  }
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
  <audio controls="" id="AudioElement" src="{{ blobURL }}">녹음된 소리를 재생할 audio 엘리먼트</audio>
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
