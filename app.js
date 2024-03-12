document.addEventListener("DOMContentLoaded", function () {
  let isAudioStarted = false;
  let bassLoopCount = 0;
  const maxBassLoops = 4;

  // Initialize Tone.js
  Tone.start();

  // Create instances of kick, hi-hat, snare, bass, and pad
  const kick = new Kick(
    globalControls.volumes.kick,
    `${globalControls.globalKey}1`
  );
  const hiHat = new HiHat();
  const snare = new Snare();
  const bass = new Bass(
    globalControls.volumes.bass,
    `${globalControls.globalKey}1`
  );

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
      bass.triggerAttackRelease(time);
    }
  }, generateRandomBassPattern()).start("16n");

  // Pad instance
  const pad = new Pad(
    globalControls.volumes.pad,
    globalControls.globalKey
  );

  // Start playing the constant minor chord
  pad.initialize();

  // Main loop to control the number of bass loops
  Tone.Transport.scheduleRepeat((time) => {
    if (bassLoopCount < maxBassLoops) {
      bassPattern.index = 0; // Reset the bass pattern index
      bassLoopCount++;
    }
  }, "4n");

  // Connect everything and set BPM
  Tone.Transport.bpm.value = globalControls.bpm;

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
    pad.stopPad(); // Call the stopPad method of the pad instance
    Tone.Transport.stop(); // Stop the Tone.Transport to ensure all sounds are stopped
  });

  // Use Tone.Transport.start() to ensure consistent initialization
  Tone.Transport.start();

  // Refresh event to create new drum and bass synths with random parameters on each page reload
  window.addEventListener("beforeunload", () => {
    kick.createNewKick(globalControls.volumes.kick, `${globalControls.globalKey}1`);
    hiHat.createNewHiHat();
    snare.createNewSnare();
    bass.createNewRandomBass(globalControls.volumes.bass, `${globalControls.globalKey}1`);
    pad.createNewRandomPad();
    bassLoopCount = 0; // Reset the bass loop count on refresh
  });

  // Export the pad instance for use in other files
  window.pad = pad;
});
