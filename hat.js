// hat.js

class HiHat {
  constructor() {
    // Initialize with default parameters
    this.setRandomHatParameters();
    this.volume = globalControls.volumes.hiHat;
    this.globalKey = globalControls.globalKey;

    // Connect to globalControls
    window.updateHatVolume = this.updateVolume.bind(this);
    window.updateHatControls = this.updateGlobalControls.bind(this);

    // Set initial volume using the updateVolume function
    this.updateVolume();
  }

  // Function to set random hi-hat parameters
  setRandomHatParameters() {
    const frequency = this.randomInRange(8000, 12000);
    const decay = this.randomInRange(0.01, 0.1);
    const attack = this.randomInRange(0.001, 0.005);
    const harmonicity = this.randomInRange(2, 7); 
    const modulationIndex = this.randomInRange(5, 20); 
    const resonance = this.randomInRange(2000, 8000); 
    const octaves = Math.floor(this.randomInRange(1, 4)); 

    const envelope = {
      attack: attack || 0.001,
      decay: decay || 0.01,
      release: 0.02,
    };

    this.synth = new Tone.MetalSynth({
      frequency: frequency,
      envelope: envelope,
      harmonicity: harmonicity,
      modulationIndex: modulationIndex,
      resonance: resonance,
      octaves: octaves,
      // Do not set volume here
    }).toDestination();

    this.synth.pitch = this.randomInRange(-12, 12);
  }

  // Function to trigger attack and release of the hi-hat
  triggerAttackRelease(time) {
    this.synth.triggerAttackRelease("16n", time);
  }

  // Function to generate a random number within a specified range
  randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Function to update volume based on global controls
  updateVolume() {
    this.synth.volume.value = this.volume;
  }

  // Function to update global controls
  updateGlobalControls(newControls) {
    this.synth.dispose();
    Object.assign(this, newControls);
    this.setRandomHatParameters();
    this.updateVolume();
    this.synth.toDestination();
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

// Export the hiHat instance for use in other files
window.hiHat = hiHat;
