class Bass {
    constructor() {
      this.params = this.generateRandomBassParams();
      this.synth = new Tone.MembraneSynth(this.params).toDestination();
    }
  
    generateRandomBassParams() {
      const minPitch = Tone.Frequency("F0").toMidi();
      const maxPitch = Tone.Frequency("C1").toMidi();
  
      return {
        pitchDecay: Math.random() * 0.1 + 0.01,
        octaves: Math.floor(Math.random() * 3) + 4,
        oscillator: { type: "sine" },
        envelope: {
          attack: Math.random() * 1.5 + 0.001,
          decay: Math.random() * 0.5 + 1.0,
          sustain: 0,
          release: Math.random() * 0.1 + 0.01,
        },
        pitch: {
          min: minPitch,
          max: maxPitch,
        },
      };
    }
  
    triggerAttackRelease(time) {
      this.synth.triggerAttackRelease("C2", "8n", time);
    }
  
    createNewBass() {
      this.synth.dispose();
      this.params = this.generateRandomBassParams();
      this.synth = new Tone.MembraneSynth(this.params).toDestination();
    }
  }
  