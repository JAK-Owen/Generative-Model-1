document.addEventListener("DOMContentLoaded", function () {
  let isAudioStarted = false;

  // BPM Range
  const bpm = Math.floor(Math.random() * (140 - 120 + 1)) + 120;

  // Initialize Tone.js
  Tone.start();

  // Create a simple kick drum synth
  const kick = new Tone.MembraneSynth({
    pitchDecay: 0.01,
    octaves: 6,
    oscillator: { type: "sine" },
    envelope: {
      attack: 0.001,
      decay: 0.4,
      sustain: 0,
      release: 0.05,
    },
  }).toDestination();

  // Create a simple closed hi-hat synth
  const hiHat = new Tone.MetalSynth({
    frequency: 400,
    envelope: {
      attack: 0.001,
      decay: 0.03,
      release: 0.02,
    },
    harmonicity: 5.1,
    modulationIndex: 16,
    resonance: 4000,
    octaves: 1.5,
  }).toDestination();

  // Create a simple snare drum synth
  const snare = new Tone.NoiseSynth({
    envelope: {
      attack: 0.001,
      decay: 0.06,
      sustain: 0,
      release: 0.05,
    },
    filter: {
      Q: 1,
    },
    filterEnvelope: {
      attack: 0.001,
      decay: 0.02,
      sustain: 0,
    },
  }).toDestination();

  // Drum beat pattern
  const kickPattern = new Tone.Pattern((time, note) => {
    if (note !== null) {
      kick.triggerAttackRelease("C2", "8n", time);
    }
  }, ["C2"]).start(0);

  const hiHatPattern = new Tone.Pattern((time, note) => {
    if (note !== null) {
      hiHat.triggerAttackRelease("16n", time);
    }
  }, ["C2"]).start("8n");

  const snarePattern = new Tone.Pattern((time, note) => {
    if (note !== null) {
      snare.triggerAttackRelease("8n", time);
    }
  }, [null, "C2"]).start(0);

  // Connect everything and set BPM
  Tone.Transport.bpm.value = bpm;

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
});
