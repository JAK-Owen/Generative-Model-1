class Snare {
    constructor() {
      this.synth = new Tone.NoiseSynth({
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
    }
  
    triggerAttackRelease(time) {
      this.synth.triggerAttackRelease("8n", time);
    }
  }
  