<script setup lang="ts">
let isRecording: any = false;
let mediaRecorder: any = null;
const audioArray: any = [];

let audioElement: HTMLAudioElement | null = document.querySelector("audio");

const btnClickHandler = async (event:any) => {
  if(!isRecording){

    const mediaStream = await navigator.mediaDevices.getUserMedia({audio: true});

    mediaRecorder = new MediaRecorder(mediaStream);

    mediaRecorder.ondataavailable = (event:any)=>{
      audioArray.push(event.data);
    }

    mediaRecorder.onStop = (event:any) => {

      const blob = new Blob(audioArray, {"type": "audio/ogg codecs=opus"});
      audioArray.splice(0);

      const blobURL = window.URL.createObjectURL(blob);

      if(audioElement) {
        audioElement.src = blobURL;
        audioElement.play();
      }
    }

    mediaRecorder.start();
    isRecording = true;

  }else{
    mediaRecorder.stop();
    isRecording = false;
  }
}
</script>

<template>
  <button @click="">시작/종료</button>
  <br><br>
  <audio controls>녹음된 소리를 재생할 audio 엘리먼트</audio>
</template>

<style scoped>
</style>
