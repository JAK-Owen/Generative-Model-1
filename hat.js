class HiHat {
    constructor() {
      // Initialize with default parameters
      this.setRandomHatParameters();
    }
  
    // Function to set random hi-hat parameters
    setRandomHatParameters() {
      const frequency = this.randomInRange(8000, 12000); // Frequency between 8 kHz and 12 kHz
      const decay = this.randomInRange(0.001, 0.02); // Adjusted decay range
      const attack = this.randomInRange(0.001, 0.005); // Adjusted attack range
  
      // Create a new MetalSynth instance with random parameters
      this.synth = new Tone.MetalSynth({
        frequency: frequency,
        envelope: {
          attack: attack,
          decay: decay,
          release: 0.02,
        },
        harmonicity: 5.1,
        modulationIndex: 16,
        resonance: 4000,
        octaves: 1.5,
      }).toDestination();
    }
  
    // Function to trigger attack and release of the hi-hat
    triggerAttackRelease(time) {
      this.synth.triggerAttackRelease("16n", time);
    }
  
    // Function to generate a random number within a specified range
    randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
  }
  
  // Create an instance of the HiHat class
  const hiHat = new HiHat();
  
  // Drum beat pattern for hi-hat
  const hiHatPattern = new Tone.Pattern((time, note) => {
    if (note !== null) {
      hiHat.triggerAttackRelease(time);
    }
  }, ["C2"]).start("8n");
  