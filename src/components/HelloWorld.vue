<script setup lang="ts">
import { ref } from "vue";

let isRecording = ref(false);

let mediaRecorder: MediaRecorder | null = null;
const audioArray: any = [];
let mediaStream: MediaStream;
let audioElement: HTMLAudioElement | null = document.querySelector("audio");

const recordButtonClickHandler = async () => {
  mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });

  mediaRecorder = new MediaRecorder(mediaStream);

  mediaRecorder.ondataavailable = (event: BlobEvent) => {
    audioArray.push(event.data);
  };

  mediaRecorder.onstop = (event: any) => {
    const blob = new Blob(audioArray, { type: "audio/ogg codecs=opus" });
    audioArray.splice(0);

    const blobURL = window.URL.createObjectURL(blob);
    if (audioElement) {
      audioElement.src = blobURL;
      audioElement.play();
    }
  };

  mediaRecorder.start();
  isRecording.value = true;
};

const onStopButtonClicked = async () => {
  if (mediaStream && isRecording.value) {
    mediaStream.getTracks().forEach((track) => track.stop());
  }
  isRecording.value = false;
};
</script>

<template>
  <h1>Audio Recorder</h1>
  <div>
    <div id="controls">
      <button v-if="isRecording" id="stopButton" @click="onStopButtonClicked">
        Stop
      </button>
      <button v-else id="recordButton" @click="recordButtonClickHandler">
        Record
      </button>
    </div>
    <h3>Recordings List</h3>
    <ol id="recordingsList"></ol>
  </div>
  <br /><br />
  <audio>녹음된 소리를 재생할 audio 엘리먼트</audio>
</template>

<style scoped></style>
