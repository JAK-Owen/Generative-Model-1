class HiHat {
    constructor() {
      this.synth = new Tone.MetalSynth({
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
    }
  
    triggerAttackRelease(time) {
      this.synth.triggerAttackRelease("16n", time);
    }
  }
  