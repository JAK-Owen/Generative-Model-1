class HiHat {
  constructor(volume) {
    this.params = this.generateRandomHatParams();
    this.synth = new Tone.MetalSynth({
      ...this.params,
      volume: volume + globalControls.volumes.hiHat,
    }).toDestination();
  }

  generateRandomHatParams() {
    const frequency = Tone.Frequency(`${globalControls.globalKey}2`).toMidi(); // Adjusted octave
    const decay = this.randomInRange(0.01, 0.1);
    const attack = this.randomInRange(0.001, 0.005);

    return {
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
    };
  }

  triggerAttackRelease(time) {
    this.synth.triggerAttackRelease("16n", time);
  }

  randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  createNewHiHat(volume) {
    this.synth.dispose();
    this.params = this.generateRandomHatParams();
    this.synth = new Tone.MetalSynth({
      ...this.params,
      volume: volume + globalControls.volumes.hiHat,
    }).toDestination();
  }
}

const hiHat = new HiHat();
const hiHatPattern = new Tone.Pattern((time, note) => {
  if (note !== null) {
    hiHat.triggerAttackRelease(time);
  }
}, ["C2"]).start("8n");
