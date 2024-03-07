document.addEventListener("DOMContentLoaded", function () {
  let isAudioStarted = false;
  let bassLoopCount = 0;

  // Initialize Tone.js
  Tone.start();

  // Create instances of kick, hi-hat, snare, and bass with global controls
  const kick = new Kick(globalControls.volumes.kick, globalControls.globalKey);
  const hiHat = new HiHat(globalControls.volumes.hiHat, globalControls.globalKey);
  const snare = new Snare(globalControls.volumes.snare, globalControls.globalKey);
  const bass = new Bass(globalControls.volumes.bass, globalControls.globalKey);

  // Drum beat pattern
  const kickPattern = new Tone.Pattern((time, note) => {
    if (note !== null) {
      // Trigger kick attack/release
      kick.triggerAttackRelease(time);
    }
  }, [`${globalControls.globalKey}1`]).start(0);

  const hiHatPattern = new Tone.Pattern((time, note) => {
    if (note !== null) {
      hiHat.triggerAttackRelease(time);
    }
  }, [`${globalControls.globalKey}1`]).start("8n");

  const snarePattern = new Tone.Pattern((time, note) => {
    if (note !== null) {
      snare.triggerAttackRelease(time);
    }
  }, [null, `${globalControls.globalKey}1`]).start(0);

  // Bass pattern
  const bassPattern = new Tone.Pattern((time, note) => {
    if (note !== null) {
      bass.triggerAttackRelease(time);
    }
  }, generateRandomBassPattern()).start("8n");

  function generateRandomBassPattern() {
    const patternLength = 8; // To adjust the length of the pattern
    const randomBassPattern = [];

    for (let i = 0; i < patternLength; i++) {
      const shouldPlayBass = Math.random() < 0.7; // Adjust the probability 
      randomBassPattern.push(shouldPlayBass ? `${globalControls.globalKey}1` : null);
    }

    return randomBassPattern;
  }

  // Main loop to control the number of bass loops
  Tone.Transport.scheduleRepeat((time) => {
    if (bassLoopCount < maxBassLoops) {
      // Trigger the bass loop
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
    Tone.Transport.stop();
  });

  // Use Tone.Transport.start() to ensure consistent initialization
  Tone.Transport.start();

  // Refresh event to create new drum synth instances on each page reload
  window.addEventListener("beforeunload", () => {
    kick.updateGlobalControls(globalControls);
    hiHat.updateGlobalControls(globalControls);
    snare.updateGlobalControls(globalControls);
    bass.updateGlobalControls(globalControls);
    bassLoopCount = 0; // Reset the bass loop count on refresh
  });
});
