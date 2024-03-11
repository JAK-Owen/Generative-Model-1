class Pad {
    constructor(volume, globalKey) {
      this.effectRack = new Tone.Filter({
        type: 'lowpass',
        frequency: 2000,
        rolloff: -12,
      }).toDestination();
  
      const reverb = new Tone.Reverb({
        decay: 5,
        wet: 0.3,
      }).toDestination();
  
      const delay = new Tone.FeedbackDelay({
        delayTime: 0.5,
        feedback: 0.3,
      }).toDestination();
  
      const modulation = new Tone.Vibrato({
        maxDelay: 0.005,
        frequency: 5,
        depth: 0.1,
      }).toDestination();
  
      this.effectRack.chain(reverb, delay, modulation);
  
      this.synth = new Tone.PolySynth().connect(this.effectRack);
      this.synth.volume.value = volume + globalControls.volumes.pad;
      this.globalKey = globalKey;
      this.note = [this.globalKey + "2", this.globalKey + "3", this.globalKey + "4"];
      this.params = this.generateRandomPadParams();
  
      this.setupSynthesizer();
      this.playConstantMinorChord();
      this.automateParameterChanges();
    }
  
    playConstantMinorChord() {
      if (this.note.every((note) => note !== null)) {
        this.synth.triggerAttack(this.note);
      }
    }
  
    stopPad() {
      this.synth.triggerRelease(this.note);
    }
  
    initialize() {
      this.playConstantMinorChord();
    }
  
    generateRandomPadParams() {
      const octave = 3;
  
      return {
        oscillator: {
          type: this.randomOscillatorType(),
          modulationType: 'sine',
          harmonicity: Math.random() * 3 + 1,
          detune: Math.random() * 10 - 5,
        },
        filter: {
          type: 'lowpass',
          frequency: Math.random() * 500 + 200,
          rolloff: -12,
        },
        octave,
      };
    }
  
    updateSynthParams() {
      this.synth.set(this.params);
    }
  
    setupSynthesizer() {
      this.updateSynthParams();
    }
  
    createNewRandomPad() {
      this.synth.dispose();
      this.synth = new Tone.PolySynth().connect(this.effectRack);
      this.synth.volume.value = globalControls.volumes.pad;
      this.params = this.generateRandomPadParams();
      this.setupSynthesizer();
      this.playConstantMinorChord();
    }
  
    updateGlobalControls(newControls) {
      this.synth.dispose();
      Object.assign(globalControls, newControls);
      this.synth = new Tone.PolySynth().connect(this.effectRack);
      this.synth.volume.value = globalControls.volumes.pad;
      this.params = this.generateRandomPadParams();
      this.setupSynthesizer();
      this.playConstantMinorChord();
    }
  
    adjustSynthParams() {
      // Add any specific adjustments you want for the pad
    }
  
    randomOscillatorType() {
      const oscillatorTypes = ["triangle", "sine", "sawtooth", "square"];
      return oscillatorTypes[Math.floor(Math.random() * oscillatorTypes.length)];
    }
  
    automateParameterChanges() {
      const automationTime = 60;
      const initialFilterFrequency = this.params.filter.frequency;
      const targetFilterFrequency = this.params.filter.frequency * 0.5;
  
      // Use Tone.Transport to schedule parameter changes
      Tone.Transport.scheduleOnce((time) => {
        const rampTime = time + automationTime;
  
        // Schedule linear ramp for filter frequency
        this.effectRack.frequency.linearRampTo(targetFilterFrequency, rampTime);
      }, "+0.1"); // Schedule the changes with a slight delay
  
      // Start the Transport to trigger the scheduled changes
      Tone.Transport.start();
    }
  }
  
  const pad = new Pad(globalControls.volumes.pad, globalControls.globalKey);
  
  document.addEventListener("DOMContentLoaded", () => {
    pad.initialize();
  });
  
  const stopBtn = document.getElementById("stopBtn");
  stopBtn.addEventListener("click", () => {
    pad.stopPad();
  });
  
  window.pad = pad;
  