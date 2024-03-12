// app.js

document.addEventListener("DOMContentLoaded", function () {
  let isAudioStarted = false;
  let bassLoopCount = 0;
  const maxBassLoops = 4;

  // Initialize Tone.js
  Tone.start();

  // Create instances of kick, hi-hat, snare, bass, and pad
  const kick = new Kick(globalControls.volumes.kick);
  const hiHat = new HiHat();
  const snare = new Snare();
  const bass = new Bass(globalControls.volumes.bass, globalControls.globalKey);

  // Drum beat patterns
  const kickPattern = new Tone.Pattern((time, note) => {
    if (note !== null) {
      kick.triggerAttackRelease(time);
    }
  }, [`${globalControls.globalKey}1`]).start(0);

  const hiHatPattern = new Tone.Pattern((time, note) => {
    if (note !== null) {
      hiHat.triggerAttackRelease(time);
    }
  }, ["C2"]).start("8n");

  const snarePattern = new Tone.Pattern((time, note) => {
    if (note !== null) {
      snare.triggerAttackRelease(time);
    }
  }, [null, "C2"]).start(0);

  // Bass pattern
  const bassPattern = new Tone.Pattern((time, note) => {
    if (note !== null) {
      bass.adjustSynthParams();
      bass.triggerAttackRelease(time);
    }
  }, generateRandomBassPattern()).start("16n");

  // Pad instance
  const pad = new Pad(globalControls.volumes.pad, globalControls.globalKey);

  // Start and stop button (toggle)
  const toggleBtn = document.getElementById("toggleBtn");

  toggleBtn.addEventListener("click", () => {
    if (!isAudioStarted) {
      Tone.start();
      isAudioStarted = true;
      Tone.Transport.start();
      pad.initialize();
      toggleBtn.textContent = "Stop";
    } else {
      pad.stopPad();
      Tone.Transport.stop();
      isAudioStarted = false;
      toggleBtn.textContent = "Play";
    }
  });

  // Refresh event to create new drum and bass synths with random parameters on each page reload
  window.addEventListener("beforeunload", () => {
    kick.createNewKick(globalControls.volumes.kick);
    hiHat.setRandomHatParameters();
    snare.setRandomSnareParameters();
    bass.createNewRandomBass(globalControls.volumes.bass, globalControls.globalKey);
    pad.createNewRandomPad();
    bassLoopCount = 0;
  });

  // Export the pad instance for use in other files
  window.pad = pad;
});
