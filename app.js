// app.js

document.addEventListener("DOMContentLoaded", function () {
  let isAudioStarted = false;
  let bassLoopCount = 0;
  const maxBassLoops = 4; // Adjust the maximum number of bass loops

  // Initialize Tone.js
  Tone.start();

  // Create instances of kick, hi-hat, and snare etc.
  const kick = new Kick(
    globalControls.volumes.kick,
    `${globalControls.globalKey}1` // Use only the global key
  );
  const hiHat = new HiHat(
    globalControls.volumes.hiHat,
    `${globalControls.globalKey}1` // Use only the global key
  );
  const snare = new Snare(
    globalControls.volumes.snare,
    `${globalControls.globalKey}1` // Use only the global key
  );

  const bass = new Bass(
    globalControls.volumes.bass,
    `${globalControls.globalKey}1` // Use only the global key
  );

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

  // Function to generate a random bass pattern
  function generateRandomBassPattern() {
    const patternLength = globalControls.patternLength;
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

  // Refresh event to create a new kick drum synth with random parameters on each page reload
  window.addEventListener("beforeunload", () => {
    kick.createNewKick(
      globalControls.volumes.kick,
      `${globalControls.globalKey}1`
    );
    hiHat.createNewHiHat(
      globalControls.volumes.hiHat,
      `${globalControls.globalKey}1`
    );
    snare.createNewSnare(
      globalControls.volumes.snare,
      `${globalControls.globalKey}1`
    );
    bass.createNewBass(
      globalControls.volumes.bass,
      `${globalControls.globalKey}1`
    );
    bassLoopCount = 0; // Reset the bass loop count on refresh
  });
});
