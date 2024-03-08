// bass.js

class Bass {
  constructor(volume, key) {
    this.params = this.generateTechnoBassParams();
    this.synth = new Tone.MembraneSynth({
      ...this.params,
      volume: volume + globalControls.volumes.bass,
    }).toDestination();
  }

  generateTechnoBassParams() {
    const minPitch = Tone.Frequency(`${globalControls.globalKey}1`).toMidi();
    const maxPitch = Tone.Frequency(`${globalControls.globalKey}2`).toMidi();

    return {
      pitchDecay: Math.random() * 0.01 + 0.001,
      octaves: Math.floor(Math.random() * 3) + 4,
      oscillator: { type: this.randomOscillatorType() }, // Randomize oscillator type
      envelope: {
        attack: Math.random() * 0.01 + 0.1,
        decay: Math.random() * 0.05 + 0.5,
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
    const note = Tone.Frequency(this.params.pitch.min, "midi").toNote();
    this.synth.triggerAttackRelease(note, "8n", time);
  }

  createNewTechnoBass() {
    this.synth.dispose();
    this.params = this.generateTechnoBassParams();
    this.synth = new Tone.MembraneSynth({
      ...this.params,
      volume: globalControls.volumes.bass,
    }).toDestination();
  }

  updateGlobalControls(newControls) {
    this.synth.dispose();
    Object.assign(globalControls, newControls);
    this.params = this.generateTechnoBassParams();
    this.synth = new Tone.MembraneSynth({
      ...this.params,
      volume: globalControls.volumes.bass,
    }).toDestination();
  }

  adjustSynthParams(filterFreq, resonance, distortion) {
    if (this.synth && this.synth.filter && this.synth.filter.frequency) {
      this.synth.oscillator.type = this.randomOscillatorType(); // Reset oscillator type
      this.synth.filter.frequency.value = filterFreq;
      this.synth.filter.Q.value = resonance;
      this.synth.distortion = distortion;
    }
  }

  // Function to generate a random oscillator type
  randomOscillatorType() {
    const oscillatorTypes = ["sine", "triangle"];
    return oscillatorTypes[Math.floor(Math.random() * oscillatorTypes.length)];
  }
}
