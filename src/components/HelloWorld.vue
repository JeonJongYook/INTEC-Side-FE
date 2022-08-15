<script setup lang="ts">
// 녹음중 상태 변수
let isRecording = false;

// MediaRecorder 변수 생성
let mediaRecorder: any = null;

// 녹음 데이터 저장 배열
const audioArray: any = [];

let audioEl = document.querySelector("audio");

const btnClickHandler = async (event: any) => {
  if(!isRecording){

    const mediaStream = await navigator.mediaDevices.getUserMedia({audio: true});

    mediaRecorder = new MediaRecorder(mediaStream);

    mediaRecorder.ondataavailable = (event:any)=>{
      audioArray.push(event.data);
    }

    mediaRecorder.onStop = (event:any)=>{

      const blob = new Blob(audioArray, {"type": "audio/ogg codecs=opus"});
      audioArray.splice(0);

      const blobURL = window.URL.createObjectURL(blob);

      audioEl.src = blobURL;
      audioEl.play();
    }

    // 녹음 시작
    mediaRecorder.start();
    isRecording = true;

  }else{
    // 녹음 종료
    mediaRecorder.stop();
    isRecording = false;
  }
}
</script>

<template>
<!--  Clean Code Failed -->
<!--  <h1>Audio Recorder</h1>-->
<!--  <div style="max-width: 28em; text-align: center; justify-content: center">-->
<!--    <div id="controls">-->
<!--      <button id="recordButton">Record</button>-->
<!--      <button id="stopButton" disabled>Stop</button>-->
<!--    </div>-->
<!--    <h3>Recordings List</h3>-->
<!--    <ol id="recordingsList"></ol>-->
<!--  </div>-->
  <button @click="">시작/종료</button>
  <br><br>
  <audio controls>녹음된 소리를 재생할 audio 엘리먼트</audio>
</template>

<style scoped>
</style>
