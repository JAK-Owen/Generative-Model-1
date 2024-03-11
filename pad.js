// pad.js

class Pad {
    constructor(volume, globalKey) {
      this.synth = new Tone.PolySynth().toDestination();
      // Check if globalControls.volumes.pad is a valid number before using it
      this.synth.volume.value = typeof globalControls.volumes.pad === 'number' ? volume + globalControls.volumes.pad : volume;
      this.globalKey = globalKey;
    }
  
    playConstantMinorChord() {
      const minorChord = [
        this.globalKey + "2",
        this.globalKey + "3",
        this.globalKey + "4",
      ];
  
      // Check if note is not null before triggering attack and release
      if (minorChord.every(note => note !== null)) {
        this.triggerAttackRelease(minorChord, "4n");
      }
    }
  
    triggerAttackRelease(notes, duration) {
      this.synth.triggerAttackRelease(notes, duration);
    }
  
    initialize() {
      // Play the constant minor chord when initialized
      this.playConstantMinorChord();
    }
  
    createNewRandomPad() {
      this.synth.dispose();
      this.synth = new Tone.PolySynth().toDestination();
      // Check if globalControls.volumes.pad is a valid number before using it
      this.synth.volume.value = typeof globalControls.volumes.pad === 'number' ? globalControls.volumes.pad : 0;
      this.playConstantMinorChord();
    }
  
    updateGlobalControls(newControls) {
      this.synth.dispose();
      Object.assign(globalControls, newControls);
      this.synth = new Tone.PolySynth().toDestination();
      // Check if globalControls.volumes.pad is a valid number before using it
      this.synth.volume.value = typeof globalControls.volumes.pad === 'number' ? globalControls.volumes.pad : 0;
      this.playConstantMinorChord();
    }
  
    adjustSynthParams() {
      // Add any specific adjustments you want for the pad
    }
  }
  
  // Create an instance of the Pad class
  const pad = new Pad(globalControls.volumes.pad, globalControls.globalKey);
  
  // Initialize the pad when the document is fully loaded
  document.addEventListener("DOMContentLoaded", () => {
    pad.initialize();
  });
  
  // Export the pad instance for use in other files
  window.pad = pad;
  