document.addEventListener("DOMContentLoaded", function () {
  let isAudioStarted = false;
  let bassLoopCount = 0;
  const maxBassLoops = 4;

  // Initialize Tone.js
  Tone.start();

  // Create instances of kick, hi-hat, snare, and bass
  const kick = new Kick(
    globalControls.volumes.kick,
    `${globalControls.globalKey}1`
  );
  const hiHat = new HiHat(
    globalControls.volumes.hiHat,
    `${globalControls.globalKey}1`
  );
  const snare = new Snare(
    globalControls.volumes.snare,
    `${globalControls.globalKey}1`
  );

  const bass = new Bass(
    globalControls.volumes.bass,
    `${globalControls.globalKey}1`
  );

  // Drum beat pattern
  const kickPattern = new Tone.Pattern((time, note) => {
    if (note !== null) {
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
}, generateGroovyBassPattern()).start("16n");

// Function to generate a more interesting and groovy bass pattern
function generateGroovyBassPattern() {
  const patternLength = globalControls.patternLength * 4;
  const randomBassPattern = [];

  for (let i = 0; i < patternLength; i++) {
    const shouldPlayBass = Math.random() < 0.7;

    if (shouldPlayBass) {
      const noteLengths = ["1n", "2n", "4n", "8n", "16n"];
      const randomNoteLength = noteLengths[Math.floor(Math.random() * noteLengths.length)];

      const pitchVariation = Math.floor(Math.random() * 5) - 2;
      const pitch = `${globalControls.globalKey}${pitchVariation}`;

      const timingVariation = (Math.random() * 1 - 0.5) + "n";

      // Adjust filter, resonance, and distortion for each note
      const filterFreq = Math.random() * 5000 + 500;
      const resonance = Math.random() * 10 + 1;
      const distortion = Math.random() * 0.8;

      bass.adjustSynthParams(filterFreq, resonance, distortion);

      randomBassPattern.push(`${pitch}${randomNoteLength}${timingVariation}`);
    } else {
      randomBassPattern.push(null);
    }
  }

  return randomBassPattern;
}


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
    Tone.Transport.stop();
  });

  // Use Tone.Transport.start() to ensure consistent initialization
  Tone.Transport.start();

  // Refresh event to create new drum and bass synths with random parameters on each page reload
  window.addEventListener("beforeunload", () => {
    kick.createNewKick(globalControls.volumes.kick, `${globalControls.globalKey}1`);
    hiHat.createNewHiHat(globalControls.volumes.hiHat, `${globalControls.globalKey}1`);
    snare.createNewSnare(globalControls.volumes.snare, `${globalControls.globalKey}1`);
    bass.createNewTechnoBass(globalControls.volumes.bass, `${globalControls.globalKey}1`);
    bassLoopCount = 0; // Reset the bass loop count on refresh
  });
});
