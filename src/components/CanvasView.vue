<template>
  <h3>CanvasView</h3>

  <div>
    Click here to start the waveform:
    <button @click="play">Start/Stop</button>
  </div>
  <br /><br />
  <div>
    <input onchange="changetype()" type="radio" name="waveform" checked value="sine">
    Sine <br />
    <input onchange="changetype()" type="radio" name="waveform" checked value="sawtooth">
    Sawtooth <br />
    <input onchange="changetype()" type="radio" name="waveform" checked value="triangle">
    Triangle <br />
    <input onchange="changetype()" type="radio" name="waveform" checked value="square">
    Square <br />
  </div>
  <br />
  <div>
    <input id="freqSlider" type="range" onchange="changefreq()" name="">
  </div>
</template>

<script>
let play;
let changefreq;
let oscillator;
let changetype;

const oscProp = {
  type: "sine",
  frequency: 400,
  audioIsPlaying: false
}

const audioContext = new AudioContext();
window.onload = function () {
    play = function () {
      if(oscProp.playing){
        oscillator.stop();
        oscProp.playing = false;
      }
      else {
        oscillator = audioContext.createOscillator();
        oscillator.type = oscProp.type;
        oscillator.frequency.setValueAtTime(oscProp.frequency, audioContext.currentTime);
        oscillator.connect(audioContext.destination);
        oscillator.start();
        oscProp.playing = true;
      }
    }

    changefreq = function () {
      oscProp.frequency = document.getElementById("freqSlider").value = 50;
      play();
      play();
    }

    changeType = function () {
      oscProp.type = document.querySelector("input[name = 'waveform']:checked").value;
      play();
      play();
    }
}

</script>

<style scoped>

</style>