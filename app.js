document.addEventListener("DOMContentLoaded", function () {
  let isAudioStarted = false;

  // Initialize Tone.js
  Tone.start();

  function generateRandomKickParams() {
    const minPitch = Tone.Frequency("C1").toMidi(); // Convert C1 to MIDI
    const maxPitch = Tone.Frequency("C2").toMidi(); // Convert C2 to MIDI
  
    return {
      pitchDecay: Math.random() * 0.1 + 0.01,
      octaves: Math.floor(Math.random() * 3) + 4,
      oscillator: { type: "sine" },
      envelope: {
        attack: Math.random() * 0.01 + 0.001,
        decay: Math.random() * 0.2 + 0.2,
        sustain: 0,
        release: Math.random() * 0.1 + 0.01,
      },
      pitch: {
        min: minPitch,
        max: maxPitch,
      },
    };
  }
  

  // Function to create a new kick drum synth with random parameters
  function createNewKick() {
    // Dispose the old synth
    kick.dispose();
    // Generate new random kick parameters
    kickParams = generateRandomKickParams();
    // Create a new synth with random parameters
    kick = new Tone.MembraneSynth(kickParams).toDestination();
  }

  // Create a simple kick drum synth with initial random parameters
  let kickParams = generateRandomKickParams();
  let kick = new Tone.MembraneSynth(kickParams).toDestination();

  // Create a simple closed hi-hat synth
  let hiHat = new Tone.MetalSynth({
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
  let snare = new Tone.NoiseSynth({
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
  Tone.Transport.bpm.value = Math.floor(Math.random() * (140 - 120 + 1)) + 120;

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
  window.addEventListener("beforeunload", createNewKick);
});
