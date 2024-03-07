class Snare {
  constructor(volume) {
    this.params = this.generateRandomSnareParams();
    this.synth = new Tone.NoiseSynth({
      ...this.params,
      volume: volume + globalControls.volumes.snare,
    }).toDestination();
  }

  generateRandomSnareParams() {
    const attack = this.randomInRange(0.001, 0.01);
    const decay = this.randomInRange(0.01, 0.1);
    const sustain = this.randomInRange(0.001, 0.01);
    const release = this.randomInRange(0.001, 0.02);
    const pitch = this.randomInRange(-12, 12);

    return {
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
      pitch: pitch,
    };
  }

  triggerAttackRelease(time) {
    this.synth.triggerAttackRelease("8n", time);
  }

  randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  createNewSnare(volume) {
    this.synth.dispose();
    this.params = this.generateRandomSnareParams();
    this.synth = new Tone.NoiseSynth({
      ...this.params,
      volume: volume + globalControls.volumes.snare,
    }).toDestination();
  }
}

const snare = new Snare();
const snarePattern = new Tone.Pattern((time, note) => {
  if (note !== null) {
    snare.triggerAttackRelease(time);
  }
}, [null, "C2"]).start(0);
