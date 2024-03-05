class Snare {
    constructor() {
      // Initialize with default parameters
      this.setRandomSnareParameters();
    }
  
    // Function to set random snare parameters
    setRandomSnareParameters() {
      const attack = this.randomInRange(0.001, 0.01); // Sharp and immediate attack
      const decay = this.randomInRange(0.01, 0.1); // Short to moderate decay
      const sustain = this.randomInRange(0.001, 0.01); // Reduced sustain level for a tighter sound
      const release = this.randomInRange(0.001, 0.02); // Short release time
      const pitch = this.randomInRange(-12, 12); // Tune the snare within a range of -12 to 12 semitones
  
      // Create a new NoiseSynth instance with random parameters
      this.synth = new Tone.NoiseSynth({
        envelope: {
          attack: attack,
          decay: decay,
          sustain: sustain,
          release: release,
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
  
      // Apply pitch tuning
      this.synth.pitch = pitch;
    }
  
    // Function to trigger attack and release of the snare
    triggerAttackRelease(time) {
      this.synth.triggerAttackRelease("8n", time);
    }
  
    // Function to generate a random number within a specified range
    randomInRange(min, max) {
      return Math.random() * (max - min) + min;
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
  