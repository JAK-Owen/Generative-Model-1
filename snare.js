class Snare {
  constructor() {
    // Initialize with default parameters
    this.setRandomSnareParameters();

    // Connect to globalControls
    window.updateSnareVolume = this.updateVolume.bind(this);
    window.updateSnareControls = this.updateGlobalControls.bind(this);

    // Set initial volume using the updateVolume function
    this.updateVolume();
  }

  // Function to set random snare parameters
  setRandomSnareParameters() {
    const attack = this.randomInRange(0.001, 0.01);
    const decay = this.randomInRange(0.01, 0.1);

    const envelope = {
      attack: attack || 0.001,
      decay: decay || 0.01,
      release: 0.02,
    };

    this.synth = new Tone.NoiseSynth({
      envelope: envelope,
      filter: {
        type: 'lowpass',
        frequency: 3000,
        Q: 5,
      },
      filterEnvelope: {
        attack: 0.001,
        decay: 0.02,
        sustain: 0,
      },
      noise: {
        type: 'white',
      },
    }).toDestination();
  }

  // Function to trigger attack and release of the snare
  triggerAttackRelease(time) {
    this.synth.triggerAttackRelease("8n", time);
  }

  // Function to generate a random number within a specified range
  randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Function to update volume based on global controls
  updateVolume() {
    this.synth.volume.value = globalControls.volumes.snare;
  }

  // Function to update global controls
  updateGlobalControls(newControls) {
    this.synth.dispose();
    Object.assign(this, newControls);
    this.setRandomSnareParameters();
    this.updateVolume();
    this.synth = new Tone.NoiseSynth({
      envelope: this.synth.envelope,
      filter: this.synth.filter,
      filterEnvelope: this.synth.filterEnvelope,
      noise: this.synth.noise,
    }).toDestination();
  }
}

// Create an instance of the Snare class
const snare = new Snare();

// Drum beat pattern for snare
const snarePattern = new Tone.Pattern((time, note) => {
  if (note !== null) {
    snare.triggerAttackRelease(time);
  }
}, [null, "C2"]).start(0);

// Export the snare instance for use in other files
window.snare = snare;
