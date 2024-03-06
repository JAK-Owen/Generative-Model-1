class Bass {
    constructor() {
      this.params = this.generateTechnoBassParams();
      this.synth = new Tone.MembraneSynth(this.params).toDestination();
    }
  
    generateTechnoBassParams() {
      const minPitch = Tone.Frequency("F0").toMidi();
      const maxPitch = Tone.Frequency("C1").toMidi();
  
      return {
        pitchDecay: Math.random() * 0.1 + 0.01,
        octaves: Math.floor(Math.random() * 3) + 4,
        oscillator: { type: "sine" }, 
        envelope: {
          attack: Math.random() * 0.1 + 0.01,
          decay: Math.random() * 0.5 + 0.5, 
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
      // Trigger attack release with specific note and duration
      this.synth.triggerAttackRelease("C2", "8n", time);
    }
  
    createNewTechnoBass() {
      this.synth.dispose();
      this.params = this.generateTechnoBassParams();
      this.synth = new Tone.MembraneSynth(this.params).toDestination();
    }
  }
  