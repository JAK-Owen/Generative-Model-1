// app.js

document.addEventListener("DOMContentLoaded", function () {
  let isAudioStarted = false;

  // Initialize Tone.js
  Tone.start();

  // Create instances of kick, hi-hat, and snare
  const kick = new Kick(window.globalControls.volumes.kick, window.globalControls.keys.kick);
  const hiHat = new HiHat(window.globalControls.volumes.hiHat, window.globalControls.keys.hiHat);
  const snare = new Snare(window.globalControls.volumes.snare, window.globalControls.keys.snare);

  // Drum beat pattern
  const kickPattern = new Tone.Pattern((time, note) => {
    if (note !== null) {
      kick.triggerAttackRelease(time);
    }
  }, [window.globalControls.keys.kick]).start(0);

  const hiHatPattern = new Tone.Pattern((time, note) => {
    if (note !== null) {
      hiHat.triggerAttackRelease(time);
    }
  }, [window.globalControls.keys.hiHat]).start("8n");

  const snarePattern = new Tone.Pattern((time, note) => {
    if (note !== null) {
      snare.triggerAttackRelease(time);
    }
  }, [null, window.globalControls.keys.snare]).start(0);

  // Connect everything and set BPM
  Tone.Transport.bpm.value = window.globalControls.bpm;

  // Start and stop buttons
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");

  startBtn.addEventListener("click", () => {
    if (!isAudioStarted) {
      Tone.start();
      isAudioStarted = true;
    }
    Tone.Transport.start();
  });

  stopBtn.addEventListener("click", () => {
    Tone.Transport.stop();
  });

  // Use Tone.Transport.start() to ensure consistent initialization
  Tone.Transport.start();

  // Refresh event to create a new kick drum synth with random parameters on each page reload
  window.addEventListener("beforeunload", () => {
    kick.createNewKick(window.globalControls.volumes.kick, window.globalControls.keys.kick);
    hiHat.createNewHiHat(window.globalControls.volumes.hiHat, window.globalControls.keys.hiHat);
    snare.createNewSnare(window.globalControls.volumes.snare, window.globalControls.keys.snare);
  });
});
