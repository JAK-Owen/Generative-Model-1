class Kick {
    constructor() {
      this.params = this.generateRandomKickParams();
      this.synth = new Tone.MembraneSynth(this.params).toDestination();
    }
  
    generateRandomKickParams() {
      const minPitch = Tone.Frequency("C1").toMidi();
      const maxPitch = Tone.Frequency("C2").toMidi();
  
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
  
    triggerAttackRelease(time) {
      this.synth.triggerAttackRelease("C2", "8n", time);
    }
  
    createNewKick() {
      this.synth.dispose();
      this.params = this.generateRandomKickParams();
      this.synth = new Tone.MembraneSynth(this.params).toDestination();
    }
  }
  